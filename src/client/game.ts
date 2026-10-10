import * as THREE from 'three';
import { BLOCKS, Block, FACE_TILE, FULL_CUBE, SOLID, TYPE_MASK, isFluid, makeState, typeOf } from '../shared/blocks';
import { DAY_LENGTH, GAME_NAME, REACH, WORLD_HEIGHT, chunkKey } from '../shared/constants';
import { breakTime } from '../shared/drops';
import { stack, type ItemStack } from '../shared/inventory';
import { Item, itemDef } from '../shared/items';
import { bodyIntersectsBlock } from '../shared/physics';
import type { GameMode, PlayerInfo, ServerMessage, Vec3 } from '../shared/protocol';
import { selectionBoxes } from '../shared/shapes';
import { Biome, SNOW_LINE, WorldGenerator } from '../shared/worldgen';
import { SoundEngine, type SoundName } from './audio';
import { Avatar } from './avatars';
import { EntityRenderer } from './entities';
import { Input, isTouchDevice } from './input';
import { PlayerInventory } from './inventory';
import { InventoryUI } from './inventoryUI';
import type { Connection } from './net';
import { companionBlocks, computePlacement, isInteractive } from './placement';
import { DEATH_MESSAGES, LocalPlayer } from './player';
import { raycastBlocks, raycastFluid, type RayHit } from './raycast';
import { Environment } from './render/environment';
import { FirstPersonHand } from './render/hand';
import { ItemMeshes } from './render/items3d';
import { createAtlasTexture, createSharedUniforms, createTerrainMaterials, type TerrainMaterials } from './render/materials';
import { BlockOverlays, Rain } from './render/overlays';
import { Particles } from './render/particles';
import { Pipeline, QUALITY_NAMES, QUALITY_PRESETS, type QualityLevel, type QualitySettings } from './render/pipeline';
import { saveSettings, type Settings } from './settings';
import type { Atlas } from './textures';
import { $, type UI } from './ui';
import { ChunkManager, World } from './world';

type Mode = 'loading' | 'play' | 'pause' | 'chat' | 'inventory' | 'dead' | 'disconnected';

/** Флаг в sessionStorage: после перезагрузки сразу войти в игру. */
export const AUTOJOIN_KEY = 'minecraft:autojoin';
type Welcome = Extract<ServerMessage, { t: 'welcome' }>;

const ACTION_REPEAT = 0.25;
const lightCurve = (l: number) => l / (3 - 2 * l);
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Вторая половина двери/кровати, которая ломается вместе с первой. */
function companionBreak(x: number, y: number, z: number, state: number, get: (x: number, y: number, z: number) => number): [number, number, number][] {
  const type = typeOf(state);
  const meta = state >>> 10;
  if (type === Block.OAK_DOOR) {
    const oy = meta & 8 ? y - 1 : y + 1;
    return typeOf(get(x, oy, z)) === Block.OAK_DOOR ? [[x, oy, z]] : [];
  }
  if (type === Block.BED) {
    const dir = meta & 4 ? ((meta & 3) + 2) & 3 : meta & 3;
    const [dx, dz] = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ][dir];
    return typeOf(get(x + dx, y, z + dz)) === Block.BED ? [[x + dx, y, z + dz]] : [];
  }
  return [];
}

export class Game {
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(75, 1, 0.05, 1200);
  private readonly uniforms = createSharedUniforms();
  private readonly pipeline: Pipeline;
  private readonly env: Environment;
  private readonly atlasTex: THREE.DataArrayTexture;
  private materials: TerrainMaterials;
  private quality: QualitySettings;
  private readonly world = new World();
  private readonly chunks: ChunkManager;
  private readonly player: LocalPlayer;
  private readonly inv = new PlayerInventory();
  private readonly invUI: InventoryUI;
  private readonly itemMeshes: ItemMeshes;
  private readonly entities: EntityRenderer;
  private readonly particles: Particles;
  private readonly overlays: BlockOverlays;
  private readonly rainFx: Rain;
  private readonly hand: FirstPersonHand;
  private readonly sound = new SoundEngine();
  private readonly input: Input;
  private readonly avatars = new Map<number, Avatar>();
  private readonly colors = new Map<number, string>();
  private readonly selfAvatar: Avatar;
  private readonly touch = isTouchDevice();
  private readonly myId: number;

  private mode: Mode = 'loading';
  private autoReconnect = false;
  private tipsPending = false;
  private gameMode: GameMode;
  private time: number;
  private rain: number;
  private rainLevel: number;
  private spawn: Vec3;
  private openContainerId: string | null = null;
  private target: RayHit | null = null;
  private targetEntity: { id: number; dist: number } | null = null;
  private attackHeld = false;
  private useHeld = false;
  private breakProgress = 0;
  private breakKey = '';
  private breakTick = 0;
  private actionCooldown = 0;
  private attackCooldown = 0;
  private eating = 0;
  private bowDraw = 0;
  private view = 0;
  private debug = false;
  private fps = 0;
  private fpsFrames = 0;
  private fpsTime = 0;
  private lastFrame = performance.now();
  private lastSent = 0;
  private readonly lastSentPos = new THREE.Vector3(Infinity, 0, 0);
  private lastSentRot: [number, number] = [0, 0];
  private invTimer = 0;
  private statsTimer = 0;
  private damageFlash = 0;
  private shake = 0;
  private hurtTilt = 0;
  private lastHp = 20;
  private elapsed = 0;
  private readonly entityLight = new THREE.Vector3();
  /** Автоподстройка графики: замеры времени кадра, пока игрок не выбрал качество сам. */
  private autoQuality = true;
  private readonly perfFrames: number[] = [];
  private perfGood = 0;
  private playTime = 0;

  constructor(
    private readonly conn: Connection,
    welcome: Welcome,
    private readonly settings: Settings,
    private readonly ui: UI,
    atlas: Atlas,
  ) {
    this.myId = welcome.id;
    this.time = welcome.time;
    this.rain = welcome.rain;
    this.rainLevel = welcome.rain;
    this.gameMode = welcome.self.mode;
    this.spawn = welcome.self.spawn;

    this.quality = QUALITY_PRESETS[settings.quality];
    this.atlasTex = createAtlasTexture(atlas.data, atlas.count);
    this.materials = this.makeMaterials();
    this.pipeline = new Pipeline($('app'), this.scene, this.camera, this.uniforms, this.quality);
    this.camera.rotation.order = 'YXZ';
    this.camera.fov = settings.fov;
    this.env = new Environment(this.scene, this.uniforms);
    this.env.setClouds(this.quality.clouds);

    // Свет для сущностей (мобы, игроки, предметы); освещённость клетки — в uEntityLight.
    this.scene.add(new THREE.AmbientLight('#ffffff', Math.PI * 0.62));
    const entSun = new THREE.DirectionalLight('#ffffff', Math.PI * 0.5);
    entSun.position.set(0.4, 1, 0.6);
    this.scene.add(entSun);

    this.chunks = new ChunkManager(this.world, this.scene, this.materials, welcome.seed, settings.renderDistance);
    this.chunks.meshOptions = { fancyLeaves: this.quality.fancyLeaves };
    this.world.applyEdits(welcome.edits);

    this.player = new LocalPlayer(this.world);
    this.player.setPosition(...welcome.self.p);
    this.player.yaw = welcome.self.r[0];
    this.player.pitch = welcome.self.r[1];
    this.player.hp = welcome.self.hp;
    this.player.food = welcome.self.food;
    this.player.saturation = welcome.self.saturation;
    this.player.mode = this.gameMode;
    this.player.armorPoints = () => this.inv.armorPoints();
    this.lastHp = this.player.hp;

    this.itemMeshes = new ItemMeshes(atlas, this.materials);
    this.particles = new Particles(
      this.scene,
      this.atlasTex,
      this.uniforms,
      (x, y, z) => this.world.getState(x, y, z),
      (x, y, z) => this.world.getLight(x, y, z),
    );
    this.overlays = new BlockOverlays(this.scene, this.atlasTex);
    // Биомы нужны клиенту только для вида осадков: в пустыне сухо, в снегах — снег.
    const biomes = new WorldGenerator(welcome.seed);
    this.rainFx = new Rain(
      this.scene,
      this.uniforms,
      (x, z) => this.surfaceY(x, z),
      (x, y, z) => this.particles.splash(x, y, z, 2, FACE_TILE[Block.WATER * 384]),
      (x, y, z) => {
        const { biome } = biomes.column(x, z);
        if (biome === Biome.DESERT) return 0;
        return biome === Biome.SNOWY || (biome === Biome.MOUNTAINS && y > SNOW_LINE - 8) ? 2 : 1;
      },
    );
    this.hand = new FirstPersonHand(this.pipeline.handScene, this.itemMeshes, settings.color);
    this.entities = new EntityRenderer(this.scene, this.itemMeshes, this.world, this.particles, (lb, out) => this.lightColor(lb, out));
    for (const e of welcome.entities) this.entities.spawn(e);
    for (const p of welcome.players) this.addAvatar(p);
    this.selfAvatar = new Avatar(settings.name, settings.color, welcome.self.p, this.itemMeshes);
    this.selfAvatar.group.visible = false;
    this.scene.add(this.selfAvatar.group);

    this.sound.setVolume(settings.volume / 100);
    this.sound.setMusicVolume(settings.music / 100);

    this.input = new Input(this.pipeline.renderer.domElement, {
      attackStart: () => this.onAttackStart(),
      attackEnd: () => this.onAttackEnd(),
      useStart: () => this.onUseStart(),
      useEnd: () => this.onUseEnd(),
      pick: () => this.pickBlock(),
      hotbar: (slot) => this.selectSlot(slot),
      scroll: (dir) => this.selectSlot(this.inv.selected + dir),
      toggleFly: () => {
        if (this.gameMode !== 'creative') return;
        this.player.flying = !this.player.flying;
        this.player.vy = 0;
      },
      drop: (all) => this.dropHeld(all),
      chat: (prefix) => this.openChat(prefix),
      inventory: () => this.openInventory(),
      playerList: (show) => this.ui.setPlayerList(show ? this.playerList() : null),
      debug: () => (this.debug = !this.debug),
      pause: () => this.setMode('pause'),
      toggleView: () => (this.view = (this.view + 1) % 3),
    });
    this.input.sensitivity = settings.sensitivity;
    if (this.touch) this.input.setupTouch($('touch'));

    this.invUI = new InventoryUI(
      atlas,
      this.inv,
      {
        close: () => {
          if (this.openContainerId) this.conn.send({ t: 'containerClose' });
          this.openContainerId = null;
          if (this.mode === 'inventory') this.resume();
        },
        drop: (item) => this.dropItem(item, false),
        containerSlot: (cid, slot, item) => this.conn.send({ t: 'containerSlot', cid, slot, item }),
        sound: (name) => this.sound.play(name as SoundName),
      },
      () => this.gameMode,
    );

    this.inv.onOverflow = (item) => this.dropItem(item, false);
    this.inv.onChange = () => this.onInventoryChange();
    this.inv.load(welcome.self.inventory, welcome.self.armor, welcome.self.selected);

    this.bindPlayer();
    this.setupUI();
    this.setupPointerLock();
    window.addEventListener('resize', this.onResize);
    this.onResize();

    conn.onClose = (reason, kicked) => this.disconnect(reason, !kicked);
    conn.setHandler(this.onMessage);
    if (!conn.isOpen) this.disconnect('Соединение с сервером потеряно');

    this.applyGameMode();
    this.ui.setHud(true);
    this.setMode('loading');
    requestAnimationFrame(this.frame);
  }

  private makeMaterials(): TerrainMaterials {
    return createTerrainMaterials(this.atlasTex, this.uniforms, {
      shadows: this.quality.shadowSize > 0,
      shadowTaps: this.quality.shadowTaps,
      waving: this.quality.waving,
    });
  }

  /** Цвет освещения сущности по уровню света в её клетке (та же модель, что у блоков). */
  private lightColor(lb: number, out: THREE.Vector3): THREE.Vector3 {
    const sky = lightCurve((lb >> 4) / 15);
    const blk = lightCurve((lb & 15) / 15);
    const u = this.uniforms;
    out.copy(u.uAmbient.value).multiplyScalar(sky * 1.2);
    out.addScaledVector(u.uLightColor.value, 0.5 * smooth(0.6, 0.95, (lb >> 4) / 15));
    out.addScaledVector(u.uBlockLight.value, blk * blk * 1.35);
    out.addScalar(0.02);
    return out;
  }

  private surfaceY(x: number, z: number): number {
    for (let y = WORLD_HEIGHT - 1; y > 0; y--) {
      const t = this.world.getState(x, y, z) & TYPE_MASK;
      if (t !== Block.AIR && (SOLID[t] || isFluid(t) || BLOCKS[t].opacity > 0)) return y;
    }
    return 0;
  }

  // ---------- Режимы и интерфейс ----------

  private setMode(mode: Mode): void {
    if (this.mode === 'disconnected') return;
    this.mode = mode;
    this.input.active = mode === 'play';
    if (mode !== 'play') {
      this.input.release();
      this.attackHeld = this.useHeld = false;
      this.stopUsing();
      this.overlays.setCrack(null, -1);
    }
    if (mode === 'play') {
      $('resume').textContent = 'Вернуться к игре';
      // Подсказки — когда игрок действительно вошёл в игру, а не висит в меню паузы.
      if (this.tipsPending) {
        this.tipsPending = false;
        this.showTips();
      }
    }
    this.ui.show(
      mode === 'pause'
        ? 'pause'
        : mode === 'loading'
          ? 'loading'
          : mode === 'dead'
            ? 'death'
            : mode === 'disconnected'
              ? 'disconnected'
              : mode === 'inventory'
                ? 'inventory'
                : null,
    );
    $('touch').hidden = !this.touch || mode !== 'play';
    if (mode !== 'play' && mode !== 'loading' && !this.touch && document.pointerLockElement) document.exitPointerLock();
  }

  /** Вернуться в игру: на компьютере — через захват курсора. */
  private resume(): void {
    this.sound.unlock();
    if (this.touch) return this.setMode('play');
    this.ui.show(null);
    // Если курсор захватить не дали — показываем паузу (но не поверх смерти или обрыва связи).
    const fallback = () => {
      if (this.mode !== 'dead' && this.mode !== 'disconnected') this.setMode('pause');
    };
    try {
      const result = this.pipeline.renderer.domElement.requestPointerLock() as unknown as Promise<void> | undefined;
      result?.catch?.(fallback);
    } catch {
      fallback();
    }
  }

  private setupPointerLock(): void {
    document.addEventListener('pointerlockchange', () => {
      if (this.input.pointerLocked) {
        const waiting = this.mode === 'pause' || this.mode === 'chat' || this.mode === 'inventory' || (this.mode === 'dead' && this.player.alive);
        if (waiting) this.setMode('play');
      } else if (this.mode === 'play') this.setMode('pause');
    });
    document.addEventListener('pointerlockerror', () => {
      if (this.mode !== 'disconnected' && this.mode !== 'dead' && this.mode !== 'inventory') this.setMode('pause');
    });
    const canvas = this.pipeline.renderer.domElement;
    canvas.addEventListener('click', () => {
      this.sound.unlock();
      if (!this.touch && this.mode === 'pause') this.resume();
    });
    // Браузеры разрешают звук только после действия пользователя (на iOS — ещё и после сворачивания).
    const unlock = () => this.sound.unlock();
    for (const ev of ['pointerdown', 'keydown', 'touchend'] as const) window.addEventListener(ev, unlock, { capture: true, passive: true });
  }

  private setupUI(): void {
    const s = this.settings;
    $('resume').onclick = () => this.resume();
    $('reconnect').onclick = () => this.reconnect();
    $('disconnect-menu').onclick = () => location.reload();
    // Телефон свернул браузер и связь оборвалась — вернулись, сразу заходим снова.
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.mode === 'disconnected' && this.autoReconnect) this.reconnect();
    });
    $('to-menu').onclick = () => location.reload();
    $('respawn').onclick = () => this.respawn();
    $('wake').onclick = () => this.wake();
    $('fullscreen').onclick = () => {
      if (document.fullscreenElement) {
        void document.exitFullscreen().catch(() => {});
        return;
      }
      const lock = () => (screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> }).lock?.('landscape').catch(() => {});
      void document.documentElement.requestFullscreen?.().then(lock).catch(() => {});
    };

    const quality = $<HTMLSelectElement>('quality');
    quality.replaceChildren(
      ...(Object.keys(QUALITY_PRESETS) as QualityLevel[]).map((q) => {
        const o = document.createElement('option');
        o.value = q;
        o.textContent = QUALITY_NAMES[q];
        return o;
      }),
    );
    quality.value = s.quality;
    quality.onchange = () => {
      s.quality = quality.value as QualityLevel;
      saveSettings(s);
      this.autoQuality = false;
      this.setQuality(QUALITY_PRESETS[s.quality]);
    };

    const bind = (id: string, value: number, apply: (v: number) => void, label?: (v: number) => string) => {
      const input = $<HTMLInputElement>(id);
      const text = $(`${id}-value`);
      const show = (v: number) => (text.textContent = label ? label(v) : String(v));
      input.value = String(value);
      show(value);
      input.oninput = () => {
        const v = Number(input.value);
        show(v);
        apply(v);
        saveSettings(s);
      };
    };
    bind('rd', s.renderDistance, (v) => {
      s.renderDistance = v;
      this.chunks.setRenderDistance(v);
    });
    bind('sens', s.sensitivity, (v) => {
      s.sensitivity = v;
      this.input.sensitivity = v;
    });
    bind('fov', s.fov, (v) => (s.fov = v));
    bind(
      'vol',
      s.volume,
      (v) => {
        s.volume = v;
        this.sound.setVolume(v / 100);
      },
      (v) => `${v}%`,
    );
    bind(
      'music',
      s.music,
      (v) => {
        s.music = v;
        this.sound.setMusicVolume(v / 100);
      },
      (v) => (v ? `${v}%` : 'выкл'),
    );

    const chatInput = $<HTMLInputElement>('chat-input');
    $('chat-form').onsubmit = (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (text) this.conn.send({ t: 'chat', text });
      this.closeChat();
    };
    chatInput.onkeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeChat();
      }
    };
    window.addEventListener('keydown', (e) => {
      if (this.mode === 'inventory' && (e.code === 'KeyE' || e.code === 'Escape')) {
        e.preventDefault();
        this.invUI.close();
      }
    });
    this.renderHotbar();
  }

  private setQuality(q: QualitySettings): void {
    this.quality = q;
    const old = this.materials;
    this.materials = this.makeMaterials();
    this.pipeline.setQuality(q);
    this.chunks.setMaterials(this.materials, { fancyLeaves: q.fancyLeaves });
    this.itemMeshes.setMaterials(this.materials);
    this.env.setClouds(q.clouds);
    this.onResize();
    for (const m of [old.solid, old.translucent, old.shadowDepth]) m.dispose();
  }

  /**
   * Если кадры стабильно длиннее ~45 мс (меньше 22 FPS), понижаем качество на ступень
   * и сообщаем об этом в чате. Когда всё плавно — перестаём замерять.
   */
  private trackPerformance(frameMs: number, dt: number): void {
    if (!this.autoQuality || this.mode !== 'play' || document.hidden || this.chunks.pendingCount > 0) return;
    this.playTime += dt;
    if (this.playTime < 4) return;
    this.perfFrames.push(frameMs);
    if (this.perfFrames.length < 150) return;
    const sorted = this.perfFrames.sort((a, b) => a - b);
    const median = sorted[sorted.length >> 1];
    this.perfFrames.length = 0;
    const order: QualityLevel[] = ['low', 'medium', 'high', 'ultra'];
    const i = order.indexOf(this.quality.level);
    if (median > 45 && i > 0) {
      const next = order[i - 1];
      this.settings.quality = next;
      saveSettings(this.settings);
      this.setQuality(QUALITY_PRESETS[next]);
      $<HTMLSelectElement>('quality').value = next;
      this.ui.addChat(null, undefined, `Графика: «${QUALITY_NAMES[next]}» — так игра пойдёт плавнее. Изменить можно в меню паузы.`);
      this.perfGood = 0;
    } else if (median < 30 && ++this.perfGood >= 2) this.autoQuality = false;
  }

  private applyGameMode(): void {
    this.player.mode = this.gameMode;
    if (this.gameMode !== 'creative') this.player.flying = false;
    $('touch').classList.toggle('creative', this.gameMode === 'creative');
  }

  private renderHotbar(): void {
    this.ui.renderHotbar(this.inv, (slot) => this.selectSlot(slot));
  }

  private selectSlot(slot: number): void {
    this.inv.select(slot);
    this.stopUsing();
    this.ui.flashItemName(this.inv.held?.id ?? null);
  }

  private onInventoryChange(): void {
    this.renderHotbar();
    this.hand.setItem(this.inv.held?.id ?? null);
    this.selfAvatar.setHeld(this.inv.held?.id ?? 0);
    this.selfAvatar.setArmor(this.inv.armor.map((s) => s?.id ?? 0));
    this.invUI.refresh();
    this.invTimer = 0.4;
  }

  private sendInventory(): void {
    this.conn.send({ t: 'inventory', slots: this.inv.slots, armor: this.inv.armor, selected: this.inv.selected, held: this.inv.held?.id ?? 0 });
  }

  private openChat(prefix: string): void {
    if (this.mode !== 'play') return;
    this.setMode('chat');
    this.ui.openChat(prefix);
  }

  private closeChat(): void {
    this.ui.closeChat();
    if (this.mode === 'chat') this.resume();
  }

  private openInventory(): void {
    if (this.mode !== 'play') return;
    this.setMode('inventory');
    this.invUI.open(this.gameMode === 'creative' ? 'creative' : 'inventory');
  }

  private disconnect(reason: string, lost = true): void {
    if (this.mode === 'disconnected') return;
    $('disconnect-reason').textContent = reason;
    this.setMode('disconnected');
    this.ui.setHud(false);
    this.autoReconnect = lost;
    // Сервер перезапустился или мигнула сеть — пробуем один раз зайти заново.
    if (lost && !document.hidden) setTimeout(() => this.autoReconnect && !document.hidden && this.reconnect(), 3000);
  }

  /** Перезагрузка страницы с автоматическим входом под тем же ником. */
  private reconnect(): void {
    this.autoReconnect = false;
    try {
      sessionStorage.setItem(AUTOJOIN_KEY, '1');
    } catch {
      // без sessionStorage просто окажемся в меню
    }
    location.reload();
  }

  private playerList(): { name: string; color: string }[] {
    return [
      { name: `${this.settings.name} (вы)`, color: this.settings.color },
      ...[...this.avatars].map(([id, a]) => ({ name: a.name, color: this.colors.get(id) ?? '#fff' })),
    ];
  }

  private onResize = () => {
    this.pipeline.resize(window.innerWidth, window.innerHeight);
    const scale = window.innerHeight * this.pipeline.renderer.getPixelRatio();
    this.particles.setPixelScale(scale);
    this.rainFx.setPixelScale(scale);
  };

  // ---------- Сеть ----------

  private onMessage = (msg: ServerMessage) => {
    switch (msg.t) {
      case 'join':
        this.addAvatar(msg.player);
        break;
      case 'leave': {
        const a = this.avatars.get(msg.id);
        if (!a) break;
        this.scene.remove(a.group);
        a.dispose();
        this.avatars.delete(msg.id);
        this.colors.delete(msg.id);
        break;
      }
      case 'moves':
        for (let i = 0; i + 6 < msg.d.length; i += 7) {
          if (msg.d[i] === this.myId) continue;
          const a = this.avatars.get(msg.d[i]);
          if (!a) continue;
          a.setTarget(msg.d[i + 1], msg.d[i + 2], msg.d[i + 3], msg.d[i + 4], msg.d[i + 5]);
          a.sneaking = (msg.d[i + 6] & 1) !== 0;
          a.sleeping = (msg.d[i + 6] & 2) !== 0;
        }
        break;
      case 'playerInfo': {
        const a = this.avatars.get(msg.id);
        a?.setHeld(msg.held);
        a?.setArmor(msg.armor);
        break;
      }
      case 'swing':
        this.avatars.get(msg.id)?.swing();
        break;
      case 'blocks':
        for (let i = 0; i + 3 < msg.d.length; i += 4) this.applyRemoteBlock(msg.d[i], msg.d[i + 1], msg.d[i + 2], msg.d[i + 3]);
        break;
      case 'spawn':
        for (const e of msg.e) this.entities.spawn(e);
        break;
      case 'entities':
        this.entities.move(msg.d);
        break;
      case 'despawn': {
        const by = msg.by;
        const collector =
          by === this.myId
            ? () => new THREE.Vector3(this.player.x, this.player.y + 0.8, this.player.z)
            : by !== undefined && this.avatars.has(by)
              ? () => this.avatars.get(by)!.group.position.clone().add(new THREE.Vector3(0, 0.8, 0))
              : undefined;
        this.entities.remove(msg.ids, collector);
        break;
      }
      case 'entityEvent':
        this.entities.event(msg.id, msg.ev, msg.v);
        break;
      case 'hurt':
        this.player.damage(msg.amount, msg.cause, msg.kx, msg.kz);
        break;
      case 'give': {
        const left = this.inv.add({ ...msg.item });
        this.sound.play('pop', { pitch: 1 + Math.random() * 0.4 });
        if (left > 0) this.dropItem({ ...msg.item, count: left }, true);
        break;
      }
      case 'container':
        this.openContainerId = msg.c.cid;
        if (this.mode === 'play' || this.mode === 'inventory') {
          this.setMode('inventory');
          this.invUI.open(msg.c.kind, msg.c);
        }
        break;
      case 'containerSlot':
        this.invUI.setContainerSlot(msg.cid, msg.slot, msg.item);
        break;
      case 'containerProgress':
        this.invUI.setProgress(msg.cid, msg.burn, msg.burnMax, msg.cook);
        break;
      case 'containerClosed':
        this.invUI.containerClosed(msg.cid);
        break;
      case 'sound':
        this.sound.play(msg.name as SoundName, { x: msg.p[0], y: msg.p[1], z: msg.p[2], volume: msg.volume, pitch: msg.pitch });
        break;
      case 'explosion': {
        const [x, y, z] = msg.p;
        this.sound.play('explode', { x, y, z });
        this.particles.puff(x, y, z, 60, msg.power * 1.2, [1.4, 1.3, 1.2], 5);
        this.particles.puff(x, y, z, 20, msg.power * 0.6, [3, 2, 0.8], 3);
        const d = Math.hypot(this.player.x - x, this.player.y - y, this.player.z - z);
        this.shake = Math.max(this.shake, Math.max(0, 1 - d / 24));
        break;
      }
      case 'chat':
        this.ui.addChat(msg.from, msg.color, msg.text);
        break;
      case 'time':
        this.time = msg.time;
        break;
      case 'weather':
        this.rain = msg.rain;
        break;
      case 'tp':
        this.player.setPosition(...msg.p);
        break;
      case 'mode':
        this.gameMode = msg.mode;
        this.applyGameMode();
        break;
      case 'spawnPoint':
        this.spawn = msg.p;
        this.ui.addChat(null, undefined, 'Точка возрождения установлена');
        break;
      case 'sleep':
        this.player.sleeping = msg.sleeping;
        this.ui.setSleeping(msg.sleeping);
        break;
    }
  };

  /** Изменение блока с сервера (другой игрок, вода, взрыв...). */
  private applyRemoteBlock(x: number, y: number, z: number, state: number): void {
    const old = this.world.getState(x, y, z);
    if (!this.world.setState(x, y, z, state)) return;
    const ot = typeOf(old);
    const nt = typeOf(state);
    if (ot === nt) return;
    if (nt === Block.AIR && ot !== Block.AIR && !isFluid(old)) {
      this.particles.blockBreak(x, y, z, FACE_TILE[ot * 384]);
      this.sound.play(`break_${BLOCKS[ot].sound}` as SoundName, { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
    } else if (ot === Block.AIR && nt !== Block.AIR && !isFluid(state)) {
      this.sound.play(`place_${BLOCKS[nt].sound}` as SoundName, { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
    }
  }

  private addAvatar(p: PlayerInfo): void {
    if (p.id === this.myId || this.avatars.has(p.id)) return;
    const avatar = new Avatar(p.name, p.color, p.p, this.itemMeshes);
    avatar.setTarget(...p.p, p.r[0], p.r[1]);
    avatar.setHeld(p.held);
    avatar.setArmor(p.armor);
    this.avatars.set(p.id, avatar);
    this.colors.set(p.id, p.color);
    this.scene.add(avatar.group);
  }

  private sendMove(now: number, force = false): void {
    if (!force && now - this.lastSent < 50) return;
    const p = this.player;
    const pos = new THREE.Vector3(p.x, p.y, p.z);
    const changed =
      pos.distanceToSquared(this.lastSentPos) > 1e-4 || Math.abs(p.yaw - this.lastSentRot[0]) > 1e-3 || Math.abs(p.pitch - this.lastSentRot[1]) > 1e-3;
    if (!changed && now - this.lastSent < 2000) return;
    this.conn.send({ t: 'move', p: [p.x, p.y, p.z], r: [p.yaw, p.pitch], sneak: p.sneaking, fly: p.flying });
    this.lastSent = now;
    this.lastSentPos.copy(pos);
    this.lastSentRot = [p.yaw, p.pitch];
  }

  // ---------- Действия игрока ----------

  private get eye(): THREE.Vector3 {
    return new THREE.Vector3(this.player.x, this.player.y + this.player.eyeHeight, this.player.z);
  }

  private lookDir(): THREE.Vector3 {
    const p = this.player;
    return new THREE.Vector3(-Math.sin(p.yaw) * Math.cos(p.pitch), Math.sin(p.pitch), -Math.cos(p.yaw) * Math.cos(p.pitch));
  }

  private swing(): void {
    this.hand.swing();
    this.selfAvatar.swing();
    this.conn.send({ t: 'swing' });
  }

  private onAttackStart(): void {
    if (this.mode !== 'play' || !this.player.alive) return;
    this.attackHeld = true;
    this.breakProgress = 0;
    this.breakKey = '';
    // Моб ближе блока — бьём моба.
    if (this.targetEntity && (!this.target || this.targetEntity.dist < this.target.dist)) {
      this.attackEntity(this.targetEntity.id);
      return;
    }
    this.swing();
    if (this.gameMode === 'creative') this.creativeBreak();
  }

  private onAttackEnd(): void {
    this.attackHeld = false;
    this.breakProgress = 0;
    this.overlays.setCrack(null, -1);
  }

  private attackEntity(id: number): void {
    if (this.attackCooldown > 0) return;
    this.attackCooldown = 0.25;
    this.swing();
    const held = this.inv.held;
    const crit = this.player.vy < -0.5 && !this.player.onGround;
    this.conn.send({ t: 'attack', id, item: held?.id ?? null, crit });
    this.sound.play(crit ? 'strong_hit' : 'attack');
    this.player.addExhaustion(0.1);
    if (held && itemDef(held.id)?.tool && this.gameMode === 'survival') {
      const kind = itemDef(held.id)!.tool!.type;
      if (this.inv.damageHeld(kind === 'sword' ? 1 : 2)) this.sound.play('tool_break');
    }
  }

  private creativeBreak(): void {
    const t = this.target;
    if (!t || this.actionCooldown > 0) return;
    // В творческом режиме мечом блоки не ломаются.
    if (itemDef(this.inv.held?.id ?? 0)?.tool?.type === 'sword') return;
    this.actionCooldown = 0.2;
    this.breakBlock(t);
  }

  /** Блок разрушен (локально сразу, на сервере — подтверждается). */
  private breakBlock(t: RayHit): void {
    const state = t.state;
    const type = typeOf(state);
    this.world.setState(t.x, t.y, t.z, Block.AIR);
    for (const [x, y, z] of companionBreak(t.x, t.y, t.z, state, (bx, by, bz) => this.world.getState(bx, by, bz))) this.world.setState(x, y, z, Block.AIR);
    this.conn.send({ t: 'break', x: t.x, y: t.y, z: t.z, tool: this.inv.held?.id ?? null });
    this.particles.blockBreak(t.x, t.y, t.z, FACE_TILE[type * 384 + (state >>> 10) * 6]);
    this.sound.play(`break_${BLOCKS[type].sound}` as SoundName, { x: t.x + 0.5, y: t.y + 0.5, z: t.z + 0.5 });
    if (this.gameMode === 'survival') {
      this.player.addExhaustion(0.005);
      const held = this.inv.held;
      if (held && itemDef(held.id)?.tool && BLOCKS[type].hardness > 0) {
        const kind = itemDef(held.id)!.tool!.type;
        if (this.inv.damageHeld(kind === 'sword' ? 2 : 1)) this.sound.play('tool_break');
      }
    }
  }

  /** Добыча блока в режиме выживания: прогресс, трещины, звуки. */
  private updateBreaking(dt: number): void {
    if (!this.attackHeld) {
      this.overlays.setCrack(null, -1);
      return;
    }
    if (this.gameMode === 'creative') {
      if (this.actionCooldown <= 0) this.creativeBreak();
      return;
    }
    if (this.targetEntity && (!this.target || this.targetEntity.dist < this.target.dist)) {
      if (this.attackCooldown <= 0) this.attackEntity(this.targetEntity.id);
      this.overlays.setCrack(null, -1);
      return;
    }
    const t = this.target;
    if (!t) {
      this.breakProgress = 0;
      this.overlays.setCrack(null, -1);
      return;
    }
    const key = `${t.x},${t.y},${t.z},${t.state}`;
    if (key !== this.breakKey) {
      this.breakKey = key;
      this.breakProgress = 0;
      this.breakTick = 0;
    }
    if (this.actionCooldown > 0) return;
    const p = this.player;
    const time = breakTime(t.state, this.inv.held?.id ?? null, p.eyeInWater, p.onGround || p.onLadder || p.flying);
    if (!Number.isFinite(time)) return;
    this.breakProgress += time <= 0 ? 1 : dt / time;
    this.breakTick -= dt;
    if (this.breakTick <= 0) {
      this.breakTick = 0.25;
      this.swing();
      const type = typeOf(t.state);
      this.sound.play(`hit_${BLOCKS[type].sound}` as SoundName, { x: t.x + 0.5, y: t.y + 0.5, z: t.z + 0.5 });
      this.particles.blockBreak(t.x, t.y, t.z, FACE_TILE[type * 384 + (t.state >>> 10) * 6], 3, true);
    }
    const boxes = selectionBoxes(t.state, (dx, dy, dz) => this.world.getState(t.x + dx, t.y + dy, t.z + dz));
    this.overlays.setCrack({ x: t.x, y: t.y, z: t.z, boxes }, Math.floor(this.breakProgress * 10));
    if (this.breakProgress >= 1) {
      this.breakBlock(t);
      this.breakProgress = 0;
      this.breakKey = '';
      this.actionCooldown = ACTION_REPEAT;
      this.overlays.setCrack(null, -1);
    }
  }

  private onUseStart(): void {
    if (this.mode !== 'play' || !this.player.alive) return;
    this.useHeld = true;
    this.useItem(true);
  }

  private onUseEnd(): void {
    this.useHeld = false;
    if (this.bowDraw > 0) this.releaseBow();
    this.eating = 0;
  }

  private stopUsing(): void {
    this.eating = 0;
    this.bowDraw = 0;
  }

  /** ПКМ: открыть/переключить блок, поесть, натянуть лук, поставить блок... */
  private useItem(first: boolean): void {
    if (this.actionCooldown > 0 && !first) return;
    const p = this.player;
    const held = this.inv.held;
    const def = held ? itemDef(held.id) : undefined;
    const t = this.target;

    // Ножницы на овцу.
    if (this.targetEntity && (!t || this.targetEntity.dist < t.dist)) {
      if (held?.id === Item.SHEARS && this.entities.isMob(this.targetEntity.id) === 'sheep') {
        this.conn.send({ t: 'interactEntity', id: this.targetEntity.id, item: held.id });
        this.swing();
        if (this.gameMode === 'survival' && this.inv.damageHeld()) this.sound.play('tool_break');
        this.actionCooldown = ACTION_REPEAT;
        return;
      }
    }

    // Открыть/переключить блок (если не присели).
    if (t && isInteractive(t.state) && !p.sneaking) {
      if (!first) return;
      this.swing();
      if (typeOf(t.state) === Block.CRAFTING_TABLE) {
        this.setMode('inventory');
        this.invUI.open('crafting');
      } else this.conn.send({ t: 'interact', x: t.x, y: t.y, z: t.z });
      this.actionCooldown = ACTION_REPEAT;
      return;
    }

    if (def?.food) {
      if (p.food < 20 || this.gameMode === 'creative') this.eating = Math.max(this.eating, 0.0001);
      return;
    }
    if (held?.id === Item.BOW) {
      if (this.gameMode === 'creative' || this.inv.count(Item.ARROW) > 0) this.bowDraw = Math.max(this.bowDraw, 0.0001);
      return;
    }
    if (held?.id === Item.BUCKET) {
      const eye = this.eye;
      const dir = this.lookDir();
      const f = raycastFluid((x, y, z) => this.world.getState(x, y, z), eye.x, eye.y, eye.z, dir.x, dir.y, dir.z, REACH);
      if (f && f.state >>> 10 === 0) {
        const lava = typeOf(f.state) === Block.LAVA;
        this.conn.send({ t: 'use', x: f.x, y: f.y, z: f.z, action: 'fill' });
        this.world.setState(f.x, f.y, f.z, Block.AIR);
        this.sound.play('bucket_fill');
        if (this.gameMode === 'survival') this.inv.replaceHeld(stack(lava ? Item.LAVA_BUCKET : Item.WATER_BUCKET));
        this.actionCooldown = ACTION_REPEAT;
      }
      return;
    }
    if (!t) return;
    const beside = { x: t.x + t.nx, y: t.y + t.ny, z: t.z + t.nz };

    if (held?.id === Item.WATER_BUCKET || held?.id === Item.LAVA_BUCKET) {
      const lava = held.id === Item.LAVA_BUCKET;
      const pos = BLOCKS[typeOf(t.state)].replaceable ? t : beside;
      this.conn.send({ t: 'use', x: pos.x, y: pos.y, z: pos.z, action: 'empty', fluid: lava ? 'lava' : 'water' });
      this.world.setState(pos.x, pos.y, pos.z, makeState(lava ? Block.LAVA : Block.WATER));
      this.sound.play('bucket_empty');
      this.swing();
      if (this.gameMode === 'survival') this.inv.replaceHeld(stack(Item.BUCKET));
      this.actionCooldown = ACTION_REPEAT;
      return;
    }
    if (def?.tool?.type === 'hoe') {
      const type = typeOf(t.state);
      if ((type === Block.GRASS || type === Block.DIRT) && t.ny === 1 && this.world.getState(t.x, t.y + 1, t.z) === Block.AIR) {
        this.conn.send({ t: 'use', x: t.x, y: t.y, z: t.z, action: 'till' });
        this.world.setState(t.x, t.y, t.z, Block.FARMLAND);
        this.sound.play('step_gravel', { x: t.x + 0.5, y: t.y + 1, z: t.z + 0.5 });
        this.swing();
        if (this.gameMode === 'survival' && this.inv.damageHeld()) this.sound.play('tool_break');
        this.actionCooldown = ACTION_REPEAT;
      }
      return;
    }
    if (held?.id === Item.BONE_MEAL) {
      const type = typeOf(t.state);
      if (type === Block.WHEAT || type === Block.GRASS || type === Block.OAK_SAPLING || type === Block.BIRCH_SAPLING || type === Block.SPRUCE_SAPLING) {
        this.conn.send({ t: 'use', x: t.x, y: t.y, z: t.z, action: 'bonemeal' });
        this.particles.puff(t.x + 0.5, t.y + 1, t.z + 0.5, 8, 0.8, [0.4, 1.4, 0.4], 0.5);
        this.swing();
        if (this.gameMode === 'survival') this.inv.consumeHeld();
        this.actionCooldown = ACTION_REPEAT;
      }
      return;
    }
    if (held?.id === Item.FLINT_AND_STEEL) {
      if (typeOf(t.state) === Block.TNT) {
        this.conn.send({ t: 'use', x: t.x, y: t.y, z: t.z, action: 'ignite' });
        this.sound.play('flint_and_steel');
        this.swing();
        if (this.gameMode === 'survival' && this.inv.damageHeld()) this.sound.play('tool_break');
      }
      this.actionCooldown = ACTION_REPEAT;
      return;
    }

    // Установка блока.
    if (!held || !def?.places) return;
    const place = computePlacement(held.id, t, p.yaw, (x, y, z) => this.world.getState(x, y, z));
    if (!place || place.y < 1 || place.y >= WORLD_HEIGHT) return;
    const ptype = typeOf(place.state);
    const extra = companionBlocks(place);
    if (SOLID[ptype]) {
      for (const cell of [place, ...extra]) {
        if (bodyIntersectsBlock(p, cell.x, cell.y, cell.z)) return;
        if (this.entities.blocksCell(cell.x, cell.y, cell.z)) return;
        for (const a of this.avatars.values()) {
          if (bodyIntersectsBlock({ x: a.target.x, y: a.target.y, z: a.target.z, width: 0.6, height: 1.8 }, cell.x, cell.y, cell.z)) return;
        }
      }
    }
    this.world.setState(place.x, place.y, place.z, place.state);
    for (const e of extra) this.world.setState(e.x, e.y, e.z, e.state);
    // Свежая позиция перед установкой: сервер проверяет дистанцию по ней (важно при постройке столба в прыжке).
    this.sendMove(performance.now(), true);
    this.conn.send({ t: 'place', x: place.x, y: place.y, z: place.z, state: place.state, item: held.id });
    this.sound.play(`place_${BLOCKS[ptype].sound}` as SoundName, { x: place.x + 0.5, y: place.y + 0.5, z: place.z + 0.5 });
    this.swing();
    if (this.gameMode === 'survival') this.inv.consumeHeld();
    this.actionCooldown = ACTION_REPEAT;
  }

  /** Еда и лук — действия с удержанием. */
  private updateUsing(dt: number): void {
    const held = this.inv.held;
    const def = held ? itemDef(held.id) : undefined;
    if (this.eating > 0) {
      if (!this.useHeld || !def?.food) {
        this.eating = 0;
      } else {
        const before = this.eating;
        this.eating += dt;
        if (Math.floor(before / 0.24) !== Math.floor(this.eating / 0.24)) this.sound.play('eat', { pitch: 0.9 + Math.random() * 0.3 });
        if (this.eating >= 1.6) {
          this.player.eat(def.food.hunger, def.food.saturation);
          if (this.gameMode === 'survival') this.inv.consumeHeld();
          this.sound.play('burp');
          this.eating = 0;
        }
      }
    }
    if (this.bowDraw > 0) {
      if (held?.id !== Item.BOW) this.bowDraw = 0;
      else this.bowDraw += dt;
    }
    if (this.useHeld && this.eating === 0 && this.bowDraw === 0 && this.actionCooldown <= 0) this.useItem(false);
  }

  private releaseBow(): void {
    const power = Math.min(1, this.bowDraw);
    this.bowDraw = 0;
    if (power < 0.15) return;
    if (this.gameMode === 'survival' && !this.inv.takeOne(Item.ARROW)) return;
    const eye = this.eye;
    const dir = this.lookDir();
    const speed = 12 + power * 48;
    this.conn.send({
      t: 'shoot',
      p: [eye.x + dir.x * 0.6, eye.y + dir.y * 0.6, eye.z + dir.z * 0.6],
      v: [dir.x * speed, dir.y * speed, dir.z * speed],
    });
    this.sound.play('bow_shoot');
    if (this.gameMode === 'survival' && this.inv.damageHeld()) this.sound.play('tool_break');
  }

  private pickBlock(): void {
    const t = this.target;
    if (!t) return;
    const id = BLOCKS[typeOf(t.state)].item;
    if (id === null || !itemDef(id)) return;
    // Если предмет уже есть в хотбаре — просто выбираем его.
    for (let i = 0; i < 9; i++) if (this.inv.slots[i]?.id === id) return this.selectSlot(i);
    if (this.gameMode === 'creative') {
      this.inv.slots[this.inv.selected] = stack(id, itemDef(id)!.maxStack);
      this.inv.changed();
      return;
    }
    const from = this.inv.slots.findIndex((s, i) => i >= 9 && s?.id === id);
    if (from >= 0) {
      const tmp = this.inv.slots[this.inv.selected];
      this.inv.slots[this.inv.selected] = this.inv.slots[from];
      this.inv.slots[from] = tmp;
      this.inv.changed();
    }
  }

  private dropHeld(all: boolean): void {
    const held = this.inv.held;
    if (!held) return;
    const n = all ? held.count : 1;
    this.dropItem({ ...held, count: n }, false);
    this.inv.consumeHeld(n);
    this.swing();
  }

  /** Выбросить предмет перед собой. */
  private dropItem(item: ItemStack, returned: boolean): void {
    const eye = this.eye;
    const dir = this.lookDir();
    this.conn.send({
      t: 'drop',
      item,
      p: [eye.x + dir.x * 0.3, eye.y - 0.3, eye.z + dir.z * 0.3],
      v: [dir.x * 5, dir.y * 5 + 2, dir.z * 5],
      returned,
    });
  }

  /** Подсказки новичку в чате — один раз на этом устройстве. */
  private showTips(): void {
    const KEY = 'minecraft:tips-shown';
    try {
      if (localStorage.getItem(KEY)) return;
      localStorage.setItem(KEY, '1');
    } catch {
      return;
    }
    const tips = this.touch
      ? [
          'Добро пожаловать! Удерживайте палец на стволе дерева, чтобы добыть брёвна.',
          'Кнопка «Инвентарь» — крафт. Слева книга рецептов: нажмите на рецепт, потом заберите результат.',
          'Короткое касание — поставить блок. Сделайте верстак, а на нём — кирку и факелы.',
          'Ночью выходят монстры — постройте укрытие. Друзья заходят по ссылке или QR-коду из главного меню.',
        ]
      : [
          'Добро пожаловать! Зажмите ЛКМ на стволе дерева, чтобы добыть брёвна.',
          'E — инвентарь и крафт. Слева книга рецептов: кликните рецепт, потом заберите результат.',
          'ПКМ — поставить блок. Сделайте верстак, а на нём — кирку и факелы.',
          'Ночью выходят монстры — постройте укрытие. Друзья заходят по ссылке или QR-коду из главного меню, /help — команды.',
        ];
    tips.forEach((text, i) => setTimeout(() => this.ui.addChat(null, undefined, text), 1500 + i * 7000));
  }

  // ---------- Смерть, сон ----------

  private bindPlayer(): void {
    const p = this.player;
    p.onHurt = (amount, cause) => {
      this.sound.play('hurt');
      // Урон будит (сам флаг сна сбрасывает LocalPlayer.damage) — сообщаем серверу и убираем затемнение.
      if (this.ui.isSleeping) {
        this.ui.setSleeping(false);
        this.conn.send({ t: 'wake' });
      }
      if (cause !== 'fall' && cause !== 'drown' && cause !== 'starve') this.inv.damageArmor(amount);
    };
    p.onDeath = (cause) => this.onDeath(cause);
    p.onStep = () => {
      const below = typeOf(this.world.getState(Math.floor(p.x), Math.floor(p.y - 0.2), Math.floor(p.z)));
      if (below !== Block.AIR) this.sound.play(`step_${BLOCKS[below].sound}` as SoundName, { volume: 0.5 });
    };
    p.onLand = (d) => this.sound.play(d > 5 ? 'fall_big' : 'fall_small', { volume: Math.min(1, d / 6) });
    p.onSplash = () => {
      this.sound.play('splash');
      this.particles.splash(p.x, p.y + 0.5, p.z, 16, FACE_TILE[Block.WATER * 384]);
    };
  }

  private onDeath(cause: string): void {
    // Сначала экран смерти, потом закрываем окна (они вернут вещи из сетки крафта
    // и курсора в инвентарь), и только затем выбрасываем всё.
    this.setMode('dead');
    if (this.invUI.isOpen) this.invUI.close();
    this.openContainerId = null;
    this.ui.setSleeping(false);
    const items = this.gameMode === 'survival' ? this.inv.takeAll() : [];
    const text = DEATH_MESSAGES[cause] ?? `погибает (${cause})`;
    this.conn.send({ t: 'died', cause: text, items });
    this.sound.play('death');
    $('death-cause').textContent = `${this.settings.name} ${text}`;
  }

  private respawn(): void {
    this.ui.setSleeping(false);
    this.conn.send({ t: 'respawn' });
    this.player.respawn(...this.spawn);
    this.lastHp = 20;
    this.resume();
  }

  private wake(): void {
    if (!this.player.sleeping) return;
    this.player.sleeping = false;
    this.ui.setSleeping(false);
    this.conn.send({ t: 'wake' });
  }

  // ---------- Игровой цикл ----------

  /** Ждём, пока прогрузится чанк под ногами, и выталкиваем игрока из блоков. */
  private trySpawn(): boolean {
    const p = this.player;
    const R = this.chunks.renderDistance;
    this.ui.setLoading(Math.min(1, this.world.chunks.size / Math.max(1, Math.PI * (R + 1) * (R + 1))));
    if (!this.world.isReady(p.x, p.z)) return false;
    const x = Math.floor(p.x);
    const z = Math.floor(p.z);
    let y = Math.floor(p.y);
    const blocked = (yy: number) => FULL_CUBE[typeOf(this.world.getState(x, yy, z))] || FULL_CUBE[typeOf(this.world.getState(x, yy + 1, z))];
    if (blocked(y)) {
      while (y < WORLD_HEIGHT && blocked(y)) y++;
      p.setPosition(p.x, y, p.z);
    }
    return true;
  }

  private frame = (now: number) => {
    requestAnimationFrame(this.frame);
    // На медленных устройствах кадр может длиться до 0.1 с — физику считаем подшагами.
    const frameMs = now - this.lastFrame;
    const dt = Math.min(0.1, Math.max(0, frameMs / 1000));
    this.lastFrame = now;
    this.elapsed += dt;
    const p = this.player;
    const camera = this.camera;

    const [lookX, lookY] = this.input.consumeLook();
    if (!p.sleeping) {
      p.yaw -= lookX;
      p.pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, p.pitch - lookY));
    }
    this.actionCooldown = Math.max(0, this.actionCooldown - dt);
    this.attackCooldown = Math.max(0, this.attackCooldown - dt);

    if (this.mode === 'loading') {
      if (this.trySpawn()) {
        this.tipsPending = true;
        this.setMode(this.touch ? 'play' : 'pause');
      }
    } else if (this.world.isLoaded(p.x, p.z)) {
      const move = this.input.moveInput();
      // Во сне не ходим; любое движение, прыжок или Shift — встать с кровати.
      if (p.sleeping) {
        if (move.forward || move.strafe || move.jump || move.sneak) this.wake();
        move.forward = move.strafe = 0;
        move.jump = move.sneak = move.sprint = false;
      }
      if (this.eating > 0 || this.bowDraw > 0) {
        move.forward *= 0.3;
        move.strafe *= 0.3;
        move.sprint = false;
      }
      const steps = Math.ceil(dt / 0.05);
      for (let i = 0; i < steps; i++) p.update(dt / steps, move);
    }

    // Камера: от первого лица, со спины или спереди.
    const eye = this.eye;
    const shakeAmt = this.shake * 0.3;
    this.shake = Math.max(0, this.shake - dt * 1.5);
    this.hurtTilt = Math.max(0, this.hurtTilt - dt * 3);
    camera.rotation.set(
      p.pitch + (Math.random() - 0.5) * shakeAmt * 0.1,
      p.yaw + (Math.random() - 0.5) * shakeAmt * 0.1,
      Math.sin(this.hurtTilt * 8) * this.hurtTilt * 0.12,
    );
    if (p.sleeping) camera.position.set(p.x, p.y + 0.4, p.z);
    else camera.position.copy(eye);
    if (this.view > 0) {
      const dir = this.lookDir().multiplyScalar(this.view === 1 ? -1 : 1);
      const hit = raycastBlocks((x, y, z) => this.world.getState(x, y, z), eye.x, eye.y, eye.z, dir.x, dir.y, dir.z, 4);
      const dist = hit ? Math.max(0.3, hit.dist - 0.25) : 4;
      camera.position.addScaledVector(dir, dist);
      if (this.view === 2) camera.rotation.set(-p.pitch, p.yaw + Math.PI, 0);
    }
    const fovTarget = this.settings.fov * (p.sprinting ? 1.12 : 1) * (this.bowDraw > 0 ? 1 - Math.min(1, this.bowDraw) * 0.15 : 1);
    if (Math.abs(camera.fov - fovTarget) > 0.01) {
      camera.fov += (fovTarget - camera.fov) * Math.min(1, dt * 10);
      camera.updateProjectionMatrix();
    }

    this.chunks.update(p.x, p.z, this.mode === 'loading' ? 14 : 5);

    this.time = (this.time + dt * 20) % DAY_LENGTH;
    this.rainLevel += (this.rain - this.rainLevel) * Math.min(1, dt * 0.4);
    const underwater = p.eyeInWater && this.view === 0;
    this.uniforms.uTime.value = this.elapsed;
    this.uniforms.uCameraPos.value.copy(camera.position);
    this.env.update(this.time, this.rainLevel, camera, dt, this.chunks.renderDistance, underwater);
    this.ui.setUnderwater(underwater);

    this.updateTarget();
    if (this.mode === 'play') {
      this.updateBreaking(dt);
      this.updateUsing(dt);
    }

    // Свет в точке игрока — для руки и своей модели.
    const lb = this.world.getLight(Math.floor(p.x), Math.floor(p.y + 1), Math.floor(p.z));
    this.lightColor(lb, this.entityLight);
    this.hand.update(dt, {
      speed: p.onGround ? p.speed : 0,
      sky: (lb >> 4) / 15,
      block: (lb & 15) / 15,
      lightColor: this.entityLight,
      eating: this.eating > 0 ? Math.min(1, this.eating) : 0,
      bowDraw: this.bowDraw > 0 ? Math.min(1, this.bowDraw) : 0,
      mining: this.attackHeld && this.breakProgress > 0,
    });
    this.pipeline.handScene.visible = this.view === 0 && !p.sleeping;
    this.selfAvatar.group.visible = this.view > 0;
    if (this.view > 0) {
      this.selfAvatar.setTarget(p.x, p.y, p.z, p.yaw, p.pitch);
      this.selfAvatar.sneaking = p.sneaking;
      this.selfAvatar.light.value.copy(this.entityLight);
      this.selfAvatar.update(dt);
    }
    for (const a of this.avatars.values()) {
      const pos = a.group.position;
      this.lightColor(this.world.getLight(Math.floor(pos.x), Math.floor(pos.y + 1), Math.floor(pos.z)), a.light.value);
      a.update(dt);
    }
    this.entities.update(dt);
    this.particles.update(dt);
    this.rainFx.intensity = this.rainLevel;
    this.rainFx.update(dt, camera.position);

    // Звук.
    const exposed = lb >> 4 >= 14;
    this.sound.setListener(camera.position.x, camera.position.y, camera.position.z, p.yaw, p.pitch);
    this.sound.setUnderwater(underwater);
    this.sound.setRain(this.rainLevel * (exposed ? 1 : 0.3));

    // Синхронизация.
    if (this.mode !== 'loading') this.sendMove(now);
    if (this.invTimer > 0) {
      this.invTimer -= dt;
      if (this.invTimer <= 0) this.sendInventory();
    }
    this.statsTimer += dt;
    if (this.statsTimer > 3) {
      this.statsTimer = 0;
      this.conn.send({ t: 'stats', hp: p.hp, food: p.food, saturation: p.saturation });
    }

    // HUD.
    if (p.hp < this.lastHp) {
      this.damageFlash = 1;
      this.hurtTilt = 1;
    }
    this.lastHp = p.hp;
    this.damageFlash = Math.max(0, this.damageFlash - dt * 2.5);
    this.pipeline.damageFlash = this.damageFlash * 0.5;
    this.ui.setStatus(p.hp, p.food, this.inv.armorPoints(), p.air, this.gameMode, p.hp <= 4 && Math.floor(this.elapsed * 6) % 2 === 0);
    this.updateDebug(dt);
    this.trackPerformance(frameMs, dt);

    this.pipeline.render(this.materials, this.env, new THREE.Vector3(p.x, p.y, p.z), this.elapsed, underwater);
  };

  private updateTarget(): void {
    const eye = this.eye;
    const dir = this.lookDir();
    const reach = this.gameMode === 'creative' ? REACH + 1.5 : REACH;
    const getState = (x: number, y: number, z: number) => this.world.getState(x, y, z);
    const active = this.mode !== 'loading' && this.player.alive;
    this.target = active ? raycastBlocks(getState, eye.x, eye.y, eye.z, dir.x, dir.y, dir.z, reach) : null;
    this.targetEntity = active ? this.entities.raycast(eye, dir, Math.min(reach, 4.5)) : null;
    const t = this.target;
    const showBlock = t && !(this.targetEntity && this.targetEntity.dist < t.dist);
    this.overlays.setTarget(
      showBlock && t ? { x: t.x, y: t.y, z: t.z, boxes: selectionBoxes(t.state, (dx, dy, dz) => getState(t.x + dx, t.y + dy, t.z + dz)) } : null,
    );
  }

  private updateDebug(dt: number): void {
    this.fpsFrames++;
    this.fpsTime += dt;
    if (this.fpsTime >= 0.5) {
      this.fps = Math.round(this.fpsFrames / this.fpsTime);
      this.fpsFrames = 0;
      this.fpsTime = 0;
    }
    if (!this.debug) return this.ui.setDebug(null);
    const p = this.player;
    const dirs = ['север (-Z)', 'запад (-X)', 'юг (+Z)', 'восток (+X)'];
    const facing = dirs[((Math.round(p.yaw / (Math.PI / 2)) % 4) + 4) % 4];
    const hours = Math.floor((this.time / 1000 + 6) % 24);
    const minutes = Math.floor(((this.time % 1000) / 1000) * 60);
    const lb = this.world.getLight(Math.floor(p.x), Math.floor(p.y), Math.floor(p.z));
    const info = this.pipeline.renderer.info;
    this.ui.setDebug(
      [
        `${GAME_NAME} · ${this.fps} FPS · ${QUALITY_NAMES[this.quality.level]}`,
        `XYZ: ${p.x.toFixed(2)} / ${p.y.toFixed(2)} / ${p.z.toFixed(2)}`,
        `Чанк: ${chunkKey(Math.floor(p.x) >> 4, Math.floor(p.z) >> 4)} · загружено ${this.chunks.loadedCount}, в очереди ${this.chunks.pendingCount}`,
        `Смотрит на ${facing}`,
        `Свет: небо ${lb >> 4}, блоки ${lb & 15}`,
        `Время: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}${this.rain ? ', дождь' : ''}`,
        `Режим: ${this.gameMode === 'creative' ? 'творческий' : 'выживание'}${p.flying ? ', полёт' : ''}`,
        `Сущностей: ${this.entities.count} · игроков: ${this.avatars.size + 1}`,
        `Отрисовка: ${info.render.calls} вызовов, ${Math.round(info.render.triangles / 1000)}k треугольников`,
        this.target ? `Блок: ${BLOCKS[typeOf(this.target.state)].key} (${this.target.x} ${this.target.y} ${this.target.z})` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    );
  }
}
