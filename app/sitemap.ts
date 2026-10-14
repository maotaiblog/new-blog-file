import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maotaiblog.com';
  const posts = getSortedPostsData();

  // 核心可索引正式静态页面与 Topic Hubs（next.config.mjs 开启了 trailingSlash: true，统一规范带 /）
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date('2026-10-14'), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/rank/`, lastModified: new Date('2026-10-14'), changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${baseUrl}/blog/`, lastModified: new Date('2026-10-14'), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/blog/airport-recommendation/`, lastModified: new Date('2026-10-14'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog/network-guide/`, lastModified: new Date('2026-09-20'), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/blog/vpn-guide/`, lastModified: new Date('2026-09-22'), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/blog/vpn-troubleshooting/`, lastModified: new Date('2026-09-25'), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/blog/clash-guide/`, lastModified: new Date('2026-09-28'), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/blog/sing-box-guide/`, lastModified: new Date('2026-09-28'), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/whitepaper/`, lastModified: new Date('2026-09-18'), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/whitepaper/airport-evaluation-methodology/`, lastModified: new Date('2026-09-18'), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/tools/network-health/`, lastModified: new Date('2026-10-10'), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/tools/my-ip/`, lastModified: new Date('2026-10-08'), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/tools/dns-leak-test/`, lastModified: new Date('2026-10-08'), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/tools/webrtc-test/`, lastModified: new Date('2026-10-08'), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/tools/ping-test/`, lastModified: new Date('2026-10-08'), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/tools/vpn-leak-test/`, lastModified: new Date('2026-10-08'), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/tools/vpn-speed-test/`, lastModified: new Date('2026-10-08'), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/apple-id/`, lastModified: new Date('2026-10-02'), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/methodology/`, lastModified: new Date('2026-09-20'), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/editorial-policy/`, lastModified: new Date('2026-09-20'), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/about/`, lastModified: new Date('2026-09-20'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact/`, lastModified: new Date('2026-09-20'), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  // 全部博客文章采用文章实际发布与更新日期 (lastmod 绝不使用打包时间)
  const postPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.updatedDate || post.pubDate || '2026-10-05'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}
