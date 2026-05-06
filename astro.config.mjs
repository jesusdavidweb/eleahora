import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// https://astro.build/config
// Nota: output 'hybrid' es requerido para Keystatic con storage kind 'github'.
// Los endpoints OAuth (/api/keystatic/*) necesitan SSR; las páginas normales
// se generan como estático. Con 'static' el callback OAuth no funciona y
// Keystatic devuelve "Authorization failed".
export default defineConfig({
  site: 'https://eleahora.com',
  output: 'hybrid',
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
