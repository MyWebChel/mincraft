import * as THREE from 'three';
import { mulberry32 } from '../shared/rng';
import { Tile, hex, nameSeed, shade, tileToCanvas, type RGB } from './pixelart';

/**
 * Модели мобов: блочные коробки в пропорциях Minecraft с процедурными пиксельными
 * текстурами (развёртка «box UV», как у моделей Minecraft) и анимацией ходьбы,
 * поворота головы, атаки, урона и смерти.
 *
 * Геометрия и текстуры общие для всех мобов одного типа. Материалы у каждого экземпляра
 * свои: игра дописывает в них освещение сущности через onBeforeCompile, поэтому сами мы
 * onBeforeCompile не трогаем — подсветка урона и вспышки крипера идут через color/emissive,
 * а растворение при смерти — через opacity + alphaHash.
 */

export type MobType = 'pig' | 'cow' | 'sheep' | 'chicken' | 'zombie' | 'skeleton' | 'creeper' | 'spider';

export interface MobPose {
  /** Accumulated walk distance (blocks) — drives the limb swing phase. */
  walkPhase: number;
  /** 0..1 how much the limbs swing (0 standing, 1 full walk). */
  walkAmount: number;
  /** Head rotation relative to the body, radians (yaw: + = turn left; pitch: + = look up). */
  headYaw: number;
  headPitch: number;
  /** Seconds since the mob last attacked (zombie arm swing / spider lunge), Infinity if never. */
  attackTime: number;
  /** Creeper fuse 0..1 (0 = not ignited): swell + white flashing. */
  fuse: number;
  /** Sheep without wool. */
  sheared: boolean;
  /** True for ~0.4 s after taking damage: tint the whole model red. */
  hurt: boolean;
  /** 0..1 death animation progress: fall over onto the side (rotate 90° around the forward axis) and fade/tint red. */
  death: number;
  /** Total time in seconds, for idle animations (chicken wing flaps, etc.). */
  time: number;
}

export interface MobModel {
  /** Root group. Origin = centre of the feet on the ground; the mob faces -Z when group.rotation.y = 0. 1 unit = 1 block = 16 model pixels. */
  readonly group: THREE.Group;
  /** Approximate height in blocks (for name tags / hit flash). */
  readonly height: number;
  update(dt: number, pose: MobPose): void;
  dispose(): void;
}

export function createMobModel(type: MobType): MobModel {
  return new Mob(type);
}

/** Херобрин; fade — прозрачность тела (0..1), glowFade — светящихся глаз. */
export function createHerobrineModel(): MobModel & { fade: number; glowFade: number } {
  return new Mob('herobrine');
}

// ───────────────────────────── константы и утилиты ─────────────────────────────

/** Один пиксель модели в блоках. */
const PX = 1 / 16;
/** Сторона атласа текстур одного типа моба. */
const ATLAS = 64;
/** Отступ UV внутрь области атласа, чтобы на рёбрах не просачивались соседние пиксели. */
const EPS = 0.01;
/** Фаза шага на блок пройденного пути (как в Minecraft: 4 × 0.6662 рад). */
const STRIDE = 2.66;
/** Размах ног при полной ходьбе, рад. */
const SWING = 0.8;

const clamp01 = (v: number): number => (v > 0 ? (v < 1 ? v : 1) : 0);
const clamp = (v: number, lo: number, hi: number): number => (v > lo ? (v < hi ? v : hi) : lo);

/** Поворот головы относительно тела (с разумными пределами, NaN → 0). */
function look(head: THREE.Object3D, p: MobPose): void {
  head.rotation.y = clamp(p.headYaw || 0, -1.4, 1.4);
  head.rotation.x = clamp(p.headPitch || 0, -1.2, 1.2);
}

/** Угол взмаха ноги при ходьбе. */
function swing(p: MobPose, scale = 1): number {
  return Math.sin((p.walkPhase || 0) * STRIDE) * SWING * scale * clamp01(p.walkAmount);
}

/** Ноги четвероногого: диагональные пары движутся вместе. Порядок: ПП, ЛП, ПЗ, ЛЗ. */
function walkQuad(legs: readonly THREE.Object3D[], p: MobPose): void {
  const s = swing(p);
  legs[0].rotation.x = -s;
  legs[1].rotation.x = s;
  legs[2].rotation.x = s;
  legs[3].rotation.x = -s;
}

/** Покачивание рук гуманоидов на месте (bobArms из Minecraft): [наклон X, крен Z]. */
function armBob(time: number): [number, number] {
  const ticks = time * 20;
  return [Math.sin(ticks * 0.067) * 0.05, Math.cos(ticks * 0.09) * 0.05 + 0.05];
}

// ───────────────────────────── атлас текстур ─────────────────────────────

type Face = 'right' | 'left' | 'top' | 'bottom' | 'back' | 'front';
/** Порядок граней BoxGeometry: +X, -X, +Y, -Y, +Z, -Z. Моб смотрит в -Z, его правый бок — +X. */
const FACES: readonly Face[] = ['right', 'left', 'top', 'bottom', 'back', 'front'];

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Развёртка коробки w×h×d в атласе, как у моделей Minecraft:
 *
 *        [верх][низ]
 *   [прав][перёд][лев][зад]
 *
 * Каждая грань нарисована так, как её видно снаружи (x вправо, y вниз).
 * У верха к переду моба обращена верхняя строка, у низа — к заду.
 */
class Box {
  constructor(
    readonly u: number,
    readonly v: number,
    readonly w: number,
    readonly h: number,
    readonly d: number,
  ) {}

  face(f: Face): Rect {
    const { u, v, w, h, d } = this;
    switch (f) {
      case 'top':
        return { x: u + d, y: v, w, h: d };
      case 'bottom':
        return { x: u + d + w, y: v, w, h: d };
      case 'right':
        return { x: u, y: v + d, w: d, h };
      case 'front':
        return { x: u + d, y: v + d, w, h };
      case 'left':
        return { x: u + d + w, y: v + d, w: d, h };
      case 'back':
        return { x: u + 2 * d + w, y: v + d, w, h };
    }
  }
}

/** Цвет пикселя грани; null — пиксель прозрачный (нужен cutout-материал). */
type Painter = (face: Face, x: number, y: number, w: number, h: number) => RGB | null;

/** Пиксель-арт строками: символ → цвет из палитры, прочие символы → undefined. */
function art(rows: readonly string[], palette: Readonly<Record<string, RGB>>): (x: number, y: number) => RGB | undefined {
  return (x, y) => palette[rows[y]?.[x] ?? ''];
}

/** Атлас 64×64 одного типа моба с полочной упаковкой развёрток. */
class Skin {
  readonly tile = new Tile(ATLAS, ATLAS);
  private readonly shelves: { x: number; y: number; h: number }[] = [];
  private bottom = 0;

  constructor(readonly rnd: () => number) {}

  /** Коробка w×h×d (в пикселях модели): резервирует развёртку и раскрашивает все грани. */
  box(w: number, h: number, d: number, paint: Painter): Box {
    const at = this.alloc(2 * (w + d), h + d);
    const box = new Box(at.x, at.y, w, h, d);
    for (const f of FACES) {
      const r = box.face(f);
      this.fill(r, (x, y) => paint(f, x, y, r.w, r.h));
    }
    return box;
  }

  /** Отдельный прямоугольник атласа — для плоских наклеек. */
  rect(w: number, h: number, paint: (x: number, y: number) => RGB | null): Rect {
    const at = this.alloc(w, h);
    const r = { x: at.x, y: at.y, w, h };
    this.fill(r, paint);
    return r;
  }

  /** Цвет со случайным разбросом яркости ±amount/2. */
  n(c: RGB, amount = 0.1): RGB {
    return shade(c, 1 + (this.rnd() - 0.5) * amount);
  }

  /** Случайный цвет палитры с учётом весов. */
  pick(colors: readonly RGB[], weights: readonly number[]): RGB {
    let r = this.rnd() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < colors.length; i++) {
      r -= weights[i];
      if (r < 0) return colors[i];
    }
    return colors[colors.length - 1];
  }

  private alloc(w: number, h: number): { x: number; y: number } {
    let shelf = this.shelves.find((s) => h <= s.h && s.x + w <= ATLAS);
    if (!shelf) {
      if (w > ATLAS || this.bottom + h > ATLAS) throw new Error('mobModels: texture atlas overflow');
      shelf = { x: 0, y: this.bottom, h };
      this.shelves.push(shelf);
      this.bottom += h;
    }
    const at = { x: shelf.x, y: shelf.y };
    shelf.x += w;
    return at;
  }

  private fill(r: Rect, paint: (x: number, y: number) => RGB | null): void {
    for (let y = 0; y < r.h; y++)
      for (let x = 0; x < r.w; x++) {
        const c = paint(x, y);
        if (c) this.tile.set(r.x + x, r.y + y, c);
      }
  }
}

function makeTexture(tile: Tile): THREE.Texture {
  const tex = new THREE.CanvasTexture(tileToCanvas(tile));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  return tex;
}

// ───────────────────────────── геометрия ─────────────────────────────

/** Атлас → UV: x вправо, y вниз (CanvasTexture переворачивает по Y). */
function setUV(uv: THREE.BufferAttribute, k: number, r: Rect, s: number, t: number): void {
  uv.setXY(k, (r.x + EPS + s * (r.w - 2 * EPS)) / ATLAS, 1 - (r.y + EPS + (1 - t) * (r.h - 2 * EPS)) / ATLAS);
}

/**
 * Коробка с центром в (x, y, z) px относительно точки вращения детали.
 * grow раздувает её во все стороны без изменения UV (как CubeDeformation в Minecraft).
 */
function cube(box: Box, x: number, y: number, z: number, grow = 0): THREE.BufferGeometry {
  const geo = new THREE.BoxGeometry((box.w + 2 * grow) * PX, (box.h + 2 * grow) * PX, (box.d + 2 * grow) * PX);
  const uv = geo.getAttribute('uv') as THREE.BufferAttribute;
  for (let f = 0; f < 6; f++) {
    const r = box.face(FACES[f]);
    for (let k = f * 4; k < f * 4 + 4; k++) setUV(uv, k, r, uv.getX(k), uv.getY(k));
  }
  geo.translate(x * PX, y * PX, z * PX);
  return geo;
}

/** Плоская наклейка лицом к -Z (на переднюю грань) с центром в (x, y, z) px. */
function decal(r: Rect, x: number, y: number, z: number): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(r.w * PX, r.h * PX);
  geo.rotateY(Math.PI);
  const uv = geo.getAttribute('uv') as THREE.BufferAttribute;
  for (let k = 0; k < uv.count; k++) setUV(uv, k, r, uv.getX(k), uv.getY(k));
  geo.translate(x * PX, y * PX, z * PX);
  return geo;
}

/** Склеивает коробки детали в одну геометрию — один вызов отрисовки на деталь. */
function merge(...parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  let vertices = 0;
  let indices = 0;
  for (const g of parts) {
    vertices += g.getAttribute('position').count;
    indices += g.getIndex()!.count;
  }
  const attrs: Record<string, Float32Array> = {
    position: new Float32Array(vertices * 3),
    normal: new Float32Array(vertices * 3),
    uv: new Float32Array(vertices * 2),
  };
  const index = new Uint16Array(indices);
  let vo = 0;
  let io = 0;
  for (const g of parts) {
    for (const name in attrs) {
      const a = g.getAttribute(name);
      attrs[name].set(a.array as ArrayLike<number>, vo * a.itemSize);
    }
    const src = g.getIndex()!.array;
    for (let i = 0; i < src.length; i++) index[io + i] = src[i] + vo;
    vo += g.getAttribute('position').count;
    io += src.length;
    g.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(attrs.position, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(attrs.normal, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(attrs.uv, 2));
  out.setIndex(new THREE.BufferAttribute(index, 1));
  out.computeBoundingSphere();
  return out;
}

// ───────────────────────────── сборка модели ─────────────────────────────

type Animate = (pose: MobPose, dt: number) => void;
/** Создаёт меши одного экземпляра и возвращает его функцию анимации. */
type Rigger = (rig: Rig) => Animate;

/** Цвет светящихся глаз паука: больше 1 — «сияние» в HDR-конвейере. */
const EYE_GLOW = new THREE.Color(1.8, 1.8, 1.8);

class Rig {
  /** Материалы этого экземпляра (свои у каждого моба). */
  readonly materials: THREE.Material[] = [];
  readonly skin: THREE.MeshLambertMaterial;

  constructor(
    readonly root: THREE.Object3D,
    private readonly map: THREE.Texture,
    cutout: boolean,
  ) {
    this.skin = new THREE.MeshLambertMaterial({
      map,
      // Дыры в текстуре (грудная клетка скелета): альфа-тест и обе стороны граней,
      // как entityCutoutNoCull в Minecraft. Порог низкий, чтобы не мешать растворению.
      alphaTest: cutout ? 0.01 : 0,
      side: cutout ? THREE.DoubleSide : THREE.FrontSide,
      // Растворение при смерти: opacity + хэшированный альфа-тест, без сортировки прозрачных.
      alphaHash: true,
    });
    this.materials.push(this.skin);
  }

  /** Деталь с точкой вращения в (x, y, z) px относительно родителя. */
  part(
    geo: THREE.BufferGeometry,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = this.root,
    material: THREE.Material = this.skin,
  ): THREE.Mesh {
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x * PX, y * PX, z * PX);
    // Как в Minecraft: сначала наклон X, затем поворот Y, затем крен Z.
    mesh.rotation.order = 'ZYX';
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  }

  /** Неосвещаемый материал светящихся глаз (MeshBasicMaterial). */
  glow(color: THREE.Color = EYE_GLOW): THREE.MeshBasicMaterial {
    const m = new THREE.MeshBasicMaterial({
      map: this.map,
      color,
      alphaTest: 0.5,
      alphaHash: true,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -2,
    });
    this.materials.push(m);
    return m;
  }
}

/** Ноги четвероногого. Порядок: правая передняя, левая передняя, правая задняя, левая задняя. */
function quadLegs(r: Rig, geo: THREE.BufferGeometry, x: number, y: number, zFront: number, zBack: number): THREE.Mesh[] {
  return [r.part(geo, x, y, zFront), r.part(geo, -x, y, zFront), r.part(geo, x, y, zBack), r.part(geo, -x, y, zBack)];
}

// ───────────────────────────── мобы ─────────────────────────────
// Координаты в пикселях модели: начало — центр ступней, +Y вверх, морда смотрит в -Z,
// правый бок моба — +X. Пропорции и точки вращения взяты из ванильных моделей.

const EYE_WHITE = hex('#f4f1f1');

function pig(s: Skin): Rigger {
  const skin = hex('#efa3a0');
  const dark = hex('#d98884');
  const snoutC = hex('#f6b6b2');
  const hoof = hex('#b06a66');
  const face = art(['', '', '', '', 'wb....bw'], { w: EYE_WHITE, b: hex('#24181a') });
  const nostrils = art(['', 'n..n'], { n: hex('#9a524f') });

  const head = s.box(8, 8, 8, (f, x, y) => (f === 'front' && face(x, y)) || s.n(f === 'bottom' ? dark : skin, 0.08));
  const snout = s.box(4, 3, 1, (f, x, y) => (f === 'front' && nostrils(x, y)) || s.n(snoutC, 0.05));
  const body = s.box(10, 8, 16, (f, _x, y, _w, h) =>
    s.n(f === 'bottom' || (f !== 'top' && y === h - 1) ? dark : skin, 0.08),
  );
  const leg = s.box(4, 6, 4, (f, _x, y) => s.n(f === 'bottom' || y === 5 ? hoof : skin, 0.08));

  const gHead = merge(cube(head, 0, 0, -4), cube(snout, 0, -1.5, -8.5));
  const gBody = merge(cube(body, 0, 0, 0));
  const gLeg = merge(cube(leg, 0, -3, 0));

  return (r) => {
    r.part(gBody, 0, 10, 0);
    const h = r.part(gHead, 0, 12, -6);
    const legs = quadLegs(r, gLeg, 3, 6, -5, 7);
    return (p) => {
      look(h, p);
      walkQuad(legs, p);
    };
  };
}

/** Маска пятен: несколько случайных эллипсов на грани (у коровы). */
function spots(s: Skin, w: number, h: number, count: number): boolean[] {
  const mask = new Array<boolean>(w * h).fill(false);
  for (let i = 0; i < count; i++) {
    const cx = s.rnd() * w;
    const cy = s.rnd() * h;
    const rx = 1.5 + s.rnd() * w * 0.3;
    const ry = 1.5 + s.rnd() * h * 0.3;
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        const dx = (x + 0.5 - cx) / rx;
        const dy = (y + 0.5 - cy) / ry;
        if (dx * dx + dy * dy < 0.85 + s.rnd() * 0.3) mask[y * w + x] = true;
      }
  }
  return mask;
}

function cow(s: Skin): Rigger {
  const brown = hex('#4f3b2b');
  const brownD = hex('#3b2b1f');
  const white = hex('#e7e5e0');
  const horn = hex('#d8cfb8');
  const udder = hex('#eaa3a1');
  const hoof = hex('#4a433d');
  const face = art(
    ['BBBWWBBB', 'BBWWWWBB', 'BBBWWBBB', 'wkBWWBkw', 'BBBBBBBB', 'BmmmmmmB', 'BmnmmnmB', 'BmmmmmmB'],
    { B: brown, W: white, w: EYE_WHITE, k: hex('#141010'), m: hex('#c9b0a0'), n: hex('#5e4940') },
  );
  // Пятнистая шкура: на каждой грани свои белые пятна.
  const masks = new Map<string, boolean[]>();
  const coat = (key: string, count: number): Painter => (f, x, y, w, h) => {
    const id = key + f;
    let mask = masks.get(id);
    if (!mask) masks.set(id, (mask = spots(s, w, h, f === 'bottom' ? count + 2 : count)));
    return mask[y * w + x] ? s.n(white, 0.05) : s.n(s.rnd() < 0.15 ? brownD : brown, 0.08);
  };

  const headCoat = coat('head', 1);
  const head = s.box(8, 8, 6, (f, x, y, w, h) => {
    if (f === 'front') return face(x, y) ?? s.n(brown, 0.08);
    if (f === 'top' && (x === 3 || x === 4) && y < 3) return s.n(white, 0.05);
    return headCoat(f, x, y, w, h);
  });
  const hornBox = s.box(1, 3, 1, (_f, _x, y) => s.n(y === 0 ? shade(horn, 0.75) : horn, 0.05));
  const body = s.box(12, 10, 18, coat('body', 3));
  const udderBox = s.box(4, 1, 6, (f, x, y) =>
    s.n(f === 'bottom' && (x === 0 || x === 3) && (y === 1 || y === 4) ? shade(udder, 0.82) : udder, 0.05),
  );
  const legCoat = coat('leg', 1);
  const leg = s.box(4, 12, 4, (f, x, y, w, h) => (f === 'bottom' || y >= 10 ? s.n(hoof, 0.08) : legCoat(f, x, y, w, h)));

  const gHead = merge(cube(head, 0, 0, -3), cube(hornBox, 4.5, 3.5, -3.5), cube(hornBox, -4.5, 3.5, -3.5));
  const gBody = merge(cube(body, 0, 0, 0), cube(udderBox, 0, -5.5, 6));
  const gLeg = merge(cube(leg, 0, -6, 0));

  return (r) => {
    r.part(gBody, 0, 17, 1);
    const h = r.part(gHead, 0, 20, -8);
    const legs = quadLegs(r, gLeg, 4, 12, -6, 7);
    return (p) => {
      look(h, p);
      walkQuad(legs, p);
    };
  };
}

function sheep(s: Skin): Rigger {
  const woolC = hex('#ebe8e1');
  const woolD = hex('#d6d2c9');
  const woolL = hex('#f7f5f0');
  const skin = hex('#d6b8a3');
  const skinD = hex('#c09f89');
  const faceC = hex('#c3b1a1');
  const hoof = hex('#6f6159');
  const face = art(['', '', 'wb..bw', '', '..pp..', '..mm..'], {
    w: EYE_WHITE,
    b: hex('#1a1414'),
    p: hex('#d79c94'),
    m: hex('#a2827a'),
  });
  const wool: Painter = () => {
    const r = s.rnd();
    return s.n(r < 0.14 ? woolD : r > 0.88 ? woolL : woolC, 0.05);
  };

  const body = s.box(8, 6, 16, (f) => s.n(f === 'bottom' ? skinD : skin, 0.06));
  const fleece = s.box(8, 6, 16, wool);
  const leg = s.box(4, 12, 4, (f, _x, y) => s.n(f === 'bottom' || y === 11 ? hoof : skin, 0.06));
  const legFleece = s.box(4, 6, 4, wool);
  const head = s.box(6, 6, 8, (f, x, y) => (f === 'front' && face(x, y)) || s.n(faceC, 0.06));
  const cap = s.box(6, 6, 6, wool);

  // Две версии деталей: с шерстью и стриженая — переключаются заменой геометрии.
  const woolly = {
    body: merge(cube(body, 0, 0, 0), cube(fleece, 0, 0, 0, 1.75)),
    head: merge(cube(head, 0, 1, -2), cube(cap, 0, 1, -1, 0.6)),
    leg: merge(cube(leg, 0, -6, 0), cube(legFleece, 0, -3, 0, 0.5)),
  };
  const bare = {
    body: merge(cube(body, 0, 0, 0)),
    head: merge(cube(head, 0, 1, -2)),
    leg: merge(cube(leg, 0, -6, 0)),
  };

  return (r) => {
    const b = r.part(woolly.body, 0, 15, 0);
    const h = r.part(woolly.head, 0, 18, -8);
    const legs = quadLegs(r, woolly.leg, 3, 12, -5, 7);
    return (p) => {
      const g = p.sheared ? bare : woolly;
      b.geometry = g.body;
      h.geometry = g.head;
      for (const l of legs) l.geometry = g.leg;
      look(h, p);
      walkQuad(legs, p);
    };
  };
}

function chicken(s: Skin): Rigger {
  const white = hex('#f4f4f2');
  const grey = hex('#d8d8d4');
  const beak = hex('#f5b01c');
  const beakD = hex('#d68712');
  const red = hex('#d42a1e');
  const legC = hex('#e3892a');
  const eye = hex('#141414');
  const feather = () => s.n(s.rnd() < 0.1 ? grey : white, 0.05);

  const head = s.box(4, 6, 3, (f, x, y, w) => {
    const isEye =
      y === 1 && ((f === 'front' && (x === 0 || x === w - 1)) || (f === 'right' && x === w - 1) || (f === 'left' && x === 0));
    return isEye ? eye : feather();
  });
  const bill = s.box(4, 2, 2, (f, _x, y) => s.n(f === 'bottom' || (f !== 'top' && y === 1) ? beakD : beak, 0.05));
  const wattle = s.box(2, 2, 2, (f, _x, y) => s.n(f === 'bottom' || y === 1 ? shade(red, 0.8) : red, 0.05));
  const body = s.box(6, 6, 8, (f, x, y) => {
    if (f === 'bottom') return s.n(grey, 0.05);
    if (f === 'back' && y < 3 && x > 0 && x < 5 && (x + y) % 2 === 0) return s.n(grey, 0.05);
    return feather();
  });
  const wing = s.box(1, 4, 6, (f, x, y, w, h) => {
    if (f === 'top' || f === 'bottom') return feather();
    return s.n(y === h - 1 || (y === h - 2 && x % 2 === (f === 'right' ? 0 : 1) && w > 1) ? grey : white, 0.05);
  });
  // Тонкая лапка: голень 1×5×1 и ступня с пальцами, выступающая вперёд.
  const shin = s.box(1, 5, 1, () => s.n(legC, 0.06));
  const foot = s.box(3, 1, 2, (f) => s.n(f === 'top' ? legC : shade(legC, 0.88), 0.06));

  const gHead = merge(cube(head, 0, 3, -0.5), cube(bill, 0, 3, -3), cube(wattle, 0, 1, -2));
  const gBody = merge(cube(body, 0, 0, 0));
  const gWing = merge(cube(wing, 0, -2, 0));
  const gLeg = merge(cube(shin, 0, -2.5, 0), cube(foot, 0, -4.5, -0.5));

  return (r) => {
    r.part(gBody, 0, 8, 0);
    const h = r.part(gHead, 0, 9, -4);
    const wings = [r.part(gWing, 3.5, 11, 0), r.part(gWing, -3.5, 11, 0)];
    const legs = [r.part(gLeg, 1.5, 5, -0.5), r.part(gLeg, -1.5, 5, -0.5)];
    // Свой сдвиг по времени, чтобы куры вспархивали не хором.
    const offset = Math.random() * 7;
    return (p) => {
      look(h, p);
      const sw = swing(p, 1.2);
      legs[0].rotation.x = sw;
      legs[1].rotation.x = -sw;
      // Крылья: лёгкие взмахи при ходьбе и короткие вспархивания раз в несколько секунд.
      const t = (((p.time || 0) + offset) % 7 + 7) % 7;
      const burst = t < 0.8 ? Math.sin((t / 0.8) * Math.PI) : 0;
      const amount = Math.max(burst, clamp01(p.walkAmount) * 0.35);
      const flap = amount * (0.5 + 0.5 * Math.sin((p.time || 0) * 28)) * 1.1;
      wings[0].rotation.z = flap;
      wings[1].rotation.z = -flap;
    };
  };
}

function zombie(s: Skin): Rigger {
  const skin = hex('#5c8e42');
  const skinD = hex('#4a7535');
  const hair = hex('#3d6230');
  const shirt = hex('#2e9b9b');
  const shirtD = hex('#247c7d');
  const pants = hex('#46409a');
  const pantsD = hex('#36307b');
  const shoe = hex('#3d3d44');
  const face = art(
    ['hhhhhhhh', 'h......h', '', '', '.kk..kk.', '...nn...', '..mmmm..'],
    { h: hair, k: hex('#141812'), n: hex('#436b31'), m: hex('#2e4a23') },
  );

  const head = s.box(8, 8, 8, (f, x, y) => {
    if (f === 'front') return face(x, y) ?? s.n(skin, 0.08);
    if (f === 'top') return s.n(hair, 0.1);
    if (f === 'bottom') return s.n(skinD, 0.08);
    if (f === 'back') return s.n(y < 3 ? hair : skinD, 0.08);
    return s.n(y < 2 || (y === 2 && s.rnd() < 0.5) ? hair : skin, 0.08);
  });
  const body = s.box(8, 12, 4, (f, x, y) => {
    if (f === 'front' && y === 0 && (x === 3 || x === 4)) return s.n(skin, 0.06);
    return s.n(s.rnd() < 0.1 ? shirtD : shirt, 0.08);
  });
  const arm = s.box(4, 12, 4, (f, _x, y) => s.n(f === 'bottom' || y === 11 ? skinD : skin, 0.08));
  const leg = s.box(4, 12, 4, (f, _x, y) => s.n(f === 'bottom' || y >= 11 ? shoe : s.rnd() < 0.1 ? pantsD : pants, 0.08));

  const gHead = merge(cube(head, 0, 4, 0));
  const gBody = merge(cube(body, 0, 0, 0));
  const gArm = merge(cube(arm, 0, -4, 0));
  const gLeg = merge(cube(leg, 0, -6, 0));

  return (r) => {
    r.part(gBody, 0, 18, 0);
    const h = r.part(gHead, 0, 24, 0);
    const arms = [r.part(gArm, 6, 22, 0), r.part(gArm, -6, 22, 0)];
    const legs = [r.part(gLeg, 1.9, 12, 0), r.part(gLeg, -1.9, 12, 0)];
    return (p) => {
      look(h, p);
      const sw = swing(p);
      legs[0].rotation.x = sw;
      legs[1].rotation.x = -sw;
      // Руки вытянуты вперёд; удар — взмах вниз и в стороны (animateZombieArms из Minecraft).
      const prog = p.attackTime >= 0 && p.attackTime < 0.3 ? p.attackTime / 0.3 : 0;
      const f = Math.sin(prog * Math.PI);
      const f1 = Math.sin((1 - (1 - prog) * (1 - prog)) * Math.PI);
      const [bobX, bobZ] = armBob(p.time || 0);
      const raise = 1.48 - f * 1.2 + f1 * 0.4;
      const spread = 0.1 - f * 0.6;
      arms[0].rotation.set(raise + bobX - sw * 0.15, spread, bobZ);
      arms[1].rotation.set(raise - bobX + sw * 0.15, -spread, -bobZ);
    };
  };
}

function skeleton(s: Skin): Rigger {
  const bone = hex('#c6c6c6');
  const boneL = hex('#dedede');
  const boneD = hex('#9a9a9a');
  const wood = hex('#7a5332');
  const face = art(['', '', '', '.kk..kk.', '.kk..kk.', '...nn...', '.dldldl.', 'jjjjjjjj'], {
    k: hex('#222222'),
    n: hex('#4a4a4a'),
    d: hex('#3a3a3a'),
    l: boneL,
    j: boneD,
  });

  const head = s.box(8, 8, 8, (f, x, y) => (f === 'front' && face(x, y)) || s.n(s.rnd() < 0.08 ? boneD : bone, 0.07));
  // Грудная клетка с дырами: ключицы, рёбра, позвоночник и таз.
  const ribs = (y: number) => y === 0 || y === 2 || y === 4 || y === 6 || y >= 10;
  const body = s.box(8, 12, 4, (f, x, y) => {
    if (f === 'top' || f === 'bottom') return s.n(bone, 0.07);
    const spine = (f === 'front' || f === 'back') && (x === 3 || x === 4);
    if (spine || ribs(y)) return s.n(y >= 10 ? boneD : bone, 0.07);
    return null;
  });
  const limb = s.box(2, 12, 2, (f, x, y) => {
    if (f === 'bottom' || y === 5 || y === 11) return s.n(boneD, 0.06);
    return s.n(x === 0 && f !== 'top' ? boneL : bone, 0.06);
  });
  // Лук: рукоять, плечи, концы и тетива — тонкие коробки в плоскости YZ.
  const grip = s.box(1, 5, 1, (_f, _x, y) => s.n(y === 0 || y === 4 ? wood : hex('#4d3420'), 0.06));
  const bowLimb = s.box(1, 3, 1, () => s.n(wood, 0.08));
  const tip = s.box(1, 2, 2, () => s.n(hex('#9c6c3e'), 0.06));
  const string = s.box(1, 15, 1, () => s.n(hex('#e6e6e6'), 0.04));

  // Лук строится стоя (ось Y вдоль лука, выгиб к -Z) и поворачивается так, чтобы
  // при вытянутой вперёд руке он стоял вертикально прямо перед кулаком.
  const bow = merge(
    cube(grip, 0, 0, -0.5),
    cube(bowLimb, 0, 4, 0.5),
    cube(bowLimb, 0, -4, 0.5),
    cube(tip, 0, 6.5, 2),
    cube(tip, 0, -6.5, 2),
    cube(string, 0, 0, 3.2, -0.3),
  );
  bow.rotateX(-Math.PI / 2);
  bow.translate(0, -10 * PX, 0);

  const gHead = merge(cube(head, 0, 4, 0));
  const gBody = merge(cube(body, 0, 0, 0));
  const gArm = merge(cube(limb, 0, -4, 0));
  const gBowArm = merge(cube(limb, 0, -4, 0), bow);
  const gLeg = merge(cube(limb, 0, -6, 0));

  return (r) => {
    r.part(gBody, 0, 18, 0);
    const h = r.part(gHead, 0, 24, 0);
    const arms = [r.part(gBowArm, 5, 22, 0), r.part(gArm, -5, 22, 0)];
    const legs = [r.part(gLeg, 2, 12, 0), r.part(gLeg, -2, 12, 0)];
    return (p) => {
      look(h, p);
      const sw = swing(p);
      legs[0].rotation.x = sw;
      legs[1].rotation.x = -sw;
      // Поза лучника (как в Minecraft): обе руки вперёд вслед за головой, левая тянется к тетиве.
      const [bobX, bobZ] = armBob(p.time || 0);
      const kick = p.attackTime >= 0 && p.attackTime < 0.25 ? 1 - p.attackTime / 0.25 : 0;
      const aim = Math.PI / 2 + h.rotation.x;
      arms[0].rotation.set(aim + bobX + kick * 0.25, 0.1 + h.rotation.y, bobZ);
      arms[1].rotation.set(aim - bobX, -0.5 + h.rotation.y, -bobZ);
    };
  };
}

function creeper(s: Skin): Rigger {
  // Пятнистый «камуфляж»: зелёные разной яркости и редкие серо-белые пиксели.
  const palette = ['#4b9a41', '#5fae54', '#7cc370', '#367a2f', '#245a20', '#a6d69b', '#c5cfc2', '#3f8b37'].map(hex);
  const weights = [24, 20, 13, 16, 8, 8, 5, 6];
  const camo = () => s.n(s.pick(palette, weights), 0.06);
  const black = hex('#0f0f0f');
  const charcoal = hex('#262626');
  const face = art(['', '', '.##..##.', '.##..##.', '...##...', '..####..', '..####..', '..#..#..'], { '#': black });

  const head = s.box(8, 8, 8, (f, x, y) => (f === 'front' && face(x, y) && (s.rnd() < 0.2 ? charcoal : black)) || camo());
  const body = s.box(8, 12, 4, camo);
  const leg = s.box(4, 6, 4, (f) => (f === 'bottom' ? s.n(palette[4], 0.1) : camo()));

  const gHead = merge(cube(head, 0, 4, 0));
  const gBody = merge(cube(body, 0, 0, 0));
  const gLeg = merge(cube(leg, 0, -3, 0));

  return (r) => {
    r.part(gBody, 0, 12, 0);
    const h = r.part(gHead, 0, 18, 0);
    const legs = quadLegs(r, gLeg, 2, 6, -4, 4);
    return (p) => {
      look(h, p);
      walkQuad(legs, p);
    };
  };
}

// Лапы паука (от задней пары к передней), углы из ванильной модели: разворот в плане и наклон вниз.
const SPIDER_LEG_Z = [2, 1, 0, -1];
const SPIDER_YAW = [Math.PI / 4, Math.PI / 8, -Math.PI / 8, -Math.PI / 4];
const SPIDER_ROLL = [-Math.PI / 4, -0.5812, -0.5812, -Math.PI / 4];
const SPIDER_PHASE = [0, Math.PI, Math.PI / 2, Math.PI * 1.5];

function spider(s: Skin): Rigger {
  const base = hex('#2d2621');
  const dark = hex('#1c1815');
  const hair = hex('#4b3d32');
  const mark = hex('#5e4736');
  const eyeColors = { E: hex('#d01b16'), H: hex('#ff5a40'), e: hex('#b01412') };
  const eyes = art(['', '', '...ee...', '.HE..HE.', 'eEE..EEe'], eyeColors);
  const face = art(['', '', '', '', '', '', '..f..f..', '..f..f..'], { f: hex('#6b5a4a') });
  const back = art(
    ['', '....mm....', '...m..m...', '..m.mm.m..', '....mm....', '.m..mm..m.', '..m.mm.m..', '....mm....', '...m..m...', '..m....m..'],
    { m: mark },
  );
  const fur = () => {
    const r = s.rnd();
    return s.n(r < 0.16 ? hair : r < 0.4 ? dark : base, 0.12);
  };

  const head = s.box(8, 8, 8, (f, x, y) => (f === 'front' && (eyes(x, y) || face(x, y))) || fur());
  const thorax = s.box(6, 6, 6, fur);
  const abdomen = s.box(10, 8, 12, (f, x, y) => (f === 'top' && back(x, y) && s.n(mark, 0.1)) || fur());
  const leg = s.box(16, 2, 2, (_f, x) => s.n(x % 5 === 4 ? hair : s.rnd() < 0.3 ? dark : base, 0.12));
  // Светящиеся глаза — отдельная наклейка на морде: только пиксели глаз, остальное прозрачно.
  const glow = s.rect(8, 8, (x, y) => eyes(x, y) ?? null);

  const gHead = merge(cube(head, 0, 0, -4));
  const gEyes = decal(glow, 0, 0, -8.05);
  const gBody = merge(cube(thorax, 0, 0, 0), cube(abdomen, 0, 0, 9));
  const gLegR = merge(cube(leg, 7, 0, 0));
  const gLegL = merge(cube(leg, -7, 0, 0));

  return (r) => {
    r.part(gBody, 0, 9, 0);
    const h = r.part(gHead, 0, 9, -3);
    r.part(gEyes, 0, 0, 0, h, r.glow()).castShadow = false;
    const right = SPIDER_LEG_Z.map((z) => r.part(gLegR, 4, 9, z));
    const left = SPIDER_LEG_Z.map((z) => r.part(gLegL, -4, 9, z));
    return (p) => {
      look(h, p);
      const a = clamp01(p.walkAmount);
      const ph = (p.walkPhase || 0) * STRIDE;
      // Бросок: передние лапы взмывают вверх, голова задирается.
      const lunge = p.attackTime >= 0 && p.attackTime < 0.4 ? Math.sin((p.attackTime / 0.4) * Math.PI) : 0;
      h.rotation.x += lunge * 0.35;
      for (let i = 0; i < 4; i++) {
        const yaw = SPIDER_YAW[i] - Math.cos(ph * 2 + SPIDER_PHASE[i]) * 0.4 * a;
        const lift = Math.abs(Math.sin(ph + SPIDER_PHASE[i])) * 0.4 * a + lunge * (i === 3 ? 1.1 : i === 2 ? 0.5 : 0);
        right[i].rotation.set(0, -yaw, SPIDER_ROLL[i] + lift);
        left[i].rotation.set(0, yaw, -SPIDER_ROLL[i] - lift);
      }
    };
  };
}

/** Глаза Херобрина: ярче глаз паука — в темноте и тумане видны только они. */
const HEROBRINE_EYES = new THREE.Color(4, 4, 4);

/**
 * Херобрин: человек в голубой футболке и синих штанах, но с белыми глазами без зрачков.
 * Стоит неподвижно, руки опущены, голова всегда повёрнута к игроку.
 */
function herobrine(s: Skin): Rigger {
  const skin = hex('#b5876c');
  const skinD = hex('#9a6f57');
  const hair = hex('#3a2416');
  const hairL = hex('#4a2f1d');
  const shirt = hex('#1f9d9e');
  const shirtD = hex('#178182');
  const pants = hex('#3b3a97');
  const pantsD = hex('#2d2c78');
  const shoe = hex('#4a4950');
  const white = hex('#ffffff');
  const eyes = art(['', '', '', '', '.ww..ww.'], { w: white });
  const face = art(['hhhhhhhh', 'hHhhhhHh', 'h......h', '', '', '...nn...', '..mmmm..'], {
    h: hair,
    H: hairL,
    n: hex('#8e6450'),
    m: hex('#6b4434'),
  });

  const head = s.box(8, 8, 8, (f, x, y) => {
    if (f === 'front') return eyes(x, y) ?? face(x, y) ?? s.n(skin, 0.06);
    if (f === 'top') return s.n(s.rnd() < 0.2 ? hairL : hair, 0.1);
    if (f === 'bottom') return s.n(skinD, 0.06);
    if (f === 'back') return s.n(y < 6 ? hair : skinD, 0.08);
    return s.n(y < 2 || (y === 2 && x > 1) ? hair : skin, 0.07);
  });
  const body = s.box(8, 12, 4, (f, x, y) => {
    if (f === 'front' && y === 0 && x >= 3 && x <= 4) return s.n(skin, 0.05);
    return s.n(s.rnd() < 0.12 ? shirtD : shirt, 0.07);
  });
  // Короткие рукава футболки, дальше — кожа.
  const arm = s.box(4, 12, 4, (f, _x, y) => {
    if (f === 'bottom') return s.n(skinD, 0.06);
    return s.n(y < 4 && f !== 'top' ? shirt : f === 'top' ? shirt : y === 11 ? skinD : skin, 0.07);
  });
  const leg = s.box(4, 12, 4, (f, _x, y) => s.n(f === 'bottom' || y >= 10 ? shoe : s.rnd() < 0.1 ? pantsD : pants, 0.07));
  const glow = s.rect(8, 8, (x, y) => eyes(x, y) ?? null);

  const gHead = merge(cube(head, 0, 4, 0));
  const gEyes = decal(glow, 0, 4, -4.05);
  const gBody = merge(cube(body, 0, 0, 0));
  const gArm = merge(cube(arm, 0, -4, 0));
  const gLeg = merge(cube(leg, 0, -6, 0));

  return (r) => {
    r.part(gBody, 0, 18, 0);
    const h = r.part(gHead, 0, 24, 0);
    r.part(gEyes, 0, 0, 0, h, r.glow(HEROBRINE_EYES)).castShadow = false;
    const arms = [r.part(gArm, 6, 22, 0), r.part(gArm, -6, 22, 0)];
    const legs = [r.part(gLeg, 1.9, 12, 0), r.part(gLeg, -1.9, 12, 0)];
    return (p) => {
      look(h, p);
      const sw = swing(p);
      legs[0].rotation.x = sw;
      legs[1].rotation.x = -sw;
      // Руки висят вдоль тела, лишь едва заметно покачиваются.
      const [bobX, bobZ] = armBob(p.time || 0);
      arms[0].rotation.set(-sw * 0.6 + bobX * 0.4, 0, bobZ * 0.3);
      arms[1].rotation.set(sw * 0.6 - bobX * 0.4, 0, -bobZ * 0.3);
    };
  };
}

// ───────────────────────────── реестр типов ─────────────────────────────

interface Kind {
  /** Высота модели в блоках. */
  height: number;
  /** Полуширина корпуса в px: на столько модель приподнимается, упав на бок. */
  lift: number;
  /** В текстуре есть дыры (грудная клетка скелета). */
  cutout?: boolean;
  build: (s: Skin) => Rigger;
}

/** Модели: мобы мира и Херобрин (он только на стороне игрока, сервер о нём не знает). */
type ModelType = MobType | 'herobrine';

const KINDS: Record<ModelType, Kind> = {
  pig: { height: 1, lift: 5, build: pig },
  cow: { height: 1.5, lift: 6, build: cow },
  sheep: { height: 1.4, lift: 5, build: sheep },
  chicken: { height: 0.95, lift: 3, build: chicken },
  zombie: { height: 2, lift: 4, build: zombie },
  skeleton: { height: 2, lift: 4, cutout: true, build: skeleton },
  creeper: { height: 1.65, lift: 4, build: creeper },
  spider: { height: 0.85, lift: 5, build: spider },
  herobrine: { height: 2, lift: 4, build: herobrine },
};

interface Assets {
  map: THREE.Texture;
  rig: Rigger;
}

/** Текстура и геометрия типа создаются один раз и живут всю игру (они крошечные). */
const assets = new Map<ModelType, Assets>();

function loadAssets(type: ModelType): Assets {
  let a = assets.get(type);
  if (!a) {
    const skin = new Skin(mulberry32(nameSeed(`mob:${type}`)));
    const rig = KINDS[type].build(skin);
    a = { map: makeTexture(skin.tile), rig };
    assets.set(type, a);
  }
  return a;
}

const REST: MobPose = {
  walkPhase: 0,
  walkAmount: 0,
  headYaw: 0,
  headPitch: 0,
  attackTime: Infinity,
  fuse: 0,
  sheared: false,
  hurt: false,
  death: 0,
  time: 0,
};

class Mob implements MobModel {
  readonly group = new THREE.Group();
  readonly height: number;
  /** Вся модель: крен при смерти, раздувание крипера. */
  private readonly root = new THREE.Group();
  private readonly kind: Kind;
  private readonly rig: Rig;
  private readonly animate: Animate;
  private readonly swells: boolean;
  /** Фаза мигания крипера (0..1, вторая половина — белая вспышка). */
  private flashPhase = 0;
  /** Прозрачность тела и светящихся глаз сверх анимации смерти (Херобрин растворяется в тумане, в темноте видны одни глаза). */
  fade = 1;
  glowFade = 1;

  constructor(type: ModelType) {
    this.kind = KINDS[type];
    this.height = this.kind.height;
    this.swells = type === 'creeper';
    const a = loadAssets(type);
    this.group.name = `mob:${type}`;
    this.group.add(this.root);
    this.rig = new Rig(this.root, a.map, this.kind.cutout === true);
    this.animate = a.rig(this.rig);
    this.update(0, REST);
  }

  update(dt: number, pose: MobPose): void {
    this.animate(pose, dt);

    // Смерть: быстрое падение на бок вокруг оси взгляда (как в Minecraft — по корню из времени)
    // с подъёмом на полуширину, чтобы модель легла на землю, а не ушла в неё.
    const death = clamp01(pose.death);
    const fall = death > 0 ? Math.min(1, Math.sqrt(death * 1.6)) * (Math.PI / 2) : 0;
    this.root.rotation.z = fall;
    this.root.position.y = Math.sin(fall) * this.kind.lift * PX;

    // Крипер с подожжённым фитилём раздувается и мигает белым всё чаще.
    let flash = 0;
    if (this.swells) {
      const fuse = clamp01(pose.fuse);
      const k = fuse * fuse;
      const wobble = 1 + Math.sin(fuse * 100) * fuse * 0.01;
      const wide = (1 + k * 0.22) * wobble;
      this.root.scale.set(wide, (1 + k * 0.1) / wobble, wide);
      if (fuse > 0) {
        const step = Number.isFinite(dt) && dt > 0 ? dt : 0;
        this.flashPhase = (this.flashPhase + step * (2 + 10 * fuse)) % 1;
        if (this.flashPhase >= 0.5) flash = 0.35 + 0.4 * fuse;
      } else this.flashPhase = 0;
    }

    const skin = this.rig.skin;
    if (pose.hurt || death > 0) {
      // Примерно как красная накладка Minecraft (30 % красного): светлое розовеет, тёмное краснеет.
      skin.color.setRGB(1.2, 0.5, 0.5);
      skin.emissive.setRGB(0.22, 0.01, 0.01);
    } else if (flash > 0) {
      skin.color.setScalar(1 + flash);
      skin.emissive.setScalar(flash);
    } else {
      skin.color.setScalar(1);
      skin.emissive.setScalar(0);
    }

    // Растворение в последней трети анимации смерти.
    const opacity = death > 0.7 ? 1 - (death - 0.7) / 0.3 : 1;
    for (const m of this.rig.materials) m.opacity = opacity * (m instanceof THREE.MeshBasicMaterial ? this.glowFade : this.fade);
  }

  dispose(): void {
    this.group.removeFromParent();
    for (const m of this.rig.materials) m.dispose();
  }
}
