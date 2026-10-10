import * as THREE from 'three';
import { SHAPE, S_CROP, S_CROSS, S_LADDER, S_TORCH, makeState, FACE_TILE } from '../../shared/blocks';
import { isBlockItem, itemDef } from '../../shared/items';
import { meshSingleBlock, type MeshData } from '../mesher';
import type { Tile } from '../pixelart';
import { itemTile, type Atlas } from '../textures';
import { applyEntityLight, type TerrainMaterials } from './materials';

/**
 * 3D-модели предметов: блоки — маленькими кубиками с текстурами блока,
 * остальные предметы — «выдавленными» пиксельными спрайтами, как в Minecraft.
 */
export interface ItemModel {
  object: THREE.Object3D;
  /** Свет в точке предмета: x — небо, y — блоки (0..1). */
  light: THREE.Vector2;
  /** Цвет освещения для спрайтовых предметов. */
  color: { value: THREE.Vector3 };
  dispose(): void;
}

function geometryFromMeshData(md: MeshData): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  g.setAttribute('aPos', new THREE.BufferAttribute(md.pos, 4));
  g.setAttribute('aData', new THREE.BufferAttribute(md.data, 4));
  g.setIndex(new THREE.BufferAttribute(md.index, 1));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0.5, 1.5, 0.5), 1.2);
  return g;
}

/** Выдавленная геометрия спрайта: каждый непрозрачный пиксель — кубик 1/16 с цветом пикселя. */
function extrudeSprite(tile: Tile): THREE.BufferGeometry {
  const pos: number[] = [];
  const nor: number[] = [];
  const col: number[] = [];
  const c = new THREE.Color();
  const W = tile.width;
  const H = tile.height;
  const opaque = (x: number, y: number) => x >= 0 && y >= 0 && x < W && y < H && tile.getAlpha(x, y) > 127;
  const px = 1 / 16;
  const depth = px;
  const quad = (a: number[], b: number[], cc: number[], d: number[], n: number[]) => {
    for (const v of [a, b, cc, a, cc, d]) {
      pos.push(...v);
      nor.push(...n);
      col.push(c.r, c.g, c.b);
    }
  };
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (!opaque(x, y)) continue;
      const [r, g, b] = tile.get(x, y);
      c.setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
      const x0 = x * px - 0.5;
      const x1 = x0 + px;
      const y1 = 0.5 - y * px;
      const y0 = y1 - px;
      const z0 = -depth / 2;
      const z1 = depth / 2;
      quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1]);
      quad([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [0, 0, -1]);
      if (!opaque(x - 1, y)) quad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [-1, 0, 0]);
      if (!opaque(x + 1, y)) quad([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [1, 0, 0]);
      if (!opaque(x, y - 1)) quad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], [0, 1, 0]);
      if (!opaque(x, y + 1)) quad([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0]);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.computeBoundingSphere();
  return g;
}

export class ItemMeshes {
  /** Геометрия блоков-предметов по состоянию блока: по одной на слой (непрозрачный, «дырявый», полупрозрачный). */
  private readonly blockGeo = new Map<number, THREE.BufferGeometry[]>();
  private readonly spriteGeo = new Map<string, THREE.BufferGeometry>();

  constructor(
    private readonly atlas: Atlas,
    private materials: TerrainMaterials,
  ) {}

  setMaterials(m: TerrainMaterials): void {
    this.materials = m;
  }

  /** Плоский ли предмет (спрайт), а не кубик. */
  isFlat(id: number): boolean {
    if (!isBlockItem(id)) return true;
    const shape = SHAPE[id];
    return shape === S_CROSS || shape === S_CROP || shape === S_TORCH || shape === S_LADDER;
  }

  private spriteFor(id: number): Tile {
    const def = itemDef(id);
    if (isBlockItem(id)) return this.atlas.tiles[FACE_TILE[id * 384]];
    return itemTile(def?.sprite ?? 'stick');
  }

  /** hand — для руки от первого лица (без тумана и теней мира). */
  create(id: number, state?: number, hand = false): ItemModel {
    const light = new THREE.Vector2(1, 0);
    const color = { value: new THREE.Vector3(1, 1, 1) };
    const group = new THREE.Group();
    const disposables: THREE.Material[] = [];

    if (state !== undefined || !this.isFlat(id)) {
      const s = state ?? itemDef(id)?.places ?? makeState(id);
      let g = this.blockGeo.get(s);
      if (!g) {
        const m = meshSingleBlock(s);
        g = [m.opaque, m.cutout, m.translucent].filter((md): md is MeshData => !!md).map(geometryFromMeshData);
        this.blockGeo.set(s, g);
      }
      const inner = new THREE.Group();
      // Геометрия блока лежит в клетке (0, 1, 0) — центрируем.
      inner.position.set(-0.5, -1.5, -0.5);
      for (const geo of g) {
        const mat = this.materials.entityBlock(light, hand);
        disposables.push(mat);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.frustumCulled = false;
        inner.add(mesh);
      }
      group.add(inner);
    } else {
      const key = isBlockItem(id) ? `block:${id}` : (itemDef(id)?.sprite ?? 'stick');
      let geo = this.spriteGeo.get(key);
      if (!geo) this.spriteGeo.set(key, (geo = extrudeSprite(this.spriteFor(id))));
      const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
      disposables.push(mat);
      group.add(new THREE.Mesh(geo, mat));
      applyEntityLight(group, color);
    }
    return {
      object: group,
      light,
      color,
      dispose: () => disposables.forEach((m) => m.dispose()),
    };
  }
}
