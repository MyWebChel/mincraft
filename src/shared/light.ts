import { EMISSION, OPACITY, TYPE_MASK } from './blocks';
import { CHUNK_SIZE as S, WORLD_HEIGHT as H, chunkKey } from './constants';

/**
 * Освещение как в Minecraft: у каждого блока два уровня света 0..15 —
 * от неба (старшие 4 бита) и от светящихся блоков (младшие 4 бита).
 * Свет растекается заливкой и теряет 1 уровень на каждый блок.
 */
export interface ChunkData {
  blocks: Uint16Array;
  light: Uint8Array;
}

export interface ChunkSource {
  getChunk(cx: number, cz: number): ChunkData | undefined;
}

const DX = [1, -1, 0, 0, 0, 0];
const DY = [0, 0, 1, -1, 0, 0];
const DZ = [0, 0, 0, 0, 1, -1];
const DOWN = 3;

const idx = (x: number, y: number, z: number) => (y * S + z) * S + x;
const opacityAt = (c: ChunkData, i: number) => OPACITY[c.blocks[i] & TYPE_MASK];
const getLevel = (c: ChunkData, i: number, sky: boolean) => (sky ? c.light[i] >> 4 : c.light[i] & 15);
const setLevel = (c: ChunkData, i: number, sky: boolean, v: number) => {
  c.light[i] = sky ? (c.light[i] & 15) | (v << 4) : (c.light[i] & 0xf0) | v;
};

// ---------- Свет внутри одного чанка (без соседей) ----------

function localFlood(c: ChunkData, queue: number[], sky: boolean): void {
  for (let head = 0; head < queue.length; head++) {
    const i = queue[head];
    const level = getLevel(c, i, sky);
    if (level <= 1) continue;
    const x = i & 15;
    const z = (i >> 4) & 15;
    const y = i >> 8;
    for (let d = 0; d < 6; d++) {
      const nx = x + DX[d];
      const ny = y + DY[d];
      const nz = z + DZ[d];
      if (nx < 0 || nx >= S || nz < 0 || nz >= S || ny < 0 || ny >= H) continue;
      const n = idx(nx, ny, nz);
      const op = opacityAt(c, n);
      if (op >= 15) continue;
      const nl = sky && d === DOWN && level === 15 && op === 0 ? 15 : level - Math.max(1, op);
      if (nl > getLevel(c, n, sky)) {
        setLevel(c, n, sky, nl);
        queue.push(n);
      }
    }
  }
}

/** Освещение свежесгенерированного чанка — без учёта соседей (их свет «сшивается» потом). */
export function initChunkLight(c: ChunkData): void {
  const { blocks, light } = c;
  light.fill(0);

  // Полный свет неба (15) проходит вертикально вниз сквозь прозрачные блоки.
  // На первом полупрозрачном блоке (листва, вода) столб обрывается — дальше свет
  // растекается обычной заливкой, теряя уровни.
  for (let z = 0; z < S; z++)
    for (let x = 0; x < S; x++) {
      for (let y = H - 1; y >= 0; y--) {
        const i = idx(x, y, z);
        const op = OPACITY[blocks[i] & TYPE_MASK];
        if (op >= 15) break;
        if (op > 0) {
          light[i] = (15 - op) << 4;
          break;
        }
        light[i] = 15 << 4;
      }
    }

  // Затем растекается во все стороны — под навесы, в пещеры, под воду.
  const skyQueue: number[] = [];
  for (let i = 0; i < light.length; i++) {
    const l = light[i] >> 4;
    if (l < 2) continue;
    const x = i & 15;
    const y = i >> 8;
    const z = (i >> 4) & 15;
    for (let d = 0; d < 6; d++) {
      const nx = x + DX[d];
      const ny = y + DY[d];
      const nz = z + DZ[d];
      if (nx < 0 || nx >= S || nz < 0 || nz >= S || ny < 0 || ny >= H) continue;
      const n = idx(nx, ny, nz);
      const op = opacityAt(c, n);
      if (op >= 15) continue;
      const expected = d === DOWN && l === 15 && op === 0 ? 15 : l - Math.max(1, op);
      if (light[n] >> 4 < expected) {
        skyQueue.push(i);
        break;
      }
    }
  }
  localFlood(c, skyQueue, true);

  const blockQueue: number[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const e = EMISSION[blocks[i] & TYPE_MASK];
    if (e) {
      light[i] = (light[i] & 0xf0) | e;
      blockQueue.push(i);
    }
  }
  localFlood(c, blockQueue, false);
}

// ---------- Свет в мире (через границы чанков) ----------

class Access {
  private lastCx = NaN;
  private lastCz = NaN;
  private last: ChunkData | undefined;
  private lastMarked: ChunkData | undefined;

  constructor(
    private readonly src: ChunkSource,
    private readonly changed?: Set<string>,
  ) {}

  chunk(x: number, z: number): ChunkData | undefined {
    const cx = x >> 4;
    const cz = z >> 4;
    if (cx !== this.lastCx || cz !== this.lastCz) {
      this.lastCx = cx;
      this.lastCz = cz;
      this.last = this.src.getChunk(cx, cz);
    }
    return this.last;
  }

  /** Отмечает чанки, которым нужно перестроить меш (включая соседей у границы). */
  mark(c: ChunkData, x: number, z: number): void {
    if (!this.changed) return;
    const lx = x & 15;
    const lz = z & 15;
    const border = lx === 0 || lx === 15 || lz === 0 || lz === 15;
    if (c === this.lastMarked && !border) return;
    this.lastMarked = c;
    const cx = x >> 4;
    const cz = z >> 4;
    this.changed.add(chunkKey(cx, cz));
    if (!border) return;
    const ox = lx === 0 ? -1 : lx === 15 ? 1 : 0;
    const oz = lz === 0 ? -1 : lz === 15 ? 1 : 0;
    if (ox) this.changed.add(chunkKey(cx + ox, cz));
    if (oz) this.changed.add(chunkKey(cx, cz + oz));
    if (ox && oz) this.changed.add(chunkKey(cx + ox, cz + oz));
  }
}

/** Заливка светом из очереди (x, y, z тройками). */
function propagate(acc: Access, queue: number[], sky: boolean): void {
  for (let head = 0; head < queue.length; head += 3) {
    const x = queue[head];
    const y = queue[head + 1];
    const z = queue[head + 2];
    const c = acc.chunk(x, z);
    if (!c) continue;
    const level = getLevel(c, idx(x & 15, y, z & 15), sky);
    if (level <= 1) continue;
    for (let d = 0; d < 6; d++) {
      const ny = y + DY[d];
      if (ny < 0 || ny >= H) continue;
      const nx = x + DX[d];
      const nz = z + DZ[d];
      const nc = acc.chunk(nx, nz);
      if (!nc) continue;
      const n = idx(nx & 15, ny, nz & 15);
      const op = opacityAt(nc, n);
      if (op >= 15) continue;
      const nl = sky && d === DOWN && level === 15 && op === 0 ? 15 : level - Math.max(1, op);
      if (nl > getLevel(nc, n, sky)) {
        setLevel(nc, n, sky, nl);
        acc.mark(nc, nx, nz);
        queue.push(nx, ny, nz);
      }
    }
  }
}

/**
 * Гасит свет, исходивший из клетки с уровнем startLevel. Возвращает клетки
 * на границе тёмной области, от которых свет нужно разлить заново.
 */
function unpropagate(acc: Access, x0: number, y0: number, z0: number, startLevel: number, sky: boolean): number[] {
  const removal = [x0, y0, z0, startLevel];
  const relight: number[] = [];
  for (let head = 0; head < removal.length; head += 4) {
    const x = removal[head];
    const y = removal[head + 1];
    const z = removal[head + 2];
    const level = removal[head + 3];
    for (let d = 0; d < 6; d++) {
      const ny = y + DY[d];
      if (ny < 0 || ny >= H) continue;
      const nx = x + DX[d];
      const nz = z + DZ[d];
      const nc = acc.chunk(nx, nz);
      if (!nc) continue;
      const n = idx(nx & 15, ny, nz & 15);
      const nl = getLevel(nc, n, sky);
      if (nl === 0) continue;
      if (nl < level || (sky && d === DOWN && level === 15 && nl === 15)) {
        const own = sky ? 0 : EMISSION[nc.blocks[n] & TYPE_MASK];
        setLevel(nc, n, sky, own);
        acc.mark(nc, nx, nz);
        removal.push(nx, ny, nz, nl);
        if (own) relight.push(nx, ny, nz);
      } else {
        relight.push(nx, ny, nz);
      }
    }
  }
  return relight;
}

/** Обновляет свет после замены блока в клетке (x, y, z). */
export function updateLight(src: ChunkSource, x: number, y: number, z: number, changed?: Set<string>): void {
  if (y < 0 || y >= H) return;
  const acc = new Access(src, changed);
  const c = acc.chunk(x, z);
  if (!c) return;
  const i = idx(x & 15, y, z & 15);
  const emission = EMISSION[c.blocks[i] & TYPE_MASK];
  acc.mark(c, x, z);

  for (const sky of [true, false]) {
    const current = getLevel(c, i, sky);
    setLevel(c, i, sky, 0);
    const relight = current > 0 ? unpropagate(acc, x, y, z, current, sky) : [];
    if (!sky && emission) {
      setLevel(c, i, false, emission);
      relight.push(x, y, z);
    }
    for (let d = 0; d < 6; d++) {
      const ny = y + DY[d];
      if (ny >= 0 && ny < H) relight.push(x + DX[d], ny, z + DZ[d]);
    }
    // Выше границы мира клеток нет — верхняя клетка столба освещается небом напрямую.
    const op = OPACITY[c.blocks[i] & TYPE_MASK];
    if (sky && y === H - 1 && op < 15) {
      setLevel(c, i, true, Math.max(0, 15 - op));
      relight.push(x, y, z);
    }
    propagate(acc, relight, sky);
  }
}

/** «Сшивает» свет нового чанка с уже загруженными соседями (в обе стороны). */
export function stitchChunkLight(src: ChunkSource, cx: number, cz: number, changed?: Set<string>): void {
  const c = src.getChunk(cx, cz);
  if (!c) return;
  const acc = new Access(src, changed);
  const queues = { sky: [] as number[], block: [] as number[] };

  for (let dir = 0; dir < 4; dir++) {
    const ox = dir === 0 ? 1 : dir === 1 ? -1 : 0;
    const oz = dir === 2 ? 1 : dir === 3 ? -1 : 0;
    const n = src.getChunk(cx + ox, cz + oz);
    if (!n) continue;
    for (let y = 0; y < H; y++)
      for (let k = 0; k < S; k++) {
        // a — клетка на краю нового чанка, b — соседняя клетка в чанке-соседе.
        const ax = ox === 1 ? 15 : ox === -1 ? 0 : k;
        const az = oz === 1 ? 15 : oz === -1 ? 0 : k;
        const bx = ox === 1 ? 0 : ox === -1 ? 15 : k;
        const bz = oz === 1 ? 0 : oz === -1 ? 15 : k;
        const ia = idx(ax, y, az);
        const ib = idx(bx, y, bz);
        const opA = opacityAt(c, ia);
        const opB = opacityAt(n, ib);
        const wax = cx * S + ax;
        const waz = cz * S + az;
        const wbx = (cx + ox) * S + bx;
        const wbz = (cz + oz) * S + bz;
        for (const sky of [true, false]) {
          const la = getLevel(c, ia, sky);
          const lb = getLevel(n, ib, sky);
          const q = sky ? queues.sky : queues.block;
          if (opB < 15 && la - Math.max(1, opB) > lb) {
            setLevel(n, ib, sky, la - Math.max(1, opB));
            acc.mark(n, wbx, wbz);
            q.push(wbx, y, wbz);
          } else if (opA < 15 && lb - Math.max(1, opA) > la) {
            setLevel(c, ia, sky, lb - Math.max(1, opA));
            acc.mark(c, wax, waz);
            q.push(wax, y, waz);
          }
        }
      }
  }
  propagate(acc, queues.sky, true);
  propagate(acc, queues.block, false);
}

/** Уровень света в точке мира: [небо, блоки]. */
export function lightAt(src: ChunkSource, x: number, y: number, z: number): [number, number] {
  if (y >= H) return [15, 0];
  if (y < 0) return [0, 0];
  const c = src.getChunk(x >> 4, z >> 4);
  if (!c) return [15, 0];
  const v = c.light[idx(x & 15, y, z & 15)];
  return [v >> 4, v & 15];
}
