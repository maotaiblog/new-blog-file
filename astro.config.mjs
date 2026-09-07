import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function customSitemapIntegration() {
  return {
    name: 'custom-sitemap-generator',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const siteUrl = 'https://maotaiblog.com';
        const distDir = fileURLToPath(dir);

        // 安全获取页面路径，过滤 undefined 与 json 接口
        const urls = (pages || [])
          .filter(p => p && p.pathname !== undefined && !p.pathname.endsWith('.json') && !p.pathname.includes('search-index'))
          .map(p => {
            let pathname = p.pathname.replace(/\\/g, '/');
            if (pathname.endsWith('index.html')) {
              pathname = pathname.slice(0, -10);
            }
            if (!pathname.startsWith('/')) {
              pathname = '/' + pathname;
            }
            if (pathname.length > 1 && pathname.endsWith('/')) {
              pathname = pathname.slice(0, -1);
            }
            return `${siteUrl}${pathname}`;
          });

        // 确保全量 URL 唯一性
        const uniqueUrls = Array.from(new Set(urls));
        const today = new Date().toISOString().slice(0, 10);

        // 1. 生成 dist/sitemap-0.xml
        const sitemap0Xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${url.endsWith('/rank') || url === siteUrl ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

        const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
        fs.writeFileSync(sitemap0Path, sitemap0Xml, 'utf-8');
        console.log(`[custom-sitemap] ✅ Successfully generated ${sitemap0Path} with ${uniqueUrls.length} URLs`);

        // 2. 生成 dist/sitemap-index.xml
        const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-0.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

        const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
        fs.writeFileSync(sitemapIndexPath, sitemapIndexXml, 'utf-8');
        console.log(`[custom-sitemap] ✅ Successfully generated ${sitemapIndexPath}`);

        // 3. 兼容生成根目录 dist/sitemap.xml
        const sitemapRootPath = path.join(distDir, 'sitemap.xml');
        fs.writeFileSync(sitemapRootPath, sitemap0Xml, 'utf-8');
      }
    }
  };
}

export default defineConfig({
  site: 'https://maotaiblog.com',
  integrations: [
    customSitemapIntegration(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx()
  ]
});
