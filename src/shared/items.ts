import { BLOCKS, BLOCK_COUNT, Block, ITEM_BED, ITEM_OAK_DOOR, ITEM_WHEAT_SEEDS, makeState, type ToolType } from './blocks';

/**
 * Реестр предметов. Предметы с id < 256 — это блоки (id совпадает с типом блока),
 * остальные — обычные предметы: инструменты, еда, ресурсы, броня.
 */
export interface ToolInfo {
  type: ToolType;
  /** Уровень: 0 — дерево/золото, 1 — камень, 2 — железо, 3 — алмаз. */
  level: number;
  /** Множитель скорости добычи подходящих блоков. */
  speed: number;
}

export interface ArmorInfo {
  /** 0 — шлем, 1 — нагрудник, 2 — поножи, 3 — ботинки. */
  slot: number;
  points: number;
  /** Цвет брони на модели игрока. */
  color: string;
}

export interface ItemDef {
  id: number;
  key: string;
  name: string;
  maxStack: number;
  /** Состояние блока, который ставит предмет. */
  places?: number;
  /** Имя спрайта (для предметов-не-блоков). */
  sprite?: string;
  tool?: ToolInfo;
  /** Урон при ударе (по умолчанию 1 — рукой). */
  damage?: number;
  durability?: number;
  food?: { hunger: number; saturation: number };
  armor?: ArmorInfo;
  /** Время горения в печи, тиков. */
  fuel?: number;
  /** Скрыт в творческом инвентаре. */
  hidden?: boolean;
}

export const Item = {
  STICK: 256,
  COAL: 257,
  CHARCOAL: 258,
  IRON_INGOT: 259,
  GOLD_INGOT: 260,
  DIAMOND: 261,
  FLINT: 262,
  FLINT_AND_STEEL: 263,
  STRING: 264,
  FEATHER: 265,
  GUNPOWDER: 266,
  BONE: 267,
  BONE_MEAL: 268,
  ARROW: 269,
  BOW: 270,
  LEATHER: 271,
  ROTTEN_FLESH: 272,
  WHEAT_SEEDS: ITEM_WHEAT_SEEDS,
  WHEAT: 274,
  BREAD: 275,
  APPLE: 276,
  PORKCHOP: 277,
  COOKED_PORKCHOP: 278,
  BEEF: 279,
  STEAK: 280,
  CHICKEN: 281,
  COOKED_CHICKEN: 282,
  BUCKET: 283,
  WATER_BUCKET: 284,
  LAVA_BUCKET: 285,
  OAK_DOOR: ITEM_OAK_DOOR,
  BED: ITEM_BED,
  SHEARS: 288,
  RED_DYE: 289,
  YELLOW_DYE: 290,
  MUTTON: 291,
  COOKED_MUTTON: 292,
  PAPER: 293,
  BOOK: 294,
  // Инструменты: 300 + материал * 5 + вид.
  WOODEN_PICKAXE: 300,
  WOODEN_AXE: 301,
  WOODEN_SHOVEL: 302,
  WOODEN_SWORD: 303,
  WOODEN_HOE: 304,
  STONE_PICKAXE: 305,
  STONE_AXE: 306,
  STONE_SHOVEL: 307,
  STONE_SWORD: 308,
  STONE_HOE: 309,
  IRON_PICKAXE: 310,
  IRON_AXE: 311,
  IRON_SHOVEL: 312,
  IRON_SWORD: 313,
  IRON_HOE: 314,
  GOLDEN_PICKAXE: 315,
  GOLDEN_AXE: 316,
  GOLDEN_SHOVEL: 317,
  GOLDEN_SWORD: 318,
  GOLDEN_HOE: 319,
  DIAMOND_PICKAXE: 320,
  DIAMOND_AXE: 321,
  DIAMOND_SHOVEL: 322,
  DIAMOND_SWORD: 323,
  DIAMOND_HOE: 324,
  // Броня: 330 + материал * 4 + слот.
  LEATHER_HELMET: 330,
  LEATHER_CHESTPLATE: 331,
  LEATHER_LEGGINGS: 332,
  LEATHER_BOOTS: 333,
  IRON_HELMET: 334,
  IRON_CHESTPLATE: 335,
  IRON_LEGGINGS: 336,
  IRON_BOOTS: 337,
  GOLDEN_HELMET: 338,
  GOLDEN_CHESTPLATE: 339,
  GOLDEN_LEGGINGS: 340,
  GOLDEN_BOOTS: 341,
  DIAMOND_HELMET: 342,
  DIAMOND_CHESTPLATE: 343,
  DIAMOND_LEGGINGS: 344,
  DIAMOND_BOOTS: 345,
} as const;

const ITEMS = new Map<number, ItemDef>();

function add(def: Omit<ItemDef, 'maxStack'> & { maxStack?: number }): void {
  ITEMS.set(def.id, { maxStack: 64, ...def });
}

// Блоки как предметы.
const NOT_ITEMS = new Set<number>([
  Block.AIR,
  Block.WATER,
  Block.LAVA,
  Block.LIT_FURNACE,
  Block.OAK_DOOR,
  Block.BED,
  Block.WHEAT,
]);
const BLOCK_FUEL: Partial<Record<number, number>> = {
  [Block.OAK_PLANKS]: 300,
  [Block.BIRCH_PLANKS]: 300,
  [Block.SPRUCE_PLANKS]: 300,
  [Block.OAK_LOG]: 300,
  [Block.BIRCH_LOG]: 300,
  [Block.SPRUCE_LOG]: 300,
  [Block.OAK_SLAB]: 150,
  [Block.OAK_STAIRS]: 300,
  [Block.OAK_FENCE]: 300,
  [Block.CRAFTING_TABLE]: 300,
  [Block.CHEST]: 300,
  [Block.BOOKSHELF]: 300,
  [Block.LADDER]: 300,
  [Block.OAK_TRAPDOOR]: 300,
  [Block.OAK_FENCE_GATE]: 300,
  [Block.OAK_SAPLING]: 100,
  [Block.BIRCH_SAPLING]: 100,
  [Block.SPRUCE_SAPLING]: 100,
};
for (let id = 0; id < BLOCK_COUNT; id++) {
  if (NOT_ITEMS.has(id)) continue;
  const b = BLOCKS[id];
  add({
    id,
    key: b.key,
    name: b.name,
    places: makeState(id),
    fuel: BLOCK_FUEL[id],
    hidden: id === Block.FARMLAND || id === Block.SNOWY_GRASS,
  });
}

const simple = (id: number, key: string, name: string, extra: Partial<ItemDef> = {}) =>
  add({ id, key, name, sprite: key, ...extra });

simple(Item.STICK, 'stick', 'Палка', { fuel: 100 });
simple(Item.COAL, 'coal', 'Уголь', { fuel: 1600 });
simple(Item.CHARCOAL, 'charcoal', 'Древесный уголь', { fuel: 1600 });
simple(Item.IRON_INGOT, 'iron_ingot', 'Железный слиток');
simple(Item.GOLD_INGOT, 'gold_ingot', 'Золотой слиток');
simple(Item.DIAMOND, 'diamond', 'Алмаз');
simple(Item.FLINT, 'flint', 'Кремень');
simple(Item.FLINT_AND_STEEL, 'flint_and_steel', 'Огниво', { maxStack: 1, durability: 64 });
simple(Item.STRING, 'string', 'Нить');
simple(Item.FEATHER, 'feather', 'Перо');
simple(Item.GUNPOWDER, 'gunpowder', 'Порох');
simple(Item.BONE, 'bone', 'Кость');
simple(Item.BONE_MEAL, 'bone_meal', 'Костная мука');
simple(Item.ARROW, 'arrow', 'Стрела');
simple(Item.BOW, 'bow', 'Лук', { maxStack: 1, durability: 384, fuel: 300 });
simple(Item.LEATHER, 'leather', 'Кожа');
simple(Item.ROTTEN_FLESH, 'rotten_flesh', 'Гнилая плоть', { food: { hunger: 4, saturation: 0.8 } });
simple(Item.WHEAT_SEEDS, 'wheat_seeds', 'Семена пшеницы', { places: makeState(Block.WHEAT) });
simple(Item.WHEAT, 'wheat', 'Пшеница');
simple(Item.BREAD, 'bread', 'Хлеб', { food: { hunger: 5, saturation: 6 } });
simple(Item.APPLE, 'apple', 'Яблоко', { food: { hunger: 4, saturation: 2.4 } });
simple(Item.PORKCHOP, 'porkchop', 'Сырая свинина', { food: { hunger: 3, saturation: 1.8 } });
simple(Item.COOKED_PORKCHOP, 'cooked_porkchop', 'Жареная свинина', { food: { hunger: 8, saturation: 12.8 } });
simple(Item.BEEF, 'beef', 'Сырая говядина', { food: { hunger: 3, saturation: 1.8 } });
simple(Item.STEAK, 'steak', 'Стейк', { food: { hunger: 8, saturation: 12.8 } });
simple(Item.CHICKEN, 'chicken', 'Сырая курица', { food: { hunger: 2, saturation: 1.2 } });
simple(Item.COOKED_CHICKEN, 'cooked_chicken', 'Жареная курица', { food: { hunger: 6, saturation: 7.2 } });
simple(Item.MUTTON, 'mutton', 'Сырая баранина', { food: { hunger: 2, saturation: 1.2 } });
simple(Item.COOKED_MUTTON, 'cooked_mutton', 'Жареная баранина', { food: { hunger: 6, saturation: 9.6 } });
simple(Item.BUCKET, 'bucket', 'Ведро', { maxStack: 16 });
simple(Item.WATER_BUCKET, 'water_bucket', 'Ведро воды', { maxStack: 1 });
simple(Item.LAVA_BUCKET, 'lava_bucket', 'Ведро лавы', { maxStack: 1, fuel: 20000 });
simple(Item.OAK_DOOR, 'oak_door_item', 'Дубовая дверь', { places: makeState(Block.OAK_DOOR), fuel: 200 });
simple(Item.BED, 'bed_item', 'Кровать', { maxStack: 1, places: makeState(Block.BED) });
simple(Item.SHEARS, 'shears', 'Ножницы', { maxStack: 1, durability: 238, tool: { type: 'shears', level: 0, speed: 5 } });
simple(Item.RED_DYE, 'red_dye', 'Красный краситель');
simple(Item.YELLOW_DYE, 'yellow_dye', 'Жёлтый краситель');
simple(Item.PAPER, 'paper', 'Бумага');
simple(Item.BOOK, 'book', 'Книга');

/** Название материала в трёх родах: женском, мужском и множественном числе. */
interface MaterialName {
  f: string;
  m: string;
  p: string;
}
const forms = (stem: string, m = 'ый'): MaterialName => ({ f: `${stem}ая`, m: `${stem}${m}`, p: `${stem}ые` });

export const TOOL_MATERIALS = [
  { key: 'wooden', name: forms('Деревянн'), level: 0, speed: 2, durability: 59, damage: 0, fuel: 200 },
  { key: 'stone', name: forms('Каменн'), level: 1, speed: 4, durability: 131, damage: 1, fuel: 0 },
  { key: 'iron', name: forms('Железн'), level: 2, speed: 6, durability: 250, damage: 2, fuel: 0 },
  { key: 'golden', name: forms('Золот', 'ой'), level: 0, speed: 12, durability: 32, damage: 0, fuel: 0 },
  { key: 'diamond', name: forms('Алмазн'), level: 3, speed: 8, durability: 1561, damage: 3, fuel: 0 },
];
const TOOL_KINDS: { key: string; type: ToolType; name: (m: MaterialName) => string; damage: number }[] = [
  { key: 'pickaxe', type: 'pickaxe', name: (m) => `${m.f} кирка`, damage: 3 },
  { key: 'axe', type: 'axe', name: (m) => `${m.m} топор`, damage: 4 },
  { key: 'shovel', type: 'shovel', name: (m) => `${m.f} лопата`, damage: 2 },
  { key: 'sword', type: 'sword', name: (m) => `${m.m} меч`, damage: 5 },
  { key: 'hoe', type: 'hoe', name: (m) => `${m.f} мотыга`, damage: 1 },
];
TOOL_MATERIALS.forEach((mat, mi) =>
  TOOL_KINDS.forEach((kind, ki) => {
    const key = `${mat.key}_${kind.key}`;
    add({
      id: 300 + mi * 5 + ki,
      key,
      name: kind.name(mat.name),
      sprite: key,
      maxStack: 1,
      durability: mat.durability,
      tool: { type: kind.type, level: mat.level, speed: mat.speed },
      damage: kind.damage + mat.damage,
      fuel: mat.fuel || undefined,
    });
  }),
);

const ARMOR_MATERIALS = [
  { key: 'leather', name: forms('Кожан'), points: [1, 3, 2, 1], durability: 5, color: '#8b5a2b' },
  { key: 'iron', name: forms('Железн'), points: [2, 6, 5, 2], durability: 15, color: '#d8d8d8' },
  { key: 'golden', name: forms('Золот', 'ой'), points: [2, 5, 3, 1], durability: 7, color: '#f2cf3a' },
  { key: 'diamond', name: forms('Алмазн'), points: [3, 8, 6, 3], durability: 33, color: '#5fe0d6' },
];
const ARMOR_SLOTS = [
  { key: 'helmet', name: (m: MaterialName) => `${m.m} шлем`, base: 11 },
  { key: 'chestplate', name: (m: MaterialName) => `${m.m} нагрудник`, base: 16 },
  { key: 'leggings', name: (m: MaterialName) => `${m.p} поножи`, base: 15 },
  { key: 'boots', name: (m: MaterialName) => `${m.p} ботинки`, base: 13 },
];
ARMOR_MATERIALS.forEach((mat, mi) =>
  ARMOR_SLOTS.forEach((slot, si) => {
    const key = `${mat.key}_${slot.key}`;
    add({
      id: 330 + mi * 4 + si,
      key,
      name: slot.name(mat.name),
      sprite: key,
      maxStack: 1,
      durability: slot.base * mat.durability,
      armor: { slot: si, points: mat.points[si], color: mat.color },
    });
  }),
);

export const ALL_ITEMS: readonly ItemDef[] = [...ITEMS.values()].sort((a, b) => a.id - b.id);

export function itemDef(id: number): ItemDef | undefined {
  return ITEMS.get(id);
}

export const isValidItem = (id: unknown): id is number => Number.isInteger(id) && ITEMS.has(id as number);
export const itemName = (id: number) => ITEMS.get(id)?.name ?? '?';
export const maxStackOf = (id: number) => ITEMS.get(id)?.maxStack ?? 64;
export const isBlockItem = (id: number) => id < 256;

/** Спрайты всех предметов-не-блоков — для генерации текстур. */
export const ITEM_SPRITES: string[] = ALL_ITEMS.filter((d) => d.sprite).map((d) => d.sprite!);

/** Порядок предметов в творческом инвентаре. */
export const CREATIVE_ITEMS: number[] = ALL_ITEMS.filter((d) => !d.hidden).map((d) => d.id);
