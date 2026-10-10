import * as THREE from 'three';
import { FULL_CUBE, TYPE_MASK } from '../../shared/blocks';
import type { SharedUniforms } from './materials';
import { COMMON_UNIFORMS, SKY_FUNCTIONS } from './shaders';

const MAX = 2048;

const VERTEX = /* glsl */ `
precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uScale;
in vec3 position;
in vec4 aInfo;   // слой текстуры, u, v (смещение в текстуре 0..12), размер
in vec2 aLight;
in vec3 aColor;
out vec3 vUv;
out vec2 vLight;
out vec3 vColor;
out vec3 vWorld;
void main() {
  vUv = aInfo.xyz;
  vLight = aLight;
  vColor = aColor;
  vWorld = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aInfo.w * uScale / max(-mv.z, 0.05);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
${COMMON_UNIFORMS}
${SKY_FUNCTIONS}
in vec3 vUv;
in vec2 vLight;
in vec3 vColor;
in vec3 vWorld;
out vec4 outColor;
void main() {
  vec2 uv = (vUv.yz + gl_PointCoord * 4.0) / 16.0;
  vec4 tex = vUv.x < 0.0 ? vec4(1.0) : texture(uAtlas, vec3(uv, vUv.x));
  if (tex.a < 0.5) discard;
  vec3 light = uAmbient * lightCurve(vLight.x) + uBlockLight * lightCurve(vLight.y) * 1.3 + uLightColor * 0.35 * smoothstep(0.6, 1.0, vLight.x) + 0.01;
  vec3 col = tex.rgb * vColor * light;
  if (vUv.x < 0.0) col = vColor;
  outColor = vec4(applyFog(col, vWorld), 1.0);
}
`;

interface P {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  gravity: number;
  layer: number;
  u: number;
  v: number;
  size: number;
  r: number;
  g: number;
  b: number;
  emissive: boolean;
}

/** Частицы: осколки блоков, брызги, дым взрыва, капли дождя у земли. */
export class Particles {
  private readonly list: P[] = [];
  private readonly geometry = new THREE.BufferGeometry();
  private readonly pos = new Float32Array(MAX * 3);
  private readonly info = new Float32Array(MAX * 4);
  private readonly light = new Float32Array(MAX * 2);
  private readonly color = new Float32Array(MAX * 3);
  readonly points: THREE.Points;
  private readonly material: THREE.RawShaderMaterial;

  constructor(
    scene: THREE.Scene,
    atlas: THREE.DataArrayTexture,
    shared: SharedUniforms,
    private readonly getState: (x: number, y: number, z: number) => number,
    private readonly getLight: (x: number, y: number, z: number) => number,
  ) {
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geometry.setAttribute('aInfo', new THREE.BufferAttribute(this.info, 4).setUsage(THREE.DynamicDrawUsage));
    this.geometry.setAttribute('aLight', new THREE.BufferAttribute(this.light, 2).setUsage(THREE.DynamicDrawUsage));
    this.geometry.setAttribute('aColor', new THREE.BufferAttribute(this.color, 3).setUsage(THREE.DynamicDrawUsage));
    this.geometry.setDrawRange(0, 0);
    this.material = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms: { ...shared, uAtlas: { value: atlas }, uScale: { value: 400 } },
    });
    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    scene.add(this.points);
  }

  setPixelScale(heightPx: number): void {
    this.material.uniforms.uScale.value = heightPx * 0.6;
  }

  private push(p: P): void {
    if (this.list.length >= MAX) this.list.shift();
    this.list.push(p);
  }

  /** Осколки разрушенного блока (или искры при копании — few). */
  blockBreak(x: number, y: number, z: number, layer: number, count = 28, hit = false): void {
    for (let i = 0; i < count; i++) {
      const px = hit ? x + Math.random() : x + 0.1 + Math.random() * 0.8;
      const py = hit ? y + Math.random() : y + 0.1 + Math.random() * 0.8;
      const pz = hit ? z + Math.random() : z + 0.1 + Math.random() * 0.8;
      this.push({
        x: px,
        y: py,
        z: pz,
        vx: (px - x - 0.5) * 3 + (Math.random() - 0.5),
        vy: Math.random() * 3 + (hit ? 0.5 : 1.5),
        vz: (pz - z - 0.5) * 3 + (Math.random() - 0.5),
        life: 0.6 + Math.random() * 0.6,
        gravity: 14,
        layer,
        u: Math.floor(Math.random() * 12),
        v: Math.floor(Math.random() * 12),
        size: 0.08 + Math.random() * 0.06,
        r: 1,
        g: 1,
        b: 1,
        emissive: false,
      });
    }
  }

  /** Облачка дыма/пыли (взрыв, смерть моба). */
  puff(x: number, y: number, z: number, count: number, spread: number, rgb: [number, number, number], speed = 2): void {
    for (let i = 0; i < count; i++) {
      this.push({
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        z: z + (Math.random() - 0.5) * spread,
        vx: (Math.random() - 0.5) * speed,
        vy: Math.random() * speed * 0.6,
        vz: (Math.random() - 0.5) * speed,
        life: 0.5 + Math.random() * 1.2,
        gravity: -0.6,
        layer: -1,
        u: 0,
        v: 0,
        size: 0.12 + Math.random() * 0.25,
        r: rgb[0],
        g: rgb[1],
        b: rgb[2],
        emissive: true,
      });
    }
  }

  /** Брызги воды/капли дождя. */
  splash(x: number, y: number, z: number, count: number, layer: number): void {
    for (let i = 0; i < count; i++) {
      this.push({
        x: x + (Math.random() - 0.5) * 0.8,
        y,
        z: z + (Math.random() - 0.5) * 0.8,
        vx: (Math.random() - 0.5) * 2,
        vy: 2 + Math.random() * 2,
        vz: (Math.random() - 0.5) * 2,
        life: 0.4 + Math.random() * 0.3,
        gravity: 12,
        layer,
        u: Math.floor(Math.random() * 12),
        v: Math.floor(Math.random() * 12),
        size: 0.05,
        r: 0.8,
        g: 0.9,
        b: 1,
        emissive: false,
      });
    }
  }

  update(dt: number): void {
    let n = 0;
    for (let i = this.list.length - 1; i >= 0; i--) {
      const p = this.list[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.list.splice(i, 1);
        continue;
      }
      p.vy -= p.gravity * dt;
      const nx = p.x + p.vx * dt;
      const ny = p.y + p.vy * dt;
      const nz = p.z + p.vz * dt;
      if (p.gravity > 0 && FULL_CUBE[this.getState(Math.floor(nx), Math.floor(ny), Math.floor(nz)) & TYPE_MASK]) {
        p.vx *= 0.3;
        p.vz *= 0.3;
        p.vy = 0;
      } else {
        p.x = nx;
        p.y = ny;
        p.z = nz;
      }
      if (n >= MAX) continue;
      this.pos[n * 3] = p.x;
      this.pos[n * 3 + 1] = p.y;
      this.pos[n * 3 + 2] = p.z;
      this.info[n * 4] = p.layer;
      this.info[n * 4 + 1] = p.u;
      this.info[n * 4 + 2] = p.v;
      this.info[n * 4 + 3] = p.size;
      const l = p.emissive ? 0xf0 : this.getLight(Math.floor(p.x), Math.floor(p.y), Math.floor(p.z));
      this.light[n * 2] = (l >> 4) / 15;
      this.light[n * 2 + 1] = (l & 15) / 15;
      const fade = p.layer < 0 ? Math.min(1, p.life * 2) : 1;
      this.color[n * 3] = p.r * fade;
      this.color[n * 3 + 1] = p.g * fade;
      this.color[n * 3 + 2] = p.b * fade;
      n++;
    }
    this.geometry.setDrawRange(0, n);
    for (const name of ['position', 'aInfo', 'aLight', 'aColor']) this.geometry.getAttribute(name).needsUpdate = true;
  }
}
