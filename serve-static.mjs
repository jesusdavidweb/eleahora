import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { createServer } from 'node:http';

const ROOT = resolve(process.argv[2] ?? 'dist');
const PORT = Number(process.env.PORT ?? 80);
const HOST = process.env.HOST ?? '0.0.0.0';
const BASE_PATH = '/eleahora';

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.htm': 'text/html; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
};

function decodePathname(pathname) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function routeVariants(pathname) {
  const decoded = decodePathname(pathname);

  if (extname(decoded)) {
    return [decoded];
  }

  const normalized = decoded.endsWith('/') ? decoded : `${decoded}/`;
  const variants = [normalized];

  if (normalized.startsWith(`${BASE_PATH}/`)) {
    const stripped = normalized.slice(BASE_PATH.length) || '/';
    variants.push(stripped);
  }

  if (normalized === '/') {
    variants.push(`${BASE_PATH}/`);
  } else if (!normalized.startsWith(`${BASE_PATH}/`) && normalized !== `${BASE_PATH}/`) {
    variants.push(`${BASE_PATH}${normalized}`);
  }

  return [...new Set(variants)];
}

function fileCandidates(routePath) {
  if (routePath === '/') {
    return ['index.html', 'eleahora/index.html'];
  }

  const clean = routePath.replace(/^\/+/, '').replace(/\/+$/, '');

  return [
    `${clean}/index.html`,
    `${clean}.html`,
    clean,
  ];
}

function resolveCandidate(candidate) {
  const filePath = resolve(ROOT, candidate);
  if (filePath !== ROOT && !filePath.startsWith(`${ROOT}/`)) return null;
  return filePath;
}

function findFile(pathname) {
  for (const route of routeVariants(pathname)) {
    for (const candidate of fileCandidates(route)) {
      const resolvedCandidate = resolveCandidate(candidate);
      if (!resolvedCandidate || !existsSync(resolvedCandidate)) continue;

      const stat = statSync(resolvedCandidate);
      if (stat.isDirectory()) {
        const indexFile = resolveCandidate(`${candidate.replace(/\/+$/, '')}/index.html`);
        if (indexFile && existsSync(indexFile) && statSync(indexFile).isFile()) {
          return indexFile;
        }
        continue;
      }

      return resolvedCandidate;
    }
  }

  for (const fallback of ['404.html', 'eleahora/404.html']) {
    const filePath = resolveCandidate(fallback);
    if (filePath && existsSync(filePath) && statSync(filePath).isFile()) {
      return filePath;
    }
  }

  return null;
}

function contentType(filePath) {
  const type = MIME_TYPES[extname(filePath).toLowerCase()];
  return type ?? 'application/octet-stream';
}

const server = createServer((req, res) => {
  const method = req.method ?? 'GET';
  if (method !== 'GET' && method !== 'HEAD') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Method Not Allowed');
    return;
  }

  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  const filePath = findFile(url.pathname);

  if (!filePath) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Not Found');
    return;
  }

  res.statusCode = url.pathname === '/' && filePath.endsWith('/index.html') ? 200 : 200;
  res.setHeader('Content-Type', contentType(filePath));
  res.setHeader('Cache-Control', 'no-cache');

  if (method === 'HEAD') {
    res.end();
    return;
  }

  createReadStream(filePath).pipe(res);
});

server.listen(PORT, HOST, () => {
  console.log(`Static server listening on http://${HOST}:${PORT}`);
  console.log(`Serving ${ROOT}`);
});
