/**
 * Реестр блоков. Состояние блока хранится в 16 битах: младшие 10 бит — тип,
 * старшие 6 — метаданные (поворот, уровень жидкости, стадия роста и т.п.).
 */
export const META_SHIFT = 10;
export const TYPE_MASK = (1 << META_SHIFT) - 1;
export const typeOf = (state: number) => state & TYPE_MASK;
export const metaOf = (state: number) => state >>> META_SHIFT;
export const makeState = (type: number, meta = 0) => (type | (meta << META_SHIFT)) & 0xffff;

export type Shape =
  | 'none'
  | 'cube'
  | 'cross'
  | 'crop'
  | 'fluid'
  | 'torch'
  | 'slab'
  | 'stairs'
  | 'door'
  | 'ladder'
  | 'fence'
  | 'bed'
  | 'farmland'
  | 'cactus'
  | 'chest'
  | 'pane'
  | 'trapdoor'
  | 'gate';
export type Layer = 'opaque' | 'cutout' | 'translucent';
export type SoundGroup = 'stone' | 'wood' | 'gravel' | 'grass' | 'sand' | 'glass' | 'wool' | 'snow' | 'metal';
export type ToolType = 'pickaxe' | 'axe' | 'shovel' | 'hoe' | 'sword' | 'shears';

/** Стороны света для метаданных поворота: 0 — север (-Z), 1 — восток (+X), 2 — юг (+Z), 3 — запад (-X). */
export const DIR_VEC: readonly [number, number, number][] = [
  [0, 0, -1],
  [1, 0, 0],
  [0, 0, 1],
  [-1, 0, 0],
];
/** Индекс грани (+X, -X, +Y, -Y, +Z, -Z) для каждой стороны света. */
export const DIR_FACE = [5, 0, 4, 1];
export const opposite = (dir: number) => (dir + 2) & 3;

export interface BlockDef {
  key: string;
  name: string;
  shape: Shape;
  layer: Layer;
  /** Игрок и мобы сталкиваются с блоком. */
  solid: boolean;
  /** Непрозрачный полный куб: скрывает соседние грани и даёт затенение (AO). */
  fullCube: boolean;
  /** Насколько блок гасит свет (0 — прозрачный, 15 — непрозрачный). */
  opacity: number;
  /** Собственное свечение 0..15. */
  light: number;
  /** Время добычи в условных единицах Minecraft; -1 — неразрушимый. */
  hardness: number;
  tool: ToolType | null;
  /** Минимальный уровень инструмента для дропа (-1 — выпадает всегда). */
  harvestLevel: number;
  sound: SoundGroup;
  /** На это место можно сразу поставить другой блок (воздух, трава, жидкость). */
  replaceable: boolean;
  /** Падает, если под ним пусто (песок, гравий). */
  gravity: boolean;
  climbable: boolean;
  /** Колыхание на ветру: 1 — листва, 2 — растения. */
  wave: number;
  /** Не рисовать грани между одинаковыми блоками (стекло, лёд). */
  cullSame: boolean;
  /** Текстура грани (+X, -X, +Y, -Y, +Z, -Z) с учётом метаданных. */
  tiles: (meta: number, face: number) => string;
  /** Поворот UV верхней грани (кровать). */
  topRotation?: (meta: number) => number;
  /** Предмет, который соответствует блоку (для «взять блок» колесиком). */
  item: number | null;
}

export const Block = {
  AIR: 0,
  STONE: 1,
  GRASS: 2,
  DIRT: 3,
  COBBLESTONE: 4,
  OAK_PLANKS: 5,
  BIRCH_PLANKS: 6,
  SPRUCE_PLANKS: 7,
  OAK_LOG: 8,
  BIRCH_LOG: 9,
  SPRUCE_LOG: 10,
  OAK_LEAVES: 11,
  BIRCH_LEAVES: 12,
  SPRUCE_LEAVES: 13,
  SAND: 14,
  GRAVEL: 15,
  SANDSTONE: 16,
  GLASS: 17,
  BEDROCK: 18,
  WATER: 19,
  LAVA: 20,
  COAL_ORE: 21,
  IRON_ORE: 22,
  GOLD_ORE: 23,
  DIAMOND_ORE: 24,
  SNOW_BLOCK: 25,
  SNOWY_GRASS: 26,
  ICE: 27,
  CACTUS: 28,
  TALL_GRASS: 29,
  DANDELION: 30,
  POPPY: 31,
  DEAD_BUSH: 32,
  BRICKS: 33,
  STONE_BRICKS: 34,
  MOSSY_COBBLESTONE: 35,
  OBSIDIAN: 36,
  BOOKSHELF: 37,
  GLOWSTONE: 38,
  WHITE_WOOL: 39,
  RED_WOOL: 40,
  PINK_WOOL: 41,
  YELLOW_WOOL: 42,
  GREEN_WOOL: 43,
  BLUE_WOOL: 44,
  PURPLE_WOOL: 45,
  BLACK_WOOL: 46,
  CRAFTING_TABLE: 47,
  FURNACE: 48,
  LIT_FURNACE: 49,
  CHEST: 50,
  TORCH: 51,
  LADDER: 52,
  OAK_DOOR: 53,
  OAK_FENCE: 54,
  OAK_SLAB: 55,
  COBBLESTONE_SLAB: 56,
  STONE_SLAB: 57,
  OAK_STAIRS: 58,
  COBBLESTONE_STAIRS: 59,
  STONE_BRICK_STAIRS: 60,
  BED: 61,
  FARMLAND: 62,
  WHEAT: 63,
  OAK_SAPLING: 64,
  BIRCH_SAPLING: 65,
  SPRUCE_SAPLING: 66,
  TNT: 67,
  IRON_BLOCK: 68,
  GOLD_BLOCK: 69,
  DIAMOND_BLOCK: 70,
  GLASS_PANE: 71,
  OAK_TRAPDOOR: 72,
  OAK_FENCE_GATE: 73,
  PUMPKIN: 74,
  JACK_O_LANTERN: 75,
  SUGAR_CANE: 76,
} as const;

/** Идентификаторы предметов, которые ставят блоки, но сами блоками не являются. */
export const ITEM_OAK_DOOR = 286;
export const ITEM_BED = 287;
export const ITEM_WHEAT_SEEDS = 273;

type Faces = (meta: number, face: number) => string;

const all = (t: string): Faces => () => t;
/** Колонна: верх/низ отличаются от боков. */
const column =
  (side: string, top: string, bottom = top): Faces =>
  (_m, f) =>
    f === 2 ? top : f === 3 ? bottom : side;
/** Брёвна: ось ствола в метаданных (0 — вертикально, 1 — вдоль X, 2 — вдоль Z). */
const log =
  (side: string, top: string): Faces =>
  (m, f) => {
    const axis = m & 3;
    const end = axis === 1 ? f <= 1 : axis === 2 ? f >= 4 : f === 2 || f === 3;
    return end ? top : side;
  };
/** Блок с «лицом» в сторону метаданных (печка, сундук). */
const facing =
  (front: string, side: string, top: string, bottom = top): Faces =>
  (m, f) =>
    f === 2 ? top : f === 3 ? bottom : f === DIR_FACE[m & 3] ? front : side;

const defaults: Omit<BlockDef, 'key' | 'name' | 'tiles' | 'item'> = {
  shape: 'cube',
  layer: 'opaque',
  solid: true,
  fullCube: true,
  opacity: 15,
  light: 0,
  hardness: 1,
  tool: null,
  harvestLevel: -1,
  sound: 'stone',
  replaceable: false,
  gravity: false,
  climbable: false,
  wave: 0,
  cullSame: false,
};

const DEFS: BlockDef[] = [];

function def(id: number, key: string, name: string, tiles: Faces, props: Partial<BlockDef> = {}): void {
  const d: BlockDef = { ...defaults, key, name, tiles, item: id, ...props };
  if (d.shape !== 'cube' || d.layer !== 'opaque') {
    if (props.fullCube === undefined) d.fullCube = false;
  }
  if (!d.fullCube && props.opacity === undefined) d.opacity = 0;
  DEFS[id] = d;
}

const plant = (props: Partial<BlockDef> = {}): Partial<BlockDef> => ({
  shape: 'cross',
  layer: 'cutout',
  solid: false,
  hardness: 0,
  sound: 'grass',
  wave: 2,
  ...props,
});
const leaves: Partial<BlockDef> = { layer: 'cutout', opacity: 1, hardness: 0.2, tool: 'shears', sound: 'grass', wave: 1 };
const wood: Partial<BlockDef> = { hardness: 2, tool: 'axe', sound: 'wood' };
const rock = (hardness: number, level = 0): Partial<BlockDef> => ({ hardness, tool: 'pickaxe', harvestLevel: level, sound: 'stone' });
const wool: Partial<BlockDef> = { hardness: 0.8, tool: 'shears', sound: 'wool' };

def(Block.AIR, 'air', 'Воздух', all(''), {
  shape: 'none',
  solid: false,
  fullCube: false,
  hardness: 0,
  replaceable: true,
  item: null,
});
def(Block.STONE, 'stone', 'Камень', all('stone'), rock(1.5));
def(Block.GRASS, 'grass', 'Дёрн', column('grass_side', 'grass_top', 'dirt'), { hardness: 0.6, tool: 'shovel', sound: 'grass' });
def(Block.DIRT, 'dirt', 'Земля', all('dirt'), { hardness: 0.5, tool: 'shovel', sound: 'gravel' });
def(Block.COBBLESTONE, 'cobblestone', 'Булыжник', all('cobblestone'), rock(2));
def(Block.OAK_PLANKS, 'oak_planks', 'Дубовые доски', all('oak_planks'), wood);
def(Block.BIRCH_PLANKS, 'birch_planks', 'Берёзовые доски', all('birch_planks'), wood);
def(Block.SPRUCE_PLANKS, 'spruce_planks', 'Еловые доски', all('spruce_planks'), wood);
def(Block.OAK_LOG, 'oak_log', 'Дубовое бревно', log('oak_log', 'oak_log_top'), wood);
def(Block.BIRCH_LOG, 'birch_log', 'Берёзовое бревно', log('birch_log', 'birch_log_top'), wood);
def(Block.SPRUCE_LOG, 'spruce_log', 'Еловое бревно', log('spruce_log', 'spruce_log_top'), wood);
def(Block.OAK_LEAVES, 'oak_leaves', 'Дубовая листва', all('oak_leaves'), leaves);
def(Block.BIRCH_LEAVES, 'birch_leaves', 'Берёзовая листва', all('birch_leaves'), leaves);
def(Block.SPRUCE_LEAVES, 'spruce_leaves', 'Еловая хвоя', all('spruce_leaves'), leaves);
def(Block.SAND, 'sand', 'Песок', all('sand'), { hardness: 0.5, tool: 'shovel', sound: 'sand', gravity: true });
def(Block.GRAVEL, 'gravel', 'Гравий', all('gravel'), { hardness: 0.6, tool: 'shovel', sound: 'gravel', gravity: true });
def(Block.SANDSTONE, 'sandstone', 'Песчаник', column('sandstone_side', 'sandstone_top', 'sandstone_bottom'), rock(0.8));
def(Block.GLASS, 'glass', 'Стекло', all('glass'), { layer: 'cutout', hardness: 0.3, sound: 'glass', cullSame: true });
def(Block.BEDROCK, 'bedrock', 'Коренная порода', all('bedrock'), { hardness: -1 });
def(Block.WATER, 'water', 'Вода', (m, f) => (f === 2 && !(m & 8) && (m & 7) === 0 ? 'water_still' : 'water_flow'), {
  shape: 'fluid',
  layer: 'translucent',
  solid: false,
  opacity: 2,
  hardness: -1,
  replaceable: true,
  item: null,
});
def(Block.LAVA, 'lava', 'Лава', (m, f) => (f === 2 && !(m & 8) && (m & 7) === 0 ? 'lava_still' : 'lava_flow'), {
  shape: 'fluid',
  layer: 'opaque',
  solid: false,
  opacity: 1,
  light: 15,
  hardness: -1,
  replaceable: true,
  item: null,
});
def(Block.COAL_ORE, 'coal_ore', 'Угольная руда', all('coal_ore'), rock(3, 0));
def(Block.IRON_ORE, 'iron_ore', 'Железная руда', all('iron_ore'), rock(3, 1));
def(Block.GOLD_ORE, 'gold_ore', 'Золотая руда', all('gold_ore'), rock(3, 2));
def(Block.DIAMOND_ORE, 'diamond_ore', 'Алмазная руда', all('diamond_ore'), rock(3, 2));
def(Block.SNOW_BLOCK, 'snow_block', 'Снег', all('snow'), { hardness: 0.2, tool: 'shovel', sound: 'snow' });
def(Block.SNOWY_GRASS, 'snowy_grass', 'Заснеженный дёрн', column('snowy_grass_side', 'snow', 'dirt'), {
  hardness: 0.6,
  tool: 'shovel',
  sound: 'snow',
});
def(Block.ICE, 'ice', 'Лёд', all('ice'), { layer: 'translucent', opacity: 2, hardness: 0.5, tool: 'pickaxe', sound: 'glass', cullSame: true });
def(Block.CACTUS, 'cactus', 'Кактус', column('cactus_side', 'cactus_top', 'cactus_bottom'), {
  shape: 'cactus',
  layer: 'cutout',
  hardness: 0.4,
  sound: 'wool',
});
def(Block.TALL_GRASS, 'tall_grass', 'Высокая трава', all('tall_grass'), plant({ replaceable: true }));
def(Block.DANDELION, 'dandelion', 'Одуванчик', all('dandelion'), plant());
def(Block.POPPY, 'poppy', 'Мак', all('poppy'), plant());
def(Block.DEAD_BUSH, 'dead_bush', 'Сухой куст', all('dead_bush'), plant({ replaceable: true, wave: 0 }));
def(Block.BRICKS, 'bricks', 'Кирпичи', all('bricks'), rock(2));
def(Block.STONE_BRICKS, 'stone_bricks', 'Каменные кирпичи', all('stone_bricks'), rock(1.5));
def(Block.MOSSY_COBBLESTONE, 'mossy_cobblestone', 'Замшелый булыжник', all('mossy_cobblestone'), rock(2));
def(Block.OBSIDIAN, 'obsidian', 'Обсидиан', all('obsidian'), rock(50, 3));
def(Block.BOOKSHELF, 'bookshelf', 'Книжная полка', column('bookshelf', 'oak_planks'), { ...wood, hardness: 1.5 });
def(Block.GLOWSTONE, 'glowstone', 'Светокамень', all('glowstone'), { hardness: 0.3, sound: 'glass', light: 15 });
def(Block.WHITE_WOOL, 'white_wool', 'Белая шерсть', all('wool_white'), wool);
def(Block.RED_WOOL, 'red_wool', 'Красная шерсть', all('wool_red'), wool);
def(Block.PINK_WOOL, 'pink_wool', 'Розовая шерсть', all('wool_pink'), wool);
def(Block.YELLOW_WOOL, 'yellow_wool', 'Жёлтая шерсть', all('wool_yellow'), wool);
def(Block.GREEN_WOOL, 'green_wool', 'Зелёная шерсть', all('wool_green'), wool);
def(Block.BLUE_WOOL, 'blue_wool', 'Синяя шерсть', all('wool_blue'), wool);
def(Block.PURPLE_WOOL, 'purple_wool', 'Фиолетовая шерсть', all('wool_purple'), wool);
def(Block.BLACK_WOOL, 'black_wool', 'Чёрная шерсть', all('wool_black'), wool);
def(
  Block.CRAFTING_TABLE,
  'crafting_table',
  'Верстак',
  (_m, f) => (f === 2 ? 'crafting_table_top' : f === 3 ? 'oak_planks' : f >= 4 ? 'crafting_table_front' : 'crafting_table_side'),
  { ...wood, hardness: 2.5 },
);
def(Block.FURNACE, 'furnace', 'Печь', facing('furnace_front', 'furnace_side', 'furnace_top'), rock(3.5));
def(Block.LIT_FURNACE, 'lit_furnace', 'Горящая печь', facing('furnace_front_lit', 'furnace_side', 'furnace_top'), {
  ...rock(3.5),
  light: 13,
  item: Block.FURNACE,
});
def(Block.CHEST, 'chest', 'Сундук', facing('chest_front', 'chest_side', 'chest_top'), { ...wood, shape: 'chest', hardness: 2.5 });
def(Block.TORCH, 'torch', 'Факел', all('torch'), {
  shape: 'torch',
  layer: 'cutout',
  solid: false,
  hardness: 0,
  light: 14,
  sound: 'wood',
});
def(Block.LADDER, 'ladder', 'Лестница', all('ladder'), {
  shape: 'ladder',
  layer: 'cutout',
  hardness: 0.4,
  tool: 'axe',
  sound: 'wood',
  climbable: true,
});
def(Block.OAK_DOOR, 'oak_door', 'Дубовая дверь', (m) => (m & 8 ? 'door_top' : 'door_bottom'), {
  ...wood,
  shape: 'door',
  layer: 'cutout',
  hardness: 3,
  item: ITEM_OAK_DOOR,
});
def(Block.OAK_FENCE, 'oak_fence', 'Дубовый забор', all('oak_planks'), { ...wood, shape: 'fence' });
def(Block.OAK_SLAB, 'oak_slab', 'Дубовая плита', all('oak_planks'), { ...wood, shape: 'slab' });
def(Block.COBBLESTONE_SLAB, 'cobblestone_slab', 'Булыжная плита', all('cobblestone'), { ...rock(2), shape: 'slab' });
def(Block.STONE_SLAB, 'stone_slab', 'Каменная плита', column('stone_slab_side', 'stone_slab_top'), { ...rock(2), shape: 'slab' });
def(Block.OAK_STAIRS, 'oak_stairs', 'Дубовые ступеньки', all('oak_planks'), { ...wood, shape: 'stairs' });
def(Block.COBBLESTONE_STAIRS, 'cobblestone_stairs', 'Булыжные ступеньки', all('cobblestone'), { ...rock(2), shape: 'stairs' });
def(Block.STONE_BRICK_STAIRS, 'stone_brick_stairs', 'Ступеньки из каменных кирпичей', all('stone_bricks'), {
  ...rock(1.5),
  shape: 'stairs',
});
def(
  Block.BED,
  'bed',
  'Кровать',
  (m, f) => {
    const head = (m & 4) !== 0;
    const dir = m & 3;
    if (f === 2) return head ? 'bed_head_top' : 'bed_foot_top';
    if (f === 3) return 'oak_planks';
    // Торцы кровати: изголовье смотрит по направлению dir, изножье — в обратную сторону.
    if (f === DIR_FACE[dir]) return head ? 'bed_head_end' : 'bed_foot_side';
    if (f === DIR_FACE[opposite(dir)]) return head ? 'bed_head_side' : 'bed_foot_end';
    return head ? 'bed_head_side' : 'bed_foot_side';
  },
  { shape: 'bed', layer: 'cutout', hardness: 0.2, sound: 'wood', item: ITEM_BED, topRotation: (m) => m & 3 },
);
def(Block.FARMLAND, 'farmland', 'Грядка', column('dirt', 'farmland_top', 'dirt'), {
  shape: 'farmland',
  hardness: 0.6,
  tool: 'shovel',
  sound: 'gravel',
  item: Block.DIRT,
});
def(Block.WHEAT, 'wheat', 'Пшеница', (m) => `wheat_${Math.min(7, m & 7)}`, {
  ...plant(),
  shape: 'crop',
  item: ITEM_WHEAT_SEEDS,
});
def(Block.OAK_SAPLING, 'oak_sapling', 'Саженец дуба', all('oak_sapling'), plant());
def(Block.BIRCH_SAPLING, 'birch_sapling', 'Саженец берёзы', all('birch_sapling'), plant());
def(Block.SPRUCE_SAPLING, 'spruce_sapling', 'Саженец ели', all('spruce_sapling'), plant());
def(Block.TNT, 'tnt', 'Динамит', column('tnt_side', 'tnt_top', 'tnt_bottom'), { hardness: 0, sound: 'grass' });
def(Block.IRON_BLOCK, 'iron_block', 'Железный блок', all('iron_block'), { ...rock(5, 1), sound: 'metal' });
def(Block.GOLD_BLOCK, 'gold_block', 'Золотой блок', all('gold_block'), { ...rock(3, 2), sound: 'metal' });
def(Block.DIAMOND_BLOCK, 'diamond_block', 'Алмазный блок', all('diamond_block'), { ...rock(5, 2), sound: 'metal' });
def(Block.GLASS_PANE, 'glass_pane', 'Стеклянная панель', (_m, f) => (f === 2 || f === 3 ? 'glass_pane_top' : 'glass'), {
  shape: 'pane',
  layer: 'cutout',
  hardness: 0.3,
  sound: 'glass',
});
/** Люк: 0..3 — сторона петель, 4 — открыт, 8 — в верхней половине блока. */
def(Block.OAK_TRAPDOOR, 'oak_trapdoor', 'Дубовый люк', all('trapdoor'), { ...wood, shape: 'trapdoor', layer: 'cutout', hardness: 3 });
/** Калитка: 0..3 — куда смотрел игрок, 4 — открыта. */
def(Block.OAK_FENCE_GATE, 'oak_fence_gate', 'Дубовая калитка', all('oak_planks'), { ...wood, shape: 'gate' });
def(Block.PUMPKIN, 'pumpkin', 'Тыква', facing('pumpkin_face', 'pumpkin_side', 'pumpkin_top'), { hardness: 1, tool: 'axe', sound: 'wood' });
def(Block.JACK_O_LANTERN, 'jack_o_lantern', 'Светильник Джека', facing('jack_o_lantern', 'pumpkin_side', 'pumpkin_top'), {
  hardness: 1,
  tool: 'axe',
  sound: 'wood',
  light: 15,
});
def(Block.SUGAR_CANE, 'sugar_cane', 'Сахарный тростник', all('sugar_cane'), plant({ wave: 0 }));

export const BLOCK_COUNT = DEFS.length;
export const BLOCKS: readonly BlockDef[] = DEFS;

export const SHAPE_CODES: Shape[] = [
  'none',
  'cube',
  'cross',
  'crop',
  'fluid',
  'torch',
  'slab',
  'stairs',
  'door',
  'ladder',
  'fence',
  'bed',
  'farmland',
  'cactus',
  'chest',
  'pane',
  'trapdoor',
  'gate',
];
export const S_NONE = 0;
export const S_CUBE = 1;
export const S_CROSS = 2;
export const S_CROP = 3;
export const S_FLUID = 4;
export const S_TORCH = 5;
export const S_SLAB = 6;
export const S_STAIRS = 7;
export const S_DOOR = 8;
export const S_LADDER = 9;
export const S_FENCE = 10;
export const S_BED = 11;
export const S_FARMLAND = 12;
export const S_CACTUS = 13;
export const S_CHEST = 14;
export const S_PANE = 15;
export const S_TRAPDOOR = 16;
export const S_GATE = 17;

export const L_OPAQUE = 0;
export const L_CUTOUT = 1;
export const L_TRANSLUCENT = 2;

/** Текстуры с повышенной яркостью (для эффекта свечения). */
const GLOW_TILE_NAMES = new Set(['glowstone', 'lava_still', 'lava_flow', 'furnace_front_lit', 'torch', 'jack_o_lantern']);

/** Дополнительные текстуры, которые не принадлежат конкретным граням. */
const EXTRA_TILES = ['water_still', 'water_flow', 'lava_still', 'lava_flow', ...Array.from({ length: 10 }, (_, i) => `destroy_${i}`)];

export const TILE_NAMES: string[] = [];
const tileIndex = new Map<string, number>();
const addTile = (t: string) => {
  if (!t || tileIndex.has(t)) return;
  tileIndex.set(t, TILE_NAMES.length);
  TILE_NAMES.push(t);
};
for (const d of DEFS) for (let m = 0; m < 64; m++) for (let f = 0; f < 6; f++) addTile(d.tiles(m, f));
EXTRA_TILES.forEach(addTile);

export const tileId = (name: string): number => tileIndex.get(name) ?? 0;

// Плоские таблицы для горячих циклов (мешер, свет, физика).
export const SHAPE = new Uint8Array(BLOCK_COUNT);
export const LAYER = new Uint8Array(BLOCK_COUNT);
export const SOLID = new Uint8Array(BLOCK_COUNT);
export const FULL_CUBE = new Uint8Array(BLOCK_COUNT);
export const OPACITY = new Uint8Array(BLOCK_COUNT);
export const EMISSION = new Uint8Array(BLOCK_COUNT);
export const WAVE = new Uint8Array(BLOCK_COUNT);
export const CULL_SAME = new Uint8Array(BLOCK_COUNT);
export const REPLACEABLE = new Uint8Array(BLOCK_COUNT);
/** Текстура грани: [тип * 384 + мета * 6 + грань]. */
export const FACE_TILE = new Uint8Array(BLOCK_COUNT * 64 * 6);
export const TOP_ROTATION = new Uint8Array(BLOCK_COUNT * 64);
export const GLOW_TILE = new Uint8Array(TILE_NAMES.length);

DEFS.forEach((d, id) => {
  SHAPE[id] = SHAPE_CODES.indexOf(d.shape);
  LAYER[id] = d.layer === 'opaque' ? L_OPAQUE : d.layer === 'cutout' ? L_CUTOUT : L_TRANSLUCENT;
  SOLID[id] = d.solid ? 1 : 0;
  FULL_CUBE[id] = d.fullCube ? 1 : 0;
  OPACITY[id] = d.opacity;
  EMISSION[id] = d.light;
  WAVE[id] = d.wave;
  CULL_SAME[id] = d.cullSame ? 1 : 0;
  REPLACEABLE[id] = d.replaceable ? 1 : 0;
  for (let m = 0; m < 64; m++) {
    for (let f = 0; f < 6; f++) FACE_TILE[id * 384 + m * 6 + f] = tileId(d.tiles(m, f));
    TOP_ROTATION[id * 64 + m] = d.topRotation ? d.topRotation(m) & 3 : 0;
  }
});
TILE_NAMES.forEach((t, i) => (GLOW_TILE[i] = GLOW_TILE_NAMES.has(t) ? 1 : 0));

export const isWater = (state: number) => typeOf(state) === Block.WATER;
export const isLava = (state: number) => typeOf(state) === Block.LAVA;
export const isFluid = (state: number) => SHAPE[typeOf(state)] === S_FLUID;
export const isValidState = (state: unknown): state is number =>
  Number.isInteger(state) && (state as number) >= 0 && (state as number) <= 0xffff && typeOf(state as number) < BLOCK_COUNT;

/** Уровень жидкости: 0 — источник, 1..7 — растекающаяся, флаг 8 — падающая. */
export const fluidLevel = (state: number) => metaOf(state) & 7;
export const fluidFalling = (state: number) => (metaOf(state) & 8) !== 0;

/** Высота поверхности жидкости в блоке (0..1). */
export function fluidHeight(state: number): number {
  if (fluidFalling(state)) return 1;
  const level = fluidLevel(state);
  return level === 0 ? 0.875 : Math.max(0.12, ((8 - level) / 9) * 0.95);
}

/** Плиты, из которых собирается двойной (полный) блок. */
export const SLAB_DOUBLE: Partial<Record<number, number>> = {
  [Block.OAK_SLAB]: Block.OAK_PLANKS,
  [Block.COBBLESTONE_SLAB]: Block.COBBLESTONE,
  [Block.STONE_SLAB]: Block.STONE,
};

/** Тростник растёт на земле, траве или песке у воды — или на другом тростнике. */
export function sugarCaneSupported(get: (x: number, y: number, z: number) => number, x: number, y: number, z: number): boolean {
  const bt = typeOf(get(x, y - 1, z));
  if (bt === Block.SUGAR_CANE) return true;
  if (bt !== Block.GRASS && bt !== Block.DIRT && bt !== Block.SAND && bt !== Block.SNOWY_GRASS) return false;
  for (const [dx, , dz] of DIR_VEC) if (isWater(get(x + dx, y - 1, z + dz))) return true;
  return false;
}
