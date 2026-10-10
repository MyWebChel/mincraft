import { Block, makeState, metaOf, typeOf } from '../src/shared/blocks';
import { emptySlots, sanitizeStack, type ItemStack } from '../src/shared/inventory';
import { Item, maxStackOf } from '../src/shared/items';
import type { ContainerKind, ContainerState, ServerMessage } from '../src/shared/protocol';
import { SMELT_TIME, SMELTING, fuelTicks } from '../src/shared/recipes';
import type { ServerWorld } from './server-world';
import type { SavedContainer, WorldStore } from './world-store';

const cidOf = (x: number, y: number, z: number) => `${x},${y},${z}`;

/** Сундуки и печи: содержимое хранится на сервере и видно всем игрокам. */
export class Containers {
  private readonly viewers = new Map<string, Set<number>>();
  private tickNo = 0;

  constructor(
    private readonly store: WorldStore,
    private readonly world: ServerWorld,
    private readonly send: (playerId: number, msg: ServerMessage) => void,
    private readonly drop: (x: number, y: number, z: number, items: ItemStack[]) => void,
  ) {}

  private ensure(x: number, y: number, z: number, kind: ContainerKind): SavedContainer {
    const cid = cidOf(x, y, z);
    let c = this.store.containers.get(cid);
    if (!c || c.kind !== kind) {
      c = { kind, slots: emptySlots(kind === 'chest' ? 27 : 3), burn: 0, burnMax: 0, cook: 0 };
      this.store.containers.set(cid, c);
      this.store.markDirty();
    }
    return c;
  }

  /** Новый блок-контейнер поставлен в мир. */
  placed(x: number, y: number, z: number, type: number): void {
    if (type === Block.CHEST) this.ensure(x, y, z, 'chest');
    else if (type === Block.FURNACE) this.ensure(x, y, z, 'furnace');
  }

  private state(cid: string, c: SavedContainer): ContainerState {
    return { cid, kind: c.kind, slots: c.slots, burn: c.burn, burnMax: c.burnMax, cook: c.cook };
  }

  open(playerId: number, x: number, y: number, z: number): boolean {
    const t = typeOf(this.world.getState(x, y, z));
    const kind: ContainerKind | null = t === Block.CHEST ? 'chest' : t === Block.FURNACE || t === Block.LIT_FURNACE ? 'furnace' : null;
    if (!kind) return false;
    this.close(playerId);
    const cid = cidOf(x, y, z);
    const c = this.ensure(x, y, z, kind);
    let set = this.viewers.get(cid);
    if (!set) this.viewers.set(cid, (set = new Set()));
    set.add(playerId);
    this.send(playerId, { t: 'container', c: this.state(cid, c) });
    return true;
  }

  close(playerId: number): void {
    for (const [cid, set] of this.viewers) {
      set.delete(playerId);
      if (!set.size) this.viewers.delete(cid);
    }
  }

  setSlot(playerId: number, cid: string, slot: number, raw: unknown): void {
    if (!this.viewers.get(cid)?.has(playerId)) return;
    const c = this.store.containers.get(cid);
    if (!c || !Number.isInteger(slot) || slot < 0 || slot >= c.slots.length) return;
    const item = raw === null ? null : sanitizeStack(raw);
    c.slots[slot] = item;
    this.store.markDirty();
    for (const id of this.viewers.get(cid) ?? []) if (id !== playerId) this.send(id, { t: 'containerSlot', cid, slot, item });
  }

  /** Блок контейнера исчез: содержимое выпадает, окна закрываются. */
  removed(x: number, y: number, z: number): void {
    const cid = cidOf(x, y, z);
    const c = this.store.containers.get(cid);
    if (!c) return;
    this.drop(
      x + 0.5,
      y + 0.5,
      z + 0.5,
      c.slots.filter((s): s is ItemStack => !!s),
    );
    this.store.containers.delete(cid);
    this.store.markDirty();
    for (const id of this.viewers.get(cid) ?? []) this.send(id, { t: 'containerClosed', cid });
    this.viewers.delete(cid);
  }

  /** Работа печей: топливо, прогресс плавки, горящая/холодная печь. */
  tick(): void {
    this.tickNo++;
    for (const [cid, c] of this.store.containers) {
      if (c.kind !== 'furnace') continue;
      const [x, y, z] = cid.split(',').map(Number);
      if (!this.world.isLoaded(x >> 4, z >> 4)) continue;
      const [input, fuel, out] = c.slots;
      const result = input ? SMELTING[input.id] : undefined;
      const canSmelt = !!result && (!out || (out.id === result.id && out.count + result.count <= maxStackOf(out.id)));
      let slotsChanged = false;
      const wasBurning = c.burn > 0;
      if (c.burn > 0) c.burn--;
      if (c.burn <= 0 && canSmelt && fuel && fuelTicks(fuel.id) > 0) {
        c.burn = c.burnMax = fuelTicks(fuel.id);
        if (fuel.id === Item.LAVA_BUCKET) c.slots[1] = { id: Item.BUCKET, count: 1 };
        else c.slots[1] = fuel.count > 1 ? { ...fuel, count: fuel.count - 1 } : null;
        slotsChanged = true;
      }
      if (c.burn > 0 && canSmelt) {
        c.cook++;
        if (c.cook >= SMELT_TIME) {
          c.cook = 0;
          c.slots[0] = input!.count > 1 ? { ...input!, count: input!.count - 1 } : null;
          c.slots[2] = out ? { ...out, count: out.count + result!.count } : { ...result! };
          slotsChanged = true;
        }
      } else if (c.cook > 0) c.cook = Math.max(0, c.cook - 2);

      const burning = c.burn > 0;
      if (burning !== wasBurning) {
        const st = this.world.getState(x, y, z);
        const t = typeOf(st);
        if (t === Block.FURNACE || t === Block.LIT_FURNACE) this.world.setState(x, y, z, makeState(burning ? Block.LIT_FURNACE : Block.FURNACE, metaOf(st)), false);
      }
      if (burning || slotsChanged || c.cook > 0) this.store.markDirty();
      const viewers = this.viewers.get(cid);
      if (!viewers) continue;
      if (slotsChanged) for (const id of viewers) for (let i = 0; i < 3; i++) this.send(id, { t: 'containerSlot', cid, slot: i, item: c.slots[i] });
      if (this.tickNo % 4 === 0 || slotsChanged) for (const id of viewers) this.send(id, { t: 'containerProgress', cid, burn: c.burn, burnMax: c.burnMax, cook: c.cook });
    }
  }
}
