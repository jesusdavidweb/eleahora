import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://eleahora.com',
  security: {
    checkOrigin: false,
  },
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: {
      enabled: true,
    },
  }),
  build: {
    format: 'directory',
  },
  integrations: [
    svelte(),
    react(),
    keystatic(),
    sitemap({
      filter: (page) =>
        !page.includes('/gracias') && !page.includes('/404') && !page.includes('/keystatic'),
    }),
  ],
});
