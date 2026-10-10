/**
 * Иконки HUD 9×9: сердца здоровья, голод (окорочок), броня (нагрудник) и
 * пузырьки воздуха. Прозрачный фон, тёмная обводка. Половинки собираются из
 * полной и пустой иконки: у сердца и брони заполнена левая половина, у еды —
 * правая (полоса голода в Minecraft зеркальна и убывает слева направо).
 */
import { Tile, hex, type Painter } from './pixelart';

export const HUD_ICON_SIZE = 9;

export type HudIcon =
  | 'heart_full'
  | 'heart_half'
  | 'heart_empty'
  | 'food_full'
  | 'food_half'
  | 'food_empty'
  | 'armor_full'
  | 'armor_half'
  | 'armor_empty'
  | 'bubble'
  | 'bubble_pop';

/** Рисует ASCII-шаблон 9×9; '.' — прозрачный пиксель. keep(x) решает, какие столбцы рисовать. */
function draw(t: Tile, rows: string[], inks: Record<string, string>, keep: (x: number) => boolean = () => true): void {
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ink = inks[row[x]];
      if (ink && keep(x)) t.set(x, y, hex(ink));
    }
  });
}

function icon(rows: string[], inks: Record<string, string>): Painter {
  return (t) => draw(t, rows, inks);
}

/** Половинка: заполненная часть из full, остальное — пустой контейнер. */
function half(rows: string[], full: Record<string, string>, empty: Record<string, string>, leftFull: boolean): Painter {
  return (t) => {
    const cut = (x: number) => (leftFull ? x <= 4 : x >= 4);
    draw(t, rows, empty, (x) => !cut(x));
    draw(t, rows, full, cut);
  };
}

const HEART = [
  '.kkk.kkk.',
  'kWWRkRRRk',
  'kWRRRRRRk',
  'kRRRRRRDk',
  '.kRRRRDk.',
  '..kRRDk..',
  '...kDk...',
  '....k....',
  '.........',
];
const HEART_FULL = { k: '#1e0505', W: '#ffc4c4', R: '#e0201f', D: '#a3100f' };
const HEART_EMPTY = { k: '#1e0505', W: '#4a3434', R: '#2f1e1e', D: '#241616' };

const FOOD = [
  '....kkkk.',
  '...kMHMMk',
  '..kMHMMMk',
  '..kMMMMDk',
  '.kWkMMDk.',
  'kWWWkkk..',
  'kWWk.....',
  '.kk......',
  '.........',
];
const FOOD_FULL = { k: '#2a1405', M: '#b5642a', H: '#e09a52', D: '#7f3f14', W: '#f2eee4' };
const FOOD_EMPTY = { k: '#2a1405', M: '#33261b', H: '#45362a', D: '#271c13', W: '#3a3a36' };

const ARMOR = [
  'kkk...kkk',
  'kLLkkkLAk',
  'kLAAAAAAk',
  'kkAAAAAkk',
  '.kLAAAAk.',
  '.kAAAADk.',
  '.kAAADDk.',
  '.kkkkkkk.',
  '.........',
];
const ARMOR_FULL = { k: '#1c1c1c', L: '#ffffff', A: '#d6d6d6', D: '#9a9a9a' };
const ARMOR_EMPTY = { k: '#1c1c1c', L: '#3c3c3c', A: '#2c2c2c', D: '#232323' };

const BUBBLE = [
  '..kkkkk..',
  '.kLLLLLk.',
  'kLWWBBBLk',
  'kLWBBBBLk',
  'kLBBBBBLk',
  'kLBBBBDLk',
  'kLBBBDDLk',
  '.kLLLLLk.',
  '..kkkkk..',
];

const BUBBLE_POP = [
  '....k....',
  '.k..L..k.',
  '..L...L..',
  '.........',
  'kL.....Lk',
  '.........',
  '..L...L..',
  '.k..L..k.',
  '....k....',
];

const BUBBLE_INKS = { k: '#0d2a5e', L: '#8fc3ff', W: '#ffffff', B: '#c9e4ff', D: '#a3cbff' };

export const HUD_PAINTERS: Record<HudIcon, Painter> = {
  heart_full: icon(HEART, HEART_FULL),
  heart_half: half(HEART, HEART_FULL, HEART_EMPTY, true),
  heart_empty: icon(HEART, HEART_EMPTY),
  food_full: icon(FOOD, FOOD_FULL),
  food_half: half(FOOD, FOOD_FULL, FOOD_EMPTY, false),
  food_empty: icon(FOOD, FOOD_EMPTY),
  armor_full: icon(ARMOR, ARMOR_FULL),
  armor_half: half(ARMOR, ARMOR_FULL, ARMOR_EMPTY, true),
  armor_empty: icon(ARMOR, ARMOR_EMPTY),
  bubble: icon(BUBBLE, BUBBLE_INKS),
  bubble_pop: icon(BUBBLE_POP, BUBBLE_INKS),
};
