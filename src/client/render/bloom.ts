import * as THREE from 'three';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import { BLOOM_DOWN_FRAGMENT, BLOOM_UP_FRAGMENT, FINAL_VERTEX } from './shaders';

/** Ступени: половина экрана, четверть, … 1/32 — чем меньше ступень, тем шире ореол. */
const LEVELS = 5;

/**
 * Свечение (bloom) по цепочке уменьшенных копий: яркое сжимается ступенями вдвое,
 * затем ступени складываются обратно снизу вверх. Все проходы не больше половины экрана,
 * а результат финальный проход читает сам — без лишнего прохода по всей сцене в полном
 * разрешении, как у UnrealBloomPass.
 */
export class Bloom {
  private readonly levels: THREE.WebGLRenderTarget[] = [];
  private readonly down: THREE.ShaderMaterial;
  private readonly up: THREE.ShaderMaterial;
  private readonly quad: FullScreenQuad;

  constructor(
    private readonly type: THREE.TextureDataType,
    threshold: number,
  ) {
    this.down = new THREE.ShaderMaterial({
      vertexShader: FINAL_VERTEX,
      fragmentShader: BLOOM_DOWN_FRAGMENT,
      uniforms: { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() }, uThreshold: { value: threshold }, uPrefilter: { value: 0 } },
      depthTest: false,
      depthWrite: false,
    });
    this.up = new THREE.ShaderMaterial({
      vertexShader: FINAL_VERTEX,
      fragmentShader: BLOOM_UP_FRAGMENT,
      uniforms: { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() } },
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.quad = new FullScreenQuad(this.down);
  }

  setSize(width: number, height: number): void {
    this.disposeLevels();
    for (let i = 0; i < LEVELS; i++) {
      width = Math.max(1, width >> 1);
      height = Math.max(1, height >> 1);
      this.levels.push(new THREE.WebGLRenderTarget(width, height, { type: this.type, depthBuffer: false }));
    }
  }

  /** Свечение от яркого в source; возвращает текстуру в половину разрешения source. */
  render(renderer: THREE.WebGLRenderer, source: THREE.Texture, width: number, height: number): THREE.Texture {
    const levels = this.levels;
    const down = this.down.uniforms;
    this.quad.material = this.down;
    let src = source;
    for (let i = 0; i < levels.length; i++) {
      down.tSrc.value = src;
      down.uTexel.value.set(1 / width, 1 / height);
      down.uPrefilter.value = i === 0 ? 1 : 0;
      renderer.setRenderTarget(levels[i]);
      this.quad.render(renderer);
      src = levels[i].texture;
      width = levels[i].width;
      height = levels[i].height;
    }
    const up = this.up.uniforms;
    this.quad.material = this.up;
    for (let i = levels.length - 2; i >= 0; i--) {
      up.tSrc.value = levels[i + 1].texture;
      up.uTexel.value.set(1 / levels[i + 1].width, 1 / levels[i + 1].height);
      renderer.setRenderTarget(levels[i]);
      this.quad.render(renderer);
    }
    return levels[0].texture;
  }

  private disposeLevels(): void {
    for (const t of this.levels) t.dispose();
    this.levels.length = 0;
  }

  dispose(): void {
    this.disposeLevels();
    this.down.dispose();
    this.up.dispose();
    this.quad.dispose();
  }
}
