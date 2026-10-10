import { PLAYER_COLORS } from '../shared/protocol';
import { isTouchDevice } from './input';
import type { QualityLevel } from './render/pipeline';

export interface Settings {
  name: string;
  color: string;
  renderDistance: number;
  sensitivity: number;
  fov: number;
  quality: QualityLevel;
  volume: number;
  music: number;
}

const KEY = 'minecraft:settings:v3';
/** Из прошлой версии настроек берём ник, цвет и звук; графику подбираем заново. */
const OLD_KEY = 'minecraft:settings:v2';
const KEPT: (keyof Settings)[] = ['name', 'color', 'sensitivity', 'fov', 'volume', 'music'];

/**
 * Качество графики по видеокарте: дискретная — высокое, встроенная — среднее,
 * программная отрисовка и телефоны — низкое. Дальше игра сама понижает разрешение
 * и качество, если кадры не успевают.
 */
function detectQuality(): QualityLevel {
  if (isTouchDevice()) return 'low';
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return 'low';
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const gpu = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER)).toLowerCase();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    if (/swiftshader|llvmpipe|software|basic render/.test(gpu)) return 'low';
    if (/nvidia|geforce|quadro|\brtx\b|\bgtx\b|radeon (rx|pro|r9)|\brx ?\d{3,4}|\barc\b|apple m\d (pro|max|ultra)/.test(gpu)) return 'high';
    return 'medium';
  } catch {
    return 'medium';
  }
}

const DISTANCE: Record<QualityLevel, number> = { low: 4, medium: 6, high: 8, ultra: 10 };

function defaults(): Settings {
  const touch = isTouchDevice();
  const quality = detectQuality();
  return {
    name: '',
    color: PLAYER_COLORS[7],
    renderDistance: DISTANCE[quality],
    sensitivity: touch ? 10 : 8,
    fov: 75,
    quality,
    volume: 80,
    music: 40,
  };
}

function read(key: string): Partial<Settings> | null {
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as Partial<Settings>) : null;
}

export function loadSettings(): Settings {
  const d = defaults();
  try {
    let saved = read(KEY);
    if (!saved) {
      const old = read(OLD_KEY) ?? {};
      saved = Object.fromEntries(KEPT.filter((k) => old[k] !== undefined).map((k) => [k, old[k]]));
    }
    const s: Settings = { ...d, ...saved };
    if (!['low', 'medium', 'high', 'ultra'].includes(s.quality)) s.quality = d.quality;
    return s;
  } catch {
    return d;
  }
}

export function saveSettings(s: Settings): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // приватный режим браузера — настройки просто не сохранятся
  }
}
