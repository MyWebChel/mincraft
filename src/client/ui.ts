import type { ItemStack } from '../shared/inventory';
import { itemDef, itemName } from '../shared/items';
import type { GameMode } from '../shared/protocol';
import type { PlayerInventory } from './inventory';
import { hudIcon, itemIcon, type Atlas } from './textures';

export type Screen = 'menu' | 'loading' | 'pause' | 'death' | 'inventory' | 'disconnected';

const SCREENS: Record<Screen, string> = {
  menu: 'menu',
  loading: 'loading',
  pause: 'pause',
  death: 'death',
  inventory: 'inventory-screen',
  disconnected: 'disconnected',
};
const MAX_CHAT_LINES = 80;
const CHAT_FADE_MS = 10_000;

export const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

/** Рисует содержимое ячейки: иконка, количество, полоска прочности. */
export function renderSlot(el: HTMLElement, stack: ItemStack | null, atlas: Atlas): void {
  const key = stack ? `${stack.id}:${stack.count}:${stack.dmg ?? 0}` : '';
  if (el.dataset.key === key) return;
  el.dataset.key = key;
  el.replaceChildren();
  if (!stack) return;
  const img = document.createElement('img');
  img.src = itemIcon(atlas, stack.id);
  img.alt = '';
  img.draggable = false;
  el.append(img);
  if (stack.count > 1) {
    const c = document.createElement('span');
    c.className = 'count';
    c.textContent = String(stack.count);
    el.append(c);
  }
  const max = itemDef(stack.id)?.durability;
  if (max && stack.dmg) {
    const frac = 1 - stack.dmg / max;
    const bar = document.createElement('span');
    bar.className = 'dur';
    const fill = document.createElement('i');
    fill.style.width = `${Math.round(frac * 100)}%`;
    fill.style.background = `hsl(${Math.round(frac * 120)}, 90%, 50%)`;
    bar.append(fill);
    el.append(bar);
  }
}

/** DOM-интерфейс поверх игры: экраны, HUD, хотбар, чат, список игроков. */
export class UI {
  private itemNameTimer = 0;
  private hudKey = '';

  constructor(private readonly atlas: Atlas) {}

  show(screen: Screen | null): void {
    for (const [s, id] of Object.entries(SCREENS)) $(id).hidden = s !== screen;
  }

  setHud(visible: boolean): void {
    $('hud').hidden = !visible;
  }

  setLoading(fraction: number): void {
    $('loading-bar').style.width = `${Math.round(Math.max(0, Math.min(1, fraction)) * 100)}%`;
  }

  renderHotbar(inv: PlayerInventory, onSelect: (slot: number) => void): void {
    const bar = $('hotbar');
    if (bar.childElementCount !== 9) {
      bar.replaceChildren(
        ...Array.from({ length: 9 }, (_, i) => {
          const slot = document.createElement('div');
          slot.className = 'slot';
          slot.addEventListener('pointerdown', (e) => {
            e.stopPropagation();
            onSelect(i);
          });
          return slot;
        }),
      );
    }
    Array.from(bar.children).forEach((el, i) => {
      el.classList.toggle('selected', i === inv.selected);
      renderSlot(el as HTMLElement, inv.slots[i], this.atlas);
    });
  }

  /** Сердечки, еда, броня, воздух. В творческом режиме скрыты. */
  setStatus(hp: number, food: number, armor: number, air: number, mode: GameMode, lowHpShake: boolean): void {
    const key = `${Math.ceil(hp)}|${food}|${armor}|${Math.ceil(air)}|${mode}|${lowHpShake}`;
    if (key === this.hudKey) return;
    this.hudKey = key;
    const survival = mode === 'survival';
    $('status').style.visibility = survival ? 'visible' : 'hidden';
    if (!survival) return;
    const row = (id: string, value: number, full: Parameters<typeof hudIcon>[0], half: Parameters<typeof hudIcon>[0], empty: Parameters<typeof hudIcon>[0] | null, show = true) => {
      const el = $(id);
      el.replaceChildren();
      if (!show) return;
      for (let i = 0; i < 10; i++) {
        const v = value - i * 2;
        const name = v >= 2 ? full : v === 1 ? half : empty;
        if (!name) continue;
        const icon = document.createElement('i');
        icon.style.backgroundImage = `url(${hudIcon(name)})`;
        el.append(icon);
      }
    };
    row('hearts', Math.ceil(hp), 'heart_full', 'heart_half', 'heart_empty');
    row('food', food, 'food_full', 'food_half', 'food_empty');
    row('armor-bar', armor, 'armor_full', 'armor_half', 'armor_empty', armor > 0);
    // Пузырьки воздуха: 10 штук на 15 секунд.
    const bubbles = Math.ceil((air / 15) * 10);
    const airEl = $('air');
    airEl.replaceChildren();
    if (air < 15) {
      for (let i = 0; i < bubbles; i++) {
        const icon = document.createElement('i');
        icon.style.backgroundImage = `url(${hudIcon(i === bubbles - 1 && air % 1.5 < 0.4 ? 'bubble_pop' : 'bubble')})`;
        airEl.append(icon);
      }
    }
    $('hearts').classList.toggle('shake', lowHpShake);
  }

  flashItemName(id: number | null): void {
    const el = $('item-name');
    el.textContent = id ? itemName(id) : '';
    el.classList.add('show');
    clearTimeout(this.itemNameTimer);
    this.itemNameTimer = window.setTimeout(() => el.classList.remove('show'), 1600);
  }

  addChat(from: string | null, color: string | undefined, text: string): void {
    const line = document.createElement('div');
    line.className = 'chat-line' + (from ? '' : ' system');
    if (from) {
      const name = document.createElement('b');
      name.textContent = `<${from}> `;
      if (color) name.style.color = color;
      line.append(name);
    }
    line.append(document.createTextNode(text));
    const log = $('chat-log');
    log.append(line);
    while (log.childElementCount > MAX_CHAT_LINES) log.firstElementChild!.remove();
    log.scrollTop = log.scrollHeight;
    setTimeout(() => line.classList.add('faded'), CHAT_FADE_MS);
  }

  openChat(prefix: string): void {
    $('chat').classList.add('open');
    $('chat-form').hidden = false;
    const input = $<HTMLInputElement>('chat-input');
    input.value = prefix;
    // Фокус после текущего события, иначе нажатая «T» попадёт в поле ввода.
    setTimeout(() => input.focus(), 0);
  }

  closeChat(): void {
    $('chat').classList.remove('open');
    $('chat-form').hidden = true;
    $<HTMLInputElement>('chat-input').blur();
  }

  setPlayerList(players: { name: string; color: string }[] | null): void {
    const el = $('player-list');
    el.hidden = !players;
    if (!players) return;
    const title = document.createElement('div');
    title.textContent = `Игроки онлайн: ${players.length}`;
    el.replaceChildren(
      title,
      ...players.map((p) => {
        const row = document.createElement('div');
        const swatch = document.createElement('i');
        swatch.style.background = p.color;
        row.append(swatch, document.createTextNode(p.name));
        return row;
      }),
    );
  }

  setDebug(text: string | null): void {
    const el = $('debug');
    el.hidden = text === null;
    if (text !== null) el.textContent = text;
  }

  setUnderwater(on: boolean): void {
    $('underwater').classList.toggle('on', on);
  }

  setSleeping(on: boolean): void {
    $('sleep-overlay').classList.toggle('on', on);
  }

  get isSleeping(): boolean {
    return $('sleep-overlay').classList.contains('on');
  }
}
