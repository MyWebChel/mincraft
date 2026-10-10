import type { Link } from '../net';
import type { FromWorker, ToWorker } from './protocol';

interface Endpoint {
  deliver(data: string): void;
  end(): void;
}

/**
 * Мир, который «хостит» сам игрок: сервер игры работает в веб-воркере,
 * свой игрок подключается к нему напрямую, друзья — через WebRTC.
 */
export class LocalHost {
  private readonly endpoints = new Map<number, Endpoint>();
  private nextId = 1;
  private saveWaiters: (() => void)[] = [];
  /** Сколько друзей сейчас подключено (без самого хозяина). */
  guests = 0;
  onGuestsChange: (count: number) => void = () => {};

  private constructor(
    private readonly worker: Worker,
    readonly seed: number,
  ) {
    worker.onmessage = (e: MessageEvent<FromWorker>) => {
      const msg = e.data;
      if (msg.t === 'msg') this.endpoints.get(msg.id)?.deliver(msg.data);
      else if (msg.t === 'close') {
        const ep = this.endpoints.get(msg.id);
        this.endpoints.delete(msg.id);
        ep?.end();
      } else if (msg.t === 'saved') this.saveWaiters.splice(0).forEach((f) => f());
    };
    // Сворачивание вкладки и закрытие страницы — повод сохраниться.
    const save = () => void this.save();
    window.addEventListener('pagehide', save);
    document.addEventListener('visibilitychange', () => document.hidden && save());
  }

  /** Запускает мир из сохранения (или новый, если fresh). */
  static start(fresh = false): Promise<LocalHost> {
    const worker = new Worker(new URL('./server.worker.ts', import.meta.url), { type: 'module' });
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Мир не запустился')), 30_000);
      worker.onmessage = (e: MessageEvent<FromWorker>) => {
        if (e.data.t === 'ready') {
          clearTimeout(timer);
          resolve(new LocalHost(worker, e.data.seed));
        } else if (e.data.t === 'error') {
          clearTimeout(timer);
          reject(new Error(`Не удалось открыть мир: ${e.data.message}`));
        }
      };
      worker.onerror = (e) => {
        clearTimeout(timer);
        reject(new Error(`Не удалось запустить мир: ${e.message}`));
      };
      worker.postMessage({ t: 'start', fresh } satisfies ToWorker);
    });
  }

  private post(msg: ToWorker): void {
    this.worker.postMessage(msg);
  }

  /** Соединение для своего игрока — без сети, прямо к воркеру. */
  connectLocal(): Link {
    const id = this.nextId++;
    let open = true;
    const link: Link = {
      get isOpen() {
        return open;
      },
      send: (text) => open && this.post({ t: 'msg', id, data: text }),
      close: () => {
        if (!open) return;
        open = false;
        this.endpoints.delete(id);
        this.post({ t: 'close', id });
        link.onclose();
      },
      onopen: () => {},
      onmessage: () => {},
      onclose: () => {},
    };
    this.endpoints.set(id, {
      deliver: (data) => link.onmessage(data),
      end: () => {
        if (!open) return;
        open = false;
        link.onclose();
      },
    });
    this.post({ t: 'open', id });
    return link;
  }

  /** Подключить друга: его канал (WebRTC) пересылается в воркер и обратно. */
  attach(remote: Link): void {
    const id = this.nextId++;
    let open = true;
    this.guests++;
    this.onGuestsChange(this.guests);
    const finish = () => {
      if (!open) return;
      open = false;
      this.guests--;
      this.onGuestsChange(this.guests);
    };
    this.endpoints.set(id, {
      deliver: (data) => remote.send(data),
      end: () => {
        finish();
        // Даём последнему сообщению (например, «вас выгнали») уйти до закрытия.
        setTimeout(() => remote.close(), 200);
      },
    });
    remote.onmessage = (text) => open && this.post({ t: 'msg', id, data: text });
    remote.onclose = () => {
      if (!open) return;
      finish();
      this.endpoints.delete(id);
      this.post({ t: 'close', id });
    };
    this.post({ t: 'open', id });
  }

  /** Сохранить мир (ждёт, пока запись в IndexedDB закончится). */
  save(): Promise<void> {
    return new Promise((resolve) => {
      this.saveWaiters.push(resolve);
      this.post({ t: 'save' });
    });
  }
}
