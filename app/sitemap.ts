import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maotaiblog.com';
  const posts = getSortedPostsData();

  // 核心静态页面与 Topic Hubs（next.config.mjs 开启了 trailingSlash: true，因此统一规范带 /）
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date('2026-09-12'), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/rank/`, lastModified: new Date('2026-09-12'), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/blog/`, lastModified: new Date('2026-09-12'), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/blog/airport-recommendation/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog/network-guide/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog/vpn-guide/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog/vpn-troubleshooting/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog/clash-guide/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog/sing-box-guide/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/whitepaper/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/whitepaper/airport-evaluation-methodology/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/tools/network-health/`, lastModified: new Date('2026-09-12'), changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${baseUrl}/tools/my-ip/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/tools/dns-leak-test/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/tools/webrtc-test/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/tools/ping-test/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/tools/vpn-leak-test/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/tools/vpn-speed-test/`, lastModified: new Date('2026-09-12'), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/apple-id/`, lastModified: new Date('2026-09-12'), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/methodology/`, lastModified: new Date('2026-09-12'), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/editorial-policy/`, lastModified: new Date('2026-09-12'), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/about/`, lastModified: new Date('2026-09-12'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact/`, lastModified: new Date('2026-09-12'), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  // 全部 29 篇博客文章统一带 trailing slash
  const postPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.updatedDate || post.pubDate || '2026-09-12'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}
