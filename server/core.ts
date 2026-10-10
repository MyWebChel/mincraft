import {
  BLOCKS,
  Block,
  DIR_VEC,
  REPLACEABLE,
  SHAPE,
  SLAB_DOUBLE,
  SOLID,
  S_FLUID,
  fluidFalling,
  fluidLevel,
  isValidState,
  makeState,
  metaOf,
  typeOf,
} from '../src/shared/blocks';
import { DAY_LENGTH, MAX_CHAT_LENGTH, MAX_NAME_LENGTH, REACH, TICKS_PER_SECOND, WORLD_HEIGHT, chunkKey } from '../src/shared/constants';
import { blockDrops } from '../src/shared/drops';
import { ARMOR_SLOTS, INVENTORY_SIZE, emptySlots, sanitizeSlots, sanitizeStack, stack, type ItemStack, type Slots } from '../src/shared/inventory';
import { ALL_ITEMS, Item, isValidItem, itemDef } from '../src/shared/items';
import { bodyIntersectsBlock } from '../src/shared/physics';
import { MOB_NAMES, PLAYER_COLORS, type ClientMessage, type GameMode, type MobType, type PlayerInfo, type ServerMessage, type Vec3 } from '../src/shared/protocol';
import { Containers } from './containers';
import { EntityManager, FallingBlockEntity, Mob, TntEntity, type PlayerView } from './entities';
import { ServerWorld } from './server-world';
import type { SavedPlayer, WorldStore } from './world-store';

/**
 * Соединение с игроком. На Node-сервере это WebSocket, в браузере — канал к
 * веб-воркеру или WebRTC-соединение с другом, — ядру игры всё равно.
 */
export interface GameSocket {
  /** Можно ли сейчас отправлять. */
  readonly open: boolean;
  send(data: string): void;
  /** Закрыть соединение (коды как у WebSocket: 4000 — игрока выгнали). */
  close(code: number, reason: string): void;
  /** Оборвать без прощания (игрок не отвечает). */
  terminate(): void;
  /** Проверка связи: ответ придёт в onPong. */
  ping(): void;
  onMessage: (data: string) => void;
  onClose: (code: number) => void;
  onPong: () => void;
}

/** Самое большое сообщение от клиента, которое сервер вообще читает. */
const MAX_MESSAGE = 64 * 1024;

interface Client {
  id: number;
  socket: GameSocket;
  name: string;
  color: string;
  joined: boolean;
  alive: boolean;
  mode: GameMode;
  p: Vec3;
  r: [number, number];
  sneak: boolean;
  fly: boolean;
  held: number;
  armorIds: number[];
  inventory: Slots;
  armor: Slots;
  selected: number;
  hp: number;
  food: number;
  saturation: number;
  spawn: Vec3 | null;
  sleeping: boolean;
  /** Где игрок лёг: отойдя от кровати, он просыпается. */
  sleepPos: Vec3;
  /** Запас выстрелов и выбрасываний (пополняется каждый тик) — защита от спама. */
  shootBudget: number;
  dropBudget: number;
  moved: boolean;
  heartbeat: boolean;
  /** Сколько пингов подряд остались без ответа (телефон мог свернуть вкладку). */
  missed: number;
  budget: number;
  lastChat: number;
  pickupCooldown: number;
}

const NAME_RE = /^[\p{L}\p{N}_\- ]+$/u;
const COLOR_RE = /^#[0-9a-f]{6}$/i;

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const isInt = (v: unknown): v is number => Number.isInteger(v);
const isVec3 = (v: unknown): v is Vec3 => Array.isArray(v) && v.length === 3 && v.every(isNum);
const round = (v: number) => Math.round(v * 1000) / 1000;

export type GameCore = ReturnType<typeof createGameCore>;

/**
 * Ядро игры: мир, сущности, сундуки и печи, игроки и игровой цикл 20 тиков в секунду.
 * Транспорт подключается снаружи через connect(): WebSocket на Node-сервере
 * или каналы в браузере, когда мир «хостит» сам игрок.
 */
export function createGameCore(store: WorldStore) {
  const clients = new Map<number, Client>();
  let nextId = 1;

  const send = (c: Client, msg: ServerMessage) => {
    if (c.socket.open) c.socket.send(JSON.stringify(msg));
  };
  const sendTo = (id: number, msg: ServerMessage) => {
    const c = clients.get(id);
    if (c) send(c, msg);
  };
  const broadcast = (msg: ServerMessage, except?: Client) => {
    const data = JSON.stringify(msg);
    for (const c of clients.values()) if (c !== except && c.socket.open) c.socket.send(data);
  };
  const system = (text: string, to?: Client) => {
    const msg: ServerMessage = { t: 'chat', from: null, text };
    if (to) send(to, msg);
    else broadcast(msg);
  };

  const isDay = () => store.time < 12500 || store.time > 23500;
  const playerViews = (): PlayerView[] =>
    [...clients.values()].map((c) => ({ id: c.id, name: c.name, x: c.p[0], y: c.p[1], z: c.p[2], mode: c.mode, alive: c.alive }));

  // Мир, сущности и контейнеры ссылаются друг на друга через колбэки.
  const world: ServerWorld = new ServerWorld(store, {
    spawnFalling: (x, y, z, state) => entities.add(new FallingBlockEntity([x + 0.5, y, z + 0.5], state)),
    drop: (x, y, z, items) => entities.dropItems(x + 0.5, y + 0.5, z + 0.5, items),
    sound: (name, x, y, z) => broadcast({ t: 'sound', name, p: [x, y, z] }),
    containerRemoved: (x, y, z) => containers.removed(x, y, z),
  });
  const entities: EntityManager = new EntityManager(world, {
    broadcast: (msg) => broadcast(msg),
    hurtPlayer: (id, amount, cause, kx, kz) => {
      const c = clients.get(id);
      if (!c || !c.alive || c.mode !== 'survival') return;
      send(c, { t: 'hurt', amount, cause, kx, kz });
    },
    givePlayer: (id, item) => {
      const c = clients.get(id);
      if (!c || !c.alive || c.pickupCooldown > 0) return false;
      send(c, { t: 'give', item });
      return true;
    },
    players: playerViews,
    isDay,
    raining: () => store.rain > 0,
  });
  entities.restore(store.mobs, store.items);
  const containers: Containers = new Containers(store, world, sendTo, (x, y, z, items) => entities.dropItems(x, y, z, items));

  const worldSpawn = (): Vec3 => {
    if (!store.spawn) {
      store.spawn = world.gen.findSpawn();
      store.markDirty();
    }
    return store.spawn;
  };

  const info = (c: Client): PlayerInfo => ({
    id: c.id,
    name: c.name,
    color: c.color,
    p: c.p,
    r: c.r,
    held: c.held,
    armor: c.armorIds,
    sneak: c.sneak,
    mode: c.mode,
  });

  const savePlayer = (c: Client) => {
    const saved: SavedPlayer = {
      p: c.p,
      r: c.r,
      inventory: c.inventory,
      armor: c.armor,
      selected: c.selected,
      hp: c.alive ? c.hp : 20,
      food: c.food,
      saturation: c.saturation,
      mode: c.mode,
      spawn: c.spawn,
    };
    if (!c.alive) saved.p = [...(c.spawn ?? worldSpawn())];
    store.players.set(c.name, saved);
    store.markDirty();
  };

  const saveAll = () => {
    for (const c of clients.values()) if (c.joined) savePlayer(c);
    const snap = entities.snapshot();
    store.mobs = snap.mobs;
    store.items = snap.items;
    store.markDirty();
    store.save();
  };

  function kick(c: Client, reason: string): void {
    console.log(`[game] ${c.name || 'клиент'} отключён: ${reason}`);
    send(c, { t: 'kick', reason });
    c.socket.close(4000, 'kick');
  }

  function onConnection(socket: GameSocket): void {
    const c: Client = {
      id: nextId++,
      socket,
      name: '',
      color: PLAYER_COLORS[0],
      joined: false,
      alive: true,
      mode: 'survival',
      p: [0, 0, 0],
      r: [0, 0],
      sneak: false,
      fly: false,
      held: 0,
      armorIds: [0, 0, 0, 0],
      inventory: emptySlots(INVENTORY_SIZE),
      armor: emptySlots(ARMOR_SLOTS),
      selected: 0,
      hp: 20,
      food: 20,
      saturation: 5,
      spawn: null,
      sleeping: false,
      sleepPos: [0, 0, 0],
      shootBudget: 6,
      dropBudget: 60,
      moved: false,
      heartbeat: true,
      missed: 0,
      budget: 400,
      lastChat: 0,
      pickupCooldown: 0,
    };
    const helloTimer = setTimeout(() => {
      if (!c.joined) socket.close(4000, 'hello timeout');
    }, 10_000);
    socket.onPong = () => (c.heartbeat = true);
    socket.onClose = (code) => {
      clearTimeout(helloTimer);
      if (c.joined && code !== 1000 && code !== 1001 && code !== 4000) console.log(`[game] соединение ${c.name} закрыто с кодом ${code}`);
      leave(c, true);
    };
    socket.onMessage = (raw) => {
      if (raw.length > MAX_MESSAGE) return;
      if (--c.budget < 0) return kick(c, 'Слишком много сообщений');
      let msg: ClientMessage;
      try {
        msg = JSON.parse(raw);
      } catch {
        return;
      }
      if (!msg || typeof msg !== 'object') return;
      try {
        if (msg.t === 'hello') hello(c, msg);
        else if (c.joined) handle(c, msg);
      } catch (err) {
        console.error('[game] ошибка обработки сообщения', msg.t, err);
      }
    };
  }

  function hello(c: Client, msg: Extract<ClientMessage, { t: 'hello' }>): void {
    if (c.joined) return;
    const name = String(msg.name ?? '').trim().replace(/\s+/g, ' ');
    if (!name || name.length > MAX_NAME_LENGTH || !NAME_RE.test(name)) {
      return kick(c, `Имя должно быть от 1 до ${MAX_NAME_LENGTH} символов: буквы, цифры, пробел, _ или -`);
    }
    for (const other of clients.values()) {
      if (other.name.toLowerCase() === name.toLowerCase()) {
        leave(other, false);
        kick(other, 'Вы зашли в игру с другого устройства');
      }
    }
    c.name = name;
    c.color = COLOR_RE.test(String(msg.color)) ? String(msg.color) : PLAYER_COLORS[c.id % PLAYER_COLORS.length];
    const saved = store.players.get(name);
    const spawn = worldSpawn();
    if (saved) {
      c.p = saved.p;
      c.r = saved.r;
      c.inventory = sanitizeSlots(saved.inventory, INVENTORY_SIZE);
      c.armor = sanitizeSlots(saved.armor, ARMOR_SLOTS);
      c.selected = Math.max(0, Math.min(8, saved.selected | 0));
      c.hp = saved.hp > 0 ? saved.hp : 20;
      c.food = saved.food ?? 20;
      c.saturation = saved.saturation ?? 5;
      c.mode = saved.mode === 'creative' ? 'creative' : 'survival';
      c.spawn = saved.spawn ?? null;
    } else {
      c.p = [...spawn];
    }
    c.held = c.inventory[c.selected]?.id ?? 0;
    c.armorIds = c.armor.map((s) => s?.id ?? 0);
    c.joined = true;

    send(c, {
      t: 'welcome',
      id: c.id,
      seed: store.seed,
      time: store.time,
      rain: store.rain,
      edits: store.flatEdits(),
      players: [...clients.values()].map(info),
      entities: entities.all(),
      self: {
        p: c.p,
        r: c.r,
        inventory: c.inventory,
        armor: c.armor,
        selected: c.selected,
        hp: c.hp,
        food: c.food,
        saturation: c.saturation,
        mode: c.mode,
        spawn: c.spawn ?? spawn,
      },
    });
    clients.set(c.id, c);
    broadcast({ t: 'join', player: info(c) }, c);
    system(`${c.name} теперь в игре`);
    console.log(`[game] + ${c.name} (онлайн: ${clients.size})`);
  }

  function leave(c: Client, announce: boolean): void {
    if (clients.get(c.id) !== c) return;
    clients.delete(c.id);
    containers.close(c.id);
    savePlayer(c);
    broadcast({ t: 'leave', id: c.id });
    if (announce) system(`${c.name} больше не в игре`);
    console.log(`[game] - ${c.name} (онлайн: ${clients.size})`);
  }

  /** Дистанция от глаз игрока до центра блока. */
  const reachable = (c: Client, x: number, y: number, z: number, extra = 2) =>
    (x + 0.5 - c.p[0]) ** 2 + (y + 0.5 - (c.p[1] + 1.6)) ** 2 + (z + 0.5 - c.p[2]) ** 2 <= (REACH + extra) ** 2;

  /**
   * Отказ: возвращаем клиенту настоящее состояние блока. Только для загруженных
   * чанков — иначе далёкие координаты заставляли бы сервер генерировать мир.
   */
  const correct = (c: Client, x: number, y: number, z: number) => {
    if (y < 0 || y >= WORLD_HEIGHT || !world.isLoaded(x >> 4, z >> 4)) return;
    send(c, { t: 'blocks', d: [x, y, z, world.peekState(x, y, z)] });
  };

  /** Мешают ли блоку игроки или мобы. Сам ставящий не в счёт: свою позицию клиент проверил точнее. */
  const entityBlocks = (x: number, y: number, z: number, except?: Client) => {
    for (const o of clients.values()) {
      if (!o.alive || o === except) continue;
      if (bodyIntersectsBlock({ x: o.p[0], y: o.p[1], z: o.p[2], width: 0.6, height: 1.8 }, x, y, z)) return true;
    }
    for (const e of entities.entities.values()) {
      if (e instanceof Mob && !e.dead && bodyIntersectsBlock(e, x, y, z)) return true;
    }
    return false;
  };

  function breakBlock(c: Client, x: number, y: number, z: number, tool: number | null): void {
    if (y < 1 || y >= WORLD_HEIGHT || !reachable(c, x, y, z)) return correct(c, x, y, z);
    const state = world.getState(x, y, z);
    const type = typeOf(state);
    const def = BLOCKS[type];
    if (type === Block.AIR || SHAPE[type] === S_FLUID) return;
    if (def.hardness < 0 && c.mode !== 'creative') return correct(c, x, y, z);
    world.setState(x, y, z, Block.AIR);
    // Двухблочные: дверь и кровать.
    if (type === Block.OAK_DOOR) {
      const oy = metaOf(state) & 8 ? y - 1 : y + 1;
      if (typeOf(world.getState(x, oy, z)) === Block.OAK_DOOR) world.setState(x, oy, z, Block.AIR);
    } else if (type === Block.BED) {
      const meta = metaOf(state);
      const [dx, , dz] = DIR_VEC[meta & 4 ? (meta + 2) & 3 : meta & 3];
      if (typeOf(world.getState(x + dx, y, z + dz)) === Block.BED) world.setState(x + dx, y, z + dz, Block.AIR);
    }
    if (c.mode === 'survival') {
      const toolId = tool !== null && isValidItem(tool) ? tool : null;
      // Дверь и кровать дают предмет, какую бы половину ни сломали.
      const dropState = type === Block.OAK_DOOR || type === Block.BED ? makeState(type, 0) : state;
      entities.dropItems(x + 0.5, y + 0.3, z + 0.5, blockDrops(dropState, toolId));
    }
  }

  /** Каким предметом поставлен блок — чтобы вернуть его, если поставить не вышло. */
  function placedItem(state: number, claimed: unknown): number | null {
    const type = typeOf(state);
    if (isValidItem(claimed)) {
      const places = itemDef(claimed)?.places;
      if (places !== undefined && (typeOf(places) === type || SLAB_DOUBLE[typeOf(places)] === type)) return claimed;
    }
    const item = BLOCKS[type]?.item;
    return item !== null && item !== undefined && isValidItem(item) ? item : null;
  }

  function placeBlock(c: Client, x: number, y: number, z: number, state: number, claimed?: unknown): void {
    // Клиент уже поставил блок у себя и (в выживании) потратил предмет: при отказе
    // откатываем блок (и вторую половину двери/кровати) и возвращаем предмет.
    const reject = () => {
      correct(c, x, y, z);
      if (!isValidState(state)) return;
      const type = typeOf(state);
      if (type === Block.OAK_DOOR) correct(c, x, y + 1, z);
      if (type === Block.BED) {
        const [dx, , dz] = DIR_VEC[metaOf(state) & 3];
        correct(c, x + dx, y, z + dz);
      }
      const item = c.mode === 'survival' && c.alive ? placedItem(state, claimed) : null;
      if (item !== null) send(c, { t: 'give', item: stack(item, 1) });
    };
    if (!isValidState(state) || y < 1 || y >= WORLD_HEIGHT || !reachable(c, x, y, z)) return reject();
    const type = typeOf(state);
    if (type === Block.AIR) return;
    const cur = world.getState(x, y, z);
    const ct = typeOf(cur);
    const doubleSlab = SLAB_DOUBLE[ct] === type;
    if (!REPLACEABLE[ct] && !doubleSlab) return reject();
    if (SOLID[type] && !doubleSlab && entityBlocks(x, y, z, c)) return reject();
    if (type !== Block.OAK_DOOR && type !== Block.BED && !world.isSupported(x, y, z, state)) return reject();

    if (type === Block.OAK_DOOR) {
      const up = world.getState(x, y + 1, z);
      if (!REPLACEABLE[typeOf(up)] || !BLOCKS[typeOf(world.getState(x, y - 1, z))].fullCube) return reject();
      world.setState(x, y, z, makeState(Block.OAK_DOOR, metaOf(state) & 3), false);
      world.setState(x, y + 1, z, makeState(Block.OAK_DOOR, (metaOf(state) & 3) | 8), false);
      world.notifyAround(x, y, z);
      return;
    }
    if (type === Block.BED) {
      const dir = metaOf(state) & 3;
      const [dx, , dz] = DIR_VEC[dir];
      const head = world.getState(x + dx, y, z + dz);
      if (!REPLACEABLE[typeOf(head)]) return reject();
      world.setState(x, y, z, makeState(Block.BED, dir), false);
      world.setState(x + dx, y, z + dz, makeState(Block.BED, dir | 4), false);
      return;
    }
    if (ct !== Block.AIR && SHAPE[ct] !== S_FLUID && !doubleSlab) entities.dropItems(x + 0.5, y + 0.5, z + 0.5, blockDrops(cur, null));
    world.setState(x, y, z, state);
    containers.placed(x, y, z, type);
  }

  function interact(c: Client, x: number, y: number, z: number): void {
    if (!reachable(c, x, y, z)) return;
    const state = world.getState(x, y, z);
    const type = typeOf(state);
    const meta = metaOf(state);
    if (type === Block.OAK_DOOR) {
      const lowerY = meta & 8 ? y - 1 : y;
      const lower = world.getState(x, lowerY, z);
      const upper = world.getState(x, lowerY + 1, z);
      if (typeOf(lower) !== Block.OAK_DOOR) return;
      const open = !(metaOf(lower) & 4);
      const flip = (s: number) => makeState(Block.OAK_DOOR, (metaOf(s) & ~4) | (open ? 4 : 0));
      world.setState(x, lowerY, z, flip(lower), false);
      if (typeOf(upper) === Block.OAK_DOOR) world.setState(x, lowerY + 1, z, flip(upper), false);
      broadcast({ t: 'sound', name: open ? 'door_open' : 'door_close', p: [x + 0.5, y + 0.5, z + 0.5] });
    } else if (type === Block.OAK_TRAPDOOR || type === Block.OAK_FENCE_GATE) {
      const open = !(meta & 4);
      world.setState(x, y, z, makeState(type, open ? meta | 4 : meta & ~4));
      broadcast({ t: 'sound', name: open ? 'door_open' : 'door_close', p: [x + 0.5, y + 0.5, z + 0.5] });
    } else if (type === Block.CHEST || type === Block.FURNACE || type === Block.LIT_FURNACE) {
      if (containers.open(c.id, x, y, z) && type === Block.CHEST) broadcast({ t: 'sound', name: 'chest_open', p: [x + 0.5, y + 0.5, z + 0.5] });
    } else if (type === Block.BED) {
      const night = store.time > 12541 && store.time < 23458;
      if (!night && store.rain === 0) return system('Спать можно только ночью или в дождь', c);
      const headX = meta & 4 ? x : x + DIR_VEC[meta & 3][0];
      const headZ = meta & 4 ? z : z + DIR_VEC[meta & 3][2];
      c.spawn = [headX + 0.5, y + 1, headZ + 0.5];
      send(c, { t: 'spawnPoint', p: c.spawn });
      c.sleeping = true;
      c.sleepPos = [...c.p];
      send(c, { t: 'sleep', sleeping: true });
      system(`${c.name} ложится спать`);
    }
  }

  function use(c: Client, msg: Extract<ClientMessage, { t: 'use' }>): void {
    const { x, y, z } = msg;
    if (!reachable(c, x, y, z)) return correct(c, x, y, z);
    const state = world.getState(x, y, z);
    const type = typeOf(state);
    switch (msg.action) {
      case 'till':
        if ((type === Block.GRASS || type === Block.DIRT) && typeOf(world.getState(x, y + 1, z)) === Block.AIR) {
          world.setState(x, y, z, Block.FARMLAND);
          broadcast({ t: 'sound', name: 'step_gravel', p: [x + 0.5, y + 1, z + 0.5] });
        } else correct(c, x, y, z);
        break;
      case 'bonemeal':
        world.bonemeal(x, y, z);
        break;
      case 'ignite':
        if (type === Block.TNT) {
          world.setState(x, y, z, Block.AIR);
          entities.add(new TntEntity([x + 0.5, y, z + 0.5], 4));
          broadcast({ t: 'sound', name: 'fuse', p: [x + 0.5, y + 0.5, z + 0.5] });
        }
        break;
      case 'fill':
        if ((type === Block.WATER || type === Block.LAVA) && fluidLevel(state) === 0 && !fluidFalling(state)) {
          world.setState(x, y, z, Block.AIR);
          broadcast({ t: 'sound', name: 'bucket_fill', p: [x + 0.5, y + 0.5, z + 0.5] });
        } else correct(c, x, y, z);
        break;
      case 'empty': {
        const fluid = msg.fluid === 'lava' ? Block.LAVA : Block.WATER;
        if (REPLACEABLE[type] || typeOf(state) === fluid) {
          if (type !== Block.AIR && SHAPE[type] !== S_FLUID) entities.dropItems(x + 0.5, y + 0.5, z + 0.5, blockDrops(state, null));
          world.setState(x, y, z, makeState(fluid, 0));
          broadcast({ t: 'sound', name: 'bucket_empty', p: [x + 0.5, y + 0.5, z + 0.5] });
        } else correct(c, x, y, z);
        break;
      }
    }
  }

  function handle(c: Client, msg: ClientMessage): void {
    switch (msg.t) {
      case 'move': {
        const { p, r } = msg;
        if (!isVec3(p) || !Array.isArray(r) || r.length !== 2 || !r.every(isNum)) return;
        if (Math.abs(p[0]) > 3e7 || Math.abs(p[2]) > 3e7 || p[1] < -64 || p[1] > 512) return;
        // Ушёл от кровати — значит, проснулся.
        if (c.sleeping && Math.hypot(p[0] - c.sleepPos[0], p[2] - c.sleepPos[2]) > 1.5) wake(c);
        c.p = [p[0], p[1], p[2]];
        c.r = [r[0], r[1]];
        c.sneak = !!msg.sneak;
        c.fly = !!msg.fly;
        c.moved = true;
        break;
      }
      case 'swing':
        broadcast({ t: 'swing', id: c.id }, c);
        break;
      case 'break':
        if (isInt(msg.x) && isInt(msg.y) && isInt(msg.z)) breakBlock(c, msg.x, msg.y, msg.z, msg.tool);
        break;
      case 'place':
        if (isInt(msg.x) && isInt(msg.y) && isInt(msg.z)) placeBlock(c, msg.x, msg.y, msg.z, msg.state, msg.item);
        break;
      case 'wake':
        wake(c);
        break;
      case 'interact':
        if (isInt(msg.x) && isInt(msg.y) && isInt(msg.z)) interact(c, msg.x, msg.y, msg.z);
        break;
      case 'use':
        if (isInt(msg.x) && isInt(msg.y) && isInt(msg.z)) use(c, msg);
        break;
      case 'attack': {
        const e = entities.entities.get(msg.id);
        if (!(e instanceof Mob) || e.dead || !c.alive) return;
        if ((e.x - c.p[0]) ** 2 + (e.y - c.p[1]) ** 2 + (e.z - c.p[2]) ** 2 > 7 * 7) return;
        const base = msg.item !== null && isValidItem(msg.item) ? (itemDef(msg.item)?.damage ?? 1) : 1;
        e.hurt(entities, base * (msg.crit ? 1.5 : 1), c.p[0], c.p[2], 1);
        break;
      }
      case 'interactEntity': {
        const e = entities.entities.get(msg.id);
        if (!(e instanceof Mob) || e.dead) return;
        if (msg.item === Item.SHEARS && e.type === 'sheep' && !e.sheared) {
          e.sheared = true;
          entities.dropItems(e.x, e.y + 1, e.z, [stack(Block.WHITE_WOOL, 1 + Math.floor(Math.random() * 3))]);
          broadcast({ t: 'sound', name: 'shear', p: [e.x, e.y + 0.5, e.z] });
        }
        break;
      }
      case 'drop': {
        if (c.dropBudget < 1) return;
        c.dropBudget--;
        const item = sanitizeStack(msg.item);
        if (!item || !isVec3(msg.p) || !isVec3(msg.v)) return;
        if (Math.hypot(msg.p[0] - c.p[0], msg.p[1] - c.p[1], msg.p[2] - c.p[2]) > 4) return;
        entities.dropThrown(msg.p, msg.v.map((v) => Math.max(-20, Math.min(20, v))) as Vec3, item, 2);
        if (msg.returned) c.pickupCooldown = 3;
        break;
      }
      case 'shoot': {
        if (c.shootBudget < 1) return;
        c.shootBudget--;
        if (!isVec3(msg.p) || !isVec3(msg.v) || Math.hypot(...msg.v) > 80) return;
        if (Math.hypot(msg.p[0] - c.p[0], msg.p[1] - c.p[1], msg.p[2] - c.p[2]) > 4) return;
        entities.shootPlayerArrow(c.id, msg.p, msg.v);
        break;
      }
      case 'containerSlot':
        containers.setSlot(c.id, String(msg.cid), msg.slot, msg.item);
        break;
      case 'containerClose':
        containers.close(c.id);
        break;
      case 'inventory': {
        c.inventory = sanitizeSlots(msg.slots, INVENTORY_SIZE);
        c.armor = sanitizeSlots(msg.armor, ARMOR_SLOTS);
        c.selected = isInt(msg.selected) ? Math.max(0, Math.min(8, msg.selected)) : 0;
        const held = isValidItem(msg.held) ? msg.held : 0;
        const armorIds = c.armor.map((s) => s?.id ?? 0);
        if (held !== c.held || armorIds.some((a, i) => a !== c.armorIds[i])) {
          c.held = held;
          c.armorIds = armorIds;
          broadcast({ t: 'playerInfo', id: c.id, held, armor: armorIds, mode: c.mode }, c);
        }
        store.markDirty();
        break;
      }
      case 'stats':
        if (isNum(msg.hp)) c.hp = Math.max(0, Math.min(20, msg.hp));
        if (isNum(msg.food)) c.food = Math.max(0, Math.min(20, msg.food));
        if (isNum(msg.saturation)) c.saturation = Math.max(0, Math.min(20, msg.saturation));
        break;
      case 'died': {
        if (!c.alive) return;
        c.alive = false;
        wake(c);
        const items = Array.isArray(msg.items) ? msg.items.slice(0, 41).map(sanitizeStack).filter((s): s is ItemStack => !!s) : [];
        for (const it of items) {
          const v: Vec3 = [(Math.random() - 0.5) * 4, 3 + Math.random() * 2, (Math.random() - 0.5) * 4];
          entities.dropThrown([c.p[0], c.p[1] + 1, c.p[2]], v, it, 1);
        }
        c.inventory = emptySlots(INVENTORY_SIZE);
        c.armor = emptySlots(ARMOR_SLOTS);
        const cause = String(msg.cause ?? '').slice(0, 60);
        system(`☠ ${c.name} ${cause || 'погибает'}`);
        break;
      }
      case 'respawn':
        c.alive = true;
        c.hp = 20;
        c.food = 20;
        c.saturation = 5;
        c.p = [...(c.spawn ?? worldSpawn())];
        send(c, { t: 'tp', p: c.p });
        break;
      case 'chat': {
        const text = String(msg.text ?? '').trim().slice(0, MAX_CHAT_LENGTH);
        if (!text) return;
        const now = Date.now();
        if (now - c.lastChat < 300) return;
        c.lastChat = now;
        if (text.startsWith('/')) command(c, text);
        else broadcast({ t: 'chat', from: c.name, color: c.color, text });
        break;
      }
    }
  }

  function wake(c: Client): void {
    if (!c.sleeping) return;
    c.sleeping = false;
    send(c, { t: 'sleep', sleeping: false });
  }

  function setMode(c: Client, mode: GameMode): void {
    c.mode = mode;
    send(c, { t: 'mode', mode });
    broadcast({ t: 'playerInfo', id: c.id, held: c.held, armor: c.armorIds, mode }, c);
  }

  function command(c: Client, text: string): void {
    const [cmd, ...args] = text.slice(1).split(/\s+/);
    const arg = (args[0] ?? '').toLowerCase();
    switch (cmd.toLowerCase()) {
      case 'help':
        system(
          'Команды: /list, /tp <имя>, /spawn, /time day|night, /weather clear|rain, /gamemode survival|creative, /give <предмет> [кол-во], /summon <моб> [кол-во], /kill, /seed',
          c,
        );
        break;
      case 'list':
        system(`Онлайн (${clients.size}): ${[...clients.values()].map((o) => o.name).join(', ')}`, c);
        break;
      case 'tp': {
        const target = [...clients.values()].find((o) => o.name.toLowerCase() === args.join(' ').toLowerCase());
        if (!target) return system('Игрок не найден', c);
        if (target === c) return system('Это же вы :)', c);
        send(c, { t: 'tp', p: target.p });
        system(`Телепорт: ${target.name}`, c);
        break;
      }
      case 'spawn':
        send(c, { t: 'tp', p: c.spawn ?? worldSpawn() });
        break;
      case 'time': {
        const presets: Record<string, number> = { day: 1000, noon: 6000, sunset: 12000, night: 13000, midnight: 18000 };
        const num = Number(arg);
        const value = presets[arg] ?? (arg !== '' && Number.isFinite(num) ? ((Math.floor(num) % DAY_LENGTH) + DAY_LENGTH) % DAY_LENGTH : undefined);
        if (value === undefined) return system('Использование: /time day|noon|sunset|night|midnight|<0-23999>', c);
        store.time = value;
        broadcast({ t: 'time', time: store.time });
        system(`${c.name} меняет время суток`);
        break;
      }
      case 'weather':
        if (arg !== 'clear' && arg !== 'rain') return system('Использование: /weather clear|rain', c);
        store.rain = arg === 'rain' ? 1 : 0;
        rainTimer = arg === 'rain' ? 300 : 900;
        broadcast({ t: 'weather', rain: store.rain });
        break;
      case 'gamemode':
      case 'gm': {
        const mode: GameMode | null = ['creative', 'c', '1', 'творческий'].includes(arg)
          ? 'creative'
          : ['survival', 's', '0', 'выживание'].includes(arg)
            ? 'survival'
            : null;
        if (!mode) return system('Использование: /gamemode survival|creative', c);
        setMode(c, mode);
        system(`Режим игры: ${mode === 'creative' ? 'творческий' : 'выживание'}`, c);
        break;
      }
      case 'give': {
        const last = args[args.length - 1] ?? '';
        const hasCount = args.length > 1 && /^\d+$/.test(last);
        const q = (hasCount ? args.slice(0, -1) : args).join(' ').toLowerCase();
        const wanted = hasCount ? Number(last) : 1;
        const def =
          ALL_ITEMS.find((d) => d.key === q || d.name.toLowerCase() === q) ??
          ALL_ITEMS.find((d) => d.name.toLowerCase().includes(q) || d.key.includes(q));
        if (!q || !def) return system('Предмет не найден. Пример: /give diamond 5', c);
        // Не больше, чем влезет в инвентарь: лишнее клиенту пришлось бы выбрасывать.
        const count = Math.max(1, Math.min(wanted, def.maxStack * INVENTORY_SIZE));
        let left = count;
        while (left > 0) {
          const n = Math.min(left, def.maxStack);
          send(c, { t: 'give', item: stack(def.id, n) });
          left -= n;
        }
        system(`Выдано: ${def.name} ×${count}`, c);
        break;
      }
      case 'kill':
        send(c, { t: 'hurt', amount: 1000, cause: 'kill', kx: 0, kz: 0 });
        break;
      case 'summon': {
        const type = (Object.keys(MOB_NAMES) as MobType[]).find((m) => m === arg || MOB_NAMES[m] === arg);
        if (!type) return system(`Использование: /summon ${Object.keys(MOB_NAMES).join('|')}`, c);
        const count = Math.max(1, Math.min(10, Number(args[1]) || 1));
        // Перед игроком, на 3 блока вперёд.
        const fx = c.p[0] - Math.sin(c.r[0]) * 3;
        const fz = c.p[2] - Math.cos(c.r[0]) * 3;
        for (let i = 0; i < count; i++) entities.spawnMob(type, fx + (Math.random() - 0.5) * count * 0.4, c.p[1] + 0.2, fz + (Math.random() - 0.5) * count * 0.4);
        system(`${c.name} призывает: ${MOB_NAMES[type]}${count > 1 ? ` ×${count}` : ''}`);
        break;
      }
      case 'seed':
        system(`Сид мира: ${store.seed}`, c);
        break;
      default:
        system('Неизвестная команда. Напишите /help', c);
    }
  }

  // ---------- Игровой цикл ----------

  let lastTick = Date.now();
  let timeSync = 0;
  let rainTimer = 600 + Math.random() * 600;
  let sleepTimer = 0;
  let tickNo = 0;

  const tick = setInterval(() => {
    const now = Date.now();
    const dt = Math.min(0.25, (now - lastTick) / 1000);
    lastTick = now;
    tickNo++;
    store.time = (store.time + dt * TICKS_PER_SECOND) % DAY_LENGTH;
    const players = [...clients.values()];
    const positions = players.map((p) => ({ x: p.p[0], z: p.p[2] }));

    // Погода.
    rainTimer -= dt;
    if (rainTimer <= 0) {
      store.rain = store.rain ? 0 : 1;
      rainTimer = store.rain ? 180 + Math.random() * 300 : 600 + Math.random() * 900;
      broadcast({ t: 'weather', rain: store.rain });
    }

    // Подгружаем чанки вокруг игроков и заселяем новые животными.
    let budget = 3;
    for (const p of players) {
      const pcx = Math.floor(p.p[0]) >> 4;
      const pcz = Math.floor(p.p[2]) >> 4;
      for (let r = 0; r <= 3 && budget > 0; r++)
        for (let dz = -r; dz <= r && budget > 0; dz++)
          for (let dx = -r; dx <= r && budget > 0; dx++) {
            if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
            const cx = pcx + dx;
            const cz = pcz + dz;
            if (!world.isLoaded(cx, cz)) {
              world.chunk(cx, cz);
              budget--;
            }
            const key = chunkKey(cx, cz);
            if (!store.populated.has(key)) {
              store.populated.add(key);
              store.markDirty();
              entities.populate(cx, cz);
            }
          }
    }

    world.tick(positions);
    entities.tick(dt);
    containers.tick();
    for (const c of players) {
      c.budget = Math.min(400, c.budget + 20);
      c.shootBudget = Math.min(6, c.shootBudget + 4 * dt);
      c.dropBudget = Math.min(60, c.dropBudget + 30 * dt);
      c.pickupCooldown = Math.max(0, c.pickupCooldown - dt);
    }

    // Все игроки в режиме выживания спят — наступает утро.
    const sleepers = players.filter((p) => p.alive && p.mode === 'survival');
    if (sleepers.length && sleepers.every((p) => p.sleeping)) {
      sleepTimer += dt;
      if (sleepTimer > 2.5) {
        sleepTimer = 0;
        store.time = 0;
        store.rain = 0;
        broadcast({ t: 'time', time: store.time });
        broadcast({ t: 'weather', rain: 0 });
        for (const p of players) {
          if (!p.sleeping) continue;
          p.sleeping = false;
          send(p, { t: 'sleep', sleeping: false });
        }
        system('Доброе утро!');
      }
    } else sleepTimer = 0;

    // Рассылка изменений.
    if (world.changes.length) {
      const d = world.changes.splice(0);
      for (let i = 0; i < d.length; i += 4000) broadcast({ t: 'blocks', d: d.slice(i, i + 4000) });
    }
    if (tickNo % 2 === 0) entities.flush();
    const moves: number[] = [];
    for (const c of players) {
      if (!c.moved) continue;
      c.moved = false;
      moves.push(c.id, round(c.p[0]), round(c.p[1]), round(c.p[2]), round(c.r[0]), round(c.r[1]), (c.sneak ? 1 : 0) | (c.sleeping ? 2 : 0));
    }
    if (moves.length) broadcast({ t: 'moves', d: moves });
    if ((timeSync += dt) > 10) {
      timeSync = 0;
      broadcast({ t: 'time', time: store.time });
    }
    if (tickNo % 200 === 0) world.unloadFar(positions, 6);
  }, 1000 / TICKS_PER_SECOND);

  const heartbeat = setInterval(() => {
    for (const c of clients.values()) {
      if (c.heartbeat) c.missed = 0;
      else if (++c.missed >= 3) {
        console.log(`[game] ${c.name} не отвечает — отключаем`);
        c.socket.terminate();
        continue;
      }
      c.heartbeat = false;
      c.socket.ping();
    }
  }, 15_000);

  const autosave = setInterval(saveAll, 30_000);

  const close = () => {
    clearInterval(tick);
    clearInterval(heartbeat);
    clearInterval(autosave);
    for (const c of clients.values()) leave(c, false);
    saveAll();
  };

  return {
    store,
    world,
    /** Новый игрок подключился (до сообщения hello он ещё не в игре). */
    connect: onConnection,
    saveAll,
    close,
    get online() {
      return clients.size;
    },
  };
}
