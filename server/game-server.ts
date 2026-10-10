import type { EventEmitter } from 'node:events';
import type { IncomingMessage } from 'node:http';
import path from 'node:path';
import type { Duplex } from 'node:stream';
import { WebSocket, WebSocketServer } from 'ws';
import { createGameCore, type GameSocket } from './core';
import { fileBackend } from './file-backend';
import { requestPath } from './paths';
import { WorldStore } from './world-store';

const activeSavers = new Set<() => void>();
let signalsHooked = false;

/** При остановке процесса (и при падении) сохраняем все миры. */
function hookSignals(): void {
  if (signalsHooked) return;
  signalsHooked = true;
  const saveEverything = () => {
    for (const save of activeSavers) {
      try {
        save();
      } catch (err) {
        console.error('[world] не удалось сохранить мир', err);
      }
    }
  };
  for (const sig of ['SIGINT', 'SIGTERM'] as const) {
    process.once(sig, () => {
      saveEverything();
      process.exit(0);
    });
  }
  // Непредвиденная ошибка: сначала сохраняем мир, потом выходим (хостинг перезапустит сервер).
  process.once('uncaughtException', (err) => {
    console.error('[game] критическая ошибка', err);
    saveEverything();
    process.exit(1);
  });
}

/** WebSocket как соединение для ядра игры. */
function wrapWebSocket(ws: WebSocket): GameSocket {
  const socket: GameSocket = {
    get open() {
      return ws.readyState === WebSocket.OPEN;
    },
    send: (data) => ws.send(data),
    close: (code, reason) => ws.close(code, reason),
    terminate: () => ws.terminate(),
    ping: () => ws.ping(),
    onMessage: () => {},
    onClose: () => {},
    onPong: () => {},
  };
  ws.on('message', (raw, isBinary) => {
    if (!isBinary) socket.onMessage(raw.toString());
  });
  ws.on('close', (code) => socket.onClose(code));
  ws.on('pong', () => socket.onPong());
  ws.on('error', () => {});
  return socket;
}

export interface GameServerOptions {
  /** Путь к файлу сохранения мира. По умолчанию data/world.json. */
  dataFile?: string;
}

/**
 * Подключает игровой WebSocket-сервер (путь /ws) к HTTP-серверу — своему
 * в продакшене или dev-серверу Vite при разработке.
 */
export function createGameServer(http: EventEmitter, options: GameServerOptions = {}) {
  const dataFile = options.dataFile ?? path.resolve(process.env.DATA_DIR ?? 'data', 'world.json');
  const envSeed = process.env.WORLD_SEED ? Number(process.env.WORLD_SEED) : undefined;
  const store = new WorldStore(fileBackend(dataFile), envSeed);
  const core = createGameCore(store);
  activeSavers.add(core.saveAll);
  hookSignals();

  const wss = new WebSocketServer({ noServer: true, maxPayload: 64 * 1024 });
  http.on('upgrade', (req: IncomingMessage, socket: Duplex, head: Buffer) => {
    if (requestPath(req.url) !== '/ws') return; // остальные апгрейды (например, HMR у Vite) не наши
    wss.handleUpgrade(req, socket, head, (ws) => core.connect(wrapWebSocket(ws)));
  });

  const close = () => {
    core.close();
    activeSavers.delete(core.saveAll);
    wss.close();
  };
  http.once('close', close);

  return { store, world: core.world, close };
}
