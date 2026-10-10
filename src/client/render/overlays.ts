import * as THREE from 'three';
import { tileId } from '../../shared/blocks';
import type { Box } from '../../shared/shapes';
import type { SharedUniforms } from './materials';
import { COMMON_UNIFORMS, SKY_FUNCTIONS } from './shaders';

const CRACK_VERTEX = /* glsl */ `
precision highp float;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
in vec3 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

const CRACK_FRAGMENT = /* glsl */ `
precision highp float;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
uniform float uLayer;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec4 c = texture(uAtlas, vec3(vUv, uLayer));
  if (c.a < 0.1) discard;
  outColor = vec4(c.rgb * 0.15, c.a * 0.85);
}
`;

/** Трещины на ломаемом блоке и рамка выделения блока под прицелом. */
export class BlockOverlays {
  private readonly crack: THREE.Mesh;
  private readonly crackMat: THREE.RawShaderMaterial;
  private readonly outline: THREE.LineSegments;
  private readonly layers = Array.from({ length: 10 }, (_, i) => tileId(`destroy_${i}`));

  constructor(scene: THREE.Scene, atlas: THREE.DataArrayTexture) {
    this.crackMat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: CRACK_VERTEX,
      fragmentShader: CRACK_FRAGMENT,
      uniforms: { uAtlas: { value: atlas }, uLayer: { value: 0 } },
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -4,
    });
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0.5, 0.5, 0.5);
    this.crack = new THREE.Mesh(geo, this.crackMat);
    this.crack.visible = false;
    this.crack.renderOrder = 3;
    scene.add(this.crack);

    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1).translate(0.5, 0.5, 0.5));
    this.outline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#000000', transparent: true, opacity: 0.5 }));
    this.outline.visible = false;
    scene.add(this.outline);
  }

  private fit(obj: THREE.Object3D, x: number, y: number, z: number, boxes: Box[], grow: number): void {
    let x0 = 1;
    let y0 = 1;
    let z0 = 1;
    let x1 = 0;
    let y1 = 0;
    let z1 = 0;
    for (const b of boxes) {
      x0 = Math.min(x0, b[0]);
      y0 = Math.min(y0, b[1]);
      z0 = Math.min(z0, b[2]);
      x1 = Math.max(x1, b[3]);
      y1 = Math.max(y1, b[4]);
      z1 = Math.max(z1, b[5]);
    }
    obj.position.set(x + x0 - grow, y + y0 - grow, z + z0 - grow);
    obj.scale.set(x1 - x0 + grow * 2, y1 - y0 + grow * 2, z1 - z0 + grow * 2);
  }

  setTarget(target: { x: number; y: number; z: number; boxes: Box[] } | null): void {
    this.outline.visible = !!target && target.boxes.length > 0;
    if (target && this.outline.visible) this.fit(this.outline, target.x, target.y, target.z, target.boxes, 0.003);
  }

  /** stage: -1 — без трещин, 0..9 — стадия разрушения. */
  setCrack(target: { x: number; y: number; z: number; boxes: Box[] } | null, stage: number): void {
    this.crack.visible = !!target && stage >= 0 && target.boxes.length > 0;
    if (!target || !this.crack.visible) return;
    this.crackMat.uniforms.uLayer.value = this.layers[Math.max(0, Math.min(9, stage))];
    this.fit(this.crack, target.x, target.y, target.z, target.boxes, 0.002);
  }
}

const RAIN_VERTEX = /* glsl */ `
attribute float aAlpha;
varying float vAlpha;
varying vec3 vWorld;
void main() {
  vAlpha = aAlpha;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const RAIN_FRAGMENT = /* glsl */ `
${COMMON_UNIFORMS}
${SKY_FUNCTIONS}
varying float vAlpha;
varying vec3 vWorld;
void main() {
  vec3 c = (uAmbient * 1.2 + uLightColor * 0.2) * vec3(0.75, 0.82, 1.0);
  gl_FragColor = vec4(c, 0.45 * vAlpha);
}
`;

const SNOW_VERTEX = /* glsl */ `
uniform float uPixelScale;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(uPixelScale * 0.07 / -mv.z, 1.0, 9.0);
  gl_Position = projectionMatrix * mv;
}
`;

const SNOW_FRAGMENT = /* glsl */ `
${COMMON_UNIFORMS}
void main() {
  gl_FragColor = vec4(uAmbient * 1.4 + uLightColor * 0.6 + vec3(0.02), 0.9);
}
`;

const DROPS = 900;

/** Осадки в точке: 0 — нет (пустыня), 1 — дождь, 2 — снег. */
export type Precipitation = (x: number, y: number, z: number) => 0 | 1 | 2;

interface Drop {
  x: number;
  y: number;
  z: number;
  floor: number;
  speed: number;
  phase: number;
}

/**
 * Дождь (штрихи) и снег (хлопья) вокруг игрока — только там, где над головой небо.
 * Вид осадков берётся по биому в точке камеры: в пустыне их нет, в снегах идёт снег.
 */
export class Rain {
  private readonly lines: THREE.LineSegments;
  private readonly flakes: THREE.Points;
  private readonly pos = new Float32Array(DROPS * 6);
  private readonly alpha = new Float32Array(DROPS * 2);
  private readonly flakePos = new Float32Array(DROPS * 3);
  private readonly drops: Drop[] = [];
  private readonly snowUniforms = { uPixelScale: { value: 800 } };
  private kind: 0 | 1 | 2 = 1;
  private kindTimer = 0;
  private time = 0;
  intensity = 0;

  constructor(
    scene: THREE.Scene,
    shared: SharedUniforms,
    private readonly surfaceY: (x: number, z: number) => number,
    private readonly onSplash: (x: number, y: number, z: number) => void,
    private readonly precipitation: Precipitation = () => 1,
  ) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    this.lines = new THREE.LineSegments(
      geo,
      new THREE.ShaderMaterial({ vertexShader: RAIN_VERTEX, fragmentShader: RAIN_FRAGMENT, uniforms: shared, transparent: true, depthWrite: false }),
    );
    this.lines.frustumCulled = false;
    this.lines.visible = false;
    scene.add(this.lines);

    const flakeGeo = new THREE.BufferGeometry();
    flakeGeo.setAttribute('position', new THREE.BufferAttribute(this.flakePos, 3).setUsage(THREE.DynamicDrawUsage));
    this.flakes = new THREE.Points(
      flakeGeo,
      new THREE.ShaderMaterial({
        vertexShader: SNOW_VERTEX,
        fragmentShader: SNOW_FRAGMENT,
        uniforms: { ...shared, ...this.snowUniforms },
        transparent: true,
        depthWrite: false,
      }),
    );
    this.flakes.frustumCulled = false;
    this.flakes.visible = false;
    scene.add(this.flakes);
  }

  /** Высота экрана в пикселях — от неё зависит размер снежинок. */
  setPixelScale(height: number): void {
    this.snowUniforms.uPixelScale.value = height;
  }

  private reset(d: Drop, cx: number, cy: number, cz: number, top: boolean): void {
    d.x = cx + (Math.random() - 0.5) * 32;
    d.z = cz + (Math.random() - 0.5) * 32;
    d.y = top ? cy + 14 + Math.random() * 6 : cy + (Math.random() - 0.3) * 24;
    d.floor = this.surfaceY(Math.floor(d.x), Math.floor(d.z)) + 1;
    d.speed = this.kind === 2 ? 1.6 + Math.random() * 1.2 : 22 + Math.random() * 8;
    d.phase = Math.random() * Math.PI * 2;
  }

  update(dt: number, camera: THREE.Vector3): void {
    this.time += dt;
    this.kindTimer -= dt;
    if (this.kindTimer <= 0) {
      this.kindTimer = 0.5;
      const kind = this.precipitation(Math.floor(camera.x), Math.floor(camera.y), Math.floor(camera.z));
      if (kind !== this.kind) {
        this.kind = kind;
        for (const d of this.drops) this.reset(d, camera.x, camera.y, camera.z, false);
      }
    }
    const active = this.intensity > 0.01 && this.kind !== 0;
    this.lines.visible = active && this.kind === 1;
    this.flakes.visible = active && this.kind === 2;
    if (!active) return;
    const snow = this.kind === 2;
    const count = Math.floor(DROPS * this.intensity);
    while (this.drops.length < DROPS) {
      const d = { x: 0, y: 0, z: 0, floor: 0, speed: 0, phase: 0 };
      this.reset(d, camera.x, camera.y, camera.z, false);
      this.drops.push(d);
    }
    for (let i = 0; i < DROPS; i++) {
      const d = this.drops[i];
      d.y -= d.speed * dt;
      if (snow) {
        // Снежинки кружатся.
        d.x += Math.sin(this.time * 1.3 + d.phase) * 0.5 * dt;
        d.z += Math.cos(this.time * 1.1 + d.phase * 1.7) * 0.4 * dt;
      }
      if (d.y < d.floor || Math.abs(d.x - camera.x) > 18 || Math.abs(d.z - camera.z) > 18) {
        if (!snow && d.y < d.floor && d.floor > camera.y - 16 && Math.random() < 0.08) this.onSplash(d.x, d.floor, d.z);
        this.reset(d, camera.x, camera.y, camera.z, true);
      }
      const visible = i < count && d.y > d.floor ? 1 : 0;
      if (snow) {
        const o = i * 3;
        this.flakePos[o] = d.x;
        this.flakePos[o + 1] = visible ? d.y : -9999;
        this.flakePos[o + 2] = d.z;
        continue;
      }
      const o = i * 6;
      this.pos[o] = d.x;
      this.pos[o + 1] = d.y;
      this.pos[o + 2] = d.z;
      this.pos[o + 3] = d.x;
      this.pos[o + 4] = d.y + 0.7;
      this.pos[o + 5] = d.z;
      this.alpha[i * 2] = visible;
      this.alpha[i * 2 + 1] = visible * 0.2;
    }
    if (snow) this.flakes.geometry.getAttribute('position').needsUpdate = true;
    else {
      this.lines.geometry.getAttribute('position').needsUpdate = true;
      this.lines.geometry.getAttribute('aAlpha').needsUpdate = true;
    }
  }
}
