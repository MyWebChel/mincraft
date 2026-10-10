import {
  Block,
  FULL_CUBE,
  S_BED,
  S_CACTUS,
  S_CHEST,
  S_CROP,
  S_CROSS,
  S_CUBE,
  S_DOOR,
  S_FARMLAND,
  S_FENCE,
  S_FLUID,
  S_GATE,
  S_LADDER,
  S_NONE,
  S_PANE,
  S_SLAB,
  S_STAIRS,
  S_TORCH,
  S_TRAPDOOR,
  SHAPE,
  DIR_VEC,
  metaOf,
  typeOf,
} from './blocks';

/** Коробка внутри блока: [x0, y0, z0, x1, y1, z1] в долях блока. */
export type Box = [number, number, number, number, number, number];

/** Состояние соседа по смещению (нужно для заборов). */
export type NeighborFn = (dx: number, dy: number, dz: number) => number;

const FULL: Box = [0, 0, 0, 1, 1, 1];
const px = (v: number) => v / 16;

/** Поворот коробки вокруг центра блока на dir×90° по часовой стрелке (если смотреть сверху). */
export function rotateBox(b: Box, dir: number): Box {
  let [x0, y0, z0, x1, y1, z1] = b;
  for (let i = 0; i < (dir & 3); i++) {
    // (x, z) → (1 - z, x)
    const nx0 = 1 - z1;
    const nx1 = 1 - z0;
    z0 = x0;
    z1 = x1;
    x0 = nx0;
    x1 = nx1;
  }
  return [x0, y0, z0, x1, y1, z1];
}

/** Коробки двери. Базовая ориентация — дверь смотрит на север (метаданные: 0..3 поворот, 4 — открыта, 8 — верх). */
function doorBoxes(meta: number): Box[] {
  const t = px(3);
  const open = (meta & 4) !== 0;
  const closed: Box = [0, 0, 1 - t, 1, 1, 1];
  const opened: Box = [0, 0, 0, t, 1, 1];
  return [rotateBox(open ? opened : closed, meta & 3)];
}

function stairsBoxes(meta: number): Box[] {
  const upside = (meta & 4) !== 0;
  const base: Box = upside ? [0, 0.5, 0, 1, 1, 1] : [0, 0, 0, 1, 0.5, 1];
  const step: Box = upside ? [0, 0, 0, 1, 0.5, 0.5] : [0, 0.5, 0, 1, 1, 0.5];
  return [base, rotateBox(step, meta & 3)];
}

const fenceConnects = (state: number) => {
  const t = typeOf(state);
  return t === Block.OAK_FENCE || t === Block.OAK_FENCE_GATE || (FULL_CUBE[t] === 1 && SHAPE[t] === S_CUBE);
};

const paneConnects = (state: number) => {
  const t = typeOf(state);
  return t === Block.GLASS_PANE || t === Block.GLASS || (FULL_CUBE[t] === 1 && SHAPE[t] === S_CUBE);
};

/** Стеклянная панель: тонкий столбик и «рукава» к соседним панелям, стеклу и блокам. */
function paneBoxes(neighbor: NeighborFn | undefined): Box[] {
  const post: Box = [px(7), 0, px(7), px(9), 1, px(9)];
  const arms: Box[] = [];
  for (let dir = 0; dir < 4; dir++) {
    const [dx, , dz] = DIR_VEC[dir];
    if (neighbor && paneConnects(neighbor(dx, 0, dz))) arms.push(rotateBox([px(7), 0, 0, px(9), 1, px(7)], dir));
  }
  // Одинокая панель (и панель в руке) — крестом, чтобы её было видно.
  if (!arms.length) for (let dir = 0; dir < 4; dir++) arms.push(rotateBox([px(7), 0, 0, px(9), 1, px(7)], dir));
  return [post, ...arms];
}

/** Люк: закрытый лежит плитой 3/16 внизу или вверху блока, открытый стоит у стены с петлями. */
function trapdoorBoxes(meta: number): Box[] {
  const t = px(3);
  if (meta & 4) return [rotateBox([0, 0, 0, 1, 1, t], meta & 3)];
  return [meta & 8 ? [0, 1 - t, 0, 1, 1, 1] : [0, 0, 0, 1, t, 1]];
}

/** Калитка: два столбика и створки; открытая не мешает проходу. */
function gateBoxes(meta: number, collision: boolean): Box[] {
  const open = (meta & 4) !== 0;
  let boxes: Box[];
  if (collision) {
    if (open) return [];
    boxes = [[0, 0, px(6), 1, 1.5, px(10)]];
  } else if (!open) {
    boxes = [
      [0, px(5), px(7), px(2), 1, px(9)],
      [px(14), px(5), px(7), 1, 1, px(9)],
      [px(2), px(6), px(7), px(14), px(9), px(9)],
      [px(2), px(12), px(7), px(14), px(15), px(9)],
      [px(6), px(9), px(7), px(8), px(12), px(9)],
      [px(8), px(9), px(7), px(10), px(12), px(9)],
    ];
  } else {
    boxes = [
      [0, px(5), px(7), px(2), 1, px(9)],
      [px(14), px(5), px(7), 1, 1, px(9)],
      [0, px(6), px(9), px(2), px(9), px(15)],
      [0, px(12), px(9), px(2), px(15), px(15)],
      [px(14), px(6), px(9), 1, px(9), px(15)],
      [px(14), px(12), px(9), 1, px(15), px(15)],
    ];
  }
  // Калитка поперёк взгляда игрока: смотрел на север/юг — тянется вдоль X.
  return meta & 1 ? boxes.map((b) => rotateBox(b, 1)) : boxes;
}

function fenceBoxes(neighbor: NeighborFn | undefined, height: number, collision: boolean): Box[] {
  const post: Box = [px(6), 0, px(6), px(10), height, px(10)];
  const boxes: Box[] = [post];
  if (!neighbor) return boxes;
  for (let dir = 0; dir < 4; dir++) {
    const [dx, , dz] = DIR_VEC[dir];
    if (!fenceConnects(neighbor(dx, 0, dz))) continue;
    if (collision) {
      boxes.push(rotateBox([px(6), 0, 0, px(10), height, px(6)], dir));
    } else {
      boxes.push(rotateBox([px(7), px(12), 0, px(9), px(15), px(6)], dir));
      boxes.push(rotateBox([px(7), px(6), 0, px(9), px(9), px(6)], dir));
    }
  }
  return boxes;
}

/** Коробки для отрисовки «модельных» блоков. */
export function modelBoxes(state: number, neighbor?: NeighborFn): Box[] {
  const type = typeOf(state);
  const meta = metaOf(state);
  switch (SHAPE[type]) {
    case S_SLAB:
      return [meta & 1 ? [0, 0.5, 0, 1, 1, 1] : [0, 0, 0, 1, 0.5, 1]];
    case S_STAIRS:
      return stairsBoxes(meta);
    case S_DOOR:
      return doorBoxes(meta);
    case S_LADDER:
      return [rotateBox([0, 0, 0, 1, 1, px(1)], meta & 3)];
    case S_FENCE:
      return fenceBoxes(neighbor, 1, false);
    case S_BED:
      return [[0, 0, 0, 1, px(9), 1]];
    case S_FARMLAND:
      return [[0, 0, 0, 1, px(15), 1]];
    case S_CACTUS:
      return [[px(1), 0, px(1), px(15), 1, px(15)]];
    case S_CHEST:
      return [[px(1), 0, px(1), px(15), px(14), px(15)]];
    case S_PANE:
      return paneBoxes(neighbor);
    case S_TRAPDOOR:
      return trapdoorBoxes(meta);
    case S_GATE:
      return gateBoxes(meta, false);
    case S_CUBE:
      return [FULL];
    default:
      return [];
  }
}

/** Коробки столкновений. */
export function collisionBoxes(state: number, neighbor?: NeighborFn): Box[] {
  const type = typeOf(state);
  const shape = SHAPE[type];
  if (type === Block.AIR) return [];
  switch (shape) {
    case S_NONE:
    case S_CROSS:
    case S_CROP:
    case S_FLUID:
    case S_TORCH:
      return [];
    case S_LADDER:
      return [rotateBox([0, 0, 0, 1, 1, px(3)], metaOf(state) & 3)];
    case S_FENCE:
      return fenceBoxes(neighbor, 1.5, true);
    case S_GATE:
      return gateBoxes(metaOf(state), true);
    default:
      return modelBoxes(state, neighbor);
  }
}

/** Рамка выделения блока под прицелом (и область попадания луча). */
export function selectionBoxes(state: number, neighbor?: NeighborFn): Box[] {
  const type = typeOf(state);
  const meta = metaOf(state);
  switch (SHAPE[type]) {
    case S_NONE:
    case S_FLUID:
      return [];
    case S_CROSS:
      return [[px(2), 0, px(2), px(14), px(13), px(14)]];
    case S_CROP:
      return [[0, 0, 0, 1, px(2 + 2 * Math.min(7, meta & 7)), 1]];
    case S_TORCH: {
      if (meta === 0) return [[px(6), 0, px(6), px(10), px(10), px(10)]];
      return [rotateBox([px(5.5), px(3), 0, px(10.5), px(13), px(5)], (meta - 1) & 3)];
    }
    case S_LADDER:
      return [rotateBox([0, 0, 0, 1, 1, px(3)], meta & 3)];
    default:
      return modelBoxes(state, neighbor);
  }
}
