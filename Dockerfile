FROM oven/bun:latest AS builder
WORKDIR /app
COPY package.json bun.lock tsconfig.json astro.config.mjs ./
COPY public ./public
COPY src ./src
# Install dependencies
RUN bun install
# Build the project
RUN bun run build

FROM caddy:alpine
WORKDIR /usr/src/app
# Copy the built output
COPY --from=builder /app/dist ./dist
# Copy the Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
