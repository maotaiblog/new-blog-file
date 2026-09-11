import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "技术测评博客与白皮书归档 - 猫太博客",
  description: "猫太博客 2026 技术测评博客归档。关注专线机场打分、Sing-box/Clash 配置指南、自托管 Docker 工具与网络故障自救 SOP。",
};

export default function BlogIndexPage() {
  const posts = getSortedPostsData();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              📖 技术测评博客与白皮书归档
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              共收录 {posts.length} 篇 2026 深度专线测评白皮书、Sing-box/Clash 教程与排查 SOP
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div
            key={post.slug}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="rounded-full bg-brand-50 border border-brand-100 px-3 py-1 font-mono text-xs font-bold text-brand-600">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <Calendar className="h-3 w-3" />
                  {post.pubDate}
                </span>
              </div>

              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-base font-black text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </Link>

              <p className="mt-2 text-xs text-slate-500 font-medium line-clamp-3 leading-relaxed">
                {post.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-slate-400 font-mono">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 font-bold text-brand-600 hover:underline"
              >
                阅读全文 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
