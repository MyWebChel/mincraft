import type { MoveInput } from './player';

export interface InputHandlers {
  attackStart(): void;
  attackEnd(): void;
  useStart(): void;
  useEnd(): void;
  pick(): void;
  hotbar(slot: number): void;
  scroll(dir: number): void;
  toggleFly(): void;
  drop(all: boolean): void;
  chat(prefix: string): void;
  inventory(): void;
  playerList(show: boolean): void;
  debug(): void;
  pause(): void;
  toggleView(): void;
}

export const isTouchDevice = () => matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;

/** Клавиатура, мышь и сенсорное управление. Всё сводится к MoveInput и событиям. */
export class Input {
  /** Ввод в игру включён (не открыто меню, чат или инвентарь). */
  active = false;
  sensitivity = 8;
  invertY = false;
  private readonly keys = new Set<string>();
  private lookX = 0;
  private lookY = 0;
  /** Когда курсор последний раз захвачен и размер прошлого движения мыши — для отсева ложных рывков. */
  private lockedAt = 0;
  private lastMove = 0;
  private lastSpace = 0;
  private lastW = 0;
  private sprintLatch = false;
  private stick = { x: 0, y: 0 };
  private touchJump = false;
  private touchDown = false;
  touchSneak = false;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly h: InputHandlers,
  ) {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', () => {
      this.keys.clear();
      this.h.attackEnd();
      this.h.useEnd();
    });
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('pointerlockchange', () => {
      if (!this.pointerLocked) return;
      this.lockedAt = performance.now();
      this.lastMove = 0;
    });
    canvas.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    canvas.addEventListener('wheel', this.onWheel, { passive: false });
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  get pointerLocked(): boolean {
    return document.pointerLockElement === this.canvas;
  }

  /** Сброс зажатых клавиш (при открытии меню). */
  release(): void {
    this.keys.clear();
    this.stick = { x: 0, y: 0 };
    this.touchJump = this.touchDown = false;
    this.sprintLatch = false;
  }

  moveInput(): MoveInput {
    if (!this.active) return { forward: 0, strafe: 0, jump: false, sneak: this.touchSneak, sprint: false };
    const k = this.keys;
    let forward = (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0);
    let strafe = (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0);
    if (this.stick.x || this.stick.y) {
      forward = -this.stick.y;
      strafe = this.stick.x;
    }
    if (forward <= 0) this.sprintLatch = false;
    const stickSprint = Math.hypot(this.stick.x, this.stick.y) > 0.97 && -this.stick.y > 0.8;
    return {
      forward,
      strafe,
      jump: k.has('Space') || this.touchJump,
      sneak: k.has('ShiftLeft') || k.has('ShiftRight') || this.touchDown || this.touchSneak,
      sprint: k.has('ControlLeft') || k.has('KeyR') || this.sprintLatch || stickSprint,
    };
  }

  /** Накопленное движение мыши (или пальца) с прошлого кадра, в радианах. */
  consumeLook(): [number, number] {
    const scale = this.sensitivity * 0.00025;
    const out: [number, number] = [this.lookX * scale, this.lookY * scale * (this.invertY ? -1 : 1)];
    this.lookX = this.lookY = 0;
    return out;
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
    if (!this.active) return;
    if (['Space', 'Tab', 'F1', 'F3', 'F5', 'Slash', 'ArrowUp', 'ArrowDown', 'KeyQ'].includes(e.code)) e.preventDefault();
    // Ctrl — бег, как в Minecraft. Сочетания браузера посреди игры (Ctrl+D — закладка, Ctrl+S —
    // сохранение страницы...) открывали окна: курсор освобождался, а нажатые клавиши терялись.
    // Ctrl+W браузер всё равно закроет вкладку — для бега есть R и двойное нажатие W.
    if (e.ctrlKey || e.metaKey) e.preventDefault();
    // Автоповтор зажатой клавиши возвращает её в набор (W после закрытия инвентаря снова ведёт вперёд),
    // а действия срабатывают только по первому нажатию.
    this.keys.add(e.code);
    if (e.repeat) return;

    if (e.code === 'Space') {
      const now = performance.now();
      if (now - this.lastSpace < 300) {
        this.h.toggleFly();
        this.lastSpace = 0;
      } else this.lastSpace = now;
    }
    if (e.code === 'KeyW') {
      const now = performance.now();
      if (now - this.lastW < 280) this.sprintLatch = true;
      this.lastW = now;
    }
    if (e.code.startsWith('Digit')) {
      const n = Number(e.code.slice(5));
      if (n >= 1 && n <= 9) this.h.hotbar(n - 1);
    }
    switch (e.code) {
      case 'KeyT':
      case 'Enter':
        e.preventDefault();
        this.release();
        this.h.chat('');
        break;
      case 'Slash':
        this.release();
        this.h.chat('/');
        break;
      case 'KeyE':
        this.release();
        this.h.inventory();
        // Это же нажатие дальше увидел бы обработчик «E — закрыть инвентарь» и сразу закрыл бы окно.
        e.stopImmediatePropagation();
        break;
      case 'KeyQ':
        this.h.drop(e.ctrlKey);
        break;
      case 'Tab':
        this.h.playerList(true);
        break;
      case 'F3':
        this.h.debug();
        break;
      case 'F5':
        this.h.toggleView();
        break;
    }
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.code);
    if (e.code === 'Tab') this.h.playerList(false);
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this.active || !this.pointerLocked) return;
    // Сразу после захвата курсора (и изредка посреди игры) браузеры присылают ложный рывок —
    // одно событие во много раз больше соседних. Камера от него резко поворачивалась,
    // и «вперёд» внезапно уводило в сторону. Настоящий быстрый взмах так не выглядит.
    const m = Math.max(Math.abs(e.movementX), Math.abs(e.movementY));
    // Пустые события (браузер шлёт их, например, при обновлении интерфейса) не в счёт.
    if (m === 0) return;
    const prev = this.lastMove;
    this.lastMove = m;
    if (performance.now() - this.lockedAt < 120) return;
    if (m > 400 || (m > 200 && m > 10 * Math.max(prev, 15))) return;
    this.lookX += e.movementX;
    this.lookY += e.movementY;
  };

  private onMouseDown = (e: MouseEvent) => {
    if (!this.active || !this.pointerLocked) return;
    if (e.button === 0) this.h.attackStart();
    else if (e.button === 2) this.h.useStart();
    else if (e.button === 1) {
      e.preventDefault();
      this.h.pick();
    }
  };

  private onMouseUp = (e: MouseEvent) => {
    if (e.button === 0) this.h.attackEnd();
    else if (e.button === 2) this.h.useEnd();
  };

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (this.active && e.deltaY) this.h.scroll(Math.sign(e.deltaY));
  };

  /**
   * Сенсорное управление: джойстик слева, обзор пальцем справа.
   * Короткое касание — поставить/использовать, удержание — ломать/бить.
   */
  setupTouch(root: HTMLElement): void {
    root.hidden = false;
    const stick = root.querySelector<HTMLElement>('#joystick')!;
    const knob = root.querySelector<HTMLElement>('#joystick-knob')!;
    let stickId: number | null = null;
    let lookId: number | null = null;
    let lookStart = { x: 0, y: 0, t: 0 };
    let last = { x: 0, y: 0 };
    let holdTimer = 0;
    let holding = false;
    let movedFar = false;

    // Палец лёг около середины — центр джойстика там, где палец: иначе касание чуть сбоку
    // сразу вело вбок, и «вперёд» получалось по диагонали. Палец сразу на краю — значит,
    // идти именно туда (центр — середина круга). Небольшое отклонение не считается,
    // а почти прямое направление выравнивается точно по оси.
    let origin = { x: 0, y: 0 };
    const DEAD = 0.15;
    const SNAP = 0.32; // ~18°
    const moveStick = (t: Touch) => {
      const radius = stick.getBoundingClientRect().width / 2;
      let dx = (t.clientX - origin.x) / (radius * 0.8);
      let dy = (t.clientY - origin.y) / (radius * 0.8);
      const len = Math.min(1, Math.hypot(dx, dy));
      if (len < DEAD) {
        dx = dy = 0;
      } else {
        let angle = Math.atan2(dy, dx);
        const axis = Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
        if (Math.abs(angle - axis) < SNAP) angle = axis;
        const k = (len - DEAD) / (1 - DEAD);
        dx = Math.cos(angle) * k;
        dy = Math.sin(angle) * k;
      }
      this.stick = { x: dx, y: dy };
      knob.style.transform = `translate(${dx * radius * 0.6}px, ${dy * radius * 0.6}px)`;
    };

    stick.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      stickId = t.identifier;
      const r = stick.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nearCentre = Math.hypot(t.clientX - cx, t.clientY - cy) < r.width / 4;
      origin = nearCentre ? { x: t.clientX, y: t.clientY } : { x: cx, y: cy };
      moveStick(t);
    });
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (lookId !== null || !this.active) return;
      const t = e.changedTouches[0];
      lookId = t.identifier;
      lookStart = { x: t.clientX, y: t.clientY, t: performance.now() };
      last = { x: t.clientX, y: t.clientY };
      movedFar = false;
      holding = false;
      clearTimeout(holdTimer);
      holdTimer = window.setTimeout(() => {
        if (lookId !== null && !movedFar) {
          holding = true;
          this.h.attackStart();
        }
      }, 280);
    });
    window.addEventListener(
      'touchmove',
      (e) => {
        for (const t of Array.from(e.changedTouches)) {
          if (t.identifier === stickId) moveStick(t);
          else if (t.identifier === lookId && this.active) {
            this.lookX += (t.clientX - last.x) * 2.2;
            this.lookY += (t.clientY - last.y) * 2.2;
            last = { x: t.clientX, y: t.clientY };
            if (Math.hypot(t.clientX - lookStart.x, t.clientY - lookStart.y) > 14) movedFar = true;
          }
        }
      },
      { passive: true },
    );
    const end = (e: TouchEvent) => {
      for (const t of Array.from(e.changedTouches)) {
        if (t.identifier === stickId) {
          stickId = null;
          this.stick = { x: 0, y: 0 };
          knob.style.transform = '';
        }
        if (t.identifier === lookId) {
          lookId = null;
          clearTimeout(holdTimer);
          if (holding) this.h.attackEnd();
          else if (!movedFar && performance.now() - lookStart.t < 280 && this.active) {
            // Короткое касание — использовать/поставить.
            this.h.useStart();
            this.h.useEnd();
          }
          holding = false;
        }
      }
    };
    window.addEventListener('touchend', end);
    window.addEventListener('touchcancel', end);

    const hold = (id: string, down: () => void, up: () => void = () => {}) => {
      const el = root.querySelector<HTMLElement>(id);
      if (!el) return;
      el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        el.classList.add('pressed');
        down();
      });
      const release = (e: TouchEvent) => {
        e.preventDefault();
        el.classList.remove('pressed');
        up();
      };
      el.addEventListener('touchend', release);
      el.addEventListener('touchcancel', release);
    };
    hold('#btn-jump', () => (this.touchJump = true), () => (this.touchJump = false));
    hold('#btn-down', () => (this.touchDown = true), () => (this.touchDown = false));
    hold('#btn-sneak', () => {
      this.touchSneak = !this.touchSneak;
      root.querySelector('#btn-sneak')?.classList.toggle('active', this.touchSneak);
    });
    hold('#btn-fly', () => this.h.toggleFly());
    hold('#btn-attack', () => this.h.attackStart(), () => this.h.attackEnd());
    hold('#btn-use', () => this.h.useStart(), () => this.h.useEnd());
    hold('#btn-chat', () => this.h.chat(''));
    hold('#btn-inventory', () => this.h.inventory());
    hold('#btn-drop', () => this.h.drop(false));
    hold('#btn-pause', () => this.h.pause());
  }
}
