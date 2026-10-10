/** Детерминированный генератор случайных чисел (mulberry32). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Хэш целочисленных координат в число из [0, 1). */
export function hash3(x: number, y: number, z: number, seed: number): number {
  let h = seed | 0;
  h = (h + Math.imul(x | 0, 0x27d4eb2d)) | 0;
  h = (h + Math.imul(y | 0, 0x165667b1)) | 0;
  h = (h + Math.imul(z | 0, 0x3c6ef372)) | 0;
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
