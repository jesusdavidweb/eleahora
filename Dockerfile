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

# ─── Stage 2: Node SSR Runtime ──────────────────────────────────
FROM node:22-alpine
WORKDIR /usr/src/app

# Install wget for healthcheck
RUN apk add --no-cache wget

# Copy build artifacts from builder
COPY --from=builder /app/keystatic.config.ts ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Astro SSR configuration
ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["node", "dist/server/entry.mjs"]
