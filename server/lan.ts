import type { IncomingMessage, ServerResponse } from 'node:http';
import os from 'node:os';

const isPrivate = (ip: string) => /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip);

/** IPv4-адреса компьютера в локальной сети (сначала домашние 192.168.* / 10.* / 172.16–31.*). */
export function lanAddresses(): string[] {
  const result: string[] = [];
  for (const list of Object.values(os.networkInterfaces())) {
    for (const a of list ?? []) {
      if (a.family === 'IPv4' && !a.internal) result.push(a.address);
    }
  }
  return result.sort((a, b) => Number(isPrivate(b)) - Number(isPrivate(a)));
}

const isLoopback = (ip: string | undefined) => !!ip && (ip === '::1' || ip.startsWith('127.') || ip.startsWith('::ffff:127.'));

/**
 * GET /api/lan — адреса для подключения с телефона/другого ПК.
 * Отвечает только на запросы с этого же компьютера, чтобы не раскрывать сеть наружу.
 */
export function handleLanRequest(req: IncomingMessage, res: ServerResponse): void {
  const addresses = isLoopback(req.socket.remoteAddress) ? lanAddresses() : [];
  res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify({ addresses }));
}
