import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { publicRoutes } from './src/config/routes';

const DEFAULT_SITE_URL = 'https://www.wewinconsulting.ca';

/** Injects the public site URL into index.html and writes sitemap.xml and robots.txt at build time. */
function siteMeta(siteUrl: string): Plugin {
  return {
    name: 'wewin-site-meta',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
    generateBundle() {
      const urls = publicRoutes
        .map((path) => `  <url><loc>${siteUrl}${path === '/' ? '/' : path}</loc></url>`)
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
  return {
    plugins: [react(), siteMeta(siteUrl)],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
