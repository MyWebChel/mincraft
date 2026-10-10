import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGameServer } from './game-server';
import { handleLanRequest, lanAddresses } from './lan';
import { requestPath } from './paths';

// Продакшен-сервер: отдаёт собранный клиент из dist/ и держит игровой WebSocket на /ws.
const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const PORT = Number(process.env.PORT) || 3000;

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('Нет собранного клиента. Сначала выполните: npm run build');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const pathname = requestPath(req.url);
  if (pathname === '/api/lan') return handleLanRequest(req, res);
  let file: string;
  try {
    file = path.join(DIST, decodeURIComponent(pathname));
  } catch {
    res.writeHead(400).end();
    return;
  }
  if (!file.startsWith(DIST + path.sep) && file !== DIST) {
    res.writeHead(403).end();
    return;
  }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, 'index.html');

  res.writeHead(200, {
    'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream',
    'Cache-Control': pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
  });
  fs.createReadStream(file).pipe(res);
});

createGameServer(server);

server.on('upgrade', (req, socket) => {
  if (requestPath(req.url) !== '/ws') socket.destroy();
});

server.listen(PORT, () => {
  console.log(`Mincraft запущен: http://localhost:${PORT}`);
  for (const ip of lanAddresses()) console.log(`  с телефона / другого ПК в той же сети: http://${ip}:${PORT}`);
});
