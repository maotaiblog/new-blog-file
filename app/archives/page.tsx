import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { Calendar, BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "文章时间归档 - 猫太博客",
  description: "猫太博客全站文章时间线归档。",
};

export default function ArchivesPage() {
  const posts = getSortedPostsData();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              💌 文章时间归档 (全部时间轴)
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              共收录 {posts.length} 篇技术文章与测评指南
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card">
        <div className="space-y-6 relative border-l-2 border-pink-100 ml-4 pl-6">
          {posts.map(post => (
            <div key={post.slug} className="relative group">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-pink-400 border-2 border-white shadow-sm"></span>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors"
                >
                  {post.title}
                </Link>
                <span className="text-xs font-mono text-slate-400 shrink-0">{post.pubDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
