/// <reference lib="webworker" />
/**
 * Сервер игры прямо в браузере: то же ядро, что и у Node-сервера, только
 * соединения приходят от страницы (свой игрок и друзья по WebRTC), а мир
 * сохраняется в IndexedDB.
 */
import { createGameCore, type GameCore, type GameSocket } from '../../../server/core';
import { WorldStore, type WorldBackend } from '../../../server/world-store';
import { WORLD_KEY, idbDelete, idbGet, idbSet } from './idb';
import type { FromWorker, ToWorker } from './protocol';

const scope = self as unknown as DedicatedWorkerGlobalScope;
const post = (msg: FromWorker) => scope.postMessage(msg);

let core: GameCore | null = null;
const sockets = new Map<number, GameSocket>();
/** Цепочка записей в IndexedDB, чтобы сохранения не обгоняли друг друга. */
let saving: Promise<unknown> = Promise.resolve();

function makeSocket(id: number): GameSocket {
  let closed = false;
  const socket: GameSocket = {
    get open() {
      return !closed;
    },
    send: (data) => {
      if (!closed) post({ t: 'msg', id, data });
    },
    close: (code, reason) => {
      if (closed) return;
      closed = true;
      sockets.delete(id);
      post({ t: 'close', id, code, reason });
      socket.onClose(code);
    },
    terminate: () => socket.close(1006, 'terminated'),
    // Живость друзей проверяет страница (WebRTC-канал закрывается сам), здесь отвечаем сразу.
    ping: () => queueMicrotask(() => socket.onPong()),
    onMessage: () => {},
    onClose: () => {},
    onPong: () => {},
  };
  return socket;
}

async function start(fresh: boolean): Promise<void> {
  if (fresh) await idbDelete(WORLD_KEY).catch(() => undefined);
  const saved = await idbGet(WORLD_KEY).catch((err) => {
    console.error('[world] не удалось прочитать сохранение', err);
    return null;
  });
  const backend: WorldBackend = {
    read: () => saved,
    write: (json) => {
      saving = saving.then(() => idbSet(WORLD_KEY, json)).catch((err) => console.error('[world] не удалось сохранить мир', err));
    },
    discard: (reason) => {
      console.error(`[world] сохранение не подходит (${reason}), откладываем его`);
      if (saved) saving = saving.then(() => idbSet(`${WORLD_KEY}.old-${Date.now()}`, saved)).catch(() => undefined);
    },
  };
  const store = new WorldStore(backend);
  core = createGameCore(store);
  // Сразу записываем новый мир, чтобы «Продолжить» работало даже после короткой игры.
  store.save();
  post({ t: 'ready', seed: store.seed });
}

scope.onmessage = (e: MessageEvent<ToWorker>) => {
  const msg = e.data;
  switch (msg.t) {
    case 'start':
      start(!!msg.fresh).catch((err) => post({ t: 'error', message: String(err?.message ?? err) }));
      break;
    case 'open': {
      if (!core) return;
      const socket = makeSocket(msg.id);
      sockets.set(msg.id, socket);
      core.connect(socket);
      break;
    }
    case 'msg':
      sockets.get(msg.id)?.onMessage(msg.data);
      break;
    case 'close': {
      const socket = sockets.get(msg.id);
      if (!socket) return;
      sockets.delete(msg.id);
      socket.onClose(1001);
      break;
    }
    case 'save':
      core?.saveAll();
      saving.then(() => post({ t: 'saved' }));
      break;
  }
};
