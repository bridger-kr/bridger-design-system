/* Static fixture server for the theme e2e tests. Serves tests/e2e/fixtures at
   / and the repo's packages/ directory at /packages so fixture pages can link
   the real packages/tokens/css/index.css — no bundler, no JavaScript. */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
const FIXTURES = join(ROOT, 'tests', 'e2e', 'fixtures');
const PORT = Number(process.env.PORT ?? 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.woff2': 'font/woff2',
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
    if (path === '/') path = '/index.html';
    const base = path.startsWith('/packages/') ? ROOT : FIXTURES;
    const file = normalize(join(base, `.${path}`));
    if (!file.startsWith(ROOT)) throw new Error('path escapes root');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
}).listen(PORT, () => {
  console.log(`theme e2e fixture server on http://localhost:${PORT}`);
});
