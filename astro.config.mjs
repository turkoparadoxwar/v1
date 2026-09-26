import { defineConfig } from 'astro/config';
import { writeFile } from 'node:fs/promises';

const site = process.env.SITE_URL?.trim() || undefined;
if (site && !/^https?:\/\//.test(site)) throw new Error('SITE_URL must be a real absolute HTTP(S) origin.');
const rawBase = process.env.BASE_PATH?.trim() || '/';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;

export default defineConfig({
  output: 'static',
  site,
  base,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  server: { port: 4321 },
  integrations: [{
    name: 'single-page-publication-metadata',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        if (!site) return;
        const canonical = new URL(base, site).href;
        const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
        await writeFile(new URL('sitemap.xml', dir), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(canonical)}</loc></url></urlset>`);
        await writeFile(new URL('robots.txt', dir), `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', canonical).href}\n`);
      }
    }
  }]
});
