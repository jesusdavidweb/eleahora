# ─── Stage 1: Build ─────────────────────────────────────────────
FROM oven/bun:latest AS builder
WORKDIR /app

# Copy config files first for better layer caching
COPY package.json bun.lock tsconfig.json astro.config.mjs keystatic.config.ts ./

# Install dependencies
RUN bun install

# Copy source and public assets
COPY public ./public
COPY src ./src

# Build the project (SSR)
RUN bun run build

# ─── Stage 2: Node SSR Server ───────────────────────────────────
FROM node:22-alpine AS node-server
WORKDIR /usr/src/app

# Copy keystatic.config.ts (needed by createReader at runtime)
COPY --from=builder /app/keystatic.config.ts ./

# Copy built output
COPY --from=builder /app/dist ./dist

# Copy node_modules for production dependencies
COPY --from=builder /app/node_modules ./node_modules

# Copy package.json for Node resolution
COPY --from=builder /app/package.json ./

# Expose Astro SSR port
EXPOSE 4321

# ─── Stage 3: Caddy Reverse Proxy ──────────────────────────────
FROM caddy:alpine
WORKDIR /usr/src/app

# Copy start script
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Copy Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

# Copy Node server from stage 2
COPY --from=node-server /usr/src/app /usr/src/app

# Install wget for healthcheck
RUN apk add --no-cache wget

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["/usr/src/app/start.sh"]
