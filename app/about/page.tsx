import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Trophy, Apple } from "lucide-react";
import TrustClusterNav from "@/components/layout/TrustClusterNav";

export const metadata: Metadata = {
  title: "关于猫太实验室 - 网络隐私、性能与出海技术量化",
  description: "认识猫太博客及其网络性能与隐私实验室：了解站点关注的 VPN、代理协议、IEPL/IPLC 专线评测和免费诊断工具，以及公开测试方法、编辑准则与联系渠道。",
  alternates: {
    canonical: "https://maotaiblog.com/about/",
  },
  openGraph: {
    title: "关于猫太实验室 - 网络隐私、性能与出海技术量化",
    description: "专注跨境网络协议底层原理解析、晚高峰专线客观测评与网络隐私诊断工具研发。",
    url: "https://maotaiblog.com/about/",
    type: "website",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "关于猫太实验室",
    description: "专注跨境网络协议底层原理解析、晚高峰专线客观测评与网络隐私诊断工具研发。",
  }
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card">
        {/* Header 头像与介绍 */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-100 pb-8 mb-8">
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-4 border-pink-200 shadow-md">
            <img src="/logo.png" alt="猫太博客头像" className="h-full w-full object-cover" />
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">猫太博客 🌸</h1>
              <span className="rounded-full bg-pink-100 px-3 py-0.5 text-xs font-bold text-pink-600">站长</span>
            </div>
            <p className="mt-1 text-xs font-mono text-pink-500 font-bold tracking-widest">
              90s ANIME AESTHETIC & GLOBAL NETWORK TECH
            </p>
            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
              这里是猫太的独立技术自留地。我们专注全球专线网络加速（IEPL/IPLC）、外服低延迟节点评测、免费美区 Apple ID 维护与自托管生产力搭建。
            </p>
          </div>
        </div>

        {/* 核心理念 */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-pink-500" />
            <span>我们的三大坚持</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1">1. 真实客观数据</h3>
              <p className="text-slate-500 text-xs">拒绝虚构打分，所有延迟与丢包率均基于客户端真实测试环境记录。</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1">2. 免费工具共享</h3>
              <p className="text-slate-500 text-xs">持续维护免登录的网络检测工具，降低隐私体检与出海探索门槛。</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1">3. 纯粹与安全第一</h3>
              <p className="text-slate-500 text-xs">坚守端到端加密与隐私保护规范，严控合规界限与风控提醒。</p>
            </div>
          </div>

          <h2 className="text-lg font-black text-slate-900 pt-4">快速传送门</h2>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/rank/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-pink-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-pink-600 transition-all shadow-sm"
            >
              <Trophy className="h-4 w-4" />
              <span>🏆 2026 机场推荐对比大盘</span>
            </Link>
            <Link
              href="/apple-id/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-700 transition-all shadow-sm"
            >
              <Apple className="h-4 w-4" />
              <span>🍎 免费美区 Apple ID 共享池</span>
            </Link>
            <a
              href="https://t.me/+KMqGQjOeRY1hNjY1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-pink-200 bg-pink-50 px-4 py-2.5 text-xs font-bold text-pink-600 hover:bg-pink-100 transition-all"
            >
              <span>💬 加入官方 Telegram 交流群 ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* 信任矩阵导航 */}
      <TrustClusterNav current="about" />
    </div>
  );
}
