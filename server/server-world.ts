import {
  BLOCKS,
  Block,
  EMISSION,
  FULL_CUBE,
  OPACITY,
  REPLACEABLE,
  SHAPE,
  S_CROP,
  S_CROSS,
  S_DOOR,
  S_FLUID,
  S_LADDER,
  S_TORCH,
  S_BED,
  DIR_VEC,
  fluidFalling,
  fluidLevel,
  makeState,
  metaOf,
  opposite,
  sugarCaneSupported,
  typeOf,
} from '../src/shared/blocks';
import { CHUNK_SIZE as S, WORLD_HEIGHT as H, blockIndex, chunkKey } from '../src/shared/constants';
import { blockDrops } from '../src/shared/drops';
import type { ItemStack } from '../src/shared/inventory';
import type { BlockGetter } from '../src/shared/physics';
import { canTreeReplace, placeTree, treeCanSet, WorldGenerator, type TreeKind } from '../src/shared/worldgen';
import type { WorldStore } from './world-store';

export interface WorldHooks {
  /** Блок превратился в падающий (песок, гравий). */
  spawnFalling(x: number, y: number, z: number, state: number): void;
  /** Выпадение предметов (растение без опоры, взрыв...). */
  drop(x: number, y: number, z: number, items: ItemStack[]): void;
  sound(name: string, x: number, y: number, z: number): void;
  /** Блок-контейнер исчез (сундук сломан водой, взрывом...). */
  containerRemoved(x: number, y: number, z: number): void;
}

interface ServerChunk {
  blocks: Uint16Array;
  /** Высота самого верхнего блока, задерживающего свет неба, по колонкам. */
  height: Int16Array;
  /** Светящиеся блоки чанка: индексы. */
  emitters: Set<number>;
  lastUsed: number;
}

const WATER_TICKS = 5;
const LAVA_TICKS = 30;

/**
 * Мир на сервере: чанки генерируются из того же сида, что и у клиентов,
 * плюс правки игроков. Сервер решает, что выпадает из блоков, как течёт вода,
 * падает песок и растут посевы.
 */
export class ServerWorld implements BlockGetter {
  readonly gen: WorldGenerator;
  private readonly chunks = new Map<string, ServerChunk>();
  /** Изменения за текущий тик — рассылаются игрокам одним сообщением. */
  readonly changes: number[] = [];
  private readonly scheduled = new Map<string, number>();
  private tickNo = 0;

  constructor(
    private readonly store: WorldStore,
    private readonly hooks: WorldHooks,
  ) {
    this.gen = new WorldGenerator(store.seed);
  }

  get loadedChunks(): number {
    return this.chunks.size;
  }

  isLoaded(cx: number, cz: number): boolean {
    return this.chunks.has(chunkKey(cx, cz));
  }

  /** Чанк (генерируется при первом обращении). */
  chunk(cx: number, cz: number): ServerChunk {
    const key = chunkKey(cx, cz);
    let c = this.chunks.get(key);
    if (!c) {
      const blocks = this.gen.generateChunk(cx, cz);
      const edits = this.store.chunkEdits(cx, cz);
      if (edits) for (const [i, s] of edits) blocks[i] = s;
      c = { blocks, height: new Int16Array(S * S), emitters: new Set(), lastUsed: 0 };
      for (let z = 0; z < S; z++) for (let x = 0; x < S; x++) this.recalcHeight(c, x, z);
      for (let i = 0; i < blocks.length; i++) if (EMISSION[typeOf(blocks[i])]) c.emitters.add(i);
      this.chunks.set(key, c);
    }
    c.lastUsed = this.tickNo;
    return c;
  }

  private recalcHeight(c: ServerChunk, x: number, z: number): void {
    let y = H - 1;
    while (y > 0 && OPACITY[typeOf(c.blocks[blockIndex(x, y, z)])] === 0) y--;
    c.height[z * S + x] = y;
  }

  getState(x: number, y: number, z: number): number {
    if (y < 0) return Block.BEDROCK;
    if (y >= H) return Block.AIR;
    return this.chunk(x >> 4, z >> 4).blocks[blockIndex(x & 15, y, z & 15)];
  }

  /** Состояние без генерации: если чанк не загружен — воздух. */
  peekState(x: number, y: number, z: number): number {
    if (y < 0) return Block.BEDROCK;
    if (y >= H) return Block.AIR;
    const c = this.chunks.get(chunkKey(x >> 4, z >> 4));
    return c ? c.blocks[blockIndex(x & 15, y, z & 15)] : Block.AIR;
  }

  setState(x: number, y: number, z: number, state: number, notify = true): void {
    if (y < 0 || y >= H) return;
    const c = this.chunk(x >> 4, z >> 4);
    const i = blockIndex(x & 15, y, z & 15);
    const old = c.blocks[i];
    if (old === state) return;
    c.blocks[i] = state;
    this.store.setBlock(x, y, z, state);
    this.changes.push(x, y, z, state);
    const lx = x & 15;
    const lz = z & 15;
    const colTop = c.height[lz * S + lx];
    if (OPACITY[typeOf(state)] > 0 && y > colTop) c.height[lz * S + lx] = y;
    else if (y === colTop) this.recalcHeight(c, lx, lz);
    if (EMISSION[typeOf(state)]) c.emitters.add(i);
    else c.emitters.delete(i);
    if (typeOf(old) !== typeOf(state) && (typeOf(old) === Block.CHEST || typeOf(old) === Block.FURNACE || typeOf(old) === Block.LIT_FURNACE)) {
      if (typeOf(state) !== Block.FURNACE && typeOf(state) !== Block.LIT_FURNACE) this.hooks.containerRemoved(x, y, z);
    }
    if (notify) this.notifyAround(x, y, z);
  }

  /** Запланировать обновление блока и его соседей. */
  notifyAround(x: number, y: number, z: number): void {
    this.schedule(x, y, z, 1);
    this.schedule(x + 1, y, z, 1);
    this.schedule(x - 1, y, z, 1);
    this.schedule(x, y + 1, z, 1);
    this.schedule(x, y - 1, z, 1);
    this.schedule(x, y, z + 1, 1);
    this.schedule(x, y, z - 1, 1);
  }

  schedule(x: number, y: number, z: number, delay: number): void {
    if (y < 0 || y >= H) return;
    const key = `${x},${y},${z}`;
    const due = this.tickNo + delay;
    const cur = this.scheduled.get(key);
    if (cur === undefined || cur > due) this.scheduled.set(key, due);
  }

  /** Есть ли небо над точкой (для горения зомби и спауна мобов). */
  skyExposed(x: number, y: number, z: number): boolean {
    const c = this.chunks.get(chunkKey(x >> 4, z >> 4));
    if (!c) return true;
    return y > c.height[(z & 15) * S + (x & 15)];
  }

  /** Приблизительный уровень света от факелов и других источников. */
  blockLight(x: number, y: number, z: number): number {
    let best = 0;
    for (let dz = -1; dz <= 1; dz++)
      for (let dx = -1; dx <= 1; dx++) {
        const cx = (x >> 4) + dx;
        const cz = (z >> 4) + dz;
        const c = this.chunks.get(chunkKey(cx, cz));
        if (!c) continue;
        for (const i of c.emitters) {
          const ex = cx * S + (i & 15);
          const ey = i >> 8;
          const ez = cz * S + ((i >> 4) & 15);
          const d = Math.abs(ex - x) + Math.abs(ey - y) + Math.abs(ez - z);
          const l = EMISSION[typeOf(c.blocks[i])] - d;
          if (l > best) best = l;
        }
      }
    return best;
  }

  /** Тик мира: запланированные обновления (вода, песок, опоры) и случайные тики роста. */
  tick(players: { x: number; z: number }[]): void {
    this.tickNo++;
    const due: [number, number, number][] = [];
    for (const [key, t] of this.scheduled) {
      if (t > this.tickNo) continue;
      this.scheduled.delete(key);
      const [x, y, z] = key.split(',').map(Number);
      due.push([x, y, z]);
      if (due.length > 4000) break;
    }
    for (const [x, y, z] of due) {
      if (!this.chunks.has(chunkKey(x >> 4, z >> 4))) continue;
      this.updateBlock(x, y, z);
    }
    this.randomTicks(players);
  }

  /** Выгрузка чанков, далёких от всех игроков. */
  unloadFar(players: { x: number; z: number }[], radius: number): void {
    for (const [key, c] of this.chunks) {
      const [cx, cz] = key.split(',').map(Number);
      const near = players.some((p) => Math.max(Math.abs((Math.floor(p.x) >> 4) - cx), Math.abs((Math.floor(p.z) >> 4) - cz)) <= radius);
      if (!near && this.tickNo - c.lastUsed > 200) this.chunks.delete(key);
    }
  }

  // ---------- Обновления блоков ----------

  private updateBlock(x: number, y: number, z: number): void {
    const state = this.getState(x, y, z);
    const type = typeOf(state);
    const shape = SHAPE[type];
    if (shape === S_FLUID) return this.updateFluid(x, y, z, state);
    if (BLOCKS[type].gravity) {
      const below = typeOf(this.getState(x, y - 1, z));
      if (y > 0 && (below === Block.AIR || REPLACEABLE[below] || SHAPE[below] === S_FLUID)) {
        this.setState(x, y, z, Block.AIR);
        this.hooks.spawnFalling(x, y, z, state);
      }
      return;
    }
    if (!this.isSupported(x, y, z, state)) {
      this.breakNaturally(x, y, z, state);
      return;
    }
    if (type === Block.FARMLAND && FULL_CUBE[typeOf(this.getState(x, y + 1, z))]) this.setState(x, y, z, Block.DIRT);
  }

  /** Разрушение блока без игрока (нет опоры, вода смыла): выпадает предмет. */
  breakNaturally(x: number, y: number, z: number, state: number): void {
    const type = typeOf(state);
    this.setState(x, y, z, Block.AIR);
    if (type === Block.OAK_DOOR) {
      const otherY = metaOf(state) & 8 ? y - 1 : y + 1;
      if (typeOf(this.getState(x, otherY, z)) === Block.OAK_DOOR) this.setState(x, otherY, z, Block.AIR);
    }
    this.hooks.drop(x, y, z, blockDrops(state, null));
  }

  /** Держится ли блок (растения на земле, факелы на стене, двери, кровати). */
  isSupported(x: number, y: number, z: number, state: number): boolean {
    const type = typeOf(state);
    const meta = metaOf(state);
    const shape = SHAPE[type];
    const below = this.getState(x, y - 1, z);
    const bt = typeOf(below);
    if (shape === S_CROSS || shape === S_CROP) {
      if (type === Block.WHEAT) return bt === Block.FARMLAND;
      if (type === Block.SUGAR_CANE) return sugarCaneSupported((bx, by, bz) => this.getState(bx, by, bz), x, y, z);
      if (type === Block.DEAD_BUSH) return bt === Block.SAND || bt === Block.DIRT || bt === Block.GRASS;
      return bt === Block.GRASS || bt === Block.DIRT || bt === Block.FARMLAND || bt === Block.SNOWY_GRASS;
    }
    if (type === Block.CACTUS) {
      if (bt !== Block.SAND && bt !== Block.CACTUS) return false;
      for (const [dx, , dz] of DIR_VEC) if (BLOCKS[typeOf(this.getState(x + dx, y, z + dz))].solid) return false;
      return true;
    }
    if (shape === S_TORCH) {
      if (meta === 0) return FULL_CUBE[bt] === 1;
      const [dx, , dz] = DIR_VEC[(meta - 1) & 3];
      return FULL_CUBE[typeOf(this.getState(x + dx, y, z + dz))] === 1;
    }
    if (shape === S_LADDER) {
      const [dx, , dz] = DIR_VEC[meta & 3];
      return FULL_CUBE[typeOf(this.getState(x + dx, y, z + dz))] === 1;
    }
    if (shape === S_DOOR) {
      if (meta & 8) return typeOf(below) === Block.OAK_DOOR;
      return FULL_CUBE[bt] === 1 && typeOf(this.getState(x, y + 1, z)) === Block.OAK_DOOR;
    }
    if (shape === S_BED) {
      const dir = meta & 3;
      const [dx, , dz] = DIR_VEC[(meta & 4) !== 0 ? opposite(dir) : dir];
      return typeOf(this.getState(x + dx, y, z + dz)) === Block.BED;
    }
    return true;
  }

  // ---------- Жидкости ----------

  private updateFluid(x: number, y: number, z: number, state: number): void {
    const type = typeOf(state);
    const lava = type === Block.LAVA;
    const other = lava ? Block.WATER : Block.LAVA;

    // Лава + вода: источник лавы → обсидиан, текущая лава → булыжник.
    if (lava) {
      for (const [dx, dy, dz] of [[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1], [0, 1, 0]]) {
        if (typeOf(this.getState(x + dx, y + dy, z + dz)) === other) {
          this.setState(x, y, z, fluidLevel(state) === 0 && !fluidFalling(state) ? Block.OBSIDIAN : Block.COBBLESTONE);
          this.hooks.sound('fizz', x + 0.5, y + 0.5, z + 0.5);
          return;
        }
      }
    }

    const drop = lava ? 2 : 1;
    const maxLevel = 7;
    let level = fluidLevel(state);
    let falling = fluidFalling(state);
    const source = level === 0 && !falling;

    if (!source) {
      // Пересчитываем уровень по соседям.
      const above = this.getState(x, y + 1, z);
      let best = 99;
      let sources = 0;
      for (const [dx, , dz] of DIR_VEC) {
        const n = this.getState(x + dx, y, z + dz);
        if (typeOf(n) !== type) continue;
        const nl = fluidLevel(n);
        const nf = fluidFalling(n);
        if (nl === 0 && !nf) sources++;
        const feed = nl === 0 || nf ? drop : nl + drop;
        if (feed < best) best = feed;
      }
      let newState: number;
      if (typeOf(above) === type) newState = makeState(type, 8);
      else if (!lava && sources >= 2 && (FULL_CUBE[typeOf(this.getState(x, y - 1, z))] || this.isSourceAt(x, y - 1, z, type)))
        newState = makeState(type, 0);
      else if (best <= maxLevel) newState = makeState(type, best);
      else newState = Block.AIR;
      if (newState !== state) {
        this.setState(x, y, z, newState);
        if (newState === Block.AIR) return;
        state = newState;
        level = fluidLevel(state);
        falling = fluidFalling(state);
        this.schedule(x, y, z, lava ? LAVA_TICKS : WATER_TICKS);
        return;
      }
    }

    const delay = lava ? LAVA_TICKS : WATER_TICKS;
    // Сначала течёт вниз.
    const below = this.getState(x, y - 1, z);
    const bt = typeOf(below);
    if (y > 0 && this.canFlowInto(below, type)) {
      if (bt === other) {
        this.setState(x, y - 1, z, lava ? Block.STONE : Block.OBSIDIAN);
        this.hooks.sound('fizz', x + 0.5, y - 0.5, z + 0.5);
      } else {
        this.flowInto(x, y - 1, z, below, makeState(type, 8));
        this.schedule(x, y - 1, z, delay);
      }
      // Как в Minecraft: если жидкость может течь вниз, вбок она не растекается.
      return;
    }
    if (y > 0 && bt === type && !source) return;

    const next = source || falling ? drop : level + drop;
    if (next > maxLevel) return;
    for (const [dx, , dz] of DIR_VEC) {
      const nx = x + dx;
      const nz = z + dz;
      const n = this.getState(nx, y, nz);
      const nt = typeOf(n);
      if (nt === type) {
        if (fluidLevel(n) > next && !fluidFalling(n) && fluidLevel(n) !== 0) {
          this.setState(nx, y, nz, makeState(type, next));
          this.schedule(nx, y, nz, delay);
        }
        continue;
      }
      if (nt === other) {
        this.schedule(nx, y, nz, 1);
        continue;
      }
      if (!this.canFlowInto(n, type)) continue;
      this.flowInto(nx, y, nz, n, makeState(type, next));
      this.schedule(nx, y, nz, delay);
    }
  }

  private isSourceAt(x: number, y: number, z: number, type: number): boolean {
    const s = this.getState(x, y, z);
    return typeOf(s) === type && fluidLevel(s) === 0 && !fluidFalling(s);
  }

  private canFlowInto(state: number, fluid: number): boolean {
    const t = typeOf(state);
    if (t === fluid) return fluidLevel(state) !== 0 && !fluidFalling(state);
    if (t === Block.AIR) return true;
    if (SHAPE[t] === S_FLUID) return true;
    return REPLACEABLE[t] === 1 || SHAPE[t] === S_CROSS || SHAPE[t] === S_CROP || SHAPE[t] === S_TORCH;
  }

  /** Жидкость заливает клетку; растения и факелы при этом выпадают. */
  private flowInto(x: number, y: number, z: number, old: number, state: number): void {
    const t = typeOf(old);
    if (t !== Block.AIR && SHAPE[t] !== S_FLUID) this.hooks.drop(x, y, z, blockDrops(old, null));
    this.setState(x, y, z, state);
  }

  // ---------- Рост ----------

  private randomTicks(players: { x: number; z: number }[]): void {
    const seen = new Set<string>();
    for (const p of players) {
      const pcx = Math.floor(p.x) >> 4;
      const pcz = Math.floor(p.z) >> 4;
      for (let dz = -4; dz <= 4; dz++)
        for (let dx = -4; dx <= 4; dx++) {
          const key = chunkKey(pcx + dx, pcz + dz);
          if (seen.has(key)) continue;
          seen.add(key);
          const c = this.chunks.get(key);
          if (!c) continue;
          for (let k = 0; k < 48; k++) {
            const i = Math.floor(Math.random() * c.blocks.length);
            const t = typeOf(c.blocks[i]);
            if (
              t === Block.WHEAT ||
              t === Block.OAK_SAPLING ||
              t === Block.BIRCH_SAPLING ||
              t === Block.SPRUCE_SAPLING ||
              t === Block.DIRT ||
              t === Block.GRASS ||
              t === Block.SUGAR_CANE
            ) {
              this.randomTick((pcx + dx) * S + (i & 15), i >> 8, (pcz + dz) * S + ((i >> 4) & 15), c.blocks[i]);
            }
          }
        }
    }
  }

  private randomTick(x: number, y: number, z: number, state: number): void {
    const t = typeOf(state);
    const above = typeOf(this.getState(x, y + 1, z));
    if (t === Block.WHEAT) {
      const age = metaOf(state) & 7;
      if (age < 7 && Math.random() < 0.6) this.setState(x, y, z, makeState(Block.WHEAT, age + 1), false);
    } else if (t === Block.OAK_SAPLING || t === Block.BIRCH_SAPLING || t === Block.SPRUCE_SAPLING) {
      if (Math.random() < 0.15) this.growTree(x, y, z, t);
    } else if (t === Block.DIRT) {
      // Трава постепенно разрастается на открытую землю.
      if (OPACITY[above] === 0 && this.skyExposed(x, y + 1, z)) {
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          if (typeOf(this.getState(x + dx, y, z + dz)) === Block.GRASS && Math.random() < 0.5) {
            this.setState(x, y, z, Block.GRASS, false);
            break;
          }
        }
      }
    } else if (t === Block.GRASS && FULL_CUBE[above]) {
      this.setState(x, y, z, Block.DIRT, false);
    } else if (t === Block.SUGAR_CANE && above === Block.AIR && Math.random() < 0.5) {
      // Тростник растёт вверх до трёх блоков.
      let height = 1;
      while (height < 3 && typeOf(this.getState(x, y - height, z)) === Block.SUGAR_CANE) height++;
      if (height < 3) this.setState(x, y + 1, z, Block.SUGAR_CANE);
    }
  }

  /** Саженец вырастает в дерево, если хватает места. */
  growTree(x: number, y: number, z: number, sapling: number): boolean {
    const kind: TreeKind = sapling === Block.BIRCH_SAPLING ? 'birch' : sapling === Block.SPRUCE_SAPLING ? 'spruce' : 'oak';
    for (let dy = 1; dy <= 5; dy++) if (!canTreeReplace(this.getState(x, y + dy, z), true)) return false;
    this.setState(x, y, z, Block.AIR, false);
    placeTree(
      kind,
      Math.random(),
      (bx, by, bz, id, trunk) => {
        if (by < 0 || by >= H) return;
        if (treeCanSet(this.getState(bx, by, bz), id, trunk)) this.setState(bx, by, bz, id, false);
      },
      x,
      y,
      z,
    );
    return true;
  }

  /** Костная мука: ускоряет рост. */
  bonemeal(x: number, y: number, z: number): boolean {
    const state = this.getState(x, y, z);
    const t = typeOf(state);
    if (t === Block.WHEAT) {
      const age = metaOf(state) & 7;
      if (age >= 7) return false;
      this.setState(x, y, z, makeState(Block.WHEAT, Math.min(7, age + 2 + Math.floor(Math.random() * 3))), false);
      return true;
    }
    if (t === Block.OAK_SAPLING || t === Block.BIRCH_SAPLING || t === Block.SPRUCE_SAPLING) {
      if (Math.random() < 0.45) this.growTree(x, y, z, t);
      return true;
    }
    if (t === Block.GRASS) {
      for (let k = 0; k < 24; k++) {
        const gx = x + Math.floor(Math.random() * 7) - 3;
        const gz = z + Math.floor(Math.random() * 7) - 3;
        if (typeOf(this.getState(gx, y, gz)) !== Block.GRASS || this.getState(gx, y + 1, gz) !== Block.AIR) continue;
        const r = Math.random();
        this.setState(gx, y + 1, gz, r < 0.8 ? Block.TALL_GRASS : r < 0.9 ? Block.DANDELION : Block.POPPY, false);
      }
      return true;
    }
    return false;
  }
}
