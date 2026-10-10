export const GAME_NAME = 'Mincraft';

export const CHUNK_SIZE = 16;
export const WORLD_HEIGHT = 128;
export const CHUNK_VOLUME = CHUNK_SIZE * CHUNK_SIZE * WORLD_HEIGHT;
export const SEA_LEVEL = 46;

/** Длина суток в тиках (как в Minecraft: 20 тиков в секунду, 20 минут). */
export const DAY_LENGTH = 24000;
export const TICKS_PER_SECOND = 20;

/** Дальность, на которой игрок может ломать и ставить блоки. */
export const REACH = 6;

export const MAX_NAME_LENGTH = 16;
export const MAX_CHAT_LENGTH = 200;

/** Индекс блока внутри чанка: x меняется быстрее всего, затем z, затем y. */
export function blockIndex(x: number, y: number, z: number): number {
  return (y * CHUNK_SIZE + z) * CHUNK_SIZE + x;
}

export function chunkKey(cx: number, cz: number): string {
  return `${cx},${cz}`;
}
