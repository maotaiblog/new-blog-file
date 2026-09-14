"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, Tag, Filter } from "lucide-react";
import { PostData } from "@/lib/posts";

interface Props {
  posts: PostData[];
}

export default function PostFilterList({ posts }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");

  // 提取所有分类
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return ["全部", ...Array.from(set)];
  }, [posts]);

  // 过滤后的文章
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchCat = selectedCategory === "全部" || post.category === selectedCategory;
      const matchSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));
      return matchCat && matchSearch;
    });
  }, [posts, selectedCategory, search]);

  return (
    <div className="space-y-6">
      {/* 搜索与分类 Tab 栏 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-saas-card space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* 分类 Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 站内文章即时搜索 */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="搜索测评文章或关键词..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:border-brand-600 focus:outline-none transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 结果状态小条 */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            当前展示 <strong className="text-slate-900 font-mono">{filteredPosts.length}</strong> 篇文章
            {selectedCategory !== "全部" && ` (分类: ${selectedCategory})`}
            {search && ` (关键词: "${search}")`}
          </span>
          {(selectedCategory !== "全部" || search) && (
            <button
              onClick={() => {
                setSelectedCategory("全部");
                setSearch("");
              }}
              className="font-bold text-brand-600 hover:underline cursor-pointer"
            >
              清除筛选
            </button>
          )}
        </div>
      </div>

      {/* 文章卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
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
                className="inline-flex items-center gap-1 font-bold text-brand-600 hover:underline cursor-pointer"
              >
                <span>阅读全文</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-400 text-xs font-bold">
          未找到匹配的文章，请尝试调整搜索关键词或重置分类筛选
        </div>
      )}
    </div>
  );
}
