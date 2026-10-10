/**
 * Утилиты для процедурной пиксельной графики: все текстуры игры рисуются кодом
 * (16×16 для блоков и предметов), поэтому в проекте нет чужих ассетов.
 */
export const TILE = 16;

export type RGB = [number, number, number];
export type Rnd = () => number;

export class Tile {
  readonly px: Uint8ClampedArray;

  constructor(
    readonly width = TILE,
    readonly height = TILE,
  ) {
    this.px = new Uint8ClampedArray(width * height * 4);
  }

  /** Координаты за краем заворачиваются — удобно для бесшовных текстур. */
  private index(x: number, y: number): number {
    const w = this.width;
    const h = this.height;
    return ((((Math.floor(y) % h) + h) % h) * w + (((Math.floor(x) % w) + w) % w)) * 4;
  }

  set(x: number, y: number, c: RGB, a = 255): void {
    const i = this.index(x, y);
    this.px[i] = c[0];
    this.px[i + 1] = c[1];
    this.px[i + 2] = c[2];
    this.px[i + 3] = a;
  }

  get(x: number, y: number): RGB {
    const i = this.index(x, y);
    return [this.px[i], this.px[i + 1], this.px[i + 2]];
  }

  getAlpha(x: number, y: number): number {
    return this.px[this.index(x, y) + 3];
  }

  alpha(x: number, y: number, a: number): void {
    this.px[this.index(x, y) + 3] = a;
  }

  /** Полностью прозрачная плитка — основа для растений, предметов и иконок. */
  clear(): void {
    this.px.fill(0);
  }

  /** Рисует прямоугольник цветом (включительно по краям). */
  rect(x0: number, y0: number, x1: number, y1: number, c: RGB, a = 255): void {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) this.set(x, y, c, a);
  }

  /** Копия содержимого другой плитки того же размера. */
  copyFrom(other: Tile): void {
    this.px.set(other.px);
  }
}

export const hex = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

export const shade = (c: RGB, k: number): RGB => [c[0] * k, c[1] * k, c[2] * k];

export const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/** Заливка базовым цветом со случайным разбросом яркости по пикселям. */
export function noise(t: Tile, rnd: Rnd, base: string | RGB, amount: number, alpha = 255): void {
  const c = typeof base === 'string' ? hex(base) : base;
  for (let y = 0; y < t.height; y++)
    for (let x = 0; x < t.width; x++) t.set(x, y, shade(c, 1 + (rnd() - 0.5) * amount), alpha);
}

/** Случайные вкрапления цветов из палитры. */
export function speckle(t: Tile, rnd: Rnd, colors: string[], chance: number): void {
  for (let y = 0; y < t.height; y++)
    for (let x = 0; x < t.width; x++)
      if (rnd() < chance) t.set(x, y, shade(hex(colors[Math.floor(rnd() * colors.length)]), 0.95 + rnd() * 0.1));
}

/** Стабильный сид из имени текстуры: одна и та же текстура у всех игроков. */
export function nameSeed(name: string): number {
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) h = Math.imul(h ^ name.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function tileToCanvas(tile: Tile): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = tile.width;
  canvas.height = tile.height;
  // Холст в памяти, а не на видеокарте: из него рисуются иконки, и чтение пикселей не тормозит рендер.
  canvas.getContext('2d', { willReadFrequently: true })!.putImageData(new ImageData(new Uint8ClampedArray(tile.px), tile.width, tile.height), 0, 0);
  return canvas;
}

export type Painter = (t: Tile, rnd: Rnd) => void;
