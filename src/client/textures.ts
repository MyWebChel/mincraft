import {
  FACE_TILE,
  SHAPE,
  S_BED,
  S_CACTUS,
  S_CHEST,
  S_CROP,
  S_CROSS,
  S_DOOR,
  S_FARMLAND,
  S_FENCE,
  S_GATE,
  S_LADDER,
  S_PANE,
  S_SLAB,
  S_TORCH,
  S_TRAPDOOR,
  TILE_NAMES,
  tileId,
} from '../shared/blocks';
import { isBlockItem, itemDef } from '../shared/items';
import { mulberry32 } from '../shared/rng';
import { BLOCK_PAINTERS } from './blockTextures';
import { HUD_ICON_SIZE, HUD_PAINTERS, type HudIcon } from './hudTextures';
import { ITEM_PAINTERS } from './itemTextures';
import { TILE, Tile, hex, nameSeed, tileToCanvas, type Painter } from './pixelart';

/** Заглушка для отсутствующей текстуры — фиолетово-чёрная шахматка. */
const missing: Painter = (t) => {
  for (let y = 0; y < TILE; y++) for (let x = 0; x < TILE; x++) t.set(x, y, (x >> 3) ^ (y >> 3) ? hex('#f800f8') : hex('#000000'));
};

function paint(painter: Painter | undefined, name: string, w = TILE, h = TILE): Tile {
  const tile = new Tile(w, h);
  try {
    (painter ?? missing)(tile, mulberry32(nameSeed(name)));
  } catch (err) {
    console.error(`Текстура «${name}» не нарисовалась`, err);
    missing(tile, mulberry32(1));
  }
  return tile;
}

export interface Atlas {
  /** RGBA-данные всех текстур блоков подряд — для DataArrayTexture. */
  data: Uint8Array;
  count: number;
  tiles: Tile[];
}

export function buildAtlas(): Atlas {
  const count = TILE_NAMES.length;
  const data = new Uint8Array(count * TILE * TILE * 4);
  const tiles = TILE_NAMES.map((name, layer) => {
    const tile = paint(BLOCK_PAINTERS[name], name);
    data.set(tile.px, layer * TILE * TILE * 4);
    return tile;
  });
  return { data, count, tiles };
}

const itemTiles = new Map<string, Tile>();

/** Спрайт предмета 16×16 (рисуется при первом обращении). */
export function itemTile(sprite: string): Tile {
  let t = itemTiles.get(sprite);
  if (!t) itemTiles.set(sprite, (t = paint(ITEM_PAINTERS[sprite], sprite)));
  return t;
}

const canvasCache = new WeakMap<Tile, HTMLCanvasElement>();
const canvasOf = (t: Tile) => {
  let c = canvasCache.get(t);
  if (!c) canvasCache.set(t, (c = tileToCanvas(t)));
  return c;
};

const iconCache = new Map<number, string>();

/** Иконка предмета для инвентаря: блоки — изометрический кубик, остальное — спрайт. */
export function itemIcon(atlas: Atlas, id: number): string {
  const cached = iconCache.get(id);
  if (cached) return cached;
  const S = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = S;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.imageSmoothingEnabled = false;
  const def = itemDef(id);

  if (def && isBlockItem(id)) {
    const shape = SHAPE[id];
    const tile = (face: number) => atlas.tiles[FACE_TILE[id * 384 + face]];
    if (
      shape === S_CROSS ||
      shape === S_CROP ||
      shape === S_TORCH ||
      shape === S_LADDER ||
      shape === S_DOOR ||
      shape === S_BED ||
      shape === S_PANE ||
      shape === S_TRAPDOOR
    ) {
      ctx.drawImage(canvasOf(tile(0)), 4, 4, 56, 56);
    } else if (shape === S_GATE) {
      // Калитка: два столбика и две перекладины из досок.
      const wood = canvasOf(tile(0));
      for (const [x, y, w, h] of [
        [6, 10, 8, 46],
        [50, 10, 8, 46],
        [14, 18, 36, 8],
        [14, 38, 36, 8],
        [28, 26, 8, 12],
      ])
        ctx.drawImage(wood, x / 4, y / 4, w / 4, h / 4, x, y, w, h);
    } else {
      const h = shape === S_SLAB ? 0.5 : shape === S_FARMLAND ? 15 / 16 : shape === S_CHEST ? 14 / 16 : 1;
      const inset = shape === S_CACTUS || shape === S_CHEST || shape === S_FENCE ? 4 : 0;
      drawIsoBox(ctx, canvasOf(tile(2)), canvasOf(tile(4)), canvasOf(tile(0)), h, inset);
    }
  } else if (def?.sprite) {
    ctx.drawImage(canvasOf(itemTile(def.sprite)), 4, 4, 56, 56);
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const url = canvas.toDataURL();
  iconCache.set(id, url);
  return url;
}

/**
 * Заранее рисует иконки предметов в свободное время браузера, чтобы инвентарь
 * (особенно творческий, где их ~150) открывался без подвисания.
 */
export function warmItemIcons(atlas: Atlas, ids: readonly number[]): void {
  let i = 0;
  type Deadline = { timeRemaining(): number };
  const idle = (cb: (d: Deadline) => void) =>
    typeof requestIdleCallback === 'function' ? requestIdleCallback(cb, { timeout: 1000 }) : setTimeout(() => cb({ timeRemaining: () => 6 }), 30);
  const step = (d: Deadline) => {
    const start = performance.now();
    while (i < ids.length && (d.timeRemaining() > 2 || performance.now() - start < 3)) itemIcon(atlas, ids[i++]);
    if (i < ids.length) idle(step);
  };
  idle(step);
}

/** Изометрический параллелепипед высотой h (доля блока) из трёх граней. */
function drawIsoBox(
  ctx: CanvasRenderingContext2D,
  top: HTMLCanvasElement,
  left: HTMLCanvasElement,
  right: HTMLCanvasElement,
  h: number,
  inset: number,
): void {
  const drop = (1 - h) * 32;
  const s = (64 - inset * 2) / 64;
  const ox = inset;
  const face = (img: HTMLCanvasElement, m: [number, number, number, number, number, number], dark: number, crop: boolean) => {
    ctx.setTransform(m[0] * s, m[1] * s, m[2] * s, m[3] * s, ox + m[4] * s, inset + m[5] * s);
    ctx.globalCompositeOperation = 'source-over';
    if (crop) ctx.drawImage(img, 0, TILE * (1 - h), TILE, TILE * h, 0, 0, TILE, TILE * h);
    else ctx.drawImage(img, 0, 0);
    if (dark > 0) {
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = `rgba(0,0,0,${dark})`;
      ctx.fillRect(0, 0, TILE, crop ? TILE * h : TILE);
    }
  };
  face(top, [2, -1, 2, 1, 0, 16 + drop], 0, false);
  face(left, [2, 1, 0, 2, 0, 16 + drop], 0.22, true);
  face(right, [2, -1, 0, 2, 32, 32 + drop], 0.42, true);
  ctx.globalCompositeOperation = 'source-over';
}

const hudCache = new Map<string, string>();

/** Иконка интерфейса (сердечко, еда, броня, пузырёк воздуха). */
export function hudIcon(name: HudIcon): string {
  let url = hudCache.get(name);
  if (!url) {
    const tile = paint(HUD_PAINTERS[name], name, HUD_ICON_SIZE, HUD_ICON_SIZE);
    url = tileToCanvas(tile).toDataURL();
    hudCache.set(name, url);
  }
  return url;
}

/** Текстура блока как картинка (фон меню из земли). */
export function tileURL(atlas: Atlas, name: string, darken = 0): string {
  const canvas = tileToCanvas(atlas.tiles[tileId(name)]);
  if (darken) {
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = `rgba(0,0,0,${darken})`;
    ctx.fillRect(0, 0, TILE, TILE);
  }
  return canvas.toDataURL();
}
