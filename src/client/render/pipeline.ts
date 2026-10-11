import * as THREE from 'three';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import { Bloom } from './bloom';
import type { Environment } from './environment';
import { LAYER_CUTOUT, LAYER_ENTITY, LAYER_TERRAIN, type SharedUniforms, type TerrainMaterials } from './materials';
import { FINAL_FRAGMENT, FINAL_VERTEX, RAYS_FRAGMENT } from './shaders';

export type QualityLevel = 'low' | 'medium' | 'high' | 'ultra';

export interface QualitySettings {
  level: QualityLevel;
  shadowSize: number;
  shadowDistance: number;
  shadowTaps: number;
  /** Карта теней перерисовывается раз в столько кадров: за один кадр тени почти не сдвигаются. */
  shadowInterval: number;
  bloom: boolean;
  godRays: boolean;
  msaa: number;
  fancyLeaves: boolean;
  clouds: boolean;
  waving: boolean;
  maxPixelRatio: number;
  /**
   * Бюджет рендера в мегапикселях для плотных экранов (телефоны, Retina): там рисуем больше
   * одного пикселя на точку CSS, чтобы не было мыла, но и не все пиксели экрана.
   */
  megapixels: number;
}

export const QUALITY_PRESETS: Record<QualityLevel, QualitySettings> = {
  low: {
    level: 'low',
    shadowSize: 0,
    shadowDistance: 0,
    shadowTaps: 4,
    shadowInterval: 1,
    bloom: false,
    godRays: false,
    msaa: 0,
    fancyLeaves: false,
    clouds: true,
    waving: true,
    maxPixelRatio: 2,
    megapixels: 1,
  },
  medium: {
    level: 'medium',
    shadowSize: 1024,
    shadowDistance: 36,
    shadowTaps: 4,
    shadowInterval: 2,
    bloom: true,
    godRays: false,
    msaa: 0,
    fancyLeaves: true,
    clouds: true,
    waving: true,
    maxPixelRatio: 2,
    megapixels: 1.6,
  },
  high: {
    level: 'high',
    shadowSize: 2048,
    shadowDistance: 48,
    shadowTaps: 8,
    shadowInterval: 1,
    bloom: true,
    godRays: true,
    msaa: 2,
    fancyLeaves: true,
    clouds: true,
    waving: true,
    maxPixelRatio: 2,
    megapixels: 3,
  },
  ultra: {
    level: 'ultra',
    shadowSize: 4096,
    shadowDistance: 72,
    shadowTaps: 12,
    shadowInterval: 1,
    bloom: true,
    godRays: true,
    msaa: 4,
    fancyLeaves: true,
    clouds: true,
    waving: true,
    maxPixelRatio: 2,
    megapixels: 9,
  },
};

export const QUALITY_NAMES: Record<QualityLevel, string> = {
  low: 'Низкая (телефоны)',
  medium: 'Средняя',
  high: 'Высокая (шейдеры)',
  ultra: 'Ультра',
};

/** Свечение: что ярче порога (в HDR) — светится, и насколько сильно. */
const BLOOM_THRESHOLD = 1.05;
const BLOOM_STRENGTH = 0.2;

/**
 * Конвейер рендера: тени от солнца → сцена в HDR (с MSAA) → рука/предмет →
 * свечение и лучи в уменьшенном разрешении → финальный проход (тонмаппинг, цвет, виньетка).
 */
export class Pipeline {
  readonly renderer: THREE.WebGLRenderer;
  readonly handScene = new THREE.Scene();
  readonly handCamera = new THREE.PerspectiveCamera(70, 1, 0.01, 10);
  private sceneRT!: THREE.WebGLRenderTarget;
  private shadowRT: THREE.WebGLRenderTarget | null = null;
  private readonly shadowCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 400);
  private bloom: Bloom | null = null;
  private raysRT: THREE.WebGLRenderTarget | null = null;
  private readonly raysMaterial: THREE.ShaderMaterial;
  private readonly raysQuad: FullScreenQuad;
  private readonly finalQuad: FullScreenQuad;
  private readonly finalMaterial: THREE.ShaderMaterial;
  /** Материал сущностей в проходе теней. */
  readonly entityDepth = new THREE.MeshDepthMaterial();
  private width = 1;
  private height = 1;
  /** Доля разрешения (0.5..1): понижается автоматически, если видеокарта не успевает. */
  private renderScale = 1;
  /** Сколько кадров назад рисовали карту теней; -1 — нарисовать в ближайшем кадре. */
  private shadowAge = -1;
  /** Рисует процессор, а не видеокарта: там дорог каждый лишний пиксель и проход резкости. */
  private readonly software: boolean;
  /** Вызывается перед каждым проходом (кадр или тени) — здесь чанки отсекаются под его камеру. */
  onPass: (camera: THREE.Camera, shadow: boolean) => void = () => {};
  /** Разрешение рендера изменилось (окно, качество или динамическое разрешение). */
  onResolution: () => void = () => {};
  /** Сила красной виньетки при получении урона (0..1). */
  damageFlash = 0;
  /** Страх (0..1): тёмная виньетка и блеклые цвета; сбой изображения (0..1). */
  dread = 0;
  glitch = 0;
  exposure = 1.0;

  private readonly shadowMatrix = new THREE.Matrix4();
  private readonly shadowOrigin = new THREE.Vector4();
  private readonly sunPoint = new THREE.Vector3();
  private readonly forward = new THREE.Vector3();

  constructor(
    container: HTMLElement,
    private readonly scene: THREE.Scene,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly uniforms: SharedUniforms,
    private quality: QualitySettings,
  ) {
    // У холста нет своего буфера глубины: сцена рисуется в отдельную цель, на экран — только финальный проход.
    this.renderer = new THREE.WebGLRenderer({ antialias: false, depth: false, powerPreference: 'high-performance', stencil: false });
    this.renderer.autoClear = false;
    this.renderer.info.autoReset = false;
    // Проверка ошибок шейдеров ждёт окончания компиляции синхронно — в собранной игре она не нужна.
    this.renderer.debug.checkShaderErrors = import.meta.env.DEV;
    container.prepend(this.renderer.domElement);
    const gl = this.renderer.getContext();
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    this.software = /swiftshader|llvmpipe|software|basic render/i.test(String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER)));
    // Матрицы объектов пересчитываются один раз за кадр (в render), а не в каждом проходе.
    this.scene.matrixWorldAutoUpdate = false;
    this.camera.layers.enable(LAYER_TERRAIN);
    this.camera.layers.enable(LAYER_CUTOUT);
    this.camera.layers.enable(LAYER_ENTITY);

    this.finalMaterial = new THREE.ShaderMaterial({
      vertexShader: FINAL_VERTEX,
      fragmentShader: FINAL_FRAGMENT,
      uniforms: {
        tColor: { value: null },
        uTexel: { value: new THREE.Vector2() },
        uSharpness: { value: 0 },
        tBloom: { value: null },
        uBloomStrength: { value: BLOOM_STRENGTH },
        tRays: { value: null },
        uSunVisible: { value: 0 },
        uRayColor: { value: new THREE.Vector3() },
        uExposure: { value: 1 },
        uSaturation: { value: 1.08 },
        uUnderwaterTint: { value: 0 },
        uTimeF: { value: 0 },
        uDamage: { value: 0 },
        uDread: { value: 0 },
        uGlitch: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.finalQuad = new FullScreenQuad(this.finalMaterial);
    this.raysMaterial = new THREE.ShaderMaterial({
      vertexShader: FINAL_VERTEX,
      fragmentShader: RAYS_FRAGMENT,
      uniforms: { tDepth: { value: null }, uSunScreen: { value: new THREE.Vector2() } },
      depthTest: false,
      depthWrite: false,
    });
    this.raysQuad = new FullScreenQuad(this.raysMaterial);
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
    this.resize(this.width, this.height, true);
  }

  /**
   * Пикселей рендера на точку CSS: на обычном мониторе — как у экрана, на плотном экране
   * телефона — в пределах бюджета качества (раньше там было ровно 1, отсюда и мыло).
   */
  private basePixelRatio(): number {
    const dpr = window.devicePixelRatio || 1;
    if (this.software) return Math.min(dpr, 1);
    const budget = Math.sqrt((this.quality.megapixels * 1e6) / Math.max(1, this.width * this.height));
    return Math.min(dpr, this.quality.maxPixelRatio, Math.max(Math.min(dpr, 1), budget));
  }

  setQuality(q: QualitySettings): void {
    this.quality = q;
    const defines: Record<string, number> = {};
    if (q.godRays) defines.GOD_RAYS = 1;
    if (q.bloom) defines.BLOOM = 1;
    this.finalMaterial.defines = defines;
    this.finalMaterial.needsUpdate = true;

    if (q.bloom && !this.bloom) this.bloom = new Bloom(this.hdrSupported ? THREE.HalfFloatType : THREE.UnsignedByteType, BLOOM_THRESHOLD);
    else if (!q.bloom && this.bloom) {
      this.bloom.dispose();
      this.bloom = null;
    }

    this.shadowRT?.dispose();
    this.shadowRT = null;
    this.shadowAge = -1;
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
    if (this.raysRT) {
      // Шейдер лучей компилируем сейчас, а не в тот момент, когда игрок впервые посмотрит на солнце.
      this.renderer.setRenderTarget(this.raysRT);
      this.raysQuad.render(this.renderer);
      this.renderer.setRenderTarget(null);
    }
  }

  resize(width: number, height: number, force = false): void {
    if (!force && width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.renderer.setPixelRatio(this.basePixelRatio() * this.renderScale);
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.handCamera.aspect = width / height;
    this.handCamera.updateProjectionMatrix();

    const pr = this.renderer.getPixelRatio();
    const w = Math.max(1, Math.floor(width * pr));
    const h = Math.max(1, Math.floor(height * pr));
    const type = this.hdrSupported ? THREE.HalfFloatType : THREE.UnsignedByteType;
    this.sceneRT?.dispose();
    // Глубину сцены читают только лучи солнца. Без них хватает обычного буфера глубины,
    // который после кадра можно не сохранять (мобильным видеокартам это экономит полосу памяти).
    this.sceneRT = new THREE.WebGLRenderTarget(w, h, {
      type,
      samples: this.quality.msaa,
      depthBuffer: true,
      ...(this.quality.godRays ? { depthTexture: new THREE.DepthTexture(w, h) } : {}),
    });
    this.bloom?.setSize(w, h);
    this.raysRT?.dispose();
    this.raysRT = this.quality.godRays ? new THREE.WebGLRenderTarget(Math.max(1, w >> 2), Math.max(1, h >> 2), { type, depthBuffer: false }) : null;

    const fu = this.finalMaterial.uniforms;
    fu.uTexel.value.set(1 / w, 1 / h);
    fu.tRays.value = this.raysRT?.texture ?? null;
    // Если холст меньше экрана, браузер растягивает его и смягчает — возвращаем резкость
    // тем сильнее, чем сильнее растяжение. На обычном мониторе фильтр выключен.
    const upscale = (window.devicePixelRatio || 1) / pr;
    fu.uSharpness.value = this.software ? 0 : Math.min(0.125, Math.max(0, (upscale - 1) * 0.12));
    this.onResolution();
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
    const m = this.shadowMatrix.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
    const origin = this.shadowOrigin.set(0, 0, 0, 1).applyMatrix4(m);
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
    this.scene.updateMatrixWorld();
    // Вместе с картой теней хранится и её матрица, поэтому между перерисовками тени остаются на месте.
    if (this.shadowRT && this.uniforms.uLightColor.value.lengthSq() > 0.0001) {
      if (this.shadowAge < 0 || ++this.shadowAge >= this.quality.shadowInterval) {
        this.renderShadows(materials, shadowCenter);
        this.shadowAge = 0;
      }
    } else this.shadowAge = -1;

    this.onPass(this.camera, false);
    r.setRenderTarget(this.sceneRT);
    r.setClearColor(0x000000, 1);
    r.clear(true, true, false);
    r.render(this.scene, this.camera);
    r.clearDepth();
    r.render(this.handScene, this.handCamera);
    if (!this.sceneRT.depthTexture && !this.quality.msaa) {
      // Глубина сцены дальше не нужна — видеокарта может не выгружать её в память.
      const gl = r.getContext() as WebGL2RenderingContext;
      gl.invalidateFramebuffer(gl.FRAMEBUFFER, [gl.DEPTH_ATTACHMENT]);
    }

    const fu = this.finalMaterial.uniforms;
    if (this.bloom) fu.tBloom.value = this.bloom.render(r, this.sceneRT.texture, this.sceneRT.width, this.sceneRT.height);

    // Лучи: где солнце на экране и насколько его видно.
    const sp = this.sunPoint.copy(this.camera.position).addScaledVector(env.sunDir, 400).project(this.camera);
    const facing = this.camera.getWorldDirection(this.forward).dot(env.sunDir);
    const sunVisible = facing > 0 && !underwater ? env.sunVisibility * Math.min(1, facing * 2) : 0;
    fu.uSunVisible.value = sunVisible;
    if (this.raysRT && sunVisible > 0) {
      const ru = this.raysMaterial.uniforms;
      ru.tDepth.value = this.sceneRT.depthTexture;
      ru.uSunScreen.value.set(sp.x * 0.5 + 0.5, sp.y * 0.5 + 0.5);
      r.setRenderTarget(this.raysRT);
      this.raysQuad.render(r);
    }

    fu.uRayColor.value.copy(env.rayColor);
    fu.tColor.value = this.sceneRT.texture;
    fu.uExposure.value = this.exposure;
    fu.uUnderwaterTint.value = underwater ? 1 : 0;
    fu.uTimeF.value = time;
    fu.uDamage.value = this.damageFlash;
    fu.uDread.value = this.dread;
    fu.uGlitch.value = this.glitch;
    r.setRenderTarget(null);
    r.clear(true, false, false);
    this.finalQuad.render(r);
  }

  dispose(): void {
    this.sceneRT.dispose();
    this.shadowRT?.dispose();
    this.bloom?.dispose();
    this.raysRT?.dispose();
    this.raysQuad.dispose();
    this.raysMaterial.dispose();
    this.finalQuad.dispose();
    this.finalMaterial.dispose();
    this.renderer.dispose();
  }
}
