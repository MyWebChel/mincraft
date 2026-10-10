import { CHUNK_VOLUME } from '../shared/constants';
import { initChunkLight } from '../shared/light';
import { WorldGenerator } from '../shared/worldgen';

// Генерация ландшафта и расчёт света внутри чанка — в отдельном потоке.
let generator: WorldGenerator | null = null;

self.onmessage = (e: MessageEvent<{ seed: number; cx: number; cz: number; edits: [number, number][] }>) => {
  const { seed, cx, cz, edits } = e.data;
  if (!generator || generator.seed !== (seed | 0)) generator = new WorldGenerator(seed);
  const blocks = generator.generateChunk(cx, cz);
  for (const [i, state] of edits) blocks[i] = state;
  const light = new Uint8Array(CHUNK_VOLUME);
  initChunkLight({ blocks, light });
  (self as unknown as Worker).postMessage({ cx, cz, blocks, light }, [blocks.buffer, light.buffer]);
};
