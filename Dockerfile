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
# Stage 2: Runtime — Caddy sirviendo archivos estáticos
# ============================================================
FROM caddy:alpine AS runtime

WORKDIR /usr/src/app

# Copiar contenido estático generado
COPY --from=builder /app/dist ./dist

# Copiar configuración de Caddy
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
