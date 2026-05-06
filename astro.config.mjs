import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// https://astro.build/config
// Nota: output 'server' es necesario en Astro 6 para que los endpoints
// OAuth de Keystatic (/api/keystatic/github/oauth/callback) funcionen
// como SSR. En Astro 6, 'hybrid' fue eliminado; 'server' es el equivalente.
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
