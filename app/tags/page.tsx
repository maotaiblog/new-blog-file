"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tag, Calendar, ArrowRight, BookOpen, Clock } from "lucide-react";

interface PostSimple {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  pubDate: string;
  readTime: string;
}

// 标签与文章映射
const allPostsWithTags: PostSimple[] = [
  {
    slug: "暮光加速-review",
    title: "2026 暮光加速深度实测：全 IEPL 专线晚高峰千兆测速与流媒体 AI 解锁",
    category: "机场测评",
    tags: ["IEPL专线", "ChatGPT解锁", "测速评测", "暮光加速"],
    pubDate: "2026-08-28",
    readTime: "6 min"
  },
  {
    slug: "隐形人-review",
    title: "隐形人 Cloud 评测：高性价比 BGP 中转多线容灾，轻量级翻墙与备选方案",
    category: "机场测评",
    tags: ["BGP中转", "高性价比", "备用机场", "隐形人Cloud"],
    pubDate: "2026-08-28",
    readTime: "5 min"
  },
  {
    slug: "微风网络-review",
    title: "微风网络：专为外服游戏与低延迟电竞设计的专线节点体验",
    category: "机场测评",
    tags: ["游戏低延迟", "电竞专线", "微风网络", "Hysteria2"],
    pubDate: "2026-08-28",
    readTime: "5 min"
  },
  {
    slug: "飞猫云-review",
    title: "飞猫云：大流量便宜备用机场体验报告，学生党与轻度需求推荐",
    category: "机场测评",
    tags: ["廉价机场", "大流量", "飞猫云", "备用节点"],
    pubDate: "2026-08-28",
    readTime: "4 min"
  },
  {
    slug: "singbox-clash-guide",
    title: "2026 现代代理客户端终极选型：Sing-box 与 Clash Meta (Mihomo) 对比指南",
    category: "教程指南",
    tags: ["Sing-box", "ClashMeta", "Mihomo", "客户端教程"],
    pubDate: "2026-08-28",
    readTime: "8 min"
  },
  {
    slug: "apple-id-us-guide",
    title: "免信用卡！2026 最新手把手注册美区 Apple ID 教程 (支持下载海外 App)",
    category: "出海指南",
    tags: ["美区AppleID", "AppStore", "出海工具", "iOS教程"],
    pubDate: "2026-08-28",
    readTime: "7 min"
  }
];

export default function TagsPage() {
  const [selectedTag, setSelectedTag] = useState<string>("全部");

  // 提取标签与计数
  const tagCounts: Record<string, number> = {};
  allPostsWithTags.forEach(post => {
    (post.tags || []).forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const tags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  const filteredPosts = selectedTag === "全部" 
    ? allPostsWithTags 
    : allPostsWithTags.filter(p => p.tags.includes(selectedTag));

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Tag className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              🏷️ 技术标签索引 (Interactive Tags)
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              点击下方标签即可即时筛选出所有关联技术文章
            </p>
          </div>
        </div>
      </div>

      {/* 标签列表 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card">
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setSelectedTag("全部")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              selectedTag === "全部"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <span>全部标签</span>
            <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-mono">
              {allPostsWithTags.length}
            </span>
          </button>

          {tags.map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                selectedTag === tag
                  ? "bg-pink-600 border-pink-600 text-white shadow-sm"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              <span>#{tag}</span>
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono border ${
                selectedTag === tag ? "bg-white/20 border-transparent text-white" : "bg-white border-slate-100 text-slate-400"
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 匹配文章展示 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-sm font-black text-slate-900">
            <BookOpen className="h-4 w-4 text-pink-600" />
            <span>标签【{selectedTag}】包含的文章 ({filteredPosts.length} 篇)</span>
          </div>
          {selectedTag !== "全部" && (
            <button
              onClick={() => setSelectedTag("全部")}
              className="text-xs font-bold text-pink-600 hover:underline cursor-pointer"
            >
              重置筛选
            </button>
          )}
        </div>

        <div className="divide-y divide-slate-100">
          {filteredPosts.map(post => (
            <div key={post.slug} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                    {post.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{post.pubDate}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-bold text-slate-900 group-hover:text-pink-600 transition-colors"
                >
                  {post.title}
                </Link>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-pink-600 hover:underline shrink-0 cursor-pointer"
              >
                <span>阅读</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
