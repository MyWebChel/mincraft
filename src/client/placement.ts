import {
  BLOCKS,
  Block,
  DIR_VEC,
  FULL_CUBE,
  REPLACEABLE,
  SHAPE,
  SLAB_DOUBLE,
  S_BED,
  S_DOOR,
  S_GATE,
  S_LADDER,
  S_SLAB,
  S_STAIRS,
  S_TORCH,
  S_TRAPDOOR,
  TYPE_MASK,
  makeState,
  metaOf,
  opposite,
  sugarCaneSupported,
  typeOf,
} from '../shared/blocks';
import { itemDef } from '../shared/items';
import type { RayHit } from './raycast';

type Getter = (x: number, y: number, z: number) => number;

/** Направление взгляда игрока по сторонам света: 0 — север (-Z), 1 — восток, 2 — юг, 3 — запад. */
export function facingDir(yaw: number): number {
  const fx = -Math.sin(yaw);
  const fz = -Math.cos(yaw);
  if (Math.abs(fx) > Math.abs(fz)) return fx > 0 ? 1 : 3;
  return fz > 0 ? 2 : 0;
}

/** Сторона света по нормали грани (только горизонтальные). */
function dirOfNormal(nx: number, nz: number): number {
  if (nx > 0) return 1;
  if (nx < 0) return 3;
  if (nz > 0) return 2;
  return 0;
}

export interface Placement {
  x: number;
  y: number;
  z: number;
  state: number;
}

/** Куда и в каком состоянии ставится блок из предмета, если кликнуть по грани. */
export function computePlacement(itemId: number, hit: RayHit, yaw: number, getState: Getter): Placement | null {
  const def = itemDef(itemId);
  if (!def?.places) return null;
  const type = typeOf(def.places);
  const shape = SHAPE[type];
  const hitType = hit.state & TYPE_MASK;
  const dir = facingDir(yaw);
  const fy = hit.py - Math.floor(hit.py);

  // Плита на плиту того же вида — двойной блок.
  if (shape === S_SLAB && hitType === type) {
    const half = metaOf(hit.state) & 1;
    if ((hit.ny === 1 && half === 0) || (hit.ny === -1 && half === 1)) {
      return { x: hit.x, y: hit.y, z: hit.z, state: makeState(SLAB_DOUBLE[type] ?? type) };
    }
  }

  let x = hit.x + hit.nx;
  let y = hit.y + hit.ny;
  let z = hit.z + hit.nz;
  if (REPLACEABLE[hitType] && hitType !== Block.AIR) {
    x = hit.x;
    y = hit.y;
    z = hit.z;
  }
  const cur = getState(x, y, z);
  const curType = typeOf(cur);
  if (shape === S_SLAB && curType === type) {
    return { x, y, z, state: makeState(SLAB_DOUBLE[type] ?? type) };
  }
  if (!REPLACEABLE[curType]) return null;

  let meta = 0;
  switch (type) {
    case Block.OAK_LOG:
    case Block.BIRCH_LOG:
    case Block.SPRUCE_LOG:
      meta = hit.nx !== 0 ? 1 : hit.nz !== 0 ? 2 : 0;
      break;
    case Block.FURNACE:
    case Block.CHEST:
    case Block.PUMPKIN:
    case Block.JACK_O_LANTERN:
      meta = opposite(dir);
      break;
    default:
      break;
  }

  switch (shape) {
    case S_SLAB:
      meta = hit.ny === -1 || (hit.ny === 0 && fy > 0.5) ? 1 : 0;
      break;
    case S_STAIRS:
      meta = dir | (hit.ny === -1 || (hit.ny === 0 && fy > 0.5) ? 4 : 0);
      break;
    case S_TORCH: {
      if (hit.ny === -1) return null;
      if (hit.ny === 1) {
        if (!FULL_CUBE[typeOf(getState(x, y - 1, z))]) return null;
        meta = 0;
      } else {
        // Факел крепится к стене, по которой кликнули.
        meta = 1 + opposite(dirOfNormal(hit.nx, hit.nz));
        if (!FULL_CUBE[hitType]) return null;
      }
      break;
    }
    case S_LADDER:
      if (hit.ny !== 0 || !FULL_CUBE[hitType]) return null;
      meta = opposite(dirOfNormal(hit.nx, hit.nz));
      break;
    case S_DOOR:
      meta = dir;
      if (!REPLACEABLE[typeOf(getState(x, y + 1, z))]) return null;
      if (!BLOCKS[typeOf(getState(x, y - 1, z))].fullCube) return null;
      break;
    case S_TRAPDOOR:
      // На стену — петли к стене (и верх/низ по точке клика), на пол или потолок — к игроку.
      if (hit.ny === 0) meta = opposite(dirOfNormal(hit.nx, hit.nz)) | (fy > 0.5 ? 8 : 0);
      else meta = opposite(dir) | (hit.ny === -1 ? 8 : 0);
      break;
    case S_GATE:
      meta = dir;
      break;
    case S_BED: {
      meta = dir;
      const [dx, , dz] = DIR_VEC[dir];
      if (!REPLACEABLE[typeOf(getState(x + dx, y, z + dz))]) return null;
      if (!BLOCKS[typeOf(getState(x, y - 1, z))].solid || !BLOCKS[typeOf(getState(x + dx, y - 1, z + dz))].solid) return null;
      break;
    }
  }
  // Семена — только на грядку, тростник — у воды.
  if (type === Block.WHEAT && typeOf(getState(x, y - 1, z)) !== Block.FARMLAND) return null;
  if (type === Block.SUGAR_CANE && !sugarCaneSupported(getState, x, y, z)) return null;
  return { x, y, z, state: makeState(type, meta) };
}

/** Можно ли кликом ПКМ «использовать» блок (открыть, переключить). */
export function isInteractive(state: number): boolean {
  const t = typeOf(state);
  return (
    t === Block.CRAFTING_TABLE ||
    t === Block.CHEST ||
    t === Block.FURNACE ||
    t === Block.LIT_FURNACE ||
    t === Block.OAK_DOOR ||
    t === Block.OAK_TRAPDOOR ||
    t === Block.OAK_FENCE_GATE ||
    t === Block.BED
  );
}

/** Вторая половина двухблочных объектов при локальном (предсказанном) размещении. */
export function companionBlocks(p: Placement): Placement[] {
  const t = typeOf(p.state);
  const meta = metaOf(p.state);
  if (t === Block.OAK_DOOR) return [{ x: p.x, y: p.y + 1, z: p.z, state: makeState(Block.OAK_DOOR, (meta & 3) | 8) }];
  if (t === Block.BED) {
    const [dx, , dz] = DIR_VEC[meta & 3];
    return [{ x: p.x + dx, y: p.y, z: p.z + dz, state: makeState(Block.BED, (meta & 3) | 4) }];
  }
  return [];
}
