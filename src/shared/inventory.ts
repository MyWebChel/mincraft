import { isValidItem, itemDef, maxStackOf } from './items';

/** Стопка предметов. dmg — износ инструмента/брони. */
export interface ItemStack {
  id: number;
  count: number;
  dmg?: number;
}

export type Slots = (ItemStack | null)[];

export const HOTBAR_SIZE = 9;
export const INVENTORY_SIZE = 36;
export const ARMOR_SLOTS = 4;

export const stack = (id: number, count = 1, dmg = 0): ItemStack => (dmg ? { id, count, dmg } : { id, count });

export const cloneStack = (s: ItemStack | null): ItemStack | null => (s ? { ...s } : null);

export const emptySlots = (n: number): Slots => Array.from({ length: n }, () => null);

/** Можно ли сложить две стопки в одну ячейку. */
export function canMerge(a: ItemStack, b: ItemStack): boolean {
  return a.id === b.id && (a.dmg ?? 0) === (b.dmg ?? 0) && maxStackOf(a.id) > 1;
}

/** Проверка стопки, пришедшей по сети или из сохранения. */
export function sanitizeStack(raw: unknown): ItemStack | null {
  if (!raw || typeof raw !== 'object') return null;
  const { id, count, dmg } = raw as Record<string, unknown>;
  if (!isValidItem(id) || !Number.isInteger(count) || (count as number) <= 0) return null;
  const max = maxStackOf(id);
  const durability = itemDef(id)?.durability ?? 0;
  const wear = Number.isInteger(dmg) ? Math.max(0, Math.min(durability, dmg as number)) : 0;
  return stack(id, Math.min(max, count as number), wear);
}

export function sanitizeSlots(raw: unknown, size: number): Slots {
  const out = emptySlots(size);
  if (Array.isArray(raw)) for (let i = 0; i < size; i++) out[i] = sanitizeStack(raw[i]);
  return out;
}

/** Порядок заполнения инвентаря: сначала хотбар, потом основной. */
export const PICKUP_ORDER = Array.from({ length: INVENTORY_SIZE }, (_, i) => i);

/**
 * Добавляет предметы в ячейки (сначала докладывает в такие же стопки, затем
 * в пустые). Возвращает, сколько не поместилось.
 */
export function addItem(slots: Slots, item: ItemStack, order: readonly number[] = PICKUP_ORDER): number {
  let left = item.count;
  const max = maxStackOf(item.id);
  for (const i of order) {
    const s = slots[i];
    if (left <= 0) break;
    if (s && canMerge(s, item) && s.count < max) {
      const n = Math.min(left, max - s.count);
      s.count += n;
      left -= n;
    }
  }
  for (const i of order) {
    if (left <= 0) break;
    if (!slots[i]) {
      const n = Math.min(left, max);
      slots[i] = { ...item, count: n };
      left -= n;
    }
  }
  return left;
}

export function countItem(slots: Slots, id: number): number {
  return slots.reduce((sum, s) => sum + (s && s.id === id ? s.count : 0), 0);
}

/** Забирает count предметов id из ячеек. Возвращает, сколько удалось забрать. */
export function removeItem(slots: Slots, id: number, count: number): number {
  let left = count;
  for (let i = slots.length - 1; i >= 0 && left > 0; i--) {
    const s = slots[i];
    if (!s || s.id !== id) continue;
    const n = Math.min(left, s.count);
    s.count -= n;
    left -= n;
    if (s.count <= 0) slots[i] = null;
  }
  return count - left;
}

/** Износ инструмента на 1 единицу. Возвращает null, если инструмент сломался. */
export function damageItem(s: ItemStack, amount = 1): ItemStack | null {
  const max = itemDef(s.id)?.durability;
  if (!max) return s;
  const dmg = (s.dmg ?? 0) + amount;
  return dmg >= max ? null : { ...s, dmg };
}
