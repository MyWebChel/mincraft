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

/** Небо, время суток, облака: считает цвета атмосферы и обновляет uniform-ы. */
export class Environment {
  readonly sunDir = new THREE.Vector3();
  readonly lightDir = new THREE.Vector3();
  daylight = 1;
  night = 0;
  /** Насколько солнце видно (для лучей и бликов). */
  sunVisibility = 1;
  readonly rayColor = new THREE.Vector3();
  private readonly dome: THREE.Mesh;
  private readonly skyUniforms: Record<string, THREE.IUniform>;
  private clouds: THREE.InstancedMesh | null = null;
  private cloudPrepass: THREE.InstancedMesh | null = null;
  private cloudDrift = 0;

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
    this.dome.renderOrder = -1000;
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
    u.uSunGlow.value.set(...glow).multiplyScalar(1 - rain * 0.8);
    u.uRain.value = rain;
    u.uUnderwater.value = underwater ? 1 : 0;
    u.uWaterFog.value.set(0.015, 0.06, 0.13).multiplyScalar(0.25 + 0.75 * this.daylight);
    const far = Math.max(32, renderDistance * 16 - 6);
    u.uFogFar.value = far * (1 - rain * 0.35);
    u.uFogNear.value = far * (0.42 - rain * 0.2);

    this.skyUniforms.uNight.value = this.night;
    this.skyUniforms.uSunDisk.value.set(55, 46, 32).multiplyScalar(smoothstep(-0.05, 0.05, h));
    this.skyUniforms.uMoonDisk.value.set(2.6, 2.8, 3.2).multiplyScalar(smoothstep(-0.05, 0.05, -h));
    this.sunVisibility = smoothstep(-0.02, 0.12, h) * (1 - rain);
    this.rayColor.set(...glow).multiplyScalar(0.9 + sunset).lerp(new THREE.Vector3(...light).multiplyScalar(0.25), 0.4);

    this.dome.position.copy(camera.position);

    if (this.clouds && this.cloudPrepass) {
      this.cloudDrift += dt * 0.8;
      const ox = Math.floor((camera.position.x - this.cloudDrift) / CLOUD_TILE) * CLOUD_TILE + this.cloudDrift;
      const oz = Math.floor(camera.position.z / CLOUD_TILE) * CLOUD_TILE;
      this.clouds.position.set(ox, CLOUD_Y, oz);
      this.cloudPrepass.position.copy(this.clouds.position);
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
      const mesh = new THREE.InstancedMesh(geometry, m, 9);
      let k = 0;
      const mat = new THREE.Matrix4();
      for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) mesh.setMatrixAt(k++, mat.makeTranslation(i * CLOUD_TILE, 0, j * CLOUD_TILE));
      mesh.frustumCulled = false;
      return mesh;
    };
    this.cloudPrepass = makeInstanced(prepassMaterial);
    this.cloudPrepass.renderOrder = 1;
    this.clouds = makeInstanced(material);
    this.clouds.renderOrder = 2;
    this.scene.add(this.cloudPrepass, this.clouds);
  }
}
