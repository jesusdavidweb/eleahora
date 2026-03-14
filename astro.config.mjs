import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
   site: 'https://eleahora.jesusdavid.net',
  build: {
    format: 'directory',
  },
  integrations: [
    svelte(),
    sitemap({
      filter: (page) =>
        !page.includes('/gracias') && !page.includes('/404'),
    }),
  ],
});