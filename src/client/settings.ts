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

const KEY = 'minecraft:settings:v2';

function defaults(): Settings {
  const touch = isTouchDevice();
  return {
    name: '',
    color: PLAYER_COLORS[7],
    renderDistance: touch ? 4 : 8,
    sensitivity: touch ? 10 : 8,
    fov: 75,
    quality: touch ? 'low' : 'high',
    volume: 80,
    music: 40,
  };
}

export function loadSettings(): Settings {
  const d = defaults();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<Settings>;
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
