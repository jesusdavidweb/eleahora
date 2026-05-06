import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// https://astro.build/config
// Nota: Keystatic UI admin expuesto en /keystatic con autenticación Basic Auth.
export default defineConfig({
  site: 'https://eleahora.com',
  output: 'static',
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
