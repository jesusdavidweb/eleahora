---
name: Deployment & Docker Setup
description: Guidelines for maintaining the Docker and Caddyfile configurations for Dokploy deployment.
---

# Deployment Skill

## Overview
The project is built specifically to be deployed via Dokploy using Docker containers, utilizing Caddy as a performant reverse proxy.

## Multi-stage Dockerfile
1. **Base Image**: Always use `oven/bun` for installation and building.
2. **Build Stage**: Run `bun install` followed by `bun run build`.
3. **Production Stage**: Use `caddy:alpine` to serve the static output from `dist/`.

## Caddyfile Rules
1. The Caddyfile must serve the `dist/` folder on port `:80` (or designated Dokploy port).
2. Enable compression (`gzip`, `zstd`).
3. Handle static SPA routing securely with `try_files {path} {path}/ /index.html`.
4. Include security headers (`X-Content-Type-Options nosniff`, `X-Frame-Options DENY`, `Strict-Transport-Security`).
5. Ensure long cache limits for the `/assets/*` directory (`Cache-Control "public, max-age=31536000, immutable"`).
