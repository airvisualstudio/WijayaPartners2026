import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';

import markdoc from '@astrojs/markdoc';


import node from '@astrojs/node';


// https://astro.build/config
// export default defineConfig({
//   site: 'https://ctrimm.github.io',
//   base: '/astro-genai-startup-theme',
//   integrations: [
//     react(),
//     tailwind({
//       applyBaseStyles: false,
//     }),
//     sitemap(),
//     mdx()
//   ]
// });

export default defineConfig({
  site: 'https://wijayapartners.com',
  server: {
    allowedHosts: ['.ngrok-free.dev'], // Allows all ngrok subdomains
  },

  devToolbar: {
    enabled: false
  },

  integrations: [react(), tailwind({
    applyBaseStyles: false,
  }), sitemap(), mdx(), markdoc(), keystatic()],

  adapter: node({
    mode: 'standalone'
  })
});