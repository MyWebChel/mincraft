import * as THREE from 'three';
import { BLOCKS, Block, FULL_CUBE, OPACITY, SOLID, isFluid, typeOf } from '../shared/blocks';
import { WORLD_HEIGHT } from '../shared/constants';
import type { PlayOptions, SoundEngine, SoundName } from './audio';
import type { EntityRenderer } from './entities';
import { createHerobrineModel, type MobModel, type MobPose } from './mobModels';
import type { LocalPlayer } from './player';
import type { Environment } from './render/environment';
import { applyEntityLight } from './render/materials';
import type { Pipeline } from './render/pipeline';
import type { UI } from './ui';
import type { World } from './world';

/** Что нужно режиссёру от игры. */
export interface HorrorHost {
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly player: LocalPlayer;
  readonly world: World;
  readonly sound: SoundEngine;
  readonly ui: UI;
  readonly entities: EntityRenderer;
  readonly env: Environment;
  readonly pipeline: Pipeline;
  /** Цвет света факелов (uniform uBlockLight) — для мерцания. */
  readonly torchLight: THREE.Vector3;
  readonly playerName: string;
  /** Туман: где начинается и где всё скрывается, в блоках. */
  fog(): [number, number];
  lightColor(lb: number, out: THREE.Vector3): THREE.Vector3;
  /** Игрок управляет персонажем: не меню, не чат, не загрузка. */
  playing(): boolean;
  /** Камера от первого лица. */
  firstPerson(): boolean;
}

/**
 * Как появился Херобрин: стоит вдали и смотрит; подходит ближе каждый раз, когда
 * отворачиваешься; одни глаза в темноте; за спиной; у кровати, когда проснулся.
 */
type Kind = 'watch' | 'approach' | 'eyes' | 'behind' | 'wake';

interface Appearance {
  kind: Kind;
  /** Ступни. */
  pos: THREE.Vector3;
  age: number;
  noticed: boolean;
  noticedAt: number;
  /** Сколько секунд игрок смотрит прямо на него. */
  lookTime: number;
  /** Сколько секунд его нет на экране. */
  awayTime: number;
  /** Подсказка звуком уже была (если игрок долго его не замечает). */
  cued: boolean;
  /** Когда (age) перейти на новое место, если игрок его так и не заметил. */
  moveAt: number;
  /** Стоит в пещере. */
  cave: boolean;
  /** До следующего удара сердца. */
  beat: number;
  /** Последний шаг «подходящего» Херобрина — он прямо перед игроком. */
  final: boolean;
  /** Сколько раз не нашлось места, чтобы подойти ближе. */
  misses: number;
  /** Исчезнет в этот момент (age), громко или тихо. */
  leaveAt: number;
  loud: boolean;
}

/** Высота глаз Херобрина над ступнями. */
const EYES = 1.72;
/** Как часто происходит жуткое (кнопка «Ужасы» в меню паузы). */
export const HORROR_LEVELS = ['выкл', 'иногда', 'часто', 'постоянно'] as const;
/** Во сколько раз длиннее паузы между событиями на каждом уровне. */
const PACE = [1, 1.8, 1, 0.5];
const HEROBRINE = 'Herobrine';
const HEROBRINE_COLOR = '#ffffff';

/** Что пишет Херобрин в чат ({name} — ник игрока). */
const LINES = [
  'я вижу тебя',
  'обернись',
  'ты здесь не один',
  'зачем ты сюда пришёл',
  'не спи',
  'я всегда был здесь',
  'уходи',
  'мне нравится смотреть, как ты строишь',
  'почему ты не смотришь на меня',
  'это мой мир',
  'не копай слишком глубоко',
  'ты слышишь шаги?',
  'помоги мне',
  'ещё не поздно уйти',
  'я за деревом',
  '...',
  '{name}',
  '{name}, я рядом',
  '{name}, посмотри назад',
];
/** Системные сообщения «от игры», искажённые. */
const SYSTEM_LINES = ['ОН ЗДЕСЬ', 'ты не один', 'Herobrine смотрит на тебя', 'не оборачивайся', 'не выключай свет', 'он ближе, чем ты думаешь'];
/** Слова, вспыхивающие на экране. */
const WORDS = ['ОН ЗДЕСЬ', 'НЕ СПИ', 'Я ВИЖУ ТЕБЯ', 'БЕГИ'];

const rand = (a: number, b: number) => a + Math.random() * (b - a);
/** Сквозь блок не видно: камень, земля, листва (но не стекло, трава и цветы). */
const opaque = (type: number) => FULL_CUBE[type] !== 0 || (SOLID[type] !== 0 && OPACITY[type] > 0);
const pick = <T>(list: readonly T[]): T => list[Math.floor(Math.random() * list.length)];
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Случайное событие с учётом весов; не получилось (нет мобов, дверей, места) — пробуем другое. */
function pickEvent(options: [number, () => boolean][]): boolean {
  while (options.length) {
    let r = Math.random() * options.reduce((sum, [w]) => sum + w, 0);
    let i = 0;
    while (i < options.length - 1 && (r -= options[i][0]) > 0) i++;
    if (options[i][1]()) return true;
    options.splice(i, 1);
  }
  return false;
}

/** «Искажённый» текст: к буквам липнут диакритические знаки. */
function zalgo(text: string, amount: number): string {
  let out = '';
  for (const ch of text) {
    out += ch;
    if (ch === ' ') continue;
    const n = Math.floor(Math.random() * amount);
    for (let i = 0; i < n; i++) out += String.fromCharCode(0x300 + Math.floor(Math.random() * 0x70));
  }
  return out;
}

/** Лицо Херобрина 8×8 для вспышки на весь экран. */
function faceCanvas(): HTMLCanvasElement {
  const rows = ['hhhhhhhh', 'hHhhhhHh', 'h......h', '........', '.ww..ww.', '...nn...', '..mmmm..', '........'];
  const colors: Record<string, [number, number, number]> = {
    h: [40, 24, 14],
    H: [58, 36, 22],
    '.': [150, 104, 84],
    w: [255, 255, 255],
    n: [112, 74, 58],
    m: [70, 38, 30],
  };
  const c = document.createElement('canvas');
  c.width = c.height = 8;
  const g = c.getContext('2d');
  if (!g) return c;
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      const [r, gr, b] = colors[ch];
      const k = ch === 'w' ? 1 : 0.85 + Math.random() * 0.2;
      g.fillStyle = `rgb(${r * k},${gr * k},${b * k})`;
      g.fillRect(x, y, 1, 1);
    }),
  );
  return c;
}

/** Мягкое пятно света: ореол вокруг глаз в темноте. */
function glowTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const g = c.getContext('2d');
  if (g) {
    const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(255,255,255,0.45)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 32, 32);
  }
  return new THREE.CanvasTexture(c);
}

/**
 * «Режиссёр ужасов»: решает, когда и где появится Херобрин и что ещё жуткого случится
 * (шаги за спиной, стук, шёпот, мерцание факелов, туман, кровавая луна, сообщения в чате).
 * Всё происходит только у этого игрока: сервер о Херобрине не знает, у друзей в том же
 * мире свои кошмары.
 */
export class HorrorDirector {
  /** Несуществующий игрок в списке Tab (или null). */
  ghost: string | null = null;
  /** Индекс в HORROR_LEVELS; 0 — выключено. */
  private level = 2;
  /** Время игры: идёт, только пока игрок играет (не в меню). */
  private clock = 0;
  private nextEvent = rand(25, 45);
  private nextHero = 0;
  private nextAmbient = rand(20, 40);
  private nextFace = 300;
  /** Игрок уже видел Херобрина вдали (до этого он появляется первым делом). */
  private seenHim = false;
  private heroFails = 0;
  private hero: Appearance | null = null;
  private readonly model: MobModel & { fade: number; glowFade: number };
  private readonly light = { value: new THREE.Vector3(1, 1, 1) };
  /** Ореол глаз: в темноте их видно издалека. */
  private readonly halo: THREE.SpriteMaterial;
  private readonly pose: MobPose = {
    walkPhase: 0,
    walkAmount: 0,
    headYaw: 0,
    headPitch: 0,
    attackTime: Infinity,
    fuse: 0,
    sheared: false,
    hurt: false,
    death: 0,
    time: 0,
  };
  private timers: { at: number; fn: () => void }[] = [];
  private dread = 0;
  private dreadLevel = 0;
  private dreadHold = 0;
  private glitch = 0;
  private glitchHold = 0;
  private flickerLen = 0;
  private flickerT = 0;
  private flickerK = 1;
  private flickerNext = 0;
  private readonly torchBase: THREE.Vector3;
  private wasNight = false;
  private wasSleeping = false;
  private flashEl: HTMLDivElement | null = null;
  private flashTimer = 0;
  private face: HTMLCanvasElement | null = null;
  /** Что видит и где находится игрок (обновляется каждый кадр). */
  private readonly eye = new THREE.Vector3();
  private readonly fwd = new THREE.Vector3();
  private readonly ndc = new THREE.Vector3();
  private sky = 15;
  private blk = 0;
  private underground = false;
  private indoors = false;
  /** События по именам — для случайного выбора, отладки и тестов. */
  private readonly events: Record<string, () => boolean> = {
    watch: () => this.watch(false),
    cave: () => this.watch(true),
    approach: () => this.approach(),
    eyes: () => this.eyes(),
    behind: () => this.behind(),
    wake: () => this.wakeScare(),
    turn: () => this.turnAround(),
    face: () => this.faceEvent(),
    join: () => this.fakeJoin(),
    chat: () => this.creepyChat(),
    stare: () => this.mobStare(),
    flicker: () => this.flicker(),
    fog: () => this.fogRoll(),
    steps: () => this.footsteps(),
    knock: () => this.knock(),
    door: () => this.doors(),
    scream: () => this.scream(),
    musicbox: () => this.musicBox(),
    whisper: () => this.whisper(),
    static: () => this.staticBurst(),
    blood: () => this.bloodMoon(),
  };

  constructor(private readonly host: HorrorHost) {
    this.torchBase = host.torchLight.clone();
    this.model = createHerobrineModel();
    applyEntityLight(this.model.group, this.light);
    this.halo = new THREE.SpriteMaterial({ map: glowTexture(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 });
    for (const side of [-1, 1]) {
      const eye = new THREE.Sprite(this.halo);
      eye.position.set((side * 2) / 16, EYES, -4.6 / 16);
      eye.scale.setScalar(0.6);
      this.model.group.add(eye);
    }
    this.model.group.visible = false;
    host.scene.add(this.model.group);
  }

  get isEnabled(): boolean {
    return this.level > 0;
  }

  private get enabled(): boolean {
    return this.level > 0;
  }

  /** Множитель пауз между событиями. */
  private get pace(): number {
    return PACE[this.level];
  }

  setLevel(level: number): void {
    level = Math.max(0, Math.min(HORROR_LEVELS.length - 1, Math.round(level) || 0));
    if (level === this.level) return;
    this.level = level;
    if (level > 0) {
      // Включили или поменяли частоту — первое событие вскоре.
      this.nextEvent = this.clock + rand(25, 45) * this.pace;
      this.nextHero = Math.min(this.nextHero, this.nextEvent);
      return;
    }
    this.vanish(false);
    this.timers = [];
    this.ghost = null;
    this.host.env.fogTarget = 0;
    this.host.env.bloodTarget = 0;
    this.flickerLen = 0;
    this.host.torchLight.copy(this.torchBase);
    if (this.flashEl) this.flashEl.hidden = true;
  }

  /** Запустить событие по имени (отладка, тесты). */
  trigger(name: string): boolean {
    this.sense();
    const fn = this.events[name];
    return !!fn && fn();
  }

  update(dt: number): void {
    const h = this.host;
    this.sense();
    if (this.hero && !h.player.alive) this.vanish(false);
    if (this.enabled && h.playing() && h.player.alive) {
      this.clock += dt;
      this.runTimers();
      this.updateSleep();
      this.updateBloodMoon();
      if (this.hero) this.updateHero(dt);
      else if (this.clock >= this.nextEvent && !h.player.sleeping) this.startEvent();
      this.updateAmbient();
    }
    this.updateFlicker(dt);
    if (this.hero) this.poseHero(dt);
    this.updateEffects(dt);
  }

  // ───────────────────────────── планировщик ─────────────────────────────

  private after(seconds: number, fn: () => void): void {
    this.timers.push({ at: this.clock + seconds, fn });
  }

  private runTimers(): void {
    if (!this.timers.length) return;
    const due = this.timers.filter((t) => t.at <= this.clock);
    if (!due.length) return;
    this.timers = this.timers.filter((t) => t.at > this.clock);
    for (const t of due) t.fn();
  }

  /** Пауза между событиями: ночью, в тумане, под кровавой луной и под землёй — чаще. */
  private cooldown(): number {
    const env = this.host.env;
    let k = 1;
    if (env.night > 0.5) k *= 0.75;
    if (env.bloodTarget > 0) k *= 0.6;
    if (env.fogTarget > 0) k *= 0.8;
    if (this.underground) k *= 0.85;
    return rand(25, 55) * k * this.pace;
  }

  private startEvent(): void {
    this.nextEvent = this.clock + this.cooldown();
    // Херобрин приходит, как только подошёл его черёд; между его появлениями — всё остальное.
    if (this.clock >= this.nextHero) {
      if (this.heroEvent()) {
        this.heroFails = 0;
        return;
      }
      // Подходящего места пока нет (стены, вода) — скоро попробуем снова.
      if (++this.heroFails < 8) {
        this.nextEvent = this.clock + 6;
        return;
      }
      this.heroFails = 0;
    }
    const env = this.host.env;
    const night = env.night > 0.5;
    const options: [number, () => boolean][] = [];
    const add = (weight: number, fn: () => boolean) => {
      if (weight > 0) options.push([weight, fn]);
    };
    add(night && this.clock >= this.nextFace ? 0.6 : 0, () => this.faceEvent());
    add(this.ghost ? 0 : 2, () => this.fakeJoin());
    add(1.2, () => this.creepyChat());
    add(1.5, () => this.mobStare());
    add(this.blk >= 6 ? 2.5 : 0, () => this.flicker());
    add(!this.underground && env.fogTarget === 0 ? 1.2 : 0, () => this.fogRoll());
    add(2, () => this.footsteps());
    add(this.indoors || this.underground ? 2.5 : 1, () => this.knock());
    add(1.5, () => this.doors());
    add(night || this.underground ? 1.2 : 0.4, () => this.scream());
    add(night || this.underground || this.indoors ? 1 : 0.3, () => this.musicBox());
    add(1.5, () => this.whisper());
    add(0.8, () => this.staticBurst());
    pickEvent(options);
  }

  /** Одно из появлений Херобрина; первое — всегда вдали, ради этого всё и затевалось. */
  private heroEvent(): boolean {
    if (!this.seenHim) return this.watch(this.underground) || (!this.underground && this.approach());
    const env = this.host.env;
    const night = env.night > 0.5;
    const dark = 1 - Math.max((this.sky / 15) * env.daylight, this.blk / 15) > 0.65;
    const fp = this.host.firstPerson();
    const options: [number, () => boolean][] = [];
    const add = (weight: number, fn: () => boolean) => {
      if (weight > 0) options.push([weight, fn]);
    };
    add(this.underground ? 5 : 6, () => this.watch(this.underground));
    add(this.underground || (night && dark) ? 3 : 0, () => this.eyes());
    add(this.underground ? 0 : night ? 3 : 1.5, () => this.approach());
    add(fp ? 2.5 : 0, () => this.behind());
    add(fp ? 0.7 : 0, () => this.turnAround());
    return pickEvent(options);
  }

  // ───────────────────────────── что видит игрок ─────────────────────────────

  private sense(): void {
    const h = this.host;
    const p = h.player;
    const w = h.world;
    this.eye.set(p.x, p.y + p.eyeHeight, p.z);
    h.camera.updateMatrixWorld();
    h.camera.getWorldDirection(this.fwd);
    const x = Math.floor(p.x);
    const y = Math.floor(this.eye.y);
    const z = Math.floor(p.z);
    const lb = w.getLight(x, y, z);
    this.sky = lb >> 4;
    this.blk = lb & 15;
    let roof = false;
    for (let dy = 1; dy <= 10 && !roof; dy++) roof = opaque(typeOf(w.getState(x, y + dy, z)));
    this.underground = roof && this.sky <= 4;
    this.indoors = roof && !this.underground;
  }

  /** Куда смотрит камера (yaw, как у игрока: вперёд = (−sin, −cos)). */
  private get lookYaw(): number {
    return Math.atan2(-this.fwd.x, -this.fwd.z);
  }

  /** Точка в направлении yaw на расстоянии d от глаз игрока. */
  private around(yaw: number, d: number, dy = 0): THREE.Vector3 {
    return new THREE.Vector3(this.eye.x - Math.sin(yaw) * d, this.eye.y + dy, this.eye.z - Math.cos(yaw) * d);
  }

  /** Положение точки на экране (−1..1) или null, если её не видно: за спиной, за краем, за стеной. */
  private screen(at: THREE.Vector3): THREE.Vector3 | null {
    const cam = this.host.camera;
    const v = this.ndc.copy(at).project(cam);
    if (v.z <= -1 || v.z >= 1 || Math.abs(v.x) > 0.95 || Math.abs(v.y) > 0.95) return null;
    return this.clear(cam.position, at) ? v : null;
  }

  /** Между точками нет непрозрачных блоков (strict — вообще ничего, кроме воздуха и стекла: ни травы, ни цветов). */
  private clear(a: THREE.Vector3, b: THREE.Vector3, strict = false): boolean {
    const w = this.host.world;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    const n = Math.ceil(Math.hypot(dx, dy, dz) / 0.25);
    let lx = NaN;
    let ly = NaN;
    let lz = NaN;
    for (let i = 1; i < n; i++) {
      const t = i / n;
      const x = Math.floor(a.x + dx * t);
      const y = Math.floor(a.y + dy * t);
      const z = Math.floor(a.z + dz * t);
      if (x === lx && y === ly && z === lz) continue;
      lx = x;
      ly = y;
      lz = z;
      const type = typeOf(w.getState(x, y, z));
      if (strict ? type !== Block.AIR && type !== Block.GLASS : opaque(type)) return false;
    }
    return true;
  }

  /** Здесь можно стоять: твёрдый блок (или листва) под ногами, свободно на уровне ног и головы. */
  private standable(x: number, y: number, z: number): boolean {
    if (y < 1 || y >= WORLD_HEIGHT - 2) return false;
    const w = this.host.world;
    const ground = w.getState(x, y - 1, z);
    const feet = w.getState(x, y, z);
    const head = w.getState(x, y + 1, z);
    return opaque(typeOf(ground)) && !SOLID[typeOf(feet)] && !isFluid(feet) && !SOLID[typeOf(head)] && !isFluid(head);
  }

  /** Ближайший пол в столбце от y+up до y−down (сверху вниз). */
  private floorNear(x: number, y: number, z: number, up: number, down: number): number | null {
    for (let yy = y + up; yy >= y - down; yy--) if (this.standable(x, yy, z)) return yy;
    return null;
  }

  /** Поверхность в столбце рядом с высотой игрока (не выше и не ниже 20 блоков). */
  private topNear(x: number, y: number, z: number): number | null {
    const top = Math.min(WORLD_HEIGHT - 3, y + 20);
    return this.floorNear(x, top, z, 0, top - Math.max(1, y - 20));
  }

  private head(feet: THREE.Vector3): THREE.Vector3 {
    return new THREE.Vector3(feet.x, feet.y + EYES, feet.z);
  }

  /**
   * Сюда не годится: игрок увидел бы, как он появляется (уже на экране), или не увидит,
   * даже обернувшись (лицо закрыто хоть травинкой, тело — стеной).
   */
  private hidden(feet: THREE.Vector3): boolean {
    const head = this.head(feet);
    return !this.clear(this.eye, head, true) || !this.clear(this.eye, new THREE.Vector3(feet.x, feet.y + 0.9, feet.z)) || this.screen(head) !== null;
  }

  /**
   * Место, где Херобрин будет стоять, пока игрок его не увидит: сейчас его на экране нет,
   * но между ним и игроком ничего не мешает. Чаще всего — сразу за краем экрана или прямо
   * впереди, пока игрок смотрит под ноги: стоит чуть повернуть голову или поднять взгляд.
   * edge — только за краем экрана.
   */
  private findSpot(minD: number, maxD: number, cave: boolean, edge = false): THREE.Vector3 | null {
    const w = this.host.world;
    const look = this.lookYaw;
    const by = Math.floor(this.host.player.y);
    for (let i = 0; i < 48; i++) {
      const r = edge ? 0.5 : Math.random();
      const side = Math.random() < 0.5 ? -1 : 1;
      const yaw = look + (r < 0.35 ? rand(-0.8, 0.8) : side * (r < 0.8 ? rand(1, 1.6) : rand(1.6, 2.7)));
      const d = rand(minD, maxD);
      const x = Math.floor(this.eye.x - Math.sin(yaw) * d);
      const z = Math.floor(this.eye.z - Math.cos(yaw) * d);
      if (!w.isLoaded(x, z)) continue;
      const y = cave ? this.floorNear(x, by, z, 6, 6) : this.topNear(x, by, z);
      // Не на вершине горы над головой и не в овраге далеко внизу.
      if (y === null || Math.abs(y - by) > 8) continue;
      const lb = w.getLight(x, y + 1, z);
      // На поверхности — под открытым небом; в пещере — там, где темно.
      if (cave ? (lb & 15) > 7 : lb >> 4 < 12) continue;
      const spot = new THREE.Vector3(x + 0.5, y, z + 0.5);
      if (this.hidden(spot)) continue;
      return spot;
    }
    return null;
  }

  // ───────────────────────────── Херобрин ─────────────────────────────

  private appear(kind: Kind, pos: THREE.Vector3, cave = false): void {
    this.hero = {
      kind,
      pos,
      age: 0,
      noticed: false,
      noticedAt: 0,
      lookTime: 0,
      awayTime: 0,
      cued: false,
      moveAt: 12,
      cave,
      beat: 0,
      final: false,
      misses: 0,
      leaveAt: 0,
      loud: false,
    };
    this.model.group.visible = true;
    this.nextHero = this.clock + rand(60, 110) * this.pace;
    this.poseHero(0);
  }

  /** Как далеко стоять, чтобы его было видно: днём дальше, в темноте ближе, в тумане — у края тумана. */
  private distances(cave: boolean, far: number): [number, number] {
    if (cave) return [11, 18];
    const max = Math.max(16, Math.min(this.host.env.night > 0.5 ? 22 : 28, far * 0.7));
    return [max * 0.6, max];
  }

  /** Стоит вдали (на поверхности или в пещере) и смотрит. */
  private watch(cave: boolean): boolean {
    if (this.hero) return false;
    const [minD, maxD] = this.distances(cave, this.host.fog()[1]);
    const spot = this.findSpot(minD, maxD, cave);
    if (!spot) return false;
    this.appear('watch', spot, cave);
    return true;
  }

  /** Как «смотрит», но каждый раз, когда игрок отворачивается, стоит ближе. */
  private approach(): boolean {
    if (this.hero || this.underground) return false;
    const [, maxD] = this.distances(false, this.host.fog()[1]);
    const spot = this.findSpot(maxD * 0.75, maxD, false);
    if (!spot) return false;
    this.appear('approach', spot);
    return true;
  }

  /** Одни светящиеся глаза в темноте. */
  private eyes(): boolean {
    if (this.hero) return false;
    const night = this.host.env.night > 0.5;
    if (!this.underground && !night) return false;
    const spot = this.findSpot(10, this.underground ? 18 : 20, this.underground);
    if (!spot || !this.dark(spot)) return false;
    this.appear('eyes', spot, this.underground);
    return true;
  }

  /** Факелов рядом нет — глаза светятся в темноте. */
  private dark(feet: THREE.Vector3): boolean {
    return (this.host.world.getLight(Math.floor(feet.x), Math.floor(feet.y + 1), Math.floor(feet.z)) & 15) <= 3;
  }

  /** Игрок его не замечает — переходит туда, где его увидят, стоит чуть повернуть голову. */
  private reposition(a: Appearance): void {
    let spot: THREE.Vector3 | null;
    if (a.kind === 'eyes') {
      spot = this.findSpot(10, a.cave ? 18 : 20, a.cave, true);
      if (spot && !this.dark(spot)) spot = null;
    } else {
      const [minD, maxD] = this.distances(a.cave, this.host.fog()[1]);
      spot = this.findSpot(a.kind === 'approach' ? maxD * 0.75 : minD, maxD, a.cave, true);
    }
    if (spot) a.pos.copy(spot);
  }

  /** Место в паре шагов за спиной: обернёшься — и увидишь его. */
  private behindSpot(): THREE.Vector3 | null {
    const look = this.lookYaw;
    const by = Math.floor(this.host.player.y);
    for (let i = 0; i < 20; i++) {
      const yaw = look + Math.PI + rand(-0.45, 0.45);
      const d = rand(2.4, 3.4);
      const x = Math.floor(this.eye.x - Math.sin(yaw) * d);
      const z = Math.floor(this.eye.z - Math.cos(yaw) * d);
      const y = this.floorNear(x, by, z, 1, 1);
      if (y === null) continue;
      const spot = new THREE.Vector3(x + 0.5, y, z + 0.5);
      if (!this.hidden(spot)) return spot;
    }
    return null;
  }

  /** Стоит в паре шагов за спиной и дышит. */
  private behind(): boolean {
    if (this.hero || !this.host.firstPerson()) return false;
    const spot = this.behindSpot();
    if (!spot) return false;
    const head = this.head(spot);
    this.appear('behind', spot);
    this.play('horror_breath', { x: head.x, y: head.y, z: head.z, volume: 1.5 });
    return true;
  }

  /** Проснулся — а он стоит у кровати. */
  private wakeScare(): boolean {
    if (this.hero) return false;
    const look = this.lookYaw;
    const by = Math.floor(this.host.player.y);
    for (let i = 0; i < 20; i++) {
      const yaw = look + rand(-0.5, 0.5);
      const d = rand(2.2, 3.8);
      const x = Math.floor(this.eye.x - Math.sin(yaw) * d);
      const z = Math.floor(this.eye.z - Math.cos(yaw) * d);
      const y = this.floorNear(x, by, z, 1, 2);
      if (y === null) continue;
      const spot = new THREE.Vector3(x + 0.5, y, z + 0.5);
      if (!this.clear(this.eye, this.head(spot), true)) continue;
      this.appear('wake', spot);
      return true;
    }
    return false;
  }

  private updateHero(dt: number): void {
    const a = this.hero!;
    a.age += dt;
    if (a.leaveAt > 0) {
      if (a.age >= a.leaveAt) this.vanish(a.loud);
      return;
    }
    const head = this.head(a.pos);
    const dist = head.distanceTo(this.eye);
    const s = this.screen(head);
    const onScreen = s !== null;
    // Заметным считаем почти весь экран, кроме самого края: резкий звук подскажет, куда смотреть.
    const central = s !== null && Math.abs(s.x) < 0.8 && Math.abs(s.y) < 0.8;
    const direct = s !== null && Math.abs(s.x) < 0.14 && Math.abs(s.y) < 0.2;
    a.awayTime = onScreen ? 0 : a.awayTime + dt;
    a.lookTime = direct ? a.lookTime + dt : Math.max(0, a.lookTime - dt);
    if (a.noticed) this.dreadFor(0.55 + 0.4 * (1 - Math.min(1, dist / 40)), 0.4);

    switch (a.kind) {
      case 'watch':
      case 'eyes': {
        if (!a.noticed) return this.unnoticed(a, central, head);
        this.heartbeat(a, dt, dist);
        if (a.kind === 'eyes') {
          // Подошёл или долго смотрел — глаза гаснут, остаётся шёпот.
          if (dist < 7 || a.lookTime > 1.1) {
            this.play('horror_whisper', { x: head.x, y: head.y, z: head.z, volume: 1.4 });
            this.vanish(false);
          } else if (a.awayTime > 1.2 || a.age - a.noticedAt > 25) this.vanish(false);
          return;
        }
        // Подойти к нему или выдержать его взгляд — он исчезает с помехами.
        // Отвернулся — его уже нет.
        if (dist < 10 || a.lookTime > 1.6 || a.age - a.noticedAt > 25) this.vanish(true);
        else if (a.awayTime > 1.2) this.vanish(false);
        return;
      }
      case 'approach': {
        if (!a.noticed) return this.unnoticed(a, central, head);
        this.heartbeat(a, dt, dist);
        if (a.final) {
          // Обернулся — он прямо перед лицом.
          if (onScreen) {
            this.scare(true);
            this.leave(a, 0.3, true);
          } else if (a.awayTime > 8) {
            this.play('horror_whisper', { x: head.x, y: head.y, z: head.z, volume: 1.4 });
            this.vanish(false);
          }
          return;
        }
        if (dist < 7 && central) {
          this.scare(false);
          this.leave(a, 0.25, true);
        } else if (a.awayTime > 0.7) this.stepCloser(a);
        else if (a.lookTime > 3 || a.age > 70) this.vanish(true);
        return;
      }
      case 'behind': {
        if (onScreen) {
          a.noticed = true;
          this.scare(false);
          this.leave(a, 0.35, true);
        } else if (a.age > 3.2 && !a.cued) {
          a.cued = true;
          this.play('horror_breath', { x: head.x, y: head.y, z: head.z, volume: 1.5 });
        } else if (a.age > 8) {
          this.play('horror_whisper', { x: head.x, y: head.y, z: head.z, volume: 1.5 });
          this.vanish(false);
        }
        return;
      }
      case 'wake': {
        if (!a.noticed) {
          if (a.age > 0.5 && onScreen) {
            a.noticed = true;
            a.noticedAt = a.age;
            this.play('horror_sting', { volume: 1.2 });
            this.glitchFor(0.4, 0.15);
          } else if (a.age > 6) this.vanish(false);
        } else if (a.age - a.noticedAt > 1.4 || a.lookTime > 0.7) this.vanish(true);
        return;
      }
    }
  }

  /**
   * Игрок его ещё не заметил: ждём; время от времени он переходит туда, где его увидят,
   * стоит чуть повернуть голову, и шепчет с той стороны; так и не заметили — уходит.
   */
  private unnoticed(a: Appearance, central: boolean, head: THREE.Vector3): void {
    if (central) {
      a.noticed = true;
      a.noticedAt = a.age;
      this.seenHim = true;
      const dist = head.distanceTo(this.eye);
      if (a.kind !== 'eyes') this.play('horror_sting', { volume: dist > 24 ? 0.8 : 1 });
      this.play('horror_drone', { volume: 0.9 });
      this.glitchFor(0.35, 0.12);
    } else if (a.age > 45) this.vanish(false);
    else if (a.age > a.moveAt) {
      a.moveAt = a.age + 12;
      this.reposition(a);
      if (!a.cued) {
        a.cued = true;
        const c = this.head(a.pos).sub(this.eye).setLength(6).add(this.eye);
        this.play('horror_whisper', { x: c.x, y: c.y, z: c.z, volume: 1 });
      }
    }
  }

  /** Отвернулся — «подходящий» Херобрин уже ближе; последний шаг — вплотную. */
  private stepCloser(a: Appearance): void {
    const dx = a.pos.x - this.eye.x;
    const dz = a.pos.z - this.eye.z;
    const d = Math.hypot(dx, dz);
    const final = d < 10;
    const next = final ? rand(2.6, 3.4) : d * 0.55;
    const base = Math.atan2(dx, dz);
    const by = Math.floor(this.host.player.y);
    for (let i = 0; i < 16; i++) {
      const yaw = base + (i === 0 ? 0 : rand(-0.7, 0.7));
      const r = i === 0 ? next : next * rand(0.8, 1.2);
      const x = Math.floor(this.eye.x + Math.sin(yaw) * r);
      const z = Math.floor(this.eye.z + Math.cos(yaw) * r);
      const y = this.floorNear(x, by, z, final ? 1 : 5, final ? 2 : 8);
      if (y === null) continue;
      const spot = new THREE.Vector3(x + 0.5, y, z + 0.5);
      if (this.hidden(spot)) continue;
      a.pos.copy(spot);
      a.awayTime = 0;
      a.final = final;
      return;
    }
    // Ближе встать негде — попробует чуть позже, а если так и не выйдет, уйдёт.
    a.awayTime = 0;
    if (++a.misses > 4) this.vanish(false);
  }

  private heartbeat(a: Appearance, dt: number, dist: number): void {
    a.beat -= dt;
    if (a.beat > 0) return;
    a.beat = dist < 12 ? 0.6 : 0.85;
    this.play('horror_heartbeat', { volume: dist < 12 ? 1 : 0.75 });
  }

  /** Скример: резкий звук, сбой изображения, иногда лицо на весь экран. */
  private scare(face: boolean): void {
    this.play('horror_sting', { volume: 1.4 });
    this.play('horror_static', { volume: 0.8 });
    this.glitchFor(1, 0.35);
    this.dreadFor(1, 3);
    if (face) this.flash(this.faceImage(), 170);
  }

  private leave(a: Appearance, delay: number, loud: boolean): void {
    a.leaveAt = a.age + delay;
    a.loud = loud;
  }

  private vanish(loud: boolean): void {
    const a = this.hero;
    if (!a) return;
    if (loud) {
      this.glitchFor(1, 0.25);
      this.play('horror_static', { volume: 0.9 });
    }
    this.model.group.visible = false;
    this.hero = null;
    // Не заметили — попробует снова пораньше.
    if (!a.noticed) this.nextHero = this.clock + rand(15, 30) * this.pace;
    this.nextEvent = Math.max(this.nextEvent, this.clock + rand(12, 25) * this.pace);
  }

  /** Поворачивается к игроку всем телом и смотрит в глаза; растворяется в тумане, кроме глаз. */
  private poseHero(dt: number): void {
    const a = this.hero!;
    const m = this.model;
    const cam = this.host.camera.position;
    const dx = cam.x - a.pos.x;
    const dz = cam.z - a.pos.z;
    const dy = cam.y - (a.pos.y + EYES);
    m.group.position.copy(a.pos);
    m.group.rotation.y = Math.atan2(-dx, -dz);
    this.pose.headPitch = Math.atan2(dy, Math.hypot(dx, dz));
    this.pose.time += dt;
    this.host.lightColor(this.host.world.getLight(Math.floor(a.pos.x), Math.floor(a.pos.y + 1), Math.floor(a.pos.z)), this.light.value);
    const [near, far] = this.host.fog();
    const f = smoothstep(near, far, Math.hypot(dx, dy, dz));
    m.fade = a.kind === 'eyes' ? 0 : 1 - f;
    m.glowFade = 1 - f * 0.4;
    m.update(dt, this.pose);
    // Чем темнее вокруг него, тем ярче ореол глаз; днём его нет.
    const lb = this.host.world.getLight(Math.floor(a.pos.x), Math.floor(a.pos.y + EYES), Math.floor(a.pos.z));
    const lit = Math.max(((lb >> 4) / 15) * this.host.env.daylight, (lb & 15) / 15);
    this.halo.opacity = (1 - smoothstep(0.2, 0.55, lit)) * m.glowFade;
  }

  // ───────────────────────────── другие жуткие вещи ─────────────────────────────

  /** На экране «ОБЕРНИСЬ» — а за спиной он. */
  private turnAround(): boolean {
    // Надпись — только если за спиной есть где встать: обернёшься, а там он.
    if (this.hero || !this.host.firstPerson() || !this.behindSpot()) return false;
    this.flashText('ОБЕРНИСЬ', 260);
    this.play('horror_static', { volume: 0.7 });
    this.glitchFor(0.7, 0.25);
    this.after(1.2, () => this.behind());
    return true;
  }

  /** Лицо на весь экран — редко и только ночью. */
  private faceEvent(): boolean {
    this.nextFace = this.clock + rand(300, 500) * this.pace;
    this.scare(true);
    return true;
  }

  /** «Herobrine теперь в игре»: пишет в чат, висит в списке игроков, потом уходит. */
  private fakeJoin(): boolean {
    if (this.ghost) return false;
    const ui = this.host.ui;
    this.ghost = HEROBRINE;
    ui.addChat(null, undefined, `${HEROBRINE} теперь в игре`);
    const stay = rand(45, 90);
    const n = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) this.after(rand(6, stay - 5), () => this.ghost && this.say());
    this.after(stay, () => {
      if (!this.ghost) return;
      ui.addChat(null, undefined, `${HEROBRINE} больше не в игре`);
      this.ghost = null;
    });
    return true;
  }

  private say(): void {
    const text = pick(LINES).replace('{name}', this.host.playerName || 'Стив');
    this.host.ui.addChat(HEROBRINE, HEROBRINE_COLOR, Math.random() < 0.25 ? zalgo(text, 3) : text);
    this.play('horror_static', { volume: 0.25 });
  }

  /** Сообщение от того, кого нет в игре, или искажённая строка «от игры». */
  private creepyChat(): boolean {
    if (Math.random() < 0.6) this.say();
    else this.host.ui.addChat(null, undefined, zalgo(pick(SYSTEM_LINES), 4));
    this.glitchFor(0.25, 0.1);
    return true;
  }

  /** Все мобы вокруг замирают и смотрят на игрока. */
  private mobStare(): boolean {
    if (this.host.entities.mobsNear(this.eye, 24) === 0) return false;
    this.host.entities.stare(this.eye, 8);
    this.dreadFor(0.45, 8);
    for (let i = 0; i < 8; i++) this.after(0.8 + i * 0.85, () => this.play('horror_heartbeat', { volume: 0.7 }));
    return true;
  }

  /** Факелы мерцают и гаснут, в темноте — шёпот. */
  private flicker(): boolean {
    if (this.blk < 6 || this.flickerLen > 0) return false;
    this.flickerLen = rand(3.5, 5.5);
    this.flickerT = 0;
    this.flickerNext = 0;
    this.after(this.flickerLen - 1.1, () => this.play('horror_whisper', { volume: 0.9 }));
    this.dreadFor(0.35, this.flickerLen);
    return true;
  }

  private updateFlicker(dt: number): void {
    if (this.flickerLen <= 0) return;
    this.flickerT += dt;
    const torch = this.host.torchLight;
    if (this.flickerT >= this.flickerLen) {
      this.flickerLen = 0;
      torch.copy(this.torchBase);
      return;
    }
    if (this.flickerT > this.flickerLen - 1.3) this.flickerK = 0.02;
    else if (this.flickerT >= this.flickerNext) {
      this.flickerNext = this.flickerT + rand(0.05, 0.18);
      this.flickerK = Math.random() < 0.35 ? rand(0.05, 0.35) : rand(0.65, 1.05);
    }
    torch.copy(this.torchBase).multiplyScalar(this.flickerK);
  }

  /** Наползает густой туман; где-то в нём кричат. */
  private fogRoll(): boolean {
    const env = this.host.env;
    if (this.underground || env.fogTarget > 0) return false;
    env.fogTarget = 1;
    this.after(rand(70, 140), () => (env.fogTarget = 0));
    this.after(rand(12, 25), () => this.scream());
    return true;
  }

  /** Шаги за спиной всё ближе; обернёшься — тишина и никого. */
  private footsteps(): boolean {
    const w = this.host.world;
    const p = this.host.player;
    const yaw = this.lookYaw + Math.PI + rand(-0.5, 0.5);
    const n = 6 + Math.floor(Math.random() * 3);
    let stopped = false;
    for (let i = 0; i < n; i++) {
      this.after(i * 0.46, () => {
        // Обернулся на шаги — они стихают.
        const dirX = -Math.sin(yaw);
        const dirZ = -Math.cos(yaw);
        if (stopped || this.fwd.x * dirX + this.fwd.z * dirZ > 0.5) {
          stopped = true;
          return;
        }
        const d = 10 - (i / (n - 1)) * 8.4;
        const x = p.x + dirX * d;
        const z = p.z + dirZ * d;
        const y = this.floorNear(Math.floor(x), Math.floor(p.y), Math.floor(z), 2, 3) ?? Math.floor(p.y);
        const below = typeOf(w.getState(Math.floor(x), y - 1, Math.floor(z)));
        const name = (below === Block.AIR ? 'step_stone' : `step_${BLOCKS[below].sound}`) as SoundName;
        this.play(name, { x, y, z, volume: 1.2 });
        if (i === n - 1 && Math.random() < 0.4) this.after(0.8, () => this.play('horror_breath', { x, y: y + 1.6, z, volume: 1.3 }));
      });
    }
    return true;
  }

  /** Стук в стену рядом. */
  private knock(): boolean {
    const w = this.host.world;
    for (let i = 0; i < 12; i++) {
      const yaw = Math.random() * Math.PI * 2;
      for (let d = 1.5; d <= 7; d += 0.5) {
        const at = this.around(yaw, d, -0.3);
        if (!FULL_CUBE[typeOf(w.getState(Math.floor(at.x), Math.floor(at.y), Math.floor(at.z)))]) continue;
        this.play('horror_knock', { x: at.x, y: at.y, z: at.z, volume: 1.4 });
        if (Math.random() < 0.35) this.after(rand(2.5, 4), () => this.play('horror_knock', { x: at.x, y: at.y, z: at.z, volume: 1.6 }));
        return true;
      }
    }
    return false;
  }

  /** Где-то рядом открывается и закрывается дверь или сундук. */
  private doors(): boolean {
    const w = this.host.world;
    const p = this.host.player;
    const bx = Math.floor(p.x);
    const by = Math.floor(p.y);
    const bz = Math.floor(p.z);
    const found: [THREE.Vector3, boolean][] = [];
    for (let y = by - 4; y <= by + 4; y++)
      for (let x = bx - 10; x <= bx + 10; x++)
        for (let z = bz - 10; z <= bz + 10; z++) {
          const s = w.getState(x, y, z);
          const t = typeOf(s);
          if ((t === Block.OAK_DOOR && !((s >>> 10) & 8)) || t === Block.CHEST) found.push([new THREE.Vector3(x + 0.5, y + 0.5, z + 0.5), t === Block.CHEST]);
        }
    // Только то, на что игрок сейчас не смотрит: иначе видно, что дверь не шелохнулась.
    const hidden = found.filter(([at]) => !this.screen(at));
    if (!hidden.length) return false;
    const [at, chest] = pick(hidden);
    this.play(chest ? 'chest_open' : 'door_open', { x: at.x, y: at.y, z: at.z, volume: 1.2 });
    this.after(rand(1.2, 2.4), () => this.play(chest ? 'chest_close' : 'door_close', { x: at.x, y: at.y, z: at.z, volume: 1.2 }));
    return true;
  }

  /** Далёкий крик. */
  private scream(): boolean {
    const at = this.around(Math.random() * Math.PI * 2, rand(18, 26), rand(-4, 2));
    this.play('horror_scream', { x: at.x, y: at.y, z: at.z, volume: 2 });
    this.dreadFor(0.3, 4);
    return true;
  }

  /** Неподалёку играет сломанная музыкальная шкатулка. */
  private musicBox(): boolean {
    const at = this.around(Math.random() * Math.PI * 2, rand(7, 11), rand(-2, 1));
    this.play('horror_music_box', { x: at.x, y: at.y, z: at.z, volume: 1.8 });
    return true;
  }

  /** Шёпот прямо в ухо. */
  private whisper(): boolean {
    const at = this.around(this.lookYaw + (Math.random() < 0.5 ? 1 : -1) * (Math.PI / 2), 0.7);
    this.play('horror_whisper', { x: at.x, y: at.y, z: at.z, volume: 1.1 });
    this.dreadFor(0.3, 3);
    return true;
  }

  /** Помехи: изображение рвётся, на долю секунды — слова. */
  private staticBurst(): boolean {
    this.play('horror_static', { volume: 0.9 });
    this.glitchFor(0.8, 0.45);
    if (Math.random() < 0.5) this.flashText(pick(WORDS), 160);
    return true;
  }

  /** Кровавая луна до рассвета. */
  private bloodMoon(): boolean {
    const env = this.host.env;
    if (env.bloodTarget > 0) return false;
    env.bloodTarget = 1;
    this.host.ui.addChat(null, undefined, 'Луна наливается кровью…');
    this.play('horror_drone', { volume: 0.8 });
    return true;
  }

  /** С наступлением ночи иногда восходит кровавая луна; на рассвете она уходит. */
  private updateBloodMoon(): void {
    const night = this.host.env.night;
    if (!this.wasNight && night > 0.35) {
      this.wasNight = true;
      if (this.clock > 120 && Math.random() < 0.15) this.bloodMoon();
    } else if (this.wasNight && night < 0.15) {
      this.wasNight = false;
      this.host.env.bloodTarget = 0;
    }
  }

  /** Сон: иногда стук или шёпот, а после пробуждения — он у кровати. */
  private updateSleep(): void {
    const sleeping = this.host.player.sleeping;
    if (sleeping === this.wasSleeping) return;
    this.wasSleeping = sleeping;
    if (sleeping) {
      if (Math.random() < 0.4) this.after(rand(1, 2.5), () => this.host.player.sleeping && (Math.random() < 0.5 ? this.knock() : this.whisper()));
    } else if (!this.hero && this.clock > 30 && Math.random() < 0.3) this.wakeScare();
  }

  /** Звуки пещер и ночи. */
  private updateAmbient(): void {
    if (this.clock < this.nextAmbient) return;
    this.nextAmbient = this.clock + rand(20, 50) * this.pace;
    if (!this.underground && this.host.env.night < 0.5) return;
    const at = this.around(Math.random() * Math.PI * 2, rand(8, 15), rand(-3, 3));
    this.play('horror_cave', { x: at.x, y: at.y, z: at.z, volume: this.underground ? 1.6 : 1.1 });
  }

  // ───────────────────────────── эффекты ─────────────────────────────

  private play(name: SoundName, opts?: PlayOptions): void {
    this.host.sound.play(name, opts);
  }

  private dreadFor(level: number, seconds: number): void {
    this.dreadLevel = Math.max(this.dreadLevel, level);
    this.dreadHold = Math.max(this.dreadHold, seconds);
  }

  private glitchFor(level: number, seconds: number): void {
    this.glitch = Math.max(this.glitch, level);
    this.glitchHold = Math.max(this.glitchHold, seconds);
  }

  /** Страх нарастает быстро, отпускает медленно; сбой изображения — короткими вспышками. */
  private updateEffects(dt: number): void {
    const env = this.host.env;
    this.dreadHold = Math.max(0, this.dreadHold - dt);
    if (this.dreadHold === 0) this.dreadLevel = 0;
    const target = this.enabled ? Math.max(this.dreadLevel, env.bloodTarget * env.night * 0.3, env.fogTarget * 0.15) : 0;
    this.dread += (target - this.dread) * Math.min(1, dt * (target > this.dread ? 2 : 0.3));
    this.glitchHold = Math.max(0, this.glitchHold - dt);
    if (this.glitchHold === 0) this.glitch = Math.max(0, this.glitch - dt * 4);
    if (!this.enabled) this.glitch = 0;
    this.host.pipeline.dread = this.dread;
    this.host.pipeline.glitch = Math.min(1, this.glitch);
  }

  private faceImage(): HTMLCanvasElement {
    this.face ??= faceCanvas();
    return this.face;
  }

  private flashText(text: string, ms: number): void {
    const p = document.createElement('p');
    p.textContent = text;
    this.flash(p, ms);
  }

  /** Картинка или надпись на весь экран на долю секунды. */
  private flash(content: HTMLElement, ms: number): void {
    let el = this.flashEl;
    if (!el) {
      el = this.flashEl = document.createElement('div');
      el.className = 'horror-flash';
      document.body.append(el);
    }
    el.replaceChildren(content);
    el.classList.toggle('text', !(content instanceof HTMLCanvasElement));
    el.hidden = false;
    clearTimeout(this.flashTimer);
    const shown = el;
    this.flashTimer = window.setTimeout(() => (shown.hidden = true), ms);
  }
}
