import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - 页面未找到 | 猫太博客",
  description: "抱歉，您访问的页面不存在或已被移除。",
  robots: {
    index: false,
    follow: true,
  }
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-saas-card">
        <span className="text-6xl font-black text-brand-600 font-mono block mb-4">404</span>
        <h1 className="text-2xl font-black text-slate-900 mb-2">抱歉，页面未找到</h1>
        <p className="text-sm text-slate-500 mb-8">
          您所请求的页面地址可能已变更或已下线。您可以返回首页或查阅技术博客。
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-2xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-700 transition-all"
          >
            <Home className="h-4 w-4" />
            <span>返回首页</span>
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
          >
            <Search className="h-4 w-4" />
            <span>浏览技术博客</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
