import * as THREE from 'three';
import {
  SHADOW_FRAGMENT,
  SHADOW_VERTEX,
  TERRAIN_FRAGMENT,
  TERRAIN_VERTEX,
  WATER_FRAGMENT,
} from './shaders';

/** Слои three.js: 1 — блоки (отбрасывают тень), 2 — сущности (тоже отбрасывают). */
export const LAYER_TERRAIN = 1;
export const LAYER_ENTITY = 2;

/** Общие uniform-переменные всех шейдеров мира. */
export function createSharedUniforms() {
  return {
    uTime: { value: 0 },
    uCameraPos: { value: new THREE.Vector3() },
    uSunDir: { value: new THREE.Vector3(0, 1, 0) },
    uLightDir: { value: new THREE.Vector3(0, 1, 0) },
    uLightColor: { value: new THREE.Vector3(1, 1, 1) },
    uAmbient: { value: new THREE.Vector3(0.5, 0.5, 0.5) },
    uZenith: { value: new THREE.Vector3(0.1, 0.3, 0.8) },
    uHorizon: { value: new THREE.Vector3(0.6, 0.7, 1) },
    uSunGlow: { value: new THREE.Vector3(0.5, 0.5, 0.4) },
    uBlockLight: { value: new THREE.Vector3(1.0, 0.72, 0.42) },
    uFogNear: { value: 60 },
    uFogFar: { value: 100 },
    uUnderwater: { value: 0 },
    uWaterFog: { value: new THREE.Vector3(0.02, 0.07, 0.15) },
    uRain: { value: 0 },
    uShadowMap: { value: null as THREE.Texture | null },
    uShadowMatrix: { value: new THREE.Matrix4() },
    uShadowTexel: { value: 1 / 1024 },
  };
}
export type SharedUniforms = ReturnType<typeof createSharedUniforms>;

export interface MaterialOptions {
  shadows: boolean;
  shadowTaps: number;
  waving: boolean;
}

export interface TerrainMaterials {
  solid: THREE.RawShaderMaterial;
  translucent: THREE.RawShaderMaterial;
  shadowDepth: THREE.RawShaderMaterial;
  /** Для одиночных блоков-сущностей (предметы, падающий песок): свет задаётся uniform-ом. */
  entityBlock: (light: THREE.Vector2, noFog?: boolean) => THREE.RawShaderMaterial;
  atlas: THREE.DataArrayTexture;
}

export function createAtlasTexture(data: Uint8Array, count: number): THREE.DataArrayTexture {
  const texture = new THREE.DataArrayTexture(data, 16, 16, count);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function createTerrainMaterials(atlas: THREE.DataArrayTexture, shared: SharedUniforms, opts: MaterialOptions): TerrainMaterials {
  const defines: Record<string, string | number> = {};
  if (opts.waving) defines.WAVING = 1;
  if (opts.shadows) {
    defines.USE_SHADOWS = 1;
    defines.SHADOW_TAPS = opts.shadowTaps;
  }
  const uniforms = { ...shared, uAtlas: { value: atlas } };

  const solid = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: TERRAIN_VERTEX,
    fragmentShader: TERRAIN_FRAGMENT,
    uniforms,
    defines,
  });
  const translucent = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: TERRAIN_VERTEX,
    fragmentShader: WATER_FRAGMENT,
    uniforms,
    defines,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const shadowDepth = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: SHADOW_VERTEX,
    fragmentShader: SHADOW_FRAGMENT,
    uniforms,
    defines: opts.waving ? { WAVING: 1 } : {},
    side: THREE.DoubleSide,
  });
  const entityDefines: Record<string, string | number> = { ...defines, ENTITY: 1 };
  delete entityDefines.WAVING;
  const entityBlock = (light: THREE.Vector2, noFog = false) =>
    new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: TERRAIN_VERTEX,
      fragmentShader: TERRAIN_FRAGMENT,
      uniforms: { ...uniforms, uEntityLight: { value: light }, uNoFog: { value: noFog ? 1 : 0 } },
      defines: entityDefines,
    });
  return { solid, translucent, shadowDepth, entityBlock, atlas };
}

/**
 * Освещение сущностей (мобы, игроки, предметы) уровнем света в их клетке:
 * в пещере они тёмные, у факела — тёплые. Внедряется в стандартные материалы.
 */
export function applyEntityLight(root: THREE.Object3D, light: { value: THREE.Vector3 }): void {
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    o.layers.enable(LAYER_ENTITY);
    o.castShadow = true;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of mats) {
      if (!m || (m as THREE.Material & { __entityLight?: boolean }).__entityLight) continue;
      if (!(m instanceof THREE.MeshLambertMaterial || m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshPhongMaterial)) continue;
      (m as THREE.Material & { __entityLight?: boolean }).__entityLight = true;
      m.onBeforeCompile = (shader) => {
        shader.uniforms.uEntityLight = light;
        shader.fragmentShader = shader.fragmentShader
          .replace('void main() {', 'uniform vec3 uEntityLight;\nvoid main() {')
          .replace('#include <opaque_fragment>', 'outgoingLight *= uEntityLight;\n#include <opaque_fragment>');
      };
      m.customProgramCacheKey = () => 'entity-light';
      m.needsUpdate = true;
    }
  });
}
