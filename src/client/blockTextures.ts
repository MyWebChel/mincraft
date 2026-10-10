/**
 * Процедурные пиксельные текстуры блоков 16×16. Для каждого имени из TILE_NAMES
 * (src/shared/blocks.ts) здесь есть «художник», который рисует плитку
 * детерминированно по переданному генератору случайных чисел.
 *
 * Правила: непрозрачные блоки залиты полностью (альфа 255) и тайлятся без швов;
 * вырезные текстуры (листва, стекло, растения, факел, лестница…) используют только
 * альфу 0/255; вода и лёд полупрозрачные. y растёт вниз: строка 0 — верх текстуры.
 */
import { Tile, hex, mix, shade, type Painter, type RGB, type Rnd } from './pixelart';

const N = 16;
const WHITE: RGB = [255, 255, 255];
const BLACK: RGB = [0, 0, 0];

// ───────────────────────────── утилиты ─────────────────────────────

const pal = (...colors: string[]): RGB[] => colors.map(hex);

/** Цвет палитры по «уровню»: округляется и зажимается в границы палитры. */
function level(p: RGB[], i: number): RGB {
  const k = Math.round(i);
  return p[k < 0 ? 0 : k >= p.length ? p.length - 1 : k];
}

/** Цвет палитры по значению v ∈ [0, 1) с необязательными весами оттенков. */
function pick(p: RGB[], v: number, weights?: number[]): RGB {
  if (!weights) return p[Math.min(p.length - 1, Math.max(0, Math.floor(v * p.length)))];
  let total = 0;
  for (const w of weights) total += w;
  let acc = 0;
  for (let i = 0; i < p.length; i++) {
    acc += weights[i] / total;
    if (v < acc) return p[i];
  }
  return p[p.length - 1];
}

const any = (rnd: Rnd, p: RGB[]): RGB => p[Math.floor(rnd() * p.length)];
const jitter = (c: RGB, rnd: Rnd, amount: number): RGB => shade(c, 1 + (rnd() - 0.5) * amount);
const wrapIdx = (x: number, y: number) => (((y % N) + N) % N) * N + (((x % N) + N) % N);
const wrapDist = (a: number, b: number) => {
  const d = Math.abs(a - b) % N;
  return Math.min(d, N - d);
};
const smoothstep = (v: number) => v * v * (3 - 2 * v);

/** Бесшовный value-noise: решётка cx×cy случайных значений, сворачивается на краях плитки. */
function valueNoise(rnd: Rnd, cx: number, cy = cx): (x: number, y: number) => number {
  const g = Array.from({ length: cx * cy }, () => rnd());
  const at = (i: number, j: number) => g[(((j % cy) + cy) % cy) * cx + (((i % cx) + cx) % cx)];
  return (x, y) => {
    const fx = ((x + 0.5) / N) * cx - 0.5;
    const fy = ((y + 0.5) / N) * cy - 0.5;
    const i = Math.floor(fx);
    const j = Math.floor(fy);
    const tx = smoothstep(fx - i);
    const ty = smoothstep(fy - j);
    const top = at(i, j) + (at(i + 1, j) - at(i, j)) * tx;
    const bottom = at(i, j + 1) + (at(i + 1, j + 1) - at(i, j + 1)) * tx;
    return top + (bottom - top) * ty;
  };
}

/**
 * Поле значений 16×16, выровненное по рангу (равномерно в [0, 1)) — так палитра
 * расходуется предсказуемо, какой бы ни была статистика исходного шума.
 */
function field(fn: (x: number, y: number) => number): Float32Array {
  const raw = new Float32Array(N * N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) raw[y * N + x] = fn(x, y);
  const order = Array.from({ length: N * N }, (_, i) => i).sort((a, b) => raw[a] - raw[b]);
  const out = new Float32Array(N * N);
  order.forEach((i, rank) => (out[i] = (rank + 0.5) / (N * N)));
  return out;
}

function paintField(t: Tile, p: RGB[], f: Float32Array, weights?: number[]): void {
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) t.set(x, y, pick(p, f[y * N + x], weights));
}

interface Cells {
  count: number;
  at(x: number, y: number): number;
}

/** Бесшовная диаграмма Вороного: зёрна на сетке gx×gy со случайным сдвигом. */
function voronoi(rnd: Rnd, gx: number, gy: number, jitterAmount = 0.85, sizeVar = 0.3): Cells {
  const seeds: number[][] = [];
  for (let j = 0; j < gy; j++)
    for (let i = 0; i < gx; i++)
      seeds.push([
        ((i + 0.5 + (rnd() - 0.5) * jitterAmount) * N) / gx,
        ((j + 0.5 + (rnd() - 0.5) * jitterAmount) * N) / gy,
        1 + (rnd() - 0.5) * sizeVar,
      ]);
  const id = new Int16Array(N * N);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      let best = Infinity;
      seeds.forEach(([sx, sy, sw], i) => {
        const d = Math.hypot(wrapDist(x + 0.5, sx), wrapDist(y + 0.5, sy)) / sw;
        if (d < best) {
          best = d;
          id[y * N + x] = i;
        }
      });
    }
  return { count: seeds.length, at: (x, y) => id[wrapIdx(x, y)] };
}

type Ink = RGB | RGB[];

/** Рисует ASCII-шаблон: символ → цвет (или палитра для случайного выбора); '.' пропускается. */
function stamp(t: Tile, rnd: Rnd, rows: string[], inks: Record<string, Ink>, x0 = 0, y0 = 0): void {
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ink = inks[row[x]];
      if (!ink) continue;
      t.set(x0 + x, y0 + y, Array.isArray(ink[0]) ? any(rnd, ink as RGB[]) : (ink as RGB));
    }
  });
}

/** Собственный генератор (mulberry32) для текстур-стадий с общей раскладкой. */
function seeded(seed: number): Rnd {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Горизонтальные волокна дерева в прямоугольнике: отрезки по 2–6 пикселей разного тона. */
function grain(t: Tile, rnd: Rnd, ramp: RGB[], x0: number, y0: number, x1: number, y1: number, base: number): void {
  for (let y = y0; y <= y1; y++) {
    let x = x0;
    while (x <= x1) {
      const len = 2 + Math.floor(rnd() * 5);
      const off = (rnd() - 0.5) * 1.6;
      for (let k = 0; k < len && x <= x1; k++, x++) t.set(x, y, level(ramp, base + off + (rnd() < 0.07 ? -1 : 0)));
    }
  }
}

/** Рамка в 1 пиксель по краю плитки. */
function border(t: Tile, rnd: Rnd, p: RGB[]): void {
  for (let i = 0; i < N; i++) {
    t.set(i, 0, any(rnd, p));
    t.set(i, N - 1, any(rnd, p));
    t.set(0, i, any(rnd, p));
    t.set(N - 1, i, any(rnd, p));
  }
}

// ───────────────────────────── земля и трава ─────────────────────────────

const DIRT = pal('#5b3d27', '#69472e', '#775236', '#845d3f', '#916848', '#a07553');
const GRASS = pal('#3c7322', '#468229', '#509030', '#5a9d37', '#65a93f', '#73b649');
const SNOW = pal('#d6e1e8', '#e1eaef', '#eaf1f5', '#f3f8fa', '#fbfdfe');

function dirt(t: Tile, rnd: Rnd): void {
  const a = valueNoise(rnd, 8);
  paintField(t, DIRT, field((x, y) => a(x, y) * 0.45 + rnd() * 0.7), [1, 2, 3, 3, 2, 1]);
  for (let i = 0; i < 8; i++) t.set(rnd() * N, rnd() * N, rnd() < 0.5 ? hex('#ad855b') : hex('#47301f'));
}

function grassTop(t: Tile, rnd: Rnd): void {
  const a = valueNoise(rnd, 8);
  paintField(t, GRASS, field((x, y) => a(x, y) * 0.35 + rnd() * 0.8), [1, 2, 3, 3, 2, 1.2]);
}

/** Нависающий край травы/снега над землёй на боковой грани. */
function overhang(t: Tile, rnd: Rnd, ramp: RGB[], edge: RGB, depth: number): void {
  for (let x = 0; x < N; x++) {
    let d = depth + (rnd() < 0.5 ? 1 : 0);
    if (rnd() < 0.22) d += 1 + Math.floor(rnd() * 2);
    for (let y = 0; y < d; y++) t.set(x, y, level(ramp, 1 + rnd() * (ramp.length - 1.5) - (y === d - 1 ? 1 : 0)));
    t.set(x, d - 1, rnd() < 0.6 ? edge : ramp[0]);
    t.set(x, d, shade(t.get(x, d), 0.72));
  }
}

function farmland(t: Tile, rnd: Rnd): void {
  const FARM = pal('#24160a', '#2f1d0e', '#3a2614', '#45301a', '#513a21', '#5e4428', '#6c4f31');
  const a = valueNoise(rnd, 8);
  paintField(t, FARM.slice(2), field((x, y) => a(x, y) * 0.45 + rnd() * 0.8), [1, 2, 3, 2, 1]);
  // Борозды: тёмные прерывистые линии через 4 пикселя, слегка волнистые.
  const wave = valueNoise(rnd, 4, 1);
  for (let row = 0; row < 4; row++)
    for (let x = 0; x < N; x++) {
      if (rnd() < 0.15) continue;
      const y = row * 4 + 3 + (wave(x, 0) > 0.55 ? 1 : 0);
      t.set(x, y, level(FARM, rnd() * 1.6));
      if (rnd() < 0.5) t.set(x, y - 1, level(FARM, 2 + rnd()));
    }
  // Светлые комочки земли.
  for (let i = 0; i < 9; i++) t.set(rnd() * N, rnd() * N, rnd() < 0.5 ? FARM[6] : hex('#7a5a3c'));
}

// ───────────────────────────── камень и руды ─────────────────────────────

const STONE = pal('#5e5e5e', '#686868', '#717171', '#7a7a7a', '#838383', '#8d8d8d', '#979797');

function stone(t: Tile, rnd: Rnd): void {
  const a = valueNoise(rnd, 4);
  const b = valueNoise(rnd, 8);
  paintField(t, STONE, field((x, y) => a(x, y) * 0.15 + b(x, y) * 0.4 + rnd() * 0.5), [1, 2, 3, 4, 3, 2, 1]);
  // Короткие горизонтальные прожилки.
  for (let i = 0; i < 8; i++) {
    const x = Math.floor(rnd() * N);
    const y = Math.floor(rnd() * N);
    const len = 2 + Math.floor(rnd() * 3);
    const c = rnd() < 0.6 ? STONE[1] : STONE[5];
    for (let k = 0; k < len; k++) t.set(x + k, y, c);
  }
}

const ORE_SHAPES = [
  [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1]],
  [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]],
  [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [1, 2]],
  [[1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [1, 2]],
  [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [2, 2]],
  [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2], [2, 2]],
];

/** Камень с вкраплениями руды; colors = [тень, основной, блик]. */
function ore(t: Tile, rnd: Rnd, colors: RGB[], clusters = 6): void {
  stone(t, rnd);
  const placed: number[][] = [];
  for (let tries = 0; placed.length < clusters && tries < 400; tries++) {
    const cx = Math.floor(rnd() * N);
    const cy = Math.floor(rnd() * N);
    if (placed.some(([px, py]) => Math.max(wrapDist(px, cx), wrapDist(py, cy)) < 5)) continue;
    placed.push([cx, cy]);
    const shape = ORE_SHAPES[Math.floor(rnd() * ORE_SHAPES.length)];
    const has = (dx: number, dy: number) => shape.some(([sx, sy]) => sx === dx && sy === dy);
    // Тень от вкрапления на камне справа и снизу.
    for (const [dx, dy] of shape) {
      if (!has(dx + 1, dy)) t.set(cx + dx + 1, cy + dy, shade(t.get(cx + dx + 1, cy + dy), 0.8));
      if (!has(dx, dy + 1)) t.set(cx + dx, cy + dy + 1, shade(t.get(cx + dx, cy + dy + 1), 0.8));
    }
    for (const [dx, dy] of shape) {
      const lit = !has(dx, dy - 1) || !has(dx - 1, dy);
      const dark = !has(dx, dy + 1) || !has(dx + 1, dy);
      const c = lit && !dark ? colors[2] : dark && !lit ? colors[0] : colors[1];
      t.set(cx + dx, cy + dy, jitter(c, rnd, 0.08));
    }
  }
}

const COBBLE = pal('#4a4a4a', '#585858', '#666666', '#757575', '#848484', '#939393', '#a3a3a3');
const MORTAR = pal('#303030', '#383838', '#404040');

function cobblestone(t: Tile, rnd: Rnd): void {
  const cells = voronoi(rnd, 3, 3, 0.9, 0.35);
  const tone = Array.from({ length: cells.count }, () => rnd());
  const mortar = new Uint8Array(N * N);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const c = cells.at(x, y);
      if (cells.at(x + 1, y) !== c || cells.at(x, y + 1) !== c) mortar[y * N + x] = 1;
    }
  const isMortar = (x: number, y: number) => mortar[wrapIdx(x, y)] === 1;
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      if (isMortar(x, y)) {
        t.set(x, y, any(rnd, MORTAR));
        continue;
      }
      let lvl = 1.4 + tone[cells.at(x, y)] * 2.8 + (rnd() - 0.5) * 1.4;
      if (isMortar(x - 1, y) || isMortar(x, y - 1)) lvl += 1.4;
      if (isMortar(x + 1, y) || isMortar(x, y + 1)) lvl -= 1.2;
      t.set(x, y, level(COBBLE, lvl));
    }
}

function mossyCobblestone(t: Tile, rnd: Rnd): void {
  const MOSS = pal('#2f4a1c', '#3a5b23', '#466c2a', '#537d32', '#618e3b', '#6f9d45');
  cobblestone(t, rnd);
  const a = valueNoise(rnd, 4);
  const f = field((x, y) => a(x, y) + rnd() * 0.35);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      if (f[y * N + x] < 0.6) continue;
      const [r, g, b] = t.get(x, y);
      t.set(x, y, level(MOSS, ((r + g + b) / 3 - 50) / 21));
    }
}

function stoneBricks(t: Tile, rnd: Rnd): void {
  const SB = pal('#5c5c5c', '#676767', '#727272', '#7c7c7c', '#868686', '#919191', '#9c9c9c');
  const a = valueNoise(rnd, 8);
  const f = field((x, y) => a(x, y) * 0.5 + rnd() * 0.6);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const row = y < 8 ? 0 : 1;
      const lx = (x + (row ? 8 : 0)) % N;
      const ly = y % 8;
      if (ly === 7 || lx === 15) {
        t.set(x, y, jitter(hex('#454545'), rnd, 0.12));
        continue;
      }
      let lvl = 1.6 + f[y * N + x] * 2.8;
      if (ly === 0 || lx === 0) lvl += 1.5;
      else if (ly === 6 || lx === 14) lvl -= 1.3;
      t.set(x, y, level(SB, lvl));
    }
  // Пара трещинок на кирпичах.
  for (let i = 0; i < 2; i++) {
    let x = 2 + Math.floor(rnd() * 11);
    let y = 1 + Math.floor(rnd() * 4) + (i ? 8 : 0);
    for (let k = 0; k < 3; k++) {
      t.set(x, y, hex('#555555'));
      x += rnd() < 0.5 ? 1 : 0;
      y += 1;
    }
  }
}

function smoothStone(t: Tile, rnd: Rnd): void {
  const SMOOTH = pal('#999999', '#a0a0a0', '#a6a6a6', '#acacac', '#b2b2b2');
  const a = valueNoise(rnd, 8);
  paintField(t, SMOOTH, field((x, y) => a(x, y) * 0.3 + rnd()), [1, 2, 3, 2, 1]);
}

const BEDROCK = pal('#151515', '#252525', '#353535', '#464646', '#575757', '#6a6a6a', '#808080');

function bedrock(t: Tile, rnd: Rnd): void {
  const a = valueNoise(rnd, 4);
  const b = valueNoise(rnd, 8);
  paintField(t, BEDROCK, field((x, y) => a(x, y) * 0.5 + b(x, y) * 0.5 + rnd() * 0.45), [2, 2, 2, 2, 2, 1.5, 1]);
}

function obsidian(t: Tile, rnd: Rnd): void {
  const OBS = pal('#0b0814', '#120d1d', '#1a1428', '#231b35', '#2e2444', '#3c2f59', '#54427c');
  const a = valueNoise(rnd, 4);
  const b = valueNoise(rnd, 8);
  paintField(t, OBS, field((x, y) => a(x, y) * 0.45 + b(x, y) * 0.35 + rnd() * 0.3), [3, 3, 3, 2, 1.6, 1, 0.5]);
  // Редкие светлые блики-сколы.
  for (let i = 0; i < 4; i++) {
    const x = Math.floor(rnd() * N);
    const y = Math.floor(rnd() * N);
    t.set(x, y, hex('#6b56a0'));
    t.set(x + 1, y + 1, hex('#3c2f59'));
  }
}

// ───────────────────────────── песок, гравий, песчаник, снег, лёд ─────────────────────────────

const SAND = pal('#cbbf8b', '#d4c995', '#dbd19f', '#e2d9a9', '#e9e1b4');
const SANDSTONE = pal('#bcae76', '#c6b880', '#d0c28a', '#d8cb94', '#dfd39e', '#e7ddab');

function sand(t: Tile, rnd: Rnd): void {
  const a = valueNoise(rnd, 8);
  paintField(t, SAND, field((x, y) => a(x, y) * 0.3 + rnd()), [1, 2, 3, 2, 1]);
  for (let i = 0; i < 10; i++) t.set(rnd() * N, rnd() * N, rnd() < 0.6 ? hex('#b8aa76') : hex('#f2ecca'));
}

function gravel(t: Tile, rnd: Rnd): void {
  const GREY = pal('#4f4a48', '#5e5855', '#6d6763', '#7c7672', '#8b8581', '#9b9591', '#aba5a1');
  const BROWN = pal('#54473f', '#63554c', '#72635a', '#827268', '#918176', '#a09084', '#ae9f93');
  const cells = voronoi(rnd, 5, 5, 0.95, 0.5);
  const tone = Array.from({ length: cells.count }, () => 2 + rnd() * 3.5);
  const brown = Array.from({ length: cells.count }, () => rnd() < 0.28);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const c = cells.at(x, y);
      const edge = cells.at(x + 1, y) !== c || cells.at(x, y + 1) !== c;
      const lit = cells.at(x - 1, y) !== c || cells.at(x, y - 1) !== c;
      const lvl = tone[c] + (rnd() - 0.5) * 0.9 + (lit ? 1 : 0) - (edge ? 2.2 : 0);
      t.set(x, y, level(brown[c] ? BROWN : GREY, lvl));
    }
}

function sandstoneSide(t: Tile, rnd: Rnd): void {
  const a = valueNoise(rnd, 2, 8);
  const f = field((x, y) => a(x, y) * 0.6 + rnd() * 0.5);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      let lvl = 1.6 + f[y * N + x] * 2.6;
      if (y <= 1) lvl += 1.4;
      if (y === 2 || y === 13) lvl -= 0.7;
      if (y === 3 || y === 12) lvl = 0.2 + rnd() * 0.6;
      if (y === 15) lvl -= 1.4;
      t.set(x, y, level(SANDSTONE, lvl));
    }
}

function sandstoneTop(t: Tile, rnd: Rnd): void {
  const a = valueNoise(rnd, 8);
  paintField(t, SANDSTONE.slice(2), field((x, y) => a(x, y) * 0.3 + rnd()), [1, 3, 3, 1]);
}

function sandstoneBottom(t: Tile, rnd: Rnd): void {
  const a = valueNoise(rnd, 4);
  paintField(t, SANDSTONE.slice(0, 5), field((x, y) => a(x, y) * 0.5 + rnd() * 0.8), [1, 2, 3, 3, 2]);
  // Мелкие трещинки нижней грани.
  for (let i = 0; i < 5; i++) {
    let x = Math.floor(rnd() * N);
    let y = Math.floor(rnd() * N);
    for (let k = 0; k < 3; k++) {
      t.set(x, y, hex('#a99a63'));
      x += rnd() < 0.5 ? 1 : -1;
      y += rnd() < 0.5 ? 1 : 0;
    }
  }
}

function snow(t: Tile, rnd: Rnd): void {
  const a = valueNoise(rnd, 8);
  paintField(t, SNOW, field((x, y) => a(x, y) * 0.4 + rnd() * 0.8), [1, 2, 3, 4, 3]);
}

function ice(t: Tile, rnd: Rnd): void {
  const ICE = pal('#729ce8', '#7fa7ec', '#8db2f0', '#9cbdf4', '#aecaf7');
  const a = valueNoise(rnd, 4);
  const f = field((x, y) => a(x, y) * 0.55 + rnd() * 0.6);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const v = f[y * N + x];
      t.set(x, y, pick(ICE, v), Math.round(190 + v * 14));
    }
  // Белёсые трещинки-блики по диагонали.
  for (let i = 0; i < 4; i++) {
    let x = Math.floor(rnd() * N);
    let y = Math.floor(rnd() * N);
    const len = 3 + Math.floor(rnd() * 4);
    for (let k = 0; k < len; k++) {
      t.set(x, y, hex('#d6e6fd'), 208);
      x += 1;
      y -= rnd() < 0.7 ? 1 : 0;
    }
  }
}

// ───────────────────────────── дерево ─────────────────────────────

interface Wood {
  /** Оттенки древесины от тёмного к светлому. */
  ramp: RGB[];
  /** Тёмная щель между досками. */
  gap: RGB;
}

const OAK: Wood = { ramp: pal('#7d5f36', '#8c6b3e', '#9b7847', '#a98551', '#b6915b', '#c29d65'), gap: hex('#5c4426') };
const BIRCH: Wood = { ramp: pal('#a5925c', '#b3a068', '#c0ad74', '#cab87f', '#d4c389', '#ddcd94'), gap: hex('#86744a') };
const SPRUCE: Wood = { ramp: pal('#47321e', '#523a23', '#5d4228', '#684b2d', '#735333', '#7e5c39'), gap: hex('#2f2116') };
const CHEST_WOOD: Wood = { ramp: pal('#6a4217', '#784b1b', '#875520', '#955f26', '#a2692c', '#ae7434'), gap: hex('#432a0f') };

/** Четыре горизонтальные доски по 4 пикселя: волокна, тёмная щель, торцевые риски. */
function planks(t: Tile, rnd: Rnd, w: Wood): void {
  const mid = (w.ramp.length - 1) / 2;
  let seam = Math.floor(rnd() * N);
  for (let b = 0; b < 4; b++) {
    const y0 = b * 4;
    const tone = mid + (rnd() - 0.5) * 1.1;
    grain(t, rnd, w.ramp, 0, y0, N - 1, y0, tone + 0.7);
    grain(t, rnd, w.ramp, 0, y0 + 1, N - 1, y0 + 1, tone);
    grain(t, rnd, w.ramp, 0, y0 + 2, N - 1, y0 + 2, tone - 0.7);
    for (let x = 0; x < N; x++) t.set(x, y0 + 3, jitter(w.gap, rnd, 0.12));
    // Один торцевой стык на доску; у соседних досок стыки разнесены.
    for (let dy = 0; dy < 3; dy++) t.set(seam, y0 + dy, mix(w.gap, w.ramp[1], 0.45));
    seam = (seam + 5 + Math.floor(rnd() * 7)) % N;
  }
}

/** Кора: продольные гребни (2–3 пикселя) и тёмные борозды между ними. */
function bark(t: Tile, rnd: Rnd, ramp: RGB[]): void {
  const n = ramp.length;
  const prof: number[] = [];
  while (prof.length < N) {
    const w = 2 + Math.floor(rnd() * 2);
    const top = n - 2 + (rnd() - 0.5) * 1.4;
    for (let i = 0; i < w; i++) prof.push(top - (i === 0 ? -0.3 : i === w - 1 ? 1.3 : 0.3));
    prof.push(0.3 + rnd() * 0.9);
  }
  for (let x = 0; x < N; x++) {
    let off = 0;
    for (let y = 0; y < N; y++) {
      if (rnd() < 0.2) off = (rnd() - 0.5) * 2;
      t.set(x, y, level(ramp, prof[x] + off));
    }
  }
  for (let i = 0; i < 5; i++) {
    const x = Math.floor(rnd() * N);
    const y = Math.floor(rnd() * N);
    t.set(x, y, ramp[0]);
    t.set(x, y + 1, ramp[1]);
  }
}

/** Торец бревна: кора по краю, годичные кольца внутри. rings = [кольцо, светлое, светлее]. */
function logTop(t: Tile, rnd: Rnd, rings: RGB[], barkRamp: RGB[]): void {
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      if (x === 0 || y === 0 || x === N - 1 || y === N - 1) {
        t.set(x, y, level(barkRamp, 1 + rnd() * 2.5));
        continue;
      }
      const dx = Math.abs(x - 7.5);
      const dy = Math.abs(y - 7.5);
      const d = 0.45 * Math.max(dx, dy) + 0.55 * Math.hypot(dx, dy) + (rnd() - 0.5) * 0.3;
      let c: RGB;
      if (Math.max(dx, dy) > 6) c = mix(rings[0], barkRamp[barkRamp.length - 1], 0.35);
      else if (d < 1.2) c = rings[0];
      else c = d % 2.2 < 0.85 ? rings[0] : d % 2.2 < 1.5 ? rings[1] : rings[2];
      t.set(x, y, jitter(c, rnd, 0.06));
    }
}

function birchBark(t: Tile, rnd: Rnd): void {
  const BB = pal('#b4b1a8', '#c3c0b7', '#d1cfc6', '#dddbd3', '#e8e6df');
  const DARK = pal('#1f1f1f', '#2c2c2c', '#3a3a3a');
  const a = valueNoise(rnd, 2, 8);
  paintField(t, BB, field((x, y) => a(x, y) * 0.5 + rnd() * 0.6), [1, 2, 3, 3, 2]);
  // Чёрные «чечевички» — горизонтальные штрихи разной длины.
  for (let i = 0; i < 9; i++) {
    const x = Math.floor(rnd() * N);
    const y = Math.floor(rnd() * N);
    const len = 2 + Math.floor(rnd() * 4);
    for (let k = 0; k < len; k++) t.set(x + k, y, any(rnd, DARK));
    if (len > 3 && rnd() < 0.5) for (let k = 1; k < len - 1; k++) t.set(x + k, y + 1, any(rnd, DARK));
  }
}

const OAK_BARK = pal('#382916', '#45331c', '#523d23', '#5f472a', '#6c5131', '#7a5d39');
const SPRUCE_BARK = pal('#21160b', '#2a1d0f', '#342413', '#3e2c18', '#48331d', '#533c23');
const BIRCH_BARK = pal('#9d9a91', '#c3c0b7', '#d1cfc6', '#e2e0d8');

/** Листва: мелкие кластеры листьев (ячейки Вороного) с подсветкой и ~18% разбросанных дырок с тенью под ними. */
function leaves(t: Tile, rnd: Rnd, ramp: RGB[], holes = 0.18): void {
  const cells = voronoi(rnd, 6, 6, 0.9, 0.4);
  const tone = Array.from({ length: cells.count }, () => 1.5 + rnd() * (ramp.length - 2.5));
  const score = new Float32Array(N * N);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const c = cells.at(x, y);
      const edge = cells.at(x + 1, y) !== c || cells.at(x, y + 1) !== c;
      const lit = cells.at(x - 1, y) !== c || cells.at(x, y - 1) !== c;
      t.set(x, y, level(ramp, tone[c] + (rnd() - 0.5) * 1.2 + (lit ? 1 : 0) - (edge ? 1.3 : 0)));
      score[y * N + x] = (edge ? 0.3 : 0) + rnd();
    }
  const order = Array.from({ length: N * N }, (_, i) => i).sort((a, b) => score[b] - score[a]);
  const count = Math.round(N * N * holes);
  const hole = new Uint8Array(N * N);
  for (let i = 0; i < count; i++) hole[order[i]] = 1;
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      if (hole[y * N + x]) t.alpha(x, y, 0);
      // Тень под дыркой придаёт листве объём.
      else if (hole[wrapIdx(x, y - 1)]) t.set(x, y, shade(t.get(x, y), 0.78));
    }
}

// ───────────────────────────── растения ─────────────────────────────

const PLANT = pal('#2c6a1b', '#367d21', '#418f28', '#4ca030', '#5ab03b', '#69bd47');

function tallGrass(t: Tile, rnd: Rnd): void {
  for (let i = 0; i < 20; i++) {
    let x = 1 + Math.floor(rnd() * 14);
    const h = 3 + Math.floor(rnd() * 12);
    const lean = rnd() < 0.5 ? -1 : 1;
    const bend = 0.3 + rnd() * 0.4;
    const base = 1 + rnd() * 3;
    for (let k = 0; k < h; k++) {
      if (k > h * bend && rnd() < 0.35) x += lean;
      if (x < 0 || x >= N) break;
      // Травинка светлеет к кончику.
      t.set(x, N - 1 - k, level(PLANT, base + (k / h) * 1.6 - 0.9));
    }
  }
}

const FLOWER_STEM = [
  '.......g........',
  '.......g........',
  '....G..g..G.....',
  '.....GGg.GG.....',
  '......Ggg.......',
  '.......g........',
  '.......g........',
];

function dandelion(t: Tile, rnd: Rnd): void {
  const inks = {
    g: PLANT[2],
    G: PLANT[1],
    Y: pal('#f2d421', '#f7dc2c'),
    y: hex('#fff27c'),
    o: hex('#e0a10e'),
  };
  stamp(t, rnd, FLOWER_STEM, inks, 0, 9);
  stamp(t, rnd, ['.yYY.', 'yYYYo', 'YYoYo', '.Yoo.'], inks, 5, 5);
}

function poppy(t: Tile, rnd: Rnd): void {
  const inks = {
    g: PLANT[2],
    G: PLANT[1],
    R: pal('#e0282a', '#d62224'),
    r: hex('#a8141a'),
    l: hex('#ff5a4f'),
    k: hex('#2b0b0b'),
  };
  stamp(t, rnd, FLOWER_STEM, inks, 0, 9);
  stamp(t, rnd, ['.lRr.', 'lRRRr', 'RRkRr', 'rRRrr', '.rrr.'], inks, 5, 4);
}

function deadBush(t: Tile, rnd: Rnd): void {
  const inks = { b: pal('#7a5429', '#87602f'), B: hex('#5e3f1c'), l: hex('#9c7440') };
  stamp(
    t,
    rnd,
    [
      '................',
      '..l.........l...',
      '...b.......b..l.',
      '.l..b.....b..b..',
      '..b..b...l..b...',
      '...b.b..b..b....',
      '....bb..b.b..l..',
      '.l...b.b.bb.b...',
      '..b..bbbbb..b...',
      '...bb.bBb..b....',
      '.....bBBb.b.....',
      '......BBbb......',
      '.......BB.......',
      '.......BB.......',
      '.......BB.......',
      '.......BB.......',
    ],
    inks,
  );
}

const SAPLING_TRUNK = pal('#5d4124', '#6e4e2c');

function sapling(t: Tile, rnd: Rnd, rows: string[], leavesRamp: RGB[], trunk: RGB[]): void {
  stamp(t, rnd, rows, {
    d: leavesRamp[0],
    g: [leavesRamp[1], leavesRamp[2]],
    G: [leavesRamp[3], leavesRamp[4]],
    L: leavesRamp[5],
    t: trunk[1],
    T: trunk[0],
  });
}

const OAK_SAPLING = [
  '................',
  '................',
  '......gGg.......',
  '....gGLGGgg.....',
  '...gGLGgGLGg....',
  '..gGGdGGLGGgd...',
  '..gLGgdGgGdGg...',
  '...gGGgGLGgGd...',
  '..dgGdgGGdGGg...',
  '...dgGgtgGgd....',
  '.....dgtTgd.....',
  '.......tT.......',
  '.......tT.......',
  '.......tT.......',
  '.......tT.......',
  '......tTTT......',
];

const BIRCH_SAPLING = [
  '................',
  '.......gG.......',
  '.....gGLGg......',
  '....gGLGGGg.....',
  '...gGGgLGgGd....',
  '...gLGdGGLGg....',
  '....gGGgGGgd....',
  '.....dgGtgd.....',
  '......dgtd......',
  '........t.......',
  '.......Tt.......',
  '........t.......',
  '........t.......',
  '.......tT.......',
  '........t.......',
  '.......ttT......',
];

const SPRUCE_SAPLING = [
  '................',
  '.......g........',
  '......gGg.......',
  '.....gGLGd......',
  '......gGd.......',
  '....gGGLGGd.....',
  '...gGLGGGLGd....',
  '.....dgtgd......',
  '...gGGgtGGgd....',
  '..gGLGGtGGLGd...',
  '.gGGgGGtGgGGGd..',
  '....dd.tT.dd....',
  '.......tT.......',
  '.......tT.......',
  '.......tT.......',
  '......tTTT......',
];

/**
 * Пшеница: общая раскладка стеблей для всех стадий (свой генератор), со стадией
 * стебли растут, обрастают листьями, на стадиях 5–7 появляются колосья и
 * культура желтеет до золотисто-коричневой.
 */
function wheat(stage: number): Painter {
  return (t) => {
    const r = seeded(0x5eed1e5);
    const GREEN = pal('#245d15', '#2f7419', '#3c8a22', '#4b9e2d', '#5db23a');
    const RIPE = pal('#6e5016', '#8a671f', '#a6812a', '#bf9a37', '#d5b24b', '#e6c963');
    const ripe = Math.min(1, Math.max(0, (stage - 3) / 4));
    const plant = (lvl: number) => mix(level(GREEN, lvl), level(RIPE, lvl + 0.8), ripe);
    const ear =
      stage >= 7 ? RIPE.slice(1) : stage === 6 ? RIPE.slice(1).map((c) => mix(c, GREEN[3], 0.3)) : RIPE.slice(1).map((c) => mix(c, GREEN[3], 0.6));
    const count = 9;
    for (let i = 0; i < count; i++) {
      const front = i % 2 === 0;
      let x = Math.min(N - 1, Math.max(0, Math.round(0.8 + i * 1.8 + (r() - 0.5) * 0.8)));
      const hf = 0.72 + r() * 0.28;
      const h = Math.max(1, Math.round((1.6 + stage * 1.8) * hf));
      const lean = r() < 0.5 ? -1 : 1;
      const bendAt = Math.floor(h * (0.45 + r() * 0.3));
      const leafAt = 1 + Math.floor(r() * 3);
      const earLen = stage >= 5 ? stage - 2 : 0;
      const tone = front ? 2.2 : 1.2;
      for (let k = 0; k < h; k++) {
        const y = N - 1 - k;
        if (k === bendAt && stage >= 2 && r() < 0.7) x = Math.min(N - 1, Math.max(0, x + lean));
        if (k >= h - earLen) {
          // Колос: два столбца зёрен со сдвигом тона, на вершине — ость.
          const alt = (k & 1) === 0;
          t.set(x, y, level(ear, (front ? 3 : 2) + (alt ? 1 : -1)));
          if (alt || k === h - earLen) t.set(x - lean, y, level(ear, (front ? 2 : 1) + (alt ? -1 : 1)));
          if (k === h - 1) t.set(x, y - 1, level(ear, 4));
        } else {
          t.set(x, y, plant(tone + (k % 3 === 0 ? 0.6 : 0)));
          // Листья: короткие диагональные отростки.
          if (stage >= 1 && stage <= 6 && (k === leafAt || (stage >= 3 && k === leafAt + 4))) {
            const side = k === leafAt ? -lean : lean;
            t.set(x + side, y - 1, plant(tone + 1));
            if (stage >= 2) t.set(x + 2 * side, y - 2, plant(tone + 1.6));
          }
        }
      }
    }
  };
}

function cactusSide(t: Tile, rnd: Rnd): void {
  const CACTUS = pal('#1b4716', '#255b1d', '#306f25', '#3c832e', '#4a9638', '#59a944');
  const prof = [0, 2, 4, 3, 1, 2, 4, 3, 1, 2, 4, 3, 1, 3, 2, 0];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) t.set(x, y, level(CACTUS, prof[x] + (rnd() < 0.15 ? -1 : 0)));
  // Колючки: светлый кончик и тёмное основание.
  for (const [x, y] of [
    [4, 2],
    [8, 6],
    [12, 3],
    [4, 10],
    [8, 13],
    [12, 11],
  ]) {
    t.set(x, y, hex('#e4e0a6'));
    t.set(x, y + 1, hex('#173f12'));
  }
}

function cactusTop(t: Tile, rnd: Rnd): void {
  const CACTUS = pal('#1b4716', '#255b1d', '#306f25', '#3c832e', '#4a9638', '#59a944');
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5));
      const lvl = d > 7 ? 0 : d > 6 ? 2 : Math.floor(d) % 2 === 0 ? 4 : 3;
      t.set(x, y, level(CACTUS, lvl + (rnd() < 0.15 ? -1 : 0)));
    }
  for (const [x, y] of [
    [3, 3],
    [12, 3],
    [3, 12],
    [12, 12],
    [7, 2],
    [2, 8],
    [13, 7],
    [8, 13],
  ])
    t.set(x, y, hex('#e4e0a6'));
}

function cactusBottom(t: Tile, rnd: Rnd): void {
  const PULP = pal('#86a85a', '#94b567', '#a1c174', '#adcc82');
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5));
      t.set(x, y, d > 7 ? hex('#1b4716') : d > 6 ? hex('#306f25') : d > 5 ? hex('#4a9638') : any(rnd, PULP));
    }
  for (let i = 0; i < 6; i++) t.set(4 + rnd() * 8, 4 + rnd() * 8, hex('#6c8d44'));
}

// ───────────────────────────── декоративные блоки ─────────────────────────────

function bricks(t: Tile, rnd: Rnd): void {
  const BRICK = pal('#7a3829', '#8a4332', '#994e3a', '#a65843', '#b4654f', '#c0735c');
  const MORT = pal('#958f86', '#a29c93', '#aea99f');
  for (let row = 0; row < 4; row++) {
    const off = row % 2 ? 4 : 0;
    for (let b = 0; b < 2; b++) {
      const tone = 1.2 + rnd() * 2.2;
      for (let dy = 0; dy < 4; dy++)
        for (let i = 0; i < 8; i++) {
          const x = b * 8 + i + off;
          const y = row * 4 + dy;
          if (dy === 3 || i === 7) {
            t.set(x, y, any(rnd, MORT));
            continue;
          }
          const lvl = tone + (dy === 0 ? 0.9 : 0) - (dy === 2 || i === 6 ? 0.8 : 0) + (rnd() - 0.5) * 0.9;
          t.set(x, y, level(BRICK, lvl));
        }
    }
  }
}

function bookshelf(t: Tile, rnd: Rnd): void {
  const BOOKS = pal('#8e2626', '#2a4c8c', '#2d7a39', '#8c6a1d', '#6a2a7a', '#b0802c', '#3f6f78', '#7a2f4a');
  const BACK = pal('#2c1d0c', '#352411');
  // Деревянный каркас: верх/низ, полка посередине и боковины.
  grain(t, rnd, OAK.ramp, 0, 0, N - 1, 0, 4);
  grain(t, rnd, OAK.ramp, 0, 7, N - 1, 7, 4);
  grain(t, rnd, OAK.ramp, 0, 8, N - 1, 8, 1.5);
  grain(t, rnd, OAK.ramp, 0, 15, N - 1, 15, 1);
  for (let y = 0; y < N; y++) {
    t.set(0, y, level(OAK.ramp, 3 + rnd()));
    t.set(N - 1, y, level(OAK.ramp, 1 + rnd()));
  }
  for (const [y0, y1] of [
    [1, 6],
    [9, 14],
  ]) {
    for (let y = y0; y <= y1; y++) for (let x = 1; x < N - 1; x++) t.set(x, y, any(rnd, BACK));
    let x = 1;
    while (x < N - 1) {
      const w = rnd() < 0.2 ? 1 : rnd() < 0.8 ? 2 : 3;
      const c = any(rnd, BOOKS);
      const top = y0 + (rnd() < 0.35 ? 1 : 0);
      const band = rnd() < 0.6 ? top + 1 + Math.floor(rnd() * 3) : -1;
      for (let i = 0; i < w && x < N - 1; i++, x++)
        for (let y = top; y <= y1; y++) {
          let col = shade(c, i === 0 ? 1.15 : i === w - 1 && w > 1 ? 0.8 : 1);
          if (y === top) col = shade(col, 1.2);
          if (y === band) col = mix(col, hex('#e2c46a'), 0.55);
          t.set(x, y, col);
        }
      if (rnd() < 0.18 && x < N - 2) x++;
    }
  }
}

function glowstone(t: Tile, rnd: Rnd): void {
  const GLOW = pal('#6b4a22', '#8c6430', '#b0823b', '#cf9f48', '#e8bb57', '#f8d572', '#ffe9a3', '#fff7d6');
  const cells = voronoi(rnd, 4, 4, 0.95, 0.5);
  const tone = Array.from({ length: cells.count }, () => 3 + rnd() * 3.5);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const c = cells.at(x, y);
      const edge = cells.at(x + 1, y) !== c || cells.at(x, y + 1) !== c;
      const lit = cells.at(x - 1, y) !== c || cells.at(x, y - 1) !== c;
      const lvl = edge ? rnd() * 2.2 : tone[c] + (rnd() - 0.5) * 1.6 + (lit ? 1 : 0);
      t.set(x, y, level(GLOW, lvl));
    }
}

/** Шерсть: волнистые диагональные волокна (период 4 — бесшовно) и лёгкий шум. */
function wool(base: string): Painter {
  const c = hex(base);
  const ramp = [mix(c, BLACK, 0.3), mix(c, BLACK, 0.15), c, mix(c, WHITE, 0.08), mix(c, WHITE, 0.18)];
  return (t, rnd) => {
    const wave = valueNoise(rnd, 4);
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        const k = (x + y + Math.round(wave(x, y) * 4)) & 3;
        const fibre = k === 0 ? -0.9 : k === 1 ? 0.7 : 0;
        t.set(x, y, level(ramp, 2 + fibre + (rnd() - 0.5) * 1.1));
      }
  };
}

// ───────────────────────────── металл и самоцветы ─────────────────────────────

interface Metal {
  hi: RGB;
  light: RGB;
  base: RGB;
  shadow: RGB;
  dark: RGB;
}

/** Блок металла: заливка, внешняя и внутренняя фаски (свет сверху-слева). */
function metalBlock(t: Tile, rnd: Rnd, m: Metal): void {
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) t.set(x, y, jitter(m.base, rnd, 0.04));
  for (let i = 0; i < N; i++) {
    t.set(i, 0, m.light);
    t.set(0, i, m.light);
    t.set(i, N - 1, m.dark);
    t.set(N - 1, i, m.dark);
  }
  for (let i = 1; i < N - 1; i++) {
    t.set(i, 1, m.hi);
    t.set(1, i, m.hi);
    t.set(i, N - 2, m.shadow);
    t.set(N - 2, i, m.shadow);
  }
  t.set(N - 2, 1, m.base);
  t.set(1, N - 2, m.base);
}

const IRON: Metal = { hi: hex('#ffffff'), light: hex('#f0f0f0'), base: hex('#dadada'), shadow: hex('#b2b2b2'), dark: hex('#8f8f8f') };
const GOLD: Metal = { hi: hex('#fffbc4'), light: hex('#fff09a'), base: hex('#f5d33a'), shadow: hex('#d4a923'), dark: hex('#a77d15') };
const DIAMOND: Metal = { hi: hex('#e6fffc'), light: hex('#b4fbf3'), base: hex('#5fe0d6'), shadow: hex('#36b3aa'), dark: hex('#1d827b') };

function ironBlock(t: Tile, rnd: Rnd): void {
  metalBlock(t, rnd, IRON);
  // Шов между пластинами и заклёпки по углам.
  for (let x = 2; x < N - 2; x++) {
    t.set(x, 7, hex('#bdbdbd'));
    t.set(x, 8, hex('#ececec'));
  }
  for (const [x, y] of [
    [3, 3],
    [12, 3],
    [3, 12],
    [12, 12],
  ]) {
    t.set(x, y, hex('#a4a4a4'));
    t.set(x - 1, y - 1, WHITE);
  }
}

function goldBlock(t: Tile, rnd: Rnd): void {
  metalBlock(t, rnd, GOLD);
  // Мягкий отблеск полосой по диагонали и пара тёмных царапин.
  for (let y = 2; y < N - 2; y++)
    for (let x = 2; x < N - 2; x++) {
      const d = x + y;
      if (d === 8 || d === 9) t.set(x, y, mix(GOLD.base, GOLD.light, d === 8 ? 0.75 : 0.45));
      else if (d === 11) t.set(x, y, mix(GOLD.base, GOLD.light, 0.3));
      else if (d > 16 && rnd() < 0.12) t.set(x, y, mix(GOLD.base, GOLD.shadow, 0.5));
    }
  t.set(10, 11, GOLD.shadow);
  t.set(11, 11, GOLD.shadow);
  t.set(5, 9, GOLD.shadow);
}

function diamondBlock(t: Tile, rnd: Rnd): void {
  metalBlock(t, rnd, DIAMOND);
  // Огранка: ромб в центре со светлыми верхними и тёмными нижними гранями.
  for (let y = 2; y < N - 2; y++)
    for (let x = 2; x < N - 2; x++) {
      const d = Math.abs(x - 7.5) + Math.abs(y - 7.5);
      if (d > 5 && d < 6.1) t.set(x, y, y < 7.5 ? DIAMOND.light : DIAMOND.shadow);
      else if (d < 2.1) t.set(x, y, DIAMOND.hi);
    }
  t.set(4, 4, WHITE);
  t.set(5, 3, WHITE);
}

// ───────────────────────────── TNT ─────────────────────────────

function tntSide(t: Tile, rnd: Rnd): void {
  const RED = hex('#c63a2c');
  // Шашки: полосы по 4 пикселя, тёмная щель между ними.
  const stick = [1.15, 1, 0.88, 0.6];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) t.set(x, y, jitter(shade(RED, stick[x % 4]), rnd, 0.06));
  // Бумажная лента с надписью TNT.
  for (let x = 0; x < N; x++) {
    t.set(x, 4, hex('#9c2c22'));
    t.set(x, 5, hex('#d8d8d8'));
    for (let y = 6; y <= 10; y++) t.set(x, y, jitter(hex('#f0f0f0'), rnd, 0.04));
    t.set(x, 11, hex('#cfcfcf'));
    t.set(x, 12, hex('#9c2c22'));
  }
  const ink = hex('#1a1a1a');
  stamp(t, rnd, ['###.#..#.###', '.#..##.#..#.', '.#..#.##..#.', '.#..#..#..#.', '.#..#..#..#.'], { '#': ink }, 2, 6);
}

function tntEnd(t: Tile, rnd: Rnd, fuse: boolean): void {
  const BG = hex('#6e1d16');
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) t.set(x, y, jitter(BG, rnd, 0.1));
  // Торцы шашек 4×4.
  for (let cy = 0; cy < 4; cy++)
    for (let cx = 0; cx < 4; cx++)
      stamp(t, rnd, ['.rr.', 'rRRr', 'RlRr', '.rr.'], { r: hex('#b8352a'), R: hex('#d64a3a'), l: hex('#e8705e') }, cx * 4, cy * 4);
  if (fuse) {
    stamp(
      t,
      rnd,
      ['..kk..', '.kgGk.', 'kgGGgk', 'kGgGgk', '.kgGk.', '..kk..'],
      { k: hex('#2a2a2a'), g: hex('#6b6b6b'), G: hex('#9a9a9a') },
      5,
      5,
    );
    t.set(10, 4, hex('#9a9a9a'));
    t.set(11, 3, hex('#6b6b6b'));
  }
}

// ───────────────────────────── верстак, печь, сундук ─────────────────────────────

const TABLE_DARK = pal('#3f2a14', '#47301a', '#4f361d');

function craftingTop(t: Tile, rnd: Rnd): void {
  const TOP = pal('#8f6b3c', '#9d7745', '#ab844f', '#b89159', '#c49d64', '#cfa86e');
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      if (x === 0 || y === 0 || x === N - 1 || y === N - 1) {
        t.set(x, y, any(rnd, TABLE_DARK));
        continue;
      }
      if (x % 5 === 0 || y % 5 === 0) {
        t.set(x, y, jitter(hex('#62441f'), rnd, 0.1));
        continue;
      }
      const cx = x % 5;
      const cy = y % 5;
      let lvl = 2.5 + (rnd() - 0.5) * 1.4;
      if (cx === 1 || cy === 1) lvl += 1.3;
      if (cx === 4 || cy === 4) lvl -= 1.3;
      t.set(x, y, level(TOP, lvl));
    }
}

/** Бок верстака: доски, тёмная кромка столешницы и ножки по краям. */
function tableSide(t: Tile, rnd: Rnd): void {
  planks(t, rnd, OAK);
  const EDGE = pal('#6b4a26', '#77542c', '#835e33');
  for (let x = 0; x < N; x++) {
    t.set(x, 0, any(rnd, TABLE_DARK));
    t.set(x, 1, any(rnd, EDGE));
    t.set(x, 2, any(rnd, EDGE));
    t.set(x, 3, any(rnd, TABLE_DARK));
    t.set(x, N - 1, any(rnd, TABLE_DARK));
  }
  for (let y = 4; y < N; y++) {
    t.set(0, y, any(rnd, TABLE_DARK));
    t.set(1, y, any(rnd, EDGE));
    t.set(N - 2, y, any(rnd, EDGE));
    t.set(N - 1, y, any(rnd, TABLE_DARK));
  }
}

function craftingSide(t: Tile, rnd: Rnd): void {
  tableSide(t, rnd);
  // Клещи висят на боку.
  stamp(
    t,
    rnd,
    ['..k...k..', '..mk.km..', '...mkm...', '....k....', '...b.b...', '..b...b..', '..b...b..', '.bb...bb.'],
    { k: hex('#4a4a4a'), m: hex('#b5b5b5'), b: hex('#5a3a1a') },
    3,
    5,
  );
}

function craftingFront(t: Tile, rnd: Rnd): void {
  tableSide(t, rnd);
  const inks = {
    b: hex('#4f3215'),
    B: hex('#7a5328'),
    m: hex('#bdbdbd'),
    M: hex('#8f8f8f'),
    k: hex('#4e4e4e'),
  };
  // Пила слева, молоток справа (ножки занимают столбцы 0–1 и 14–15).
  stamp(
    t,
    rnd,
    [
      '...BBB...kMMMk..',
      '..Bb.bB..kmmmk..',
      '..BBBBB....B....',
      '...mmM.....b....',
      '...mmMk....B....',
      '...mmMM....b....',
      '...mmMk....B....',
      '...mmMM....b....',
      '...mMMk....B....',
      '...MMk.....b....',
    ],
    inks,
    0,
    5,
  );
}

const FURNACE = pal('#5b5b5b', '#666666', '#717171', '#7c7c7c', '#878787', '#929292');

function furnaceBody(t: Tile, rnd: Rnd): void {
  const a = valueNoise(rnd, 8);
  paintField(t, FURNACE, field((x, y) => a(x, y) * 0.4 + rnd() * 0.8), [1, 2, 3, 3, 2, 1]);
  for (let i = 0; i < N; i++) {
    t.set(i, 0, jitter(hex('#4c4c4c'), rnd, 0.08));
    t.set(0, i, jitter(hex('#4c4c4c'), rnd, 0.08));
    t.set(i, N - 1, jitter(hex('#3c3c3c'), rnd, 0.08));
    t.set(N - 1, i, jitter(hex('#3c3c3c'), rnd, 0.08));
  }
  for (let i = 1; i < N - 1; i++) {
    t.set(i, 1, jitter(hex('#a0a0a0'), rnd, 0.06));
    t.set(1, i, jitter(hex('#a0a0a0'), rnd, 0.06));
    t.set(i, N - 2, jitter(hex('#5e5e5e'), rnd, 0.06));
    t.set(N - 2, i, jitter(hex('#5e5e5e'), rnd, 0.06));
  }
}

function furnaceTop(t: Tile, rnd: Rnd): void {
  furnaceBody(t, rnd);
  // Утопленная панель в центре.
  for (let i = 4; i <= 11; i++) {
    t.set(i, 4, hex('#5a5a5a'));
    t.set(4, i, hex('#5a5a5a'));
    t.set(i, 11, hex('#9a9a9a'));
    t.set(11, i, hex('#9a9a9a'));
  }
}

function furnaceFront(lit: boolean): Painter {
  return (t, rnd) => {
    furnaceBody(t, rnd);
    // Узкая щель-поддувало сверху.
    for (let x = 4; x <= 11; x++) {
      t.set(x, 3, hex('#2f2f2f'));
      t.set(x, 4, hex('#232323'));
      t.set(x, 5, hex('#a5a5a5'));
    }
    // Топка в нижней половине: светлая перемычка сверху, тёмный проём.
    for (let x = 3; x <= 12; x++) {
      t.set(x, 7, hex('#a8a8a8'));
      t.set(x, 14, hex('#5a5a5a'));
    }
    for (let y = 8; y <= 13; y++) {
      t.set(3, y, hex('#4a4a4a'));
      t.set(12, y, hex('#9a9a9a'));
      for (let x = 4; x <= 11; x++) t.set(x, y, y === 8 ? hex('#0e0e0e') : jitter(hex('#191919'), rnd, 0.2));
    }
    if (!lit) {
      for (let x = 4; x <= 11; x++) t.set(x, 13, jitter(hex('#2b2b2b'), rnd, 0.2));
      return;
    }
    const FIRE = pal('#7a1d06', '#b33208', '#e0560d', '#f78a1b', '#fdbb2f', '#ffe36a', '#fff8cf');
    for (let x = 4; x <= 11; x++) {
      const h = 2 + Math.floor(rnd() * 4);
      for (let k = 0; k < h; k++) {
        const y = 13 - k;
        t.set(x, y, level(FIRE, 6 - (k / h) * 5 - rnd() * 0.8));
      }
      t.set(x, 13 - h, hex('#3a1004'));
    }
  };
}

const CHEST_RIM = pal('#2b1a09', '#34200c', '#3d260f');

function chestBase(t: Tile, rnd: Rnd, lid: boolean): void {
  const mid = (CHEST_WOOD.ramp.length - 1) / 2;
  grain(t, rnd, CHEST_WOOD.ramp, 0, 0, N - 1, N - 1, mid);
  // Светлые верхние и тёмные нижние строки досок по 5 пикселей.
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const k = y % 5;
      if (k === 0) t.set(x, y, shade(t.get(x, y), 1.12));
      if (k === 4) t.set(x, y, shade(t.get(x, y), 0.82));
    }
  border(t, rnd, CHEST_RIM);
  if (lid) {
    for (let x = 1; x < N - 1; x++) {
      t.set(x, 5, any(rnd, CHEST_RIM));
      t.set(x, 6, shade(t.get(x, 6), 0.8));
      t.set(x, 4, shade(t.get(x, 4), 1.1));
    }
  }
}

function chestFront(t: Tile, rnd: Rnd): void {
  chestBase(t, rnd, true);
  stamp(
    t,
    rnd,
    ['kkkk', 'kmMk', 'kmMk', 'kMdk', 'kMMk', 'kkkk'],
    { k: hex('#2a2a2a'), m: hex('#e4e4e4'), M: hex('#b0b0b0'), d: hex('#3a3a3a') },
    6,
    3,
  );
}

// ───────────────────────────── факел, лестница, дверь ─────────────────────────────

function torch(t: Tile): void {
  const WOOD = pal('#5a3d1c', '#7a5529', '#956a35');
  for (let y = 8; y < N; y++) {
    t.set(7, y, WOOD[2]);
    t.set(8, y, WOOD[1]);
  }
  t.set(8, 15, WOOD[0]);
  t.set(7, 8, hex('#6b4a22'));
  t.set(8, 8, hex('#4a3216'));
  // Пламя в строках 6–7: жёлто-оранжевое с белой сердцевиной.
  t.set(7, 6, hex('#ffd84a'));
  t.set(8, 6, hex('#ffa62b'));
  t.set(7, 7, hex('#fffbe8'));
  t.set(8, 7, hex('#ffe066'));
}

function ladder(t: Tile, rnd: Rnd): void {
  const WOOD = pal('#5e4320', '#77562b', '#8e6935', '#a07a40');
  for (let y = 0; y < N; y++) {
    t.set(1, y, level(WOOD, 2.5 + (rnd() - 0.5)));
    t.set(2, y, level(WOOD, 1.2 + (rnd() - 0.5)));
    t.set(13, y, level(WOOD, 2.5 + (rnd() - 0.5)));
    t.set(14, y, level(WOOD, 1.2 + (rnd() - 0.5)));
  }
  for (let r = 1; r < N; r += 4) {
    for (let x = 3; x <= 12; x++) {
      t.set(x, r, level(WOOD, 3 - (rnd() < 0.2 ? 1 : 0)));
      t.set(x, r + 1, level(WOOD, 1 + (rnd() < 0.3 ? 1 : 0)));
    }
    // Гвоздики на стыках.
    t.set(2, r, hex('#3b2912'));
    t.set(13, r, hex('#3b2912'));
  }
}

/**
 * Дубовая дверь: тёмный контур, светлая рамка с поперечными брусками и
 * вертикальные доски. Верхняя половина — окно 2×2 (прозрачные стёкла),
 * нижняя — ручка-рычаг справа.
 */
function door(top: boolean): Painter {
  const OUT = pal('#45301a', '#4d361d');
  const WINDOW = pal('#674a28', '#70522d');
  return (t, rnd) => {
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        const rail = top ? y <= 2 || y === 12 || y === 13 : y === 6 || y === 7 || y >= 13;
        let c: RGB;
        if (x === 0 || x === N - 1 || y === (top ? 0 : N - 1)) c = any(rnd, OUT);
        else if (x === 1 || x === N - 2 || rail) {
          const shadowRow = top ? y === 2 || y === 13 : y === 7 || y === 14;
          c = level(OAK.ramp, 4.2 + (rnd() - 0.5) * 1.2 - (x === N - 2 ? 1.4 : 0) - (shadowRow ? 1.6 : 0));
        } else {
          const k = (x - 2) % 3;
          c = k === 2 ? jitter(hex('#6a4e2b'), rnd, 0.08) : level(OAK.ramp, 2.3 + (k === 0 ? 0.7 : 0) + (rnd() - 0.5) * 1.1);
        }
        t.set(x, y, c);
      }
    if (top) {
      for (let y = 3; y <= 11; y++) for (let x = 3; x <= 12; x++) t.set(x, y, any(rnd, WINDOW));
      for (const y0 of [4, 8])
        for (const x0 of [4, 9])
          for (let y = y0; y < y0 + 3; y++) for (let x = x0; x < x0 + 3; x++) t.set(x, y, BLACK, 0);
    } else {
      // Ручка: тёмная накладка и светлый рычаг.
      for (let y = 2; y <= 4; y++) t.set(13, y, hex('#2d2d2d'));
      t.set(11, 3, hex('#cfcfcf'));
      t.set(12, 3, hex('#8f8f8f'));
      t.set(11, 4, hex('#5c4326'));
      t.set(12, 4, hex('#5c4326'));
    }
  };
}

// ───────────────────────────── кровать ─────────────────────────────

const BED_WOOD = pal('#7c5a30', '#94703f', '#aa854f', '#bd9862', '#cdaa73');
const BLANKET = pal('#6f1518', '#861b1f', '#9e2327', '#b42b2e', '#c63a3b', '#d65050');
const PILLOW = pal('#bdbdbd', '#d0d0d0', '#e1e1e1', '#eeeeee', '#fafafa');

function blanket(t: Tile, rnd: Rnd, y0: number, y1: number): void {
  for (let y = y0; y <= y1; y++)
    for (let x = 1; x < N - 1; x++) {
      const weave = (x + y) % 4 === 0 ? -0.7 : (x - y + N) % 4 === 2 ? 0.5 : 0;
      t.set(x, y, level(BLANKET, 2.6 + weave + (rnd() - 0.5) * 0.8));
    }
}

function bedFrameColumns(t: Tile, rnd: Rnd): void {
  for (let y = 0; y < N; y++) {
    t.set(0, y, level(BED_WOOD, 3 + (rnd() - 0.5)));
    t.set(N - 1, y, level(BED_WOOD, 1.5 + (rnd() - 0.5)));
  }
}

function bedHeadTop(t: Tile, rnd: Rnd): void {
  bedFrameColumns(t, rnd);
  for (let y = 0; y <= 5; y++)
    for (let x = 1; x < N - 1; x++) {
      const edgeY = y === 0 || y === 5;
      const edgeX = x === 1 || x === N - 2;
      let lvl = 3.3 + (rnd() - 0.5) * 0.6;
      if (y === 1) lvl += 0.8;
      if (edgeY || edgeX) lvl = 1.5;
      if (edgeY && edgeX) lvl = 0.3;
      t.set(x, y, level(PILLOW, lvl));
    }
  blanket(t, rnd, 6, N - 1);
  // Отогнутый край простыни над одеялом.
  for (let x = 1; x < N - 1; x++) {
    t.set(x, 6, level(PILLOW, 2.5 + (rnd() - 0.5)));
    t.set(x, 7, level(BLANKET, 1));
  }
}

function bedFootTop(t: Tile, rnd: Rnd): void {
  bedFrameColumns(t, rnd);
  blanket(t, rnd, 0, N - 1);
  // Подвёрнутый край одеяла у изножья.
  for (let x = 1; x < N - 1; x++) {
    t.set(x, 11, level(BLANKET, 4.6));
    t.set(x, 12, level(BLANKET, 3.6));
    t.set(x, 13, level(BLANKET, 0.4));
  }
}

/** Боковые и торцевые грани кровати: видны только строки 7–15. */
function bedSide(pillow: boolean): Painter {
  return (t, rnd) => {
    for (let x = 0; x < N; x++) {
      if (pillow) {
        t.set(x, 7, level(PILLOW, 4));
        t.set(x, 8, level(PILLOW, 3 + (rnd() - 0.5)));
        t.set(x, 9, level(PILLOW, 1.6));
      } else {
        t.set(x, 7, level(BLANKET, 4.5));
        t.set(x, 8, level(BLANKET, 2.8 + (rnd() - 0.5) * 0.8));
        t.set(x, 9, level(BLANKET, 1.5));
      }
      t.set(x, 10, level(BED_WOOD, 3.8));
      t.set(x, 11, level(BED_WOOD, 2.5 + (rnd() - 0.5)));
      t.set(x, 12, level(BED_WOOD, 1));
    }
    for (let y = 13; y < N; y++)
      for (const x of [0, 1, 2, 13, 14, 15]) {
        const lvl = x === 0 || x === 13 ? 2.6 : x === 2 || x === 15 ? 0.6 : 1.7;
        t.set(x, y, level(BED_WOOD, lvl));
      }
  };
}

// ───────────────────────────── жидкости ─────────────────────────────

function water(flow: boolean): Painter {
  const WATER = pal('#2546a9', '#2a50b9', '#2f5ac6', '#3664d0', '#3f6fd8');
  const LIGHT = hex('#6f97e8');
  const LIGHTER = hex('#93b4f0');
  return (t, rnd) => {
    const a = flow ? valueNoise(rnd, 8, 2) : valueNoise(rnd, 4);
    const f = field((x, y) => a(x, y) * 0.75 + rnd() * 0.35);
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        const v = f[y * N + x];
        t.set(x, y, pick(WATER, v, [1, 2, 3, 2, 1]), Math.round(178 + v * 14));
      }
    if (flow) {
      // Вертикальные струйки течения.
      for (let i = 0; i < 9; i++) {
        const x = Math.floor(rnd() * N);
        const y0 = Math.floor(rnd() * N);
        const len = 2 + Math.floor(rnd() * 4);
        for (let k = 0; k < len; k++) t.set(x, y0 + k, k === 0 ? LIGHTER : LIGHT, 196);
      }
    } else {
      // Короткие гребешки ряби в форме «‿».
      for (let i = 0; i < 7; i++) {
        const x = Math.floor(rnd() * N);
        const y = Math.floor(rnd() * N);
        const len = 3 + Math.floor(rnd() * 3);
        for (let k = 0; k < len; k++) t.set(x + k, y + (k === 0 || k === len - 1 ? 0 : 1), k === 1 ? LIGHTER : LIGHT, 196);
      }
    }
  };
}

function lava(flow: boolean): Painter {
  const LAVA = pal('#5c1403', '#822006', '#a72e08', '#ca420b', '#e35b10', '#f27a17', '#f99d22', '#fdc334', '#ffe370', '#fff4bf');
  return (t, rnd) => {
    const a = flow ? valueNoise(rnd, 4, 2) : valueNoise(rnd, 4);
    const b = flow ? valueNoise(rnd, 8, 3) : valueNoise(rnd, 8);
    const f = field((x, y) => a(x, y) * 0.6 + b(x, y) * 0.4 + rnd() * 0.12);
    paintField(t, LAVA, f, [1, 1.4, 2, 3, 3.5, 3.5, 3, 2, 1.2, 0.5]);
  };
}

// ───────────────────────────── трещины разрушения ─────────────────────────────

let crackCache: number[][] | null = null;

/**
 * Общая сеть трещин для всех стадий: стадия N рисует первые k пикселей сети.
 * Трещины растут из центра наружу зигзагом и ветвятся.
 */
function crackPixels(): number[][] {
  if (crackCache) return crackCache;
  const r = seeded(0xc0ffee);
  const grid = new Uint8Array(N * N);
  const out: number[][] = [];
  const DIRS = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];
  const inside = (x: number, y: number) => x >= 0 && y >= 0 && x < N && y < N;
  const crowded = (x: number, y: number) => {
    let n = 0;
    for (const [dx, dy] of DIRS) if (inside(x + dx, y + dy) && grid[(y + dy) * N + x + dx]) n++;
    return n > 2;
  };
  /** Направление не должно вести обратно к центру. */
  const outward = (x: number, y: number, d: number) => (x - 7.5) * DIRS[d][0] + (y - 7.5) * DIRS[d][1] >= -0.5;
  const add = (x: number, y: number) => {
    grid[y * N + x] = 1;
    out.push([x, y, 180 + Math.floor(r() * 50)]);
  };
  interface Tip {
    x: number;
    y: number;
    d: number;
    life: number;
  }
  const tips: Tip[] = [];
  add(7, 8);
  for (const d of [1, 3, 5, 7]) tips.push({ x: 7, y: 8, d, life: 4 + Math.floor(r() * 6) });
  for (let guard = 0; out.length < 100 && guard < 5000; guard++) {
    if (!tips.length) {
      const [sx, sy] = out[Math.floor(r() * Math.min(out.length, 40))];
      let d = Math.floor(r() * 8);
      while (!outward(sx, sy, d)) d = (d + 1) % 8;
      tips.push({ x: sx, y: sy, d, life: 3 + Math.floor(r() * 6) });
    }
    for (let i = 0; i < tips.length; i++) {
      const tip = tips[i];
      if (r() < 0.15) {
        const nd = (tip.d + (r() < 0.5 ? 1 : 7)) % 8;
        if (outward(tip.x, tip.y, nd)) tip.d = nd;
      }
      // Зигзаг: шаг иногда отклоняется на 45° от основного направления.
      const step = r() < 0.4 ? (tip.d + (r() < 0.5 ? 1 : 7)) % 8 : tip.d;
      const nx = tip.x + DIRS[step][0];
      const ny = tip.y + DIRS[step][1];
      if (!inside(nx, ny) || grid[ny * N + nx] || crowded(nx, ny) || --tip.life < 0) {
        tips.splice(i--, 1);
        continue;
      }
      tip.x = nx;
      tip.y = ny;
      add(nx, ny);
      if (r() < 0.1) {
        const bd = (tip.d + (r() < 0.5 ? 2 : 6)) % 8;
        if (outward(nx, ny, bd)) tips.push({ x: nx, y: ny, d: bd, life: 2 + Math.floor(r() * 4) });
      }
    }
  }
  crackCache = out;
  return out;
}

const CRACK_COUNTS = [3, 8, 14, 21, 29, 38, 48, 60, 74, 90];

function destroy(stage: number): Painter {
  return (t) => {
    const px = crackPixels();
    const n = Math.min(px.length, CRACK_COUNTS[stage]);
    for (let i = 0; i < n; i++) {
      const [x, y, a] = px[i];
      t.set(x, y, i % 3 === 0 ? hex('#262626') : hex('#121212'), a);
    }
  };
}

// ───────────────────────────── таблица художников ─────────────────────────────

// ───────────────────────────── тыквы, тростник, панели, люк ─────────────────────────────

const PUMPKIN = pal('#a4520a', '#b65f0e', '#c66c12', '#d47a18', '#e08a22', '#eb9a30');

/** Бок тыквы: вертикальные дольки со светлой серединой и тёмными бороздками. */
function pumpkinSide(t: Tile, rnd: Rnd): void {
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const k = x % 4;
      const base = k === 0 ? 0.6 : k === 2 ? 4.2 : 2.8;
      t.set(x, y, level(PUMPKIN, base + (rnd() - 0.5) * 1.3 - (y === 0 || y === N - 1 ? 0.8 : 0)));
    }
}

function pumpkinTop(t: Tile, rnd: Rnd): void {
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5));
      const ring = Math.floor(d) % 3 === 0 ? 1.2 : 3.2;
      t.set(x, y, level(PUMPKIN, ring + (rnd() - 0.5) * 1.2));
    }
  // Хвостик.
  const STEM = pal('#3d4a1c', '#4f5f23', '#617329');
  for (let y = 6; y <= 9; y++) for (let x = 6; x <= 9; x++) t.set(x, y, any(rnd, STEM));
  t.set(6, 6, hex('#2e3815'));
  t.set(9, 9, hex('#2e3815'));
}

/** Лицо: глаза-треугольники и зубастый рот. lit — светильник Джека (свеча внутри). */
function pumpkinFace(lit: boolean): Painter {
  return (t, rnd) => {
    pumpkinSide(t, rnd);
    const hole = (x: number, y: number) => {
      const c = lit ? (y >= 10 ? hex('#ffe46b') : hex('#ffbf2e')) : hex('#2a1404');
      t.set(x, y, lit ? mix(c, WHITE, rnd() * 0.25) : jitter(c, rnd, 0.3));
    };
    // Глаза.
    for (const ex of [3, 10]) {
      hole(ex + 1, 4);
      for (let x = ex; x <= ex + 2; x++) hole(x, 5);
      for (let x = ex; x <= ex + 2; x++) hole(x, 6);
    }
    // Рот с зубами.
    for (let x = 3; x <= 12; x++) hole(x, 10);
    for (let x = 2; x <= 13; x++) if (x !== 5 && x !== 10) hole(x, 11);
    for (let x = 3; x <= 12; x++) if (x !== 7 && x !== 8) hole(x, 12);
    for (let x = 5; x <= 10; x++) hole(x, 13);
  };
}

function sugarCane(t: Tile, rnd: Rnd): void {
  const CANE = pal('#5d8a33', '#6f9e3c', '#84b44a', '#98c45a', '#aed36f');
  const JOINT = hex('#c9d98c');
  for (const [x0, top, shift] of [
    [3, 1, 0],
    [8, 0, 2],
    [12, 3, 1],
  ] as const) {
    for (let y = top; y < N; y++) {
      const joint = (y + shift) % 5 === 0;
      t.set(x0, y, joint ? JOINT : level(CANE, 3 + (rnd() - 0.5)));
      t.set(x0 + 1, y, joint ? mix(JOINT, CANE[1], 0.5) : level(CANE, 1.4 + (rnd() - 0.5)));
    }
  }
  // Листочки у сочленений.
  for (const [x, y, dx] of [
    [2, 6, -1],
    [5, 10, 1],
    [10, 4, 1],
    [7, 12, -1],
    [14, 9, 1],
  ] as const) {
    t.set(x, y, CANE[2]);
    t.set(x + dx, y - 1, CANE[3]);
  }
}

/** Люк: рамка из досок и четыре окошка (прозрачные). */
function trapdoor(t: Tile, rnd: Rnd): void {
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const edge = x === 0 || y === 0 || x === N - 1 || y === N - 1;
      const bar = x === 7 || x === 8 || y === 7 || y === 8;
      if (edge) t.set(x, y, level(OAK.ramp, 1 + (rnd() - 0.5)));
      else if (bar || x === 1 || y === 1 || x === N - 2 || y === N - 2) t.set(x, y, level(OAK.ramp, 3.4 + (rnd() - 0.5) * 1.2));
      else if ((x === 3 || x === 12) && (y === 3 || y === 12)) t.set(x, y, hex('#5c4426'));
      else t.set(x, y, BLACK, 0);
    }
  // Заклёпки на перекрестии.
  t.set(7, 7, hex('#4a3216'));
  t.set(8, 8, hex('#4a3216'));
}

export const BLOCK_PAINTERS: Record<string, Painter> = {
  stone,
  grass_side: (t, rnd) => {
    dirt(t, rnd);
    overhang(t, rnd, GRASS, hex('#356a1d'), 3);
  },
  grass_top: grassTop,
  dirt,
  cobblestone,
  oak_planks: (t, rnd) => planks(t, rnd, OAK),
  birch_planks: (t, rnd) => planks(t, rnd, BIRCH),
  spruce_planks: (t, rnd) => planks(t, rnd, SPRUCE),
  oak_log: (t, rnd) => bark(t, rnd, OAK_BARK),
  oak_log_top: (t, rnd) => logTop(t, rnd, pal('#8a6a3c', '#a9864f', '#b8955d'), OAK_BARK),
  birch_log: birchBark,
  birch_log_top: (t, rnd) => logTop(t, rnd, pal('#b49f68', '#cdba85', '#d9c893'), BIRCH_BARK),
  spruce_log: (t, rnd) => bark(t, rnd, SPRUCE_BARK),
  spruce_log_top: (t, rnd) => logTop(t, rnd, pal('#5a3e22', '#76552f', '#846138'), SPRUCE_BARK),
  oak_leaves: (t, rnd) => leaves(t, rnd, pal('#1f4a17', '#29601d', '#337223', '#3e842a', '#4a9531', '#58a53b')),
  birch_leaves: (t, rnd) => leaves(t, rnd, pal('#395c24', '#456c2b', '#527c33', '#5f8c3b', '#6d9b44', '#7ca94f')),
  spruce_leaves: (t, rnd) => leaves(t, rnd, pal('#14301d', '#1b3d24', '#224a2b', '#2a5733', '#33643b', '#3d7044')),
  sand,
  gravel,
  sandstone_side: sandstoneSide,
  sandstone_top: sandstoneTop,
  sandstone_bottom: sandstoneBottom,
  glass: (t) => {
    const light = hex('#f2fafc');
    const mid = hex('#d4e9f0');
    const dark = hex('#a8c9d5');
    for (let i = 0; i < N; i++) {
      t.set(i, 0, light);
      t.set(0, i, light);
      t.set(i, N - 1, dark);
      t.set(N - 1, i, dark);
    }
    t.set(N - 1, 0, mid);
    t.set(0, N - 1, mid);
    for (const [x, y] of [
      [3, 6],
      [4, 5],
      [5, 4],
      [6, 3],
      [5, 6],
      [6, 5],
      [10, 12],
      [11, 11],
      [12, 10],
    ])
      t.set(x, y, x + y > 15 ? mid : WHITE);
  },
  bedrock,
  water_flow: water(true),
  water_still: water(false),
  lava_flow: lava(true),
  lava_still: lava(false),
  coal_ore: (t, rnd) => ore(t, rnd, pal('#141414', '#262626', '#404040')),
  iron_ore: (t, rnd) => ore(t, rnd, pal('#9c765e', '#cfa486', '#ebcdb7')),
  gold_ore: (t, rnd) => ore(t, rnd, pal('#b88a10', '#f2cc2e', '#fff3a0')),
  diamond_ore: (t, rnd) => ore(t, rnd, pal('#1b9a94', '#4de0e6', '#c9fffb'), 4),
  snow,
  snowy_grass_side: (t, rnd) => {
    dirt(t, rnd);
    overhang(t, rnd, SNOW.slice(1), hex('#c3d1d9'), 3);
  },
  ice,
  cactus_side: cactusSide,
  cactus_top: cactusTop,
  cactus_bottom: cactusBottom,
  tall_grass: tallGrass,
  dandelion,
  poppy,
  dead_bush: deadBush,
  bricks,
  stone_bricks: stoneBricks,
  mossy_cobblestone: mossyCobblestone,
  obsidian,
  bookshelf,
  glowstone,
  wool_white: wool('#e9ecec'),
  wool_red: wool('#a12722'),
  wool_pink: wool('#ed8dac'),
  wool_yellow: wool('#f8c527'),
  wool_green: wool('#5e7c16'),
  wool_blue: wool('#35399d'),
  wool_purple: wool('#7a2aac'),
  wool_black: wool('#1d1d21'),
  crafting_table_side: craftingSide,
  crafting_table_top: craftingTop,
  crafting_table_front: craftingFront,
  furnace_side: furnaceBody,
  furnace_top: furnaceTop,
  furnace_front: furnaceFront(false),
  furnace_front_lit: furnaceFront(true),
  chest_side: (t, rnd) => chestBase(t, rnd, true),
  chest_top: (t, rnd) => chestBase(t, rnd, false),
  chest_front: chestFront,
  torch,
  ladder,
  door_bottom: door(false),
  door_top: door(true),
  stone_slab_side: (t, rnd) => {
    smoothStone(t, rnd);
    for (let x = 0; x < N; x++) {
      t.set(x, 0, hex('#bdbdbd'));
      t.set(x, 7, hex('#7c7c7c'));
      t.set(x, 8, hex('#bdbdbd'));
      t.set(x, N - 1, hex('#7c7c7c'));
    }
  },
  stone_slab_top: (t, rnd) => {
    smoothStone(t, rnd);
    border(t, rnd, pal('#7c7c7c', '#818181'));
  },
  bed_foot_side: bedSide(false),
  bed_foot_top: bedFootTop,
  bed_foot_end: bedSide(false),
  bed_head_side: bedSide(false),
  bed_head_top: bedHeadTop,
  bed_head_end: bedSide(true),
  farmland_top: farmland,
  ...Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`wheat_${i}`, wheat(i)] as const)),
  oak_sapling: (t, rnd) => sapling(t, rnd, OAK_SAPLING, pal('#1f4a17', '#2c621f', '#367425', '#41862c', '#4d9733', '#62ad42'), SAPLING_TRUNK),
  birch_sapling: (t, rnd) =>
    sapling(t, rnd, BIRCH_SAPLING, pal('#395c24', '#4a702d', '#577f35', '#668f3e', '#749e47', '#88b257'), pal('#3a3a3a', '#e0ded6')),
  spruce_sapling: (t, rnd) =>
    sapling(t, rnd, SPRUCE_SAPLING, pal('#14301d', '#1d4126', '#244e2d', '#2d5c36', '#37693f', '#4a7f50'), pal('#2e1f10', '#4a3420')),
  tnt_side: tntSide,
  tnt_top: (t, rnd) => tntEnd(t, rnd, true),
  tnt_bottom: (t, rnd) => tntEnd(t, rnd, false),
  iron_block: ironBlock,
  gold_block: goldBlock,
  diamond_block: diamondBlock,
  glass_pane_top: (t, rnd) => {
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) t.set(x, y, jitter(hex('#cfe3ea'), rnd, 0.06));
  },
  trapdoor,
  pumpkin_side: pumpkinSide,
  pumpkin_top: pumpkinTop,
  pumpkin_face: pumpkinFace(false),
  jack_o_lantern: pumpkinFace(true),
  sugar_cane: sugarCane,
  ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`destroy_${i}`, destroy(i)] as const)),
};
