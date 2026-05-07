# ============================================================
# Stage 1: Builder — instala dependencias y compila Astro
# ============================================================
FROM oven/bun:latest AS builder
WORKDIR /app

COPY package.json bun.lock tsconfig.json astro.config.mjs keystatic.config.ts ./
COPY public ./public
COPY src ./src

RUN bun install
RUN bun run build

# ============================================================
# Stage 2: Runtime — Node.js servidor SSR
# ============================================================
FROM node:22-alpine AS node-server
WORKDIR /usr/src/app

COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/keystatic.config.ts .

EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]

# ============================================================
# Stage 3: Reverse Proxy — Caddy con TLS y servidores headers
# ============================================================
FROM caddy:alpine
WORKDIR /usr/src/app

COPY --from=node-server /usr/src/app/dist ./dist
COPY --from=node-server /usr/src/app/node_modules ./node_modules
COPY --from=node-server /usr/src/app/package.json .
COPY --from=node-server /usr/src/app/keystatic.config.ts .
COPY Caddyfile /etc/caddy/Caddyfile

COPY start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
