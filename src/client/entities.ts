import * as THREE from 'three';
import { Block, FACE_TILE, typeOf } from '../shared/blocks';
import { isBlockItem } from '../shared/items';
import {
  ENTITY_FLAG_ATTACK,
  ENTITY_FLAG_BURNING,
  ENTITY_FLAG_HURT,
  ENTITY_FLAG_SHEARED,
  MOB_SIZE,
  type EntityInfo,
  type MobType,
} from '../shared/protocol';
import { createMobModel, type MobModel } from './mobModels';
import type { ItemMeshes, ItemModel } from './render/items3d';
import { applyEntityLight } from './render/materials';
import type { Particles } from './render/particles';
import type { World } from './world';

/** Расчёт цвета освещения сущности по уровню света в её клетке. */
export type LightFn = (lightByte: number, out: THREE.Vector3) => THREE.Vector3;

interface Visual {
  info: EntityInfo;
  object: THREE.Object3D;
  target: THREE.Vector3;
  targetYaw: number;
  targetPitch: number;
  yaw: number;
  pitch: number;
  flags: number;
  mob?: MobModel;
  item?: ItemModel;
  /** Вторая копия предмета в стопке: освещение копируется с основной. */
  extra?: ItemModel;
  light: { value: THREE.Vector3 };
  walkPhase: number;
  walkAmount: number;
  attackTime: number;
  fuse: number;
  fuseActive: boolean;
  death: number;
  hurt: number;
  spawnTime: number;
  /** Анимация подбора: летит к игроку. */
  pickup?: { to: () => THREE.Vector3; t: number };
  flash?: THREE.Mesh;
}

const shortestAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

/** Сущности на клиенте: мобы, выпавшие предметы, стрелы, динамит, падающий песок. */
export class EntityRenderer {
  private readonly visuals = new Map<number, Visual>();
  private time = 0;
  /** «Все уставились»: мобы рядом с этой точкой замирают и смотрят на неё (жуткое событие). */
  private stareAt: THREE.Vector3 | null = null;
  private stareUntil = 0;

  constructor(
    private readonly scene: THREE.Scene,
    private readonly items: ItemMeshes,
    private readonly world: World,
    private readonly particles: Particles,
    private readonly lightFn: LightFn,
  ) {}

  get count(): number {
    return this.visuals.size;
  }

  get(id: number): Visual | undefined {
    return this.visuals.get(id);
  }

  spawn(info: EntityInfo): void {
    const existing = this.visuals.get(info.id);
    if (existing) {
      // Повторный спаун — обновление (например, предметы слились в стопку).
      if (info.item && existing.info.item && (info.item.count !== existing.info.item.count || info.item.id !== existing.info.item.id)) {
        existing.info.item = info.item;
      }
      existing.target.set(...info.p);
      return;
    }
    const light = { value: new THREE.Vector3(1, 1, 1) };
    let object: THREE.Object3D;
    let mob: MobModel | undefined;
    let item: ItemModel | undefined;
    let extra: ItemModel | undefined;
    let flash: THREE.Mesh | undefined;
    switch (info.kind) {
      case 'mob': {
        mob = createMobModel(info.type as MobType);
        object = mob.group;
        applyEntityLight(object, light);
        break;
      }
      case 'item': {
        const id = info.item?.id ?? Block.STONE;
        item = this.items.create(id);
        const holder = new THREE.Group();
        const flat = this.items.isFlat(id);
        item.object.scale.setScalar(flat ? 0.42 : 0.26);
        item.object.position.y = flat ? 0.22 : 0.16;
        holder.add(item.object);
        // Несколько предметов в стопке — две копии.
        if ((info.item?.count ?? 1) > 1) {
          extra = this.items.create(id);
          extra.object.scale.copy(item.object.scale);
          extra.object.position.set(0.06, item.object.position.y + 0.04, 0.05);
          holder.add(extra.object);
        }
        object = holder;
        break;
      }
      case 'tnt':
      case 'falling': {
        const state = info.kind === 'tnt' ? Block.TNT : (info.state ?? Block.SAND);
        item = this.items.create(typeOf(state), state);
        const holder = new THREE.Group();
        item.object.position.y = 0.5;
        holder.add(item.object);
        if (info.kind === 'tnt') {
          flash = new THREE.Mesh(new THREE.BoxGeometry(1.01, 1.01, 1.01), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0 }));
          flash.position.y = 0.5;
          holder.add(flash);
        }
        object = holder;
        break;
      }
      default: {
        // Стрела: древко и оперение.
        const g = new THREE.Group();
        const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.55), new THREE.MeshLambertMaterial({ color: '#8b6a3e' }));
        const tip = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.08), new THREE.MeshLambertMaterial({ color: '#9a9a9a' }));
        tip.position.z = -0.3;
        const fletch = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.12), new THREE.MeshLambertMaterial({ color: '#e8e8e8' }));
        fletch.position.z = 0.25;
        g.add(shaft, tip, fletch);
        applyEntityLight(g, light);
        object = g;
      }
    }
    object.position.set(...info.p);
    this.scene.add(object);
    this.visuals.set(info.id, {
      info,
      object,
      target: new THREE.Vector3(...info.p),
      targetYaw: info.yaw,
      targetPitch: info.pitch ?? 0,
      yaw: info.yaw,
      pitch: info.pitch ?? 0,
      flags: info.flags ?? 0,
      mob,
      item,
      extra,
      light,
      walkPhase: 0,
      walkAmount: 0,
      attackTime: Infinity,
      fuse: 0,
      fuseActive: false,
      death: 0,
      hurt: 0,
      spawnTime: this.time,
      flash,
    });
  }

  /** Пакет движения: id, x, y, z, yaw, pitch, флаги. */
  move(d: number[]): void {
    for (let i = 0; i + 6 < d.length; i += 7) {
      const v = this.visuals.get(d[i]);
      if (!v) continue;
      v.target.set(d[i + 1], d[i + 2], d[i + 3]);
      v.targetYaw = d[i + 4];
      v.targetPitch = d[i + 5];
      const flags = d[i + 6];
      if (flags & ENTITY_FLAG_HURT && !(v.flags & ENTITY_FLAG_HURT)) v.hurt = 0.4;
      if (flags & ENTITY_FLAG_ATTACK && !(v.flags & ENTITY_FLAG_ATTACK)) v.attackTime = 0;
      v.flags = flags;
      if (v.info.kind === 'tnt') v.fuse = flags / 10;
    }
  }

  event(id: number, ev: string, value?: number): void {
    const v = this.visuals.get(id);
    if (!v) return;
    if (ev === 'hurt') v.hurt = 0.4;
    else if (ev === 'death') {
      v.hurt = 0.4;
      v.death = 0.0001;
    } else if (ev === 'attack') v.attackTime = 0;
    else if (ev === 'fuse') v.fuseActive = value === 1;
  }

  remove(ids: number[], collector?: () => THREE.Vector3): void {
    for (const id of ids) {
      const v = this.visuals.get(id);
      if (!v) continue;
      if (collector && v.info.kind === 'item') {
        v.pickup = { to: collector, t: 0 };
        continue;
      }
      if (v.info.kind === 'mob' && v.death > 0) {
        const [w, h] = MOB_SIZE[v.info.type as MobType] ?? [0.6, 1];
        this.particles.puff(v.object.position.x, v.object.position.y + h / 2, v.object.position.z, 14, w, [0.8, 0.8, 0.8], 1.5);
      }
      this.dispose(id, v);
    }
  }

  private dispose(id: number, v: Visual): void {
    this.scene.remove(v.object);
    v.mob?.dispose();
    v.item?.dispose();
    v.extra?.dispose();
    // Свои меши (стрела, вспышка динамита) освобождаем сами; модели предметов и мобов — их владельцы.
    const owned = new Set<THREE.Object3D>();
    if (v.item) v.item.object.traverse((o) => owned.add(o));
    if (v.extra) v.extra.object.traverse((o) => owned.add(o));
    v.object.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh && !v.mob && !owned.has(m)) {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      }
    });
    this.visuals.delete(id);
  }

  clear(): void {
    for (const [id, v] of this.visuals) this.dispose(id, v);
  }

  /** Мобы в радиусе 32 блоков на seconds секунд замирают и смотрят на точку (глаза игрока). */
  stare(at: THREE.Vector3, seconds: number): void {
    this.stareAt = at;
    this.stareUntil = this.time + seconds;
  }

  /** Сколько живых мобов в радиусе r от точки. */
  mobsNear(at: THREE.Vector3, r: number): number {
    let n = 0;
    for (const v of this.visuals.values()) if (v.info.kind === 'mob' && v.death === 0 && v.object.position.distanceToSquared(at) < r * r) n++;
    return n;
  }

  update(dt: number): void {
    this.time += dt;
    const tmp = new THREE.Vector3();
    for (const [id, v] of this.visuals) {
      const pos = v.object.position;
      if (v.pickup) {
        v.pickup.t += dt / 0.15;
        pos.lerp(v.pickup.to(), Math.min(1, v.pickup.t));
        if (v.pickup.t >= 1) this.dispose(id, v);
        continue;
      }
      const prevX = pos.x;
      const prevZ = pos.z;
      const at = this.stareAt;
      const staring = at !== null && this.time < this.stareUntil && v.info.kind === 'mob' && v.death === 0 && pos.distanceToSquared(at) < 32 * 32;
      let lookUp = 0;
      if (staring) {
        // Замер на месте и медленно повернулся к игроку; голова смотрит прямо на него.
        const dx = at.x - pos.x;
        const dz = at.z - pos.z;
        v.yaw += shortestAngle(Math.atan2(-dx, -dz) - v.yaw) * (1 - Math.exp(-dt * 2.5));
        v.pitch += shortestAngle(0 - v.pitch) * (1 - Math.exp(-dt * 5));
        lookUp = Math.atan2(at.y - (pos.y + (v.mob?.height ?? 1) * 0.85), Math.hypot(dx, dz));
      } else {
        if (pos.distanceToSquared(v.target) > 64) pos.copy(v.target);
        else pos.lerp(v.target, 1 - Math.exp(-dt * 12));
        v.yaw += shortestAngle(v.targetYaw - v.yaw) * (1 - Math.exp(-dt * 10));
        v.pitch += shortestAngle(v.targetPitch - v.pitch) * (1 - Math.exp(-dt * 10));
      }

      // Свет в клетке сущности.
      const lb = this.world.getLight(Math.floor(pos.x), Math.floor(pos.y + 0.5), Math.floor(pos.z));
      this.lightFn(lb, v.light.value);
      if (v.item) {
        v.item.light.set((lb >> 4) / 15, (lb & 15) / 15);
        v.item.color.value.copy(v.light.value);
        if (v.extra) {
          v.extra.light.copy(v.item.light);
          v.extra.color.value.copy(v.light.value);
        }
      }

      switch (v.info.kind) {
        case 'mob': {
          const moved = Math.hypot(pos.x - prevX, pos.z - prevZ);
          v.walkPhase += moved;
          v.walkAmount += (Math.min(1, moved / Math.max(dt, 1e-3) / 3) - v.walkAmount) * Math.min(1, dt * 8);
          v.hurt = Math.max(0, v.hurt - dt);
          v.attackTime += dt;
          if (v.death > 0) v.death = Math.min(1, v.death + dt);
          if (v.fuseActive) v.fuse = Math.min(1, v.fuse + dt / 1.5);
          else v.fuse = Math.max(0, v.fuse - dt / 1.5);
          v.object.rotation.y = v.yaw;
          v.mob!.update(dt, {
            walkPhase: v.walkPhase,
            walkAmount: v.walkAmount,
            headYaw: v.pitch,
            headPitch: lookUp,
            attackTime: v.attackTime,
            fuse: v.fuse,
            sheared: (v.flags & ENTITY_FLAG_SHEARED) !== 0,
            hurt: v.hurt > 0,
            death: v.death,
            time: this.time,
          });
          if (v.flags & ENTITY_FLAG_BURNING && Math.random() < dt * 20) {
            const [w, h] = MOB_SIZE[v.info.type as MobType];
            this.particles.puff(pos.x, pos.y + Math.random() * h, pos.z, 1, w, [2.4, 1.1, 0.3], 0.8);
          }
          break;
        }
        case 'item': {
          const age = this.time - v.spawnTime;
          const child = v.object.children;
          for (const c of child) c.rotation.y = age * 1.6;
          v.object.position.y = pos.y + Math.sin(age * 2.5) * 0.06;
          pos.y = v.object.position.y;
          v.object.position.y = v.target.y + (pos.y - v.target.y);
          break;
        }
        case 'tnt': {
          v.fuse = Math.max(0, v.fuse - dt);
          if (v.flash) {
            const blink = Math.floor(v.fuse * (v.fuse < 1 ? 10 : 4)) % 2 === 0;
            (v.flash.material as THREE.MeshBasicMaterial).opacity = blink ? 0.55 : 0;
            const s = 1 + (v.fuse < 0.4 ? (0.4 - v.fuse) * 0.6 : 0);
            v.object.scale.setScalar(s);
          }
          if (Math.random() < dt * 30) this.particles.puff(pos.x, pos.y + 1.1, pos.z, 1, 0.1, [0.5, 0.5, 0.5], 0.5);
          break;
        }
        case 'arrow':
          v.object.rotation.set(v.pitch, v.yaw, 0, 'YXZ');
          break;
        default:
          break;
      }
      void tmp;
    }
  }

  /** Луч против хитбоксов мобов — для атаки. */
  raycast(origin: THREE.Vector3, dir: THREE.Vector3, maxDist: number): { id: number; dist: number } | null {
    let best: { id: number; dist: number } | null = null;
    for (const [id, v] of this.visuals) {
      if (v.info.kind !== 'mob' || v.death > 0) continue;
      const [w, h] = MOB_SIZE[v.info.type as MobType] ?? [0.6, 1.8];
      const p = v.object.position;
      const t = rayBox(origin, dir, p.x - w / 2, p.y, p.z - w / 2, p.x + w / 2, p.y + h, p.z + w / 2);
      if (t !== null && t <= maxDist && (!best || t < best.dist)) best = { id, dist: t };
    }
    return best;
  }

  /** Мобы, чьи хитбоксы пересекают клетку (нельзя поставить блок внутрь моба). */
  blocksCell(x: number, y: number, z: number): boolean {
    for (const v of this.visuals.values()) {
      if (v.info.kind !== 'mob' || v.death > 0) continue;
      const [w, h] = MOB_SIZE[v.info.type as MobType] ?? [0.6, 1.8];
      const p = v.object.position;
      if (p.x + w / 2 > x && p.x - w / 2 < x + 1 && p.y + h > y && p.y < y + 1 && p.z + w / 2 > z && p.z - w / 2 < z + 1) return true;
    }
    return false;
  }

  isMob(id: number): MobType | null {
    const v = this.visuals.get(id);
    return v?.info.kind === 'mob' ? (v.info.type as MobType) : null;
  }

  /** Номер текстуры для частиц предмета. */
  static particleLayer(itemId: number): number {
    return isBlockItem(itemId) ? FACE_TILE[itemId * 384] : -1;
  }
}

/** Пересечение луча с AABB (метод плит). */
export function rayBox(o: THREE.Vector3, d: THREE.Vector3, x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): number | null {
  let tmin = 0;
  let tmax = Infinity;
  const lo = [x0, y0, z0];
  const hi = [x1, y1, z1];
  const oo = [o.x, o.y, o.z];
  const dd = [d.x, d.y, d.z];
  for (let a = 0; a < 3; a++) {
    if (Math.abs(dd[a]) < 1e-9) {
      if (oo[a] < lo[a] || oo[a] > hi[a]) return null;
      continue;
    }
    let t1 = (lo[a] - oo[a]) / dd[a];
    let t2 = (hi[a] - oo[a]) / dd[a];
    if (t1 > t2) [t1, t2] = [t2, t1];
    tmin = Math.max(tmin, t1);
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return null;
  }
  return tmin;
}
