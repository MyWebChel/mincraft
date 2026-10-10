import { BLOCKS, Block, FULL_CUBE, SHAPE, S_FLUID, typeOf } from '../src/shared/blocks';
import { blockDrops, mobDrops } from '../src/shared/drops';
import { canMerge, stack, type ItemStack } from '../src/shared/inventory';
import { Item, itemDef } from '../src/shared/items';
import { fluidState, moveBody, type Body } from '../src/shared/physics';
import {
  ENTITY_FLAG_ATTACK,
  ENTITY_FLAG_BURNING,
  ENTITY_FLAG_HURT,
  ENTITY_FLAG_SHEARED,
  MOB_NAMES,
  type EntityInfo,
  type EntityKind,
  type GameMode,
  type MobType,
  type ServerMessage,
  type Vec3,
} from '../src/shared/protocol';
import type { ServerWorld } from './server-world';
import type { SavedItem, SavedMob } from './world-store';

export interface PlayerView {
  id: number;
  name: string;
  x: number;
  y: number;
  z: number;
  mode: GameMode;
  alive: boolean;
}

export interface EntityHooks {
  broadcast(msg: ServerMessage): void;
  hurtPlayer(id: number, amount: number, cause: string, kx: number, kz: number): void;
  givePlayer(id: number, item: ItemStack): boolean;
  players(): PlayerView[];
  isDay(): boolean;
  raining(): boolean;
}

interface MobConfig {
  hp: number;
  width: number;
  height: number;
  speed: number;
  hostile: boolean;
  damage: number;
}

const MOBS: Record<MobType, MobConfig> = {
  pig: { hp: 10, width: 0.9, height: 0.9, speed: 1.1, hostile: false, damage: 0 },
  cow: { hp: 10, width: 0.9, height: 1.4, speed: 1.0, hostile: false, damage: 0 },
  sheep: { hp: 8, width: 0.9, height: 1.3, speed: 1.0, hostile: false, damage: 0 },
  chicken: { hp: 4, width: 0.4, height: 0.7, speed: 1.0, hostile: false, damage: 0 },
  zombie: { hp: 20, width: 0.6, height: 1.95, speed: 2.1, hostile: true, damage: 3 },
  skeleton: { hp: 20, width: 0.6, height: 1.99, speed: 2.2, hostile: true, damage: 0 },
  creeper: { hp: 20, width: 0.6, height: 1.7, speed: 2.0, hostile: true, damage: 0 },
  spider: { hp: 16, width: 1.4, height: 0.9, speed: 2.8, hostile: true, damage: 2 },
};

export const PASSIVE: MobType[] = ['pig', 'cow', 'sheep', 'chicken'];
const HOSTILE_WEIGHTS: [MobType, number][] = [
  ['zombie', 0.38],
  ['skeleton', 0.28],
  ['creeper', 0.2],
  ['spider', 0.14],
];

const GRAVITY = 28;

let nextEntityId = 1;

abstract class Entity implements Body {
  readonly id = nextEntityId++;
  abstract readonly kind: EntityKind;
  x: number;
  y: number;
  z: number;
  vx = 0;
  vy = 0;
  vz = 0;
  width = 0.25;
  height = 0.25;
  onGround = false;
  collidedH = false;
  yaw = 0;
  pitch = 0;
  age = 0;
  removed = false;
  /** Последнее отправленное состояние — чтобы не слать неподвижных. */
  sent: number[] = [];

  constructor(p: Vec3) {
    [this.x, this.y, this.z] = p;
  }

  flags(): number {
    return 0;
  }

  info(): EntityInfo {
    return { id: this.id, kind: this.kind, p: [this.x, this.y, this.z], yaw: this.yaw, pitch: this.pitch, flags: this.flags() };
  }

  abstract tick(dt: number, m: EntityManager): void;
}

/** Радиус (в чанках) вокруг игроков, в котором сущности обновляются. */
const ACTIVE_RADIUS = 5;

export class Mob extends Entity {
  readonly kind = 'mob' as const;
  readonly cfg: MobConfig;
  hp: number;
  sheared = false;
  dead = 0;
  hurtTimer = 0;
  invulnerable = 0;
  burning = 0;
  private burnTick = 0;
  fuse = 0;
  private attackCooldown = 0;
  attacking = 0;
  private wanderTarget: [number, number] | null = null;
  private wanderTimer = Math.random() * 3;
  private panic = 0;
  private panicDir: [number, number] = [0, 0];
  private target: number | null = null;
  private sayTimer = 5 + Math.random() * 15;
  private shootTimer = 2;
  persistent: boolean;

  constructor(
    readonly type: MobType,
    p: Vec3,
  ) {
    super(p);
    this.cfg = MOBS[type];
    this.hp = this.cfg.hp;
    this.width = this.cfg.width;
    this.height = this.cfg.height;
    this.yaw = Math.random() * Math.PI * 2;
    this.persistent = !this.cfg.hostile;
  }

  flags(): number {
    return (
      (this.hurtTimer > 0 ? ENTITY_FLAG_HURT : 0) |
      (this.burning > 0 ? ENTITY_FLAG_BURNING : 0) |
      (this.sheared ? ENTITY_FLAG_SHEARED : 0) |
      (this.attacking > 0 ? ENTITY_FLAG_ATTACK : 0)
    );
  }

  info(): EntityInfo {
    return { ...super.info(), type: this.type };
  }

  hurt(m: EntityManager, amount: number, fromX: number, fromZ: number, knock = 1): void {
    if (this.dead || this.invulnerable > 0) return;
    this.hp -= amount;
    this.invulnerable = 0.5;
    this.hurtTimer = 0.4;
    const dx = this.x - fromX;
    const dz = this.z - fromZ;
    const len = Math.hypot(dx, dz) || 1;
    this.vx = (dx / len) * 6 * knock;
    this.vz = (dz / len) * 6 * knock;
    this.vy = 5 * knock;
    this.onGround = false;
    if (!this.cfg.hostile) {
      this.panic = 4;
      this.panicDir = [dx / len, dz / len];
    }
    m.event(this.id, this.hp <= 0 ? 'death' : 'hurt');
    m.sound(this.hp <= 0 && this.cfg.hostile ? `${this.type}_death` : `${this.type}_hurt`, this);
    if (this.hp <= 0) this.die(m);
  }

  private die(m: EntityManager): void {
    this.dead = 0.0001;
    this.fuse = 0;
    m.dropItems(this.x, this.y + 0.3, this.z, mobDrops(this.type, Math.random, this.burning > 0).filter((s) => !(this.type === 'sheep' && this.sheared && s.id === Block.WHITE_WOOL)));
  }

  tick(dt: number, m: EntityManager): void {
    this.age += dt;
    if (this.dead) {
      this.dead += dt;
      if (this.dead > 1) this.removed = true;
      return;
    }
    this.hurtTimer = Math.max(0, this.hurtTimer - dt);
    this.invulnerable = Math.max(0, this.invulnerable - dt);
    this.attacking = Math.max(0, this.attacking - dt);
    this.attackCooldown = Math.max(0, this.attackCooldown - dt);

    const world = m.world;
    const fs = fluidState(world, this, this.height * 0.85);
    const players = m.hooks.players();

    // Нежить горит на солнце.
    if ((this.type === 'zombie' || this.type === 'skeleton') && m.hooks.isDay() && !m.hooks.raining() && !fs.inWater) {
      if (world.skyExposed(Math.floor(this.x), Math.floor(this.y + this.height), Math.floor(this.z))) this.burning = Math.max(this.burning, 1);
    }
    if (fs.inLava) this.burning = Math.max(this.burning, 3);
    if (fs.inWater) this.burning = 0;
    if (this.burning > 0) {
      this.burning -= dt;
      this.burnTick += dt;
      if (this.burnTick >= 1) {
        this.burnTick = 0;
        this.invulnerable = 0;
        this.hurt(m, fs.inLava ? 4 : 1, this.x, this.z, 0);
        if (this.dead) return;
      }
    }

    // ---- ИИ: желаемое направление ----
    let wx = 0;
    let wz = 0;
    let speed = this.cfg.speed;
    let wantJump = false;
    let lookAt: [number, number] | null = null;

    const hostileNow = this.cfg.hostile && !(this.type === 'spider' && m.hooks.isDay() && this.hurtTimer <= 0 && this.target === null);
    let target: PlayerView | undefined;
    if (hostileNow) {
      let best = 16 * 16;
      for (const p of players) {
        if (!p.alive || p.mode !== 'survival') continue;
        const d = (p.x - this.x) ** 2 + (p.z - this.z) ** 2;
        if (d < best && Math.abs(p.y - this.y) < 10) {
          best = d;
          target = p;
        }
      }
      this.target = target ? target.id : null;
    }

    if (target) {
      const dx = target.x - this.x;
      const dz = target.z - this.z;
      const dist = Math.hypot(dx, dz);
      lookAt = [target.x, target.z];
      if (this.type === 'skeleton') {
        // Держит дистанцию и стреляет.
        const dir = dist < 6 ? -1 : dist > 11 ? 1 : 0;
        wx = (dx / (dist || 1)) * dir;
        wz = (dz / (dist || 1)) * dir;
        this.shootTimer -= dt;
        if (this.shootTimer <= 0 && dist < 16) {
          this.shootTimer = 2 + Math.random();
          m.shootArrow(this, target.x, target.y + 1.3, target.z);
          this.attacking = 0.5;
        }
      } else if (this.type === 'creeper') {
        if (dist < 3 && Math.abs(target.y - this.y) < 3) {
          if (this.fuse === 0) {
            m.sound('fuse', this);
            m.event(this.id, 'fuse', 1);
          }
          this.fuse += dt;
          if (this.fuse >= 1.5) {
            this.removed = true;
            m.explode(this.x, this.y + 0.8, this.z, 3, 'крипер');
            return;
          }
        } else if (dist > 6 && this.fuse > 0) {
          this.fuse = Math.max(0, this.fuse - dt);
          if (this.fuse === 0) m.event(this.id, 'fuse', 0);
        } else {
          wx = dx / (dist || 1);
          wz = dz / (dist || 1);
        }
      } else {
        if (dist > 0.8) {
          wx = dx / dist;
          wz = dz / dist;
        }
        const reach = 1.1 + this.width / 2;
        if (dist < reach + 0.3 && Math.abs(target.y - this.y) < 1.8 && this.attackCooldown <= 0) {
          this.attackCooldown = 1;
          this.attacking = 0.4;
          m.hooks.hurtPlayer(target.id, this.cfg.damage, MOB_NAMES[this.type], dx / (dist || 1), dz / (dist || 1));
          m.event(this.id, 'attack');
        }
        if (this.type === 'spider' && dist > 2 && dist < 4 && this.onGround && Math.random() < dt * 2) {
          this.vy = 6;
          this.vx = (dx / dist) * 5;
          this.vz = (dz / dist) * 5;
        }
      }
    } else if (this.panic > 0) {
      this.panic -= dt;
      [wx, wz] = this.panicDir;
      speed *= 2;
      if (Math.random() < dt) this.panicDir = [Math.cos(Math.random() * 6.3), Math.sin(Math.random() * 6.3)];
    } else {
      // Блуждание.
      this.wanderTimer -= dt;
      if (this.wanderTimer <= 0) {
        this.wanderTimer = 3 + Math.random() * 6;
        this.wanderTarget = Math.random() < 0.6 ? [this.x + (Math.random() - 0.5) * 14, this.z + (Math.random() - 0.5) * 14] : null;
      }
      if (this.wanderTarget) {
        const dx = this.wanderTarget[0] - this.x;
        const dz = this.wanderTarget[1] - this.z;
        const d = Math.hypot(dx, dz);
        if (d < 0.6) this.wanderTarget = null;
        else {
          wx = dx / d;
          wz = dz / d;
          speed *= this.cfg.hostile ? 0.45 : 0.55;
        }
      }
      // Животные смотрят на игрока поблизости.
      for (const p of players) if ((p.x - this.x) ** 2 + (p.z - this.z) ** 2 < 36) lookAt = [p.x, p.z];
    }

    if (wx || wz) this.yaw = Math.atan2(-wx, -wz);
    if (lookAt) this.pitch = Math.atan2(-(lookAt[0] - this.x), -(lookAt[1] - this.z)) - this.yaw;
    else this.pitch *= 0.9;

    // ---- Физика ----
    const k = this.onGround ? Math.min(1, dt * 10) : Math.min(1, dt * 2);
    this.vx += (wx * speed - this.vx) * k;
    this.vz += (wz * speed - this.vz) * k;
    if (fs.inWater || fs.inLava) {
      this.vy = Math.min(this.vy + 14 * dt, 1.6);
      this.vx *= 0.9;
      this.vz *= 0.9;
    } else {
      this.vy = Math.max(this.vy - GRAVITY * dt, -50);
      if (this.type === 'chicken') this.vy = Math.max(this.vy, -2.5);
    }
    const wasMoving = wx !== 0 || wz !== 0;
    moveBody(world, this, this.vx * dt, this.vy * dt, this.vz * dt, 0.6);
    if (wasMoving && this.collidedH && (this.onGround || fs.inWater)) wantJump = true;
    if (wantJump && this.onGround) this.vy = 8.6;
    if (this.type === 'spider' && this.collidedH && wasMoving) this.vy = 3; // пауки лазают по стенам
    if (this.y < -40) this.removed = true;

    // Звуки.
    this.sayTimer -= dt;
    if (this.sayTimer <= 0) {
      this.sayTimer = 8 + Math.random() * 16;
      if (this.type !== 'creeper') m.sound(`${this.type}_say`, this);
    }

    // Пропадание враждебных мобов вдали от игроков.
    if (this.cfg.hostile) {
      let nearest = Infinity;
      for (const p of players) nearest = Math.min(nearest, (p.x - this.x) ** 2 + (p.z - this.z) ** 2);
      if (nearest > 128 * 128 || (nearest > 40 * 40 && Math.random() < dt / 30)) this.removed = true;
    }
  }
}

export class ItemEntity extends Entity {
  readonly kind = 'item' as const;
  pickupDelay: number;

  constructor(
    p: Vec3,
    public item: ItemStack,
    delay = 0.5,
  ) {
    super(p);
    this.pickupDelay = delay;
    this.vx = (Math.random() - 0.5) * 2;
    this.vz = (Math.random() - 0.5) * 2;
    this.vy = 3;
  }

  info(): EntityInfo {
    return { ...super.info(), item: this.item };
  }

  tick(dt: number, m: EntityManager): void {
    this.age += dt;
    this.pickupDelay -= dt;
    if (this.age > 300) {
      this.removed = true;
      return;
    }
    const fs = fluidState(m.world, this, 0.2);
    if (fs.inWater) this.vy = Math.min(this.vy + 20 * dt, 1);
    else this.vy = Math.max(this.vy - 16 * dt, -40);
    const drag = this.onGround ? Math.max(0, 1 - dt * 8) : Math.max(0, 1 - dt * 1.5);
    this.vx *= drag;
    this.vz *= drag;
    // Предмет внутри блока выталкивается вверх.
    if (FULL_CUBE[typeOf(m.world.getState(Math.floor(this.x), Math.floor(this.y + 0.1), Math.floor(this.z)))]) {
      this.y += dt * 4;
      this.vy = 0;
      return;
    }
    moveBody(m.world, this, this.vx * dt, this.vy * dt, this.vz * dt, 0);
    if (fs.inLava) this.removed = true;
    if (this.y < -40) this.removed = true;
  }
}

export class ArrowEntity extends Entity {
  readonly kind = 'arrow' as const;
  stuck = false;
  private stuckTime = 0;

  constructor(
    p: Vec3,
    v: Vec3,
    readonly shooter: { player?: number; mob?: number },
  ) {
    super(p);
    [this.vx, this.vy, this.vz] = v;
    this.width = this.height = 0.2;
    this.updateRotation();
  }

  private updateRotation(): void {
    this.yaw = Math.atan2(-this.vx, -this.vz);
    this.pitch = Math.atan2(this.vy, Math.hypot(this.vx, this.vz));
  }

  tick(dt: number, m: EntityManager): void {
    this.age += dt;
    if (this.stuck) {
      this.stuckTime += dt;
      if (this.stuckTime > 30) this.removed = true;
      // Свою стрелу игрок может подобрать.
      if (this.shooter.player !== undefined) {
        for (const p of m.hooks.players()) {
          if (p.alive && (p.x - this.x) ** 2 + (p.y + 0.9 - this.y) ** 2 + (p.z - this.z) ** 2 < 2.2 && m.hooks.givePlayer(p.id, stack(Item.ARROW))) {
            m.remove(this, p.id);
            return;
          }
        }
      }
      return;
    }
    if (this.age > 60) this.removed = true;
    this.vy -= 20 * dt;
    const steps = Math.max(1, Math.ceil((Math.hypot(this.vx, this.vy, this.vz) * dt) / 0.25));
    const sdt = dt / steps;
    for (let s = 0; s < steps; s++) {
      const nx = this.x + this.vx * sdt;
      const ny = this.y + this.vy * sdt;
      const nz = this.z + this.vz * sdt;
      const speed = Math.hypot(this.vx, this.vy, this.vz);
      const damage = Math.max(1, Math.ceil(speed * 0.12));
      // Попадание в моба.
      for (const e of m.entities.values()) {
        if (!(e instanceof Mob) || e.dead || e.id === this.shooter.mob) continue;
        const hw = e.width / 2 + 0.1;
        if (nx > e.x - hw && nx < e.x + hw && nz > e.z - hw && nz < e.z + hw && ny > e.y && ny < e.y + e.height) {
          e.hurt(m, damage, this.x, this.z, 0.5);
          m.sound('arrow_hit', this);
          this.removed = true;
          return;
        }
      }
      // Попадание в игрока.
      for (const p of m.hooks.players()) {
        if (!p.alive || p.id === this.shooter.player || p.mode !== 'survival') continue;
        if (Math.abs(nx - p.x) < 0.4 && Math.abs(nz - p.z) < 0.4 && ny > p.y && ny < p.y + 1.8) {
          const len = Math.hypot(this.vx, this.vz) || 1;
          m.hooks.hurtPlayer(p.id, damage, this.shooter.mob !== undefined ? 'скелет' : 'стрела', this.vx / len, this.vz / len);
          this.removed = true;
          return;
        }
      }
      const st = m.world.getState(Math.floor(nx), Math.floor(ny), Math.floor(nz));
      const t = typeOf(st);
      if (t !== Block.AIR && BLOCKS[t].solid && SHAPE[t] !== S_FLUID) {
        this.stuck = true;
        this.vx = this.vy = this.vz = 0;
        m.sound('arrow_hit', this);
        return;
      }
      this.x = nx;
      this.y = ny;
      this.z = nz;
    }
    this.vx *= 1 - 0.3 * dt;
    this.vy *= 1 - 0.3 * dt;
    this.vz *= 1 - 0.3 * dt;
    this.updateRotation();
  }
}

export class TntEntity extends Entity {
  readonly kind = 'tnt' as const;

  constructor(
    p: Vec3,
    public fuse = 4,
  ) {
    super(p);
    this.width = this.height = 0.98;
    this.vy = 2;
  }

  flags(): number {
    return Math.max(0, Math.round(this.fuse * 10));
  }

  tick(dt: number, m: EntityManager): void {
    this.fuse -= dt;
    this.vy = Math.max(this.vy - GRAVITY * dt, -40);
    moveBody(m.world, this, 0, this.vy * dt, 0, 0);
    if (this.fuse <= 0) {
      this.removed = true;
      m.explode(this.x, this.y + 0.5, this.z, 4, 'динамит');
    }
  }
}

export class FallingBlockEntity extends Entity {
  readonly kind = 'falling' as const;

  constructor(
    p: Vec3,
    readonly state: number,
  ) {
    super(p);
    this.width = this.height = 0.98;
  }

  info(): EntityInfo {
    return { ...super.info(), state: this.state };
  }

  tick(dt: number, m: EntityManager): void {
    this.age += dt;
    this.vy = Math.max(this.vy - GRAVITY * dt, -40);
    moveBody(m.world, this, 0, this.vy * dt, 0, 0);
    if (this.onGround || this.age > 20) {
      this.removed = true;
      const x = Math.floor(this.x);
      const y = Math.floor(this.y + 0.5);
      const z = Math.floor(this.z);
      const cur = typeOf(m.world.getState(x, y, z));
      if (cur === Block.AIR || BLOCKS[cur].replaceable) m.world.setState(x, y, z, this.state);
      else m.dropItems(x + 0.5, y + 0.5, z + 0.5, blockDrops(this.state, null));
    }
  }
}

/** Все сущности мира: обновление, рассылка изменений, взрывы, спаун мобов. */
export class EntityManager {
  readonly entities = new Map<number, Entity>();
  private spawnTimer = 0;
  private mergeTimer = 0;
  private pendingSpawn: Entity[] = [];
  private pendingDespawn: number[] = [];
  private despawnBy = new Map<number, number>();

  constructor(
    readonly world: ServerWorld,
    readonly hooks: EntityHooks,
  ) {}

  add<E extends Entity>(e: E): E {
    this.entities.set(e.id, e);
    this.pendingSpawn.push(e);
    return e;
  }

  remove(e: Entity, by?: number): void {
    e.removed = true;
    if (by !== undefined) this.despawnBy.set(e.id, by);
  }

  spawnMob(type: MobType, x: number, y: number, z: number): Mob {
    return this.add(new Mob(type, [x, y, z]));
  }

  dropItems(x: number, y: number, z: number, items: ItemStack[], delay = 0.5): void {
    for (const it of items) if (it.count > 0) this.add(new ItemEntity([x, y, z], { ...it }, delay));
  }

  dropThrown(p: Vec3, v: Vec3, item: ItemStack, delay = 2): void {
    const e = this.add(new ItemEntity(p, { ...item }, delay));
    [e.vx, e.vy, e.vz] = v;
  }

  sound(name: string, at: { x: number; y: number; z: number }): void {
    this.hooks.broadcast({ t: 'sound', name, p: [at.x, at.y + 0.5, at.z] });
  }

  event(id: number, ev: 'hurt' | 'death' | 'fuse' | 'attack', v?: number): void {
    this.hooks.broadcast({ t: 'entityEvent', id, ev, v });
  }

  shootArrow(from: Mob, tx: number, ty: number, tz: number): void {
    const sx = from.x;
    const sy = from.y + 1.5;
    const sz = from.z;
    const dx = tx - sx;
    const dz = tz - sz;
    const dist = Math.hypot(dx, dz);
    const speed = 24;
    const t = dist / speed;
    const vy = (ty - sy) / Math.max(t, 0.05) + 0.5 * 20 * t;
    const inaccuracy = 0.06;
    const v: Vec3 = [
      (dx / (dist || 1)) * speed + (Math.random() - 0.5) * speed * inaccuracy,
      vy + (Math.random() - 0.5) * speed * inaccuracy,
      (dz / (dist || 1)) * speed + (Math.random() - 0.5) * speed * inaccuracy,
    ];
    this.add(new ArrowEntity([sx, sy, sz], v, { mob: from.id }));
    this.sound('bow_shoot', from);
  }

  shootPlayerArrow(playerId: number, p: Vec3, v: Vec3): void {
    this.add(new ArrowEntity(p, v, { player: playerId }));
    this.hooks.broadcast({ t: 'sound', name: 'bow_shoot', p });
  }

  /** Взрыв: разрушает блоки (кроме прочных), ранит игроков и мобов. */
  explode(x: number, y: number, z: number, power: number, cause: string): void {
    this.hooks.broadcast({ t: 'explosion', p: [x, y, z], power });
    const r = Math.ceil(power);
    const drops: ItemStack[][] = [];
    for (let dy = -r; dy <= r; dy++)
      for (let dz = -r; dz <= r; dz++)
        for (let dx = -r; dx <= r; dx++) {
          const d = Math.hypot(dx, dy, dz);
          if (d > power * (0.7 + Math.random() * 0.45)) continue;
          const bx = Math.floor(x) + dx;
          const by = Math.floor(y) + dy;
          const bz = Math.floor(z) + dz;
          if (by <= 0) continue;
          const st = this.world.getState(bx, by, bz);
          const t = typeOf(st);
          const def = BLOCKS[t];
          if (t === Block.AIR || def.hardness < 0 || t === Block.OBSIDIAN || SHAPE[t] === S_FLUID) continue;
          if (t === Block.TNT) {
            this.world.setState(bx, by, bz, Block.AIR);
            this.add(new TntEntity([bx + 0.5, by, bz + 0.5], 0.5 + Math.random()));
            continue;
          }
          this.world.setState(bx, by, bz, Block.AIR);
          if (Math.random() < 1 / power) {
            const items = blockDrops(st, Item.DIAMOND_PICKAXE);
            if (items.length) {
              drops.push(items);
              this.dropItems(bx + 0.5, by + 0.5, bz + 0.5, items);
            }
          }
        }
    const radius = power * 2;
    for (const e of this.entities.values()) {
      if (!(e instanceof Mob) || e.dead) continue;
      const d = Math.hypot(e.x - x, e.y + e.height / 2 - y, e.z - z);
      if (d > radius) continue;
      const impact = 1 - d / radius;
      e.invulnerable = 0;
      e.hurt(this, Math.floor(((impact * impact + impact) / 2) * 7 * radius + 1), x, z, 1.5);
    }
    for (const p of this.hooks.players()) {
      if (!p.alive || p.mode !== 'survival') continue;
      const d = Math.hypot(p.x - x, p.y + 0.9 - y, p.z - z);
      if (d > radius) continue;
      const impact = 1 - d / radius;
      const len = Math.hypot(p.x - x, p.z - z) || 1;
      this.hooks.hurtPlayer(p.id, Math.floor(((impact * impact + impact) / 2) * 7 * radius + 1), cause, ((p.x - x) / len) * (1 + impact * 2), ((p.z - z) / len) * (1 + impact * 2));
    }
  }

  tick(dt: number): void {
    // Живут только сущности рядом с игроками; дальние «замораживаются» и не держат свои чанки
    // загруженными (иначе бродящие животные не давали бы выгружать мир). Враждебные мобы
    // вдали от всех просто исчезают, как в оригинале.
    const near = this.hooks.players().map((p) => [Math.floor(p.x) >> 4, Math.floor(p.z) >> 4]);
    for (const e of this.entities.values()) {
      if (e.removed) continue;
      const cx = Math.floor(e.x) >> 4;
      const cz = Math.floor(e.z) >> 4;
      const active = near.some(([px, pz]) => Math.max(Math.abs(px - cx), Math.abs(pz - cz)) <= ACTIVE_RADIUS);
      if (!active) {
        if (e instanceof Mob && e.cfg.hostile) this.remove(e);
        continue;
      }
      if (!this.world.isLoaded(cx, cz)) continue;
      e.tick(dt, this);
    }
    this.pickups();
    this.mergeTimer += dt;
    if (this.mergeTimer > 1) {
      this.mergeTimer = 0;
      this.mergeItems();
    }
    this.spawnTimer += dt;
    if (this.spawnTimer > 1) {
      this.spawnTimer = 0;
      this.spawnHostiles();
    }
    for (const [id, e] of this.entities) {
      if (!e.removed) continue;
      this.entities.delete(id);
      this.pendingDespawn.push(id);
    }
  }

  private pickups(): void {
    const players = this.hooks.players();
    for (const e of this.entities.values()) {
      if (!(e instanceof ItemEntity) || e.removed || e.pickupDelay > 0) continue;
      for (const p of players) {
        if (!p.alive) continue;
        if ((p.x - e.x) ** 2 + (p.y + 0.7 - e.y) ** 2 + (p.z - e.z) ** 2 > 2.4) continue;
        if (this.hooks.givePlayer(p.id, e.item)) {
          this.remove(e, p.id);
          break;
        }
      }
    }
  }

  private mergeItems(): void {
    const items = [...this.entities.values()].filter((e): e is ItemEntity => e instanceof ItemEntity && !e.removed);
    for (let i = 0; i < items.length; i++) {
      const a = items[i];
      if (a.removed) continue;
      for (let j = i + 1; j < items.length; j++) {
        const b = items[j];
        if (b.removed || !canMerge(a.item, b.item)) continue;
        if ((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 > 1) continue;
        const max = itemDef(a.item.id)?.maxStack ?? 64;
        if (a.item.count + b.item.count > max) continue;
        a.item = { ...a.item, count: a.item.count + b.item.count };
        this.remove(b);
        this.pendingSpawn.push(a);
      }
    }
  }

  /** Спаун враждебных мобов в темноте вокруг игроков. */
  private spawnHostiles(): void {
    const players = this.hooks.players().filter((p) => p.alive);
    if (!players.length) return;
    let hostile = 0;
    for (const e of this.entities.values()) if (e instanceof Mob && e.cfg.hostile) hostile++;
    const cap = Math.min(40, 14 * players.length);
    if (hostile >= cap) return;
    const night = !this.hooks.isDay();
    for (const p of players) {
      for (let attempt = 0; attempt < 3; attempt++) {
        const a = Math.random() * Math.PI * 2;
        const d = 24 + Math.random() * 24;
        const x = Math.floor(p.x + Math.cos(a) * d);
        const z = Math.floor(p.z + Math.sin(a) * d);
        if (!this.world.isLoaded(x >> 4, z >> 4)) continue;
        let y = Math.floor(p.y + (Math.random() - 0.5) * 32);
        y = Math.max(2, Math.min(120, y));
        let found = -1;
        for (let k = 0; k < 24; k++, y--) {
          if (y < 1) break;
          const feet = this.world.peekState(x, y, z);
          const head = this.world.peekState(x, y + 1, z);
          const below = this.world.peekState(x, y - 1, z);
          if (FULL_CUBE[typeOf(below)] && typeOf(feet) === Block.AIR && typeOf(head) === Block.AIR && typeOf(below) !== Block.BEDROCK) {
            found = y;
            break;
          }
        }
        if (found < 0) continue;
        if (this.world.blockLight(x, found, z) > 0) continue;
        const exposed = this.world.skyExposed(x, found, z);
        if (exposed && !night) continue;
        let r = Math.random();
        let type: MobType = 'zombie';
        for (const [t, w] of HOSTILE_WEIGHTS) {
          if ((r -= w) <= 0) {
            type = t;
            break;
          }
        }
        this.spawnMob(type, x + 0.5, found, z + 0.5);
        return;
      }
    }
  }

  /** Животные в новых чанках (один раз на чанк). */
  populate(cx: number, cz: number): void {
    if (Math.random() > 0.12) return;
    const type = PASSIVE[Math.floor(Math.random() * PASSIVE.length)];
    const n = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      const x = cx * 16 + Math.floor(Math.random() * 16);
      const z = cz * 16 + Math.floor(Math.random() * 16);
      for (let y = 120; y > 30; y--) {
        const t = typeOf(this.world.getState(x, y, z));
        if (t === Block.AIR || BLOCKS[t].replaceable) continue;
        if (t === Block.GRASS) this.spawnMob(type, x + 0.5, y + 1, z + 0.5);
        break;
      }
    }
  }

  /** Сообщения об изменениях сущностей за тик. */
  flush(): void {
    if (this.pendingSpawn.length) {
      const seen = new Set<number>();
      const list = this.pendingSpawn.filter((e) => !e.removed && !seen.has(e.id) && seen.add(e.id));
      this.pendingSpawn = [];
      for (const e of list) e.sent = [e.x, e.y, e.z, e.yaw, e.pitch, e.flags()];
      if (list.length) this.hooks.broadcast({ t: 'spawn', e: list.map((e) => e.info()) });
    }
    if (this.pendingDespawn.length) {
      const by = this.pendingDespawn.length === 1 ? this.despawnBy.get(this.pendingDespawn[0]) : undefined;
      if (by !== undefined) this.hooks.broadcast({ t: 'despawn', ids: this.pendingDespawn, by });
      else this.hooks.broadcast({ t: 'despawn', ids: this.pendingDespawn });
      for (const id of this.pendingDespawn) this.despawnBy.delete(id);
      this.pendingDespawn = [];
    }
    const d: number[] = [];
    const r = (v: number) => Math.round(v * 1000) / 1000;
    for (const e of this.entities.values()) {
      const f = e.flags();
      const s = e.sent;
      if (
        s.length &&
        Math.abs(s[0] - e.x) < 0.01 &&
        Math.abs(s[1] - e.y) < 0.01 &&
        Math.abs(s[2] - e.z) < 0.01 &&
        Math.abs(s[3] - e.yaw) < 0.02 &&
        Math.abs(s[4] - e.pitch) < 0.02 &&
        s[5] === f
      )
        continue;
      e.sent = [e.x, e.y, e.z, e.yaw, e.pitch, f];
      d.push(e.id, r(e.x), r(e.y), r(e.z), r(e.yaw), r(e.pitch), f);
    }
    if (d.length) this.hooks.broadcast({ t: 'entities', d });
  }

  all(): EntityInfo[] {
    return [...this.entities.values()].filter((e) => !e.removed).map((e) => e.info());
  }

  /** Что сохраняем: животных и выпавшие предметы. */
  snapshot(): { mobs: SavedMob[]; items: SavedItem[] } {
    const mobs: SavedMob[] = [];
    const items: SavedItem[] = [];
    for (const e of this.entities.values()) {
      if (e.removed) continue;
      if (e instanceof Mob && e.persistent && !e.dead) mobs.push({ type: e.type, p: [e.x, e.y, e.z], hp: e.hp, sheared: e.sheared });
      else if (e instanceof ItemEntity) items.push({ item: e.item, p: [e.x, e.y, e.z], age: e.age });
    }
    return { mobs, items };
  }

  restore(mobs: SavedMob[], items: SavedItem[]): void {
    for (const s of mobs) {
      if (!MOBS[s.type]) continue;
      const mob = new Mob(s.type, s.p);
      mob.hp = Math.max(1, Math.min(mob.cfg.hp, s.hp));
      mob.sheared = !!s.sheared;
      this.entities.set(mob.id, mob);
    }
    for (const s of items) {
      const it = new ItemEntity(s.p, s.item, 0);
      it.vx = it.vy = it.vz = 0;
      it.age = s.age;
      this.entities.set(it.id, it);
    }
  }
}
