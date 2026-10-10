import { BLOCKS, Block, S_NONE, SHAPE, fluidHeight, typeOf } from './blocks';
import { collisionBoxes } from './shapes';

/**
 * Физика тел (игроки, мобы, предметы): столкновения AABB с коробками блоков
 * по осям Y → X → Z, как в Minecraft, плюс заступ на ступеньки и плиты.
 */
export interface BlockGetter {
  getState(x: number, y: number, z: number): number;
}

export interface Body {
  /** Центр ног. */
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  width: number;
  height: number;
  onGround: boolean;
  collidedH: boolean;
}

const EPS = 1e-7;

/** Собирает коробки столкновений всех блоков в области (плоский массив по 6 чисел). */
function collectBoxes(world: BlockGetter, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): number[] {
  const out: number[] = [];
  const x0 = Math.floor(minX);
  const x1 = Math.floor(maxX);
  // Заборы выше блока — захватываем клетку снизу.
  const y0 = Math.floor(minY) - 1;
  const y1 = Math.floor(maxY);
  const z0 = Math.floor(minZ);
  const z1 = Math.floor(maxZ);
  for (let y = y0; y <= y1; y++)
    for (let z = z0; z <= z1; z++)
      for (let x = x0; x <= x1; x++) {
        const state = world.getState(x, y, z);
        const type = typeOf(state);
        if (type === Block.AIR || SHAPE[type] === S_NONE || !BLOCKS[type].solid) continue;
        const boxes = collisionBoxes(state, (dx, dy, dz) => world.getState(x + dx, y + dy, z + dz));
        for (const b of boxes) out.push(x + b[0], y + b[1], z + b[2], x + b[3], y + b[4], z + b[5]);
      }
  return out;
}

/** Насколько можно сдвинуть AABB вдоль оси, не врезаясь в коробки. */
function clip(boxes: number[], a: number[], axis: number, d: number): number {
  if (d === 0) return 0;
  const o1 = (axis + 1) % 3;
  const o2 = (axis + 2) % 3;
  for (let i = 0; i < boxes.length; i += 6) {
    if (boxes[i + o1 + 3] <= a[o1] + EPS || boxes[i + o1] >= a[o1 + 3] - EPS) continue;
    if (boxes[i + o2 + 3] <= a[o2] + EPS || boxes[i + o2] >= a[o2 + 3] - EPS) continue;
    if (d > 0 && a[axis + 3] <= boxes[i + axis] + EPS) d = Math.min(d, boxes[i + axis] - a[axis + 3]);
    else if (d < 0 && a[axis] >= boxes[i + axis + 3] - EPS) d = Math.max(d, boxes[i + axis + 3] - a[axis]);
  }
  return d;
}

const shift = (a: number[], axis: number, d: number) => {
  a[axis] += d;
  a[axis + 3] += d;
};

function aabbOf(b: Body): number[] {
  const hw = b.width / 2;
  return [b.x - hw, b.y, b.z - hw, b.x + hw, b.y + b.height, b.z + hw];
}

/** Двигает тело на (dx, dy, dz) с учётом столкновений. stepHeight — высота автоподъёма. */
export function moveBody(world: BlockGetter, body: Body, dx: number, dy: number, dz: number, stepHeight = 0): void {
  const start = aabbOf(body);
  const pad = Math.max(stepHeight, 0) + 0.01;
  const boxes = collectBoxes(
    world,
    Math.min(start[0], start[0] + dx) - 0.01,
    Math.min(start[1], start[1] + dy) - 0.01,
    Math.min(start[2], start[2] + dz) - 0.01,
    Math.max(start[3], start[3] + dx) + 0.01,
    Math.max(start[4], start[4] + dy) + pad,
    Math.max(start[5], start[5] + dz) + 0.01,
  );

  const a = [...start];
  const cy = clip(boxes, a, 1, dy);
  shift(a, 1, cy);
  const cx = clip(boxes, a, 0, dx);
  shift(a, 0, cx);
  const cz = clip(boxes, a, 2, dz);
  shift(a, 2, cz);

  const landed = dy < 0 && cy !== dy;
  const blockedH = cx !== dx || cz !== dz;

  // Автоподъём на ступеньку (плиты, ступени) — если упёрлись, стоя на земле.
  if (stepHeight > 0 && blockedH && (body.onGround || landed)) {
    const b = [...start];
    const up = clip(boxes, b, 1, stepHeight);
    shift(b, 1, up);
    const sx = clip(boxes, b, 0, dx);
    shift(b, 0, sx);
    const sz = clip(boxes, b, 2, dz);
    shift(b, 2, sz);
    const down = clip(boxes, b, 1, -up + (dy < 0 ? dy : 0));
    shift(b, 1, down);
    if (sx * sx + sz * sz > cx * cx + cz * cz + 1e-6) {
      a.splice(0, 6, ...b);
      body.x = (a[0] + a[3]) / 2;
      body.y = a[1];
      body.z = (a[2] + a[5]) / 2;
      body.onGround = true;
      body.collidedH = sx !== dx || sz !== dz;
      if (sx !== dx) body.vx = 0;
      if (sz !== dz) body.vz = 0;
      body.vy = 0;
      return;
    }
  }

  body.x = (a[0] + a[3]) / 2;
  body.y = a[1];
  body.z = (a[2] + a[5]) / 2;
  body.onGround = landed;
  body.collidedH = blockedH;
  if (cy !== dy) body.vy = 0;
  if (cx !== dx) body.vx = 0;
  if (cz !== dz) body.vz = 0;
}

/** Есть ли опора под телом, если сдвинуть его на (dx, dz) — для «крадущегося» шага у края. */
export function hasSupport(world: BlockGetter, body: Body, dx: number, dz: number): boolean {
  const a = aabbOf(body);
  shift(a, 0, dx);
  shift(a, 2, dz);
  const boxes = collectBoxes(world, a[0], a[1] - 1, a[2], a[3], a[1], a[5]);
  return clip(boxes, a, 1, -1) > -1 + 1e-4;
}

/** Ограничивает горизонтальный шаг так, чтобы не сойти с края (как присед в Minecraft). */
export function sneakClamp(world: BlockGetter, body: Body, dx: number, dz: number): [number, number] {
  const step = 0.05;
  while (dx !== 0 && !hasSupport(world, body, dx, 0)) dx = Math.abs(dx) < step ? 0 : dx - Math.sign(dx) * step;
  while (dz !== 0 && !hasSupport(world, body, 0, dz)) dz = Math.abs(dz) < step ? 0 : dz - Math.sign(dz) * step;
  while (dx !== 0 && dz !== 0 && !hasSupport(world, body, dx, dz)) {
    dx = Math.abs(dx) < step ? 0 : dx - Math.sign(dx) * step;
    dz = Math.abs(dz) < step ? 0 : dz - Math.sign(dz) * step;
  }
  return [dx, dz];
}

export interface FluidState {
  inWater: boolean;
  inLava: boolean;
  /** Глаза под водой. */
  eyeInWater: boolean;
  onLadder: boolean;
}

/** В какой жидкости находится тело и стоит ли у лестницы. */
export function fluidState(world: BlockGetter, body: Body, eyeHeight: number): FluidState {
  const hw = body.width / 2 - 0.001;
  const res: FluidState = { inWater: false, inLava: false, eyeInWater: false, onLadder: false };
  const y0 = Math.floor(body.y);
  const y1 = Math.floor(body.y + body.height - 0.01);
  for (let y = y0; y <= y1; y++)
    for (let z = Math.floor(body.z - hw); z <= Math.floor(body.z + hw); z++)
      for (let x = Math.floor(body.x - hw); x <= Math.floor(body.x + hw); x++) {
        const s = world.getState(x, y, z);
        const t = typeOf(s);
        if (t === Block.WATER || t === Block.LAVA) {
          const surface = y + fluidHeight(s);
          if (body.y + 0.1 < surface) {
            if (t === Block.WATER) res.inWater = true;
            else res.inLava = true;
          }
        } else if (BLOCKS[t].climbable) res.onLadder = true;
      }
  const eyeY = body.y + eyeHeight;
  const es = world.getState(Math.floor(body.x), Math.floor(eyeY), Math.floor(body.z));
  if (typeOf(es) === Block.WATER && eyeY < Math.floor(eyeY) + fluidHeight(es) + 0.05) res.eyeInWater = true;
  return res;
}

/** Пересекается ли AABB тела с клеткой блока. */
export function bodyIntersectsBlock(body: { x: number; y: number; z: number; width: number; height: number }, x: number, y: number, z: number): boolean {
  const hw = body.width / 2;
  return body.x + hw > x && body.x - hw < x + 1 && body.y + body.height > y && body.y < y + 1 && body.z + hw > z && body.z - hw < z + 1;
}
