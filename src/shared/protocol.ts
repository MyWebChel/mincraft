import type { ItemStack, Slots } from './inventory';

export type Vec3 = [number, number, number];
export type GameMode = 'survival' | 'creative';
export type MobType = 'pig' | 'cow' | 'sheep' | 'chicken' | 'zombie' | 'skeleton' | 'creeper' | 'spider';
export type EntityKind = 'mob' | 'item' | 'arrow' | 'tnt' | 'falling';

export const MOB_NAMES: Record<MobType, string> = {
  pig: 'свинья',
  cow: 'корова',
  sheep: 'овца',
  chicken: 'курица',
  zombie: 'зомби',
  skeleton: 'скелет',
  creeper: 'крипер',
  spider: 'паук',
};

/** Размеры хитбоксов мобов: [ширина, высота]. */
export const MOB_SIZE: Record<MobType, [number, number]> = {
  pig: [0.9, 0.9],
  cow: [0.9, 1.4],
  sheep: [0.9, 1.3],
  chicken: [0.4, 0.7],
  zombie: [0.6, 1.95],
  skeleton: [0.6, 1.99],
  creeper: [0.6, 1.7],
  spider: [1.4, 0.9],
};

export interface PlayerInfo {
  id: number;
  name: string;
  color: string;
  p: Vec3;
  /** Поворот: [yaw, pitch] в радианах. */
  r: [number, number];
  /** Предмет в руке и броня (id предметов, 0 — пусто). */
  held: number;
  armor: number[];
  sneak: boolean;
  mode: GameMode;
}

export interface EntityInfo {
  id: number;
  kind: EntityKind;
  /** Тип моба. */
  type?: MobType;
  p: Vec3;
  yaw: number;
  /** Наклон (стрелы) или поворот головы относительно тела (мобы). */
  pitch: number;
  /** Предмет (для выпавших предметов). */
  item?: ItemStack;
  /** Состояние блока (падающий песок). */
  state?: number;
  /** Флаги: 1 — ранен, 2 — горит, 4 — острижен, 8 — атакует. */
  flags?: number;
}

/** Состояние игрока, которое сервер хранит между сессиями. */
export interface SelfState {
  p: Vec3;
  r: [number, number];
  inventory: Slots;
  armor: Slots;
  selected: number;
  hp: number;
  food: number;
  saturation: number;
  mode: GameMode;
  spawn: Vec3;
}

export type ContainerKind = 'chest' | 'furnace';

export interface ContainerState {
  /** Идентификатор контейнера — координаты блока «x,y,z». */
  cid: string;
  kind: ContainerKind;
  slots: Slots;
  /** Печь: оставшееся время горения, полное время горения, прогресс плавки. */
  burn?: number;
  burnMax?: number;
  cook?: number;
}

export type UseAction = 'till' | 'bonemeal' | 'ignite' | 'fill' | 'empty';

export type ClientMessage =
  | { t: 'hello'; name: string; color: string }
  | { t: 'move'; p: Vec3; r: [number, number]; sneak: boolean; fly: boolean }
  | { t: 'swing' }
  | { t: 'break'; x: number; y: number; z: number; tool: number | null }
  /** item — чем ставили: если сервер откажет, предмет вернётся в выживании. */
  | { t: 'place'; x: number; y: number; z: number; state: number; item?: number }
  | { t: 'interact'; x: number; y: number; z: number }
  | { t: 'use'; x: number; y: number; z: number; action: UseAction; fluid?: 'water' | 'lava' }
  | { t: 'attack'; id: number; item: number | null; crit: boolean }
  | { t: 'interactEntity'; id: number; item: number | null }
  | { t: 'drop'; item: ItemStack; p: Vec3; v: Vec3; returned?: boolean }
  | { t: 'shoot'; p: Vec3; v: Vec3 }
  | { t: 'containerSlot'; cid: string; slot: number; item: ItemStack | null }
  | { t: 'containerClose' }
  | { t: 'inventory'; slots: Slots; armor: Slots; selected: number; held: number }
  | { t: 'stats'; hp: number; food: number; saturation: number }
  | { t: 'died'; cause: string; items: ItemStack[] }
  | { t: 'respawn' }
  | { t: 'wake' }
  | { t: 'chat'; text: string };

export type ServerMessage =
  | {
      t: 'welcome';
      id: number;
      seed: number;
      time: number;
      rain: number;
      /** Изменения мира плоским массивом: x, y, z, состояние, ... */
      edits: number[];
      players: PlayerInfo[];
      entities: EntityInfo[];
      self: SelfState;
    }
  | { t: 'join'; player: PlayerInfo }
  | { t: 'leave'; id: number }
  /** Позиции игроков: id, x, y, z, yaw, pitch, флаги (1 — крадётся), ... */
  | { t: 'moves'; d: number[] }
  | { t: 'playerInfo'; id: number; held: number; armor: number[]; mode: GameMode }
  | { t: 'swing'; id: number }
  /** Изменения блоков: x, y, z, состояние, ... */
  | { t: 'blocks'; d: number[] }
  | { t: 'spawn'; e: EntityInfo[] }
  /** Движение сущностей: id, x, y, z, yaw, pitch, флаги, ... */
  | { t: 'entities'; d: number[] }
  | { t: 'despawn'; ids: number[]; by?: number }
  | { t: 'entityEvent'; id: number; ev: 'hurt' | 'death' | 'fuse' | 'attack'; v?: number }
  | { t: 'hurt'; amount: number; cause: string; kx: number; kz: number }
  | { t: 'give'; item: ItemStack }
  | { t: 'container'; c: ContainerState }
  | { t: 'containerSlot'; cid: string; slot: number; item: ItemStack | null }
  | { t: 'containerProgress'; cid: string; burn: number; burnMax: number; cook: number }
  | { t: 'containerClosed'; cid: string }
  | { t: 'sound'; name: string; p: Vec3; volume?: number; pitch?: number }
  | { t: 'explosion'; p: Vec3; power: number }
  | { t: 'chat'; from: string | null; color?: string; text: string }
  | { t: 'time'; time: number }
  | { t: 'weather'; rain: number }
  | { t: 'tp'; p: Vec3 }
  | { t: 'mode'; mode: GameMode }
  | { t: 'spawnPoint'; p: Vec3 }
  | { t: 'sleep'; sleeping: boolean }
  | { t: 'kick'; reason: string };

export const PLAYER_COLORS = [
  '#e53935',
  '#fb8c00',
  '#fdd835',
  '#43a047',
  '#00acc1',
  '#1e88e5',
  '#8e24aa',
  '#ec407a',
];

export const ENTITY_FLAG_HURT = 1;
export const ENTITY_FLAG_BURNING = 2;
export const ENTITY_FLAG_SHEARED = 4;
export const ENTITY_FLAG_ATTACK = 8;
