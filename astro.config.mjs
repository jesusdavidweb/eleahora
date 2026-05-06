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
  // Exponer variables de Keystatic como process.env (runtime)
  // para que Dokploy pueda inyectarlas sin necesidad de build args.
  // Sin esto, Vite reemplaza import.meta.env.KEYSTATIC_* por undefined.
  vite: {
    define: {
      'import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID': 'process.env.KEYSTATIC_GITHUB_CLIENT_ID',
      'import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET': 'process.env.KEYSTATIC_GITHUB_CLIENT_SECRET',
      'import.meta.env.KEYSTATIC_SECRET': 'process.env.KEYSTATIC_SECRET',
      'import.meta.env.GITHUB_TOKEN': 'process.env.GITHUB_TOKEN',
    },
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
