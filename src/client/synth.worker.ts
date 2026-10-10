import { renderJob, type SynthJob } from './audio';

// Синтез звуков в отдельном потоке: главный поток получает готовые каналы.
self.onmessage = (e: MessageEvent<{ key: string; job: SynthJob }>) => {
  let channels: Float32Array[] = [];
  try {
    channels = renderJob(e.data.job);
  } catch {
    // пустой ответ — звук просто не будет звучать
  }
  const buffers = [...new Set(channels.map((c) => c.buffer as ArrayBuffer))];
  (self as unknown as Worker).postMessage({ key: e.data.key, channels }, buffers);
};
