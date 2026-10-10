import { BLOCKS, Block, metaOf, typeOf } from './blocks';
import { stack, type ItemStack } from './inventory';
import { Item, itemDef, type ItemDef } from './items';

/** Подходит ли инструмент, чтобы блок выпал при добыче. */
export function canHarvest(state: number, tool: ItemDef | undefined): boolean {
  const def = BLOCKS[typeOf(state)];
  if (def.harvestLevel < 0) return true;
  return !!tool?.tool && tool.tool.type === def.tool && tool.tool.level >= def.harvestLevel;
}

/**
 * Время добычи блока в секундах (формула из Minecraft).
 * 0 — ломается мгновенно, Infinity — неразрушимый.
 */
export function breakTime(state: number, toolId: number | null, inWater = false, onGround = true): number {
  const def = BLOCKS[typeOf(state)];
  if (def.hardness < 0) return Infinity;
  if (def.hardness === 0) return 0;
  const tool = toolId === null ? undefined : itemDef(toolId);
  let speed = 1;
  if (tool?.tool && def.tool === tool.tool.type) speed = tool.tool.speed;
  // Меч рубит листву и паутину быстрее, ножницы — шерсть и листву.
  if (tool?.tool?.type === 'sword' && def.tool === 'shears') speed = 1.5;
  let damage = speed / def.hardness / (canHarvest(state, tool) ? 30 : 100);
  if (inWater) damage /= 5;
  if (!onGround) damage /= 5;
  if (damage >= 1) return 0;
  return Math.ceil(1 / damage) / 20;
}

const rand = (rnd: () => number, min: number, max: number) => min + Math.floor(rnd() * (max - min + 1));

/** Что выпадает из блока при добыче в режиме выживания. */
export function blockDrops(state: number, toolId: number | null, rnd: () => number = Math.random): ItemStack[] {
  const type = typeOf(state);
  const meta = metaOf(state);
  const tool = toolId === null ? undefined : itemDef(toolId);
  if (!canHarvest(state, tool)) return [];
  const shears = tool?.tool?.type === 'shears';

  switch (type) {
    case Block.AIR:
    case Block.WATER:
    case Block.LAVA:
    case Block.BEDROCK:
      return [];
    case Block.STONE:
      return [stack(Block.COBBLESTONE)];
    case Block.GRASS:
    case Block.SNOWY_GRASS:
    case Block.FARMLAND:
      return [stack(Block.DIRT)];
    case Block.COAL_ORE:
      return [stack(Item.COAL)];
    case Block.DIAMOND_ORE:
      return [stack(Item.DIAMOND)];
    case Block.GLASS:
    case Block.GLASS_PANE:
    case Block.ICE:
      return [];
    case Block.GLOWSTONE:
      return [stack(Block.GLOWSTONE)];
    case Block.GRAVEL:
      return [rnd() < 0.1 ? stack(Item.FLINT) : stack(Block.GRAVEL)];
    case Block.TALL_GRASS:
      if (shears) return [stack(Block.TALL_GRASS)];
      return rnd() < 0.125 ? [stack(Item.WHEAT_SEEDS)] : [];
    case Block.DEAD_BUSH:
      return shears ? [stack(Block.DEAD_BUSH)] : rand(rnd, 0, 2) ? [stack(Item.STICK, rand(rnd, 1, 2))] : [];
    case Block.OAK_LEAVES:
    case Block.BIRCH_LEAVES:
    case Block.SPRUCE_LEAVES: {
      if (shears) return [stack(type)];
      const drops: ItemStack[] = [];
      const sapling =
        type === Block.OAK_LEAVES ? Block.OAK_SAPLING : type === Block.BIRCH_LEAVES ? Block.BIRCH_SAPLING : Block.SPRUCE_SAPLING;
      if (rnd() < 0.06) drops.push(stack(sapling));
      if (type === Block.OAK_LEAVES && rnd() < 0.02) drops.push(stack(Item.APPLE));
      if (rnd() < 0.02) drops.push(stack(Item.STICK, rand(rnd, 1, 2)));
      return drops;
    }
    case Block.WHEAT: {
      const age = meta & 7;
      if (age < 7) return [stack(Item.WHEAT_SEEDS)];
      return [stack(Item.WHEAT), stack(Item.WHEAT_SEEDS, rand(rnd, 1, 3))];
    }
    case Block.OAK_DOOR:
      // Дверь занимает два блока — предмет выпадает только из нижней половины.
      return meta & 8 ? [] : [stack(Item.OAK_DOOR)];
    case Block.BED:
      return meta & 4 ? [] : [stack(Item.BED)];
    case Block.LIT_FURNACE:
      return [stack(Block.FURNACE)];
    default:
      return [stack(type)];
  }
}

/** Что выпадает из моба. */
export function mobDrops(type: string, rnd: () => number = Math.random, onFire = false): ItemStack[] {
  const out: ItemStack[] = [];
  const add = (id: number, min: number, max: number) => {
    const n = rand(rnd, min, max);
    if (n > 0) out.push(stack(id, n));
  };
  switch (type) {
    case 'pig':
      add(onFire ? Item.COOKED_PORKCHOP : Item.PORKCHOP, 1, 3);
      break;
    case 'cow':
      add(Item.LEATHER, 0, 2);
      add(onFire ? Item.STEAK : Item.BEEF, 1, 3);
      break;
    case 'sheep':
      add(Block.WHITE_WOOL, 1, 1);
      add(onFire ? Item.COOKED_MUTTON : Item.MUTTON, 1, 2);
      break;
    case 'chicken':
      add(Item.FEATHER, 0, 2);
      add(onFire ? Item.COOKED_CHICKEN : Item.CHICKEN, 1, 1);
      break;
    case 'zombie':
      add(Item.ROTTEN_FLESH, 0, 2);
      if (rnd() < 0.03) add(Item.IRON_INGOT, 1, 1);
      break;
    case 'skeleton':
      add(Item.BONE, 0, 2);
      add(Item.ARROW, 0, 2);
      break;
    case 'creeper':
      add(Item.GUNPOWDER, 0, 2);
      break;
    case 'spider':
      add(Item.STRING, 0, 2);
      break;
  }
  return out;
}
