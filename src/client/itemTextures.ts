/**
 * Процедурные спрайты предметов 16×16 (прозрачный фон, тёмная обводка как у
 * предметов Minecraft). Для каждого имени из ITEM_SPRITES (src/shared/items.ts)
 * есть «художник». Инструменты и броня собираются из общих форм и палитр
 * материалов, остальные предметы нарисованы ASCII-шаблонами.
 */
import { Tile, hex, mix, type Painter, type RGB, type Rnd } from './pixelart';

const N = 16;

const lum = (c: RGB) => c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114;

/**
 * Черновик спрайта: цвет пикселя и цвет обводки его материала. emit() добавляет
 * обводку в 1 пиксель (по 4 соседям) вокруг нарисованного, выбирая самый тёмный
 * из цветов обводки соседних материалов.
 */
class Sprite {
  private readonly c: (RGB | null)[];
  private readonly o: (RGB | null)[];

  constructor(
    readonly w = N,
    readonly h = N,
  ) {
    this.c = new Array<RGB | null>(w * h).fill(null);
    this.o = new Array<RGB | null>(w * h).fill(null);
  }

  private inside(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.w && y < this.h;
  }

  put(x: number, y: number, c: RGB, outline: RGB | null = null): void {
    if (!this.inside(x, y)) return;
    this.c[y * this.w + x] = c;
    this.o[y * this.w + x] = outline;
  }

  emit(t: Tile): void {
    for (let y = 0; y < this.h; y++)
      for (let x = 0; x < this.w; x++) {
        const c = this.c[y * this.w + x];
        if (c) {
          t.set(x, y, c);
          continue;
        }
        let best: RGB | null = null;
        for (const [dx, dy] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          if (!this.inside(x + dx, y + dy)) continue;
          const o = this.o[(y + dy) * this.w + x + dx];
          if (o && (!best || lum(o) < lum(best))) best = o;
        }
        if (best) t.set(x, y, best);
      }
  }
}

/** Цвета → палитра; строковая запись '#rrggbb' или список для случайного выбора. */
type Inks = Record<string, string | string[]>;

/**
 * Рисует ASCII-шаблон в спрайт. outline: общий цвет обводки, словарь «символ → цвет
 * обводки» (ключ '*' — для остальных символов) или null (без обводки).
 */
function drawArt(
  s: Sprite,
  rnd: Rnd,
  rows: string[],
  inks: Inks,
  outline: string | Record<string, string> | null,
  x0 = 0,
  y0 = 0,
): void {
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ink = inks[row[x]];
      if (!ink) continue;
      const list = Array.isArray(ink) ? ink : [ink];
      const o = outline === null ? null : typeof outline === 'string' ? outline : (outline[row[x]] ?? outline['*'] ?? null);
      s.put(x0 + x, y0 + y, hex(list[Math.floor(rnd() * list.length)]), o ? hex(o) : null);
    }
  });
}

function art(rows: string[], inks: Inks, outline: string | Record<string, string> | null): Painter {
  return (t, rnd) => {
    const s = new Sprite(t.width, t.height);
    drawArt(s, rnd, rows, inks, outline);
    s.emit(t);
  };
}

/** Палитра материала: блик, свет, основной, тень, обводка. */
interface Mat {
  hi: RGB;
  light: RGB;
  mid: RGB;
  dark: RGB;
  outline: RGB;
}

const mat = (hi: string, light: string, mid: string, dark: string, outline: string): Mat => ({
  hi: hex(hi),
  light: hex(light),
  mid: hex(mid),
  dark: hex(dark),
  outline: hex(outline),
});

/** Заливка маски с фаской: свет сверху-слева, тень снизу-справа. */
function shaded(s: Sprite, mask: (x: number, y: number) => boolean, m: Mat): void {
  for (let y = 0; y < s.h; y++)
    for (let x = 0; x < s.w; x++) {
      if (!mask(x, y)) continue;
      const up = mask(x, y - 1);
      const left = mask(x - 1, y);
      const lit = !up || !left;
      const dark = !mask(x, y + 1) || !mask(x + 1, y);
      let c = lit && !dark ? m.light : dark && !lit ? m.dark : m.mid;
      if (!up && !left && !dark) c = m.hi;
      s.put(x, y, c, m.outline);
    }
}

const asciiMask =
  (rows: string[], ch = '#') =>
  (x: number, y: number): boolean =>
    y >= 0 && y < rows.length && x >= 0 && rows[y][x] === ch;

// ───────────────────────────── инструменты ─────────────────────────────

const STICK = mat('#b38b50', '#a27c45', '#8a6837', '#6a4f27', '#2a1c0b');

/**
 * Рукоять по диагонали снизу-слева вверх-вправо: две линии x+y=15 (светлая) и
 * x+y=16 (тёмная) для u = x−y от uMin до uMax.
 */
function handle(s: Sprite, uMax: number, uMin = -11): void {
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const u = x - y;
      const w = x + y;
      if ((w === 15 || w === 16) && u >= uMin && u <= uMax) s.put(x, y, w === 15 ? STICK.light : STICK.dark, STICK.outline);
    }
}

const PICKAXE_HEAD = [
  '................',
  '................',
  '...########.....',
  '.....########...',
  '.........####...',
  '..........####..',
  '...........###..',
  '............##..',
  '............##..',
  '............##..',
  '............##..',
  '.............#..',
  '.............#..',
];

/**
 * Топор: клиновидное лезвие расходится от короткой «шейки» у рукояти к широкой
 * режущей кромке в левом верхнем углу; за рукоятью — небольшой обух.
 * Координаты повёрнуты: u = x − y (вдоль рукояти), w = x + y (поперёк).
 */
function axeHead(x: number, y: number): boolean {
  const u = x - y;
  const w = x + y;
  if (w - u < 2 || u - w > -2) return false;
  if (w >= 7 && w <= 14) {
    const d = 14 - w;
    const trim = w === 7 ? 1.2 : 0;
    return u >= 2 - d * 0.65 + trim && u <= 4 + d * 0.6 - trim;
  }
  return (w === 17 || w === 18) && Math.abs(u - 3) <= 1.5;
}

const SHOVEL_HEAD = [
  '................',
  '................',
  '...........####.',
  '..........#####.',
  '..........#####.',
  '..........####..',
  '...........##...',
];

const HOE_HEAD = [
  '................',
  '................',
  '.....########...',
  '....#########...',
  '....##.....##...',
  '....#...........',
];

type ToolKind = 'pickaxe' | 'axe' | 'shovel' | 'sword' | 'hoe';

function tool(kind: ToolKind, m: Mat): Painter {
  return (t) => {
    const s = new Sprite();
    if (kind === 'sword') {
      // Клинок в три линии вдоль диагонали, гарда поперёк, рукоять и навершие.
      const blade = (x: number, y: number) => {
        const u = x - y;
        const w = x + y;
        return w >= 14 && w <= 16 && u >= -1 && u <= 13 - Math.abs(w - 15);
      };
      handle(s, -4, -8);
      shaded(s, blade, m);
      const guard = (x: number, y: number) => {
        const u = x - y;
        const w = x + y;
        return (u === -2 || u === -3) && w >= 11 && w <= 20;
      };
      shaded(s, guard, { ...m, hi: m.mid, light: m.mid, mid: m.dark, dark: mix(m.dark, m.outline, 0.4) });
      const pommel = (x: number, y: number) => {
        const u = x - y;
        const w = x + y;
        return (u === -9 || u === -10) && w >= 14 && w <= 17;
      };
      shaded(s, pommel, m);
      s.emit(t);
      return;
    }
    const top = { pickaxe: 4, axe: 6, shovel: 4, hoe: 6 }[kind];
    handle(s, top);
    const head = kind === 'axe' ? axeHead : asciiMask({ pickaxe: PICKAXE_HEAD, shovel: SHOVEL_HEAD, hoe: HOE_HEAD }[kind]);
    shaded(s, head, m);
    s.emit(t);
  };
}

const TOOL_MATS: Record<string, Mat> = {
  wooden: mat('#c9a466', '#b8925a', '#a5824f', '#8b6a3e', '#3b2a12'),
  stone: mat('#b8b8b8', '#a4a4a4', '#8a8a8a', '#6a6a6a', '#2c2c2c'),
  iron: mat('#ffffff', '#f2f2f2', '#d8d8d8', '#a9a9a9', '#383838'),
  golden: mat('#fffbd0', '#fbe77a', '#f2cf3a', '#c99b1b', '#4f3604'),
  diamond: mat('#e8fffc', '#b4fbf3', '#5fe0d6', '#2aa69e', '#0c3f3b'),
};

// ───────────────────────────── броня ─────────────────────────────

const HELMET = [
  '................',
  '................',
  '................',
  '.....######.....',
  '....########....',
  '...##########...',
  '...##########...',
  '...##########...',
  '...####..####...',
  '...###....###...',
  '...##......##...',
];

const CHESTPLATE = [
  '................',
  '................',
  '..####....####..',
  '.######..######.',
  '.##############.',
  '.##############.',
  '.##.########.##.',
  '...##########...',
  '...##########...',
  '...##########...',
  '...##########...',
  '...##########...',
  '...##########...',
  '....########....',
];

const LEGGINGS = [
  '................',
  '................',
  '...##########...',
  '...##########...',
  '...####..####...',
  '...####..####...',
  '...###....###...',
  '...###....###...',
  '...###....###...',
  '...###....###...',
  '...###....###...',
  '...###....###...',
  '...###....###...',
  '...###....###...',
];

const BOOTS = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '...###....###...',
  '...###....###...',
  '...###....###...',
  '...###....###...',
  '..####...####...',
  '..####...####...',
];

const ARMOR_SHAPES: Record<string, string[]> = { helmet: HELMET, chestplate: CHESTPLATE, leggings: LEGGINGS, boots: BOOTS };

/** Отделка поверх заливки: 'd' — тёмная кромка/шов, 'l' — блик. */
const ARMOR_TRIM: Record<string, string[]> = {
  helmet: ['', '', '', '', '', '....l...........', '', '...dddddddddd...'],
  chestplate: ['', '', '', '', '......dddd......', '..l.............', '', '.......dd.......', '.......dd.......', '.......dd.......', '', '', '', ''],
  leggings: ['', '', '....l...........', '...dddddddddd...'],
  boots: ['', '', '', '', '', '', '', '', '', '', '', '', '..dddd...dddd...'],
};

const ARMOR_MATS: Record<string, Mat> = {
  leather: mat('#b88148', '#a46f3a', '#8b5a2b', '#6a431f', '#2e1b0a'),
  iron: TOOL_MATS.iron,
  golden: TOOL_MATS.golden,
  diamond: TOOL_MATS.diamond,
};

function armor(piece: string, m: Mat): Painter {
  const rows = ARMOR_SHAPES[piece];
  const trim = ARMOR_TRIM[piece];
  return (t) => {
    const s = new Sprite();
    const mask = asciiMask(rows);
    shaded(s, mask, m);
    trim.forEach((row, y) => {
      for (let x = 0; x < row.length; x++)
        if (mask(x, y) && row[x] !== '.') s.put(x, y, row[x] === 'd' ? m.dark : m.light, m.outline);
    });
    s.emit(t);
  };
}

// ───────────────────────────── простые предметы ─────────────────────────────

const stick: Painter = (t) => {
  const s = new Sprite();
  handle(s, 9, -9);
  s.emit(t);
};

const LUMP = [
  '................',
  '................',
  '................',
  '.......abb......',
  '.....aabbbc.....',
  '....abbbcbbc....',
  '....babbbbcc....',
  '...abbbbbcbcd...',
  '...bbcbbbbccd...',
  '...bbbbcbbccd...',
  '....bbbbbccdd...',
  '....cbccccdd....',
  '.....ccddd......',
];

const coal = art(LUMP, { a: '#5c5c5c', b: ['#3a3a3a', '#363636'], c: '#262626', d: '#171717' }, '#080808');
const charcoal = art(LUMP, { a: '#6a5646', b: ['#45382e', '#41352b'], c: '#30271f', d: '#1e1813' }, '#0c0907');

const INGOT = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '......hhhhhhh...',
  '.....hlllllllr..',
  '....hlllllllrr..',
  '...ffffffffrr...',
  '...mmmmmmmmr....',
  '...dddddddd.....',
];

const ironIngot = art(INGOT, { h: '#ffffff', l: '#e8e8e8', r: '#9c9c9c', f: '#d4d4d4', m: '#c2c2c2', d: '#8e8e8e' }, '#353535');
const goldIngot = art(INGOT, { h: '#fffbd0', l: '#fbe46a', r: '#c4931a', f: '#f2cf3a', m: '#e3b92b', d: '#b4840f' }, '#4f3604');

const diamond = art(
  [
    '................',
    '................',
    '................',
    '.....wwllll.....',
    '....wllbbbbc....',
    '...wlbbbbbbcc...',
    '..llbbbbbbbbcc..',
    '..lbbbbbbbbbcd..',
    '...bbbbbbbbccd..',
    '....bbbbbbccd...',
    '.....bbbbccd....',
    '......bbccd.....',
    '.......bcd......',
    '........d.......',
  ],
  { w: '#ffffff', l: '#b9fbf3', b: '#5fe0d6', c: '#2fb3aa', d: '#1b7f78' },
  '#0c3f3b',
);

const flint = art(
  [
    '................',
    '................',
    '................',
    '........a.......',
    '.......abb......',
    '......abbbc.....',
    '.....abbcbbc....',
    '.....bbbbcbc....',
    '....abbcbbbcc...',
    '....bbbbbcbcc...',
    '....bcbbbbccd...',
    '.....bbcbccdd...',
    '......ccccdd....',
    '.......ddd......',
  ],
  { a: '#7c7c7c', b: '#525252', c: '#3b3b3b', d: '#272727' },
  '#0f0f0f',
);

/** Огниво: стальное кресало-«подкова» вверху справа и кремень внизу слева. */
function flintAndSteel(t: Tile, rnd: Rnd): void {
  const s = new Sprite();
  const STEEL = mat('#ffffff', '#e6e6e6', '#bdbdbd', '#858585', '#232323');
  shaded(
    s,
    (x, y) => {
      const dx = x + 0.5 - 10.5;
      const dy = y + 0.5 - 5.5;
      const d = Math.hypot(dx, dy);
      // Кольцо толщиной ~2 пикселя, разомкнутое влево — буква «C».
      return d >= 1.9 && d <= 3.7 && !(dx < 0 && Math.abs(dy) < 1.5);
    },
    STEEL,
  );
  drawArt(
    s,
    rnd,
    ['..ab...', '.abbc..', 'abbcbc.', 'bbcbccd', '.bccdd.', '..ddd..'],
    { a: '#7c7c7c', b: '#545454', c: '#3c3c3c', d: '#282828' },
    '#0f0f0f',
    2,
    8,
  );
  s.emit(t);
}

const stringItem = art(
  [
    '................',
    '................',
    '.............w..',
    '............w...',
    '...........w....',
    '........www.....',
    '.......w........',
    '......w.........',
    '......w.........',
    '.......gw.......',
    '.........w......',
    '.........w......',
    '........w.......',
    '......wg........',
    '....ww..........',
  ],
  { w: '#f4f4f4', g: '#cfcfcf' },
  '#3e3e3e',
);

function feather(t: Tile): void {
  const s = new Sprite();
  const VANE = hex('#f3f3f3');
  const VANE2 = hex('#d6d6d6');
  const SHAFT = hex('#a7a7a7');
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const u = x - y;
      const w = x + y;
      if (u < -10 || u > 11) continue;
      // Опахало: шире к середине и с левой стороны от стержня.
      const k = 1 - Math.abs(u - 1) / 11;
      const left = Math.round(3.2 * Math.sqrt(Math.max(0, k)));
      const right = Math.round(1.6 * Math.sqrt(Math.max(0, k)));
      if (w === 15) s.put(x, y, u < -7 ? hex('#8a8a8a') : SHAFT, hex('#5a5a5a'));
      else if (u > -7 && w < 15 && 15 - w <= left) s.put(x, y, (15 - w + u) % 4 === 0 ? VANE2 : VANE, hex('#5a5a5a'));
      else if (u > -7 && w > 15 && w - 15 <= right) s.put(x, y, VANE2, hex('#5a5a5a'));
    }
  s.emit(t);
}

const PILE = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '.......pp.......',
  '.....pppPpp.....',
  '....pPpppppPp...',
  '...ppppdpPpppp..',
  '..pPpppppppdppp.',
  '..ppdppPpppppp..',
  '...pppppdpppp...',
];

const gunpowder = art(PILE, { p: ['#7a7a7a', '#6c6c6c', '#858585'], P: '#ababab', d: '#454545' }, '#262626');
const boneMeal = art(PILE, { p: ['#ebe8dd', '#dcd8cc', '#f4f2ea'], P: '#ffffff', d: '#bdb8a8' }, '#6b665a');

function bone(t: Tile): void {
  const s = new Sprite();
  const W = hex('#f2efe6');
  const S = hex('#d3cebf');
  const O = hex('#5f5a4f');
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const u = x - y;
      const w = x + y;
      const shaft = (w === 15 || w === 16) && Math.abs(u) <= 8;
      // Утолщения-мыщелки на концах.
      const knob = Math.abs(u) >= 8 && Math.abs(u) <= 10 && ((w >= 12 && w <= 14) || (w >= 17 && w <= 19));
      if (shaft || knob) s.put(x, y, w >= 16 && !knob ? S : W, O);
    }
  s.emit(t);
}

function arrow(t: Tile): void {
  const s = new Sprite();
  const HEAD = mat('#ffffff', '#dcdcdc', '#b0b0b0', '#7c7c7c', '#262626');
  // Наконечник: треугольник с зазубринами у основания.
  shaded(
    s,
    (x, y) => {
      const u = x - y;
      const off = Math.abs(x + y - 15);
      return u >= 8 && u <= 11 && off <= 11 - u + (u === 8 ? 1 : 0);
    },
    HEAD,
  );
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const u = x - y;
      const w = x + y;
      const off = Math.abs(w - 15);
      if (w === 15 && u >= -11 && u <= 7) s.put(x, y, u < -6 ? hex('#5e4424') : hex('#7d5c33'), hex('#2a1c0b'));
      // Оперение: два пера по бокам от древка у хвоста.
      else if (off >= 1 && off <= 2 && u >= -11 && u <= -7 - off) s.put(x, y, w < 15 ? hex('#f4f4f4') : hex('#c4c4c4'), hex('#4a4a4a'));
    }
  s.emit(t);
}

function bow(t: Tile): void {
  const s = new Sprite();
  const WOOD = mat('#b08a52', '#9a7542', '#80602f', '#5e4520', '#24180a');
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const u = x - y;
      const w = x + y;
      if (Math.abs(u) > 11) continue;
      // Тетива — прямая по диагонали; плечи лука — дуга к левому верхнему углу.
      const arc = 15 - 9.5 * (1 - (u / 11.5) ** 2);
      const onArc = Math.abs(w - arc) <= 0.9;
      if (onArc) {
        const grip = Math.abs(u) <= 2;
        s.put(x, y, grip ? hex('#5a3a1c') : w < arc ? WOOD.light : WOOD.mid, WOOD.outline);
      } else if (w === 15 && Math.abs(u) <= 9) s.put(x, y, hex('#e6e6e6'), null);
    }
  s.emit(t);
}

const leather = art(
  [
    '................',
    '................',
    '................',
    '..LL........LL..',
    '..LMMMMMMMMMMM..',
    '...MMMlMMMMMMM..',
    '...MMMMMMMlMM...',
    '...MlMMMMMMMM...',
    '...MMMMMlMMMD...',
    '...MMMMMMMMMD...',
    '...MMlMMMMMMD...',
    '...MMMMMMMMMMD..',
    '..MMDDD...DDDD..',
    '..DD........DD..',
  ],
  { L: '#b9803f', M: ['#9a5f2c', '#94592a'], l: '#a96b33', D: '#764720' },
  '#331e0b',
);

const rottenFlesh = art(
  [
    '................',
    '................',
    '................',
    '........gg......',
    '......gGgbb.....',
    '....ggbbGbbb....',
    '...gbbbbbblGb...',
    '..gbbGbbbbbbbg..',
    '..bbblbbgbbbbb..',
    '..gbbbbbbbbGbb..',
    '...bbGbbblbbg...',
    '....bbbbgbbb....',
    '.....gbbbbb.....',
    '.......gg.......',
  ],
  { b: ['#94563a', '#8c5034'], l: '#b0704c', G: '#6f8c35', g: '#55702a' },
  '#2f1a10',
);

const wheatSeeds = art(
  [
    '................',
    '................',
    '................',
    '................',
    '.........a......',
    '....a....b......',
    '....b.......a...',
    '............b...',
    '.......a........',
    '.......b...ab...',
    '...ab...........',
    '..........a.....',
    '.......a..b.....',
    '.......b........',
  ],
  { a: '#b9cf62', b: '#7a9832' },
  '#26300c',
);

/** Сноп из трёх колосьев: просветы между колосьями заполняет тёмная обводка. */
const wheatItem = art(
  [
    '................',
    '...........E..E.',
    '..........Ee.Ee.',
    '.........eE.eE..',
    '........Ee.Ee.E.',
    '.......eE.eE.eE.',
    '.......s.Ee.Ee..',
    '......s.s..eE...',
    '......ss..s.....',
    '.....ss.ss......',
    '....kkks........',
    '....kks.........',
    '...ss...........',
    '..ss............',
  ],
  { E: '#f4d872', e: '#cfa640', s: ['#b8a046', '#a58c38'], k: '#7a5222' },
  '#3d2c08',
);

const bread = art(
  [
    '................',
    '................',
    '................',
    '................',
    '................',
    '.....LLLLLL.....',
    '...LLlLLlLLLL...',
    '..LlLLlLLlLLlL..',
    '.LLLLLLLLLLLLLL.',
    '.MMMMMMMMMMMMMMD',
    '.MMMMMMMMMMMMMD.',
    '..DDDDDDDDDDDD..',
  ],
  { L: '#c9903f', l: '#ecc26e', M: '#a86e2a', D: '#7a4d1c' },
  '#3a220c',
);

const apple = art(
  [
    '................',
    '................',
    '........S.......',
    '.......SLL......',
    '....rrrSrrr.....',
    '...rRRRrRRRr....',
    '..rRWRRRRRRRr...',
    '..rRWRRRRRRRr...',
    '..rRRRRRRRRRr...',
    '..rRRRRRRRRDr...',
    '...rRRRRRRDr....',
    '...rRRRRRRDr....',
    '....rRRRRDr.....',
    '.....rrrrr......',
  ],
  { S: '#5a3a1a', L: '#3f9a2a', r: '#b3161b', R: '#d8262b', W: '#ff9a8f', D: '#8a0f13' },
  { S: '#1f1006', L: '#123a0c', '*': '#3a0507' },
);

const CHOP = [
  '................',
  '................',
  '................',
  '................',
  '.......ffff.....',
  '.....ffpppff....',
  '....fpppPpppf...',
  '...fppPpppppf...',
  '...fpppppPppf...',
  '..fpppPpppppf...',
  '..fppppppppf....',
  '..fpppppppf.....',
  '...ffpppff......',
  '.....fff........',
];

const porkchop = art(CHOP, { f: '#f6dcd6', p: ['#ea9aa1', '#e5939a'], P: '#c96d78' }, '#5a2a2e');
const cookedPorkchop = art(CHOP, { f: '#e6c48e', p: ['#b5783c', '#ad7236'], P: '#8a5426' }, '#3a210c');

const STEAK = [
  '................',
  '................',
  '................',
  '................',
  '......rrrrr.....',
  '....rrRRrRRrr...',
  '...rRRwRRRRRr...',
  '..rRRRRRRwRRRr..',
  '..rRwRRRRRRRRr..',
  '..rRRRRRRwRRr...',
  '...rRRRRRRRRr...',
  '....rrRRRRrr....',
  '......rrrr......',
];

const beef = art(STEAK, { r: '#9a2320', R: ['#cc3630', '#c4322c'], w: '#f2c8c4' }, '#3f0b0a');
const steak = art(STEAK, { r: '#5e3a1e', R: ['#8c5c33', '#86572f'], w: '#b88c5a' }, '#2a1608');

const DRUMSTICK = [
  '................',
  '................',
  '................',
  '........mmmm....',
  '.......mMMMMm...',
  '......mMHMMMMm..',
  '......mMMMMMMm..',
  '......mMMMMMm...',
  '.....bmMMMMm....',
  '....bb.mmmm.....',
  '...bb...........',
  '.bbb............',
  '.bb.............',
  '..b.............',
];

const chicken = art(DRUMSTICK, { m: '#d9a493', M: '#f1cbbd', H: '#fff0e8', b: '#f4f0e6' }, { b: '#6b665a', '*': '#5a3328' });
const cookedChicken = art(DRUMSTICK, { m: '#9c6428', M: '#c98a3e', H: '#e8b56a', b: '#f4f0e6' }, { b: '#6b665a', '*': '#3a210c' });

const LEG = [
  '................',
  '................',
  '................',
  '......RRRR......',
  '....RRRRRRRr....',
  '...RRwRRRRRRr...',
  '...RRRRRRwRRr...',
  '...RRRRRRRRRr...',
  '....RRRwRRRr....',
  '.....RRRRRr.....',
  '......rrrb......',
  '........bb......',
  '........bbb.....',
  '.........bb.....',
];

const mutton = art(LEG, { R: ['#c23b3b', '#ba3636'], r: '#8a2626', w: '#eaa9a1', b: '#efe9dc' }, { b: '#6b665a', '*': '#3a0c0c' });
const cookedMutton = art(LEG, { R: ['#8f5732', '#88522f'], r: '#5e3418', w: '#c48e5c', b: '#efe9dc' }, { b: '#6b665a', '*': '#2a1608' });

function bucket(inside: string[] | null): Painter {
  const rows = [
    '................',
    '................',
    '................',
    '......hhhh......',
    '....hh....hh....',
    '...h........h...',
    '...LLLLLLLLLL...',
    '..LiiiiiiiiiiD..',
    '..LLiiiiiiiiDD..',
    '...MMMMMMMMMD...',
    '...LMMMMMMMMD...',
    '....MMMMMMMD....',
    '....LMMMMMMD....',
    '.....MMMMMD.....',
  ];
  return art(
    rows,
    {
      h: '#8a8a8a',
      L: '#e8e8e8',
      M: ['#c4c4c4', '#bcbcbc'],
      D: '#8c8c8c',
      i: inside ?? ['#4a4a4a', '#444444'],
    },
    '#2c2c2c',
  );
}

const doorItem = art(
  [
    '................',
    '....FFFFFFFF....',
    '....FggFFggf....',
    '....FggFFggf....',
    '....FFFFFFFf....',
    '....FggFFggf....',
    '....FggFFggf....',
    '....FFFFFFFf....',
    '....FPPPPPpf....',
    '....FPPPPPkf....',
    '....FPPPPPpf....',
    '....FFFFFFFf....',
    '....FPPPPPpf....',
    '....FPPPPPpf....',
    '....FFFFFFFf....',
  ],
  { F: ['#b38e58', '#ad8853'], f: '#8a6a3c', g: '#3d2c16', P: '#9d7a47', p: '#83633a', k: '#2a2a2a' },
  '#2e200d',
);

const bedItem = art(
  [
    '................',
    '................',
    '................',
    '................',
    '................',
    '..pppRRRRRRRRR..',
    '.pppRRRRRRRRRR..',
    '.PPPrrrrrrrrrrr.',
    '.wwwrrrrrrrrrrr.',
    '.FFFFFFFFFFFFFF.',
    '.FF..........FF.',
    '.ff..........ff.',
  ],
  { p: '#f4f4f4', P: '#d0d0d0', w: '#bdbdbd', R: '#c63a3b', r: '#9e2327', F: '#bd9862', f: '#94703f' },
  { p: '#4a4a4a', P: '#4a4a4a', w: '#4a4a4a', '*': '#2e0c0c', F: '#3a2a12', f: '#3a2a12' },
);

function shears(t: Tile): void {
  const s = new Sprite();
  const BLADE = mat('#ffffff', '#f0f0f0', '#cdcdcd', '#9a9a9a', '#262626');
  const GRIP = mat('#8c8c8c', '#787878', '#606060', '#484848', '#161616');
  // Сомкнутые лезвия — вытянутый «лист» вверх-вправо от оси.
  shaded(
    s,
    (x, y) => {
      const u = x - y;
      return u >= 0 && u <= 10 && Math.abs(x + y - 15.5) <= (u <= 5 ? 1.6 : 1.6 - (u - 5) * 0.22);
    },
    BLADE,
  );
  // Два разведённых кольца-ручки и перемычки от них к оси.
  const ring = (x: number, y: number, cx: number, cy: number) => Math.max(Math.abs(x - cx), Math.abs(y - cy)) === 1;
  const grip = (x: number, y: number) =>
    ring(x, y, 3, 8) || ring(x, y, 8, 13) || (y === 8 && (x === 5 || x === 6)) || (x === 8 && (y === 10 || y === 11)) || (x === 7 && y === 9);
  shaded(s, grip, GRIP);
  s.put(7, 8, hex('#3a3a3a'), GRIP.outline);
  s.emit(t);
}

const DYE = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '.......hh.......',
  '......hCCC......',
  '.....hCCCCC.....',
  '....hCCCCCCC....',
  '...hCCCCCCCCD...',
  '...CCCCCCCCDD...',
  '....DDDDDDDD....',
];

const redDye = art(DYE, { h: '#ff6b5e', C: ['#cc282c', '#c4252a'], D: '#8a1418' }, '#3a0507');
const yellowDye = art(DYE, { h: '#fff28a', C: ['#f2c81c', '#ecc118'], D: '#b8860b' }, '#4f3604');

// ───────────────────────────── таблица художников ─────────────────────────────

const tools: Record<string, Painter> = {};
for (const [mk, m] of Object.entries(TOOL_MATS))
  for (const kind of ['pickaxe', 'axe', 'shovel', 'sword', 'hoe'] as ToolKind[]) tools[`${mk}_${kind}`] = tool(kind, m);

const armors: Record<string, Painter> = {};
for (const [mk, m] of Object.entries(ARMOR_MATS))
  for (const piece of Object.keys(ARMOR_SHAPES)) armors[`${mk}_${piece}`] = armor(piece, m);

export const ITEM_PAINTERS: Record<string, Painter> = {
  stick,
  coal,
  charcoal,
  iron_ingot: ironIngot,
  gold_ingot: goldIngot,
  diamond,
  flint,
  flint_and_steel: flintAndSteel,
  string: stringItem,
  feather,
  gunpowder,
  bone,
  bone_meal: boneMeal,
  arrow,
  bow,
  leather,
  rotten_flesh: rottenFlesh,
  wheat_seeds: wheatSeeds,
  wheat: wheatItem,
  bread,
  apple,
  porkchop,
  cooked_porkchop: cookedPorkchop,
  beef,
  steak,
  chicken,
  cooked_chicken: cookedChicken,
  bucket: bucket(null),
  water_bucket: bucket(['#2f5fd0', '#3a6bd8', '#4a7ce0']),
  lava_bucket: bucket(['#e8600f', '#f8901c', '#ffc23a']),
  oak_door_item: doorItem,
  bed_item: bedItem,
  shears,
  paper: art(
    [
      '................',
      '................',
      '...wwwwwwwwww...',
      '...wwwwwwwwwww..',
      '...wllllllllww..',
      '...wwwwwwwwwww..',
      '..wwlllllllww...',
      '..wwwwwwwwwww...',
      '..wwllllllllw...',
      '..wwwwwwwwwww...',
      '...wllllllllww..',
      '...wwwwwwwwwww..',
      '...wwwwwwwwww...',
      '................',
      '................',
      '................',
    ],
    { w: ['#f6f6f2', '#efefe9'], l: '#c8c8c0' },
    '#5e5e58',
  ),
  book: art(
    [
      '................',
      '...dCCCCCCCCC...',
      '...dCCCCCCCCCc..',
      '...dCcyyyyyCCc..',
      '...dCcyCCCyCCc..',
      '...dCcyyyyyCCc..',
      '...dCCCCCCCCCc..',
      '...dCCCCCCCCCc..',
      '...dCCCCCCCCCc..',
      '...dCCCCCCCCCc..',
      '...dCCCCCCCCCc..',
      '...dCCCCCCCCCc..',
      '...dpppppppppp..',
      '....pppppppppp..',
      '................',
      '................',
    ],
    { C: ['#7a3f1c', '#84461f'], c: '#9b5a2c', d: '#4a250f', y: '#e9c23a', p: ['#f2efe4', '#e2ddcc'] },
    '#2a1607',
  ),
  red_dye: redDye,
  yellow_dye: yellowDye,
  mutton,
  cooked_mutton: cookedMutton,
  ...tools,
  ...armors,
};
