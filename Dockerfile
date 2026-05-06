FROM oven/bun:latest AS builder
WORKDIR /app

# Build-time secrets necesarios para que Vite los incruste
# en import.meta.env.* durante bun run build.
# Dokploy debe pasar estos como Build Args o env vars del builder.
ARG KEYSTATIC_GITHUB_CLIENT_ID
ARG KEYSTATIC_GITHUB_CLIENT_SECRET
ARG KEYSTATIC_SECRET
ARG GITHUB_TOKEN

ENV KEYSTATIC_GITHUB_CLIENT_ID=$KEYSTATIC_GITHUB_CLIENT_ID
ENV KEYSTATIC_GITHUB_CLIENT_SECRET=$KEYSTATIC_GITHUB_CLIENT_SECRET
ENV KEYSTATIC_SECRET=$KEYSTATIC_SECRET
ENV GITHUB_TOKEN=$GITHUB_TOKEN

# Copiar archivos de configuración y dependencias
COPY package.json bun.lock tsconfig.json astro.config.mjs keystatic.config.ts ./

# Copiar assets y código fuente
COPY public ./public
COPY src ./src

# Instalar dependencias
RUN bun install

# Compilar
RUN bun run build

FROM node:22-alpine AS runtime
WORKDIR /usr/src/app

# Instalar Caddy y wget (para healthcheck)
RUN apk add --no-cache caddy wget

# Variables de entorno para runtime (auth, etc.)
ENV NODE_ENV=production
ENV KEYSTATIC_USER=""
ENV KEYSTATIC_PASSWORD=""
ENV KEYSTATIC_GITHUB_CLIENT_ID=""
ENV KEYSTATIC_GITHUB_CLIENT_SECRET=""
ENV GITHUB_TOKEN=""
ENV KEYSTATIC_SECRET=""

# Copiar output compilado y dependencias necesarias
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/keystatic.config.ts ./keystatic.config.ts

# Copiar Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

# Script de inicio para ejecutar Astro SSR + Caddy proxy
COPY start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["/usr/src/app/start.sh"]
