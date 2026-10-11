import { createNoise2D, createNoise3D, type NoiseFunction2D, type NoiseFunction3D } from 'simplex-noise';
import { Block, FULL_CUBE, REPLACEABLE, makeState, typeOf } from './blocks';
import { CHUNK_SIZE, CHUNK_VOLUME, SEA_LEVEL, WORLD_HEIGHT, blockIndex } from './constants';
import { hash3, mulberry32 } from './rng';

export const Biome = {
  PLAINS: 0,
  FOREST: 1,
  DESERT: 2,
  SNOWY: 3,
  MOUNTAINS: 4,
  BEACH: 5,
  OCEAN: 6,
} as const;

export interface ColumnInfo {
  height: number;
  biome: number;
}

const TREE_CELL = 5;
/** Сторона региона (в блоках), в котором может быть один ровный тоннель 2×2. */
const TUNNEL_REGION = 64;
/** Регионы (в чанках) для пирамид на мелководье и алтарей. */
const PYRAMID_REGION = 4;
const SHRINE_REGION = 6;
const MOUNTAIN_LEVEL = SEA_LEVEL + 38;
export const SNOW_LINE = SEA_LEVEL + 50;
/** Ниже этого уровня пустоты пещер заполнены лавой. */
const LAVA_LEVEL = 10;

function fbm2(noise: NoiseFunction2D, x: number, z: number, octaves: number): number {
  let sum = 0;
  let amp = 1;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += noise(x * freq, z * freq) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / norm;
}

function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

export type TreeKind = 'oak' | 'birch' | 'spruce';

/**
 * Детерминированный генератор мира: при одинаковом сиде сервер и все клиенты
 * получают один и тот же ландшафт, поэтому по сети передаются только изменения.
 */
export class WorldGenerator {
  readonly seed: number;
  private readonly continent: NoiseFunction2D;
  private readonly hills: NoiseFunction2D;
  private readonly detail: NoiseFunction2D;
  private readonly mountain: NoiseFunction2D;
  private readonly ridge: NoiseFunction2D;
  private readonly temperature: NoiseFunction2D;
  private readonly moisture: NoiseFunction2D;
  private readonly cave1: NoiseFunction3D;
  private readonly cave2: NoiseFunction3D;
  private readonly cavern: NoiseFunction3D;

  constructor(seed: number) {
    this.seed = seed | 0;
    let salt = 0;
    const rng = () => mulberry32(this.seed + 0x9e3779b9 * ++salt);
    this.continent = createNoise2D(rng());
    this.hills = createNoise2D(rng());
    this.detail = createNoise2D(rng());
    this.mountain = createNoise2D(rng());
    this.ridge = createNoise2D(rng());
    this.temperature = createNoise2D(rng());
    this.moisture = createNoise2D(rng());
    this.cave1 = createNoise3D(rng());
    this.cave2 = createNoise3D(rng());
    this.cavern = createNoise3D(rng());
  }

  /** Высота поверхности и биом в точке мира. Чистая функция координат. */
  column(x: number, z: number): ColumnInfo {
    const cont = fbm2(this.continent, x / 700, z / 700, 4);
    const hills = fbm2(this.hills, x / 120, z / 120, 4);
    const detail = this.detail(x / 30, z / 30);
    const mountainMask = smoothstep(0.15, 0.55, fbm2(this.mountain, x / 420, z / 420, 3));
    const ridge = 1 - Math.abs(fbm2(this.ridge, x / 160, z / 160, 4));

    const h = SEA_LEVEL + 4 + cont * 24 + hills * 8 + detail * 2 + mountainMask * ridge * ridge * 60;
    const height = Math.max(4, Math.min(WORLD_HEIGHT - 14, Math.floor(h)));

    const temp = fbm2(this.temperature, x / 520, z / 520, 2);
    const moist = fbm2(this.moisture, x / 460, z / 460, 2);

    let biome: number;
    if (height < SEA_LEVEL - 1) biome = temp < -0.3 ? Biome.SNOWY : Biome.OCEAN;
    else if (height >= MOUNTAIN_LEVEL) biome = Biome.MOUNTAINS;
    else if (height <= SEA_LEVEL + 1) biome = temp < -0.3 ? Biome.SNOWY : Biome.BEACH;
    else if (temp > 0.25 && moist < 0.1) biome = Biome.DESERT;
    else if (temp < -0.3) biome = Biome.SNOWY;
    else if (moist > 0.12) biome = Biome.FOREST;
    else biome = Biome.PLAINS;
    return { height, biome };
  }

  private isCave(x: number, y: number, z: number): boolean {
    const a = this.cave1(x * 0.045, y * 0.07, z * 0.045);
    const b = this.cave2(x * 0.045, y * 0.07, z * 0.045);
    if (a * a + b * b < 0.016) return true;
    return y < 40 && this.cavern(x * 0.02, y * 0.035, z * 0.02) > 0.7;
  }

  private ore(x: number, y: number, z: number): number {
    const cell = hash3(x >> 1, y >> 1, z >> 1, this.seed + 101);
    let ore: number = Block.STONE;
    if (cell < 0.004) ore = y < 16 ? Block.DIAMOND_ORE : Block.STONE;
    else if (cell < 0.01) ore = y < 32 ? Block.GOLD_ORE : Block.STONE;
    else if (cell < 0.035) ore = y < 64 ? Block.IRON_ORE : Block.STONE;
    else if (cell < 0.065) ore = Block.COAL_ORE;
    else if (cell < 0.075 && y < 60) ore = Block.GRAVEL;
    if (ore === Block.STONE) return ore;
    return hash3(x, y, z, this.seed + 102) < 0.55 ? ore : Block.STONE;
  }

  generateChunk(cx: number, cz: number): Uint16Array {
    const data = new Uint16Array(CHUNK_VOLUME);
    const heights = new Int16Array(CHUNK_SIZE * CHUNK_SIZE);
    const x0 = cx * CHUNK_SIZE;
    const z0 = cz * CHUNK_SIZE;

    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const x = x0 + lx;
        const z = z0 + lz;
        const { height: h, biome } = this.column(x, z);
        heights[lz * CHUNK_SIZE + lx] = h;
        const r = hash3(x, 0, z, this.seed + 7);
        const fillDepth = 3 + Math.floor(r * 2);

        let top: number = Block.GRASS;
        let filler: number = Block.DIRT;
        let deep: number = Block.STONE;
        switch (biome) {
          case Biome.DESERT:
            top = Block.SAND;
            filler = Block.SAND;
            deep = Block.SANDSTONE;
            break;
          case Biome.SNOWY:
            top = h < SEA_LEVEL ? Block.DIRT : h <= SEA_LEVEL + 1 ? Block.SAND : Block.SNOWY_GRASS;
            filler = top === Block.SAND ? Block.SAND : Block.DIRT;
            break;
          case Biome.BEACH:
            top = Block.SAND;
            filler = Block.SAND;
            deep = Block.SANDSTONE;
            break;
          case Biome.OCEAN:
            top = h >= SEA_LEVEL - 6 ? Block.SAND : this.detail(x / 12, z / 12) > 0 ? Block.GRAVEL : Block.DIRT;
            filler = top === Block.GRAVEL ? Block.GRAVEL : top === Block.DIRT ? Block.DIRT : Block.SAND;
            break;
          case Biome.MOUNTAINS:
            top = h >= SNOW_LINE ? Block.SNOW_BLOCK : r < 0.5 && h < SNOW_LINE - 6 ? Block.GRASS : Block.STONE;
            filler = top === Block.GRASS ? Block.DIRT : Block.STONE;
            break;
        }

        const frozen = biome === Biome.SNOWY;
        for (let y = 0; y <= Math.max(h, SEA_LEVEL); y++) {
          let id: number;
          if (y === 0) id = Block.BEDROCK;
          else if (y <= 3 && hash3(x, y, z, this.seed + 3) < 0.8 - y * 0.2) id = Block.BEDROCK;
          else if (y > h) id = frozen && y === SEA_LEVEL ? Block.ICE : Block.WATER;
          else if (y === h) id = top;
          else if (y > h - fillDepth) id = filler;
          else if (y > h - fillDepth - 3 && deep !== Block.STONE) id = deep;
          else if (y < h - 5 && this.isCave(x, y, z)) id = y <= LAVA_LEVEL ? Block.LAVA : Block.AIR;
          else id = this.ore(x, y, z);
          data[blockIndex(lx, y, lz)] = id;
        }

        // Растительность на поверхности.
        const above = h + 1;
        if (above <= SEA_LEVEL || above >= WORLD_HEIGHT - 4) continue;
        const p = hash3(x, 1, z, this.seed + 9);
        // Сахарный тростник на берегу: земля на уровне моря, рядом вода.
        if (h === SEA_LEVEL && !frozen && (top === Block.GRASS || top === Block.SAND || top === Block.DIRT) && hash3(x, 5, z, this.seed + 9) < 0.1) {
          const wet = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ].some(([dx, dz]) => this.column(x + dx, z + dz).height < SEA_LEVEL);
          if (wet) {
            const caneHeight = 1 + Math.floor(hash3(x, 6, z, this.seed + 9) * 3);
            for (let i = 0; i < caneHeight; i++) data[blockIndex(lx, above + i, lz)] = Block.SUGAR_CANE;
            continue;
          }
        }
        // Редкие тыквенные грядки на равнинах.
        if (top === Block.GRASS && biome === Biome.PLAINS && hash3(x >> 3, 7, z >> 3, this.seed + 21) < 0.03 && hash3(x, 8, z, this.seed + 21) < 0.12) {
          data[blockIndex(lx, above, lz)] = makeState(Block.PUMPKIN, Math.floor(hash3(x, 9, z, this.seed + 21) * 4));
          continue;
        }
        if (top === Block.GRASS) {
          const grassChance = biome === Biome.PLAINS ? 0.22 : 0.1;
          if (p < grassChance) data[blockIndex(lx, above, lz)] = Block.TALL_GRASS;
          else if (p < grassChance + 0.012) data[blockIndex(lx, above, lz)] = Block.DANDELION;
          else if (p < grassChance + 0.022) data[blockIndex(lx, above, lz)] = Block.POPPY;
        } else if (biome === Biome.DESERT) {
          if (p < 0.005) {
            const cactusHeight = 1 + Math.floor(hash3(x, 2, z, this.seed + 9) * 3);
            for (let i = 0; i < cactusHeight; i++) data[blockIndex(lx, above + i, lz)] = Block.CACTUS;
          } else if (p < 0.012) data[blockIndex(lx, above, lz)] = Block.DEAD_BUSH;
        }
      }
    }

    this.placeOddities(data, heights, cx, cz);
    this.placeTrees(data, cx, cz);
    return data;
  }

  /**
   * Жуткие находки, будто здесь кто-то был: ровные тоннели 2×2 глубоко под землёй,
   * одинокие факелы в пещерах, песчаные пирамиды с огнём на вершине посреди мелководья,
   * алтарь из золота и замшелого булыжника.
   */
  private placeOddities(data: Uint16Array, heights: Int16Array, cx: number, cz: number): void {
    this.carveTunnels(data, heights, cx, cz);
    this.placeCaveTorches(data, heights, cx, cz);
    this.placePyramid(data, heights, cx, cz);
    this.placeShrine(data, heights, cx, cz);
  }

  /** Тоннель региона: начало, направление и длина (или null — в этом регионе его нет). */
  private tunnel(rx: number, rz: number): { x: number; y: number; z: number; dx: number; dz: number; length: number } | null {
    const h = (k: number) => hash3(rx, k, rz, this.seed + 41);
    if (h(0) >= 0.35) return null;
    const alongX = h(4) < 0.5;
    const dir = h(5) < 0.5 ? 1 : -1;
    return {
      x: rx * TUNNEL_REGION + Math.floor(h(1) * TUNNEL_REGION),
      y: 16 + Math.floor(h(2) * 22),
      z: rz * TUNNEL_REGION + Math.floor(h(3) * TUNNEL_REGION),
      dx: alongX ? dir : 0,
      dz: alongX ? 0 : dir,
      length: 24 + Math.floor(h(6) * 36),
    };
  }

  /** Ровно 2×2 и по прямой — так пещеры не выглядят. Тоннель короче региона, поэтому хватает соседних. */
  private carveTunnels(data: Uint16Array, heights: Int16Array, cx: number, cz: number): void {
    const x0 = cx * CHUNK_SIZE;
    const z0 = cz * CHUNK_SIZE;
    const rx0 = Math.floor(x0 / TUNNEL_REGION);
    const rz0 = Math.floor(z0 / TUNNEL_REGION);
    for (let rz = rz0 - 1; rz <= rz0 + 1; rz++)
      for (let rx = rx0 - 1; rx <= rx0 + 1; rx++) {
        const t = this.tunnel(rx, rz);
        if (!t) continue;
        // Ширина — поперёк хода.
        const wx = t.dz !== 0 ? 1 : 0;
        const wz = t.dx !== 0 ? 1 : 0;
        for (let i = 0; i < t.length; i++)
          for (let w = 0; w < 2; w++) {
            const x = t.x + t.dx * i + wx * w;
            const z = t.z + t.dz * i + wz * w;
            const lx = x - x0;
            const lz = z - z0;
            if (lx < 0 || lx >= CHUNK_SIZE || lz < 0 || lz >= CHUNK_SIZE) continue;
            // Глубоко под землёй, не под водой и не под сыпучим песком.
            if (t.y + 7 > heights[lz * CHUNK_SIZE + lx]) continue;
            const roof = typeOf(data[blockIndex(lx, t.y + 2, lz)]);
            if (roof === Block.WATER || roof === Block.LAVA || roof === Block.SAND || roof === Block.GRAVEL) continue;
            for (let y = t.y; y < t.y + 2; y++) {
              const at = blockIndex(lx, y, lz);
              const type = typeOf(data[at]);
              if (type !== Block.WATER && type !== Block.LAVA && type !== Block.BEDROCK) data[at] = Block.AIR;
            }
            // У входа в тоннель горит факел.
            const start = blockIndex(lx, t.y, lz);
            if (i === 0 && w === 0 && data[start] === Block.AIR && hash3(rx, 7, rz, this.seed + 41) < 0.6 && FULL_CUBE[typeOf(data[blockIndex(lx, t.y - 1, lz)])])
              data[start] = makeState(Block.TORCH, 0);
          }
      }
  }

  /** Изредка на полу пещеры стоит факел — кто его поставил? */
  private placeCaveTorches(data: Uint16Array, heights: Int16Array, cx: number, cz: number): void {
    for (let lz = 0; lz < CHUNK_SIZE; lz++)
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const x = cx * CHUNK_SIZE + lx;
        const z = cz * CHUNK_SIZE + lz;
        const top = heights[lz * CHUNK_SIZE + lx] - 6;
        for (let y = LAVA_LEVEL + 2; y < top; y++) {
          if (data[blockIndex(lx, y, lz)] !== Block.AIR || data[blockIndex(lx, y + 1, lz)] !== Block.AIR) continue;
          if (!FULL_CUBE[typeOf(data[blockIndex(lx, y - 1, lz)])]) continue;
          if (hash3(x, y, z, this.seed + 31) < 0.0012) data[blockIndex(lx, y, lz)] = makeState(Block.TORCH, 0);
        }
      }
  }

  /** Ступенчатая пирамида из песчаника на мелководье, с факелом на вершине: ночью его видно издалека. */
  private placePyramid(data: Uint16Array, heights: Int16Array, cx: number, cz: number): void {
    const rx = Math.floor(cx / PYRAMID_REGION);
    const rz = Math.floor(cz / PYRAMID_REGION);
    // Несколько попыток на регион: мелководье попадается не везде.
    for (let k = 0; k < 3; k++) {
      const h = (n: number) => hash3(rx, k * 8 + n, rz, this.seed + 51);
      if (h(0) >= 0.4) continue;
      if (rx * PYRAMID_REGION + Math.floor(h(1) * PYRAMID_REGION) !== cx || rz * PYRAMID_REGION + Math.floor(h(2) * PYRAMID_REGION) !== cz) continue;
      const lx = 5 + Math.floor(h(3) * 6);
      const lz = 5 + Math.floor(h(4) * 6);
      const x = cx * CHUNK_SIZE + lx;
      const z = cz * CHUNK_SIZE + lz;
      const height = heights[lz * CHUNK_SIZE + lx];
      const depth = SEA_LEVEL - height;
      if (depth < 1 || depth > 3 || this.column(x, z).biome !== Biome.OCEAN) continue;
      const r = depth + 2;
      const floor: number[] = [];
      for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) floor.push(heights[(lz + dz) * CHUNK_SIZE + lx + dx]);
      if (floor.some((y) => y >= SEA_LEVEL)) continue;
      let n = 0;
      for (let dz = -r; dz <= r; dz++)
        for (let dx = -r; dx <= r; dx++) {
          const top = height + 1 + r - Math.max(Math.abs(dx), Math.abs(dz));
          for (let y = floor[n++] + 1; y <= top; y++) data[blockIndex(lx + dx, y, lz + dz)] = Block.SANDSTONE;
        }
      data[blockIndex(lx, height + 2 + r, lz)] = makeState(Block.TORCH, 0);
      return;
    }
  }

  /** Алтарь: золото 3×3, в центре замшелый булыжник, вокруг и сверху — факелы. */
  private placeShrine(data: Uint16Array, heights: Int16Array, cx: number, cz: number): void {
    const rx = Math.floor(cx / SHRINE_REGION);
    const rz = Math.floor(cz / SHRINE_REGION);
    const h = (n: number) => hash3(rx, n, rz, this.seed + 61);
    if (h(0) >= 0.35) return;
    if (rx * SHRINE_REGION + Math.floor(h(1) * SHRINE_REGION) !== cx || rz * SHRINE_REGION + Math.floor(h(2) * SHRINE_REGION) !== cz) return;
    const lx = 2 + Math.floor(h(3) * 12);
    const lz = 2 + Math.floor(h(4) * 12);
    const x = cx * CHUNK_SIZE + lx;
    const z = cz * CHUNK_SIZE + lz;
    const height = heights[lz * CHUNK_SIZE + lx];
    if (height <= SEA_LEVEL + 1 || height + 4 >= WORLD_HEIGHT) return;
    const { biome } = this.column(x, z);
    if (biome === Biome.OCEAN || biome === Biome.BEACH || biome === Biome.MOUNTAINS) return;
    // Только на ровном месте.
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (heights[(lz + dz) * CHUNK_SIZE + lx + dx] !== height) return;
    for (let dz = -1; dz <= 1; dz++)
      for (let dx = -1; dx <= 1; dx++) {
        data[blockIndex(lx + dx, height, lz + dz)] = Block.GOLD_BLOCK;
        for (let y = height + 1; y <= height + 3; y++) data[blockIndex(lx + dx, y, lz + dz)] = Block.AIR;
      }
    data[blockIndex(lx, height + 1, lz)] = Block.MOSSY_COBBLESTONE;
    data[blockIndex(lx, height + 2, lz)] = makeState(Block.TORCH, 0);
    for (const [dx, dz] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ])
      data[blockIndex(lx + dx, height + 1, lz + dz)] = makeState(Block.TORCH, 0);
  }

  /** Деревья могут свисать в соседние чанки, поэтому перебираем клетки с запасом. */
  private placeTrees(data: Uint16Array, cx: number, cz: number): void {
    const margin = 3;
    const minX = cx * CHUNK_SIZE - margin;
    const maxX = cx * CHUNK_SIZE + CHUNK_SIZE - 1 + margin;
    const minZ = cz * CHUNK_SIZE - margin;
    const maxZ = cz * CHUNK_SIZE + CHUNK_SIZE - 1 + margin;

    for (let gz = Math.floor(minZ / TREE_CELL); gz <= Math.floor(maxZ / TREE_CELL); gz++) {
      for (let gx = Math.floor(minX / TREE_CELL); gx <= Math.floor(maxX / TREE_CELL); gx++) {
        const tx = gx * TREE_CELL + Math.floor(hash3(gx, 1, gz, this.seed + 12) * TREE_CELL);
        const tz = gz * TREE_CELL + Math.floor(hash3(gx, 2, gz, this.seed + 12) * TREE_CELL);
        if (tx < minX || tx > maxX || tz < minZ || tz > maxZ) continue;

        const { height: h, biome } = this.column(tx, tz);
        if (h <= SEA_LEVEL + 1) continue;
        let density = 0;
        if (biome === Biome.FOREST) density = 0.8;
        else if (biome === Biome.PLAINS) density = 0.07;
        else if (biome === Biome.SNOWY) density = 0.35;
        else if (biome === Biome.MOUNTAINS && h < SNOW_LINE - 6) density = 0.08;
        if (hash3(gx, 0, gz, this.seed + 11) >= density || h + 12 >= WORLD_HEIGHT) continue;
        // На голом камне в горах деревья не растут.
        if (biome === Biome.MOUNTAINS && hash3(tx, 0, tz, this.seed + 7) >= 0.5) continue;

        const roll = hash3(gx, 3, gz, this.seed + 12);
        const kind: TreeKind =
          biome === Biome.SNOWY || biome === Biome.MOUNTAINS ? 'spruce' : biome === Biome.FOREST && roll < 0.3 ? 'birch' : 'oak';
        const size = hash3(gx, 4, gz, this.seed + 12);
        const set: SetBlock = (x, y, z, id, trunk) => setIfFree(data, cx, cz, x, y, z, id, trunk);
        // Изредка среди живых деревьев стоит мёртвое — без единого листа.
        if (hash3(gx, 5, gz, this.seed + 12) < 0.05) placeDeadTree(kind, size, set, tx, h + 1, tz);
        else placeTree(kind, size, set, tx, h + 1, tz);
      }
    }
  }

  /** Ищет сушу поближе к центру мира, чтобы новые игроки не появлялись в океане. */
  findSpawn(): [number, number, number] {
    for (let r = 0; r < 600; r += 4) {
      const steps = Math.max(1, Math.floor((2 * Math.PI * r) / 8));
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const x = Math.round(Math.cos(a) * r);
        const z = Math.round(Math.sin(a) * r);
        const { height, biome } = this.column(x, z);
        if (height > SEA_LEVEL + 1 && biome !== Biome.MOUNTAINS) return [x + 0.5, height + 1, z + 0.5];
      }
    }
    return [0.5, this.column(0, 0).height + 1, 0.5];
  }
}

/** Ставит блок дерева, если клетка свободна (воздух, трава, цветы; ствол — и поверх листвы). */
export function canTreeReplace(cur: number, trunk: boolean): boolean {
  const t = typeOf(cur);
  if (t === Block.WATER || t === Block.LAVA) return false;
  return (
    REPLACEABLE[t] === 1 ||
    t === Block.DANDELION ||
    t === Block.POPPY ||
    t === Block.OAK_SAPLING ||
    t === Block.BIRCH_SAPLING ||
    t === Block.SPRUCE_SAPLING ||
    (trunk && (t === Block.OAK_LEAVES || t === Block.BIRCH_LEAVES || t === Block.SPRUCE_LEAVES))
  );
}

/** Можно ли поставить блок дерева id поверх cur (земля под стволом заменяет только траву). */
export function treeCanSet(cur: number, id: number, trunk: boolean): boolean {
  if (id === Block.DIRT) return typeOf(cur) === Block.GRASS || typeOf(cur) === Block.SNOWY_GRASS;
  return canTreeReplace(cur, trunk);
}

function setIfFree(data: Uint16Array, cx: number, cz: number, x: number, y: number, z: number, id: number, trunk: boolean): void {
  const lx = x - cx * CHUNK_SIZE;
  const lz = z - cz * CHUNK_SIZE;
  if (lx < 0 || lx >= CHUNK_SIZE || lz < 0 || lz >= CHUNK_SIZE || y < 0 || y >= WORLD_HEIGHT) return;
  const i = blockIndex(lx, y, lz);
  if (treeCanSet(data[i], id, trunk)) data[i] = id;
}

type SetBlock = (x: number, y: number, z: number, id: number, trunk: boolean) => void;

/** Мёртвое дерево: голый ствол и несколько сухих веток. */
function placeDeadTree(kind: TreeKind, size: number, set: SetBlock, tx: number, base: number, tz: number): void {
  const rnd = mulberry32(Math.floor(size * 1e9) ^ Math.imul(tx, 83492791) ^ Math.imul(tz, 2654435761 | 0));
  const log = kind === 'birch' ? Block.BIRCH_LOG : kind === 'spruce' ? Block.SPRUCE_LOG : Block.OAK_LOG;
  const trunk = 5 + Math.floor(size * 3);
  for (let dy = 0; dy < trunk; dy++) set(tx, base + dy, tz, log, true);
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const branches = 2 + Math.floor(rnd() * 3);
  for (let i = 0; i < branches; i++) {
    const [dx, dz] = dirs[Math.floor(rnd() * 4)];
    const y = base + trunk - 1 - Math.floor(rnd() * 3);
    const length = 1 + Math.floor(rnd() * 2);
    // Бревно лежит вдоль ветки: ось X или Z.
    const branch = makeState(log, dx !== 0 ? 1 : 2);
    for (let k = 1; k <= length; k++) set(tx + dx * k, y + (k === length && rnd() < 0.5 ? 1 : 0), tz + dz * k, branch, true);
  }
  set(tx, base - 1, tz, Block.DIRT, true);
}

/**
 * Рисует дерево через callback — используется и генератором мира, и ростом
 * саженцев на сервере. size — случайное число 0..1 для вариаций высоты.
 */
export function placeTree(kind: TreeKind, size: number, set: SetBlock, tx: number, base: number, tz: number): void {
  const rnd = mulberry32(Math.floor(size * 1e9) ^ Math.imul(tx, 73856093) ^ Math.imul(tz, 19349663));
  if (kind === 'spruce') {
    const trunk = 6 + Math.floor(size * 4);
    const radii = [0, 1, 1, 2, 1, 2, 3, 2, 3, 2];
    for (let i = 0; i < Math.min(radii.length, trunk - 1); i++) {
      const y = base + trunk - i;
      const r = radii[i];
      for (let dz = -r; dz <= r; dz++)
        for (let dx = -r; dx <= r; dx++) {
          if (Math.abs(dx) + Math.abs(dz) > r + (r > 1 ? 1 : 0)) continue;
          set(tx + dx, y, tz + dz, Block.SPRUCE_LEAVES, false);
        }
    }
    for (let dy = 0; dy < trunk; dy++) set(tx, base + dy, tz, Block.SPRUCE_LOG, true);
    set(tx, base - 1, tz, Block.DIRT, true);
    return;
  }
  const birch = kind === 'birch';
  const trunk = (birch ? 5 : 4) + Math.floor(size * 3);
  const log = birch ? Block.BIRCH_LOG : Block.OAK_LOG;
  const leaves = birch ? Block.BIRCH_LEAVES : Block.OAK_LEAVES;
  for (let dy = trunk - 3; dy <= trunk; dy++) {
    const radius = dy >= trunk - 1 ? 1 : 2;
    for (let dz = -radius; dz <= radius; dz++)
      for (let dx = -radius; dx <= radius; dx++) {
        const corner = Math.abs(dx) === radius && Math.abs(dz) === radius;
        if (corner && (dy === trunk || rnd() < 0.5)) continue;
        set(tx + dx, base + dy, tz + dz, leaves, false);
      }
  }
  for (let dy = 0; dy < trunk; dy++) set(tx, base + dy, tz, log, true);
  // Под стволом трава не растёт.
  set(tx, base - 1, tz, Block.DIRT, true);
}
