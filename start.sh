#!/bin/sh
# Script de inicio para ejecutar Astro SSR y Caddy como reverse proxy

# Iniciar Astro SSR en background
node /usr/src/app/dist/server/entry.mjs &
ASTRO_PID=$!

# Esperar a que Astro esté listo
sleep 2

# Iniciar Caddy como reverse proxy
caddy run --config /etc/caddy/Caddyfile &
CADDY_PID=$!

# Manejar señales para shutdown limpio
trap "kill $ASTRO_PID $CADDY_PID; exit" INT TERM

# Esperar a que cualquiera de los procesos termine
wait $ASTRO_PID
wait $CADDY_PID
