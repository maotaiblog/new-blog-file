import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://maotaiblog.com';

const pages = [
  '/',
  '/rank',
  '/apple-id',
  '/about',
  '/archives',
  '/archives/2026',
  '/gallery',
  '/tags',
  '/categories/测评',
  '/categories/教程',
  '/categories/自托管',
  '/categories/什么值得买'
];

// 读取 content/blog 目录下的所有 markdown 文件的 slug
const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

blogFiles.forEach(file => {
  const slug = file.replace(/\.mdx?$/, '');
  pages.push(`/blog/${slug}`);
});

const today = new Date().toISOString().slice(0, 10);

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(url => `  <url>
    <loc>${DOMAIN}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${url === '/' || url === '/rank' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

// 输出到 public/sitemap.xml 和 dist/sitemap.xml
const publicSitemap = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(publicSitemap, sitemapXml, 'utf-8');
console.log(`✅ Sitemap 已成功生成至: ${publicSitemap}`);

const publicSitemapIndex = path.join(process.cwd(), 'public', 'sitemap-index.xml');
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
fs.writeFileSync(publicSitemapIndex, sitemapIndexXml, 'utf-8');
console.log(`✅ Sitemap Index 已成功生成至: ${publicSitemapIndex}`);
