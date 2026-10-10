import { HOTBAR_SIZE, INVENTORY_SIZE, addItem, emptySlots, stack, type ItemStack, type Slots } from '../shared/inventory';
import { CREATIVE_ITEMS, Item, isBlockItem, itemDef, maxStackOf } from '../shared/items';
import type { ContainerState, GameMode } from '../shared/protocol';
import { RECIPES, SMELTING, canCraftFrom, fuelTicks, ingredientMatches, matchRecipe, recipeLayout, type Recipe } from '../shared/recipes';
import { clickSlot, type PlayerInventory } from './inventory';
import { itemIcon, type Atlas } from './textures';
import { $, renderSlot } from './ui';

const BOOK_KEY = 'minecraft:recipe-book';

export type InvKind = 'inventory' | 'crafting' | 'chest' | 'furnace' | 'creative';

export interface InventoryHandlers {
  close(): void;
  drop(item: ItemStack): void;
  containerSlot(cid: string, slot: number, item: ItemStack | null): void;
  sound(name: string): void;
}

type Group = 'main' | 'hotbar' | 'armor' | 'craft' | 'out' | 'cont' | 'creative' | 'trash';

const TABS: { key: string; name: string; filter: (id: number) => boolean }[] = [
  { key: 'all', name: 'Все', filter: () => true },
  { key: 'blocks', name: 'Блоки', filter: (id) => isBlockItem(id) },
  { key: 'tools', name: 'Инструменты', filter: (id) => !!itemDef(id)?.tool || !!itemDef(id)?.armor || [263, 269, 270, 283, 284, 285, 288].includes(id) },
  { key: 'food', name: 'Еда', filter: (id) => !!itemDef(id)?.food },
  { key: 'misc', name: 'Разное', filter: (id) => !isBlockItem(id) && !itemDef(id)?.tool && !itemDef(id)?.armor && !itemDef(id)?.food },
];

/**
 * Окна инвентаря как в Minecraft: свой инвентарь с крафтом 2×2 и бронёй,
 * верстак 3×3, сундук, печь и творческий инвентарь.
 * Мышь: ЛКМ — взять/положить стопку, ПКМ — половину/по одному, Shift — перенести.
 * Палец: тап — как ЛКМ, долгое нажатие — как ПКМ, двойной тап — перенести.
 */
export class InventoryUI {
  kind: InvKind | null = null;
  private cursor: ItemStack | null = null;
  private readonly craft: Slots = emptySlots(9);
  private craftW = 2;
  private container: ContainerState | null = null;
  private readonly panel = $('inventory-panel');
  private readonly cursorEl = $('cursor-item');
  private readonly tooltip = $('tooltip');
  private slots: HTMLElement[] = [];
  private tab = 'all';
  private pointer = { x: 0, y: 0 };
  private longPress = 0;
  private longPressed = false;
  private lastTap: { el: HTMLElement | null; time: number } = { el: null, time: 0 };
  /** Книга рецептов: открыта ли и показывать ли все рецепты (а не только доступные). */
  private readonly book = $('recipe-book');
  private bookOpen = true;
  private bookAll = false;
  private bookKey = '';
  private bookRecipes: Recipe[] = [];

  constructor(
    private readonly atlas: Atlas,
    private readonly inv: PlayerInventory,
    private readonly h: InventoryHandlers,
    private readonly mode: () => GameMode,
  ) {
    const screen = $('inventory-screen');
    try {
      this.bookOpen = localStorage.getItem(BOOK_KEY) !== '0';
    } catch {
      // без localStorage книга просто открыта
    }
    this.setupBook();
    this.panel.addEventListener('contextmenu', (e) => e.preventDefault());
    screen.addEventListener('contextmenu', (e) => e.preventDefault());
    this.panel.addEventListener('pointerdown', this.onPointerDown);
    this.panel.addEventListener('pointerup', this.onPointerUp);
    this.panel.addEventListener('pointercancel', () => clearTimeout(this.longPress));
    screen.addEventListener('pointermove', (e) => {
      this.pointer = { x: e.clientX, y: e.clientY };
      this.placeFloating();
    });
    // Клик мимо окна — выбросить то, что держим (кроме кнопки «закрыть»: тогда предмет вернётся в инвентарь).
    screen.addEventListener('pointerdown', (e) => {
      const target = e.target as HTMLElement;
      if (this.panel.contains(target) || this.book.contains(target) || target.closest('#inv-close')) return;
      if (!this.cursor) return;
      if (e.button === 2) {
        this.h.drop({ ...this.cursor, count: 1 });
        this.cursor = this.cursor.count > 1 ? { ...this.cursor, count: this.cursor.count - 1 } : null;
      } else {
        this.h.drop(this.cursor);
        this.cursor = null;
      }
      this.render();
    });
    this.panel.addEventListener('pointerover', (e) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('.slot');
      if (!el || e.pointerType === 'touch') return this.hideTooltip();
      const s = this.stackOf(el);
      if (!s) return this.hideTooltip();
      const def = itemDef(s.id);
      let text = def?.name ?? '';
      if (def?.durability) text += ` (${def.durability - (s.dmg ?? 0)}/${def.durability})`;
      this.tooltip.textContent = text;
      this.tooltip.hidden = false;
      this.placeFloating();
    });
    this.panel.addEventListener('pointerout', () => this.hideTooltip());
  }

  get isOpen(): boolean {
    return this.kind !== null;
  }

  get openContainerId(): string | null {
    return this.container?.cid ?? null;
  }

  open(kind: InvKind, container?: ContainerState): void {
    this.returnCraft();
    this.kind = kind;
    this.container = container ?? null;
    this.craftW = kind === 'crafting' ? 3 : 2;
    this.build();
    this.render();
  }

  /** Закрыть окно: предметы из сетки крафта и «в руке» возвращаются в инвентарь. */
  close(): void {
    if (!this.kind) return;
    this.returnCraft();
    if (this.cursor) {
      this.giveBack(this.cursor);
      this.cursor = null;
    }
    this.kind = null;
    this.container = null;
    this.book.hidden = true;
    this.cursorEl.hidden = true;
    this.hideTooltip();
    this.inv.changed();
    this.h.close();
  }

  private giveBack(s: ItemStack): void {
    const left = addItem(this.inv.slots, { ...s });
    if (left > 0) this.h.drop({ ...s, count: left });
  }

  private returnCraft(): void {
    for (let i = 0; i < this.craft.length; i++) {
      const s = this.craft[i];
      if (s) this.giveBack(s);
      this.craft[i] = null;
    }
  }

  // ---------- События от сервера ----------

  setContainerSlot(cid: string, slot: number, item: ItemStack | null): void {
    if (this.container?.cid !== cid) return;
    this.container.slots[slot] = item;
    this.render();
  }

  setProgress(cid: string, burn: number, burnMax: number, cook: number): void {
    if (this.container?.cid !== cid) return;
    this.container.burn = burn;
    this.container.burnMax = burnMax;
    this.container.cook = cook;
    const flame = this.panel.querySelector<HTMLElement>('.flame');
    const arrow = this.panel.querySelector<HTMLElement>('.cook-arrow');
    if (flame) flame.style.setProperty('--burn', `${burnMax ? Math.round((burn / burnMax) * 100) : 0}%`);
    if (arrow) arrow.style.setProperty('--cook', `${Math.round((cook / 200) * 100)}%`);
  }

  containerClosed(cid: string): void {
    if (this.container?.cid === cid) this.close();
  }

  /** Перерисовать (например, подобрали предмет при открытом окне). */
  refresh(): void {
    if (this.kind) this.render();
  }

  // ---------- Построение окна ----------

  private slot(group: Group, index: number, extra?: (el: HTMLElement) => void): HTMLElement {
    const el = document.createElement('div');
    el.className = 'slot';
    el.dataset.g = group;
    el.dataset.i = String(index);
    extra?.(el);
    this.slots.push(el);
    return el;
  }

  private grid(group: Group, from: number, count: number, cols: number): HTMLElement {
    const g = document.createElement('div');
    g.className = 'inv-grid';
    g.style.gridTemplateColumns = `repeat(${cols}, var(--slot))`;
    for (let i = 0; i < count; i++) g.append(this.slot(group, from + i));
    return g;
  }

  private title(text: string): HTMLElement {
    const t = document.createElement('div');
    t.className = 'inv-title';
    t.textContent = text;
    return t;
  }

  private playerSection(): HTMLElement[] {
    const main = this.grid('main', HOTBAR_SIZE, INVENTORY_SIZE - HOTBAR_SIZE, 9);
    const hot = this.grid('hotbar', 0, HOTBAR_SIZE, 9);
    hot.style.marginTop = '6px';
    return [this.title('Инвентарь'), main, hot];
  }

  private craftingRow(): HTMLElement {
    const row = document.createElement('div');
    row.className = 'inv-row';
    const g = document.createElement('div');
    g.className = 'craft-grid';
    g.style.gridTemplateColumns = `repeat(${this.craftW}, var(--slot))`;
    for (let i = 0; i < this.craftW * this.craftW; i++) g.append(this.slot('craft', i));
    const arrow = document.createElement('div');
    arrow.className = 'arrow';
    arrow.textContent = '➜';
    const toggle = document.createElement('button');
    toggle.className = 'book-toggle';
    toggle.title = 'Книга рецептов';
    const img = document.createElement('img');
    img.src = itemIcon(this.atlas, Item.BOOK);
    img.alt = 'Рецепты';
    toggle.append(img);
    toggle.onclick = () => {
      this.bookOpen = !this.bookOpen;
      try {
        localStorage.setItem(BOOK_KEY, this.bookOpen ? '1' : '0');
      } catch {
        // не сохранится — не страшно
      }
      this.bookKey = '';
      this.renderBook();
    };
    row.append(g, arrow, this.slot('out', 0), toggle);
    return row;
  }

  private build(): void {
    this.slots = [];
    const parts: HTMLElement[] = [];
    switch (this.kind) {
      case 'inventory': {
        const top = document.createElement('div');
        top.className = 'inv-row';
        const armor = document.createElement('div');
        armor.className = 'inv-col';
        for (let i = 0; i < 4; i++) armor.append(this.slot('armor', i));
        const craftBox = document.createElement('div');
        craftBox.className = 'inv-col';
        craftBox.append(this.title('Создание'), this.craftingRow());
        top.append(armor, craftBox);
        parts.push(top, ...this.playerSection());
        if (this.mode() === 'creative') {
          const btn = document.createElement('button');
          btn.className = 'mc-button small';
          btn.textContent = 'Творческий инвентарь';
          btn.onclick = () => this.open('creative');
          parts.push(btn);
        }
        break;
      }
      case 'crafting':
        parts.push(this.title('Верстак'), this.craftingRow(), ...this.playerSection());
        break;
      case 'chest':
        parts.push(this.title('Сундук'), this.grid('cont', 0, 27, 9), ...this.playerSection());
        break;
      case 'furnace': {
        const ui = document.createElement('div');
        ui.className = 'furnace-ui';
        const col = document.createElement('div');
        col.className = 'inv-col';
        const flame = document.createElement('div');
        flame.className = 'flame';
        col.append(this.slot('cont', 0), flame, this.slot('cont', 1));
        const arrow = document.createElement('div');
        arrow.className = 'cook-arrow';
        ui.append(col, arrow, this.slot('cont', 2));
        parts.push(this.title('Печь'), ui, ...this.playerSection());
        break;
      }
      case 'creative': {
        const tabs = document.createElement('div');
        tabs.className = 'creative-tabs';
        for (const t of TABS) {
          const b = document.createElement('button');
          b.textContent = t.name;
          b.className = t.key === this.tab ? 'active' : '';
          b.onclick = () => {
            this.tab = t.key;
            this.build();
            this.render();
          };
          tabs.append(b);
        }
        const inv = document.createElement('button');
        inv.textContent = 'Инвентарь';
        inv.onclick = () => this.open('inventory');
        tabs.append(inv);
        const grid = document.createElement('div');
        grid.className = 'creative-grid';
        const filter = TABS.find((t) => t.key === this.tab)!.filter;
        CREATIVE_ITEMS.filter(filter).forEach((id) => grid.append(this.slot('creative', id)));
        const bottom = document.createElement('div');
        bottom.className = 'inv-row';
        bottom.append(this.grid('hotbar', 0, HOTBAR_SIZE, 9), this.slot('trash', 0, (el) => el.classList.add('trash')));
        parts.push(this.title('Творческий режим'), tabs, grid, bottom);
        break;
      }
    }
    this.panel.replaceChildren(...parts);
    if (this.kind === 'furnace' && this.container) this.setProgress(this.container.cid, this.container.burn ?? 0, this.container.burnMax ?? 0, this.container.cook ?? 0);
  }

  // ---------- Данные ячеек ----------

  private output(): ItemStack | null {
    const grid = this.craftW === 3 ? this.craft : [this.craft[0], this.craft[1], this.craft[2], this.craft[3]];
    return matchRecipe(grid, this.craftW)?.result ?? null;
  }

  private stackOf(el: HTMLElement): ItemStack | null {
    const i = Number(el.dataset.i);
    switch (el.dataset.g as Group) {
      case 'main':
      case 'hotbar':
        return this.inv.slots[i];
      case 'armor':
        return this.inv.armor[i];
      case 'craft':
        return this.craft[i];
      case 'out':
        return this.output();
      case 'cont':
        return this.container?.slots[i] ?? null;
      case 'creative':
        return stack(i, 1);
      default:
        return null;
    }
  }

  private render(): void {
    for (const el of this.slots) renderSlot(el, this.stackOf(el), this.atlas);
    this.cursorEl.hidden = !this.cursor;
    renderSlot(this.cursorEl, this.cursor, this.atlas);
    this.placeFloating();
    this.renderBook();
  }

  // ---------- Книга рецептов ----------

  private setupBook(): void {
    this.book.addEventListener('contextmenu', (e) => e.preventDefault());
    this.book.addEventListener('pointerdown', (e) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('.slot[data-r]');
      if (!el) return;
      e.preventDefault();
      const r = this.bookRecipes[Number(el.dataset.r)];
      if (r) this.fillRecipe(r, e.shiftKey || e.button === 2);
    });
    this.book.addEventListener('pointerover', (e) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('.slot[data-r]');
      if (!el || e.pointerType === 'touch') return this.hideTooltip();
      const r = this.bookRecipes[Number(el.dataset.r)];
      if (!r) return this.hideTooltip();
      let text = itemDef(r.result.id)?.name ?? '';
      if (!recipeLayout(r, this.craftW)) text += ' — нужен верстак';
      else if (!canCraftFrom(r, [...this.inv.slots, ...this.craft])) text += ' — не хватает материалов';
      this.tooltip.textContent = text;
      this.tooltip.hidden = false;
      this.placeFloating();
    });
    this.book.addEventListener('pointerout', () => this.hideTooltip());
  }

  /** Список рецептов: сначала те, что можно сделать здесь и сейчас. */
  private renderBook(): void {
    const show = (this.kind === 'inventory' || this.kind === 'crafting') && this.bookOpen;
    this.book.hidden = !show;
    if (!show) return;
    const have = [...this.inv.slots, ...this.craft];
    const rows = RECIPES.map((r) => ({ r, fits: !!recipeLayout(r, this.craftW), ok: canCraftFrom(r, have) }))
      .filter((x) => this.bookAll || x.ok)
      .sort((a, b) => Number(b.ok && b.fits) - Number(a.ok && a.fits) || Number(b.ok) - Number(a.ok));
    const key = `${this.craftW}|${this.bookAll}|${rows.map((x) => `${RECIPES.indexOf(x.r)}${x.ok ? 1 : 0}${x.fits ? 1 : 0}`).join(',')}`;
    if (key === this.bookKey) return;
    this.bookKey = key;
    this.bookRecipes = rows.map((x) => x.r);

    const title = document.createElement('div');
    title.className = 'inv-title';
    title.textContent = 'Рецепты';
    const label = document.createElement('label');
    const all = document.createElement('input');
    all.type = 'checkbox';
    all.checked = this.bookAll;
    all.onchange = () => {
      this.bookAll = all.checked;
      this.renderBook();
    };
    label.append(all, 'Показать все');
    const grid = document.createElement('div');
    grid.className = 'recipe-grid';
    rows.forEach((x, i) => {
      const el = document.createElement('div');
      el.className = `slot${x.ok && x.fits ? ' ready' : ' locked'}`;
      el.dataset.r = String(i);
      renderSlot(el, x.r.result, this.atlas);
      grid.append(el);
    });
    if (!rows.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'Пока ничего — добудьте дерево (бейте ствол дерева)';
      grid.append(empty);
    }
    this.book.replaceChildren(title, label, grid);
  }

  /** Разложить ингредиенты рецепта по сетке крафта (с Shift — сколько хватит). */
  private fillRecipe(r: Recipe, max: boolean): void {
    const layout = recipeLayout(r, this.craftW);
    if (!layout) return;
    this.returnCraft();
    for (let n = 0; n < (max ? 64 : 1); n++) {
      const slots = this.inv.slots.map((s) => (s ? { ...s } : null));
      const craft = this.craft.map((s) => (s ? { ...s } : null));
      let ok = true;
      for (let k = 0; k < layout.length && ok; k++) {
        const ing = layout[k];
        if (ing === null) continue;
        const cur = craft[k];
        if (cur && cur.count >= maxStackOf(cur.id)) {
          ok = false;
          break;
        }
        const idx = slots.findIndex((s) => !!s && (cur ? s.id === cur.id : ingredientMatches(ing, s.id)));
        if (idx < 0) {
          ok = false;
          break;
        }
        const s = slots[idx]!;
        slots[idx] = s.count > 1 ? { ...s, count: s.count - 1 } : null;
        craft[k] = cur ? { ...cur, count: cur.count + 1 } : { ...s, count: 1 };
      }
      if (!ok) break;
      slots.forEach((s, k) => (this.inv.slots[k] = s));
      craft.forEach((s, k) => (this.craft[k] = s));
    }
    this.h.sound('click');
    this.inv.changed();
    this.render();
  }

  private placeFloating(): void {
    this.cursorEl.style.left = `${this.pointer.x}px`;
    this.cursorEl.style.top = `${this.pointer.y}px`;
    this.tooltip.style.left = `${this.pointer.x + 16}px`;
    this.tooltip.style.top = `${this.pointer.y - 30}px`;
  }

  private hideTooltip(): void {
    this.tooltip.hidden = true;
  }

  // ---------- Клики ----------

  private onPointerDown = (e: PointerEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('.slot');
    if (!el) return;
    e.preventDefault();
    this.pointer = { x: e.clientX, y: e.clientY };
    if (e.pointerType === 'touch') {
      this.longPressed = false;
      clearTimeout(this.longPress);
      this.longPress = window.setTimeout(() => {
        this.longPressed = true;
        this.click(el, true, false);
      }, 420);
      return;
    }
    this.click(el, e.button === 2, e.shiftKey);
  };

  private onPointerUp = (e: PointerEvent) => {
    if (e.pointerType !== 'touch') return;
    clearTimeout(this.longPress);
    const el = (e.target as HTMLElement).closest<HTMLElement>('.slot');
    if (!el || this.longPressed) return;
    const now = performance.now();
    const double = this.lastTap.el === el && now - this.lastTap.time < 320;
    this.lastTap = { el, time: now };
    if (double) {
      // Второй тап отменяет первый и делает быстрый перенос.
      this.click(el, false, false);
      this.click(el, false, true);
    } else this.click(el, false, false);
  };

  private click(el: HTMLElement, right: boolean, shift: boolean): void {
    const group = el.dataset.g as Group;
    const i = Number(el.dataset.i);
    const contBefore = this.container ? this.container.slots.map((s) => (s ? { ...s } : null)) : null;

    switch (group) {
      case 'main':
      case 'hotbar':
        if (shift) this.quickFromInventory(i);
        else this.cursor = clickSlot(this.inv.slots, i, this.cursor, right);
        break;
      case 'armor':
        if (shift) {
          const s = this.inv.armor[i];
          if (s && addItem(this.inv.slots, { ...s }) === 0) this.inv.armor[i] = null;
        } else this.cursor = clickSlot(this.inv.armor, i, this.cursor, right, (s) => itemDef(s.id)?.armor?.slot === i);
        break;
      case 'craft':
        if (shift) {
          const s = this.craft[i];
          if (s) {
            const left = addItem(this.inv.slots, { ...s });
            this.craft[i] = left > 0 ? { ...s, count: left } : null;
          }
        } else this.cursor = clickSlot(this.craft, i, this.cursor, right);
        break;
      case 'out':
        this.takeOutput(shift);
        break;
      case 'cont': {
        if (!this.container) break;
        const slots = this.container.slots;
        if (shift) {
          const s = slots[i];
          if (s) {
            const left = addItem(this.inv.slots, { ...s });
            slots[i] = left > 0 ? { ...s, count: left } : null;
          }
        } else {
          const furnaceOut = this.container.kind === 'furnace' && i === 2;
          this.cursor = furnaceOut ? this.takeOnly(slots, i) : clickSlot(slots, i, this.cursor, right);
        }
        break;
      }
      case 'creative': {
        const max = maxStackOf(i);
        if (shift) addItem(this.inv.slots, stack(i, max));
        else if (this.cursor && this.cursor.id === i && !right) this.cursor = { ...this.cursor, count: Math.min(max, this.cursor.count + 1) };
        else if (this.cursor) this.cursor = null;
        else this.cursor = stack(i, right ? 1 : max);
        break;
      }
      case 'trash':
        this.cursor = null;
        break;
    }

    if (this.container && contBefore) {
      this.container.slots.forEach((s, k) => {
        const b = contBefore[k];
        const same = (!s && !b) || (s && b && s.id === b.id && s.count === b.count && (s.dmg ?? 0) === (b.dmg ?? 0));
        if (!same) this.h.containerSlot(this.container!.cid, k, s);
      });
    }
    this.h.sound('click');
    this.inv.changed();
    this.render();
  }

  /** Из выхода печи можно только забрать. */
  private takeOnly(slots: Slots, i: number): ItemStack | null {
    const s = slots[i];
    if (!s) return this.cursor;
    if (!this.cursor) {
      slots[i] = null;
      return s;
    }
    if (this.cursor.id === s.id && this.cursor.count + s.count <= maxStackOf(s.id)) {
      slots[i] = null;
      return { ...this.cursor, count: this.cursor.count + s.count };
    }
    return this.cursor;
  }

  /** Shift-клик по своему инвентарю. */
  private quickFromInventory(i: number): void {
    const s = this.inv.slots[i];
    if (!s) return;
    const put = (target: Slots, order: number[]) => {
      const left = addItem(target, { ...s }, order);
      this.inv.slots[i] = left > 0 ? { ...s, count: left } : null;
    };
    if (this.kind === 'chest' && this.container) return put(this.container.slots, Array.from({ length: 27 }, (_, k) => k));
    if (this.kind === 'furnace' && this.container) {
      if (SMELTING[s.id]) return put(this.container.slots, [0]);
      if (fuelTicks(s.id) > 0) return put(this.container.slots, [1]);
    }
    const armor = itemDef(s.id)?.armor;
    if (this.kind === 'inventory' && armor && !this.inv.armor[armor.slot]) {
      this.inv.armor[armor.slot] = s;
      this.inv.slots[i] = null;
      return;
    }
    if (this.kind === 'creative') return;
    // Хотбар ↔ основной инвентарь.
    const target = i < HOTBAR_SIZE ? Array.from({ length: 27 }, (_, k) => k + 9) : Array.from({ length: 9 }, (_, k) => k);
    const copy = { ...s };
    this.inv.slots[i] = null;
    const left = addItem(this.inv.slots, copy, target);
    if (left > 0) this.inv.slots[i] = { ...s, count: left };
  }

  /** Забрать результат крафта (с Shift — сколько получится). */
  private takeOutput(shift: boolean): void {
    for (let n = 0; n < (shift ? 64 : 1); n++) {
      const out = this.output();
      if (!out) return;
      if (shift) {
        const probe = this.inv.slots.map((s) => (s ? { ...s } : null));
        if (addItem(probe, { ...out }) > 0) return;
        addItem(this.inv.slots, { ...out });
      } else {
        if (this.cursor && (this.cursor.id !== out.id || this.cursor.count + out.count > maxStackOf(out.id))) return;
        this.cursor = this.cursor ? { ...this.cursor, count: this.cursor.count + out.count } : { ...out };
      }
      const cells = this.craftW * this.craftW;
      for (let k = 0; k < cells; k++) {
        const s = this.craft[k];
        if (!s) continue;
        this.craft[k] = s.count > 1 ? { ...s, count: s.count - 1 } : null;
      }
      this.h.sound('pop');
    }
  }
}
