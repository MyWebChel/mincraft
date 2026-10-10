import { blockIndex, chunkKey } from '../src/shared/constants';
import type { ItemStack, Slots } from '../src/shared/inventory';
import type { ContainerKind, GameMode, MobType, Vec3 } from '../src/shared/protocol';

export interface SavedPlayer {
  p: Vec3;
  r: [number, number];
  inventory: Slots;
  armor: Slots;
  selected: number;
  hp: number;
  food: number;
  saturation: number;
  mode: GameMode;
  spawn: Vec3 | null;
}

export interface SavedContainer {
  kind: ContainerKind;
  slots: Slots;
  burn: number;
  burnMax: number;
  cook: number;
}

export interface SavedMob {
  type: MobType;
  p: Vec3;
  hp: number;
  sheared?: boolean;
}

export interface SavedItem {
  item: ItemStack;
  p: Vec3;
  age: number;
}

interface WorldFile {
  version: 2;
  seed: number;
  time: number;
  rain: number;
  /** Изменения блоков: x, y, z, состояние, ... */
  edits: number[];
  players: Record<string, SavedPlayer>;
  containers: Record<string, SavedContainer>;
  mobs: SavedMob[];
  items: SavedItem[];
  /** Чанки, в которых уже появлялись животные. */
  populated: string[];
  spawn: Vec3 | null;
}

/** Где лежит сохранение: файл на диске у Node-сервера или IndexedDB в браузере. */
export interface WorldBackend {
  /** Сохранённый мир (JSON) или null, если его ещё нет. */
  read(): string | null;
  write(json: string): void;
  /** Отложить непригодное сохранение в сторону, чтобы новый мир его не затёр. */
  discard(reason: string): void;
}

/**
 * Сохранение мира в JSON: сид, все изменения блоков (сам ландшафт
 * генерируется заново из сида), игроки, сундуки и печи, животные.
 */
export class WorldStore {
  seed: number;
  time = 1000;
  rain = 0;
  spawn: Vec3 | null = null;
  /** Изменения по чанкам: ключ чанка → индекс блока → состояние. */
  readonly edits = new Map<string, Map<number, number>>();
  readonly players = new Map<string, SavedPlayer>();
  readonly containers = new Map<string, SavedContainer>();
  readonly populated = new Set<string>();
  mobs: SavedMob[] = [];
  items: SavedItem[] = [];
  private dirty = false;

  /** seed — для нового мира (если сохранения нет); по умолчанию случайный. */
  constructor(
    private readonly backend: WorldBackend,
    seed?: number,
  ) {
    const loaded = this.load();
    if (loaded) {
      this.seed = loaded.seed;
      this.time = loaded.time;
      this.rain = loaded.rain ?? 0;
      this.spawn = loaded.spawn ?? null;
      for (let i = 0; i + 3 < loaded.edits.length; i += 4) {
        const [x, y, z, s] = loaded.edits.slice(i, i + 4);
        this.setBlock(x, y, z, s);
      }
      for (const [name, p] of Object.entries(loaded.players ?? {})) this.players.set(name, p);
      for (const [key, c] of Object.entries(loaded.containers ?? {})) this.containers.set(key, c);
      for (const k of loaded.populated ?? []) this.populated.add(k);
      this.mobs = loaded.mobs ?? [];
      this.items = loaded.items ?? [];
      this.dirty = false;
      console.log(`[world] загружен мир: сид ${this.seed}, изменённых чанков ${this.edits.size}`);
    } else {
      this.seed = seed !== undefined && Number.isFinite(seed) ? seed | 0 : (Math.random() * 2 ** 31) | 0;
      this.dirty = true;
      console.log(`[world] создан новый мир с сидом ${this.seed}`);
    }
  }

  markDirty(): void {
    this.dirty = true;
  }

  setBlock(x: number, y: number, z: number, state: number): void {
    const key = chunkKey(x >> 4, z >> 4);
    let m = this.edits.get(key);
    if (!m) this.edits.set(key, (m = new Map()));
    m.set(blockIndex(x & 15, y, z & 15), state);
    this.dirty = true;
  }

  chunkEdits(cx: number, cz: number): Map<number, number> | undefined {
    return this.edits.get(chunkKey(cx, cz));
  }

  flatEdits(): number[] {
    const out: number[] = [];
    for (const [key, m] of this.edits) {
      const [cx, cz] = key.split(',').map(Number);
      for (const [i, s] of m) out.push(cx * 16 + (i & 15), i >> 8, cz * 16 + ((i >> 4) & 15), s);
    }
    return out;
  }

  save(force = false): void {
    if (!this.dirty && !force) return;
    const data: WorldFile = {
      version: 2,
      seed: this.seed,
      time: Math.floor(this.time),
      rain: this.rain,
      spawn: this.spawn,
      edits: this.flatEdits(),
      players: Object.fromEntries(this.players),
      containers: Object.fromEntries(this.containers),
      mobs: this.mobs,
      items: this.items,
      populated: [...this.populated],
    };
    this.backend.write(JSON.stringify(data));
    this.dirty = false;
  }

  private load(): WorldFile | null {
    let raw: string | null;
    try {
      raw = this.backend.read();
    } catch (err) {
      console.error('[world] не удалось прочитать сохранение:', err);
      return null;
    }
    if (raw === null) return null;
    try {
      const data = JSON.parse(raw) as WorldFile;
      if (data.version === 2 && Number.isFinite(data.seed)) {
        data.edits ??= [];
        data.time ??= 1000;
        return data;
      }
      throw new Error(`неподдерживаемая версия сохранения: ${String((data as { version?: unknown }).version)}`);
    } catch (err) {
      // Не затираем старое или повреждённое сохранение — откладываем его в сторону.
      this.backend.discard((err as Error).message);
      return null;
    }
  }
}
