import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://demo.jedav.link',
  base: '/eleahora',
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
