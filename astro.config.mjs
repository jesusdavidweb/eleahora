import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// https://astro.build/config
// Keystatic Cloud (kind: 'cloud') requiere output 'server' para que
// los endpoints /api/keystatic/* se sirvan como SSR en produccion.
export default defineConfig({
  site: 'https://eleahora.com',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  build: {
    format: 'directory',
  },
  integrations: [
    react(),
    svelte(),
    sitemap({
      filter: (page) =>
        !page.includes('/gracias') &&
        !page.includes('/404') &&
        !page.includes('/keystatic'),
    }),
    keystatic(),
  ],
});
