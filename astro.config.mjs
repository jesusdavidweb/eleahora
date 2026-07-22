import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

const site = process.env.PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://demo.jedav.link';

// https://astro.build/config
export default defineConfig({
  site,
  security: {
    checkOrigin: false,
  },
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [
    svelte(),
  ],
});
