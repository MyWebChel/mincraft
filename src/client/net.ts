import type { ClientMessage, ServerMessage } from '../shared/protocol';

type WelcomeMessage = Extract<ServerMessage, { t: 'welcome' }>;

/**
 * Канал до сервера игры: WebSocket до Node-сервера, канал к веб-воркеру
 * своего мира или WebRTC-соединение с другом, который хостит мир.
 */
export interface Link {
  readonly isOpen: boolean;
  send(text: string): void;
  close(): void;
  onopen: () => void;
  onmessage: (text: string) => void;
  onclose: () => void;
}

/** WebSocket до игрового сервера (путь /ws рядом со страницей). */
export function webSocketLink(url = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`): Link {
  const ws = new WebSocket(url);
  const link: Link = {
    get isOpen() {
      return ws.readyState === WebSocket.OPEN;
    },
    send: (text) => ws.readyState === WebSocket.OPEN && ws.send(text),
    close: () => ws.close(),
    onopen: () => {},
    onmessage: () => {},
    onclose: () => {},
  };
  ws.addEventListener('open', () => link.onopen());
  ws.addEventListener('message', (e) => link.onmessage(String(e.data)));
  ws.addEventListener('close', () => link.onclose());
  return link;
}

/** Соединение с сервером игры поверх любого канала: JSON-сообщения протокола. */
export class Connection {
  /** kicked — сервер сам отключил игрока (а не оборвалась связь). */
  onClose: (reason: string, kicked: boolean) => void = () => {};
  private handler: ((msg: ServerMessage) => void) | null = null;
  /** Сообщения, пришедшие до того, как игра подписалась на них. */
  private pending: ServerMessage[] = [];
  private kickReason: string | null = null;
  private closed = false;

  private constructor(private readonly link: Link) {
    link.onmessage = (text) => {
      let msg: ServerMessage;
      try {
        msg = JSON.parse(text);
      } catch {
        return;
      }
      if (msg.t === 'kick') this.kickReason = msg.reason;
      if (this.handler) this.handler(msg);
      else this.pending.push(msg);
    };
    link.onclose = () => {
      if (this.closed) return;
      this.closed = true;
      this.onClose(this.kickReason ?? 'Соединение с сервером потеряно', this.kickReason !== null);
    };
  }

  get isOpen(): boolean {
    return !this.closed && this.link.isOpen;
  }

  setHandler(handler: (msg: ServerMessage) => void): void {
    this.handler = handler;
    const queued = this.pending;
    this.pending = [];
    for (const msg of queued) handler(msg);
  }

  /** Подключается и ждёт приветствия от сервера. */
  static connect(name: string, color: string, link: Link = webSocketLink(), timeoutMs = 15_000): Promise<{ conn: Connection; welcome: WelcomeMessage }> {
    return new Promise((resolve, reject) => {
      const conn = new Connection(link);
      const timer = setTimeout(() => {
        link.close();
        reject(new Error('Сервер не отвечает'));
      }, timeoutMs);
      conn.handler = (msg) => {
        if (msg.t !== 'welcome') return;
        clearTimeout(timer);
        conn.handler = null;
        conn.onClose = () => {};
        resolve({ conn, welcome: msg });
      };
      conn.onClose = (reason) => {
        clearTimeout(timer);
        reject(new Error(conn.kickReason ? reason : 'Не удалось подключиться к серверу'));
      };
      const hello = () => conn.send({ t: 'hello', name, color });
      if (link.isOpen) hello();
      else link.onopen = hello;
    });
  }

  send(msg: ClientMessage): void {
    if (this.isOpen) this.link.send(JSON.stringify(msg));
  }
}
