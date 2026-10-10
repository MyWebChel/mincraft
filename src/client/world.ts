import * as THREE from 'three';
import { Block, FULL_CUBE, TYPE_MASK } from '../shared/blocks';
import { CHUNK_SIZE as S, WORLD_HEIGHT as H, blockIndex, chunkKey } from '../shared/constants';
import { stitchChunkLight, updateLight, type ChunkData, type ChunkSource } from '../shared/light';
import type { ChunkJob, ChunkResult } from './chunk.worker';
import { PADDED_SIZE, SECTION_COUNT, buildPadded, type MeshData, type MeshOptions } from './mesher';
import { LAYER_CUTOUT, LAYER_TERRAIN, type TerrainMaterials } from './render/materials';

/** Слои меша чанка: 0 — непрозрачные блоки, 1 — «дырявые» (листва, стекло), 2 — полупрозрачные. */
const MESH_LAYERS = 3;

export interface ClientChunk extends ChunkData {
  cx: number;
  cz: number;
  meshes: (THREE.Mesh | null)[];
  /** Границы секций в индексах меша каждого слоя (см. MeshData.sections). */
  sections: (Uint32Array | null)[];
  /** Связность секций (см. sectionConnectivity); null — меша ещё нет. */
  conn: Uint8Array | null;
  needsMesh: boolean;
  /** Изменён игроком — перестраиваем в первую очередь. */
  urgent: boolean;
  meshed: boolean;
  /** Меш строится в воркере. */
  meshing: boolean;
  /** Секции, видимые камере: viewLo..viewHi (lo > hi — не видно ни одной). */
  viewLo: number;
  viewHi: number;
  /** Высота геометрии чанка (для отсечения). */
  minY: number;
  maxY: number;
  /**
   * Секции с гранями под светом неба: только они могут отбрасывать тень на освещённое солнцем.
   * Видимость от камеры для теней не годится — тень на видимый склон бросает и дерево за холмом.
   */
  litLo: number;
  litHi: number;
}

/** Блоки и свет загруженных чанков плюс все изменения мира, пришедшие с сервера. */
export class World implements ChunkSource {
  readonly chunks = new Map<string, ClientChunk>();
  private readonly edits = new Map<string, Map<number, number>>();
  /** Блок изменился — меши затронутых чанков надо перестроить срочно. */
  onEdit: () => void = () => {};

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
    this.onEdit();
    return true;
  }

  applyEdits(flat: number[]): void {
    for (let i = 0; i + 3 < flat.length; i += 4) this.setState(flat[i], flat[i + 1], flat[i + 2], flat[i + 3]);
  }

  addChunk(cx: number, cz: number, blocks: Uint16Array, light: Uint8Array): ClientChunk {
    const chunk: ClientChunk = {
      cx,
      cz,
      blocks,
      light,
      meshes: [null, null, null],
      sections: [null, null, null],
      conn: null,
      needsMesh: true,
      urgent: false,
      meshed: false,
      meshing: false,
      viewLo: 0,
      viewHi: SECTION_COUNT - 1,
      minY: 0,
      maxY: H,
      litLo: 0,
      litHi: SECTION_COUNT - 1,
    };
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

type Job = { kind: 'gen'; key: string; worker: number } | { kind: 'mesh'; chunk: ClientChunk; worker: number; batch: number };

interface MeshResult {
  chunk: ClientChunk;
  meshes: (MeshData | null)[];
  lit: number;
  conn: Uint8Array;
}

/** Сколько заданий одновременно держит каждый воркер. */
const WORKER_QUEUE = 2;

// Направления обхода секций: +X, -X, +Y, -Y, +Z, -Z (как грани в мешере).
const DX = [1, -1, 0, 0, 0, 0];
const DY = [0, 0, 1, -1, 0, 0];
const DZ = [0, 0, 0, 0, 1, -1];
const OPPOSITE = [1, 0, 3, 2, 5, 4];

/**
 * Загружает чанки вокруг игрока и строит их меши. Генерация, свет и меши считаются
 * в веб-воркерах — главный поток только раздаёт задания и добавляет готовое в сцену.
 * Невидимые пещеры не рисуются: от камеры обходятся секции 16×16×16, связанные
 * прозрачными клетками (как «визграф» в Minecraft), и рисуются только достигнутые.
 */
export class ChunkManager {
  renderDistance: number;
  meshOptions: MeshOptions = { fancyLeaves: true };
  /** Отсечение невидимых секций (выключается только для отладки и проверок). */
  culling = true;
  private readonly workers: Worker[] = [];
  private readonly workerLoad: number[] = [];
  private readonly jobs = new Map<number, Job>();
  private nextJob = 1;
  private readonly inflightGen = new Set<string>();
  private genQueue: [number, number][] = [];
  private center: [number, number] | null = null;
  /** Буферы для заданий на меш: воркер возвращает их вместе с результатом. */
  private readonly padPool: { blocks: Uint16Array; light: Uint8Array }[] = [];
  private readonly ready: MeshResult[] = [];
  private readonly urgentReady: MeshResult[] = [];
  /** Перестройки после правок игрока применяются пачкой, чтобы на стыке чанков не мелькали дыры. */
  private readonly batches = new Map<number, { left: number; results: MeshResult[] }>();
  private nextBatch = 1;
  private editQueued = false;
  private meshing = 0;
  /** Меши поменялись — видимость надо пересчитать. */
  private visDirty = true;
  private readonly viewMatrix = new THREE.Matrix4();
  private readonly lastView = new THREE.Matrix4();
  private readonly frustum = new THREE.Frustum();
  private readonly passMatrix = new THREE.Matrix4();
  private readonly passFrustum = new THREE.Frustum();
  private readonly box = new THREE.Box3();
  private visCap = 0;
  private visSeen = new Uint8Array(0);
  private visQueue = new Int32Array(0);
  private visFrom = new Uint8Array(0);
  private visDirs = new Uint8Array(0);
  private visLo = new Int8Array(0);
  private visHi = new Int8Array(0);
  private visGrid: (ClientChunk | undefined)[] = [];

  constructor(
    private readonly world: World,
    private readonly scene: THREE.Scene,
    private materials: TerrainMaterials,
    private readonly seed: number,
    renderDistance: number,
  ) {
    this.renderDistance = renderDistance;
    // Правку игрока отдаём воркеру сразу, не дожидаясь кадра; все правки одного сообщения — одной пачкой.
    world.onEdit = () => {
      if (this.editQueued) return;
      this.editQueued = true;
      queueMicrotask(() => {
        this.editQueued = false;
        if (this.center) this.dispatch(this.center[0], this.center[1], performance.now(), 1);
      });
    };
    const count = Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 4) - 1));
    for (let i = 0; i < count; i++) {
      const worker = new Worker(new URL('./chunk.worker.ts', import.meta.url), { type: 'module' });
      worker.onmessage = (e: MessageEvent<ChunkResult>) => this.onResult(i, e.data);
      this.workers.push(worker);
      this.workerLoad.push(0);
    }
  }

  setRenderDistance(d: number): void {
    this.renderDistance = d;
    this.center = null;
  }

  /** Новые материалы (смена качества графики); меши перестраиваем, только если поменялась листва. */
  setMaterials(materials: TerrainMaterials, options: MeshOptions): void {
    const remesh = options.fancyLeaves !== this.meshOptions.fancyLeaves;
    this.materials = materials;
    this.meshOptions = options;
    for (const c of this.world.chunks.values()) {
      for (let i = 0; i < MESH_LAYERS; i++) {
        const mesh = c.meshes[i];
        if (mesh) mesh.material = this.layerMaterial(i);
      }
      if (remesh && c.meshed) c.needsMesh = true;
    }
  }

  get loadedCount(): number {
    return this.world.chunks.size;
  }

  get pendingCount(): number {
    return this.genQueue.length + this.inflightGen.size + this.meshing + this.ready.length;
  }

  /** Камера нужна для видимости секций: рисуем только то, что из неё можно увидеть. */
  update(camera: THREE.PerspectiveCamera, budgetMs: number): void {
    const { x, z } = camera.position;
    const pcx = Math.floor(x) >> 4;
    const pcz = Math.floor(z) >> 4;
    if (!this.center || this.center[0] !== pcx || this.center[1] !== pcz) {
      this.center = [pcx, pcz];
      this.refresh(pcx, pcz);
    }
    const start = performance.now();
    for (const r of this.urgentReady.splice(0)) this.applyMesh(r);
    while (this.ready.length && performance.now() - start < budgetMs) this.applyMesh(this.ready.shift()!);
    this.dispatch(pcx, pcz, start, budgetMs);
    this.updateVisibility(camera);
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
        if (this.world.chunks.has(key) || this.inflightGen.has(key)) continue;
        wanted.push([cx, cz, dx * dx + dz * dz]);
      }
    wanted.sort((a, b) => b[2] - a[2]);
    this.genQueue = wanted.map(([cx, cz]) => [cx, cz]);
    this.visDirty = true;
  }

  /** Наименее загруженный воркер; -1 — все заняты (срочным заданиям можно и сверх очереди). */
  private pickWorker(urgent: boolean): number {
    let best = 0;
    for (let i = 1; i < this.workers.length; i++) if (this.workerLoad[i] < this.workerLoad[best]) best = i;
    return urgent || this.workerLoad[best] < WORKER_QUEUE ? best : -1;
  }

  private dispatch(pcx: number, pcz: number, start: number, budgetMs: number): void {
    const R = this.renderDistance;
    const candidates: { chunk: ClientChunk; score: number }[] = [];
    for (const chunk of this.world.chunks.values()) {
      if (!chunk.needsMesh || chunk.meshing) continue;
      const dx = chunk.cx - pcx;
      const dz = chunk.cz - pcz;
      const d2 = dx * dx + dz * dz;
      if (d2 > (R + 0.5) * (R + 0.5) && !chunk.meshed) continue;
      if (!this.hasNeighbors(chunk)) continue;
      candidates.push({ chunk, score: chunk.urgent ? -1 : d2 });
    }
    candidates.sort((a, b) => a.score - b.score);

    // Все срочные перестройки этого кадра — одна пачка.
    let batch = 0;
    let next = 0;
    for (; next < candidates.length && candidates[next].chunk.urgent; next++) {
      if (!batch) {
        batch = this.nextBatch++;
        this.batches.set(batch, { left: 0, results: [] });
      }
      this.batches.get(batch)!.left++;
      this.sendMesh(candidates[next].chunk, this.pickWorker(true), batch);
    }

    // Остальное — пока есть свободные воркеры: ближние меши раньше дальней генерации.
    for (;;) {
      const w = this.pickWorker(false);
      if (w < 0) return;
      const mesh = candidates[next];
      const gen = this.genQueue[this.genQueue.length - 1];
      const genD2 = gen ? (gen[0] - pcx) ** 2 + (gen[1] - pcz) ** 2 : Infinity;
      if (mesh && mesh.score <= genD2) {
        // Сборка «расширенного» чанка для воркера стоит ~0.3 мс — держим бюджет кадра.
        if (performance.now() - start > budgetMs) return;
        next++;
        this.sendMesh(mesh.chunk, w, 0);
      } else if (gen) {
        this.genQueue.pop();
        this.sendGen(gen[0], gen[1], w);
      } else return;
    }
  }

  private sendGen(cx: number, cz: number, w: number): void {
    const key = chunkKey(cx, cz);
    const id = this.nextJob++;
    this.inflightGen.add(key);
    this.jobs.set(id, { kind: 'gen', key, worker: w });
    this.workerLoad[w]++;
    this.post(w, { t: 'gen', id, seed: this.seed, cx, cz, edits: this.world.editsFor(cx, cz) }, []);
  }

  private sendMesh(chunk: ClientChunk, w: number, batch: number): void {
    const neighbors: (ChunkData | undefined)[] = [];
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) neighbors.push(this.world.getChunk(chunk.cx + dx, chunk.cz + dz));
    const pad = this.padPool.pop() ?? { blocks: new Uint16Array(PADDED_SIZE), light: new Uint8Array(PADDED_SIZE) };
    buildPadded(neighbors, pad.blocks, pad.light);
    chunk.needsMesh = chunk.urgent = false;
    chunk.meshing = true;
    this.meshing++;
    const id = this.nextJob++;
    this.jobs.set(id, { kind: 'mesh', chunk, worker: w, batch });
    this.workerLoad[w]++;
    const job: ChunkJob = { t: 'mesh', id, blocks: pad.blocks, light: pad.light, fancyLeaves: this.meshOptions.fancyLeaves };
    this.post(w, job, [pad.blocks.buffer, pad.light.buffer]);
  }

  private post(w: number, job: ChunkJob, transfer: Transferable[]): void {
    this.workers[w].postMessage(job, transfer);
  }

  private onResult(w: number, msg: ChunkResult): void {
    this.handleResult(w, msg);
    // Освободившемуся воркеру сразу даём новое задание, не дожидаясь кадра: загрузка не зависит от FPS.
    if (this.center) this.dispatch(this.center[0], this.center[1], performance.now(), 1);
  }

  private handleResult(w: number, msg: ChunkResult): void {
    const job = this.jobs.get(msg.id);
    if (!job) return;
    this.jobs.delete(msg.id);
    this.workerLoad[w]--;
    if (msg.t === 'gen') {
      this.inflightGen.delete(chunkKey(msg.cx, msg.cz));
      const c = this.center;
      if (!c || Math.max(Math.abs(msg.cx - c[0]), Math.abs(msg.cz - c[1])) > this.renderDistance + 2) return;
      if (this.world.chunks.has(chunkKey(msg.cx, msg.cz))) return;
      this.world.addChunk(msg.cx, msg.cz, msg.blocks, msg.light);
      return;
    }
    this.padPool.push({ blocks: msg.blocks, light: msg.light });
    if (job.kind !== 'mesh') return;
    job.chunk.meshing = false;
    this.meshing--;
    const result: MeshResult = { chunk: job.chunk, meshes: msg.meshes, lit: msg.lit, conn: msg.conn };
    if (!job.batch) {
      this.ready.push(result);
      return;
    }
    const batch = this.batches.get(job.batch)!;
    batch.results.push(result);
    if (--batch.left > 0) return;
    this.batches.delete(job.batch);
    this.urgentReady.push(...batch.results);
  }

  private hasNeighbors(chunk: ClientChunk): boolean {
    for (let dz = -1; dz <= 1; dz++)
      for (let dx = -1; dx <= 1; dx++) if (!this.world.chunks.has(chunkKey(chunk.cx + dx, chunk.cz + dz))) return false;
    return true;
  }

  private applyMesh(r: MeshResult): void {
    const chunk = r.chunk;
    // Чанк успели выгрузить, пока строился меш.
    if (this.world.getChunk(chunk.cx, chunk.cz) !== chunk) return;
    this.disposeMeshes(chunk);
    chunk.minY = H;
    chunk.maxY = 0;
    for (let i = 0; i < MESH_LAYERS; i++) {
      const md = r.meshes[i];
      chunk.sections[i] = md ? md.sections : null;
      chunk.meshes[i] = md ? this.createMesh(md, i, chunk) : null;
      if (md) {
        chunk.minY = Math.min(chunk.minY, md.minY - 0.5);
        chunk.maxY = Math.max(chunk.maxY, md.maxY + 0.5);
      }
    }
    chunk.conn = r.conn;
    chunk.litLo = r.lit ? 31 - Math.clz32(r.lit & -r.lit) : SECTION_COUNT;
    chunk.litHi = r.lit ? 31 - Math.clz32(r.lit) : -1;
    chunk.meshed = true;
    this.visDirty = true;
  }

  private layerMaterial(layer: number): THREE.Material {
    return layer === 0 ? this.materials.opaque : layer === 1 ? this.materials.cutout : this.materials.translucent;
  }

  private createMesh(md: MeshData, layer: number, chunk: ClientChunk): THREE.Mesh {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('aPos', new THREE.BufferAttribute(md.pos, 4));
    geometry.setAttribute('aData', new THREE.BufferAttribute(md.data, 4));
    geometry.setIndex(new THREE.BufferAttribute(md.index, 1));
    // Позиции упакованы в целые числа, поэтому границы для отсечения задаём вручную.
    geometry.boundingBox = new THREE.Box3(new THREE.Vector3(0, md.minY - 0.5, 0), new THREE.Vector3(S, md.maxY + 0.5, S));
    geometry.boundingSphere = geometry.boundingBox.getBoundingSphere(new THREE.Sphere());

    const mesh = new THREE.Mesh(geometry, this.layerMaterial(layer));
    mesh.frustumCulled = false; // отсекаем сами, точнее (см. preparePass)
    mesh.visible = false;
    mesh.position.set(chunk.cx * S, 0, chunk.cz * S);
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    // Тени отбрасывают непрозрачные и «дырявые» блоки (у них разные материалы в проходе теней).
    if (layer === 0) mesh.layers.set(LAYER_TERRAIN);
    else if (layer === 1) mesh.layers.set(LAYER_CUTOUT);
    this.scene.add(mesh);
    return mesh;
  }

  private disposeMeshes(chunk: ClientChunk): void {
    for (let i = 0; i < MESH_LAYERS; i++) {
      const mesh = chunk.meshes[i];
      if (!mesh) continue;
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      chunk.meshes[i] = null;
      chunk.sections[i] = null;
    }
  }

  /**
   * Отсечение перед проходом отрисовки (кадр или карта теней): чанк рисуется, только если
   * коробка его видимых секций пересекает пирамиду камеры, и только этими секциями — они
   * идут в меше подряд, поэтому хватает одного диапазона индексов. Сферы three.js для
   * высоких чанков слишком грубые, поэтому его отсечение для чанков выключено.
   */
  preparePass(camera: THREE.Camera, shadow: boolean): void {
    camera.updateMatrixWorld();
    this.passMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.passFrustum.setFromProjectionMatrix(this.passMatrix);
    const box = this.box;
    const all = shadow && !this.culling;
    for (const c of this.world.chunks.values()) {
      const lo = all ? 0 : shadow ? c.litLo : c.viewLo;
      const hi = all ? SECTION_COUNT - 1 : shadow ? c.litHi : c.viewHi;
      let inView = lo <= hi;
      if (inView) {
        box.min.set(c.cx * S, Math.max(lo * 16, c.minY), c.cz * S);
        box.max.set(c.cx * S + S, Math.min(hi * 16 + 16, c.maxY), c.cz * S + S);
        inView = box.min.y < box.max.y && this.passFrustum.intersectsBox(box);
      }
      for (let i = 0; i < MESH_LAYERS; i++) {
        const mesh = c.meshes[i];
        const sections = c.sections[i];
        if (!mesh || !sections) continue;
        const from = inView ? sections[lo] : 0;
        const count = inView ? sections[hi + 1] - from : 0;
        mesh.visible = count > 0;
        if (count > 0) mesh.geometry.setDrawRange(from, count);
      }
    }
  }

  /**
   * Обход секций от камеры. Из секции идём к соседу, только если грань, через которую
   * вошли, «видит» грань выхода, никогда — обратно к камере и не за пределы поля зрения.
   * Пещеры под землёй с поверхности недостижимы и не рисуются.
   */
  private updateVisibility(camera: THREE.PerspectiveCamera): void {
    const { x, y, z } = camera.position;
    const ccx = Math.floor(x) >> 4;
    const ccz = Math.floor(z) >> 4;
    const csy = Math.min(SECTION_COUNT - 1, Math.max(0, Math.floor(y) >> 4));
    camera.updateMatrixWorld();
    this.viewMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    if (!this.visDirty && this.viewMatrix.equals(this.lastView)) return;
    this.lastView.copy(this.viewMatrix);
    this.visDirty = false;
    if (!this.culling) {
      for (const c of this.world.chunks.values()) {
        c.viewLo = 0;
        c.viewHi = SECTION_COUNT - 1;
      }
      this.visDirty = true;
      return;
    }

    const R = this.renderDistance;
    const off = R + 1;
    const G = 2 * off + 1;
    const grid = this.visGrid;
    grid.length = G * G;
    for (let gz = 0; gz < G; gz++) for (let gx = 0; gx < G; gx++) grid[gz * G + gx] = this.world.getChunk(ccx + gx - off, ccz + gz - off);
    this.frustum.setFromProjectionMatrix(this.viewMatrix);
    this.traverse(ccx, csy, ccz, this.frustum);
    for (const c of this.world.chunks.values()) {
      const gx = c.cx - ccx + off;
      const gz = c.cz - ccz + off;
      const i = gx >= 0 && gx < G && gz >= 0 && gz < G ? gz * G + gx : -1;
      c.viewLo = i < 0 ? SECTION_COUNT : this.visLo[i];
      c.viewHi = i < 0 ? -1 : this.visHi[i];
    }
  }

  /** Обход в ширину от секции камеры; результат — диапазоны секций по столбцам (visLo/visHi). */
  private traverse(ccx: number, csy: number, ccz: number, frustum: THREE.Frustum): void {
    const R = this.renderDistance;
    const off = R + 1;
    const G = 2 * off + 1;
    const cols = G * G;
    const total = cols * SECTION_COUNT;
    if (this.visCap < total) {
      this.visCap = total;
      this.visSeen = new Uint8Array(total);
      this.visQueue = new Int32Array(total);
      this.visFrom = new Uint8Array(total);
      this.visDirs = new Uint8Array(total);
      this.visLo = new Int8Array(cols);
      this.visHi = new Int8Array(cols);
    }
    const { visSeen: seen, visQueue: queue, visFrom: from, visDirs: dirs, visLo: lo, visHi: hi, visGrid: grid, box } = this;
    seen.fill(0, 0, total);
    lo.fill(SECTION_COUNT, 0, cols);
    hi.fill(-1, 0, cols);

    const startIdx = (csy * G + off) * G + off;
    seen[startIdx] = 1;
    queue[0] = startIdx;
    from[0] = 6; // стартовая секция: можно во все стороны
    dirs[0] = 0;
    let head = 0;
    let tail = 1;
    const limit = (R + 1) * (R + 1);
    while (head < tail) {
      const idx = queue[head];
      const enter = from[head];
      const went = dirs[head];
      head++;
      const gx = idx % G;
      const gz = ((idx / G) | 0) % G;
      const sy = (idx / cols) | 0;
      const col = gz * G + gx;
      if (sy < lo[col]) lo[col] = sy;
      if (sy > hi[col]) hi[col] = sy;
      const conn = grid[col]?.conn;
      // Чанк без меша (ещё не построен или не загружен) считаем прозрачным.
      const exits = enter === 6 || !conn ? 0x3f : conn[sy * 6 + enter];
      for (let d = 0; d < 6; d++) {
        if (!(exits & (1 << d)) || went & (1 << OPPOSITE[d])) continue;
        const ny = sy + DY[d];
        if (ny < 0 || ny >= SECTION_COUNT) continue;
        const nx = gx + DX[d];
        const nz = gz + DZ[d];
        const rx = nx - off;
        const rz = nz - off;
        if (rx * rx + rz * rz > limit) continue;
        const n = (ny * G + nz) * G + nx;
        if (seen[n]) continue;
        // Соседние с камерой секции — всегда (камера у самой границы видит и их).
        if (Math.abs(rx) > 1 || Math.abs(rz) > 1 || Math.abs(ny - csy) > 1) {
          const bx = (ccx + rx) * S;
          const bz = (ccz + rz) * S;
          box.min.set(bx, ny * 16, bz);
          box.max.set(bx + S, ny * 16 + 16, bz + S);
          if (!frustum.intersectsBox(box)) continue;
        }
        seen[n] = 1;
        queue[tail] = n;
        from[tail] = OPPOSITE[d];
        dirs[tail] = went | (1 << d);
        tail++;
      }
    }
  }

  dispose(): void {
    for (const w of this.workers) w.terminate();
    for (const chunk of this.world.chunks.values()) this.disposeMeshes(chunk);
  }
}
