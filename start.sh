#!/bin/sh
set -e

echo "Starting Eleahora SSR server..."

# Start Astro SSR Node server in background
node /usr/src/app/dist/server/entry.mjs &
NODE_PID=$!

# Wait for Node server to be ready
echo "Waiting for Node SSR server on port 4321..."
for i in $(seq 1 30); do
  if wget -q --spider http://localhost:4321/ 2>/dev/null; then
    echo "Node SSR server is ready!"
    break
  fi
  if [ "$i" = "30" ]; then
    echo "ERROR: Node SSR server failed to start within 30 seconds"
    kill $NODE_PID 2>/dev/null || true
    exit 1
  fi
  sleep 1
done

# Start Caddy reverse proxy in foreground
echo "Starting Caddy reverse proxy on port 80..."
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
