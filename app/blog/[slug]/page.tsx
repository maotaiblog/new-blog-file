import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSortedPostsData, getPostData, getRelatedPosts } from "@/lib/posts";
import { getRelatedTools, getNextStepByTopic } from "@/lib/topics";
import ArticleTOC from "@/components/blog/ArticleTOC";
import RelatedToolsCard from "@/components/blog/RelatedToolsCard";
import NextStepCTA from "@/components/blog/NextStepCTA";
import TestingMetricsCard from "@/components/blog/TestingMetricsCard";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight,
  RotateCw,
  BookOpen
} from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.slug);
  if (!post) return { title: "文章未找到 - 猫太博客" };

  const canonicalUrl = `https://maotaiblog.com/blog/${post.slug}/`;
  const heroImageUrl = post.heroImage
    ? (post.heroImage.startsWith('http') ? post.heroImage : `https://maotaiblog.com${post.heroImage}`)
    : 'https://maotaiblog.com/gallery/retro-cat-girl.jpg';

  return {
    title: `${post.title} - 猫太博客`,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.title} - 猫太博客`,
      description: post.description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.pubDate,
      modifiedTime: post.updatedDate || post.pubDate,
      authors: [post.author || "茅台博主"],
      tags: post.tags,
      siteName: "猫太博客",
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - 猫太博客`,
      description: post.description,
      images: [heroImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const topic = post.topic;
  const relatedTools = getRelatedTools(topic?.id || "network");
  const isAirportReview = post.slug.includes("review");
  const airportName = isAirportReview ? post.title.split(/\s|\(|（/)[0].replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '') : undefined;
  const nextStepAction = getNextStepByTopic(topic?.id || "network", airportName);

  const heroImageUrl = post.heroImage
    ? (post.heroImage.startsWith('http') ? post.heroImage : `https://maotaiblog.com${post.heroImage}`)
    : 'https://maotaiblog.com/gallery/retro-cat-girl.jpg';

  // Schema: Article + BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": "https://maotaiblog.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "博客技术测评",
        "item": "https://maotaiblog.com/blog/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": topic?.name || "专题指南",
        "item": `https://maotaiblog.com${topic?.pillarSlug || "/blog/"}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": `https://maotaiblog.com/blog/${post.slug}/`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.description,
    "image": [heroImageUrl],
    "datePublished": post.pubDate,
    "dateModified": post.updatedDate || post.pubDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://maotaiblog.com/blog/${post.slug}/`
    },
    "author": {
      "@type": "Person",
      "name": post.author || "茅台博主",
      "url": "https://maotaiblog.com/about/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "猫太博客",
      "url": "https://maotaiblog.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://maotaiblog.com/logo.png"
      }
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* 结构化数据 Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* 面包屑导航 Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600 transition-colors">首页</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/blog" className="hover:text-brand-600 transition-colors">技术测评</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link 
          href={topic?.pillarSlug || "/blog"} 
          className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold text-slate-700 hover:text-brand-600 transition-colors"
        >
          {topic?.icon} {topic?.name}
        </Link>
      </nav>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card">
        {/* 文章头部 Header */}
        <header className="border-b border-slate-100 pb-6 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="rounded-full bg-brand-50 border border-brand-100 px-3 py-1 font-mono text-xs font-bold text-brand-600">
              {post.category}
            </span>
            {post.tags && post.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            {post.title}
          </h1>

          {/* 作者、团队与时间元数据 */}
          <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-slate-700 font-bold">
              <UserCheck className="h-3.5 w-3.5 text-brand-600" />
              <span>猫太评测组 · 审核发布</span>
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>发布: {post.pubDate}</span>
            </span>
            {post.updatedDate && (
              <span className="flex items-center gap-1 text-slate-400">
                <RotateCw className="h-3.5 w-3.5 text-emerald-500" />
                <span>实测更新: {post.updatedDate}</span>
              </span>
            )}
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              <span>预计阅读: {post.readTime}</span>
            </span>
          </div>

          {/* 摘要与 Key Takeaway */}
          <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
              <Sparkles className="h-3.5 w-3.5 text-brand-600" />
              <span>核心要点速览 (Key Takeaway)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {post.description}
            </p>
          </div>
        </header>

        {/* 目录导览 TOC */}
        {post.headings && post.headings.length > 0 && (
          <ArticleTOC headings={post.headings} />
        )}

        {/* 商业推广披露与合规声明 */}
        {isAirportReview && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 text-xs text-slate-500 flex items-center gap-2.5">
            <span className="font-bold text-slate-700 shrink-0">⚖️ 推广披露：</span>
            <span className="text-[11px] leading-relaxed">
              本文包含服务商 Affiliate 推广链接（已声明 <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[10px]">rel=&quot;sponsored nofollow&quot;</code>）。测试数据基于独立实测记录与公开套餐参数，评测保持独立与客观。
            </span>
          </div>
        )}

        {/* 评测基准环境说明 (仅针对评测类) */}
        <TestingMetricsCard isAirportReview={isAirportReview} />

        {/* 文章正文 HTML */}
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
        />

        {/* 推荐关联网络诊断工具箱 (Related Tools) */}
        <RelatedToolsCard tools={relatedTools} />

        {/* 意图导向转化模块 (Next Step) */}
        <NextStepCTA action={nextStepAction} />

        {/* 底部相关文章推荐 (Related Articles) */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-brand-600" />
              <h3 className="text-sm font-black text-slate-900">同主题核心推荐阅读</h3>
            </div>
            <Link
              href={topic?.pillarSlug || "/blog"}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline"
            >
              <span>查看全部 {topic?.name}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map(rp => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4 hover:border-brand-200 hover:bg-white hover:shadow-md transition-all cursor-pointer"
              >
                <div>
                  <span className="rounded-md bg-brand-50 px-2 py-0.5 font-mono text-[10px] font-bold text-brand-600 mb-2 inline-block">
                    {rp.category}
                  </span>
                  <h4 className="text-xs font-black text-slate-900 group-hover:text-brand-600 line-clamp-2 transition-colors leading-snug">
                    {rp.title}
                  </h4>
                  <p className="mt-1.5 text-[11px] text-slate-500 line-clamp-2 font-medium leading-relaxed">
                    {rp.description}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-brand-600 transition-colors">
                  <span>阅读全文</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </article>
    </div>
  );
}
