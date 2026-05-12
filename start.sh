#!/bin/sh
set -e

# ─── Cleanup on exit ────────────────────────────────────────────
cleanup() {
  echo "[start.sh] Shutting down..."
  [ -n "$NODE_PID" ] && kill "$NODE_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

# ─── Verify entry point exists ──────────────────────────────────
ENTRY_POINT="/usr/src/app/dist/server/entry.mjs"
if [ ! -f "$ENTRY_POINT" ]; then
  echo "[start.sh] ERROR: Entry point not found: $ENTRY_POINT"
  ls -la /usr/src/app/dist/server/ 2>/dev/null || echo "[start.sh] dist/server/ does not exist"
  exit 1
fi

# ─── Start Astro SSR Node server ────────────────────────────────
echo "[start.sh] Starting Astro SSR server..."
node "$ENTRY_POINT" &
NODE_PID=$!
echo "[start.sh] Node PID: $NODE_PID"

# ─── Wait for Node server to be ready ──────────────────────────
echo "[start.sh] Waiting for Node SSR server on port 4321..."
RETRIES=0
MAX_RETRIES=30

while [ "$RETRIES" -lt "$MAX_RETRIES" ]; do
  # Check if Node process is still alive
  if ! kill -0 "$NODE_PID" 2>/dev/null; then
    echo "[start.sh] ERROR: Node server crashed during startup"
    exit 1
  fi

  # Try to connect
  if wget -q --spider --timeout=2 http://localhost:4321/ 2>/dev/null; then
    echo "[start.sh] Node SSR server is ready! (after ${RETRIES}s)"
    break
  fi

  RETRIES=$((RETRIES + 1))

  if [ "$RETRIES" -ge "$MAX_RETRIES" ]; then
    echo "[start.sh] ERROR: Node SSR server failed to start within ${MAX_RETRIES} seconds"
    # Show Node process status for debugging
    kill -0 "$NODE_PID" 2>/dev/null && echo "[start.sh] Node process is alive but not responding" || echo "[start.sh] Node process is dead"
    exit 1
  fi

  sleep 1
done

# ─── Start Caddy reverse proxy ─────────────────────────────────
echo "[start.sh] Starting Caddy reverse proxy on port 80..."
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
