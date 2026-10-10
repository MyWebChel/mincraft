import { Block } from './blocks';
import { stack, type ItemStack, type Slots } from './inventory';
import { Item, itemDef, TOOL_MATERIALS } from './items';

/** Ингредиент: конкретный предмет или группа (любые доски, любое бревно...). */
export type Ingredient = number | Tag;
type Tag = 'planks' | 'log' | 'coal' | 'wool';

const TAGS: Record<Tag, number[]> = {
  planks: [Block.OAK_PLANKS, Block.BIRCH_PLANKS, Block.SPRUCE_PLANKS],
  log: [Block.OAK_LOG, Block.BIRCH_LOG, Block.SPRUCE_LOG],
  coal: [Item.COAL, Item.CHARCOAL],
  wool: [
    Block.WHITE_WOOL,
    Block.RED_WOOL,
    Block.PINK_WOOL,
    Block.YELLOW_WOOL,
    Block.GREEN_WOOL,
    Block.BLUE_WOOL,
    Block.PURPLE_WOOL,
    Block.BLACK_WOOL,
  ],
};

const matches = (ing: Ingredient, id: number) => (typeof ing === 'number' ? ing === id : TAGS[ing].includes(id));
export const ingredientMatches = matches;

export interface ShapedRecipe {
  kind: 'shaped';
  pattern: string[];
  keys: Record<string, Ingredient>;
  result: ItemStack;
}
export interface ShapelessRecipe {
  kind: 'shapeless';
  ingredients: Ingredient[];
  result: ItemStack;
}
export type Recipe = ShapedRecipe | ShapelessRecipe;

export const RECIPES: Recipe[] = [];
const shaped = (pattern: string[], keys: Record<string, Ingredient>, id: number, count = 1) =>
  RECIPES.push({ kind: 'shaped', pattern, keys, result: stack(id, count) });
const shapeless = (ingredients: Ingredient[], id: number, count = 1) =>
  RECIPES.push({ kind: 'shapeless', ingredients, result: stack(id, count) });

// Дерево.
shapeless([Block.OAK_LOG], Block.OAK_PLANKS, 4);
shapeless([Block.BIRCH_LOG], Block.BIRCH_PLANKS, 4);
shapeless([Block.SPRUCE_LOG], Block.SPRUCE_PLANKS, 4);
shaped(['#', '#'], { '#': 'planks' }, Item.STICK, 4);
shaped(['##', '##'], { '#': 'planks' }, Block.CRAFTING_TABLE);
shaped(['C', 'S'], { C: 'coal', S: Item.STICK }, Block.TORCH, 4);
shaped(['###', '# #', '###'], { '#': 'planks' }, Block.CHEST);
shaped(['###', '# #', '###'], { '#': Block.COBBLESTONE }, Block.FURNACE);
shaped(['S S', 'SSS', 'S S'], { S: Item.STICK }, Block.LADDER, 3);
shaped(['##', '##', '##'], { '#': 'planks' }, Item.OAK_DOOR, 3);
shaped(['#S#', '#S#'], { '#': 'planks', S: Item.STICK }, Block.OAK_FENCE, 3);
shaped(['###'], { '#': 'planks' }, Block.OAK_SLAB, 6);
shaped(['###'], { '#': Block.COBBLESTONE }, Block.COBBLESTONE_SLAB, 6);
shaped(['###'], { '#': Block.STONE }, Block.STONE_SLAB, 6);
shaped(['#  ', '## ', '###'], { '#': 'planks' }, Block.OAK_STAIRS, 4);
shaped(['#  ', '## ', '###'], { '#': Block.COBBLESTONE }, Block.COBBLESTONE_STAIRS, 4);
shaped(['#  ', '## ', '###'], { '#': Block.STONE_BRICKS }, Block.STONE_BRICK_STAIRS, 4);
shaped(['WWW', '###'], { W: 'wool', '#': 'planks' }, Item.BED);
shaped(['###', '###'], { '#': 'planks' }, Block.OAK_TRAPDOOR, 2);
shaped(['S#S', 'S#S'], { '#': 'planks', S: Item.STICK }, Block.OAK_FENCE_GATE);
shaped(['###', 'BBB', '###'], { '#': 'planks', B: Item.BOOK }, Block.BOOKSHELF);

// Стекло, тыквы, тростник.
shaped(['###', '###'], { '#': Block.GLASS }, Block.GLASS_PANE, 16);
shaped(['P', 'T'], { P: Block.PUMPKIN, T: Block.TORCH }, Block.JACK_O_LANTERN);
shaped(['###'], { '#': Block.SUGAR_CANE }, Item.PAPER, 3);
shapeless([Item.PAPER, Item.PAPER, Item.PAPER, Item.LEATHER], Item.BOOK);

// Камень и прочее.
shaped(['##', '##'], { '#': Block.SAND }, Block.SANDSTONE);
shaped(['##', '##'], { '#': Block.STONE }, Block.STONE_BRICKS, 4);
shaped(['##', '##'], { '#': Item.STRING }, Block.WHITE_WOOL);
shaped(['GSG', 'SGS', 'GSG'], { G: Item.GUNPOWDER, S: Block.SAND }, Block.TNT);
shaped(['I I', ' I '], { I: Item.IRON_INGOT }, Item.BUCKET);
shaped([' I', 'I '], { I: Item.IRON_INGOT }, Item.SHEARS);
shapeless([Item.IRON_INGOT, Item.FLINT], Item.FLINT_AND_STEEL);
shaped([' #S', '# S', ' #S'], { '#': Item.STICK, S: Item.STRING }, Item.BOW);
shaped(['F', '#', 'E'], { F: Item.FLINT, '#': Item.STICK, E: Item.FEATHER }, Item.ARROW, 4);
shaped(['WWW'], { W: Item.WHEAT }, Item.BREAD);
shapeless([Item.BONE], Item.BONE_MEAL, 3);
shapeless([Block.POPPY], Item.RED_DYE);
shapeless([Block.DANDELION], Item.YELLOW_DYE);
shapeless([Block.WHITE_WOOL, Item.RED_DYE], Block.RED_WOOL);
shapeless([Block.WHITE_WOOL, Item.YELLOW_DYE], Block.YELLOW_WOOL);
shapeless([Block.WHITE_WOOL, Item.RED_DYE, Item.BONE_MEAL], Block.PINK_WOOL);

// Блоки из слитков и обратно.
for (const [ingot, block] of [
  [Item.IRON_INGOT, Block.IRON_BLOCK],
  [Item.GOLD_INGOT, Block.GOLD_BLOCK],
  [Item.DIAMOND, Block.DIAMOND_BLOCK],
] as const) {
  shaped(['###', '###', '###'], { '#': ingot }, block);
  shapeless([block], ingot, 9);
}

// Инструменты и оружие.
const TOOL_MATS: Ingredient[] = ['planks', Block.COBBLESTONE, Item.IRON_INGOT, Item.GOLD_INGOT, Item.DIAMOND];
TOOL_MATERIALS.forEach((_, mi) => {
  const X = TOOL_MATS[mi];
  const base = 300 + mi * 5;
  shaped(['XXX', ' # ', ' # '], { X, '#': Item.STICK }, base);
  shaped(['XX', 'X#', ' #'], { X, '#': Item.STICK }, base + 1);
  shaped(['X', '#', '#'], { X, '#': Item.STICK }, base + 2);
  shaped(['X', 'X', '#'], { X, '#': Item.STICK }, base + 3);
  shaped(['XX', ' #', ' #'], { X, '#': Item.STICK }, base + 4);
});

// Броня.
const ARMOR_MATS: Ingredient[] = [Item.LEATHER, Item.IRON_INGOT, Item.GOLD_INGOT, Item.DIAMOND];
ARMOR_MATS.forEach((X, mi) => {
  const base = 330 + mi * 4;
  shaped(['XXX', 'X X'], { X }, base);
  shaped(['X X', 'XXX', 'XXX'], { X }, base + 1);
  shaped(['XXX', 'X X', 'X X'], { X }, base + 2);
  shaped(['X X', 'X X'], { X }, base + 3);
});

/** Ищет рецепт для сетки крафта (2×2 или 3×3, построчно). */
export function matchRecipe(grid: Slots, width: number): Recipe | null {
  const height = grid.length / width;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  const items: number[] = [];
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const s = grid[y * width + x];
      if (!s) continue;
      items.push(s.id);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  if (!items.length) return null;
  const w = maxX - minX + 1;
  const h = maxY - minY + 1;

  for (const r of RECIPES) {
    if (r.kind === 'shapeless') {
      if (r.ingredients.length !== items.length) continue;
      const left = [...items];
      const ok = r.ingredients.every((ing) => {
        const i = left.findIndex((id) => matches(ing, id));
        if (i < 0) return false;
        left.splice(i, 1);
        return true;
      });
      if (ok) return r;
      continue;
    }
    const pw = Math.max(...r.pattern.map((row) => row.length));
    if (pw !== w || r.pattern.length !== h) continue;
    for (const mirror of [false, true]) {
      let ok = true;
      for (let y = 0; y < h && ok; y++)
        for (let x = 0; x < w && ok; x++) {
          const ch = r.pattern[y][mirror ? w - 1 - x : x] ?? ' ';
          const s = grid[(minY + y) * width + minX + x];
          if (ch === ' ') ok = !s;
          else ok = !!s && matches(r.keys[ch], s.id);
        }
      if (ok) return r;
    }
  }
  return null;
}

/**
 * Раскладка рецепта в сетке крафта шириной width (для книги рецептов):
 * ингредиент для каждой клетки или null, если рецепт в сетку не помещается.
 */
export function recipeLayout(r: Recipe, width: number): (Ingredient | null)[] | null {
  const cells: (Ingredient | null)[] = new Array(width * width).fill(null);
  if (r.kind === 'shapeless') {
    if (r.ingredients.length > cells.length) return null;
    r.ingredients.forEach((ing, i) => (cells[i] = ing));
    return cells;
  }
  const w = Math.max(...r.pattern.map((row) => row.length));
  if (w > width || r.pattern.length > width) return null;
  r.pattern.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) if (row[x] !== ' ') cells[y * width + x] = r.keys[row[x]];
  });
  return cells;
}

/** Все ингредиенты рецепта списком (по одному на клетку). */
export function recipeIngredients(r: Recipe): Ingredient[] {
  if (r.kind === 'shapeless') return [...r.ingredients];
  const list: Ingredient[] = [];
  for (const row of r.pattern) for (const ch of row) if (ch !== ' ') list.push(r.keys[ch]);
  return list;
}

/** Хватает ли предметов из списка стопок на один крафт. */
export function canCraftFrom(r: Recipe, stacks: readonly (ItemStack | null)[]): boolean {
  const pool = stacks.filter((s): s is ItemStack => !!s).map((s) => ({ id: s.id, count: s.count }));
  for (const ing of recipeIngredients(r)) {
    const s = pool.find((p) => p.count > 0 && matches(ing, p.id));
    if (!s) return false;
    s.count--;
  }
  return true;
}

/** Результат переплавки в печи. */
export const SMELTING: Record<number, ItemStack> = {
  [Block.IRON_ORE]: stack(Item.IRON_INGOT),
  [Block.GOLD_ORE]: stack(Item.GOLD_INGOT),
  [Block.DIAMOND_ORE]: stack(Item.DIAMOND),
  [Block.COAL_ORE]: stack(Item.COAL),
  [Block.SAND]: stack(Block.GLASS),
  [Block.COBBLESTONE]: stack(Block.STONE),
  [Block.OAK_LOG]: stack(Item.CHARCOAL),
  [Block.BIRCH_LOG]: stack(Item.CHARCOAL),
  [Block.SPRUCE_LOG]: stack(Item.CHARCOAL),
  [Item.PORKCHOP]: stack(Item.COOKED_PORKCHOP),
  [Item.BEEF]: stack(Item.STEAK),
  [Item.CHICKEN]: stack(Item.COOKED_CHICKEN),
  [Item.MUTTON]: stack(Item.COOKED_MUTTON),
};

export const SMELT_TIME = 200;

export const fuelTicks = (id: number): number => itemDef(id)?.fuel ?? 0;
