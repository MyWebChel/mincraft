import qrcode from 'qrcode-generator';
import { GAME_NAME, MAX_NAME_LENGTH } from '../shared/constants';
import { CREATIVE_ITEMS } from '../shared/items';
import { PLAYER_COLORS } from '../shared/protocol';
import { AUTOJOIN_KEY, Game } from './game';
import { LocalHost } from './host/localHost';
import { joinPeer, peerParam, startHosting } from './host/p2p';
import { Connection, type Link } from './net';
import { loadSettings, saveSettings } from './settings';
import { buildAtlas, tileURL, warmItemIcons } from './textures';
import { $, UI } from './ui';
import './style.css';

const atlas = buildAtlas();
const settings = loadSettings();
const ui = new UI(atlas);
// Пока игрок вводит ник, рисуем иконки предметов про запас.
warmItemIcons(atlas, CREATIVE_ITEMS);

// Фон меню — затемнённая земля, как в оригинале.
const dirt = `url(${tileURL(atlas, 'dirt', 0.55)})`;
document.querySelectorAll<HTMLElement>('.dirt').forEach((el) => (el.style.backgroundImage = dirt));
document.title = GAME_NAME;

const nameInput = $<HTMLInputElement>('name-input');
const status = $('menu-status');
const form = $<HTMLFormElement>('join-form');
const playButton = $<HTMLButtonElement>('play');
nameInput.value = settings.name;

/** Приглашение в мир друга: ?join=<id> в адресе. */
const inviteId = new URLSearchParams(location.search).get('join');

const picker = $('color-picker');
const renderColors = () =>
  picker.replaceChildren(
    ...PLAYER_COLORS.map((color) => {
      const swatch = document.createElement('button');
      swatch.type = 'button';
      swatch.className = 'swatch' + (color === settings.color ? ' selected' : '');
      swatch.style.background = color;
      swatch.ariaLabel = color;
      swatch.onclick = () => {
        settings.color = color;
        renderColors();
      };
      return swatch;
    }),
  );
renderColors();

function webglAvailable(): boolean {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

/** QR-код адреса — чтобы зайти с телефона, просто наведя камеру на экран. */
function qrCanvas(text: string): HTMLCanvasElement {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  const margin = 2;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = n + margin * 2;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) ctx.fillRect(c + margin, r + margin, 1, 1);
  return canvas;
}

/** Ссылка, клик по которой копирует адрес (удобно отправить в мессенджер). */
function copyLink(url: string, label = url.replace(/^https?:\/\//, '')): HTMLAnchorElement {
  const a = document.createElement('a');
  a.href = url;
  a.textContent = label;
  a.target = '_blank';
  a.className = 'copy';
  a.onclick = (e) => {
    if (!navigator.clipboard) return;
    e.preventDefault();
    void navigator.clipboard.writeText(url).then(() => {
      a.dataset.copied = '1';
      setTimeout(() => delete a.dataset.copied, 1500);
    });
  };
  return a;
}

/**
 * Есть ли рядом Node-сервер игры (npm run dev / npm start). На GitHub Pages
 * его нет — тогда мир работает прямо в браузере, а друзья подключаются по WebRTC.
 */
async function detectServer(): Promise<boolean> {
  try {
    const res = await fetch('api/lan', { cache: 'no-store' });
    return res.ok && (res.headers.get('content-type') ?? '').includes('json');
  } catch {
    return false;
  }
}

/** Режим с Node-сервером: панель «Играть вместе» с адресами в локальной сети. */
async function setupServerShare(): Promise<void> {
  const host = location.hostname;
  const local = host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
  let urls: string[] = [];
  if (local) {
    try {
      const res = await fetch('api/lan');
      const data = (await res.json()) as { addresses?: string[] };
      const port = location.port ? `:${location.port}` : '';
      urls = (data.addresses ?? []).map((ip) => `${location.protocol}//${ip}${port}`);
    } catch {
      // сервер без /api/lan — просто не показываем панель
    }
  } else {
    urls = [location.origin];
    const hint = document.querySelector('#share p');
    if (hint) hint.textContent = 'Отправьте друзьям эту ссылку или покажите QR-код:';
  }
  if (!urls.length) return;
  $('share-links').replaceChildren(...urls.slice(0, 3).map((url) => copyLink(url)));
  $('share-qr').replaceChildren(qrCanvas(urls[0]));
  $('share').hidden = false;
}

/** Режим без сервера: как играть вместе. */
function setupStaticShare(): void {
  const hint = document.querySelector('#share p');
  if (hint)
    hint.textContent = inviteId
      ? 'Вы откроете мир друга. Чтобы играть в своём мире, нажмите «Играть в своём мире».'
      : 'Мир хранится в этом браузере. Чтобы позвать друзей, в игре откройте паузу → «Пригласить друзей» и отправьте ссылку или покажите QR-код.';
  $('share').hidden = false;
}

/** Окно «Пригласить друзей» в меню паузы (только для своего мира в браузере). */
function setupInvite(host: LocalHost): void {
  const button = $<HTMLButtonElement>('invite-btn');
  const panel = $('invite');
  const statusEl = $('invite-status');
  button.hidden = false;
  button.onclick = () => (panel.hidden = !panel.hidden);
  let link = '';
  const render = () => {
    if (!link) return;
    statusEl.textContent = host.guests ? `Друзей в игре: ${host.guests}` : 'Ждём друзей — отправьте им ссылку:';
  };
  host.onGuestsChange = render;
  startHosting(host, (s) => {
    if (s.state === 'connecting') statusEl.textContent = 'Подключаемся к серверу приглашений…';
    else if (s.state === 'error') statusEl.textContent = s.message;
    else {
      link = `${location.origin}${location.pathname}?join=${encodeURIComponent(s.id)}${peerParam()}`;
      $('invite-link').replaceChildren(copyLink(link, 'Ссылка-приглашение (нажмите, чтобы скопировать)'));
      $('invite-qr').replaceChildren(qrCanvas(link));
      render();
    }
  }).catch((err) => {
    console.error(err);
    statusEl.textContent = 'Не удалось загрузить модуль приглашений';
  });
}

let serverMode = false;
let busy = false;

/** Проверка ника и WebGL, сохранение настроек. */
function prepare(): string | null {
  const name = nameInput.value.trim().replace(/\s+/g, ' ');
  if (!name || name.length > MAX_NAME_LENGTH || !/^[\p{L}\p{N}_\- ]+$/u.test(name)) {
    status.textContent = 'Ник: буквы, цифры, пробел, _ или -';
    return null;
  }
  if (!webglAvailable()) {
    status.textContent = 'Браузер не поддерживает WebGL 2 — игра не запустится';
    return null;
  }
  settings.name = name;
  saveSettings(settings);
  return name;
}

type Target = { kind: 'server' } | { kind: 'local'; fresh: boolean } | { kind: 'peer'; id: string };

const setButtons = (disabled: boolean) => document.querySelectorAll<HTMLButtonElement>('#join-form button').forEach((b) => (b.disabled = disabled));

async function play(target: Target): Promise<void> {
  if (busy) return;
  const name = prepare();
  if (!name) return;
  busy = true;
  setButtons(true);
  try {
    let link: Link | undefined;
    let host: LocalHost | null = null;
    if (target.kind === 'local') {
      status.textContent = target.fresh ? 'Создаём новый мир…' : 'Открываем мир…';
      host = await LocalHost.start(target.fresh);
      link = host.connectLocal();
    } else if (target.kind === 'peer') {
      status.textContent = 'Подключаемся к другу…';
      link = await joinPeer(target.id);
    } else status.textContent = 'Подключение…';
    const { conn, welcome } = await Connection.connect(name, settings.color, link);
    status.textContent = '';
    const game = new Game(conn, welcome, settings, ui, atlas);
    if (host) setupInvite(host);
    // Для отладки из консоли браузера: при разработке или с ?debug в адресе.
    if (import.meta.env.DEV || new URLSearchParams(location.search).has('debug')) Object.assign(window, { game, host });
  } catch (err) {
    console.error(err);
    status.textContent = (err as Error).message;
    busy = false;
    setButtons(false);
  }
}

const defaultTarget = (): Target => (serverMode ? { kind: 'server' } : inviteId ? { kind: 'peer', id: inviteId } : { kind: 'local', fresh: false });

form.onsubmit = (e) => {
  e.preventDefault();
  void play(defaultTarget());
};
$('own-world').onclick = () => void play({ kind: 'local', fresh: false });
$('new-world').onclick = () => {
  if (confirm('Начать новый мир? Текущий мир в этом браузере будет удалён.')) void play({ kind: 'local', fresh: true });
};

async function init(): Promise<void> {
  serverMode = await detectServer();
  if (serverMode) void setupServerShare();
  else {
    $('world-actions').hidden = false;
    if (inviteId) {
      $('invite-banner').hidden = false;
      playButton.textContent = 'Присоединиться к другу';
      $('own-world').hidden = false;
      $('new-world').hidden = true;
    }
    setupStaticShare();
  }

  // После обрыва связи страница перезагружается и сразу заходит под тем же ником.
  let autojoin = false;
  try {
    autojoin = sessionStorage.getItem(AUTOJOIN_KEY) === '1';
    sessionStorage.removeItem(AUTOJOIN_KEY);
  } catch {
    // sessionStorage недоступен — обычный вход через меню
  }
  if (autojoin && settings.name) void play(defaultTarget());
  else if (!matchMedia('(pointer: coarse)').matches) nameInput.focus();
}
void init();
