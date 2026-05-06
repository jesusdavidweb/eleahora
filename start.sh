#!/bin/sh
set -e

# Script de inicio para ejecutar Astro SSR y Caddy como reverse proxy

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
