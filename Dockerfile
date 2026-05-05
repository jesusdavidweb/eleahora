FROM oven/bun:latest AS builder
WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package.json bun.lock tsconfig.json astro.config.mjs keystatic.config.tsx ./

# Copiar assets y código fuente
COPY public ./public
COPY src ./src

# Instalar dependencias
RUN bun install

# Compilar
RUN bun run build

FROM caddy:alpine
WORKDIR /usr/src/app

# Copiar el output compilado
COPY --from=builder /app/dist ./dist

# Copiar Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
