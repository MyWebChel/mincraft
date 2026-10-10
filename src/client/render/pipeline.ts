import * as THREE from 'three';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import type { Environment } from './environment';
import { LAYER_CUTOUT, LAYER_ENTITY, LAYER_TERRAIN, type SharedUniforms, type TerrainMaterials } from './materials';
import { FINAL_FRAGMENT, FINAL_VERTEX } from './shaders';

export type QualityLevel = 'low' | 'medium' | 'high' | 'ultra';

export interface QualitySettings {
  level: QualityLevel;
  shadowSize: number;
  shadowDistance: number;
  shadowTaps: number;
  bloom: boolean;
  godRays: boolean;
  msaa: number;
  fancyLeaves: boolean;
  clouds: boolean;
  waving: boolean;
  maxPixelRatio: number;
}

export const QUALITY_PRESETS: Record<QualityLevel, QualitySettings> = {
  low: {
    level: 'low',
    shadowSize: 0,
    shadowDistance: 0,
    shadowTaps: 4,
    bloom: false,
    godRays: false,
    msaa: 0,
    fancyLeaves: false,
    clouds: true,
    waving: true,
    maxPixelRatio: 1,
  },
  medium: {
    level: 'medium',
    shadowSize: 1024,
    shadowDistance: 36,
    shadowTaps: 4,
    bloom: true,
    godRays: false,
    msaa: 0,
    fancyLeaves: true,
    clouds: true,
    waving: true,
    maxPixelRatio: 1,
  },
  high: {
    level: 'high',
    shadowSize: 2048,
    shadowDistance: 48,
    shadowTaps: 8,
    bloom: true,
    godRays: true,
    msaa: 2,
    fancyLeaves: true,
    clouds: true,
    waving: true,
    maxPixelRatio: 1.25,
  },
  ultra: {
    level: 'ultra',
    shadowSize: 4096,
    shadowDistance: 72,
    shadowTaps: 12,
    bloom: true,
    godRays: true,
    msaa: 4,
    fancyLeaves: true,
    clouds: true,
    waving: true,
    maxPixelRatio: 2,
  },
};

export const QUALITY_NAMES: Record<QualityLevel, string> = {
  low: 'Низкая (телефоны)',
  medium: 'Средняя',
  high: 'Высокая (шейдеры)',
  ultra: 'Ультра',
};

/**
 * Конвейер рендера: тени от солнца → сцена в HDR (с MSAA) → рука/предмет →
 * свечение (bloom) → финальный проход (лучи, тонмаппинг, цвет, виньетка).
 */
export class Pipeline {
  readonly renderer: THREE.WebGLRenderer;
  readonly handScene = new THREE.Scene();
  readonly handCamera = new THREE.PerspectiveCamera(70, 1, 0.01, 10);
  private sceneRT!: THREE.WebGLRenderTarget;
  private shadowRT: THREE.WebGLRenderTarget | null = null;
  private readonly shadowCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 400);
  private bloom: UnrealBloomPass | null = null;
  private readonly finalQuad: FullScreenQuad;
  private readonly finalMaterial: THREE.ShaderMaterial;
  /** Материал сущностей в проходе теней. */
  readonly entityDepth = new THREE.MeshDepthMaterial();
  private width = 1;
  private height = 1;
  /** Доля разрешения (0.5..1): понижается автоматически, если видеокарта не успевает. */
  private renderScale = 1;
  /** Вызывается перед каждым проходом (кадр или тени) — здесь чанки отсекаются под его камеру. */
  onPass: (camera: THREE.Camera, shadow: boolean) => void = () => {};
  /** Сила красной виньетки при получении урона (0..1). */
  damageFlash = 0;
  exposure = 1.0;

  constructor(
    container: HTMLElement,
    private readonly scene: THREE.Scene,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly uniforms: SharedUniforms,
    private quality: QualitySettings,
  ) {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', stencil: false });
    this.renderer.autoClear = false;
    this.renderer.info.autoReset = false;
    // Проверка ошибок шейдеров ждёт окончания компиляции синхронно — в собранной игре она не нужна.
    this.renderer.debug.checkShaderErrors = import.meta.env.DEV;
    container.prepend(this.renderer.domElement);
    this.camera.layers.enable(LAYER_TERRAIN);
    this.camera.layers.enable(LAYER_CUTOUT);
    this.camera.layers.enable(LAYER_ENTITY);

    this.finalMaterial = new THREE.ShaderMaterial({
      vertexShader: FINAL_VERTEX,
      fragmentShader: FINAL_FRAGMENT,
      uniforms: {
        tColor: { value: null },
        tDepth: { value: null },
        uSunScreen: { value: new THREE.Vector2() },
        uSunVisible: { value: 0 },
        uRayColor: { value: new THREE.Vector3() },
        uExposure: { value: 1 },
        uSaturation: { value: 1.08 },
        uUnderwaterTint: { value: 0 },
        uTimeF: { value: 0 },
        uDamage: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.finalQuad = new FullScreenQuad(this.finalMaterial);
    this.setQuality(quality);
  }

  get hdrSupported(): boolean {
    return this.renderer.extensions.has('EXT_color_buffer_half_float') || this.renderer.extensions.has('EXT_color_buffer_float');
  }

  get scale(): number {
    return this.renderScale;
  }

  /** Меняет долю разрешения (динамическое разрешение). */
  setRenderScale(scale: number): void {
    const s = Math.max(0.5, Math.min(1, scale));
    if (Math.abs(s - this.renderScale) < 0.01) return;
    this.renderScale = s;
    this.applyPixelRatio();
    this.resize(this.width, this.height, true);
  }

  private applyPixelRatio(): void {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.quality.maxPixelRatio) * this.renderScale);
  }

  setQuality(q: QualitySettings): void {
    this.quality = q;
    this.applyPixelRatio();
    this.finalMaterial.defines = q.godRays ? { GOD_RAYS: 1 } : {};
    this.finalMaterial.needsUpdate = true;

    this.shadowRT?.dispose();
    this.shadowRT = null;
    if (q.shadowSize > 0) {
      const depthTexture = new THREE.DepthTexture(q.shadowSize, q.shadowSize);
      // Аппаратное сравнение глубины со сглаживанием (sampler2DShadow в шейдере).
      depthTexture.compareFunction = THREE.LessEqualCompare;
      depthTexture.minFilter = depthTexture.magFilter = THREE.LinearFilter;
      this.shadowRT = new THREE.WebGLRenderTarget(q.shadowSize, q.shadowSize, { depthTexture, depthBuffer: true });
      this.uniforms.uShadowMap.value = depthTexture;
      this.uniforms.uShadowTexel.value = 1 / q.shadowSize;
    } else {
      this.uniforms.uShadowMap.value = null;
    }
    this.resize(this.width, this.height, true);
  }

  resize(width: number, height: number, force = false): void {
    if (!force && width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.handCamera.aspect = width / height;
    this.handCamera.updateProjectionMatrix();

    const pr = this.renderer.getPixelRatio();
    const w = Math.max(1, Math.floor(width * pr));
    const h = Math.max(1, Math.floor(height * pr));
    this.sceneRT?.dispose();
    this.sceneRT = new THREE.WebGLRenderTarget(w, h, {
      type: this.hdrSupported ? THREE.HalfFloatType : THREE.UnsignedByteType,
      samples: this.quality.msaa,
      depthTexture: new THREE.DepthTexture(w, h),
      depthBuffer: true,
    });
    this.bloom?.dispose();
    this.bloom = this.quality.bloom ? new UnrealBloomPass(new THREE.Vector2(w / 2, h / 2), 0.32, 0.55, 1.05) : null;
  }

  /**
   * Заранее компилирует в фоне шейдеры образцов (мобы, предметы...), чтобы первый моб
   * или выпавший предмет не «подвешивал» игру, а потом готовит и всё, что уже есть в сценах
   * (частицы, дождь, рамка выделения). Освещение берётся из сцены, рендер-таргет — сцены:
   * от них зависит вариант шейдера. Образцы не должны удаляться, пока идёт фоновая проверка.
   */
  precompile(samples: THREE.Object3D): Promise<void> {
    const r = this.renderer;
    const onSceneTarget = <T>(fn: () => T): T => {
      const prev = r.getRenderTarget();
      r.setRenderTarget(this.sceneRT);
      try {
        return fn();
      } finally {
        r.setRenderTarget(prev);
      }
    };
    // Готовые программы сразу опрашиваем (uniform-ы, атрибуты): этот синхронный запрос
    // к видеокарте иначе случился бы посреди игры, при первом появлении объекта.
    const touch = (o: THREE.Object3D) => {
      const material = (o as THREE.Mesh).material;
      for (const m of Array.isArray(material) ? material : material ? [material] : []) {
        const props = r.properties.get(m) as { currentProgram?: { getUniforms(): unknown } };
        props.currentProgram?.getUniforms();
      }
    };
    return onSceneTarget(() => r.compileAsync(samples, this.camera, this.scene)).then(() => {
      onSceneTarget(() => {
        r.compile(this.scene, this.camera);
        r.compile(this.handScene, this.handCamera);
      });
      this.scene.traverse(touch);
      this.handScene.traverse(touch);
    });
  }

  /** Тени: ортографическая камера со стороны солнца, привязанная к сетке текселей. */
  private renderShadows(materials: TerrainMaterials, center: THREE.Vector3): void {
    if (!this.shadowRT) return;
    const q = this.quality;
    const cam = this.shadowCamera;
    const d = q.shadowDistance;
    cam.left = -d;
    cam.right = d;
    cam.top = d;
    cam.bottom = -d;
    // Глубина — сколько блоков в сторону солнца собираем тех, кто отбрасывает тень. При низком
    // солнце больше 400 блоков по лучу — это десятки лишних чанков в карте теней.
    const depth = d + 48;
    cam.near = 1;
    cam.far = depth * 2;
    const lightDir = this.uniforms.uLightDir.value;
    cam.position.copy(center).addScaledVector(lightDir, depth);
    cam.up.set(0, 0, 1);
    cam.lookAt(center);
    cam.updateMatrixWorld();
    cam.updateProjectionMatrix();

    // Сдвигаем проекцию на долю текселя, чтобы тени не «дрожали» при движении.
    const m = new THREE.Matrix4().multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
    const origin = new THREE.Vector4(0, 0, 0, 1).applyMatrix4(m);
    const half = q.shadowSize / 2;
    const ox = (Math.round(origin.x * half) - origin.x * half) / half;
    const oy = (Math.round(origin.y * half) - origin.y * half) / half;
    cam.projectionMatrix.elements[12] += ox;
    cam.projectionMatrix.elements[13] += oy;
    this.uniforms.uShadowMatrix.value.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);

    const r = this.renderer;
    this.onPass(cam, true);
    r.setRenderTarget(this.shadowRT);
    r.clear(true, true, false);
    cam.layers.set(LAYER_TERRAIN);
    this.scene.overrideMaterial = materials.shadowOpaque;
    r.render(this.scene, cam);
    cam.layers.set(LAYER_CUTOUT);
    this.scene.overrideMaterial = materials.shadowCutout;
    r.render(this.scene, cam);
    cam.layers.set(LAYER_ENTITY);
    this.scene.overrideMaterial = this.entityDepth;
    r.render(this.scene, cam);
    this.scene.overrideMaterial = null;
  }

  render(materials: TerrainMaterials, env: Environment, shadowCenter: THREE.Vector3, time: number, underwater: boolean): void {
    const r = this.renderer;
    r.info.reset();
    if (this.shadowRT && this.uniforms.uLightColor.value.lengthSq() > 0.0001) this.renderShadows(materials, shadowCenter);

    this.onPass(this.camera, false);
    r.setRenderTarget(this.sceneRT);
    r.setClearColor(0x000000, 1);
    r.clear(true, true, false);
    r.render(this.scene, this.camera);
    r.clearDepth();
    r.render(this.handScene, this.handCamera);

    if (this.bloom) this.bloom.render(r, null as unknown as THREE.WebGLRenderTarget, this.sceneRT, 0, false);

    // Положение солнца на экране — для лучей.
    const fu = this.finalMaterial.uniforms;
    const sunWorld = this.camera.position.clone().addScaledVector(env.sunDir, 400);
    const sp = sunWorld.project(this.camera);
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    const facing = forward.dot(env.sunDir);
    fu.uSunScreen.value.set(sp.x * 0.5 + 0.5, sp.y * 0.5 + 0.5);
    fu.uSunVisible.value = facing > 0 && !underwater ? env.sunVisibility * Math.min(1, facing * 2) : 0;
    fu.uRayColor.value.copy(env.rayColor);
    fu.tColor.value = this.sceneRT.texture;
    fu.tDepth.value = this.sceneRT.depthTexture;
    fu.uExposure.value = this.exposure;
    fu.uUnderwaterTint.value = underwater ? 1 : 0;
    fu.uTimeF.value = time;
    fu.uDamage.value = this.damageFlash;
    r.setRenderTarget(null);
    r.clear(true, true, false);
    this.finalQuad.render(r);
  }

  dispose(): void {
    this.sceneRT.dispose();
    this.shadowRT?.dispose();
    this.bloom?.dispose();
    this.finalQuad.dispose();
    this.renderer.dispose();
  }
}
