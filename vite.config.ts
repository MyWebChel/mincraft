import { defineConfig, type Plugin } from 'vite';
import { createGameServer } from './server/game-server';
import { handleLanRequest } from './server/lan';

// В режиме разработки игровой WebSocket-сервер поднимается прямо внутри
// dev-сервера Vite, поэтому всё запускается одной командой `npm run dev`.
function gameServerPlugin(): Plugin {
  return {
    name: 'mincraft-game-server',
    configureServer(server) {
      server.middlewares.use('/api/lan', handleLanRequest);
      if (server.httpServer) createGameServer(server.httpServer);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/lan', handleLanRequest);
      if (server.httpServer) createGameServer(server.httpServer);
    },
  };
}

export default defineConfig({
  // Относительные пути: собранная игра работает и в корне сайта, и в подпапке (GitHub Pages).
  base: './',
  plugins: [gameServerPlugin()],
  server: { port: 3000, host: '0.0.0.0' },
  preview: { port: 3000, host: '0.0.0.0' },
  worker: { format: 'es' },
  build: { chunkSizeWarningLimit: 800 },
});
