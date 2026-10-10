import type { DataConnection, Peer, PeerOptions } from 'peerjs';
import type { Link } from '../net';
import type { LocalHost } from './localHost';

/**
 * Игра с друзьями без своего сервера: хозяин мира регистрируется на открытом
 * сервере PeerJS (он только знакомит браузеры), а игровые данные идут напрямую
 * между устройствами по WebRTC.
 */

const HOST_ID_KEY = 'mincraft:host-id';
/** WebRTC-сообщения лучше держать небольшими: длинные режем на части. */
const CHUNK = 16_000;

/** Настройки сервера знакомств. ?peer=host:port в адресе — свой сервер PeerJS (для тестов). */
function peerOptions(): PeerOptions {
  const custom = new URLSearchParams(location.search).get('peer');
  if (custom) {
    const [host, port] = custom.split(':');
    return { host, port: Number(port) || 9000, path: '/', secure: false, debug: 0 };
  }
  return { debug: 0 };
}

/** Строка ?peer=... (если есть), чтобы ссылка-приглашение вела на тот же сервер знакомств. */
export function peerParam(): string {
  const custom = new URLSearchParams(location.search).get('peer');
  return custom ? `&peer=${encodeURIComponent(custom)}` : '';
}

async function loadPeer(): Promise<typeof Peer> {
  const mod = await import('peerjs');
  return mod.Peer;
}

/** Сообщение → кадры: «=текст» целиком или «+id,номер,всего,кусок». */
function makeFramer(): (text: string, send: (frame: string) => void) => void {
  let nextId = 1;
  return (text, send) => {
    if (text.length <= CHUNK) return send(`=${text}`);
    const id = nextId++;
    const count = Math.ceil(text.length / CHUNK);
    for (let i = 0; i < count; i++) send(`+${id},${i},${count},${text.slice(i * CHUNK, (i + 1) * CHUNK)}`);
  };
}

function makeUnframer(): (frame: string) => string | null {
  const parts = new Map<number, string[]>();
  return (frame) => {
    if (frame[0] === '=') return frame.slice(1);
    if (frame[0] !== '+') return null;
    let pos = 1;
    const next = () => {
      const comma = frame.indexOf(',', pos);
      const value = Number(frame.slice(pos, comma));
      pos = comma + 1;
      return value;
    };
    const id = next();
    const index = next();
    const count = next();
    if (!Number.isInteger(id) || !Number.isInteger(count) || count > 10_000 || index >= count) return null;
    let list = parts.get(id);
    if (!list) parts.set(id, (list = []));
    list[index] = frame.slice(pos);
    if (list.filter((p) => p !== undefined).length < count) return null;
    parts.delete(id);
    return list.join('');
  };
}

/** Пульс канала: «~» каждые 3 с; если от собеседника 30 с тишина — связь потеряна. */
const KEEPALIVE_MS = 3000;
const SILENCE_MS = 30_000;

/** DataConnection PeerJS как канал игры. */
function peerLink(conn: DataConnection): Link {
  const frame = makeFramer();
  const unframe = makeUnframer();
  let closed = false;
  let lastHeard = Date.now();
  let pulse = 0;
  const link: Link = {
    get isOpen() {
      return conn.open && !closed;
    },
    send: (text) => {
      if (!conn.open || closed) return;
      frame(text, (f) => void conn.send(f));
    },
    close: () => {
      if (closed) return;
      end();
      conn.close();
    },
    onopen: () => {},
    onmessage: () => {},
    onclose: () => {},
  };
  // Закрытая вкладка у собеседника не всегда сразу закрывает WebRTC-канал — следим за пульсом сами.
  const startPulse = () => {
    lastHeard = Date.now();
    let lastTick = Date.now();
    pulse = window.setInterval(() => {
      if (closed) return;
      const now = Date.now();
      // Долго не тикали — значит, «спала» наша вкладка (загрузка, фон), а не пропал собеседник.
      if (now - lastTick > KEEPALIVE_MS * 3) lastHeard = now;
      lastTick = now;
      if (now - lastHeard > SILENCE_MS) return link.close();
      if (conn.open) void conn.send('~');
    }, KEEPALIVE_MS);
  };
  if (conn.open) startPulse();
  conn.on('open', () => {
    if (!pulse) startPulse();
    link.onopen();
  });
  conn.on('data', (data) => {
    lastHeard = Date.now();
    if (typeof data !== 'string' || data === '~') return;
    const text = unframe(data);
    if (text !== null) link.onmessage(text);
  });
  function end(): void {
    if (closed) return;
    closed = true;
    clearInterval(pulse);
    link.onclose();
  }
  conn.on('close', end);
  conn.on('error', end);
  return link;
}

export type HostStatus = { state: 'connecting' } | { state: 'ready'; id: string } | { state: 'error'; message: string };

/**
 * Открывает мир для друзей: регистрирует постоянный id (ссылка-приглашение не
 * меняется между запусками) и подключает входящих игроков к локальному серверу.
 */
export async function startHosting(host: LocalHost, onStatus: (s: HostStatus) => void): Promise<void> {
  const PeerClass = await loadPeer();
  let id = '';
  try {
    id = localStorage.getItem(HOST_ID_KEY) ?? '';
  } catch {
    // без localStorage id будет новым при каждом запуске
  }
  const fresh = () => `mincraft-${Math.random().toString(36).slice(2, 8)}${Math.random().toString(36).slice(2, 8)}`;
  if (!/^mincraft-[a-z0-9]{6,}$/.test(id)) id = fresh();

  const open = (peerId: string, attempt: number) => {
    onStatus({ state: 'connecting' });
    const peer = new PeerClass(peerId, peerOptions());
    peer.on('open', (got) => {
      try {
        localStorage.setItem(HOST_ID_KEY, got);
      } catch {
        // не страшно
      }
      onStatus({ state: 'ready', id: got });
    });
    peer.on('connection', (conn) => {
      const link = peerLink(conn);
      if (conn.open) host.attach(link);
      else link.onopen = () => host.attach(link);
    });
    // Пропала связь с сервером знакомств — уже подключённые друзья продолжают играть.
    peer.on('disconnected', () => {
      if (!peer.destroyed) setTimeout(() => !peer.destroyed && peer.reconnect(), 3000);
    });
    peer.on('error', (err) => {
      const type = (err as { type?: string }).type;
      if (type === 'unavailable-id' && attempt < 3) {
        // Прошлый запуск ещё «держит» id (вкладку только что перезагрузили) — пробуем снова, потом берём новый.
        peer.destroy();
        setTimeout(() => open(attempt < 2 ? peerId : fresh(), attempt + 1), 4000);
        return;
      }
      if (type === 'network' || type === 'server-error' || type === 'socket-error' || type === 'socket-closed') {
        onStatus({ state: 'error', message: 'Сервер приглашений недоступен — играть можно, но друзья пока не смогут зайти' });
        return;
      }
      if (type === 'peer-unavailable') return; // кто-то не дозвонился до нас — не наша беда
      onStatus({ state: 'error', message: `Ошибка соединения: ${type ?? String(err)}` });
    });
    window.addEventListener('pagehide', () => peer.destroy(), { once: true });
  };
  open(id, 0);
}

/** Подключиться к миру друга по его id из ссылки-приглашения. */
export async function joinPeer(hostId: string): Promise<Link> {
  const PeerClass = await loadPeer();
  return new Promise((resolve, reject) => {
    const peer = new PeerClass(peerOptions());
    let done = false;
    const fail = (message: string) => {
      if (done) return;
      done = true;
      peer.destroy();
      reject(new Error(message));
    };
    const timer = setTimeout(
      () => fail('Не удалось связаться с другом: проверьте, что у него открыта игра. Если вы в разных сетях, попробуйте одну Wi-Fi'),
      25_000,
    );
    peer.on('open', () => {
      const conn = peer.connect(hostId, { reliable: true, serialization: 'raw' });
      const link = peerLink(conn);
      const prevOpen = link.onopen;
      link.onopen = () => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(link);
        prevOpen();
      };
      window.addEventListener('pagehide', () => peer.destroy(), { once: true });
    });
    peer.on('error', (err) => {
      const type = (err as { type?: string }).type;
      clearTimeout(timer);
      if (type === 'peer-unavailable') fail('Мир друга не найден — возможно, он закрыл игру. Попросите прислать ссылку заново');
      else if (type === 'network' || type === 'server-error' || type === 'socket-error') fail('Сервер приглашений недоступен. Проверьте интернет');
      else fail(`Не удалось подключиться: ${type ?? String(err)}`);
    });
  });
}
