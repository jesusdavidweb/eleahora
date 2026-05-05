import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://eleahora.com',
  // Keystatic requiere modo 'hybrid' para las rutas de admin
  output: 'hybrid',
  build: {
    format: 'directory',
  },
  integrations: [
    svelte(),
    react(),
    markdoc(),
    keystatic(),
    sitemap({
      filter: (page) =>
        !page.includes('/gracias') &&
        !page.includes('/404') &&
        !page.includes('/keystatic'),
    }),
  ],
});
