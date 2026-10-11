import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import { DAY_LENGTH } from '../../shared/constants';
import { mulberry32 } from '../../shared/rng';
import type { SharedUniforms } from './materials';
import { CLOUD_FRAGMENT, CLOUD_VERTEX, SKY_FRAGMENT, SKY_VERTEX } from './shaders';

type V3 = [number, number, number];
const mix3 = (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Палитры атмосферы в линейном HDR-пространстве.
const DAY = { zenith: [0.1, 0.27, 0.75] as V3, horizon: [0.5, 0.68, 1.0] as V3, ambient: [0.34, 0.42, 0.58] as V3, light: [1.05, 0.97, 0.82] as V3, glow: [0.55, 0.5, 0.4] as V3 };
const SUNSET = { zenith: [0.14, 0.18, 0.42] as V3, horizon: [1.05, 0.5, 0.22] as V3, ambient: [0.32, 0.27, 0.3] as V3, light: [0.95, 0.5, 0.22] as V3, glow: [1.5, 0.62, 0.2] as V3 };
const NIGHT = { zenith: [0.004, 0.006, 0.018] as V3, horizon: [0.014, 0.02, 0.048] as V3, ambient: [0.05, 0.065, 0.12] as V3, light: [0.16, 0.2, 0.32] as V3, glow: [0.02, 0.025, 0.04] as V3 };
const RAIN_SKY: V3 = [0.32, 0.35, 0.4];

const CLOUD_CELL = 12;
const CLOUD_GRID = 64;
const CLOUD_TILE = CLOUD_CELL * CLOUD_GRID;
const CLOUD_Y = 118;
const CLOUD_THICKNESS = 4;
/** Не больше 3×3 плиток узора облаков одновременно. */
const CLOUD_INSTANCES = 9;

/** Небо, время суток, облака: считает цвета атмосферы и обновляет uniform-ы. */
export class Environment {
  readonly sunDir = new THREE.Vector3();
  readonly lightDir = new THREE.Vector3();
  daylight = 1;
  night = 0;
  /** Насколько солнце видно (для лучей и бликов). */
  sunVisibility = 1;
  /** Плотный туман (цель 0..1, меняется плавно) и «кровавая луна» ночью (0..1). */
  fogTarget = 0;
  bloodTarget = 0;
  private fog = 0;
  private blood = 0;
  readonly rayColor = new THREE.Vector3();
  private readonly dome: THREE.Mesh;
  private readonly skyUniforms: Record<string, THREE.IUniform>;
  private clouds: THREE.InstancedMesh | null = null;
  private cloudPrepass: THREE.InstancedMesh | null = null;
  private cloudDrift = 0;
  private cloudTiles = '';

  constructor(
    private readonly scene: THREE.Scene,
    private readonly u: SharedUniforms,
  ) {
    this.skyUniforms = {
      ...u,
      uNight: { value: 0 },
      uSunDisk: { value: new THREE.Vector3() },
      uMoonDisk: { value: new THREE.Vector3() },
    };
    const skyMaterial = new THREE.ShaderMaterial({
      vertexShader: SKY_VERTEX,
      fragmentShader: SKY_FRAGMENT,
      uniforms: this.skyUniforms,
      side: THREE.BackSide,
      depthWrite: false,
    });
    this.dome = new THREE.Mesh(new THREE.SphereGeometry(500, 32, 16), skyMaterial);
    this.dome.frustumCulled = false;
    // Небо лежит на дальней плоскости, поэтому рисуем его после блоков и мобов: тест глубины
    // отбрасывает всё, что ими закрыто, и шейдер неба считается только для видимого неба.
    // Но до облаков (renderOrder 1): их предварительный проход пишет глубину.
    this.dome.renderOrder = 0.5;
    scene.add(this.dome);
  }

  setClouds(enabled: boolean): void {
    if (enabled && !this.clouds) this.buildClouds();
    if (this.clouds) this.clouds.visible = enabled;
    if (this.cloudPrepass) this.cloudPrepass.visible = enabled;
  }

  update(time: number, rain: number, camera: THREE.Camera, dt: number, renderDistance: number, underwater: boolean): void {
    const u = this.u;
    const angle = (time / DAY_LENGTH) * Math.PI * 2;
    this.sunDir.set(Math.cos(angle), Math.sin(angle), 0.3).normalize();
    const h = this.sunDir.y;
    const day = smoothstep(-0.14, 0.18, h);
    const sunset = Math.max(0, 1 - Math.abs(h) / 0.32) * smoothstep(-0.3, 0.02, h);
    this.daylight = 0.15 + 0.85 * day;
    this.night = 1 - smoothstep(-0.2, 0.05, h);

    const pick = (k: 'zenith' | 'horizon' | 'ambient' | 'light' | 'glow'): V3 => {
      let c = mix3(NIGHT[k], DAY[k], day);
      c = mix3(c, SUNSET[k], sunset * 0.85);
      return c;
    };
    let zenith = pick('zenith');
    let horizon = pick('horizon');
    let ambient = pick('ambient');
    const glow = pick('glow');
    let light = pick('light');

    // Свет идёт от солнца днём и от луны ночью; на смене — плавно гаснет.
    if (h > -0.06) {
      this.lightDir.copy(this.sunDir);
      const k = smoothstep(-0.06, 0.12, h);
      light = mix3([0, 0, 0], light, k);
    } else {
      this.lightDir.copy(this.sunDir).negate();
      const k = smoothstep(0.06, 0.25, -h);
      light = mix3([0, 0, 0], NIGHT.light, k);
    }

    // Кровавая луна: ночное небо, свет и туман краснеют.
    this.blood += (this.bloodTarget - this.blood) * Math.min(1, dt * 0.25);
    const red = this.blood * this.night;
    if (red > 0.001) {
      zenith = mix3(zenith, [0.06, 0.004, 0.004], red);
      horizon = mix3(horizon, [0.26, 0.02, 0.015], red);
      ambient = mix3(ambient, [0.17, 0.045, 0.04], red);
      if (h <= -0.06) light = mix3(light, [0.42, 0.06, 0.05], red);
    }

    // Густой туман: небо и солнце блекнут до серой мглы.
    this.fog += (this.fogTarget - this.fog) * Math.min(1, dt * 0.15);
    const mist = this.fog;
    if (mist > 0.001) {
      const grey = mix3([0.02, 0.022, 0.026], [0.58, 0.6, 0.62], day);
      zenith = mix3(zenith, grey, mist * 0.8);
      horizon = mix3(horizon, grey, mist * 0.9);
      light = mix3(light, [light[0] * 0.35, light[1] * 0.35, light[2] * 0.37], mist);
    }

    if (rain > 0) {
      const grey = mix3([0.01, 0.012, 0.02], RAIN_SKY, day);
      zenith = mix3(zenith, grey, rain * 0.85);
      horizon = mix3(horizon, mix3(grey, [0.45, 0.48, 0.52], day * 0.5), rain * 0.85);
      ambient = mix3(ambient, [ambient[0] * 0.75, ambient[1] * 0.78, ambient[2] * 0.8], rain);
      light = mix3(light, [light[0] * 0.15, light[1] * 0.16, light[2] * 0.18], rain);
    }

    u.uSunDir.value.copy(this.sunDir);
    u.uLightDir.value.copy(this.lightDir);
    u.uLightColor.value.set(...light);
    u.uAmbient.value.set(...ambient);
    u.uZenith.value.set(...zenith);
    u.uHorizon.value.set(...horizon);
    u.uSunGlow.value.set(...glow).multiplyScalar((1 - rain * 0.8) * (1 - mist * 0.8));
    u.uRain.value = rain;
    u.uUnderwater.value = underwater ? 1 : 0;
    u.uWaterFog.value.set(0.015, 0.06, 0.13).multiplyScalar(0.25 + 0.75 * this.daylight);
    const far = Math.max(32, renderDistance * 16 - 6);
    const thick = 1 - mist * 0.68;
    u.uFogFar.value = far * (1 - rain * 0.35) * thick;
    u.uFogNear.value = far * (0.42 - rain * 0.2) * thick * thick;

    this.skyUniforms.uNight.value = this.night;
    this.skyUniforms.uSunDisk.value.set(55, 46, 32).multiplyScalar(smoothstep(-0.05, 0.05, h));
    this.skyUniforms.uMoonDisk.value
      .set(2.6 + 1.6 * this.blood, 2.8 - 2.4 * this.blood, 3.2 - 2.9 * this.blood)
      .multiplyScalar(smoothstep(-0.05, 0.05, -h));
    this.sunVisibility = smoothstep(-0.02, 0.12, h) * (1 - rain) * (1 - mist * 0.85);
    this.rayColor.set(...glow).multiplyScalar(0.9 + sunset).lerp(new THREE.Vector3(...light).multiplyScalar(0.25), 0.4);

    this.dome.position.copy(camera.position);

    if (this.clouds && this.cloudPrepass) {
      this.cloudDrift += dt * 0.8;
      this.clouds.position.set(this.cloudDrift, CLOUD_Y, 0);
      this.cloudPrepass.position.copy(this.clouds.position);
      // Рисуем только плитки узора, которые не скрыты туманом (обычно 1–4 из 9).
      const range = u.uFogFar.value * 3.2;
      const cx = camera.position.x - this.cloudDrift;
      const cz = camera.position.z;
      const x0 = Math.floor((cx - range) / CLOUD_TILE);
      const x1 = Math.floor((cx + range) / CLOUD_TILE);
      const z0 = Math.floor((cz - range) / CLOUD_TILE);
      const z1 = Math.floor((cz + range) / CLOUD_TILE);
      const key = `${x0},${x1},${z0},${z1}`;
      if (key !== this.cloudTiles) {
        this.cloudTiles = key;
        const m = new THREE.Matrix4();
        let n = 0;
        for (let tz = z0; tz <= z1; tz++)
          for (let tx = x0; tx <= x1 && n < CLOUD_INSTANCES; tx++, n++) {
            m.makeTranslation(tx * CLOUD_TILE, 0, tz * CLOUD_TILE);
            this.clouds.setMatrixAt(n, m);
            this.cloudPrepass.setMatrixAt(n, m);
          }
        for (const mesh of [this.clouds, this.cloudPrepass]) {
          mesh.count = n;
          mesh.instanceMatrix.needsUpdate = true;
        }
      }
    }
  }

  /** Облака как в Minecraft: плоские «коробки» 12×4×12 по шумовому узору. */
  private buildClouds(): void {
    const noise = createNoise2D(mulberry32(4242));
    const cloud: boolean[] = [];
    for (let z = 0; z < CLOUD_GRID; z++)
      for (let x = 0; x < CLOUD_GRID; x++) {
        // Шум на торе — узор бесшовно повторяется.
        const a = (x / CLOUD_GRID) * Math.PI * 2;
        const b = (z / CLOUD_GRID) * Math.PI * 2;
        const n = noise(Math.cos(a) * 1.6, Math.sin(a) * 1.6 + Math.cos(b) * 1.6) * 0.6 + noise(Math.sin(b) * 3.2, Math.cos(a) * 3.2 + Math.sin(b)) * 0.4;
        cloud.push(n > 0.22);
      }
    const at = (x: number, z: number) => cloud[(((z % CLOUD_GRID) + CLOUD_GRID) % CLOUD_GRID) * CLOUD_GRID + (((x % CLOUD_GRID) + CLOUD_GRID) % CLOUD_GRID)];

    const pos: number[] = [];
    const shade: number[] = [];
    const quad = (pts: number[][], s: number) => {
      const [a, b, c, d] = pts;
      pos.push(...a, ...b, ...c, ...a, ...c, ...d);
      for (let i = 0; i < 6; i++) shade.push(s);
    };
    const C = CLOUD_CELL;
    const T = CLOUD_THICKNESS;
    for (let z = 0; z < CLOUD_GRID; z++)
      for (let x = 0; x < CLOUD_GRID; x++) {
        if (!at(x, z)) continue;
        const x0 = x * C;
        const z0 = z * C;
        const x1 = x0 + C;
        const z1 = z0 + C;
        quad([[x0, T, z1], [x1, T, z1], [x1, T, z0], [x0, T, z0]], 1.0);
        quad([[x0, 0, z0], [x1, 0, z0], [x1, 0, z1], [x0, 0, z1]], 0.62);
        if (!at(x + 1, z)) quad([[x1, 0, z1], [x1, 0, z0], [x1, T, z0], [x1, T, z1]], 0.78);
        if (!at(x - 1, z)) quad([[x0, 0, z0], [x0, 0, z1], [x0, T, z1], [x0, T, z0]], 0.78);
        if (!at(x, z + 1)) quad([[x0, 0, z1], [x1, 0, z1], [x1, T, z1], [x0, T, z1]], 0.86);
        if (!at(x, z - 1)) quad([[x1, 0, z0], [x0, 0, z0], [x0, T, z0], [x1, T, z0]], 0.86);
      }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geometry.setAttribute('aShade', new THREE.Float32BufferAttribute(shade, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: CLOUD_VERTEX,
      fragmentShader: CLOUD_FRAGMENT,
      uniforms: this.u,
      transparent: true,
      depthWrite: false,
    });
    // Предварительный проход только глубины: полупрозрачные облака без «просвечивания» граней.
    const prepassMaterial = new THREE.ShaderMaterial({
      vertexShader: CLOUD_VERTEX,
      fragmentShader: 'void main() { gl_FragColor = vec4(0.0); }',
      colorWrite: false,
    });
    const makeInstanced = (m: THREE.Material) => {
      // Какие плитки узора рисовать, решает update().
      const mesh = new THREE.InstancedMesh(geometry, m, CLOUD_INSTANCES);
      mesh.count = 0;
      mesh.frustumCulled = false;
      return mesh;
    };
    this.cloudPrepass = makeInstanced(prepassMaterial);
    this.cloudPrepass.renderOrder = 1;
    this.clouds = makeInstanced(material);
    this.clouds.renderOrder = 2;
    this.scene.add(this.cloudPrepass, this.clouds);
    this.cloudTiles = '';
  }
}
