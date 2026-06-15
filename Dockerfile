# ─── Stage 1: Build ─────────────────────────────────────────────
FROM oven/bun:latest AS builder
WORKDIR /app

# Copy config files first for better layer caching
COPY package.json bun.lock tsconfig.json astro.config.mjs ./

# Install dependencies
RUN bun install

# Copy source and public assets
COPY public ./public
COPY src ./src

# Build the project (static output)
RUN bun run build

# ─── Stage 2: Node Static Runtime ───────────────────────────────
FROM node:22-alpine
WORKDIR /usr/src/app

# Install wget for healthcheck
RUN apk add --no-cache wget

# Copy build artifacts from builder
COPY --from=builder /app/dist ./dist
COPY serve-static.mjs ./

ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["node", "serve-static.mjs", "dist"]
