import { Block, SHAPE, S_CROSS, S_FLUID, S_NONE, TYPE_MASK } from '../shared/blocks';
import { selectionBoxes } from '../shared/shapes';

export interface RayHit {
  x: number;
  y: number;
  z: number;
  /** Нормаль грани, в которую попал луч, — туда ставится новый блок. */
  nx: number;
  ny: number;
  nz: number;
  state: number;
  /** Точка попадания в мире. */
  px: number;
  py: number;
  pz: number;
  dist: number;
}

type Getter = (x: number, y: number, z: number) => number;

/** Пересечение луча с коробкой: расстояние и ось/знак грани входа. */
function rayBox(
  ox: number,
  oy: number,
  oz: number,
  dx: number,
  dy: number,
  dz: number,
  b: number[],
): { t: number; axis: number; sign: number } | null {
  let tmin = -Infinity;
  let tmax = Infinity;
  let axis = -1;
  let sign = 0;
  const o = [ox, oy, oz];
  const d = [dx, dy, dz];
  for (let a = 0; a < 3; a++) {
    const lo = b[a];
    const hi = b[a + 3];
    if (Math.abs(d[a]) < 1e-12) {
      if (o[a] < lo || o[a] > hi) return null;
      continue;
    }
    let t1 = (lo - o[a]) / d[a];
    let t2 = (hi - o[a]) / d[a];
    let s = -1;
    if (t1 > t2) {
      [t1, t2] = [t2, t1];
      s = 1;
    }
    if (t1 > tmin) {
      tmin = t1;
      axis = a;
      sign = s;
    }
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return null;
  }
  if (tmax < 0) return null;
  return { t: Math.max(0, tmin), axis, sign };
}

/**
 * Луч по блокам (алгоритм Amanatides & Woo) с точными коробками выделения:
 * сквозь верхнюю половину нижней плиты можно «достать» блок за ней.
 */
export function raycastBlocks(getState: Getter, ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, maxDist: number): RayHit | null {
  let x = Math.floor(ox);
  let y = Math.floor(oy);
  let z = Math.floor(oz);
  const stepX = Math.sign(dx);
  const stepY = Math.sign(dy);
  const stepZ = Math.sign(dz);
  const tDeltaX = stepX ? Math.abs(1 / dx) : Infinity;
  const tDeltaY = stepY ? Math.abs(1 / dy) : Infinity;
  const tDeltaZ = stepZ ? Math.abs(1 / dz) : Infinity;
  let tMaxX = stepX > 0 ? (x + 1 - ox) * tDeltaX : stepX < 0 ? (ox - x) * tDeltaX : Infinity;
  let tMaxY = stepY > 0 ? (y + 1 - oy) * tDeltaY : stepY < 0 ? (oy - y) * tDeltaY : Infinity;
  let tMaxZ = stepZ > 0 ? (z + 1 - oz) * tDeltaZ : stepZ < 0 ? (oz - z) * tDeltaZ : Infinity;
  let t = 0;

  for (let guard = 0; guard < 64 && t <= maxDist; guard++) {
    const state = getState(x, y, z);
    const type = state & TYPE_MASK;
    if (type !== Block.AIR && SHAPE[type] !== S_FLUID && SHAPE[type] !== S_NONE) {
      const bx = x;
      const by = y;
      const bz = z;
      const boxes = selectionBoxes(state, (ddx, ddy, ddz) => getState(bx + ddx, by + ddy, bz + ddz));
      let best: { t: number; axis: number; sign: number } | null = null;
      for (const b of boxes) {
        const hit = rayBox(ox, oy, oz, dx, dy, dz, [x + b[0], y + b[1], z + b[2], x + b[3], y + b[4], z + b[5]]);
        if (hit && hit.t <= maxDist && (!best || hit.t < best.t)) best = hit;
      }
      if (best) {
        const n = [0, 0, 0];
        if (best.axis >= 0) n[best.axis] = best.sign;
        return {
          x,
          y,
          z,
          nx: n[0],
          ny: n[1],
          nz: n[2],
          state,
          px: ox + dx * best.t,
          py: oy + dy * best.t,
          pz: oz + dz * best.t,
          dist: best.t,
        };
      }
    }
    if (tMaxX < tMaxY && tMaxX < tMaxZ) {
      x += stepX;
      t = tMaxX;
      tMaxX += tDeltaX;
    } else if (tMaxY < tMaxZ) {
      y += stepY;
      t = tMaxY;
      tMaxY += tDeltaY;
    } else {
      z += stepZ;
      t = tMaxZ;
      tMaxZ += tDeltaZ;
    }
  }
  return null;
}

/** Первая клетка жидкости на луче (для ведра). */
export function raycastFluid(getState: Getter, ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, maxDist: number): { x: number; y: number; z: number; state: number } | null {
  const steps = Math.ceil(maxDist / 0.1);
  for (let i = 1; i <= steps; i++) {
    const t = i * 0.1;
    const x = Math.floor(ox + dx * t);
    const y = Math.floor(oy + dy * t);
    const z = Math.floor(oz + dz * t);
    const s = getState(x, y, z);
    const type = s & TYPE_MASK;
    if (SHAPE[type] === S_FLUID) return { x, y, z, state: s };
    if (type !== Block.AIR && SHAPE[type] !== S_NONE && SHAPE[type] !== S_CROSS) return null;
  }
  return null;
}
