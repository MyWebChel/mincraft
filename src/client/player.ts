import type { GameMode } from '../shared/protocol';
import { fluidState, moveBody, sneakClamp, type Body, type BlockGetter } from '../shared/physics';

export interface MoveInput {
  /** Вперёд/назад: от -1 до 1. */
  forward: number;
  /** Вправо/влево: от -1 до 1. */
  strafe: number;
  jump: boolean;
  sneak: boolean;
  sprint: boolean;
}

export const PLAYER_WIDTH = 0.6;
export const PLAYER_HEIGHT = 1.8;
const EYE = 1.62;
const EYE_SNEAK = 1.54;
const GRAVITY = 32;
const JUMP = 8.6;

/** Причины смерти — для сообщения в чат (глаголы в настоящем времени не зависят от рода). */
export const DEATH_MESSAGES: Record<string, string> = {
  fall: 'разбивается насмерть',
  drown: 'тонет',
  lava: 'сгорает в лаве',
  fire: 'сгорает',
  starve: 'умирает от голода',
  void: 'падает в пустоту',
  kill: 'погибает',
  зомби: 'погибает от зомби',
  скелет: 'погибает от стрелы скелета',
  стрела: 'погибает от стрелы',
  паук: 'погибает от паука',
  крипер: 'взрывается из-за крипера',
  динамит: 'взрывается',
};

/** Локальный игрок: физика, выживание (здоровье, голод, воздух, урон). */
export class LocalPlayer implements Body {
  x = 0;
  y = 0;
  z = 0;
  vx = 0;
  vy = 0;
  vz = 0;
  readonly width = PLAYER_WIDTH;
  readonly height = PLAYER_HEIGHT;
  onGround = false;
  collidedH = false;
  yaw = 0;
  pitch = 0;
  mode: GameMode = 'survival';
  flying = false;
  sneaking = false;
  sprinting = false;
  inWater = false;
  inLava = false;
  eyeInWater = false;
  onLadder = false;
  alive = true;
  sleeping = false;

  hp = 20;
  food = 20;
  saturation = 5;
  private exhaustion = 0;
  /** Воздух под водой, секунды (15 — полный). */
  air = 15;
  fire = 0;
  private fallDistance = 0;
  private hurtCooldown = 0;
  private regenTimer = 0;
  private starveTimer = 0;
  private drownTimer = 0;
  private fireTimer = 0;
  private lavaTimer = 0;
  /** Сколько прошли (для шагов и покачивания). */
  walkDistance = 0;
  speed = 0;
  /** Последняя причина урона (для сообщения о смерти). */
  lastCause = 'kill';

  /** Колбэки: урон (для эффектов), смерть, звуки шагов/приземления. */
  onHurt: (amount: number, cause: string) => void = () => {};
  onDeath: (cause: string) => void = () => {};
  onStep: () => void = () => {};
  onLand: (distance: number) => void = () => {};
  onSplash: () => void = () => {};
  /** Сколько очков брони (уменьшает урон). */
  armorPoints: () => number = () => 0;

  constructor(private readonly world: BlockGetter) {}

  get eyeHeight(): number {
    return this.sneaking && !this.flying ? EYE_SNEAK : EYE;
  }

  get survival(): boolean {
    return this.mode === 'survival';
  }

  setPosition(x: number, y: number, z: number): void {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = this.vy = this.vz = 0;
    this.fallDistance = 0;
  }

  update(dt: number, input: MoveInput): void {
    if (!this.alive || this.sleeping) return;
    this.hurtCooldown = Math.max(0, this.hurtCooldown - dt);
    const wasInWater = this.inWater;
    const fs = fluidState(this.world, this, this.eyeHeight);
    this.inWater = fs.inWater;
    this.inLava = fs.inLava;
    this.eyeInWater = fs.eyeInWater;
    this.onLadder = fs.onLadder;
    if (this.inWater && !wasInWater && this.vy < -4) this.onSplash();
    if (this.mode !== 'creative') this.flying = false;

    this.sneaking = input.sneak && !this.flying;
    const moving = input.forward !== 0 || input.strafe !== 0;
    this.sprinting = input.sprint && input.forward > 0 && !this.sneaking && (this.food > 6 || !this.survival);

    // Желаемое направление в плоскости XZ (камера при yaw=0 смотрит в -Z).
    const sin = Math.sin(this.yaw);
    const cos = Math.cos(this.yaw);
    let wx = -sin * input.forward + cos * input.strafe;
    let wz = -cos * input.forward - sin * input.strafe;
    const len = Math.hypot(wx, wz);
    if (len > 1) {
      wx /= len;
      wz /= len;
    }

    let speed = this.sprinting ? 5.612 : 4.317;
    if (this.sneaking) speed = 1.3;
    let accel = this.onGround ? 14 : 2.6;
    if (this.flying) {
      speed = this.sprinting ? 21.6 : 10.9;
      accel = 8;
    } else if (this.inWater || this.inLava) {
      speed = this.inLava ? 1.2 : this.sprinting ? 3 : 2.1;
      accel = 6;
    }
    const k = 1 - Math.exp(-accel * dt);
    this.vx += (wx * speed - this.vx) * k;
    this.vz += (wz * speed - this.vz) * k;

    let jumped = false;
    if (this.flying) {
      const target = ((input.jump ? 1 : 0) - (input.sneak ? 1 : 0)) * (this.sprinting ? 12 : 8);
      this.vy += (target - this.vy) * (1 - Math.exp(-10 * dt));
    } else if (this.onLadder) {
      if (input.jump || (moving && this.collidedH)) this.vy = 2.6;
      else if (this.sneaking) this.vy = 0;
      else this.vy = Math.max(this.vy - GRAVITY * dt, -2.6);
    } else if (this.inWater || this.inLava) {
      this.vy -= (this.inLava ? 6 : 10) * dt;
      this.vy *= Math.exp(-2.5 * dt);
      if (input.jump) this.vy = Math.min(this.vy + 28 * dt, this.inLava ? 2 : 3.6);
      if (input.sneak) this.vy = Math.max(this.vy - 20 * dt, -3.6);
      // Выпрыгиваем из воды на берег.
      if (input.jump && this.collidedH && !this.eyeInWater) this.vy = 6.5;
      this.vy = Math.max(this.vy, -5);
    } else {
      this.vy = Math.max(this.vy - GRAVITY * dt, -78);
      if (input.jump && this.onGround) {
        this.vy = JUMP;
        jumped = true;
        if (this.sprinting) {
          this.vx += wx * 2;
          this.vz += wz * 2;
        }
      }
    }

    // Подшаги, чтобы не проскочить сквозь блок на большой скорости.
    let dx = this.vx * dt;
    let dz = this.vz * dt;
    if (this.sneaking && this.onGround && !this.flying) [dx, dz] = sneakClamp(this.world, this, dx, dz);
    const maxMove = Math.max(Math.abs(dx), Math.abs(this.vy * dt), Math.abs(dz));
    const steps = Math.max(1, Math.ceil(maxMove / 0.35));
    const startX = this.x;
    const startZ = this.z;
    const startY = this.y;
    const wasOnGround = this.onGround;
    for (let i = 0; i < steps; i++) moveBody(this.world, this, dx / steps, (this.vy * dt) / steps, dz / steps, this.flying ? 0 : 0.6);
    if (this.flying && this.onGround && !input.jump) this.flying = false;

    const moved = Math.hypot(this.x - startX, this.z - startZ);
    this.speed = moved / Math.max(dt, 1e-4);
    if (this.onGround && !this.flying) {
      const before = Math.floor(this.walkDistance / 2.2);
      this.walkDistance += moved;
      if (Math.floor(this.walkDistance / 2.2) !== before && !this.sneaking) this.onStep();
    } else if (this.onLadder) this.walkDistance += Math.abs(this.y - startY) * 0.8;

    if (this.survival) {
      this.exhaustion += moved * (this.sprinting ? 0.1 : this.inWater ? 0.015 : 0.01);
      if (jumped) this.exhaustion += this.sprinting ? 0.2 : 0.05;
    }

    // Урон от падения.
    if (this.flying || this.inWater || this.onLadder || !this.survival) this.fallDistance = 0;
    else if (this.y < startY) this.fallDistance += startY - this.y;
    if (this.onGround && !wasOnGround) {
      if (this.fallDistance > 1.5) this.onLand(this.fallDistance);
      const dmg = Math.ceil(this.fallDistance - 3);
      if (dmg > 0) this.damage(dmg, 'fall');
      this.fallDistance = 0;
    }
    if (this.y < -40) this.damage(4 * dt * 10, 'void');

    this.survivalTick(dt);
  }

  private survivalTick(dt: number): void {
    if (!this.survival) {
      this.air = 15;
      this.fire = 0;
      return;
    }
    // Воздух.
    if (this.eyeInWater) {
      this.air -= dt;
      if (this.air <= 0) {
        this.air = 0;
        this.drownTimer += dt;
        if (this.drownTimer >= 1) {
          this.drownTimer = 0;
          this.damage(2, 'drown');
        }
      }
    } else this.air = Math.min(15, this.air + dt * 5);

    // Огонь и лава.
    if (this.inLava) {
      this.fire = 8;
      this.lavaTimer += dt;
      if (this.lavaTimer >= 0.5) {
        this.lavaTimer = 0;
        this.damage(4, 'lava');
      }
    }
    if (this.inWater) this.fire = 0;
    if (this.fire > 0) {
      this.fire -= dt;
      this.fireTimer += dt;
      if (this.fireTimer >= 1) {
        this.fireTimer = 0;
        this.damage(1, 'fire');
      }
    }

    // Голод: истощение тратит сытость, затем еду.
    while (this.exhaustion >= 4) {
      this.exhaustion -= 4;
      if (this.saturation > 0) this.saturation = Math.max(0, this.saturation - 1);
      else this.food = Math.max(0, this.food - 1);
    }
    // Регенерация при сытости 18+, голодание при 0.
    if (this.food >= 18 && this.hp < 20) {
      this.regenTimer += dt;
      if (this.regenTimer >= 4) {
        this.regenTimer = 0;
        this.hp = Math.min(20, this.hp + 1);
        this.exhaustion += 3;
      }
    } else this.regenTimer = 0;
    if (this.food <= 0) {
      this.starveTimer += dt;
      if (this.starveTimer >= 4) {
        this.starveTimer = 0;
        if (this.hp > 1) this.damage(1, 'starve');
      }
    }
  }

  /** Урон с учётом брони (броня не защищает от падения, утопления и голода). */
  damage(amount: number, cause: string, knockX = 0, knockZ = 0): void {
    if (!this.alive || (!this.survival && cause !== 'kill' && cause !== 'void')) return;
    if (this.hurtCooldown > 0 && cause !== 'kill' && cause !== 'void') return;
    const armored = !['fall', 'drown', 'starve', 'void', 'kill', 'fire', 'lava'].includes(cause);
    let dmg = amount;
    if (armored) dmg *= 1 - Math.min(20, this.armorPoints()) / 25;
    this.hp = Math.max(0, this.hp - dmg);
    this.hurtCooldown = 0.5;
    this.exhaustion += 0.1;
    this.lastCause = cause;
    this.sleeping = false;
    if (knockX || knockZ) {
      this.vx += knockX * 5;
      this.vz += knockZ * 5;
      this.vy = Math.max(this.vy, 4.5);
    }
    this.onHurt(dmg, cause);
    if (this.hp <= 0) {
      this.alive = false;
      this.onDeath(cause);
    }
  }

  eat(hunger: number, saturation: number): void {
    this.food = Math.min(20, this.food + hunger);
    this.saturation = Math.min(this.food, this.saturation + saturation);
  }

  addExhaustion(v: number): void {
    if (this.survival) this.exhaustion += v;
  }

  respawn(x: number, y: number, z: number): void {
    this.setPosition(x, y, z);
    this.hp = 20;
    this.food = 20;
    this.saturation = 5;
    this.exhaustion = 0;
    this.air = 15;
    this.fire = 0;
    this.alive = true;
  }
}
