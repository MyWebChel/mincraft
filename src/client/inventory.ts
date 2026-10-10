import {
  ARMOR_SLOTS,
  HOTBAR_SIZE,
  INVENTORY_SIZE,
  addItem,
  canMerge,
  cloneStack,
  damageItem,
  emptySlots,
  sanitizeSlots,
  type ItemStack,
  type Slots,
} from '../shared/inventory';
import { itemDef, maxStackOf } from '../shared/items';

/** Инвентарь игрока на клиенте: 36 ячеек (0..8 — хотбар), броня, выбранная ячейка. */
export class PlayerInventory {
  slots: Slots = emptySlots(INVENTORY_SIZE);
  armor: Slots = emptySlots(ARMOR_SLOTS);
  selected = 0;
  /** Вызывается при любом изменении (перерисовка хотбара, отправка на сервер). */
  onChange: () => void = () => {};

  load(slots: unknown, armor: unknown, selected: number): void {
    this.slots = sanitizeSlots(slots, INVENTORY_SIZE);
    this.armor = sanitizeSlots(armor, ARMOR_SLOTS);
    this.selected = Math.max(0, Math.min(HOTBAR_SIZE - 1, selected | 0));
    this.changed();
  }

  changed(): void {
    this.onChange();
  }

  get held(): ItemStack | null {
    return this.slots[this.selected];
  }

  set held(s: ItemStack | null) {
    this.slots[this.selected] = s && s.count > 0 ? s : null;
    this.changed();
  }

  select(slot: number): void {
    this.selected = ((slot % HOTBAR_SIZE) + HOTBAR_SIZE) % HOTBAR_SIZE;
    this.changed();
  }

  /** Добавить подобранный предмет. Возвращает остаток, который не влез. */
  add(item: ItemStack): number {
    const left = addItem(this.slots, item);
    this.changed();
    return left;
  }

  /** Израсходовать n предметов из руки. */
  consumeHeld(n = 1): void {
    const h = this.held;
    if (!h) return;
    h.count -= n;
    this.held = h.count > 0 ? h : null;
  }

  /** Износ предмета в руке; true — если сломался. */
  damageHeld(amount = 1): boolean {
    const h = this.held;
    if (!h || !itemDef(h.id)?.durability) return false;
    const next = damageItem(h, amount);
    this.held = next;
    return next === null;
  }

  /** Заменить предмет в руке (ведро с водой → пустое ведро и т.п.). */
  replaceHeld(item: ItemStack): void {
    const h = this.held;
    if (h && h.count > 1) {
      h.count--;
      if (addItem(this.slots, item) > 0) this.onOverflow?.(item);
      this.changed();
    } else this.held = item;
  }

  /** Куда девать предметы, которые не влезли (выбросить в мир). */
  onOverflow?: (item: ItemStack) => void;

  /** Защита от брони (очки), как в Minecraft: до 20. */
  armorPoints(): number {
    return this.armor.reduce((sum, s) => sum + (s ? (itemDef(s.id)?.armor?.points ?? 0) : 0), 0);
  }

  /** Броня изнашивается при получении урона. */
  damageArmor(amount: number): void {
    const wear = Math.max(1, Math.floor(amount / 4));
    let changed = false;
    this.armor = this.armor.map((s) => {
      if (!s) return s;
      changed = true;
      return damageItem(s, wear);
    });
    if (changed) this.changed();
  }

  /** Все предметы (для выпадения при смерти). */
  takeAll(): ItemStack[] {
    const all = [...this.slots, ...this.armor].filter((s): s is ItemStack => !!s).map((s) => ({ ...s }));
    this.slots = emptySlots(INVENTORY_SIZE);
    this.armor = emptySlots(ARMOR_SLOTS);
    this.changed();
    return all;
  }

  count(id: number): number {
    return this.slots.reduce((n, s) => n + (s && s.id === id ? s.count : 0), 0);
  }

  /** Забрать один предмет id (например, стрелу для лука). */
  takeOne(id: number): boolean {
    for (let i = INVENTORY_SIZE - 1; i >= 0; i--) {
      const s = this.slots[i];
      if (s && s.id === id) {
        s.count--;
        if (s.count <= 0) this.slots[i] = null;
        this.changed();
        return true;
      }
    }
    return false;
  }
}

/**
 * Логика кликов по ячейкам, как в Minecraft: левый клик берёт/кладёт стопку,
 * правый — половину/по одному, «быстрый перенос» — в другую часть инвентаря.
 */
export function clickSlot(slots: Slots, index: number, cursor: ItemStack | null, right: boolean, accept?: (s: ItemStack) => boolean): ItemStack | null {
  const slot = slots[index];
  if (!cursor) {
    if (!slot) return null;
    if (right) {
      const take = Math.ceil(slot.count / 2);
      const rest = slot.count - take;
      slots[index] = rest > 0 ? { ...slot, count: rest } : null;
      return { ...slot, count: take };
    }
    slots[index] = null;
    return slot;
  }
  if (accept && !accept(cursor)) return cursor;
  if (!slot) {
    if (right) {
      slots[index] = { ...cursor, count: 1 };
      return cursor.count > 1 ? { ...cursor, count: cursor.count - 1 } : null;
    }
    slots[index] = cursor;
    return null;
  }
  if (canMerge(slot, cursor)) {
    const max = maxStackOf(slot.id);
    const n = right ? Math.min(1, max - slot.count) : Math.min(cursor.count, max - slot.count);
    if (n <= 0) return cursor;
    slots[index] = { ...slot, count: slot.count + n };
    return cursor.count - n > 0 ? { ...cursor, count: cursor.count - n } : null;
  }
  // Разные предметы — меняем местами.
  slots[index] = cursor;
  return slot;
}

/** Быстрый перенос стопки в указанные ячейки (shift-клик). Возвращает остаток. */
export function quickMove(item: ItemStack, target: Slots, order: number[]): ItemStack | null {
  const copy = cloneStack(item)!;
  const left = addItem(target, copy, order);
  return left > 0 ? { ...item, count: left } : null;
}
