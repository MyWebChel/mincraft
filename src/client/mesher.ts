import {
  Block,
  FACE_TILE,
  FULL_CUBE,
  GLOW_TILE,
  LAYER,
  L_TRANSLUCENT,
  S_CROP,
  S_CROSS,
  S_CUBE,
  S_FLUID,
  S_NONE,
  S_TORCH,
  SHAPE,
  TOP_ROTATION,
  TYPE_MASK,
  WAVE,
  CULL_SAME,
  fluidHeight,
} from '../shared/blocks';
import { CHUNK_SIZE as S, WORLD_HEIGHT as H, blockIndex } from '../shared/constants';
import type { ChunkData } from '../shared/light';
import { hash3 } from '../shared/rng';
import { modelBoxes, type Box } from '../shared/shapes';

/**
 * Построение геометрии чанка. Чанк копируется вместе с границами соседей в
 * «расширенный» массив 18×(H+2)×18, чтобы не проверять выход за пределы.
 *
 * Формат вершины (12 байт):
 *  aPos  (Uint16×4): x, y, z в 1/16 блока; w = слой текстуры | грань << 8 | AO << 11 | свечение << 13
 *  aData (Uint8×4):  u | колыхание << 5 | анимация << 7;  v | «не вода» << 5;  свет неба; свет блоков (0..255)
 */
const P = S + 2;
const LAYER_SIZE = P * P;
export const PADDED_SIZE = LAYER_SIZE * (H + 2);

const pidx = (x: number, y: number, z: number) => ((y + 1) * P + (z + 1)) * P + (x + 1);

export interface MeshOptions {
  /** Рисовать грани между соседними блоками листвы (красивее, но тяжелее). */
  fancyLeaves: boolean;
}

/** Копирует чанк и полосы соседей (сетка 3×3, центр — индекс 4) в расширенные массивы. */
export function buildPadded(neighbors: (ChunkData | undefined)[], blocks: Uint16Array, light: Uint8Array): void {
  blocks.fill(0);
  light.fill(0);
  // Под миром — непрозрачный слой, над миром — открытое небо.
  blocks.fill(Block.BEDROCK, 0, LAYER_SIZE);
  light.fill(0xf0, LAYER_SIZE * (H + 1));
  for (let dz = -1; dz <= 1; dz++) {
    for (let dx = -1; dx <= 1; dx++) {
      const src = neighbors[(dz + 1) * 3 + (dx + 1)];
      if (!src) continue;
      const x0 = dx === -1 ? S - 1 : 0;
      const x1 = dx === 1 ? 0 : S - 1;
      const z0 = dz === -1 ? S - 1 : 0;
      const z1 = dz === 1 ? 0 : S - 1;
      for (let y = 0; y < H; y++)
        for (let z = z0; z <= z1; z++) {
          let di = pidx(x0 + dx * S, y, z + dz * S);
          let si = blockIndex(x0, y, z);
          for (let x = x0; x <= x1; x++, di++, si++) {
            blocks[di] = src.blocks[si];
            light[di] = src.light[si];
          }
        }
    }
  }
}

export interface MeshData {
  pos: Uint16Array;
  data: Uint8Array;
  index: Uint16Array | Uint32Array;
  minY: number;
  maxY: number;
}

class MeshBuilder {
  pos = new Uint16Array(4096 * 4);
  data = new Uint8Array(4096 * 4);
  index = new Uint32Array(4096 * 6);
  verts = 0;
  indices = 0;
  minY = H;
  maxY = 0;

  reset(): void {
    this.verts = 0;
    this.indices = 0;
    this.minY = H;
    this.maxY = 0;
  }

  private grow(): void {
    const pos = new Uint16Array(this.pos.length * 2);
    pos.set(this.pos);
    this.pos = pos;
    const data = new Uint8Array(this.data.length * 2);
    data.set(this.data);
    this.data = data;
    const index = new Uint32Array(this.index.length * 2);
    index.set(this.index);
    this.index = index;
  }

  vertex(x: number, y: number, z: number, w: number, u: number, v: number, sky: number, block: number): void {
    if ((this.verts + 1) * 4 > this.pos.length) this.grow();
    const o = this.verts * 4;
    this.pos[o] = x;
    this.pos[o + 1] = y;
    this.pos[o + 2] = z;
    this.pos[o + 3] = w;
    this.data[o] = u;
    this.data[o + 1] = v;
    this.data[o + 2] = sky;
    this.data[o + 3] = block;
    this.verts++;
  }

  /** Квад из 4 последних вершин; flip меняет диагональ, both — двусторонний. */
  quad(flip: boolean, both: boolean): void {
    if (this.indices + 12 > this.index.length) this.grow();
    const v = this.verts - 4;
    const ix = this.index;
    let o = this.indices;
    if (flip) {
      ix[o++] = v + 1;
      ix[o++] = v + 2;
      ix[o++] = v + 3;
      ix[o++] = v + 1;
      ix[o++] = v + 3;
      ix[o++] = v;
    } else {
      ix[o++] = v;
      ix[o++] = v + 1;
      ix[o++] = v + 2;
      ix[o++] = v;
      ix[o++] = v + 2;
      ix[o++] = v + 3;
    }
    if (both) {
      ix[o++] = v;
      ix[o++] = v + 2;
      ix[o++] = v + 1;
      ix[o++] = v;
      ix[o++] = v + 3;
      ix[o++] = v + 2;
    }
    this.indices = o;
  }

  span(y0: number, y1: number): void {
    if (y0 < this.minY) this.minY = y0;
    if (y1 > this.maxY) this.maxY = y1;
  }

  build(): MeshData | null {
    if (!this.verts) return null;
    const index = this.verts > 65535 ? this.index.slice(0, this.indices) : Uint16Array.from(this.index.subarray(0, this.indices));
    return {
      pos: this.pos.slice(0, this.verts * 4),
      data: this.data.slice(0, this.verts * 4),
      index,
      minY: Math.max(0, Math.floor(this.minY)),
      maxY: Math.min(H, Math.ceil(this.maxY)),
    };
  }
}

// Грани: +X, -X, +Y, -Y, +Z, -Z. Углы против часовой стрелки (если смотреть снаружи):
// [cx, cy, cz, u, v] — u, v в долях текстуры, v=0 — верх.
const NORMALS = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];
const CORNERS: number[][][] = [
  [[1, 0, 1, 0, 1], [1, 0, 0, 1, 1], [1, 1, 0, 1, 0], [1, 1, 1, 0, 0]],
  [[0, 0, 0, 0, 1], [0, 0, 1, 1, 1], [0, 1, 1, 1, 0], [0, 1, 0, 0, 0]],
  [[0, 1, 1, 0, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 0], [0, 1, 0, 0, 0]],
  [[0, 0, 0, 0, 1], [1, 0, 0, 1, 1], [1, 0, 1, 1, 0], [0, 0, 1, 0, 0]],
  [[0, 0, 1, 0, 1], [1, 0, 1, 1, 1], [1, 1, 1, 1, 0], [0, 1, 1, 0, 0]],
  [[1, 0, 0, 0, 1], [0, 0, 0, 1, 1], [0, 1, 0, 1, 0], [1, 1, 0, 0, 0]],
];
const poff = (x: number, y: number, z: number) => y * LAYER_SIZE + z * P + x;
const NEIGHBOR = NORMALS.map(([x, y, z]) => poff(x, y, z));

// Для каждого угла грани — смещения трёх клеток, которые дают затенение и сглаживание света.
const AO_OFFSETS: number[][][] = NORMALS.map((n, f) => {
  const axis = n.findIndex((v) => v !== 0);
  const tangents = [0, 1, 2].filter((a) => a !== axis);
  return CORNERS[f].map((corner) => {
    const s1 = [...n];
    const s2 = [...n];
    s1[tangents[0]] += corner[tangents[0]] ? 1 : -1;
    s2[tangents[1]] += corner[tangents[1]] ? 1 : -1;
    const c = [...n];
    c[tangents[0]] = s1[tangents[0]];
    c[tangents[1]] = s2[tangents[1]];
    return [poff(s1[0], s1[1], s1[2]), poff(s2[0], s2[1], s2[2]), poff(c[0], c[1], c[2])];
  });
});

/** Поворот UV на 90°·rot (для верхней грани кровати). */
function rotateUV(u: number, v: number, rot: number): [number, number] {
  switch (rot & 3) {
    case 1:
      return [1 - v, u];
    case 2:
      return [1 - u, 1 - v];
    case 3:
      return [v, 1 - u];
    default:
      return [u, v];
  }
}

const packW = (layer: number, face: number, ao: number, glow: number) => layer | (face << 8) | (ao << 11) | (glow << 13);
const packU = (u16: number, wave: number, anim: number) => u16 | (wave << 5) | (anim << 7);
const lightByte = (level: number) => Math.round(level * 17);

const builders = { solid: new MeshBuilder(), translucent: new MeshBuilder() };

export function meshChunk(
  blocks: Uint16Array,
  light: Uint8Array,
  options: MeshOptions,
): { solid: MeshData | null; translucent: MeshData | null } {
  const solid = builders.solid;
  const translucent = builders.translucent;
  solid.reset();
  translucent.reset();
  const ao = [0, 0, 0, 0];
  const sky = [0, 0, 0, 0];
  const blk = [0, 0, 0, 0];

  for (let y = 0; y < H; y++) {
    for (let z = 0; z < S; z++) {
      let i = pidx(0, y, z);
      for (let x = 0; x < S; x++, i++) {
        const state = blocks[i];
        const type = state & TYPE_MASK;
        const shape = SHAPE[type];
        if (shape === S_NONE) continue;
        const meta = state >>> 10;
        const out = LAYER[type] === L_TRANSLUCENT ? translucent : solid;

        if (shape === S_CUBE) {
          const leaves = WAVE[type] === 1;
          const notWater = type === Block.ICE ? 1 : 0;
          for (let f = 0; f < 6; f++) {
            const n = blocks[i + NEIGHBOR[f]];
            const nt = n & TYPE_MASK;
            if (FULL_CUBE[nt]) continue;
            if (nt === type && (CULL_SAME[type] || (leaves && !options.fancyLeaves))) continue;

            const fn = i + NEIGHBOR[f];
            const offs = AO_OFFSETS[f];
            for (let k = 0; k < 4; k++) {
              const a = i + offs[k][0];
              const b = i + offs[k][1];
              const c = i + offs[k][2];
              const s1 = FULL_CUBE[blocks[a] & TYPE_MASK];
              const s2 = FULL_CUBE[blocks[b] & TYPE_MASK];
              const co = s1 && s2 ? 1 : FULL_CUBE[blocks[c] & TYPE_MASK];
              ao[k] = s1 && s2 ? 0 : 3 - s1 - s2 - co;
              // Плавное освещение: среднее по прозрачным клеткам вокруг угла.
              let ls = light[fn] >> 4;
              let lb = light[fn] & 15;
              let cnt = 1;
              if (!s1) {
                ls += light[a] >> 4;
                lb += light[a] & 15;
                cnt++;
              }
              if (!s2) {
                ls += light[b] >> 4;
                lb += light[b] & 15;
                cnt++;
              }
              if (!co) {
                ls += light[c] >> 4;
                lb += light[c] & 15;
                cnt++;
              }
              sky[k] = lightByte(ls / cnt);
              blk[k] = lightByte(lb / cnt);
            }
            const tile = FACE_TILE[type * 384 + meta * 6 + f];
            const glow = GLOW_TILE[tile];
            const corners = CORNERS[f];
            for (let k = 0; k < 4; k++) {
              const cr = corners[k];
              out.vertex(
                (x + cr[0]) * 16,
                (y + cr[1]) * 16,
                (z + cr[2]) * 16,
                packW(tile, f, ao[k], glow),
                packU(cr[3] * 16, leaves ? 1 : 0, 0),
                cr[4] * 16 + (notWater << 5),
                sky[k],
                blk[k],
              );
            }
            out.quad(ao[0] + ao[2] < ao[1] + ao[3], false);
            out.span(y, y + 1);
          }
          continue;
        }

        const own = light[i];
        const ownSky = lightByte(own >> 4);
        const ownBlock = lightByte(own & 15);

        if (shape === S_CROSS) {
          const tile = FACE_TILE[type * 384 + meta * 6];
          const wave = WAVE[type] === 2 ? 2 : 0;
          // Случайный сдвиг растений внутри блока, как в оригинальной игре.
          // Вершины хранятся в Uint16: у края чанка (x или z = 0) сдвиг внутрь, а не наружу.
          const ox = Math.max(Math.floor(hash3(x, y, z, 77) * 7) - 3, -x * 16);
          const oz = Math.max(Math.floor(hash3(z, y, x, 78) * 7) - 3, -z * 16);
          crossQuad(out, x, y, z, ox, oz, [0, 0, 16, 16], tile, wave, ownSky, ownBlock);
          crossQuad(out, x, y, z, ox, oz, [0, 16, 16, 0], tile, wave, ownSky, ownBlock);
          out.span(y, y + 1);
          continue;
        }

        if (shape === S_CROP) {
          const tile = FACE_TILE[type * 384 + meta * 6];
          for (const p of [4, 12]) {
            planeQuad(out, x, y, z, 'x', p, tile, ownSky, ownBlock);
            planeQuad(out, x, y, z, 'z', p, tile, ownSky, ownBlock);
          }
          out.span(y, y + 1);
          continue;
        }

        if (shape === S_FLUID) {
          meshFluid(out, blocks, light, i, x, y, z, state);
          continue;
        }

        if (shape === S_TORCH) {
          meshTorch(out, x, y, z, meta, FACE_TILE[type * 384], ownSky, ownBlock);
          out.span(y, y + 1);
          continue;
        }

        // Остальные формы — набор коробок (плиты, ступеньки, двери, заборы...).
        const boxes = modelBoxes(state, (dx, dy, dz) => blocks[i + poff(dx, dy, dz)]);
        for (const box of boxes) meshBox(out, blocks, light, i, x, y, z, type, meta, box);
      }
    }
  }
  return { solid: solid.build(), translucent: translucent.build() };
}

function crossQuad(
  out: MeshBuilder,
  x: number,
  y: number,
  z: number,
  ox: number,
  oz: number,
  diag: number[],
  tile: number,
  wave: number,
  sky: number,
  block: number,
): void {
  const [ax, az, bx, bz] = diag;
  const bx0 = x * 16 + ox;
  const bz0 = z * 16 + oz;
  const by = y * 16;
  const w = packW(tile, 6, 3, GLOW_TILE[tile]);
  out.vertex(bx0 + ax, by, bz0 + az, w, packU(0, 0, 0), 16, sky, block);
  out.vertex(bx0 + bx, by, bz0 + bz, w, packU(16, 0, 0), 16, sky, block);
  out.vertex(bx0 + bx, by + 16, bz0 + bz, w, packU(16, wave, 0), 0, sky, block);
  out.vertex(bx0 + ax, by + 16, bz0 + az, w, packU(0, wave, 0), 0, sky, block);
  out.quad(false, true);
}

/** Плоскость для посевов: вертикальная плоскость на расстоянии p/16 вдоль оси. */
function planeQuad(out: MeshBuilder, x: number, y: number, z: number, axis: 'x' | 'z', p: number, tile: number, sky: number, block: number): void {
  const w = packW(tile, 6, 3, 0);
  const by = Math.max(0, y * 16 - 1);
  if (axis === 'x') {
    const px = x * 16 + p;
    out.vertex(px, by, z * 16, w, packU(0, 0, 0), 16, sky, block);
    out.vertex(px, by, z * 16 + 16, w, packU(16, 0, 0), 16, sky, block);
    out.vertex(px, by + 16, z * 16 + 16, w, packU(16, 2, 0), 0, sky, block);
    out.vertex(px, by + 16, z * 16, w, packU(0, 2, 0), 0, sky, block);
  } else {
    const pz = z * 16 + p;
    out.vertex(x * 16, by, pz, w, packU(0, 0, 0), 16, sky, block);
    out.vertex(x * 16 + 16, by, pz, w, packU(16, 0, 0), 16, sky, block);
    out.vertex(x * 16 + 16, by + 16, pz, w, packU(16, 2, 0), 0, sky, block);
    out.vertex(x * 16, by + 16, pz, w, packU(0, 2, 0), 0, sky, block);
  }
  out.quad(false, true);
}

/** Факел: тонкая палочка; на стене — наклонена от стены. */
function meshTorch(out: MeshBuilder, x: number, y: number, z: number, meta: number, tile: number, sky: number, block: number): void {
  const wall = meta >= 1 && meta <= 4;
  const dir = wall ? meta - 1 : 0;
  const wx = dir === 1 ? 1 : dir === 3 ? -1 : 0;
  const wz = dir === 0 ? -1 : dir === 2 ? 1 : 0;
  const box: Box = [7 / 16, 0, 7 / 16, 9 / 16, 10 / 16, 9 / 16];
  const transform = (px: number, py: number, pz: number): [number, number, number] => {
    if (!wall) return [px, py, pz];
    const lean = py * 0.4;
    return [px + wx * 0.3125 - wx * lean, py + 0.2, pz + wz * 0.3125 - wz * lean];
  };
  for (let f = 0; f < 6; f++) {
    const [u0, v0, u1, v1] = torchUV(f);
    const corners = CORNERS[f];
    for (let k = 0; k < 4; k++) {
      const cr = corners[k];
      const bx = cr[0] ? box[3] : box[0];
      const by = cr[1] ? box[4] : box[1];
      const bz = cr[2] ? box[5] : box[2];
      const [tx, ty, tz] = transform(bx, by, bz);
      out.vertex(
        Math.round((x + tx) * 16),
        Math.round((y + ty) * 16),
        Math.round((z + tz) * 16),
        packW(tile, f, 3, 1),
        packU(cr[3] ? u1 : u0, 0, 0),
        cr[4] ? v1 : v0,
        sky,
        block,
      );
    }
    out.quad(false, false);
  }
}

function torchUV(face: number): [number, number, number, number] {
  if (face === 2) return [7, 6, 9, 8];
  if (face === 3) return [7, 14, 9, 16];
  return [7, 6, 9, 16];
}

/** Коробка модельного блока с автоматическими UV (как в Minecraft). */
function meshBox(
  out: MeshBuilder,
  blocks: Uint16Array,
  light: Uint8Array,
  i: number,
  x: number,
  y: number,
  z: number,
  type: number,
  meta: number,
  box: Box,
): void {
  const [x0, y0, z0, x1, y1, z1] = box;
  for (let f = 0; f < 6; f++) {
    const onBorder =
      (f === 0 && x1 >= 1) || (f === 1 && x0 <= 0) || (f === 2 && y1 >= 1) || (f === 3 && y0 <= 0) || (f === 4 && z1 >= 1) || (f === 5 && z0 <= 0);
    const nIndex = i + NEIGHBOR[f];
    if (onBorder && FULL_CUBE[blocks[nIndex] & TYPE_MASK]) continue;
    const l = onBorder ? light[nIndex] : light[i];
    const sky = lightByte(l >> 4);
    const block = lightByte(l & 15);
    const tile = FACE_TILE[type * 384 + meta * 6 + f];
    const glow = GLOW_TILE[tile];
    const rot = f === 2 ? TOP_ROTATION[type * 64 + meta] : 0;
    const corners = CORNERS[f];
    for (let k = 0; k < 4; k++) {
      const cr = corners[k];
      const px = cr[0] ? x1 : x0;
      const py = cr[1] ? y1 : y0;
      const pz = cr[2] ? z1 : z0;
      let [u, v] = faceUV(f, px, py, pz);
      if (rot) [u, v] = rotateUV(u, v, rot);
      out.vertex(
        Math.round((x + px) * 16),
        Math.round((y + py) * 16),
        Math.round((z + pz) * 16),
        packW(tile, f, 3, glow),
        packU(Math.round(u * 16), 0, 0),
        Math.round(v * 16),
        sky,
        block,
      );
    }
    out.quad(false, false);
  }
  out.span(y + y0, y + Math.min(y1, 1.5));
}

/** UV по положению точки на грани (как «автоматические» UV моделей Minecraft). */
function faceUV(f: number, px: number, py: number, pz: number): [number, number] {
  const cy = Math.min(1, Math.max(0, py));
  switch (f) {
    case 0:
      return [1 - pz, 1 - cy];
    case 1:
      return [pz, 1 - cy];
    case 2:
      return [px, pz];
    case 3:
      return [px, 1 - pz];
    case 4:
      return [px, 1 - cy];
    default:
      return [1 - px, 1 - cy];
  }
}

/** Жидкость: поверхность на высоте уровня, боковые грани — от уровня соседа. */
function meshFluid(out: MeshBuilder, blocks: Uint16Array, light: Uint8Array, i: number, x: number, y: number, z: number, state: number): void {
  const type = state & TYPE_MASK;
  const above = blocks[i + LAYER_SIZE];
  const covered = (above & TYPE_MASK) === type;
  const h = covered ? 1 : fluidHeight(state);
  const isWater = type === Block.WATER;
  const own = light[i];
  const l = Math.max(own >> 4, light[i + LAYER_SIZE] >> 4);
  const sky = lightByte(l);
  const block = lightByte(Math.max(own & 15, light[i + LAYER_SIZE] & 15));
  const meta = state >>> 10;

  for (let f = 0; f < 6; f++) {
    const n = blocks[i + NEIGHBOR[f]];
    const nt = n & TYPE_MASK;
    if (FULL_CUBE[nt] && f !== 2) continue;
    let bottom = 0;
    let top = h;
    if (f === 2) {
      if (covered || (FULL_CUBE[nt] && h >= 1)) continue;
    } else if (f === 3) {
      if (nt === type) continue;
    } else if (nt === type) {
      // Сосед той же жидкости: рисуем только ступеньку над его уровнем.
      const nAbove = blocks[i + NEIGHBOR[f] + LAYER_SIZE] & TYPE_MASK;
      bottom = nAbove === type ? 1 : fluidHeight(n);
      if (bottom >= top) continue;
    }
    const tile = FACE_TILE[type * 384 + meta * 6 + f];
    const glow = GLOW_TILE[tile];
    const wave = f === 2 && isWater ? 3 : 0;
    const corners = CORNERS[f];
    for (let k = 0; k < 4; k++) {
      const cr = corners[k];
      const py = f === 2 ? h : f === 3 ? 0 : cr[1] ? top : bottom;
      const v = f === 2 || f === 3 ? cr[4] : 1 - py;
      out.vertex(
        (x + cr[0]) * 16,
        Math.round((y + py) * 16),
        (z + cr[2]) * 16,
        packW(tile, f, 3, glow),
        packU(cr[3] * 16, wave, 1),
        Math.round(v * 16) + (isWater ? 0 : 1 << 5),
        sky,
        block,
      );
    }
    out.quad(false, false);
  }
  out.span(y, y + 1);
}

/** Геометрия одиночного блока (для предметов в руке, выпавших блоков, падающего песка). */
export function meshSingleBlock(state: number): { solid: MeshData | null; translucent: MeshData | null } {
  // Блок ставим на высоту 1, чтобы под ним был воздух и нижняя грань не отсекалась.
  const blocks = new Uint16Array(PADDED_SIZE);
  const light = new Uint8Array(PADDED_SIZE).fill(0xf0);
  blocks[pidx(0, 1, 0)] = state;
  return meshChunk(blocks, light, { fancyLeaves: true });
}
