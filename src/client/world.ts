import * as THREE from 'three';
import { Block, FULL_CUBE, TYPE_MASK } from '../shared/blocks';
import { CHUNK_SIZE as S, WORLD_HEIGHT as H, blockIndex, chunkKey } from '../shared/constants';
import { stitchChunkLight, updateLight, type ChunkData, type ChunkSource } from '../shared/light';
import { PADDED_SIZE, buildPadded, meshChunk, type MeshData, type MeshOptions } from './mesher';
import { LAYER_TERRAIN, type TerrainMaterials } from './render/materials';

export interface ClientChunk extends ChunkData {
  cx: number;
  cz: number;
  solid: THREE.Mesh | null;
  translucent: THREE.Mesh | null;
  needsMesh: boolean;
  /** Изменён игроком — перестраиваем в первую очередь. */
  urgent: boolean;
  meshed: boolean;
}

/** Блоки и свет загруженных чанков плюс все изменения мира, пришедшие с сервера. */
export class World implements ChunkSource {
  readonly chunks = new Map<string, ClientChunk>();
  private readonly edits = new Map<string, Map<number, number>>();

  getChunk(cx: number, cz: number): ClientChunk | undefined {
    return this.chunks.get(chunkKey(cx, cz));
  }

  getState(x: number, y: number, z: number): number {
    if (y < 0) return Block.BEDROCK;
    if (y >= H) return Block.AIR;
    const c = this.chunks.get(chunkKey(x >> 4, z >> 4));
    return c ? c.blocks[blockIndex(x & 15, y, z & 15)] : Block.AIR;
  }

  /** Байт света: небо << 4 | блоки. */
  getLight(x: number, y: number, z: number): number {
    if (y >= H) return 0xf0;
    if (y < 0) return 0;
    const c = this.chunks.get(chunkKey(x >> 4, z >> 4));
    return c ? c.light[blockIndex(x & 15, y, z & 15)] : 0xf0;
  }

  isLoaded(x: number, z: number): boolean {
    return this.chunks.has(chunkKey(Math.floor(x) >> 4, Math.floor(z) >> 4));
  }

  isReady(x: number, z: number): boolean {
    return !!this.chunks.get(chunkKey(Math.floor(x) >> 4, Math.floor(z) >> 4))?.meshed;
  }

  /** Изменения для чанка — отдаются воркеру генерации. */
  editsFor(cx: number, cz: number): [number, number][] {
    const e = this.edits.get(chunkKey(cx, cz));
    return e ? [...e] : [];
  }

  /** Меняет блок; возвращает true, если блок действительно изменился. */
  setState(x: number, y: number, z: number, state: number): boolean {
    if (y < 0 || y >= H) return false;
    const cx = x >> 4;
    const cz = z >> 4;
    const key = chunkKey(cx, cz);
    const i = blockIndex(x & 15, y, z & 15);
    let chunkEdits = this.edits.get(key);
    if (!chunkEdits) this.edits.set(key, (chunkEdits = new Map()));
    chunkEdits.set(i, state);

    const chunk = this.chunks.get(key);
    if (!chunk || chunk.blocks[i] === state) return false;
    chunk.blocks[i] = state;
    const changed = new Set<string>([key]);
    updateLight(this, x, y, z, changed);
    // Блок на краю чанка влияет на грани и затенение соседей.
    const lx = x & 15;
    const lz = z & 15;
    for (let dz = lz === 0 ? -1 : 0; dz <= (lz === 15 ? 1 : 0); dz++)
      for (let dx = lx === 0 ? -1 : 0; dx <= (lx === 15 ? 1 : 0); dx++) changed.add(chunkKey(cx + dx, cz + dz));
    for (const k of changed) {
      const c = this.chunks.get(k);
      if (c) c.needsMesh = c.urgent = true;
    }
    return true;
  }

  applyEdits(flat: number[]): void {
    for (let i = 0; i + 3 < flat.length; i += 4) this.setState(flat[i], flat[i + 1], flat[i + 2], flat[i + 3]);
  }

  addChunk(cx: number, cz: number, blocks: Uint16Array, light: Uint8Array): ClientChunk {
    const chunk: ClientChunk = { cx, cz, blocks, light, solid: null, translucent: null, needsMesh: true, urgent: false, meshed: false };
    const key = chunkKey(cx, cz);
    this.chunks.set(key, chunk);
    // Правки, пришедшие, пока воркер генерировал чанк.
    const late: number[] = [];
    const edits = this.edits.get(key);
    if (edits) for (const [i, state] of edits) if (blocks[i] !== state) late.push(i, state);

    const changed = new Set<string>();
    stitchChunkLight(this, cx, cz, changed);
    for (let k = 0; k < late.length; k += 2) {
      const i = late[k];
      blocks[i] = late[k + 1];
      updateLight(this, cx * S + (i & 15), i >> 8, cz * S + ((i >> 4) & 15), changed);
    }
    for (const k of changed) {
      const c = this.chunks.get(k);
      if (c && c !== chunk && c.meshed) c.needsMesh = true;
    }
    return chunk;
  }

  /** Есть ли твёрдый полный блок (для простых проверок). */
  isOpaque(x: number, y: number, z: number): boolean {
    return FULL_CUBE[this.getState(x, y, z) & TYPE_MASK] === 1;
  }
}

/** Загружает чанки вокруг игрока (генерация и свет — в веб-воркерах) и строит их меши. */
export class ChunkManager {
  renderDistance: number;
  meshOptions: MeshOptions = { fancyLeaves: true };
  private readonly workers: Worker[] = [];
  private readonly workerLoad: number[] = [];
  private readonly inflight = new Set<string>();
  private queue: [number, number][] = [];
  private center: [number, number] | null = null;
  private readonly padBlocks = new Uint16Array(PADDED_SIZE);
  private readonly padLight = new Uint8Array(PADDED_SIZE);

  constructor(
    private readonly world: World,
    private readonly scene: THREE.Scene,
    private materials: TerrainMaterials,
    private readonly seed: number,
    renderDistance: number,
  ) {
    this.renderDistance = renderDistance;
    const count = Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 4) - 1));
    for (let i = 0; i < count; i++) {
      const worker = new Worker(new URL('./gen.worker.ts', import.meta.url), { type: 'module' });
      worker.onmessage = (e: MessageEvent<{ cx: number; cz: number; blocks: Uint16Array; light: Uint8Array }>) => {
        this.workerLoad[i]--;
        this.onGenerated(e.data.cx, e.data.cz, e.data.blocks, e.data.light);
      };
      this.workers.push(worker);
      this.workerLoad.push(0);
    }
  }

  setRenderDistance(d: number): void {
    this.renderDistance = d;
    this.center = null;
  }

  /** Новые материалы (смена качества графики) — пересобираем все меши. */
  setMaterials(materials: TerrainMaterials, options: MeshOptions): void {
    this.materials = materials;
    this.meshOptions = options;
    for (const c of this.world.chunks.values()) if (c.meshed) c.needsMesh = true;
  }

  get loadedCount(): number {
    return this.world.chunks.size;
  }

  get pendingCount(): number {
    return this.queue.length + this.inflight.size;
  }

  update(px: number, pz: number, budgetMs: number): void {
    const pcx = Math.floor(px) >> 4;
    const pcz = Math.floor(pz) >> 4;
    if (!this.center || this.center[0] !== pcx || this.center[1] !== pcz) {
      this.center = [pcx, pcz];
      this.refresh(pcx, pcz);
    }
    this.dispatch();
    this.buildMeshes(pcx, pcz, budgetMs);
  }

  private refresh(pcx: number, pcz: number): void {
    const R = this.renderDistance;
    for (const [key, chunk] of this.world.chunks) {
      if (Math.max(Math.abs(chunk.cx - pcx), Math.abs(chunk.cz - pcz)) > R + 2) {
        this.disposeMeshes(chunk);
        this.world.chunks.delete(key);
      }
    }
    // Данные нужны на один чанк дальше, чем видно, — для граней и света на краю.
    const wanted: [number, number, number][] = [];
    for (let dz = -R - 1; dz <= R + 1; dz++)
      for (let dx = -R - 1; dx <= R + 1; dx++) {
        if (dx * dx + dz * dz > (R + 1.5) * (R + 1.5)) continue;
        const cx = pcx + dx;
        const cz = pcz + dz;
        const key = chunkKey(cx, cz);
        if (this.world.chunks.has(key) || this.inflight.has(key)) continue;
        wanted.push([cx, cz, dx * dx + dz * dz]);
      }
    wanted.sort((a, b) => b[2] - a[2]);
    this.queue = wanted.map(([cx, cz]) => [cx, cz]);
  }

  private dispatch(): void {
    while (this.queue.length) {
      let best = 0;
      for (let i = 1; i < this.workers.length; i++) if (this.workerLoad[i] < this.workerLoad[best]) best = i;
      if (this.workerLoad[best] >= 2) return;
      const [cx, cz] = this.queue.pop()!;
      this.inflight.add(chunkKey(cx, cz));
      this.workerLoad[best]++;
      this.workers[best].postMessage({ seed: this.seed, cx, cz, edits: this.world.editsFor(cx, cz) });
    }
  }

  private onGenerated(cx: number, cz: number, blocks: Uint16Array, light: Uint8Array): void {
    this.inflight.delete(chunkKey(cx, cz));
    const c = this.center;
    if (!c || Math.max(Math.abs(cx - c[0]), Math.abs(cz - c[1])) > this.renderDistance + 2) return;
    if (this.world.chunks.has(chunkKey(cx, cz))) return;
    this.world.addChunk(cx, cz, blocks, light);
  }

  private buildMeshes(pcx: number, pcz: number, budgetMs: number): void {
    const R = this.renderDistance;
    const candidates: { chunk: ClientChunk; score: number }[] = [];
    for (const chunk of this.world.chunks.values()) {
      if (!chunk.needsMesh) continue;
      const dx = chunk.cx - pcx;
      const dz = chunk.cz - pcz;
      if (dx * dx + dz * dz > (R + 0.5) * (R + 0.5) && !chunk.meshed) continue;
      if (!this.hasNeighbors(chunk)) continue;
      candidates.push({ chunk, score: (chunk.urgent ? -1e6 : 0) + dx * dx + dz * dz });
    }
    if (!candidates.length) return;
    candidates.sort((a, b) => a.score - b.score);
    const start = performance.now();
    for (const { chunk } of candidates) {
      if (!chunk.urgent && performance.now() - start > budgetMs) break;
      this.meshChunk(chunk);
    }
  }

  private hasNeighbors(chunk: ClientChunk): boolean {
    for (let dz = -1; dz <= 1; dz++)
      for (let dx = -1; dx <= 1; dx++) if (!this.world.chunks.has(chunkKey(chunk.cx + dx, chunk.cz + dz))) return false;
    return true;
  }

  private meshChunk(chunk: ClientChunk): void {
    const neighbors: (ChunkData | undefined)[] = [];
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) neighbors.push(this.world.getChunk(chunk.cx + dx, chunk.cz + dz));
    buildPadded(neighbors, this.padBlocks, this.padLight);
    const { solid, translucent } = meshChunk(this.padBlocks, this.padLight, this.meshOptions);
    this.disposeMeshes(chunk);
    chunk.solid = solid && this.createMesh(solid, this.materials.solid, chunk, true);
    chunk.translucent = translucent && this.createMesh(translucent, this.materials.translucent, chunk, false);
    chunk.needsMesh = chunk.urgent = false;
    chunk.meshed = true;
  }

  private createMesh(md: MeshData, material: THREE.Material, chunk: ClientChunk, castShadow: boolean): THREE.Mesh {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('aPos', new THREE.BufferAttribute(md.pos, 4));
    geometry.setAttribute('aData', new THREE.BufferAttribute(md.data, 4));
    geometry.setIndex(new THREE.BufferAttribute(md.index, 1));
    // Позиции упакованы в целые числа, поэтому границы для отсечения задаём вручную.
    geometry.boundingBox = new THREE.Box3(new THREE.Vector3(0, md.minY - 0.5, 0), new THREE.Vector3(S, md.maxY + 0.5, S));
    geometry.boundingSphere = geometry.boundingBox.getBoundingSphere(new THREE.Sphere());

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(chunk.cx * S, 0, chunk.cz * S);
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    if (castShadow) mesh.layers.set(LAYER_TERRAIN);
    this.scene.add(mesh);
    return mesh;
  }

  private disposeMeshes(chunk: ClientChunk): void {
    for (const mesh of [chunk.solid, chunk.translucent]) {
      if (!mesh) continue;
      this.scene.remove(mesh);
      mesh.geometry.dispose();
    }
    chunk.solid = chunk.translucent = null;
  }

  dispose(): void {
    for (const w of this.workers) w.terminate();
    for (const chunk of this.world.chunks.values()) this.disposeMeshes(chunk);
  }
}
