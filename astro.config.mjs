import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import agentMarkdown from './src/integrations/agent-markdown.mjs';

export default defineConfig({
  site: 'https://www.gryd.wtf',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory', inlineStylesheets: 'always' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !/\/(404|search|thanks|blog\/tags\/[^/]+)\//.test(page),
      changefreq: 'weekly',
    }),
    agentMarkdown(),
  ],
  vite: { plugins: [tailwindcss()] },
});
