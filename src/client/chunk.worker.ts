import { CHUNK_VOLUME } from '../shared/constants';
import { initChunkLight } from '../shared/light';
import { WorldGenerator } from '../shared/worldgen';
import { meshChunk, sectionConnectivity, type MeshData } from './mesher';

/**
 * Фоновый поток для чанков: генерация ландшафта со светом и построение мешей.
 * Главный поток только раздаёт задания и забирает готовые массивы.
 */
export type ChunkJob =
  | { t: 'gen'; id: number; seed: number; cx: number; cz: number; edits: [number, number][] }
  /** blocks и light — чанк с полосами соседей (см. buildPadded); после работы возвращаются обратно. */
  | { t: 'mesh'; id: number; blocks: Uint16Array; light: Uint8Array; fancyLeaves: boolean };

export type ChunkResult =
  | { t: 'gen'; id: number; cx: number; cz: number; blocks: Uint16Array; light: Uint8Array }
  | {
      t: 'mesh';
      id: number;
      meshes: (MeshData | null)[];
      /** Секции с гранями, освещёнными небом (см. ChunkMeshes.lit). */
      lit: number;
      conn: Uint8Array;
      blocks: Uint16Array;
      light: Uint8Array;
    };

let generator: WorldGenerator | null = null;

const post = (msg: ChunkResult, transfer: Transferable[]) => (self as unknown as Worker).postMessage(msg, transfer);

self.onmessage = (e: MessageEvent<ChunkJob>) => {
  const job = e.data;
  if (job.t === 'gen') {
    if (!generator || generator.seed !== (job.seed | 0)) generator = new WorldGenerator(job.seed);
    const blocks = generator.generateChunk(job.cx, job.cz);
    for (const [i, state] of job.edits) blocks[i] = state;
    const light = new Uint8Array(CHUNK_VOLUME);
    initChunkLight({ blocks, light });
    post({ t: 'gen', id: job.id, cx: job.cx, cz: job.cz, blocks, light }, [blocks.buffer, light.buffer]);
    return;
  }
  const { opaque, cutout, translucent, lit } = meshChunk(job.blocks, job.light, { fancyLeaves: job.fancyLeaves });
  const conn = sectionConnectivity(job.blocks);
  const meshes = [opaque, cutout, translucent];
  const transfer: Transferable[] = [job.blocks.buffer, job.light.buffer, conn.buffer];
  for (const m of meshes) if (m) transfer.push(m.pos.buffer, m.data.buffer, m.index.buffer, m.sections.buffer);
  post({ t: 'mesh', id: job.id, meshes, lit, conn, blocks: job.blocks, light: job.light }, transfer);
};
