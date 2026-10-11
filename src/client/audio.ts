/**
 * Звуковой движок. Аудиофайлов нет: каждый звук синтезируется процедурно.
 *
 * Звук один раз рендерится в несколько вариаций — в веб-воркере (SynthQueue), чтобы синтез
 * не отнимал время у кадров, — а play() лишь запускает AudioBufferSourceNode со случайным
 * сдвигом высоты, поэтому вызывать его можно хоть каждый кадр.
 *
 * Граф Web Audio:
 *   голоса: BufferSource → Gain → [Panner] ─┐
 *   дождь: петли шума и капель ─────────────┴→ sfxIn → ФНЧ «под водой» → sfxVol ─┐
 *   музыка: пианино и пэды → сухой сигнал + свёрточный реверб → musicOut ─────────┴→ master → компрессор → выход
 */

export type SoundGroup = 'stone' | 'wood' | 'gravel' | 'grass' | 'sand' | 'glass' | 'wool' | 'snow' | 'metal';
export type SoundName =
  | `${'break' | 'hit' | 'step' | 'place'}_${SoundGroup}`
  | 'pop'
  | 'click'
  | 'hurt'
  | 'death'
  | 'eat'
  | 'burp'
  | 'attack'
  | 'strong_hit'
  | 'bow_shoot'
  | 'arrow_hit'
  | 'explode'
  | 'fuse'
  | 'splash'
  | 'swim'
  | 'fizz'
  | 'lava_pop'
  | 'door_open'
  | 'door_close'
  | 'chest_open'
  | 'chest_close'
  | 'tool_break'
  | 'shear'
  | 'flint_and_steel'
  | 'bucket_fill'
  | 'bucket_empty'
  | 'fall_small'
  | 'fall_big'
  | 'level_up'
  | 'zombie_say'
  | 'zombie_hurt'
  | 'zombie_death'
  | 'skeleton_say'
  | 'skeleton_hurt'
  | 'skeleton_death'
  | 'creeper_hurt'
  | 'creeper_death'
  | 'spider_say'
  | 'spider_hurt'
  | 'spider_death'
  | 'pig_say'
  | 'pig_hurt'
  | 'cow_say'
  | 'cow_hurt'
  | 'sheep_say'
  | 'sheep_hurt'
  | 'chicken_say'
  | 'chicken_hurt'
  | 'horror_sting'
  | 'horror_heartbeat'
  | 'horror_whisper'
  | 'horror_breath'
  | 'horror_cave'
  | 'horror_static'
  | 'horror_scream'
  | 'horror_music_box'
  | 'horror_knock'
  | 'horror_drone';

export interface PlayOptions {
  x?: number;
  y?: number;
  z?: number;
  volume?: number;
  pitch?: number;
}

/** Одновременно звучащих эффектов не больше этого числа: лишние вытесняют самые тихие и старые. */
const MAX_VOICES = 32;
/** Сколько вытесненных голосов может одновременно доигрывать короткое затухание. */
const MAX_FADING = 8;
/** Позиционные звуки: громкость линейно падает от REF_DISTANCE до нуля на MAX_DISTANCE блоков. */
const REF_DISTANCE = 2;
const MAX_DISTANCE = 32;
/** Синтезировать чаще 48 кГц незачем: буфер с другой частотой просто проиграется с пересчётом. */
const MAX_RATE = 48000;
const UNDERWATER_CUTOFF = 700;
const MUSIC_LEVEL = 0.6;
const RAIN_BED = 0.32;
const RAIN_DROPS = 0.24;
const TAU = Math.PI * 2;

// ---------- Базовая обработка сигналов ----------

type Rng = () => number;
type Curve = number | ((t: number) => number);
type Env = (t: number) => number;
type FilterType = 'lp' | 'hp' | 'bp' | 'notch';
type FilterSpec = readonly [FilterType, Curve, number?];
type Formants = readonly [number, number, number];

function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return h >>> 0;
}

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const num = (v: unknown, fallback: number) => (typeof v === 'number' && Number.isFinite(v) ? v : fallback);
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const midiHz = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

/** Контекст синтеза одного звука: частота дискретизации и детерминированный генератор случайных чисел. */
class Synth {
  readonly r: Rng;

  constructor(
    readonly sr: number,
    seed: number,
  ) {
    this.r = mulberry32(seed);
  }

  /** Равномерно в [a, b). */
  u(a: number, b: number): number {
    return a + (b - a) * this.r();
  }

  sign(): number {
    return this.r() < 0.5 ? -1 : 1;
  }

  pick<T>(list: readonly T[]): T {
    return list[Math.floor(this.r() * list.length)];
  }

  buf(sec: number): Float32Array {
    return new Float32Array(Math.max(1, Math.round(sec * this.sr)));
  }

  white(sec: number): Float32Array {
    const x = this.buf(sec);
    for (let i = 0; i < x.length; i++) x[i] = this.r() * 2 - 1;
    return x;
  }

  /** Розовый шум (фильтр Пола Келлета). */
  pink(sec: number): Float32Array {
    const x = this.buf(sec);
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    for (let i = 0; i < x.length; i++) {
      const w = this.r() * 2 - 1;
      b0 = 0.99765 * b0 + w * 0.099046;
      b1 = 0.963 * b1 + w * 0.2965164;
      b2 = 0.57 * b2 + w * 1.0526913;
      x[i] = (b0 + b1 + b2 + w * 0.1848) * 0.25;
    }
    return x;
  }

  /** Коричневый (интегрированный) шум — гул и раскаты. */
  brown(sec: number): Float32Array {
    const x = this.buf(sec);
    let b = 0;
    for (let i = 0; i < x.length; i++) {
      b = (b + 0.02 * (this.r() * 2 - 1)) / 1.02;
      x[i] = b * 3.5;
    }
    return x;
  }

  /** Прибавляет src·gain к dst, начиная с момента t0 (в секундах). */
  mix(dst: Float32Array, src: Float32Array, t0 = 0, gain = 1): Float32Array {
    const o = Math.round(t0 * this.sr);
    const end = Math.min(src.length, dst.length - o);
    for (let i = Math.max(0, -o); i < end; i++) dst[o + i] += src[i] * gain;
    return dst;
  }
}

/** Фильтр второго порядка (state-variable, TPT) на месте; частота может меняться во времени. bp — с единичным усилением на резонансе. */
function filter(x: Float32Array, sr: number, type: FilterType, freq: Curve, q = 0.707): Float32Array {
  const k = 1 / q;
  const top = sr * 0.45;
  let a1 = 0;
  let a2 = 0;
  let a3 = 0;
  const set = (f: number) => {
    const g = Math.tan((Math.PI * clamp(f, 10, top)) / sr);
    a1 = 1 / (1 + g * (g + k));
    a2 = g * a1;
    a3 = g * a2;
  };
  const fn = typeof freq === 'function' ? freq : null;
  if (typeof freq === 'number') set(freq);
  // Выход — смесь входа, полосы и низких частот: y = c0·v0 + c1·v1 + c2·v2.
  const c0 = type === 'hp' || type === 'notch' ? 1 : 0;
  const c1 = type === 'lp' ? 0 : type === 'bp' ? k : -k;
  const c2 = type === 'lp' ? 1 : type === 'hp' ? -1 : 0;
  let ic1 = 0;
  let ic2 = 0;
  for (let i = 0; i < x.length; i++) {
    if (fn && (i & 15) === 0) set(fn(i / sr));
    const v0 = x[i];
    const v3 = v0 - ic2;
    const v1 = a1 * ic1 + a2 * v3;
    const v2 = ic2 + a2 * ic1 + a3 * v3;
    ic1 = 2 * v1 - ic1;
    ic2 = 2 * v2 - ic2;
    x[i] = c0 * v0 + c1 * v1 + c2 * v2;
  }
  return x;
}

/** Умножает сигнал на огибающую (на месте); огибающая считается раз в 4 отсчёта и интерполируется. */
function shape(x: Float32Array, sr: number, env: Env): Float32Array {
  let a = env(0);
  for (let i = 0; i < x.length; i += 4) {
    const b = env((i + 4) / sr);
    const end = Math.min(x.length, i + 4);
    for (let j = i; j < end; j++) x[j] *= a + (b - a) * (j - i) * 0.25;
    a = b;
  }
  return x;
}

/** Плавно гасит последние sec секунд — слой не обрывается щелчком. */
function fadeEnd(x: Float32Array, sr: number, sec = 0.005): Float32Array {
  const n = Math.min(x.length, Math.round(sec * sr));
  for (let i = 0; i < n; i++) x[x.length - 1 - i] *= 0.5 - 0.5 * Math.cos((Math.PI * i) / n);
  return x;
}

function peakOf(x: Float32Array): number {
  let p = 0;
  for (let i = 0; i < x.length; i++) {
    const a = Math.abs(x[i]);
    if (a > p) p = a;
  }
  return p;
}

/** Нормирует пик (на месте). */
function norm(x: Float32Array, peak = 1): Float32Array {
  const p = peakOf(x);
  if (p > 0) for (let i = 0; i < x.length; i++) x[i] *= peak / p;
  return x;
}

/** Атака и экспоненциальный спад с постоянной времени tau. */
const perc =
  (att: number, tau: number): Env =>
  (t) =>
    t <= 0 ? 0 : t < att ? t / att : Math.exp(-(t - att) / tau);

/** Атака, удержание, экспоненциальный спад. */
const ahd =
  (att: number, hold: number, tau: number): Env =>
  (t) =>
    t <= 0 ? 0 : t < att ? t / att : t < att + hold ? 1 : Math.exp(-(t - att - hold) / tau);

/** Плавные (косинусные) нарастание att и затухание rel, к моменту end сигнал стихает полностью. */
const swell =
  (att: number, end: number, rel: number): Env =>
  (t) => {
    if (t <= 0 || t >= end) return 0;
    const a = t < att ? 0.5 - 0.5 * Math.cos((Math.PI * t) / att) : 1;
    const r = t > end - rel ? 0.5 - 0.5 * Math.cos((Math.PI * (end - t)) / rel) : 1;
    return a * r;
  };

function polyBlep(t: number, dt: number): number {
  if (t < dt) {
    t /= dt;
    return t + t - t * t - 1;
  }
  if (t > 1 - dt) {
    t = (t - 1) / dt;
    return t * t + t + t + 1;
  }
  return 0;
}

/** Прямоугольник со скважностью duty без алиасинга и без постоянной составляющей. */
function pulse(ph: number, dt: number, duty: number): number {
  let v = ph < duty ? 1 : -1;
  v += polyBlep(ph, dt);
  v -= polyBlep((ph + 1 - duty) % 1, dt);
  return v - (2 * duty - 1);
}

/** Осциллятор с меняющейся частотой. */
function osc(s: Synth, sec: number, freq: Curve, wave: 'sine' | 'saw' | 'square' = 'sine', duty = 0.5): Float32Array {
  const sr = s.sr;
  const x = s.buf(sec);
  const fn = typeof freq === 'function' ? freq : null;
  let dt = clamp((typeof freq === 'number' ? freq : 0) / sr, 0, 0.45);
  let ph = 0;
  for (let i = 0; i < x.length; i++) {
    if (fn && (i & 3) === 0) dt = clamp(fn(i / sr) / sr, 0, 0.45);
    x[i] = wave === 'sine' ? Math.sin(TAU * ph) : wave === 'saw' ? 2 * ph - 1 - polyBlep(ph, dt) : pulse(ph, dt, duty);
    ph += dt;
    if (ph >= 1) ph -= 1;
  }
  return x;
}

/** Прибавляет затухающую синусоиду A·e^(−t/tau)·sin(2πft) (рекурсивный генератор — дёшево). */
function mode(out: Float32Array, sr: number, t0: number, f: number, amp: number, tau: number): void {
  if (!(f > 0) || f >= sr * 0.47 || amp === 0) return;
  const i0 = Math.max(0, Math.round(t0 * sr));
  const w = (TAU * f) / sr;
  const d = Math.exp(-1 / (tau * sr));
  const c = 2 * d * Math.cos(w);
  const d2 = d * d;
  let y1 = 0;
  let y2 = (-amp * Math.sin(w)) / d;
  const end = Math.min(out.length, i0 + Math.ceil(tau * sr * 9));
  for (let i = i0; i < end; i++) {
    out[i] += y1;
    const y = c * y1 - d2 * y2;
    y2 = y1;
    y1 = y;
  }
}

/** «Пыль»: редкие короткие шумовые песчинки случайной силы; density — штук в секунду. */
function dust(s: Synth, sec: number, density: Curve, pow = 2): Float32Array {
  const sr = s.sr;
  const x = s.buf(sec);
  const fn = typeof density === 'function' ? density : null;
  let p = (typeof density === 'number' ? density : 0) / sr;
  const grain = Math.max(1, Math.round(0.0008 * sr));
  let left = 0;
  let amp = 0;
  for (let i = 0; i < x.length; i++) {
    if (fn && (i & 15) === 0) p = fn(i / sr) / sr;
    if (left > 0) {
      x[i] = amp * (s.r() * 2 - 1);
      left--;
    } else if (s.r() < p) {
      left = Math.floor(s.r() * grain);
      amp = Math.pow(s.r(), pow);
      x[i] = amp * s.sign();
    }
  }
  return x;
}

/** Плавный случайный сигнал 0..1, меняющийся примерно rate раз в секунду. */
function wobble(s: Synth, sec: number, rate: number): Float32Array {
  const x = s.buf(sec);
  const step = s.sr / rate;
  let a = s.r();
  let b = s.r();
  let pos = 0;
  for (let i = 0; i < x.length; i++) {
    if (pos >= step) {
      pos -= step;
      a = b;
      b = s.r();
    }
    x[i] = a + (b - a) * (0.5 - 0.5 * Math.cos((Math.PI * pos) / step));
    pos++;
  }
  return x;
}

/** Щипок струны (Карплус — Стронг). decay — затухание за период, bright — яркость начального шума. */
function pluck(s: Synth, sec: number, f0: number, decay: number, bright: number): Float32Array {
  const x = s.buf(sec);
  const n = Math.max(2, Math.round(s.sr / f0 - 0.5));
  const line = new Float32Array(n);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    lp += bright * (s.r() * 2 - 1 - lp);
    line[i] = lp;
  }
  let idx = 0;
  let prev = 0;
  for (let i = 0; i < x.length; i++) {
    const cur = line[idx];
    const y = decay * 0.5 * (cur + prev);
    prev = cur;
    line[idx] = y;
    x[i] = y;
    idx = idx + 1 === n ? 0 : idx + 1;
  }
  return norm(x);
}

interface VoiceOpts {
  /** Основной тон, Гц. */
  f0: Curve;
  /** Три форманты (Гц) в момент t. */
  formants: (t: number) => Formants;
  q?: Formants;
  gains?: Formants;
  /** 0 — пила, иначе прямоугольник с этой скважностью. */
  duty?: number;
  vib?: number;
  vibDepth?: number;
  /** Случайное дрожание высоты (доля). */
  jitter?: number;
  /** Примесь шума дыхания. */
  breath?: number;
  /** Субгармоника — хрип, рык (0..1). */
  growl?: number;
  /** Примесь исходного сигнала через ФНЧ — «тело» голоса. */
  dry?: number;
}

/** Голос: пила/импульсы с вибрато и дрожанием через три формантных фильтра. */
function voice(s: Synth, sec: number, o: VoiceOpts): Float32Array {
  const sr = s.sr;
  const out = s.buf(sec);
  const f0fn = typeof o.f0 === 'function' ? o.f0 : null;
  const f0c = typeof o.f0 === 'number' ? o.f0 : 0;
  const q = o.q ?? [6, 8, 10];
  const gains = o.gains ?? [1, 0.6, 0.3];
  const duty = o.duty ?? 0;
  const vib = o.vib ?? 0;
  const vibDepth = o.vibDepth ?? 0;
  const jitter = o.jitter ?? 0;
  const breath = o.breath ?? 0;
  const growl = o.growl ?? 0;
  const dry = o.dry ?? 0;
  const k = [1 / q[0], 1 / q[1], 1 / q[2]];
  const a1 = [0, 0, 0];
  const a2 = [0, 0, 0];
  const a3 = [0, 0, 0];
  const ic1 = [0, 0, 0];
  const ic2 = [0, 0, 0];
  // Дрожание высоты — шум, сглаженный до ~18 Гц; высота пересчитывается раз в 4 отсчёта.
  const jc = 1 - Math.exp((-TAU * 18 * 4) / sr);
  const jn = 1 / Math.sqrt(jc / (2 - jc));
  const lpc = 1 - Math.exp((-TAU * 700) / sr);
  let ph = s.r();
  let odd = 0;
  let jit = 0;
  let lp = 0;
  let dt = 0;
  for (let i = 0; i < out.length; i++) {
    const t = i / sr;
    if ((i & 31) === 0) {
      const F = o.formants(t);
      for (let j = 0; j < 3; j++) {
        const g = Math.tan((Math.PI * clamp(F[j], 50, sr * 0.45)) / sr);
        a1[j] = 1 / (1 + g * (g + k[j]));
        a2[j] = g * a1[j];
        a3[j] = g * a2[j];
      }
    }
    if ((i & 3) === 0) {
      jit += jc * (s.r() * 2 - 1 - jit);
      const f = (f0fn ? f0fn(t) : f0c) * (1 + vibDepth * Math.sin(TAU * vib * t) + jitter * jit * jn);
      dt = clamp(f / sr, 0, 0.45);
    }
    let v = duty > 0 ? pulse(ph, dt, duty) : 2 * ph - 1 - polyBlep(ph, dt);
    if (growl > 0) v *= 1 - growl * (0.5 + 0.5 * Math.cos(Math.PI * (ph + odd)));
    ph += dt;
    if (ph >= 1) {
      ph -= 1;
      odd ^= 1;
    }
    v += breath * (s.r() * 2 - 1);
    let y = 0;
    for (let j = 0; j < 3; j++) {
      const v3 = v - ic2[j];
      const v1 = a1[j] * ic1[j] + a2[j] * v3;
      const v2 = ic2[j] + a2[j] * ic1[j] + a3[j] * v3;
      ic1[j] = 2 * v1 - ic1[j];
      ic2[j] = 2 * v2 - ic2[j];
      y += gains[j] * k[j] * v1;
    }
    if (dry > 0) {
      lp += lpc * (v - lp);
      y += dry * lp;
    }
    out[i] = y;
  }
  return norm(out);
}

/** Линейный переход между наборами формант по ключевым точкам [время, форманты]. */
function vowels(points: readonly (readonly [number, Formants])[]): (t: number) => Formants {
  return (t) => {
    if (t <= points[0][0]) return points[0][1];
    for (let i = 1; i < points.length; i++) {
      const [t1, b] = points[i];
      if (t <= t1) {
        const [t0, a] = points[i - 1];
        const u = (t - t0) / (t1 - t0 || 1);
        return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u];
      }
    }
    return points[points.length - 1][1];
  };
}

/** Форманты гласных (мужской голос). */
const V: Record<'a' | 'o' | 'u' | 'U' | 'uh' | 'e', Formants> = {
  a: [730, 1090, 2440],
  o: [570, 840, 2410],
  u: [300, 870, 2240],
  U: [440, 1020, 2240],
  uh: [640, 1190, 2390],
  e: [530, 1840, 2480],
};

// ---------- Строительные кирпичики звуков (на выходе пик ≈ 1) ----------

/** Щелчок: короткий шумовой импульс через полосовой фильтр. */
function tick(s: Synth, freq: number, q: number, tau: number): Float32Array {
  const x = s.white(tau * 8 + 0.002);
  filter(x, s.sr, 'bp', freq, q);
  return norm(fadeEnd(shape(x, s.sr, perc(0.0004, tau)), s.sr, 0.001));
}

/** Шум → цепочка фильтров → огибающая. */
function noise(s: Synth, sec: number, env: Env, ...filters: FilterSpec[]): Float32Array {
  const x = s.white(sec);
  for (const [type, freq, q] of filters) filter(x, s.sr, type, freq, q);
  return norm(fadeEnd(shape(x, s.sr, env), s.sr));
}

/** Хруст: россыпь песчинок с заданной плотностью через полосовой фильтр. */
function crunch(s: Synth, sec: number, density: Curve, freq: Curve, q: number, env: Env, pow = 2): Float32Array {
  const x = dust(s, sec, density, pow);
  filter(x, s.sr, 'bp', freq, q);
  return norm(fadeEnd(shape(x, s.sr, env), s.sr));
}

/** Глухой удар: синус с быстро падающей высотой (буфер не короче 7·tau — хвост успевает стихнуть). */
function thud(s: Synth, hi: number, lo: number, tau: number): Float32Array {
  const x = osc(s, tau * 7, (t) => lo + (hi - lo) * Math.exp(-t / (tau * 0.5)));
  return norm(fadeEnd(shape(x, s.sr, perc(0.002, tau)), s.sr));
}

/** Деревянный стук: несколько затухающих мод с негармоничными соотношениями. */
function knock(s: Synth, out: Float32Array, t0: number, f: number, amp: number, tau: number, bright = 1): void {
  const ratios = [1, s.u(1.9, 2.2), s.u(3.1, 3.6), s.u(4.8, 5.6)];
  const amps = [1, 0.55 * bright, 0.32 * bright, 0.16 * bright];
  const taus = [1, 0.6, 0.38, 0.24];
  for (let i = 0; i < 4; i++) mode(out, s.sr, t0, f * ratios[i], amp * amps[i], tau * taus[i]);
}

/** Металлический звон: моды свободного стержня, у основной — пара с биениями. */
function ring(s: Synth, out: Float32Array, t0: number, f: number, amp: number, tau: number): void {
  const ratios = [1, 2.76 * s.u(0.98, 1.02), 5.4 * s.u(0.97, 1.03), 8.93 * s.u(0.96, 1.04)];
  const amps = [1, 0.6, 0.35, 0.2];
  const taus = [1, 0.75, 0.5, 0.32];
  for (let i = 0; i < 4; i++) mode(out, s.sr, t0, f * ratios[i], amp * amps[i], tau * taus[i]);
  mode(out, s.sr, t0, f * 1.004, amp * 0.5, tau * 1.2);
}

/** Колокольчик: обертоны с разным затуханием и лёгкими биениями. */
function bell(s: Synth, out: Float32Array, t0: number, f: number, amp: number, tau: number): void {
  const partials = [
    [1, 1, 1],
    [2, 0.45, 0.6],
    [3.01, 0.22, 0.4],
    [4.17, 0.12, 0.25],
    [5.43, 0.06, 0.15],
  ];
  for (const [ratio, a, d] of partials) mode(out, s.sr, t0, f * ratio, amp * a, tau * d);
  mode(out, s.sr, t0, f * 1.003, amp * 0.4, tau * 1.1);
}

/** Пузырёк: синус, высота которого растёт по мере всплытия, с быстрым затуханием. */
function bubble(s: Synth, out: Float32Array, t0: number, f: number, amp: number, tau: number): void {
  const sec = tau * 6;
  const x = osc(s, sec, (t) => f * (1 + (2.5 * t) / sec));
  s.mix(out, fadeEnd(shape(x, s.sr, perc(0.001, tau)), s.sr), t0, amp);
}

/** Скрип: прерывистое трение (импульсы с плавающей частотой) через деревянные резонансы. */
function creak(s: Synth, sec: number, rate: number, glide: number, res: readonly number[]): Float32Array {
  const sr = s.sr;
  const x = s.buf(sec);
  let ph = 0;
  for (let i = 0; i < x.length; i++) {
    ph += (rate * (1 + ((glide - 1) * i) / x.length) * (0.85 + 0.3 * s.r())) / sr;
    if (ph >= 1) {
      ph -= 1;
      x[i] = 0.5 + 0.5 * s.r();
    }
  }
  const y = new Float32Array(x.length);
  for (const f of res) s.mix(y, filter(x.slice(), sr, 'bp', f * s.u(0.9, 1.1), 10));
  const w = wobble(s, sec, 9);
  for (let i = 0; i < y.length; i++) y[i] *= 0.45 + 0.55 * w[i];
  return norm(shape(y, sr, swell(0.03, sec, 0.08)));
}

/** Сухой костяной щелчок. */
function clack(s: Synth, out: Float32Array, t0: number, amp: number, pitch = 1): void {
  s.mix(out, tick(s, s.u(2200, 3600) * pitch, 1.3, 0.0012), t0, amp * 0.7);
  mode(out, s.sr, t0, s.u(700, 1300) * pitch, amp * 0.5, s.u(0.008, 0.018));
  mode(out, s.sr, t0, s.u(1800, 2800) * pitch, amp * 0.3, s.u(0.004, 0.01));
}

/** Стрекот паука: шум, «нарезанный» быстрой трелью, с шипением и щелчками жвал. */
function chitter(s: Synth, sec: number, rate: Curve, center: Curve, env: Env): Float32Array {
  const sr = s.sr;
  const rateFn = typeof rate === 'function' ? rate : () => rate;
  const centerFn = typeof center === 'function' ? center : () => center;
  const hi = norm(filter(s.white(sec), sr, 'bp', centerFn, 2.5));
  const lo = norm(filter(s.white(sec), sr, 'bp', (t) => 0.3 * centerFn(t), 2));
  const hiss = norm(filter(s.white(sec), sr, 'hp', 4500, 0.7));
  const w = wobble(s, sec, 25);
  const out = s.buf(sec);
  let ph = 0;
  let step = 0;
  for (let i = 0; i < out.length; i++) {
    if ((i & 15) === 0) step = rateFn(i / sr) / sr;
    ph += step;
    if (ph >= 1) ph -= 1;
    const sn = Math.sin(TAU * ph);
    const gate = sn > 0 ? sn * sn * sn : 0;
    out[i] = (hi[i] + 0.6 * lo[i]) * gate * (0.4 + 0.6 * w[i]) + 0.22 * hiss[i];
  }
  shape(out, sr, env);
  s.mix(out, crunch(s, sec, 70, 2500, 3, env, 2), 0, 0.35);
  return norm(out);
}

// ---------- Блоки ----------

type Action = 'break' | 'hit' | 'step' | 'place';
type BlockSound = `${Action}_${SoundGroup}`;
const GROUPS: readonly SoundGroup[] = ['stone', 'wood', 'gravel', 'grass', 'sand', 'glass', 'wool', 'snow', 'metal'];
const ACTIONS: readonly Action[] = ['break', 'hit', 'step', 'place'];

/** Разрушение, удар при добыче, шаг и установка блока из данного материала. */
function blockSound(s: Synth, group: SoundGroup, act: Action): Float32Array {
  const sr = s.sr;
  const brk = act === 'break';
  const plc = act === 'place';
  const stp = act === 'step';
  // «Размер» звука: разрушение — самое длинное и плотное, шаг и удар при добыче — короткие.
  const size = brk ? 1 : plc ? 0.6 : stp ? 0.25 : 0.3;
  // Удар при добыче звучит ниже (в оригинале это звук шага на пол-октавы ниже).
  const fm = act === 'hit' ? 0.7 : 1;
  const len = brk ? 0.34 : plc ? 0.22 : stp ? 0.16 : 0.13;
  // Металл звенит: у разрушения хвост длинный, у шага — короткий.
  const ringTau = 0.04 + 0.24 * Math.pow(size, 1.5);
  const out = s.buf(len + (group === 'metal' ? 0.1 + ringTau : group === 'glass' && brk ? 0.2 : 0));
  switch (group) {
    case 'stone': {
      s.mix(out, tick(s, 2600 * fm * s.u(0.85, 1.15), 0.9, 0.003), 0, stp ? 0.45 : 0.9);
      s.mix(out, noise(s, 0.15, perc(0.0008, 0.012 + 0.025 * size), ['bp', s.u(650, 950) * fm, 1.8]), 0, 0.8);
      const density = (t: number) => 3500 * Math.exp(-t / (0.02 + 0.07 * size));
      const grit = crunch(s, len, density, s.u(1300, 2200) * fm, 0.9, perc(0.001, 0.02 + 0.07 * size));
      s.mix(out, grit, 0.002, brk ? 1 : 0.7);
      if (brk || plc) s.mix(out, thud(s, 170, 70, 0.03), 0, 0.3);
      if (brk)
        for (let i = 0; i < 7; i++) s.mix(out, tick(s, s.u(1800, 4200), 1.4, 0.0015), s.u(0.05, 0.26), s.u(0.1, 0.35));
      break;
    }
    case 'wood': {
      // Полый стук: короткие низкие моды, щелчок и резонирующий шум; при разрушении — треск щепок.
      const f = s.u(190, 300) * fm;
      knock(s, out, 0, f, 1, 0.016 + 0.022 * size, stp ? 0.6 : 1);
      s.mix(out, tick(s, s.u(1500, 2500) * fm, 1, 0.0025), 0, stp ? 0.25 : 0.6);
      s.mix(out, noise(s, 0.2, perc(0.001, 0.015 + 0.03 * size), ['bp', f * s.u(1.3, 1.8), 4]), 0, 0.7);
      if (brk || plc) {
        const splinters = crunch(
          s,
          len,
          (t) => 900 * Math.exp(-t / 0.08),
          s.u(1800, 3000),
          1.2,
          perc(0.002, 0.03 + 0.06 * size),
        );
        s.mix(out, splinters, 0.004, brk ? 0.6 : 0.35);
      }
      if (brk) knock(s, out, s.u(0.06, 0.1), f * s.u(1.2, 1.5), 0.45, 0.025);
      break;
    }
    case 'gravel': {
      // Крупные камешки: «пыль» сбивается в кучки (кусочки сдвигаются порциями), плюс отдельные щелчки.
      const env = ahd(stp ? 0.008 : 0.003, 0.01 + 0.03 * size, 0.03 + 0.08 * size);
      const clusters = wobble(s, len, 45);
      const dens = (t: number) =>
        (brk ? 1800 : 1300) * (0.15 + 1.7 * clusters[Math.min(clusters.length - 1, Math.round(t * sr))]);
      s.mix(out, crunch(s, len, dens, s.u(900, 1400) * fm, 0.9, env, 1.4), 0, 1);
      s.mix(out, crunch(s, len, 500, s.u(2200, 3200) * fm, 1.2, env, 2), 0, 0.4);
      const pebbles = Math.round(4 + 8 * size);
      for (let i = 0; i < pebbles; i++) {
        const t = len * 0.8 * Math.pow(s.r(), 1.5);
        s.mix(out, tick(s, s.u(1200, 3500) * fm, 1.6, 0.0015), t, s.u(0.2, 0.6) * env(t));
      }
      s.mix(out, noise(s, len, env, ['lp', 600 * fm], ['hp', 100]), 0, 0.35);
      if (brk || plc) s.mix(out, thud(s, 140, 70, 0.03), 0, 0.3);
      break;
    }
    case 'sand': {
      // Мелкий сыпучий шорох: плотные тихие песчинки, мягкая атака, почти без низа.
      const env = ahd(stp ? 0.025 : 0.014, 0.015 + 0.05 * size, 0.04 + 0.08 * size);
      const grains = crunch(s, len, 7000, s.u(3000, 4200) * fm, 0.5, env, 1.1);
      s.mix(out, filter(grains, sr, 'hp', 1500 * fm), 0, 1);
      s.mix(out, noise(s, len, env, ['bp', s.u(2200, 3000) * fm, 0.7], ['hp', 900]), 0, 0.6);
      s.mix(out, noise(s, len, env, ['lp', 300]), 0, 0.12);
      break;
    }
    case 'grass': {
      // Шелест: шум с неровной («мнущейся») огибающей, хруст листьев и глухой удар по дёрну.
      const env = ahd(stp ? 0.022 : 0.014, 0.02 + 0.05 * size, 0.04 + 0.07 * size);
      const rustle = s.white(len);
      const w = wobble(s, len, 70);
      for (let i = 0; i < rustle.length; i++) rustle[i] *= 0.15 + 0.85 * w[i] * w[i] * w[i];
      filter(rustle, sr, 'bp', s.u(2000, 2800) * fm, 0.8);
      filter(rustle, sr, 'hp', 600 * fm);
      s.mix(out, norm(fadeEnd(shape(rustle, sr, env), sr)), 0, 1);
      s.mix(out, crunch(s, len, 350, s.u(3500, 5000) * fm, 1.5, env, 2.5), 0, 0.5);
      s.mix(out, noise(s, len, perc(0.004, 0.01 + 0.04 * size), ['lp', 300]), 0, 0.45);
      break;
    }
    case 'glass': {
      if (brk) {
        s.mix(out, noise(s, 0.25, perc(0.0005, 0.05), ['hp', 2500]), 0, 0.8);
        s.mix(out, tick(s, 3500, 1, 0.003), 0, 0.6);
        for (let i = 0; i < 36; i++) {
          const t = 0.34 * Math.pow(s.r(), 1.7);
          mode(out, sr, t, s.u(2200, 8500), s.u(0.05, 0.35) * Math.exp(-t / 0.25), s.u(0.015, 0.07));
        }
        s.mix(
          out,
          crunch(s, 0.4, (t) => 800 * Math.exp(-t / 0.1), 5000, 0.8, perc(0.001, 0.1)),
          0.01,
          0.4,
        );
      } else {
        s.mix(out, tick(s, s.u(3000, 4500) * fm, 1.2, stp ? 0.004 : 0.003), 0, 0.8);
        s.mix(out, noise(s, 0.1, perc(0.001, 0.012 + 0.02 * size), ['bp', s.u(900, 1300) * fm, 2]), 0, 0.5);
        const pings = plc ? 3 : 2;
        for (let i = 0; i < pings; i++)
          mode(out, sr, s.u(0, 0.01), s.u(2500, 6000) * fm, s.u(0.1, 0.25), s.u(0.015, 0.035) * (0.5 + size));
      }
      break;
    }
    case 'wool': {
      const env = ahd(stp ? 0.012 : 0.008, 0.01 + 0.03 * size, 0.03 + 0.06 * size);
      s.mix(out, noise(s, len, env, ['lp', s.u(380, 600) * fm], ['hp', 60]), 0, 1);
      s.mix(out, noise(s, len, env, ['bp', s.u(1200, 1800) * fm, 0.8]), 0, 0.12);
      break;
    }
    case 'snow': {
      const env = ahd(stp ? 0.012 : 0.006, 0.02 + 0.04 * size, 0.03 + 0.07 * size);
      s.mix(out, noise(s, len, env, ['lp', s.u(500, 800) * fm], ['hp', 60]), 0, 0.8);
      s.mix(out, crunch(s, len, 1400, s.u(1000, 1600) * fm, 1.1, env, 1.8), 0, 0.6);
      s.mix(out, crunch(s, len, 500, s.u(2200, 3000) * fm, 1.4, env, 2.5), 0, 0.2);
      break;
    }
    case 'metal': {
      const f = s.u(650, 1100) * fm * (stp ? 1.4 : 1);
      s.mix(out, tick(s, s.u(2500, 3500) * fm, 0.9, 0.0025), 0, 0.8);
      s.mix(out, noise(s, 0.1, perc(0.0008, 0.015 + 0.02 * size), ['bp', s.u(1200, 1800) * fm, 1.5]), 0, 0.6);
      ring(s, out, 0.001, f, brk || plc ? 0.5 : 0.35, ringTau);
      if (brk) {
        ring(s, out, s.u(0.05, 0.09), f * s.u(1.3, 1.6), 0.2, 0.1);
        s.mix(
          out,
          crunch(s, 0.2, (t) => 2000 * Math.exp(-t / 0.05), 2500, 1, perc(0.001, 0.05)),
          0.003,
          0.4,
        );
      }
      break;
    }
  }
  if (stp) filter(out, sr, 'lp', 4500, 0.7);
  return out;
}

// ---------- Таблица звуков ----------

// ---------- Страшные звуки ----------

/** Эхо: звук и count повторов через delay секунд, каждый тише в fb раз и глуше. */
function echo(s: Synth, x: Float32Array, delay: number, fb: number, count: number, damp = 2500): Float32Array {
  const out = s.buf(x.length / s.sr + delay * count);
  s.mix(out, x);
  let tap = x;
  for (let k = 1; k <= count; k++) {
    tap = filter(tap.slice(), s.sr, 'lp', damp / k, 0.6);
    s.mix(out, tap, delay * k, Math.pow(fb, k));
  }
  return out;
}

/** Слоги: k — номер слога, ph — фаза внутри него (0..1). */
function syllable(t: number, len: number, count: number): [number, number] {
  const u = Math.max(0, Math.min(0.9999, t / len)) * count;
  return [Math.floor(u), u % 1];
}

/** Неразборчивый шёпот: шум через «гуляющие» форманты гласных, слоги и свистящие. */
function whisper(s: Synth, len: number): Float32Array {
  const sr = s.sr;
  const count = Math.max(3, Math.round(len * s.u(4, 6)));
  const pts: [number, Formants][] = [];
  for (let i = 0; i <= count; i++) pts.push([(i / count) * len, s.pick([V.a, V.o, V.u, V.e, V.uh, V.U])]);
  const F = vowels(pts);
  const src = s.white(len);
  const out = s.buf(len);
  const gains = [1, 0.7, 0.45];
  for (let j = 0; j < 3; j++) s.mix(out, filter(src.slice(), sr, 'bp', (t) => F(t)[j] * 1.1, 7 + j * 2), 0, gains[j]);
  const syl = Array.from({ length: count }, () => [s.u(0.35, 1), s.r() < 0.35 ? 1 : 0]);
  shape(out, sr, (t) => {
    const [k, ph] = syllable(t, len, count);
    return Math.pow(Math.sin(Math.PI * ph), 1.5) * syl[k][0];
  });
  // Свистящие «с» и «ш» в начале некоторых слогов.
  const sib = filter(s.white(len), sr, 'hp', 4200, 0.8);
  shape(sib, sr, (t) => {
    const [k, ph] = syllable(t, len, count);
    return syl[k][1] && ph < 0.4 ? Math.sin((Math.PI * ph) / 0.4) * 0.8 : 0.03;
  });
  s.mix(out, sib, 0, 0.35);
  return shape(norm(out), sr, swell(0.12, len, 0.3));
}

/** Резкий «стингер» — когда Херобрин появляется: диссонансный кластер, визг и удар. */
function sting(s: Synth): Float32Array {
  const len = 2.6;
  const out = s.buf(len);
  const root = s.u(48, 58);
  // Низкий кластер: малая секунда, тритон, чистая квинта и октава.
  for (const ratio of [1, 1.0595, 1.4142, 1.498, 2]) {
    const f = root * ratio * s.u(0.995, 1.005);
    s.mix(out, osc(s, len, (t) => f * (1 - 0.06 * t), 'saw'), 0, ratio === 1 ? 0.5 : 0.32);
  }
  filter(out, s.sr, 'lp', (t) => 180 + 2600 * Math.exp(-t * 2.2), 1.2);
  // Визг: две близкие высокие ноты бьются друг о друга.
  const hi = s.u(1300, 1700);
  for (const f of [hi, hi * 1.06]) {
    const x = osc(s, 1.6, (t) => f * (1 + 0.02 * Math.sin(TAU * 7 * t)), 'saw');
    filter(x, s.sr, 'bp', f * 1.5, 3);
    s.mix(out, shape(norm(x), s.sr, perc(0.01, 0.45)), 0.02, 0.25);
  }
  s.mix(out, noise(s, 0.4, perc(0.002, 0.08), ['bp', 2200, 0.8]), 0, 0.5);
  s.mix(out, thud(s, 120, 35, 0.25), 0, 0.9);
  return shape(norm(out), s.sr, ahd(0.01, 0.4, 0.7));
}

/** Пещерные звуки, как в Minecraft: стоны, гул, скрежет камня, вой ветра, далёкие удары. */
function caveSound(s: Synth): Float32Array {
  const sr = s.sr;
  switch (Math.floor(s.r() * 5)) {
    case 0: {
      const len = s.u(3.5, 5);
      const f = s.u(80, 120);
      const x = voice(s, len, {
        f0: (t) => f * (1.05 - (0.35 * t) / len),
        formants: vowels([
          [0, V.o],
          [len * 0.6, V.u],
          [len, V.U],
        ]),
        vib: 3,
        vibDepth: 0.02,
        jitter: 0.04,
        breath: 0.4,
        growl: 0.4,
        dry: 0.4,
        q: [4, 6, 8],
      });
      filter(x, sr, 'lp', 1200, 0.7);
      return echo(s, shape(x, sr, swell(0.8, len, 1.5)), 0.31, 0.45, 4, 1500);
    }
    case 1: {
      const len = s.u(4, 6);
      const out = s.buf(len);
      const base = s.u(55, 90);
      for (const r of [1, 1.5 * s.u(0.99, 1.01), 2.01, 2.67]) {
        const bend = s.u(-0.12, 0.08);
        s.mix(out, osc(s, len, (t) => base * r * (1 + (bend * t) / len)), 0, 1 / r);
      }
      return echo(s, shape(norm(out), sr, swell(1.2, len, 1.8)), 0.4, 0.4, 3, 900);
    }
    case 2: {
      const len = s.u(2.5, 3.5);
      const x = dust(s, len, (t) => 300 + 2500 * Math.abs(Math.sin(t * 3.1)), 1.5);
      filter(x, sr, 'bp', (t) => 500 + 400 * Math.sin(t * 2.3), 2.5);
      filter(x, sr, 'lp', 2200, 0.7);
      return echo(s, shape(norm(x), sr, swell(0.3, len, 0.8)), 0.27, 0.4, 3, 1800);
    }
    case 3: {
      const len = s.u(4, 6);
      const x = s.pink(len);
      const c = s.u(350, 700);
      filter(x, sr, 'bp', (t) => c * (1 + 0.35 * Math.sin(t * 1.3 + 1) + 0.15 * Math.sin(t * 3.7)), 14);
      return shape(norm(x), sr, swell(1.3, len, 1.6));
    }
    default: {
      const len = s.u(3, 4.5);
      const out = s.brown(len);
      filter(out, sr, 'lp', 160, 0.8);
      norm(out, 0.6);
      for (let t = s.u(0.3, 0.8); t < len - 0.6; t += s.u(0.5, 1.2)) s.mix(out, thud(s, s.u(60, 90), 30, 0.18), t, s.u(0.3, 0.6));
      return echo(s, shape(out, sr, swell(0.6, len, 1)), 0.35, 0.35, 3, 600);
    }
  }
}

interface SoundDef {
  gen: (s: Synth) => Float32Array;
  /** Громкость при воспроизведении (сами буферы выровнены по громкости). */
  gain: number;
  /** Число вариаций. */
  vars: number;
  /** Случайный разброс скорости воспроизведения, ± доля. */
  jitter: number;
  /** Насыщение (tanh) для плотности звука, 0 — без него. */
  drive: number;
  /** Доля частоты дискретизации движка: звукам без высоких частот хватает половины (вдвое меньше памяти). */
  rate: number;
}

const def = (gain: number, gen: SoundDef['gen'], o: Partial<Omit<SoundDef, 'gen' | 'gain'>> = {}): SoundDef => ({
  gen,
  gain,
  vars: o.vars ?? 3,
  jitter: o.jitter ?? 0.06,
  drive: o.drive ?? 0,
  rate: o.rate ?? 1,
});

const OTHER_SOUNDS: Record<Exclude<SoundName, BlockSound>, SoundDef> = {
  // Подбор предмета: быстрый «блип» вверх.
  pop: def(
    0.4,
    (s) => {
      const f0 = s.u(380, 520);
      const f1 = f0 * s.u(2.4, 3);
      const sweep = (t: number) => f1 - (f1 - f0) * Math.exp(-t / 0.012);
      const x = shape(osc(s, 0.11, sweep), s.sr, perc(0.002, 0.028));
      return s.mix(
        x,
        shape(
          osc(s, 0.11, (t) => 2 * sweep(t)),
          s.sr,
          perc(0.002, 0.012),
        ),
        0,
        0.25,
      );
    },
    { vars: 3, jitter: 0.2, rate: 0.5 },
  ),
  click: def(
    0.5,
    (s) => {
      const out = s.buf(0.06);
      s.mix(out, tick(s, s.u(2600, 3200), 1.2, 0.0015));
      mode(out, s.sr, 0, s.u(1500, 1800), 0.5, 0.006);
      mode(out, s.sr, 0.012, s.u(2200, 2600), 0.25, 0.004);
      return out;
    },
    { vars: 2, jitter: 0.02 },
  ),
  // «Уф»: короткий низкий голосовой выдох и удар по телу.
  hurt: def(
    0.8,
    (s) => {
      const p = s.u(0.9, 1.1);
      const x = voice(s, 0.3, {
        f0: (t) => (150 - 50 * Math.min(1, t / 0.2)) * p,
        formants: vowels([
          [0, V.U],
          [0.08, V.uh],
          [0.25, V.o],
        ]),
        jitter: 0.02,
        breath: 0.15,
        growl: 0.15,
        dry: 0.3,
      });
      shape(x, s.sr, ahd(0.012, 0.07, 0.06));
      return s.mix(x, thud(s, 140, 70, 0.03), 0, 0.35);
    },
    { rate: 0.5 },
  ),
  death: def(
    0.85,
    (s) => {
      const p = s.u(0.9, 1.1);
      const x = voice(s, 0.55, {
        f0: (t) => (140 - 75 * Math.min(1, t / 0.45)) * p,
        formants: vowels([
          [0, V.U],
          [0.12, V.uh],
          [0.3, V.o],
          [0.5, V.u],
        ]),
        jitter: 0.03,
        breath: 0.15,
        growl: 0.25,
        dry: 0.3,
      });
      shape(x, s.sr, ahd(0.015, 0.12, 0.12));
      return s.mix(x, thud(s, 120, 50, 0.05), 0, 0.4);
    },
    { vars: 2, jitter: 0.04, rate: 0.5 },
  ),
  // Еда: два-три хрустящих «укуса».
  eat: def(
    0.55,
    (s) => {
      const out = s.buf(0.38);
      const bites = s.r() < 0.5 ? 2 : 3;
      const gap = s.u(0.1, 0.13);
      for (let i = 0; i < bites; i++) {
        const env = ahd(0.004, 0.015, 0.025);
        const g = i === 0 ? 1 : s.u(0.55, 0.85);
        s.mix(out, crunch(s, 0.1, 2200, s.u(1600, 2600), 0.9, env, 1.5), i * gap, g);
        s.mix(out, noise(s, 0.1, env, ['lp', 500]), i * gap, 0.35 * g);
      }
      return out;
    },
    { vars: 4, jitter: 0.1 },
  ),
  burp: def(
    0.6,
    (s) => {
      const len = s.u(0.4, 0.55);
      const p = s.u(70, 95);
      const x = voice(s, len, {
        f0: (t) => p * (1 + 0.25 * Math.sin((Math.PI * t) / len)),
        formants: vowels([
          [0, V.o],
          [len * 0.5, V.uh],
          [len, V.U],
        ]),
        jitter: 0.12,
        breath: 0.05,
        growl: 0.5,
        dry: 0.4,
      });
      const w = wobble(s, len, 35);
      for (let i = 0; i < x.length; i++) x[i] *= 0.5 + 0.5 * w[i];
      return shape(x, s.sr, swell(0.02, len, 0.12));
    },
    { vars: 2, jitter: 0.08, rate: 0.5 },
  ),
  // Взмах: шум, полоса которого проносится вверх и обратно.
  attack: def(
    0.45,
    (s) => {
      const len = s.u(0.22, 0.28);
      const fa = s.u(400, 600);
      const fb = s.u(1800, 2600);
      const band = (t: number) => fa + (fb - fa) * Math.sin(Math.PI * Math.min(1, t / len));
      const x = noise(s, len, (t) => Math.pow(Math.sin(Math.PI * Math.min(1, t / len)), 2), ['bp', band, 1.4]);
      return s.mix(x, noise(s, len, swell(len * 0.4, len, len * 0.5), ['lp', 500]), 0, 0.3);
    },
    { vars: 3, jitter: 0.08, rate: 0.5 },
  ),
  strong_hit: def(
    0.8,
    (s) => {
      const out = s.buf(0.45);
      s.mix(out, thud(s, s.u(150, 190), 50, 0.07));
      s.mix(out, noise(s, 0.15, perc(0.001, 0.03), ['bp', s.u(900, 1400), 1]), 0, 0.7);
      s.mix(out, tick(s, 3000, 0.7, 0.003), 0, 0.5);
      return out;
    },
    { vars: 3, jitter: 0.06, drive: 1.5, rate: 0.5 },
  ),
  // Лук: щипок тетивы и свист стрелы.
  bow_shoot: def(
    0.65,
    (s) => {
      const out = s.buf(0.5);
      s.mix(out, shape(pluck(s, 0.5, s.u(180, 240), 0.992, 0.6), s.sr, perc(0.001, 0.12)), 0, 0.8);
      const whoosh = noise(s, 0.3, (t) => Math.pow(Math.sin(Math.PI * Math.min(1, t / 0.3)), 2), [
        'bp',
        (t) => 900 + (2500 * t) / 0.3,
        1.2,
      ]);
      s.mix(out, whoosh, 0.01, 0.45);
      return s.mix(out, tick(s, 2000, 1, 0.002), 0, 0.3);
    },
    { vars: 3, jitter: 0.08, rate: 0.5 },
  ),
  arrow_hit: def(
    0.6,
    (s) => {
      const out = s.buf(0.25);
      knock(s, out, 0, s.u(260, 340), 1, 0.035, 0.8);
      s.mix(out, tick(s, 1800, 1, 0.002), 0, 0.5);
      s.mix(out, thud(s, 150, 90, 0.025), 0, 0.5);
      const shaft = osc(s, 0.2, s.u(130, 170));
      shape(shaft, s.sr, (t) => Math.exp(-t / 0.05) * (0.6 + 0.4 * Math.sin(TAU * 30 * t)));
      return s.mix(out, shaft, 0.004, 0.25);
    },
    { vars: 3, jitter: 0.08, rate: 0.5 },
  ),
  // Взрыв: треск, низкий раскат с длинным хвостом, суб-удар и осыпающиеся обломки.
  explode: def(
    1,
    (s) => {
      const len = 2;
      const out = s.buf(len);
      s.mix(out, noise(s, 0.4, perc(0.0008, 0.04), ['lp', 6000]), 0, 0.9);
      const boom = s.brown(len);
      filter(boom, s.sr, 'lp', (t) => 120 + 900 * Math.exp(-t / 0.15), 0.8);
      s.mix(out, norm(shape(boom, s.sr, perc(0.004, 0.45))), 0, 1);
      s.mix(out, thud(s, 75, 32, 0.28), 0, 0.9);
      const rumble = s.white(len);
      filter(rumble, s.sr, 'lp', 260, 0.7);
      const w = wobble(s, len, 12);
      for (let i = 0; i < rumble.length; i++) rumble[i] *= 0.3 + 0.7 * w[i];
      s.mix(out, norm(shape(rumble, s.sr, perc(0.05, 0.6))), 0, 0.6);
      return s.mix(
        out,
        crunch(s, 1, (t) => 400 * Math.exp(-t / 0.25), 1800, 0.8, perc(0.01, 0.3), 2.5),
        0.03,
        0.35,
      );
    },
    { vars: 3, jitter: 0.08, drive: 2, rate: 0.5 },
  ),
  // Шипение фитиля.
  fuse: def(
    0.6,
    (s) => {
      const len = 1.5;
      const x = s.white(len);
      filter(x, s.sr, 'hp', 2500, 0.7);
      filter(x, s.sr, 'bp', s.u(5000, 6500), 0.5);
      const w = wobble(s, len, 18);
      for (let i = 0; i < x.length; i++) x[i] *= 0.7 + 0.3 * w[i];
      norm(x);
      s.mix(
        x,
        crunch(s, len, 60, 4000, 1, () => 1, 2),
        0,
        0.5,
      );
      return shape(x, s.sr, swell(0.04, len, 0.15));
    },
    { vars: 2, jitter: 0.04 },
  ),
  splash: def(
    0.7,
    (s) => {
      const len = 0.85;
      const out = s.buf(len);
      s.mix(out, noise(s, 0.2, perc(0.002, 0.04), ['lp', 500]), 0, 0.6);
      const spray = s.white(len);
      const w = wobble(s, len, 40);
      for (let i = 0; i < spray.length; i++) spray[i] *= 0.3 + 0.7 * w[i];
      filter(spray, s.sr, 'bp', (t) => 1500 + 2500 * Math.exp(-t / 0.2), 0.7);
      s.mix(out, norm(shape(spray, s.sr, perc(0.006, 0.17))));
      for (let i = 0; i < 12; i++) {
        const t = 0.04 + 0.5 * Math.pow(s.r(), 1.5);
        bubble(s, out, t, s.u(400, 1300), s.u(0.1, 0.3) * Math.exp(-t / 0.3), s.u(0.015, 0.035));
      }
      return out;
    },
    { vars: 3, jitter: 0.08, rate: 0.5 },
  ),
  swim: def(
    0.4,
    (s) => {
      const len = s.u(0.45, 0.6);
      const out = s.buf(len);
      const water = s.white(len);
      const w = wobble(s, len, 25);
      for (let i = 0; i < water.length; i++) water[i] *= 0.3 + 0.7 * w[i];
      filter(water, s.sr, 'bp', (t) => 1100 + (700 * t) / len, 0.6);
      s.mix(out, norm(shape(water, s.sr, ahd(0.05, 0.08, 0.12))));
      for (let i = 0; i < 4; i++) bubble(s, out, s.u(0.05, len * 0.6), s.u(350, 900), s.u(0.1, 0.25), s.u(0.015, 0.03));
      return out;
    },
    { vars: 4, jitter: 0.1, rate: 0.5 },
  ),
  // Лава встретила воду: шипение с треском.
  fizz: def(
    0.5,
    (s) => {
      const len = 0.7;
      const out = noise(s, len, perc(0.004, 0.22), ['hp', s.u(3000, 4000)]);
      return s.mix(
        out,
        crunch(s, len, (t) => 900 * Math.exp(-t / 0.25), 6000, 0.7, perc(0.002, 0.25), 2),
        0,
        0.6,
      );
    },
    { vars: 3, jitter: 0.1 },
  ),
  lava_pop: def(
    0.45,
    (s) => {
      const f0 = s.u(110, 160);
      const x = shape(
        osc(s, 0.25, (t) => f0 * (1 + 2.2 * Math.min(1, t / 0.05))),
        s.sr,
        perc(0.003, 0.035),
      );
      return s.mix(x, noise(s, 0.05, perc(0.001, 0.01), ['bp', 1200, 1.2]), 0.01, 0.3);
    },
    { vars: 4, jitter: 0.12, rate: 0.5 },
  ),
  door_open: def(
    0.6,
    (s) => {
      const out = s.buf(0.5);
      s.mix(out, tick(s, 3200, 2, 0.002), 0, 0.5);
      mode(out, s.sr, 0, 2400, 0.15, 0.01);
      s.mix(out, creak(s, 0.36, s.u(45, 70), s.u(1.2, 1.6), [400, 950, 1700]), 0.04, 1);
      knock(s, out, 0.38, s.u(220, 280), 0.25, 0.03);
      return out;
    },
    { rate: 0.5 },
  ),
  door_close: def(
    0.65,
    (s) => {
      const out = s.buf(0.35);
      s.mix(out, creak(s, 0.1, s.u(60, 80), 0.8, [450, 1000, 1800]), 0, 0.35);
      knock(s, out, 0.07, s.u(150, 200), 1, 0.05);
      s.mix(out, noise(s, 0.2, perc(0.001, 0.03), ['lp', 400]), 0.07, 0.4);
      return s.mix(out, tick(s, 3000, 2, 0.002), 0.075, 0.4);
    },
    { rate: 0.5 },
  ),
  chest_open: def(
    0.6,
    (s) => {
      const out = s.buf(0.65);
      knock(s, out, 0, s.u(160, 210), 0.35, 0.03);
      return s.mix(out, creak(s, 0.55, s.u(28, 40), s.u(1.3, 1.7), [300, 700, 1300]), 0.03, 1);
    },
    { vars: 3, jitter: 0.05, rate: 0.5 },
  ),
  chest_close: def(
    0.65,
    (s) => {
      const out = s.buf(0.4);
      s.mix(out, creak(s, 0.12, s.u(40, 55), 0.8, [320, 750, 1400]), 0, 0.3);
      knock(s, out, 0.1, s.u(120, 160), 1, 0.06);
      s.mix(out, noise(s, 0.25, perc(0.001, 0.04), ['lp', 350]), 0.1, 0.6);
      return s.mix(out, tick(s, 2500, 1.5, 0.002), 0.105, 0.3);
    },
    { vars: 3, jitter: 0.05, rate: 0.5 },
  ),
  // Сломался инструмент: металлический щелчок, звон и отлетевший осколок.
  tool_break: def(0.75, (s) => {
    const out = s.buf(0.45);
    s.mix(out, noise(s, 0.1, perc(0.0005, 0.012), ['hp', 1500]));
    ring(s, out, 0, s.u(1800, 2600), 0.45, 0.12);
    const t2 = s.u(0.08, 0.14);
    ring(s, out, t2, s.u(2800, 3800), 0.2, 0.05);
    return s.mix(out, tick(s, 4000, 1.5, 0.002), t2, 0.3);
  }),
  // Ножницы: два коротких «чик».
  shear: def(
    0.55,
    (s) => {
      const out = s.buf(0.3);
      const gap = s.u(0.08, 0.11);
      for (let i = 0; i < 2; i++) {
        const t0 = i * gap;
        s.mix(out, noise(s, 0.06, ahd(0.004, 0.01, 0.012), ['bp', s.u(3500, 5000), 1.5]), t0, 0.8 - 0.2 * i);
        mode(out, s.sr, t0 + 0.012, s.u(4500, 6500), 0.25, 0.025);
        s.mix(out, tick(s, 6000, 2, 0.0015), t0 + 0.014, 0.4);
      }
      return out;
    },
    { vars: 3, jitter: 0.08 },
  ),
  // Огниво: скрежет и искры.
  flint_and_steel: def(
    0.6,
    (s) => {
      const out = s.buf(0.4);
      const scrape = s.white(0.14);
      const w = wobble(s, 0.14, 120);
      for (let i = 0; i < scrape.length; i++) scrape[i] *= 0.4 + 0.6 * w[i];
      filter(scrape, s.sr, 'bp', (t) => 2500 + (3000 * t) / 0.14, 2);
      s.mix(out, norm(shape(scrape, s.sr, swell(0.01, 0.14, 0.03))));
      s.mix(
        out,
        crunch(s, 0.25, (t) => 160 * Math.exp(-t / 0.08), 6500, 1.5, perc(0.001, 0.08), 2.5),
        0.1,
        0.7,
      );
      return s.mix(out, noise(s, 0.25, swell(0.05, 0.25, 0.15), ['lp', 900]), 0.12, 0.25);
    },
    { vars: 3, jitter: 0.08 },
  ),
  // Набрали воды: плеск и пузыри, высота которых растёт по мере наполнения.
  bucket_fill: def(
    0.6,
    (s) => {
      const len = 0.65;
      const out = s.buf(len);
      const slosh = s.white(len);
      const w = wobble(s, len, 14);
      for (let i = 0; i < slosh.length; i++) slosh[i] *= w[i] * w[i];
      filter(slosh, s.sr, 'lp', 900);
      filter(slosh, s.sr, 'hp', 150);
      s.mix(out, norm(shape(slosh, s.sr, swell(0.03, len, 0.2))), 0, 0.5);
      const n = 7 + Math.floor(s.r() * 3);
      for (let i = 0; i < n; i++) {
        const t = 0.03 + (i * (len - 0.15)) / n + s.u(-0.01, 0.01);
        bubble(s, out, t, (350 + (450 * i) / n) * s.u(0.8, 1.2), s.u(0.3, 0.6), s.u(0.02, 0.04));
      }
      return out;
    },
    { rate: 0.5 },
  ),
  bucket_empty: def(
    0.6,
    (s) => {
      const len = 0.7;
      const out = s.buf(len);
      const pour = s.white(len);
      const w = wobble(s, len, 30);
      for (let i = 0; i < pour.length; i++) pour[i] *= Math.pow(w[i], 1.5);
      filter(pour, s.sr, 'bp', 1600, 0.6);
      filter(pour, s.sr, 'lp', 3000);
      s.mix(out, norm(shape(pour, s.sr, swell(0.02, len, 0.3))), 0, 0.8);
      s.mix(out, noise(s, 0.2, perc(0.003, 0.05), ['lp', 600]), 0.05, 0.4);
      const n = 6;
      for (let i = 0; i < n; i++)
        bubble(
          s,
          out,
          0.05 + i * 0.08 + s.u(0, 0.03),
          (900 - (500 * i) / n) * s.u(0.85, 1.15),
          s.u(0.2, 0.45),
          s.u(0.015, 0.03),
        );
      return out;
    },
    { rate: 0.5 },
  ),
  fall_small: def(
    0.55,
    (s) => {
      const out = s.buf(0.32);
      s.mix(out, thud(s, s.u(110, 130), 50, 0.05));
      s.mix(out, noise(s, 0.15, perc(0.002, 0.03), ['lp', 400]), 0, 0.6);
      return s.mix(out, tick(s, 1500, 0.7, 0.002), 0, 0.15);
    },
    { rate: 0.5 },
  ),
  fall_big: def(
    0.8,
    (s) => {
      const out = s.buf(0.6);
      s.mix(out, thud(s, s.u(95, 110), 38, 0.09));
      s.mix(out, noise(s, 0.3, perc(0.002, 0.06), ['lp', 600]), 0, 0.7);
      s.mix(out, crunch(s, 0.25, 1500, 1100, 0.8, perc(0.002, 0.05), 1.5), 0, 0.45);
      return s.mix(out, thud(s, 80, 45, 0.04), s.u(0.07, 0.1), 0.35);
    },
    { vars: 3, jitter: 0.06, drive: 1.2, rate: 0.5 },
  ),
  // Новый уровень: быстрое восходящее арпеджио колокольчиков.
  level_up: def(
    0.55,
    (s) => {
      const out = s.buf(1.4);
      const root = 76 + s.pick([0, 2, -2]);
      [0, 4, 7, 12].forEach((st, i) =>
        bell(s, out, i * 0.07, midiHz(root + st), i === 3 ? 0.9 : 0.55, i === 3 ? 0.55 : 0.25),
      );
      return out;
    },
    { vars: 2, jitter: 0, rate: 0.5 },
  ),

  // ----- Мобы -----

  zombie_say: def(
    0.6,
    (s) => {
      const len = s.u(0.8, 1.15);
      const p = s.u(95, 130);
      const rise = s.r() < 0.5;
      const x = voice(s, len, {
        f0: (t) => p * (rise ? 1 + 0.12 * Math.sin((Math.PI * t) / len) : 1.08 - (0.2 * t) / len),
        formants: vowels([
          [0, V.U],
          [len * 0.35, V.uh],
          [len * 0.75, V.o],
          [len, V.u],
        ]),
        vib: s.u(4, 6),
        vibDepth: 0.03,
        jitter: 0.05,
        breath: 0.12,
        growl: 0.35,
        dry: 0.3,
        q: [5, 7, 9],
      });
      return shape(x, s.sr, swell(0.12, len, 0.3));
    },
    { vars: 3, jitter: 0.1, rate: 0.5 },
  ),
  zombie_hurt: def(
    0.75,
    (s) => {
      const len = s.u(0.3, 0.4);
      const p = s.u(170, 210);
      const x = voice(s, len, {
        f0: (t) => p * (1.1 - (0.25 * t) / len),
        formants: vowels([
          [0, V.uh],
          [len, V.U],
        ]),
        jitter: 0.05,
        breath: 0.15,
        growl: 0.3,
        dry: 0.25,
        q: [5, 7, 9],
      });
      return shape(x, s.sr, ahd(0.015, len * 0.3, len * 0.2));
    },
    { vars: 3, jitter: 0.1, rate: 0.5 },
  ),
  zombie_death: def(
    0.75,
    (s) => {
      const len = s.u(1.2, 1.4);
      const p = s.u(120, 140);
      const x = voice(s, len, {
        f0: (t) => p * (1 - (0.45 * t) / len),
        formants: vowels([
          [0, V.a],
          [len * 0.4, V.o],
          [len, V.u],
        ]),
        vib: 5,
        vibDepth: 0.03,
        jitter: 0.06,
        breath: 0.15,
        growl: 0.45,
        dry: 0.3,
        q: [5, 7, 9],
      });
      return shape(x, s.sr, swell(0.04, len, len * 0.5));
    },
    { vars: 2, jitter: 0.08, rate: 0.5 },
  ),
  skeleton_say: def(
    0.6,
    (s) => {
      const out = s.buf(0.7);
      const n = 4 + Math.floor(s.r() * 5);
      let t = 0.002;
      for (let i = 0; i < n; i++) {
        clack(s, out, t, s.u(0.5, 1));
        t += s.u(0.03, 0.08);
      }
      return out;
    },
    { vars: 3, jitter: 0.1, rate: 0.5 },
  ),
  skeleton_hurt: def(
    0.75,
    (s) => {
      const out = s.buf(0.32);
      s.mix(out, noise(s, 0.1, perc(0.0005, 0.01), ['hp', 2000]), 0, 0.6);
      const n = 3 + Math.floor(s.r() * 3);
      let t = 0;
      for (let i = 0; i < n; i++) {
        clack(s, out, t, s.u(0.6, 1), 1.2);
        t += s.u(0.018, 0.04);
      }
      return out;
    },
    { vars: 3, jitter: 0.1, rate: 0.5 },
  ),
  // Скелет рассыпается: щелчки редеют и становятся ниже, кости падают на землю.
  skeleton_death: def(
    0.75,
    (s) => {
      const out = s.buf(1.2);
      let t = 0;
      let gap = 0.025;
      for (let i = 0; i < 18 && t < 1; i++) {
        clack(s, out, t, Math.exp(-t / 0.5) * s.u(0.5, 1), 1 - 0.3 * t);
        t += gap * s.u(0.6, 1.4);
        gap *= 1.12;
      }
      knock(s, out, s.u(0.15, 0.3), s.u(160, 220), 0.5, 0.05);
      return out;
    },
    { vars: 2, jitter: 0.06, rate: 0.5 },
  ),
  creeper_hurt: def(
    0.75,
    (s) => {
      const len = 0.38;
      const out = s.buf(len);
      s.mix(out, noise(s, len, ahd(0.004, 0.05, 0.08), ['bp', s.u(2500, 3500), 0.8]), 0, 0.8);
      s.mix(
        out,
        crunch(s, len, (t) => 900 * Math.exp(-t / 0.1), 1800, 1.2, perc(0.002, 0.12), 2),
        0,
        0.6,
      );
      for (let i = 0; i < 4; i++) s.mix(out, thud(s, s.u(300, 500), 150, 0.01), s.u(0, 0.22), s.u(0.3, 0.6));
      return out;
    },
    { vars: 3, jitter: 0.1, rate: 0.5 },
  ),
  creeper_death: def(
    0.75,
    (s) => {
      const len = 0.95;
      const out = s.buf(len);
      s.mix(out, noise(s, len, perc(0.01, 0.3), ['bp', (t) => 4000 * Math.exp(-t / 0.5) + 900, 0.9]), 0, 0.8);
      const crackle = crunch(
        s,
        len,
        (t) => 700 * Math.exp(-t / 0.3),
        (t) => 2500 - (1500 * t) / len,
        1,
        perc(0.005, 0.3),
        2,
      );
      s.mix(out, crackle, 0, 0.6);
      for (let i = 0; i < 7; i++) {
        const t0 = i * 0.09 + s.u(0, 0.05);
        s.mix(out, thud(s, s.u(260, 420) * (1 - t0 * 0.6), 100, 0.015), t0, 0.5 * Math.exp(-t0 / 0.5));
      }
      return s.mix(out, noise(s, 0.4, perc(0.01, 0.12), ['lp', 300]), s.u(0.05, 0.12), 0.4);
    },
    { vars: 2, jitter: 0.06, rate: 0.5 },
  ),
  spider_say: def(
    0.6,
    (s) => {
      const len = s.u(0.55, 0.8);
      const rate = s.u(22, 34);
      return chitter(s, len, rate, (t) => 3200 + 800 * Math.sin(TAU * 3 * t), swell(0.04, len, 0.15));
    },
    { vars: 3, jitter: 0.1 },
  ),
  spider_hurt: def(
    0.75,
    (s) => {
      const len = s.u(0.22, 0.3);
      return chitter(s, len, s.u(36, 46), s.u(3800, 4600), ahd(0.005, len * 0.3, len * 0.2));
    },
    { vars: 3, jitter: 0.1 },
  ),
  spider_death: def(
    0.75,
    (s) => {
      const len = s.u(1, 1.2);
      return chitter(
        s,
        len,
        (t) => 30 - (18 * t) / len,
        (t) => 3500 - (2000 * t) / len,
        perc(0.02, 0.4),
      );
    },
    { vars: 2, jitter: 0.06 },
  ),
  // Хрюканье: гнусавые короткие импульсы с хрипом.
  pig_say: def(
    0.6,
    (s) => {
      const out = s.buf(0.75);
      const n = s.pick([1, 2, 2, 2, 3]);
      let t0 = 0;
      for (let i = 0; i < n; i++) {
        const dur = s.u(0.13, 0.2);
        const p = s.u(150, 230);
        const x = voice(s, dur, {
          f0: (t) => p * (1 + 0.35 * Math.sin((Math.PI * t) / dur)),
          formants: vowels([
            [0, [300, 1100, 2300]],
            [dur * 0.4, [520, 1300, 2500]],
            [dur, [380, 1700, 2500]],
          ]),
          duty: 0.3,
          jitter: 0.1,
          growl: 0.45,
          breath: 0.1,
          dry: 0.2,
          q: [4, 6, 7],
        });
        s.mix(out, shape(x, s.sr, ahd(0.012, dur * 0.4, dur * 0.25)), t0, i ? 0.8 : 1);
        t0 += dur + s.u(0.06, 0.1);
      }
      return out;
    },
    { vars: 3, jitter: 0.1, rate: 0.5 },
  ),
  pig_hurt: def(
    0.75,
    (s) => {
      const len = s.u(0.24, 0.34);
      const p = s.u(520, 700);
      const x = voice(s, len, {
        f0: (t) => p * (1 + 0.3 * Math.sin((Math.PI * t) / len)),
        formants: () => [900, 2200, 3200],
        vib: 11,
        vibDepth: 0.03,
        duty: 0.35,
        jitter: 0.06,
        breath: 0.12,
        growl: 0.2,
        q: [5, 7, 8],
      });
      return shape(x, s.sr, ahd(0.01, len * 0.5, len * 0.2));
    },
    { vars: 3, jitter: 0.1, rate: 0.5 },
  ),
  // «Муу»: низкая пила, рот раскрывается от «м» к «у-о».
  cow_say: def(
    0.6,
    (s) => {
      const len = s.u(0.85, 1.15);
      const p = s.u(98, 120);
      const x = voice(s, len, {
        f0: (t) => {
          const u = t / len;
          return p * (1 + 0.2 * Math.sin(Math.PI * Math.min(1, u / 0.75)) - (u > 0.75 ? 0.3 * (u - 0.75) : 0));
        },
        formants: vowels([
          [0, [260, 650, 2200]],
          [0.12, [320, 760, 2300]],
          [len * 0.55, [560, 900, 2400]],
          [len, [420, 780, 2300]],
        ]),
        vib: 3.5,
        vibDepth: 0.012,
        jitter: 0.03,
        breath: 0.05,
        growl: 0.12,
        dry: 0.6,
        q: [4, 6, 8],
      });
      filter(x, s.sr, 'lp', (t) => 350 + 3500 * Math.min(1, t / 0.25), 0.7);
      return shape(x, s.sr, swell(0.08, len, 0.3));
    },
    { vars: 3, jitter: 0.08, rate: 0.5 },
  ),
  cow_hurt: def(
    0.75,
    (s) => {
      const len = s.u(0.28, 0.36);
      const p = s.u(160, 190);
      const x = voice(s, len, {
        f0: (t) => p * (1 + 0.15 * Math.sin((Math.PI * t) / len)),
        formants: vowels([
          [0, [300, 700, 2200]],
          [len * 0.4, [600, 950, 2400]],
          [len, [450, 800, 2300]],
        ]),
        jitter: 0.04,
        breath: 0.08,
        growl: 0.2,
        dry: 0.5,
        q: [4, 6, 8],
      });
      filter(x, s.sr, 'lp', (t) => 500 + 3500 * Math.min(1, t / 0.06), 0.7);
      return shape(x, s.sr, ahd(0.015, len * 0.4, len * 0.2));
    },
    { vars: 3, jitter: 0.08, rate: 0.5 },
  ),
  // «Бе-е-е»: блеяние с сильным вибрато и синхронным тремоло.
  sheep_say: def(
    0.6,
    (s) => {
      const len = s.u(0.6, 0.85);
      const p = s.u(270, 340);
      const vib = s.u(7, 9.5);
      const x = voice(s, len, {
        f0: (t) => p * (1 + 0.05 * Math.sin((Math.PI * t) / len)),
        formants: vowels([
          [0, [400, 1100, 2600]],
          [0.05, [850, 1500, 2800]],
          [len, [700, 1750, 2750]],
        ]),
        vib,
        vibDepth: 0.045,
        jitter: 0.03,
        breath: 0.12,
        duty: 0.4,
        q: [5, 7, 9],
      });
      shape(x, s.sr, (t) => 1 - 0.4 * (0.5 + 0.5 * Math.sin(TAU * vib * t)));
      return shape(x, s.sr, swell(0.03, len, 0.2));
    },
    { vars: 3, jitter: 0.08, rate: 0.5 },
  ),
  sheep_hurt: def(
    0.75,
    (s) => {
      const len = s.u(0.26, 0.34);
      const p = s.u(380, 450);
      const vib = s.u(10, 12);
      const x = voice(s, len, {
        f0: (t) => p * (1.05 - (0.1 * t) / len),
        formants: vowels([
          [0, [450, 1200, 2700]],
          [0.03, [900, 1600, 2900]],
          [len, [800, 1800, 2800]],
        ]),
        vib,
        vibDepth: 0.05,
        jitter: 0.04,
        breath: 0.15,
        duty: 0.4,
        q: [5, 7, 9],
      });
      shape(x, s.sr, (t) => 1 - 0.35 * (0.5 + 0.5 * Math.sin(TAU * vib * t)));
      return shape(x, s.sr, ahd(0.01, len * 0.4, len * 0.2));
    },
    { vars: 3, jitter: 0.08, rate: 0.5 },
  ),
  // Кудахтанье: два-четыре коротких «ко».
  chicken_say: def(
    0.55,
    (s) => {
      const out = s.buf(0.8);
      const n = 2 + Math.floor(s.r() * 3);
      let t0 = 0;
      for (let i = 0; i < n; i++) {
        const dur = s.u(0.04, 0.07);
        const p = s.u(600, 900);
        const x = voice(s, dur, {
          f0: (t) => p * (1 + 0.5 * Math.sin((Math.PI * t) / dur)),
          formants: () => [950, 1900, 3000],
          duty: 0.3,
          jitter: 0.05,
          breath: 0.1,
          q: [3, 5, 6],
        });
        s.mix(out, shape(x, s.sr, ahd(0.004, dur * 0.35, dur * 0.3)), t0, s.u(0.6, 1));
        t0 += dur + s.u(0.05, 0.12);
      }
      return out;
    },
    { vars: 3, jitter: 0.1, rate: 0.5 },
  ),
  chicken_hurt: def(
    0.7,
    (s) => {
      const len = s.u(0.16, 0.22);
      const p = s.u(1000, 1300);
      const x = voice(s, len, {
        f0: (t) => p * (1 - (0.35 * t) / len),
        formants: () => [1100, 2300, 3400],
        duty: 0.25,
        jitter: 0.08,
        breath: 0.25,
        growl: 0.4,
        q: [3, 5, 6],
      });
      return shape(x, s.sr, ahd(0.005, len * 0.35, len * 0.25));
    },
    { vars: 3, jitter: 0.1, rate: 0.5 },
  ),

  // ---- хоррор ----
  horror_sting: def(0.9, (s) => echo(s, sting(s), 0.23, 0.35, 3), { vars: 2, jitter: 0.02, drive: 0.6 }),
  // Сердцебиение: «тук-тук».
  horror_heartbeat: def(
    0.85,
    (s) => {
      const out = s.buf(0.75);
      s.mix(out, thud(s, s.u(70, 85), 38, 0.07), 0, 1);
      s.mix(out, thud(s, s.u(60, 72), 34, 0.06), s.u(0.2, 0.26), 0.7);
      return filter(out, s.sr, 'lp', 220, 0.7);
    },
    { vars: 3, jitter: 0.03, rate: 0.5 },
  ),
  horror_whisper: def(0.55, (s) => echo(s, whisper(s, s.u(1.4, 2.4)), 0.12, 0.25, 2, 3500), { vars: 4, jitter: 0.05 }),
  // Тяжёлое дыхание за спиной: вдох, выдох с хрипом.
  horror_breath: def(
    0.5,
    (s) => {
      const inhale = s.u(0.9, 1.3);
      const exhale = s.u(1.1, 1.6);
      const out = s.buf(inhale + exhale + 0.4);
      s.mix(out, noise(s, inhale, swell(0.5, inhale, 0.25), ['bp', (t) => 900 + (600 * t) / inhale, 1.2], ['hp', 300]), 0, 0.6);
      s.mix(out, noise(s, exhale, swell(0.12, exhale, 0.7), ['bp', (t) => 700 - (250 * t) / exhale, 1], ['hp', 200]), inhale + 0.15, 1);
      const growl = voice(s, exhale, { f0: s.u(60, 75), formants: () => V.uh, breath: 2.5, growl: 0.6, q: [3, 4, 5] });
      s.mix(out, shape(growl, s.sr, swell(0.2, exhale, 0.6)), inhale + 0.15, 0.25);
      return out;
    },
    { vars: 2, jitter: 0.04, rate: 0.5 },
  ),
  horror_cave: def(0.7, caveSound, { vars: 6, jitter: 0.05, rate: 0.5 }),
  // Помехи, как у сломанного радио: рваный шум, треск и гудение сети.
  horror_static: def(
    0.45,
    (s) => {
      const len = s.u(0.5, 0.9);
      const x = s.white(len);
      filter(x, s.sr, 'bp', 2600, 0.5);
      s.mix(x, dust(s, len, 900, 1), 0, 1.5);
      s.mix(x, osc(s, len, 50, 'square'), 0, 0.15);
      const gates = Array.from({ length: 12 }, () => (s.r() < 0.75 ? s.u(0.5, 1) : 0.05));
      return shape(norm(x), s.sr, (t) => gates[Math.min(11, Math.floor((t / len) * 12))] * Math.min(1, t / 0.01, Math.max(0, len - t) / 0.02));
    },
    { vars: 2, jitter: 0.08 },
  ),
  // Далёкий крик: высокие частоты съедены расстоянием, долгое эхо.
  horror_scream: def(
    0.5,
    (s) => {
      const len = s.u(1.4, 2);
      const f = s.u(330, 420);
      const x = voice(s, len, {
        f0: (t) => f * (1 + 0.35 * Math.sin(Math.PI * Math.min(1, t / (len * 0.7)))) * (t > len * 0.7 ? 1 - (0.3 * (t - len * 0.7)) / (len * 0.3) : 1),
        formants: vowels([
          [0, V.e],
          [len * 0.2, V.a],
          [len, V.a],
        ]),
        vib: 6,
        vibDepth: 0.04,
        jitter: 0.05,
        breath: 0.25,
        growl: 0.15,
        q: [6, 8, 10],
      });
      filter(x, s.sr, 'lp', 1700, 0.7);
      return echo(s, shape(x, s.sr, swell(0.08, len, 0.5)), 0.42, 0.45, 4, 1400);
    },
    { vars: 2, jitter: 0.06 },
  ),
  // Сломанная музыкальная шкатулка: минорный мотив, всё медленнее и всё фальшивее.
  horror_music_box: def(
    0.4,
    (s) => {
      const scale = [0, 2, 3, 5, 7, 8, 11, 12];
      const base = 72 + Math.floor(s.u(0, 5));
      const motif = [0, 4, 2, 4, 5, 4, 2, 1, 0];
      const out = s.buf(6.5);
      let t = 0.02;
      motif.forEach((i, k) => {
        const f = midiHz(base + scale[i]) * (1 - 0.004 * k * k * s.u(0.5, 1));
        mode(out, s.sr, t, f, 0.5, 0.6);
        mode(out, s.sr, t, f * 2.76, 0.12, 0.2);
        mode(out, s.sr, t, f * 5.4, 0.05, 0.08);
        t += 0.28 + 0.012 * k * k;
      });
      return echo(s, norm(out), 0.21, 0.3, 2, 3000);
    },
    { vars: 2, jitter: 0.01 },
  ),
  // Стук в дерево: три-четыре удара.
  horror_knock: def(
    0.7,
    (s) => {
      const out = s.buf(1.6);
      const n = s.r() < 0.5 ? 3 : 4;
      let t = 0.02;
      for (let i = 0; i < n; i++) {
        knock(s, out, t, s.u(110, 150), 1, 0.05, 0.8);
        s.mix(out, tick(s, 1800, 1.2, 0.002), t, 0.3);
        t += s.u(0.24, 0.34);
      }
      return norm(out);
    },
    { vars: 2, jitter: 0.04 },
  ),
  // Низкий гул, пока Херобрин смотрит.
  horror_drone: def(
    0.5,
    (s) => {
      const len = 8;
      const out = s.buf(len);
      const base = s.u(36, 44);
      for (const [r, g] of [
        [1, 1],
        [1.007, 0.8],
        [1.5, 0.35],
        [2.12, 0.25],
      ])
        s.mix(out, osc(s, len, (t) => base * r * (1 + 0.01 * Math.sin(t * 0.7 * r)), 'saw'), 0, g);
      filter(out, s.sr, 'lp', (t) => 220 + 140 * Math.sin(t * 0.5), 0.9);
      return shape(norm(out), s.sr, swell(2.5, len, 3));
    },
    { vars: 2, jitter: 0, rate: 0.5 },
  ),
};

const DEFS = {} as Record<SoundName, SoundDef>;
for (const group of GROUPS) {
  for (const act of ACTIONS) {
    // Шерсть и снег по задумке мягче остальных материалов.
    const soft = group === 'wool' || group === 'snow' ? 0.85 : 1;
    const gain = (act === 'break' ? 0.8 : act === 'place' ? 0.72 : act === 'hit' ? 0.42 : 0.3) * soft;
    DEFS[`${act}_${group}`] = def(gain, (s) => blockSound(s, group, act), {
      vars: act === 'hit' || act === 'step' ? 4 : 3,
      jitter: act === 'step' ? 0.05 : 0.06,
      rate: soft < 1 ? 0.5 : 1,
    });
  }
}
Object.assign(DEFS, OTHER_SOUNDS);

/** Все имена звуков. */
export const SOUND_NAMES = Object.keys(DEFS) as SoundName[];

/** Убирает постоянную составляющую и тишину в конце, сглаживает края и выравнивает громкость. */
function finish(x: Float32Array, sr: number, drive: number): Float32Array {
  const r = 1 - (TAU * 20) / sr;
  let px = 0;
  let py = 0;
  for (let i = 0; i < x.length; i++) {
    const v = x[i];
    py = v - px + r * py;
    px = v;
    x[i] = py;
  }
  let peak = peakOf(x);
  if (!(peak > 0)) return x;
  if (drive > 0) {
    const k = 1 / Math.tanh(drive);
    for (let i = 0; i < x.length; i++) x[i] = Math.tanh((drive * x[i]) / peak) * k;
    peak = 1;
  }
  let end = x.length;
  const floor = peak * 0.001;
  while (end > 1 && Math.abs(x[end - 1]) < floor) end--;
  const y = x.slice(0, Math.min(x.length, end + Math.round(0.004 * sr)));
  const fadeIn = Math.min(y.length, Math.round(0.0005 * sr));
  for (let i = 0; i < fadeIn; i++) y[i] *= 0.5 - 0.5 * Math.cos((Math.PI * i) / fadeIn);
  fadeEnd(y, sr, Math.max(0.004, Math.min(0.03, (0.1 * y.length) / sr)));
  // Громкость — по самому громкому участку 25 мс с грубым учётом чувствительности слуха
  // (басы весят меньше, верха — больше), и с запасом по пику.
  const w = filter(y.slice(), sr, 'hp', 90, 0.6);
  const hi = filter(w.slice(), sr, 'hp', 1800, 0.7);
  const win = Math.max(1, Math.min(w.length, Math.round(0.025 * sr)));
  let acc = 0;
  let best = 0;
  for (let i = 0; i < w.length; i++) {
    const v = w[i] + 0.55 * hi[i];
    acc += v * v;
    if (i >= win) {
      const o = w[i - win] + 0.55 * hi[i - win];
      acc -= o * o;
    }
    if (acc > best) best = acc;
  }
  const loud = Math.sqrt(best / win);
  const gain = Math.min(loud > 0 ? 0.25 / loud : Infinity, 0.98 / peakOf(y));
  for (let i = 0; i < y.length; i++) y[i] *= gain;
  return y;
}

/** Частота дискретизации, с которой движок синтезирует звук при данной частоте AudioContext. */
export function soundRate(name: SoundName, contextRate = 48000): number {
  const base = Math.min(MAX_RATE, contextRate);
  const k = DEFS[name]?.rate ?? 1;
  return k < 1 ? Math.max(16000, Math.round(base * k)) : base;
}

/** Синтезирует одну вариацию звука (моно, пик ≤ 0.98). Детерминированно; используется движком и тестами. */
export function renderSound(name: SoundName, variant = 0, sampleRate = 48000): Float32Array {
  const d = DEFS[name];
  if (!d) throw new Error(`Unknown sound: ${name}`);
  const s = new Synth(sampleRate, hashString(`${name}#${variant}`));
  return finish(d.gen(s), sampleRate, d.drive);
}

// ---------- Дождь ----------

/** Шумовая «подложка» дождя, стерео, бесшовная петля. */
function rainBed(sr: number, sec: number): Float32Array[] {
  const n = Math.round(sec * sr);
  const xf = Math.round(0.3 * sr);
  return [0, 1].map((ch) => {
    const s = new Synth(sr, 0x7a1 + ch);
    const total = (n + xf) / sr;
    const x = s.pink(total);
    filter(x, sr, 'hp', 350, 0.6);
    const air = filter(x.slice(), sr, 'bp', 2600, 0.5);
    filter(x, sr, 'lp', 5500, 0.6);
    const w = wobble(s, total, 0.7);
    const y = new Float32Array(n);
    const at = (i: number) => (x[i] + 0.6 * air[i]) * (0.85 + 0.3 * w[i]);
    for (let i = 0; i < n; i++) {
      // Конец петли плавно перетекает в начало (равная мощность для некоррелированного шума).
      if (i < xf) {
        const u = ((i / xf) * Math.PI) / 2;
        y[i] = at(i) * Math.sin(u) + at(n + i) * Math.cos(u);
      } else y[i] = at(i);
    }
    let sum = 0;
    for (let i = 0; i < n; i++) sum += y[i] * y[i];
    const rms = Math.sqrt(sum / n);
    return rms > 0 ? norm(y, Math.min(0.98, peakOf(y) * (0.2 / rms))) : y;
  });
}

/** Отдельные капли: щелчки, «плинки» и шлепки, разбросанные по петле. */
function rainDrops(sr: number, sec: number): Float32Array[] {
  const n = Math.round(sec * sr);
  return [0, 1].map((ch) => {
    const s = new Synth(sr, 0xd209 + ch);
    const y = new Float32Array(n);
    const count = Math.round(sec * 75);
    for (let k = 0; k < count; k++) {
      const at = Math.floor(s.r() * n);
      const kind = s.r();
      let g: Float32Array;
      let amp: number;
      if (kind < 0.6) {
        g = tick(s, s.u(2000, 6500), s.u(0.8, 2.5), s.u(0.0006, 0.0018));
        amp = Math.pow(s.r(), 2);
      } else if (kind < 0.85) {
        g = s.buf(0.05);
        mode(g, sr, 0, s.u(1800, 4500), 1, s.u(0.004, 0.012));
        amp = 0.3 * Math.pow(s.r(), 2);
      } else {
        g = noise(s, 0.04, perc(0.001, 0.006), ['bp', s.u(500, 1200), 1]);
        amp = 0.5 * s.r();
      }
      for (let i = 0; i < g.length; i++) y[(at + i) % n] += g[i] * amp;
    }
    return norm(y, 0.9);
  });
}

function toBuffer(ctx: BaseAudioContext, channels: Float32Array[], sr: number): AudioBuffer {
  const b = ctx.createBuffer(channels.length, channels[0].length, sr);
  channels.forEach((data, i) => b.getChannelData(i).set(data));
  return b;
}

/**
 * Плавно (линейно, за time секунд) ведёт параметр к значению. Не setTargetAtTime: в Chrome
 * экспоненциальный подход «замирает», пока узел простаивает без входного сигнала, и первый звук
 * после паузы прозвучал бы со старой громкостью.
 */
function rampTo(param: AudioParam, value: number, now: number, time: number): void {
  param.cancelScheduledValues(now);
  param.setValueAtTime(param.value, now);
  param.linearRampToValueAtTime(value, now + time);
}

/** Вызывает fn, когда браузер свободен (но не позже чем через timeout мс). */
function whenIdle(fn: (deadline?: IdleDeadline) => void, timeout = 500): void {
  if (typeof requestIdleCallback === 'function') requestIdleCallback(fn, { timeout });
  else setTimeout(fn, 40);
}

class RainLoop {
  private readonly parts: { src: AudioBufferSourceNode; gain: GainNode }[];

  constructor(ctx: AudioContext, dest: AudioNode, buffers: AudioBuffer[]) {
    this.parts = buffers.map((buffer) => {
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      src.connect(gain);
      gain.connect(dest);
      src.start(ctx.currentTime, Math.random() * buffer.duration);
      return { src, gain };
    });
  }

  set(intensity: number, now: number): void {
    const [bed, drops] = this.parts;
    rampTo(bed.gain.gain, RAIN_BED * Math.pow(intensity, 1.3), now, 1.5);
    rampTo(drops.gain.gain, RAIN_DROPS * Math.pow(intensity, 0.8), now, 1.5);
  }

  stop(): void {
    for (const { src, gain } of this.parts) {
      try {
        src.stop();
      } catch {
        // уже остановлен
      }
      src.disconnect();
      gain.disconnect();
    }
  }
}

// ---------- Музыка ----------

/** Ноты, для которых рендерится «сэмпл» пианино; остальные — транспонированием не больше ±3 полутонов. */
const PIANO_BASES = [36, 42, 48, 54, 60, 66, 72, 78, 84, 90];
/** Лады: мажорная пентатоника и мажор без кварты (с большой септимой). */
const SCALES = [
  [0, 2, 4, 7, 9],
  [0, 2, 4, 7, 9, 11],
];
/** Аккорды от ступеней мажора (полутона от тоники): Imaj7, ii7, iii7, IVmaj7, V, vi7. */
const CHORDS: Record<number, number[]> = {
  0: [0, 4, 7, 11],
  2: [2, 5, 9, 12],
  4: [4, 7, 11, 14],
  5: [5, 9, 12, 16],
  7: [7, 11, 14, 21],
  9: [9, 12, 16, 19],
};
const PROGRESSIONS = [
  [0, 5],
  [0, 9, 5, 0],
  [5, 0],
  [0, 4, 5, 0],
  [9, 5, 0, 7],
  [0, 7, 9, 5],
  [0, 2, 5, 0],
];

type MusicEvent =
  | { t: number; kind: 'note'; midi: number; vel: number }
  | { t: number; kind: 'pad'; notes: number[]; dur: number; vel: number };

/** Мягкое «войлочное» пианино: обертоны с двухступенчатым затуханием, верхние гаснут быстрее. */
function pianoNote(midi: number, sr: number): Float32Array {
  const f0 = midiHz(midi);
  const dur = clamp(4.5 * Math.pow(261.6 / f0, 0.3), 2.5, 6);
  const x = new Float32Array(Math.round(dur * sr));
  const top = Math.min(sr * 0.45, 6000);
  for (let k = 1; k <= 16; k++) {
    const fk = k * f0 * Math.sqrt(1 + 0.0004 * k * k);
    if (fk > top) break;
    const a = 1 / (1 + Math.pow(fk / 1400, 2)) / Math.pow(k, 1.1);
    mode(x, sr, 0, fk, a * 0.6, (dur * 0.12) / (1 + 0.5 * (k - 1)));
    mode(x, sr, 0, fk * 1.0006, a * 0.4, (dur * 0.3) / (1 + 0.25 * (k - 1)));
  }
  const att = Math.round(0.004 * sr);
  for (let i = 0; i < att; i++) x[i] *= 0.5 - 0.5 * Math.cos((Math.PI * i) / att);
  return norm(fadeEnd(x, sr, dur * 0.2), 0.5);
}

/** Импульсная характеристика зала: стерео-шум с экспоненциальным спадом и темнеющим хвостом. */
function reverbChannels(sr: number, sec: number, rt60: number): Float32Array[] {
  const n = Math.round(sec * sr);
  const pre = Math.round(0.018 * sr);
  return [0, 1].map((ch) => {
    const d = new Float32Array(n);
    const r = mulberry32(0xbeef + ch);
    let lp = 0;
    for (let i = pre; i < n; i++) {
      const t = (i - pre) / sr;
      lp += (0.08 + 0.55 * Math.exp(-t / 0.9)) * (r() * 2 - 1 - lp);
      d[i] = lp * Math.exp((-6.9 * t) / rt60) * Math.min(1, (n - i) / (0.05 * sr));
    }
    return d;
  });
}

/**
 * Генеративная эмбиент-музыка в духе C418: редкие тихие ноты пентатоники или мажора с септимой
 * над медленной сменой аккордов, иногда с пэдом, всё в длинном реверберирующем хвосте.
 * Фразы по 20–60 с разделены тишиной 30–120 с.
 */
class Music {
  private readonly out: GainNode;
  private readonly bus: GainNode;
  private readonly wave: PeriodicWave;
  private readonly samples = new Map<number, AudioBuffer>();
  private readonly nodes = new Set<AudioScheduledSourceNode>();
  private readonly sampleRate: number;
  private events: MusicEvent[] = [];
  private timer: ReturnType<typeof setInterval> | undefined;
  private nextPhrase = 0;
  private playing = false;
  private generation = 0;

  constructor(
    private readonly ctx: AudioContext,
    private readonly dest: AudioNode,
    private readonly synth: SynthQueue,
  ) {
    this.sampleRate = Math.max(22050, Math.min(24000, ctx.sampleRate));
    this.out = ctx.createGain();
    this.out.gain.value = 0;
    this.bus = ctx.createGain();
    const dry = ctx.createGain();
    dry.gain.value = 0.7;
    const send = ctx.createGain();
    send.gain.value = 0.55;
    const verb = ctx.createConvolver();
    // Отклик зала считается в фоне; до тех пор музыка звучит без реверба.
    const sr = ctx.sampleRate;
    synth.request(`reverb:${sr}`, { kind: 'reverb', rate: sr, sec: 4, rt60: 3.2 }, false, (ch) => (verb.buffer = toBuffer(ctx, ch, sr)));
    this.bus.connect(dry);
    dry.connect(this.out);
    this.bus.connect(send);
    send.connect(verb);
    verb.connect(this.out);
    const harmonics = [0, 1, 0.3, 0.12, 0.05, 0.02];
    this.wave = ctx.createPeriodicWave(new Float32Array(harmonics.length), new Float32Array(harmonics));
  }

  setVolume(v: number): void {
    const now = this.ctx.currentTime;
    rampTo(this.out.gain, v * MUSIC_LEVEL, now, v > 0 ? 1 : 1.5);
    if (v > 0 && !this.playing) this.start(now);
    else if (v <= 0 && this.playing) this.stop();
  }

  dispose(): void {
    this.stop();
    this.silence();
  }

  private start(now: number): void {
    this.playing = true;
    this.generation++;
    this.out.connect(this.dest);
    this.nextPhrase = now + 3 + Math.random() * 4;
    if (this.timer === undefined) this.timer = setInterval(this.tick, 250);
    // «Сэмплы» пианино готовим заранее, в фоне, — к первой фразе они уже есть.
    for (const base of PIANO_BASES) this.sample(base);
  }

  private stop(): void {
    this.playing = false;
    this.events = [];
    if (this.timer !== undefined) clearInterval(this.timer);
    this.timer = undefined;
    const generation = ++this.generation;
    setTimeout(() => {
      if (!this.playing && generation === this.generation) this.silence();
    }, 2500);
  }

  /** Глушит всё, что ещё звучит, и отключает музыку от выхода (реверб перестаёт тратить процессор). */
  private silence(): void {
    for (const n of this.nodes) {
      try {
        n.stop();
      } catch {
        // уже остановлен
      }
    }
    this.nodes.clear();
    this.out.disconnect();
  }

  private readonly tick = (): void => {
    try {
      const now = this.ctx.currentTime;
      if (!this.events.length && now >= this.nextPhrase) {
        const end = this.compose(now + 0.2);
        this.nextPhrase = end + 30 + Math.random() * 90;
      }
      while (this.events.length && this.events[0].t < now + 1.5) {
        const e = this.events.shift()!;
        // Запоздавшие (например, из-за заторможенных таймеров в фоновой вкладке) ноты пропускаем.
        if (e.t < now) continue;
        if (e.kind === 'note') this.note(e.t, e.midi, e.vel);
        else this.pad(e.t, e.notes, e.dur, e.vel);
      }
    } catch {
      // музыка не должна ломать игру
    }
  };

  /** Сочиняет фразу, начиная с момента start; возвращает момент, когда стихнет её хвост. */
  private compose(start: number): number {
    const rnd = Math.random;
    const pick = <T>(list: readonly T[]): T => list[Math.floor(rnd() * list.length)];
    const key = 48 + Math.floor(rnd() * 8);
    const scale = pick(SCALES);
    const beat = 60 / (54 + rnd() * 24);
    const prog = pick(PROGRESSIONS);
    const perChord = pick([4, 6, 8]);
    const chordLen = perChord * beat;
    // Фраза — 20–60 секунд целых аккордов (не меньше двух).
    const chords = Math.max(2, Math.round((20 + rnd() * 40) / chordLen));
    const pads = rnd() < 0.6;
    // Мелодия ходит по ступеням лада на одну-три октавы выше тоники.
    const melody: number[] = [];
    for (let m = key + 12; m <= key + 36; m++) if (scale.includes((m - key) % 12)) melody.push(m);
    const mid = (melody.length - 1) / 2;
    // Ритм мотива (доли внутри аккорда, не меньше двух нот) и его шаги по ладу повторяются на каждом аккорде.
    const rhythm: number[] = [];
    for (let b = 0; b < perChord; b += 0.5) if (rnd() < (b % 1 ? 0.12 : 0.5)) rhythm.push(b);
    while (rhythm.length < 2) {
      const b = Math.floor(rnd() * perChord);
      if (!rhythm.includes(b)) rhythm.push(b);
    }
    rhythm.sort((a, b) => a - b);
    const steps = rhythm.map(() => pick([-2, -1, -1, 1, 1, 2, 3, -3]));
    let idx = Math.round(mid);
    let last = -1;
    const ev: MusicEvent[] = [];
    for (let c = 0; c < chords; c++) {
      const t = start + c * chordLen;
      const chord = CHORDS[prog[c % prog.length]];
      let bass = key - 12 + chord[0];
      while (bass > 50) bass -= 12;
      ev.push({ t, kind: 'note', midi: bass, vel: 0.3 + rnd() * 0.1 });
      if (rnd() < 0.4) ev.push({ t: t + beat * Math.floor(perChord / 2), kind: 'note', midi: bass + 7, vel: 0.22 });
      if (pads) {
        const notes = [chord[0], chord[1], chord[chord.length - 1]].map((c2) => {
          let m = key + c2;
          while (m < 55) m += 12;
          while (m > 70) m -= 12;
          return m;
        });
        ev.push({ t, kind: 'pad', notes, dur: chordLen + 2, vel: 0.03 + rnd() * 0.015 });
      }
      // Мотив обычно начинается с ближайшего звука аккорда.
      const tones = chord.map((c2) => c2 % 12);
      for (let d = 0; d < melody.length && rnd() < 0.8; d++) {
        if (idx - d >= 0 && tones.includes((melody[idx - d] - key) % 12)) {
          idx -= d;
          break;
        }
        if (idx + d < melody.length && tones.includes((melody[idx + d] - key) % 12)) {
          idx += d;
          break;
        }
      }
      rhythm.forEach((b, j) => {
        if (rnd() < 0.15) return;
        if (j > 0) {
          let step = rnd() < 0.25 ? pick([-1, 1, 2, -2]) : steps[j];
          // Мелодия тяготеет к середине диапазона: от краёв шаг разворачивается.
          if (Math.abs(idx - mid) > melody.length * 0.3 && Math.sign(step) === Math.sign(idx - mid)) step = -step;
          idx = clamp(idx + step, 0, melody.length - 1);
        }
        // И не залипает на одной ноте.
        if (melody[idx] === last && rnd() < 0.7) idx = clamp(idx + (idx > mid ? -1 : 1), 0, melody.length - 1);
        last = melody[idx];
        const at = t + b * beat + (rnd() - 0.5) * 0.04;
        ev.push({ t: at, kind: 'note', midi: melody[idx], vel: 0.22 + rnd() * 0.18 + (b === 0 ? 0.06 : 0) });
        if (rnd() < 0.12 && idx >= 2) ev.push({ t: at + 0.012, kind: 'note', midi: melody[idx - 2], vel: 0.15 });
      });
    }
    const end = start + chords * chordLen;
    ev.push({ t: end, kind: 'note', midi: key + 24, vel: 0.3 });
    ev.push({ t: end, kind: 'note', midi: key - 12, vel: 0.28 });
    ev.sort((a, b) => a.t - b.t);
    this.events = ev;
    return end + 6;
  }

  /** Готовый «сэмпл» пианино; если его ещё нет — заказывает и возвращает undefined. */
  private sample(base: number): AudioBuffer | undefined {
    const b = this.samples.get(base);
    if (b) return b;
    const sr = this.sampleRate;
    this.synth.request(`piano:${base}:${sr}`, { kind: 'piano', midi: base, rate: sr }, false, (ch) => this.samples.set(base, toBuffer(this.ctx, ch, sr)));
    return undefined;
  }

  private track(src: AudioScheduledSourceNode, extra: AudioNode[]): void {
    this.nodes.add(src);
    src.onended = () => {
      this.nodes.delete(src);
      src.disconnect();
      for (const n of extra) n.disconnect();
    };
  }

  private note(t: number, midi: number, vel: number): void {
    const ctx = this.ctx;
    let base = PIANO_BASES[0];
    for (const b of PIANO_BASES) if (Math.abs(b - midi) < Math.abs(base - midi)) base = b;
    const buffer = this.sample(base);
    if (!buffer) return;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.playbackRate.value = Math.pow(2, (midi - base) / 12);
    const g = ctx.createGain();
    g.gain.value = vel;
    src.connect(g);
    g.connect(this.bus);
    this.track(src, [g]);
    src.start(t);
  }

  private pad(t: number, notes: number[], dur: number, vel: number): void {
    const ctx = this.ctx;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 700 + Math.random() * 500;
    lp.Q.value = 0;
    const g = ctx.createGain();
    const att = Math.min(3, dur * 0.35);
    const rel = Math.min(4, dur * 0.45);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vel, t + att);
    g.gain.setValueAtTime(vel, t + dur - rel);
    g.gain.linearRampToValueAtTime(0, t + dur);
    lp.connect(g);
    g.connect(this.bus);
    notes.forEach((m, i) => {
      for (const detune of [-7, 7]) {
        const o = ctx.createOscillator();
        o.setPeriodicWave(this.wave);
        o.frequency.value = midiHz(m);
        o.detune.value = detune + (Math.random() - 0.5) * 4;
        o.connect(lp);
        // Фильтр и огибающую отключает последний осциллятор аккорда.
        this.track(o, i === notes.length - 1 && detune > 0 ? [lp, g] : []);
        o.start(t);
        o.stop(t + dur + 0.05);
      }
    });
  }
}

// ---------- Фоновый синтез ----------

/** Что синтезировать: звук, петли дождя, «сэмпл» пианино или отклик зала — чистые вычисления. */
export type SynthJob =
  | { kind: 'sound'; name: SoundName; variant: number; rate: number }
  | { kind: 'rain'; rate: number }
  | { kind: 'piano'; midi: number; rate: number }
  | { kind: 'reverb'; rate: number; sec: number; rt60: number };

/** Каналы результата (для дождя — подложка L/R и капли L/R). Вызывается в воркере синтеза. */
export function renderJob(job: SynthJob): Float32Array[] {
  switch (job.kind) {
    case 'sound':
      return [renderSound(job.name, job.variant, job.rate)];
    case 'rain':
      return [...rainBed(job.rate, 4), ...rainDrops(job.rate, 2.7)];
    case 'piano':
      return [pianoNote(job.midi, job.rate)];
    case 'reverb':
      return reverbChannels(job.rate, job.sec, job.rt60);
  }
}

/**
 * Очередь синтеза в веб-воркере: главный поток на звуки времени не тратит. Воркеру
 * отдаётся по одному заданию, поэтому срочное (звук нужен прямо сейчас) обгоняет прогрев.
 * Если воркер не запустился, синтезируем в свободное время главного потока.
 */
export class SynthQueue {
  private worker: Worker | null = null;
  private readonly pending = new Map<string, { job: SynthJob; done: ((channels: Float32Array[]) => void)[] }>();
  private readonly order: string[] = [];
  private busy: string | null = null;
  private disposed = false;

  constructor(createWorker?: () => Worker) {
    try {
      const worker = createWorker?.() ?? null;
      if (worker) {
        worker.onmessage = (e: MessageEvent<{ key: string; channels: Float32Array[] }>) => this.finish(e.data.key, e.data.channels);
        worker.onerror = () => this.fallback();
      }
      this.worker = worker;
    } catch {
      this.worker = null;
    }
  }

  request(key: string, job: SynthJob, urgent: boolean, done: (channels: Float32Array[]) => void): void {
    if (this.disposed) return;
    const p = this.pending.get(key);
    if (p) {
      p.done.push(done);
      const i = this.order.indexOf(key);
      if (urgent && i > 0) this.order.unshift(...this.order.splice(i, 1));
      return;
    }
    this.pending.set(key, { job, done: [done] });
    if (urgent) this.order.unshift(key);
    else this.order.push(key);
    this.next();
  }

  dispose(): void {
    this.disposed = true;
    this.worker?.terminate();
    this.worker = null;
    this.pending.clear();
    this.order.length = 0;
  }

  private next(): void {
    if (this.busy !== null || this.disposed) return;
    const key = this.order.shift();
    if (key === undefined) return;
    const p = this.pending.get(key);
    if (!p) return this.next();
    this.busy = key;
    if (this.worker) {
      this.worker.postMessage({ key, job: p.job });
      return;
    }
    whenIdle(() => {
      let channels: Float32Array[] = [];
      try {
        channels = renderJob(p.job);
      } catch {
        // звук не получился — просто не будет звучать
      }
      this.finish(key, channels);
    });
  }

  /** Воркер не загрузился: текущее задание возвращаем в очередь и синтезируем сами. */
  private fallback(): void {
    this.worker?.terminate();
    this.worker = null;
    if (this.busy !== null) this.order.unshift(this.busy);
    this.busy = null;
    this.next();
  }

  private finish(key: string, channels: Float32Array[]): void {
    if (this.busy === key) this.busy = null;
    const p = this.pending.get(key);
    this.pending.delete(key);
    if (p && channels.length && !this.disposed) {
      for (const done of p.done) {
        try {
          done(channels);
        } catch {
          // ignore
        }
      }
    }
    this.next();
  }
}

// ---------- Движок ----------

interface Voice {
  src: AudioBufferSourceNode;
  gain: GainNode;
  panner: PannerNode | null;
  name: SoundName;
  start: number;
  end: number;
  /** Оценка слышимой громкости — для вытеснения при переполнении. */
  level: number;
}

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private synth: SynthQueue | null = null;
  private unavailable = false;
  private disposed = false;
  private rate = MAX_RATE;
  private master: GainNode | null = null;
  private sfxIn: GainNode | null = null;
  private water: BiquadFilterNode | null = null;
  private sfxVol: GainNode | null = null;
  private music: Music | null = null;
  private rain: RainLoop | null = null;
  private rainBuffers: AudioBuffer[] | null = null;
  private rainTimer: ReturnType<typeof setTimeout> | undefined;
  private readonly buffers = new Map<SoundName, (AudioBuffer | undefined)[]>();
  private readonly lastVariant = new Map<SoundName, number>();
  private voices: Voice[] = [];
  private fadingUntil: number[] = [];
  private warm = false;
  private volume = 1;
  private musicVolume = 0;
  private rainLevel = 0;
  private underwater = false;
  private readonly pos = { x: 0, y: 0, z: 0, yaw: 0, pitch: 0 };

  /** createWorker — фабрика воркера синтеза (см. synth.worker.ts); без неё звуки синтезируются в главном потоке. */
  constructor(private readonly createWorker?: () => Worker) {}

  /** Вызывать из обработчика жеста (клик, касание, клавиша): создаёт или возобновляет AudioContext. Можно вызывать сколько угодно раз. */
  unlock(): void {
    if (this.disposed || this.unavailable) return;
    try {
      if (!this.ctx) this.init();
      const ctx = this.ctx;
      if (!ctx) return;
      if (ctx.state !== 'running') {
        const p = ctx.resume() as Promise<void> | undefined;
        if (p)
          p.then(
            () => this.warmUp(),
            () => {},
          );
      }
      this.warmUp();
    } catch {
      // без звука игра всё равно работает
    }
  }

  /** Громкость звуковых эффектов, 0..1. */
  setVolume(v: number): void {
    this.volume = clamp(num(v, this.volume), 0, 1);
    try {
      if (this.ctx && this.sfxVol) rampTo(this.sfxVol.gain, this.volume, this.ctx.currentTime, 0.05);
    } catch {
      // ignore
    }
  }

  /** Громкость музыки, 0..1; 0 останавливает музыку. */
  setMusicVolume(v: number): void {
    this.musicVolume = clamp(num(v, this.musicVolume), 0, 1);
    try {
      if (!this.ctx || !this.master) return;
      if (!this.music && this.musicVolume > 0 && this.synth) this.music = new Music(this.ctx, this.master, this.synth);
      this.music?.setVolume(this.musicVolume);
    } catch {
      // ignore
    }
  }

  /**
   * Положение и ориентация камеры. yaw=0 — взгляд вдоль −Z, yaw растёт при повороте налево;
   * pitch>0 — взгляд вверх. Вперёд = (−sin(yaw)cos(pitch), sin(pitch), −cos(yaw)cos(pitch)).
   */
  setListener(x: number, y: number, z: number, yaw: number, pitch: number): void {
    if (![x, y, z, yaw, pitch].every(isNum)) return;
    const p = this.pos;
    if (p.x === x && p.y === y && p.z === z && p.yaw === yaw && p.pitch === pitch) return;
    p.x = x;
    p.y = y;
    p.z = z;
    p.yaw = yaw;
    p.pitch = pitch;
    try {
      this.applyListener();
    } catch {
      // ignore
    }
  }

  /** Разовый звук. С координатами — позиционный (тише с расстоянием, дальше ~32 блоков не слышен), без них — звук интерфейса или самого игрока. */
  play(name: SoundName, opts?: PlayOptions): void {
    try {
      const ctx = this.ctx;
      const out = this.sfxIn;
      if (!ctx || !out || this.disposed || ctx.state !== 'running') return;
      const d = DEFS[name];
      if (!d) return;
      const volume = clamp(num(opts?.volume, 1), 0, 2);
      const pitch = clamp(num(opts?.pitch, 1), 0.25, 4);
      const positional = !!opts && (isNum(opts.x) || isNum(opts.y) || isNum(opts.z));
      let x = 0;
      let y = 0;
      let z = 0;
      let att = 1;
      if (positional) {
        const p = this.pos;
        x = num(opts.x, p.x);
        y = num(opts.y, p.y);
        z = num(opts.z, p.z);
        const dist = Math.hypot(x - p.x, y - p.y, z - p.z);
        if (dist >= MAX_DISTANCE) return;
        att = 1 - Math.max(0, dist - REF_DISTANCE) / (MAX_DISTANCE - REF_DISTANCE);
      }
      const level = d.gain * volume * att;
      if (level < 0.002) return;
      const now = ctx.currentTime;
      // Пачка одинаковых звуков в один момент (взрыв ломает десяток блоков) — хватит трёх.
      let same = 0;
      for (const v of this.voices) if (v.name === name && now - v.start < 0.05) same++;
      if (same >= 3) return;
      if (this.voices.length >= MAX_VOICES && !this.steal(level, now)) return;
      const buffer = this.pick(name);
      if (!buffer) return;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const rate = pitch * (1 + d.jitter * (Math.random() * 2 - 1));
      src.playbackRate.value = rate;
      const gain = ctx.createGain();
      gain.gain.value = d.gain * volume;
      src.connect(gain);
      let panner: PannerNode | null = null;
      if (positional) {
        panner = ctx.createPanner();
        panner.panningModel = 'equalpower';
        panner.distanceModel = 'linear';
        panner.refDistance = REF_DISTANCE;
        panner.maxDistance = MAX_DISTANCE;
        panner.rolloffFactor = 1;
        if (panner.positionX) {
          panner.positionX.value = x;
          panner.positionY.value = y;
          panner.positionZ.value = z;
        } else panner.setPosition(x, y, z);
        gain.connect(panner);
        panner.connect(out);
      } else gain.connect(out);
      src.start(now);
      const voice: Voice = { src, gain, panner, name, start: now, end: now + buffer.duration / rate, level };
      src.onended = () => this.release(voice);
      this.voices.push(voice);
    } catch {
      // ignore
    }
  }

  /** Шум дождя, интенсивность 0..1 (0 — тишина). */
  setRain(intensity: number): void {
    this.rainLevel = clamp(num(intensity, 0), 0, 1);
    try {
      this.applyRain();
    } catch {
      // ignore
    }
  }

  /** Приглушённый звук (ФНЧ), пока камера под водой. */
  setUnderwater(on: boolean): void {
    this.underwater = !!on;
    try {
      this.applyUnderwater();
    } catch {
      // ignore
    }
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.synth?.dispose();
    clearTimeout(this.rainTimer);
    try {
      this.music?.dispose();
      this.rain?.stop();
      for (const v of this.voices) {
        try {
          v.src.stop();
        } catch {
          // уже остановлен
        }
      }
      const ctx = this.ctx;
      if (ctx && typeof ctx.close === 'function') ctx.close().catch(() => {});
    } catch {
      // ignore
    }
    this.voices = [];
    this.music = null;
    this.rain = null;
    this.ctx = null;
    this.sfxIn = null;
    this.buffers.clear();
    this.rainBuffers = null;
  }

  // ---------- Внутреннее ----------

  private init(): void {
    const g = globalThis as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
    const Ctor = g.AudioContext ?? g.webkitAudioContext;
    if (!Ctor) {
      this.unavailable = true;
      return;
    }
    let ctx: AudioContext;
    try {
      ctx = new Ctor({ latencyHint: 'interactive' });
    } catch {
      ctx = new Ctor();
    }
    this.ctx = ctx;
    this.rate = Math.min(MAX_RATE, ctx.sampleRate);
    this.synth = new SynthQueue(this.createWorker);
    // Компрессор с высоким порогом — страховка от клиппинга, когда звуков много.
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -8;
    comp.knee.value = 4;
    comp.ratio.value = 20;
    comp.attack.value = 0.002;
    comp.release.value = 0.15;
    comp.connect(ctx.destination);
    const master = ctx.createGain();
    master.gain.value = 0.7;
    master.connect(comp);
    this.master = master;
    const sfxVol = ctx.createGain();
    sfxVol.gain.value = this.volume;
    sfxVol.connect(master);
    const water = ctx.createBiquadFilter();
    water.type = 'lowpass';
    water.Q.value = 0;
    water.frequency.value = this.underwater ? UNDERWATER_CUTOFF : this.openCutoff();
    water.connect(sfxVol);
    const sfxIn = ctx.createGain();
    sfxIn.connect(water);
    this.sfxVol = sfxVol;
    this.water = water;
    this.sfxIn = sfxIn;
    ctx.onstatechange = () => {
      if (ctx.state === 'running') this.warmUp();
    };
    // Пустой звук внутри жеста окончательно «разблокирует» вывод в старых iOS.
    const src = ctx.createBufferSource();
    src.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
    src.connect(ctx.destination);
    src.start(0);
    this.applyListener();
    this.applyRain();
    this.setMusicVolume(this.musicVolume);
  }

  private openCutoff(): number {
    return Math.min(20000, (this.ctx?.sampleRate ?? 44100) * 0.45);
  }

  private applyListener(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const { x, y, z, yaw, pitch } = this.pos;
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);
    const fx = -sy * cp;
    const fy = sp;
    const fz = -cy * cp;
    const ux = sy * sp;
    const uy = cp;
    const uz = cy * sp;
    const l = ctx.listener;
    if (l.positionX) {
      l.positionX.value = x;
      l.positionY.value = y;
      l.positionZ.value = z;
      l.forwardX.value = fx;
      l.forwardY.value = fy;
      l.forwardZ.value = fz;
      l.upX.value = ux;
      l.upY.value = uy;
      l.upZ.value = uz;
    } else {
      l.setPosition(x, y, z);
      l.setOrientation(fx, fy, fz, ux, uy, uz);
    }
  }

  private applyUnderwater(): void {
    const ctx = this.ctx;
    const f = this.water?.frequency;
    if (!ctx || !f) return;
    const now = ctx.currentTime;
    f.cancelScheduledValues(now);
    f.setValueAtTime(Math.max(20, f.value), now);
    f.exponentialRampToValueAtTime(
      this.underwater ? UNDERWATER_CUTOFF : this.openCutoff(),
      now + (this.underwater ? 0.15 : 0.35),
    );
  }

  private applyRain(): void {
    const ctx = this.ctx;
    if (!ctx || !this.sfxIn) return;
    const level = this.rainLevel;
    clearTimeout(this.rainTimer);
    if (level > 0 && !this.rain) {
      const loops = this.rainLoops(ctx);
      if (loops) this.rain = new RainLoop(ctx, this.sfxIn, loops);
    }
    if (!this.rain) return;
    this.rain.set(level, ctx.currentTime);
    // Когда дождь стих, останавливаем петли, чтобы не тратить процессор.
    if (level <= 0) {
      this.rainTimer = setTimeout(() => {
        if (this.rainLevel <= 0 && this.rain) {
          this.rain.stop();
          this.rain = null;
        }
      }, 4000);
    }
  }

  /** Петли дождя; пока они синтезируются — null (дождь зазвучит чуть позже). */
  private rainLoops(ctx: AudioContext): AudioBuffer[] | null {
    if (this.rainBuffers) return this.rainBuffers;
    const sr = this.rate;
    this.synth?.request(`rain:${sr}`, { kind: 'rain', rate: sr }, true, (ch) => {
      this.rainBuffers = [toBuffer(ctx, ch.slice(0, 2), sr), toBuffer(ctx, ch.slice(2, 4), sr)];
      this.applyRain();
    });
    return null;
  }

  /** Готовая вариация звука (не та же, что в прошлый раз); если готовых нет — заказывает первую и молчит. */
  private pick(name: SoundName): AudioBuffer | undefined {
    const list = this.buffers.get(name);
    const ready: number[] = [];
    if (list) for (let i = 0; i < list.length; i++) if (list[i]) ready.push(i);
    if (!ready.length) {
      this.variant(name, 0, true);
      return undefined;
    }
    let k = Math.floor(Math.random() * ready.length);
    if (ready.length > 1 && ready[k] === this.lastVariant.get(name)) k = (k + 1) % ready.length;
    this.lastVariant.set(name, ready[k]);
    return list![ready[k]];
  }

  /** Заказывает вариацию звука у очереди синтеза (если её ещё нет). */
  private variant(name: SoundName, v: number, urgent: boolean): void {
    const ctx = this.ctx;
    const synth = this.synth;
    if (!ctx || !synth || this.buffers.get(name)?.[v]) return;
    const rate = soundRate(name, this.rate);
    synth.request(`${name}#${v}:${rate}`, { kind: 'sound', name, variant: v, rate }, urgent, ([data]) => {
      let list = this.buffers.get(name);
      if (!list) this.buffers.set(name, (list = []));
      list[v] = toBuffer(ctx, [data], rate);
    });
  }

  /**
   * После запуска заказывает в фоне все вариации всех звуков (сначала по одной каждого,
   * потом остальные) и петли дождя — чтобы потом ничего не синтезировалось посреди игры.
   */
  private warmUp(): void {
    const ctx = this.ctx;
    if (this.warm || this.disposed || ctx?.state !== 'running') return;
    this.warm = true;
    const most = Math.max(...SOUND_NAMES.map((name) => DEFS[name].vars));
    for (let v = 0; v < most; v++) for (const name of SOUND_NAMES) if (v < DEFS[name].vars) this.variant(name, v, false);
    const sr = this.rate;
    this.synth?.request(`rain:${sr}`, { kind: 'rain', rate: sr }, false, (ch) => {
      this.rainBuffers ??= [toBuffer(ctx, ch.slice(0, 2), sr), toBuffer(ctx, ch.slice(2, 4), sr)];
    });
  }

  /** Освобождает место для нового голоса, вытесняя самый тихий (с учётом того, сколько ему осталось). */
  private steal(level: number, now: number): boolean {
    // Вытесненные голоса доигрывают короткое затухание; одновременно таких не больше MAX_FADING.
    // Считаем их по времени, а не по событиям ended: Chrome иногда присылает ended дважды,
    // если stop() пришёлся на естественный конец звука.
    this.fadingUntil = this.fadingUntil.filter((t) => t > now);
    if (this.fadingUntil.length >= MAX_FADING) return false;
    let worst = -1;
    let worstScore = Infinity;
    for (let i = 0; i < this.voices.length; i++) {
      const v = this.voices[i];
      const life = v.end - v.start;
      const left = life > 0 ? clamp((v.end - now) / life, 0, 1) : 0;
      const score = v.level * (0.25 + 0.75 * left);
      if (score < worstScore) {
        worstScore = score;
        worst = i;
      }
    }
    // Новый звук тише всех играющих — пропускаем его самого.
    if (worst < 0 || worstScore > level) return false;
    const v = this.voices[worst];
    this.voices.splice(worst, 1);
    // Гасим за 10 мс — без щелчка; release() сработает по ended.
    this.fadingUntil.push(now + 0.012);
    try {
      rampTo(v.gain.gain, 0, now, 0.01);
      v.src.stop(now + 0.012);
    } catch {
      // ignore
    }
    return true;
  }

  private release(v: Voice): void {
    const i = this.voices.indexOf(v);
    if (i >= 0) this.voices.splice(i, 1);
    v.src.disconnect();
    v.gain.disconnect();
    v.panner?.disconnect();
  }
}
