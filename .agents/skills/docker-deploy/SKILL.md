---
name: Deployment & Docker Setup
description: Guidelines for maintaining the Docker configuration for Dokploy deployment with Traefik reverse proxy.
---

# Deployment Skill

## Overview
The project is deployed via Dokploy using Docker containers. Dokploy's Traefik handles reverse proxying automatically — no Caddy or other proxy is needed in the container.

## Architecture
```
[Request] → Traefik (Dokploy) → Container:80 → Node SSR (Astro)
```

## Multi-stage Dockerfile
1. **Stage 1 (Build):** `oven/bun` for `bun install` and `bun run build`.
2. **Stage 2 (Runtime):** `node:22-alpine` running Astro SSR directly on port 80.

## Key Configuration
- `ENV PORT=80` — Astro SSR listens on port 80
- `ENV HOST=0.0.0.0` — Accepts external connections
- `CMD ["node", "dist/server/entry.mjs"]` — Direct Node execution
- Healthcheck uses `wget` on port 80

## Docker Compose
- Service `web` connected to `dokploy-network` (external)
- Healthcheck on `http://localhost:80/`
- `restart: always`

## Dokploy Domains
All domains point to port 80 of the `web` service:
- `eleahora.com`
- `www.eleahora.com`
- `eleahora.jesusdavid.net`

## Files NOT needed (removed)
- `Caddyfile` — Traefik handles reverse proxy
- `start.sh` — Node runs directly via CMD
