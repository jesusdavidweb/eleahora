import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Nota: @keystatic/core se usa SOLO como reader de YAMLs en build-time (src/lib/keystatic.ts).
// El panel de admin /keystatic NO se expone en producción (Caddy sirve estático).
export default defineConfig({
  site: 'https://eleahora.com',
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [
    svelte(),
    sitemap({
      filter: (page) =>
        !page.includes('/gracias') &&
        !page.includes('/404') &&
        !page.includes('/keystatic'),
    }),
  ],
});
