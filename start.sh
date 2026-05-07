#!/bin/sh
set -e

echo "==> Starting Astro SSR server on port 4321..."
node /usr/src/app/dist/server/entry.mjs &
NODE_PID=$!

# Wait until the SSR server is ready
for i in $(seq 1 20); do
  if wget -qO- http://localhost:4321/ > /dev/null 2>&1; then
    echo "==> SSR server ready (PID $NODE_PID)"
    break
  fi
  if [ "$i" -eq 20 ]; then
    echo "ERROR: SSR server failed to start"
    exit 1
  fi
  sleep 1
done

echo "==> Starting Caddy on port 80..."
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
