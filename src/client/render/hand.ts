import * as THREE from 'three';
import { isBlockItem } from '../../shared/items';
import type { ItemMeshes, ItemModel } from './items3d';
import { applyEntityLight } from './materials';

const SKIN = '#e0ac80';
// Рука тянется из правого нижнего угла вперёд и чуть влево, как в оригинале.
const ARM_POSE = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-0.36, 0.3, -0.88).normalize());

export interface HandState {
  /** Скорость ходьбы (для покачивания). */
  speed: number;
  /** Свет в точке игрока: небо и блоки (0..1). */
  sky: number;
  block: number;
  /** Цвет освещения сущностей (общий расчёт с миром). */
  lightColor: THREE.Vector3;
  /** 0..1 — прогресс поедания. */
  eating: number;
  /** 0..1 — натяжение лука. */
  bowDraw: number;
  /** Ломаем блок (рука машет без остановки). */
  mining: boolean;
}

/** Рука и предмет в руке от первого лица. */
export class FirstPersonHand {
  private readonly root = new THREE.Group();
  private readonly arm: THREE.Mesh;
  private readonly armLight = { value: new THREE.Vector3(1, 1, 1) };
  private item: ItemModel | null = null;
  private itemId = -1;
  private swingTime = 1;
  private equip = 1;
  private bob = 0;

  constructor(
    scene: THREE.Scene,
    private readonly meshes: ItemMeshes,
    shirt: string,
  ) {
    scene.add(new THREE.AmbientLight('#ffffff', Math.PI * 0.75));
    const sun = new THREE.DirectionalLight('#ffffff', Math.PI * 0.55);
    sun.position.set(-0.5, 1, 0.6);
    scene.add(sun);

    const skin = new THREE.MeshLambertMaterial({ color: SKIN });
    const sleeve = new THREE.MeshLambertMaterial({ color: shirt });
    this.arm = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.75, 0.25), skin);
    const cuff = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.3, 0.27), sleeve);
    cuff.position.y = -0.24;
    this.arm.add(cuff);
    applyEntityLight(this.arm, this.armLight);
    scene.add(this.root);
  }

  swing(): void {
    if (this.swingTime > 0.5) this.swingTime = 0;
  }

  setItem(id: number | null): void {
    const want = id ?? 0;
    if (want === this.itemId) return;
    this.itemId = want;
    this.equip = 0;
    this.root.clear();
    this.item?.dispose();
    this.item = null;
    if (!want) {
      this.root.add(this.arm);
      return;
    }
    this.item = this.meshes.create(want, undefined, true);
    this.root.add(this.item.object);
  }

  update(dt: number, s: HandState): void {
    this.swingTime = Math.min(1, this.swingTime + dt / 0.3);
    if (s.mining && this.swingTime >= 1) this.swingTime = 0;
    this.equip = Math.min(1, this.equip + dt / 0.2);
    if (s.speed > 0.1) this.bob += dt * s.speed * 2.2;
    const amp = Math.min(1, s.speed / 4.3);

    const p = this.swingTime;
    const sp = Math.sin(Math.sqrt(p) * Math.PI);
    const sp2 = Math.sin(p * p * Math.PI);
    const bobX = Math.sin(this.bob) * 0.025 * amp;
    const bobY = -Math.abs(Math.cos(this.bob)) * 0.03 * amp;
    const lower = (1 - this.equip) * 0.6;

    const flat = this.itemId ? this.meshes.isFlat(this.itemId) : false;
    const o = this.root;
    o.rotation.set(0, 0, 0);
    o.scale.setScalar(1);
    if (!this.itemId) {
      // Голая рука.
      o.position.set(0.5 + bobX - sp * 0.25, -0.5 + bobY - lower + Math.sin(Math.sqrt(p) * Math.PI * 2) * 0.1, -0.56 - sp * 0.2);
      o.rotation.set(-sp * 0.7, -sp2 * 0.3, sp * 0.25);
      this.arm.position.set(0, 0, 0);
      this.arm.quaternion.copy(ARM_POSE);
    } else if (flat) {
      // Инструменты и плоские предметы держатся под углом.
      o.position.set(0.5 + bobX - sp * 0.25, -0.38 + bobY - lower + Math.sin(Math.sqrt(p) * Math.PI * 2) * 0.12, -0.62 - sp * 0.2);
      o.rotation.set(-sp * 1.2, -1.3 + sp2 * 0.4, 0.35);
      o.scale.setScalar(0.62);
    } else {
      // Блок в руке.
      o.position.set(0.48 + bobX - sp * 0.25, -0.42 + bobY - lower + Math.sin(Math.sqrt(p) * Math.PI * 2) * 0.1, -0.68 - sp * 0.15);
      o.rotation.set(-sp * 0.8, 0.78, 0);
      o.scale.setScalar(0.4);
    }
    if (s.eating > 0) {
      // Подносим еду ко рту и «жуём».
      const e = Math.min(1, s.eating * 4);
      o.position.x -= 0.32 * e;
      o.position.y += 0.18 * e + Math.abs(Math.sin(s.eating * 40)) * 0.03;
      o.rotation.y += 0.5 * e;
    }
    if (s.bowDraw > 0) {
      o.position.x -= 0.28 * Math.min(1, s.bowDraw * 3);
      o.position.z += 0.1 * s.bowDraw;
      o.rotation.y += 0.6;
      if (s.bowDraw >= 1) o.position.y += Math.sin(performance.now() * 0.05) * 0.004;
    }

    // Освещение: та же формула, что для сущностей в мире.
    if (this.item) {
      this.item.light.set(s.sky, s.block);
      this.item.color.value.copy(s.lightColor);
    }
    this.armLight.value.copy(s.lightColor);
  }

  get isBlockInHand(): boolean {
    return this.itemId > 0 && isBlockItem(this.itemId) && !this.meshes.isFlat(this.itemId);
  }
}
