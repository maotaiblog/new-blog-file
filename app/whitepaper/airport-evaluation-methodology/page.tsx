import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ChevronRight, ArrowRight, ShieldCheck, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "机场评测与定量打分体系方法论白皮书 - 猫太实验室",
  description: "阅读猫太实验室的机场评测方法论：了解线路、性能、解锁、价格与稳定性等维度的评分口径，以及测试时段、探针环境和数据复核方式，便于比较不同服务商的结果。",
  alternates: {
    canonical: "https://maotaiblog.com/whitepaper/airport-evaluation-methodology/",
  }
};

export default function WhitepaperMethodologyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600">首页</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/whitepaper" className="hover:text-brand-600">白皮书中心</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-bold text-slate-900">机场评测定量打分体系</span>
      </nav>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card space-y-8">
        <header className="border-b border-slate-100 pb-6">
          <span className="rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 font-mono text-xs font-bold text-indigo-700 mb-3 inline-block">
            METHODOLOGY WHITEPAPER 2026
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            机场评测与定量打分体系白皮书（2026 权威准则）
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            发布机构：猫太评测实验室 · 适用范围：全站 18 家专线服务商及未来评测纳入对象
          </p>
        </header>

        <section className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-lg font-black text-slate-900">一、 为什么需要定量化评测体系？</h2>
          <p>
            传统网络测评普遍存在以下痛点：截图缺乏测试时间与运营商说明、测试时段避开晚高峰制造虚假千兆、忽略协议安全与真实流媒体风控。本白皮书旨在以数据透明度为核心，建立可重复验证的科学评估模型。
          </p>

          <h2 className="text-lg font-black text-slate-900">二、 核心五维打分模型 (Weight Model)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose my-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <strong className="text-slate-900 block mb-1">1. 晚高峰丢包与稳定性 (权重 35%)</strong>
              在 20:00 - 23:00 进行 1000 次持续 Ping 探测。丢包率高于 3% 即行扣分，极低丢包专线获满分。
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <strong className="text-slate-900 block mb-1">2. 流媒体与 AI 双向解锁率 (权重 25%)</strong>
              每日定时轮询 Netflix, Disney+, YouTube Premium, OpenAI ChatGPT 及 Claude 解锁状态。
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <strong className="text-slate-900 block mb-1">3. 线路物理架构与冗余 (权重 20%)</strong>
              审查是否具备企业级 IEPL/IPLC 纯专线链路，以及单线中断时的 BGP 自动故障切换机制。
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <strong className="text-slate-900 block mb-1">4. 峰值吞吐量与单价流速比 (权重 15%)</strong>
              单 GB 流量价格与千兆宽带跑满比例综合计算，打击虚标倍率套路。
            </div>
          </div>

          <h2 className="text-lg font-black text-slate-900">三、 零伪造与独立声明</h2>
          <p>
            猫太实验室承诺绝不捏造任何测速结果或伪造权威认证。若某一指标因网络波动无法测得，统一标注为“Not Tested / 暂无实测数据”。本站评测受编辑独立准则监管。
          </p>
        </section>

        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/rank"
            className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-xs font-bold text-white shadow-md hover:opacity-90 transition-all flex items-center gap-1.5"
          >
            <Trophy className="h-4 w-4" />
            <span>查看应用本白皮书打分的 2026 排行榜大盘</span>
          </Link>
          <Link
            href="/editorial-policy"
            className="text-xs font-bold text-slate-600 hover:text-brand-600"
          >
            阅读编辑独立准则 →
          </Link>
        </div>
      </article>
    </div>
  );
}
