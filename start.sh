#!/bin/sh
set -e

# Script de inicio para ejecutar Astro SSR y Caddy como reverse proxy

# Debug: imprimir variables de entorno relevantes
echo "=== Environment Variables Debug ==="
echo "KEYSTATIC_USER: ${KEYSTATIC_USER:-<not set>}"
echo "KEYSTATIC_PASSWORD: ${KEYSTATIC_PASSWORD:+<set>}"
echo "KEYSTATIC_GITHUB_CLIENT_ID: ${KEYSTATIC_GITHUB_CLIENT_ID:+<set>}"
echo "KEYSTATIC_GITHUB_CLIENT_SECRET: ${KEYSTATIC_GITHUB_CLIENT_SECRET:+<set>}"
echo "GITHUB_TOKEN: ${GITHUB_TOKEN:+<set>}"
echo "KEYSTATIC_SECRET: ${KEYSTATIC_SECRET:+<set>}"
echo "NODE_ENV: ${NODE_ENV:-<not set>}"
echo "===================================="

# Iniciar Astro SSR en background
node /usr/src/app/dist/server/entry.mjs &
ASTRO_PID=$!

# Esperar a que Astro esté listo
sleep 2

# Verificar que Astro sigue corriendo
if ! kill -0 $ASTRO_PID 2>/dev/null; then
  echo "Error: Astro SSR server failed to start"
  exit 1
fi

# Iniciar Caddy como reverse proxy
caddy run --config /etc/caddy/Caddyfile &
CADDY_PID=$!

# Manejar señales para shutdown limpio
trap "kill $ASTRO_PID $CADDY_PID; exit" INT TERM

# Esperar a que cualquiera de los procesos termine
wait
