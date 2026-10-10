import * as THREE from 'three';
import { itemDef } from '../shared/items';
import type { ItemMeshes, ItemModel } from './render/items3d';
import { applyEntityLight } from './render/materials';

const SKIN = '#e0ac80';
const HAIR = '#4a2f1b';
const PANTS = '#2c3e7a';

function pixelTexture(draw: (ctx: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 8;
  const ctx = canvas.getContext('2d')!;
  draw(ctx);
  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const px = (ctx: CanvasRenderingContext2D, color: string, x: number, y: number, w = 1, h = 1) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

let faceTextures: { face: THREE.Texture; side: THREE.Texture } | null = null;
function headTextures() {
  if (faceTextures) return faceTextures;
  const face = pixelTexture((ctx) => {
    px(ctx, SKIN, 0, 0, 8, 8);
    px(ctx, HAIR, 0, 0, 8, 2);
    px(ctx, HAIR, 0, 2, 1, 1);
    px(ctx, HAIR, 7, 2, 1, 1);
    px(ctx, '#ffffff', 1, 4);
    px(ctx, '#3b5bb5', 2, 4);
    px(ctx, '#3b5bb5', 5, 4);
    px(ctx, '#ffffff', 6, 4);
    px(ctx, '#b07850', 3, 5, 2, 1);
    px(ctx, '#8a4b3a', 3, 6, 2, 1);
  });
  const side = pixelTexture((ctx) => {
    px(ctx, SKIN, 0, 0, 8, 8);
    px(ctx, HAIR, 0, 0, 8, 3);
    px(ctx, HAIR, 4, 3, 4, 1);
  });
  faceTextures = { face, side };
  return faceTextures;
}

function limb(w: number, h: number, d: number, material: THREE.Material, pivotY: number, x: number): THREE.Group {
  const pivot = new THREE.Group();
  pivot.position.set(x, pivotY, 0);
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.y = -h / 2;
  pivot.add(mesh);
  return pivot;
}

function nameTag(name: string, color: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const font = '600 40px "Pixelify Sans", monospace';
  ctx.font = font;
  const w = Math.ceil(ctx.measureText(name).width) + 24;
  canvas.width = w;
  canvas.height = 56;
  ctx.font = font;
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(0, 0, w, 56);
  ctx.fillStyle = color;
  ctx.fillRect(0, 52, w, 4);
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, 12, 28);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true, toneMapped: false }));
  sprite.scale.set((0.32 * w) / 56, 0.32, 1);
  sprite.position.y = 2.25;
  sprite.renderOrder = 10;
  return sprite;
}

/** Модель другого игрока: блочный человечек с ником, предметом в руке и бронёй. */
export class Avatar {
  readonly group = new THREE.Group();
  readonly target = new THREE.Vector3();
  readonly light = { value: new THREE.Vector3(1, 1, 1) };
  sneaking = false;
  sleeping = false;
  private targetYaw = 0;
  private targetPitch = 0;
  private yaw = 0;
  private walkPhase = 0;
  private swingTime = 1;
  private readonly body = new THREE.Group();
  private readonly head: THREE.Group;
  private readonly torso: THREE.Mesh;
  private readonly arms: THREE.Group[];
  private readonly legs: THREE.Group[];
  private readonly tag: THREE.Sprite;
  private readonly materials: THREE.Material[] = [];
  private held: ItemModel | null = null;
  private heldId = 0;
  private armorMeshes: THREE.Mesh[] = [];
  private armorIds: number[] = [0, 0, 0, 0];

  constructor(
    readonly name: string,
    color: string,
    p: [number, number, number],
    private readonly items: ItemMeshes,
  ) {
    const mat = (opts: THREE.MeshLambertMaterialParameters) => {
      const m = new THREE.MeshLambertMaterial(opts);
      this.materials.push(m);
      return m;
    };
    const shirt = mat({ color });
    const pants = mat({ color: PANTS });
    const skin = mat({ color: SKIN });
    const { face, side } = headTextures();

    this.body.scale.setScalar(0.9);
    this.group.add(this.body);

    this.torso = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.75, 0.25), shirt);
    this.torso.position.y = 1.125;
    this.body.add(this.torso);

    this.head = new THREE.Group();
    this.head.position.y = 1.5;
    // Порядок граней BoxGeometry: +X, -X, +Y, -Y, +Z (затылок), -Z (лицо).
    const headMats = [mat({ map: side }), mat({ map: side }), mat({ color: HAIR }), mat({ color: SKIN }), mat({ color: HAIR }), mat({ map: face })];
    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), headMats);
    headMesh.position.y = 0.25;
    this.head.add(headMesh);
    this.body.add(this.head);

    this.arms = [limb(0.25, 0.75, 0.25, shirt, 1.5, 0.375), limb(0.25, 0.75, 0.25, shirt, 1.5, -0.375)];
    for (const arm of this.arms) {
      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.251, 0.2, 0.251), skin);
      hand.position.y = -0.65;
      arm.add(hand);
    }
    this.legs = [limb(0.25, 0.75, 0.25, pants, 0.75, 0.125), limb(0.25, 0.75, 0.25, pants, 0.75, -0.125)];
    this.body.add(...this.arms, ...this.legs);

    this.tag = nameTag(name, color);
    this.group.add(this.tag);
    applyEntityLight(this.body, this.light);

    this.target.set(...p);
    this.group.position.copy(this.target);
  }

  setTarget(x: number, y: number, z: number, yaw: number, pitch: number): void {
    this.target.set(x, y, z);
    this.targetYaw = yaw;
    this.targetPitch = pitch;
  }

  swing(): void {
    this.swingTime = 0;
  }

  /** Предмет в правой руке. */
  setHeld(id: number): void {
    if (id === this.heldId) return;
    this.heldId = id;
    if (this.held) {
      this.held.object.removeFromParent();
      this.held.dispose();
      this.held = null;
    }
    if (!id) return;
    this.held = this.items.create(id);
    const o = this.held.object;
    const flat = this.items.isFlat(id);
    o.scale.setScalar(flat ? 0.55 : 0.3);
    o.position.set(0, -0.72, flat ? -0.12 : -0.08);
    o.rotation.set(flat ? -Math.PI / 2 : 0, flat ? Math.PI / 2 : Math.PI / 4, 0);
    this.arms[0].add(o);
  }

  /** Броня: цветные «чехлы» поверх частей тела. */
  setArmor(ids: number[]): void {
    if (ids.every((id, i) => id === this.armorIds[i])) return;
    this.armorIds = [...ids];
    for (const m of this.armorMeshes) {
      m.removeFromParent();
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    }
    this.armorMeshes = [];
    const add = (parent: THREE.Object3D, w: number, h: number, d: number, y: number, color: string) => {
      const m = new THREE.MeshLambertMaterial({ color });
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      mesh.position.y = y;
      parent.add(mesh);
      this.armorMeshes.push(mesh);
    };
    const color = (id: number) => itemDef(id)?.armor?.color ?? '#cccccc';
    if (ids[0]) add(this.head, 0.58, 0.58, 0.58, 0.25, color(ids[0]));
    if (ids[1]) {
      add(this.torso, 0.56, 0.8, 0.31, 0, color(ids[1]));
      for (const arm of this.arms) add(arm, 0.31, 0.4, 0.31, -0.18, color(ids[1]));
    }
    if (ids[2]) for (const leg of this.legs) add(leg, 0.29, 0.5, 0.29, -0.28, color(ids[2]));
    if (ids[3]) for (const leg of this.legs) add(leg, 0.3, 0.22, 0.3, -0.66, color(ids[3]));
    applyEntityLight(this.body, this.light);
  }

  update(dt: number): void {
    const pos = this.group.position;
    const prevX = pos.x;
    const prevZ = pos.z;
    if (pos.distanceToSquared(this.target) > 64) pos.copy(this.target);
    else pos.lerp(this.target, 1 - Math.exp(-dt * 14));

    let dYaw = this.targetYaw - this.yaw;
    dYaw = Math.atan2(Math.sin(dYaw), Math.cos(dYaw));
    this.yaw += dYaw * (1 - Math.exp(-dt * 14));
    this.group.rotation.y = this.yaw;
    this.head.rotation.x += (this.targetPitch - this.head.rotation.x) * (1 - Math.exp(-dt * 14));

    const moved = Math.hypot(pos.x - prevX, pos.z - prevZ);
    const speed = dt > 0 ? moved / dt : 0;
    this.walkPhase += moved * 2.6;
    const amount = Math.min(1, speed / 4);
    const swing = Math.sin(this.walkPhase) * 0.8 * amount;
    this.legs[0].rotation.x = swing;
    this.legs[1].rotation.x = -swing;
    this.arms[0].rotation.x = -swing * 0.8;
    this.arms[1].rotation.x = swing * 0.8;

    // Взмах правой рукой (удар, установка блока).
    this.swingTime = Math.min(1, this.swingTime + dt / 0.3);
    if (this.swingTime < 1) this.arms[0].rotation.x = -Math.sin(this.swingTime * Math.PI) * 1.6;
    if (this.heldId && this.swingTime >= 1) this.arms[0].rotation.x -= 0.3;

    // Присед: наклон корпуса.
    this.body.rotation.x = 0;
    this.body.position.set(0, 0, 0);
    this.torso.rotation.x = this.sneaking ? 0.45 : 0;
    this.head.position.y = this.sneaking ? 1.38 : 1.5;
    this.tag.position.y = this.sneaking ? 2.0 : 2.25;
    if (this.sleeping) {
      this.body.rotation.x = -Math.PI / 2;
      this.body.position.set(0, 0.3, 0.9);
    }
    if (this.held) {
      this.held.color.value.copy(this.light.value);
      this.held.light.set(1, 0);
    }
  }

  dispose(): void {
    this.group.traverse((o) => {
      if (o instanceof THREE.Mesh && !this.held?.object.getObjectById(o.id)) o.geometry.dispose();
    });
    this.held?.dispose();
    for (const m of this.materials) m.dispose();
    for (const m of this.armorMeshes) (m.material as THREE.Material).dispose();
    this.tag.material.map?.dispose();
    this.tag.material.dispose();
  }
}
