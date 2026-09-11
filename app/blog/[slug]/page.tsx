import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSortedPostsData, getPostData } from "@/lib/posts";
import { Calendar, Clock, ArrowLeft, Trophy, ArrowRight } from "lucide-react";

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

  return {
    title: `${post.title} - 猫太博客`,
    description: post.description,
    openGraph: {
      title: `${post.title} - 猫太博客`,
      description: post.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.pubDate,
    "author": {
      "@type": "Organization",
      "name": "猫太博客"
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>返回文章列表</span>
      </Link>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card">
        {/* 文章 Header */}
        <header className="border-b border-slate-100 pb-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="rounded-full bg-brand-50 border border-brand-100 px-3 py-1 font-mono text-xs font-bold text-brand-600">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              {post.pubDate}
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            {post.title}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {post.description}
          </p>
        </header>

        {/* 文章正文 HTML */}
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
        />

        {/* 底部推荐定向 Banner */}
        <div className="mt-12 rounded-3xl border border-pink-200 bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-md">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">需要选购 2026 稳定翻墙机场？</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                查看 暮光加速(#1)、隐形人 Cloud(#2) 24/7 分布式探针对比
              </p>
            </div>
          </div>
          <Link
            href="/rank"
            className="shrink-0 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-90 transition-all flex items-center gap-1"
          >
            <span>👉 直达 2026 机场推荐对比大盘</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </article>
    </div>
  );
}
