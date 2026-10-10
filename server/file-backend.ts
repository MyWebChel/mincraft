import fs from 'node:fs';
import path from 'node:path';
import type { WorldBackend } from './world-store';

/** Мир в JSON-файле на диске; запись через временный файл, чтобы сбой не оставил половину. */
export function fileBackend(file: string): WorldBackend {
  return {
    read() {
      try {
        return fs.readFileSync(file, 'utf8');
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
        throw err;
      }
    },
    write(json) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      const tmp = `${file}.tmp`;
      fs.writeFileSync(tmp, json);
      fs.renameSync(tmp, file);
    },
    discard(reason) {
      const backup = `${file}.old-${Date.now()}`;
      console.error(`[world] сохранение не подходит (${reason}), копия: ${backup}`);
      try {
        fs.renameSync(file, backup);
      } catch {
        // файл мог исчезнуть — тогда просто создаём новый мир
      }
    },
  };
}
