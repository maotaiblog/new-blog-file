import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { getRelatedTools, getNextStepByTopic } from "@/lib/topics";
import RelatedToolsCard from "@/components/blog/RelatedToolsCard";
import NextStepCTA from "@/components/blog/NextStepCTA";
import { Trophy, ChevronRight, CheckCircle2, Zap, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "2026 专线机场评测与梯子选型全景指南 - 猫太博客",
  description: "深入解析 IEPL 纯专线、IPLC 内网跨境线路与 BGP 智能中继架构。结合晚高峰 持续实测实测、低丢包率标准与流媒体/AI 解锁能力，帮您挑选最稳定的翻墙机场。",
  alternates: {
    canonical: "https://maotaiblog.com/blog/airport-recommendation/",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 稳定机场推荐与专线梯子选型指南",
    description: "晚高峰 24/7 真实压测数据，涵盖 IPLC/IEPL 独享专线与 BGP 中继服务商深度对比。",
  },
  openGraph: {
    title: "2026 专线机场评测与梯子选型全景指南 - 猫太博客",
    description: "专注 2026 主流 IEPL/IPLC 专线与 BGP 中继机场的晚高峰延迟、丢包率、流媒体与 AI 真实解锁能力评测。",
    url: "https://maotaiblog.com/blog/airport-recommendation/",
    siteName: "猫太博客",
  }
};

export default function AirportRecommendationPillar() {
  const allPosts = getSortedPostsData();
  const airportReviews = allPosts.filter(p => p.slug.includes("review") || p.category === "测评" || p.category === "机场测评");
  const relatedTools = getRelatedTools("airport");
  const nextStep = getNextStepByTopic("airport");

  const faqs = [
    {
      q: "为什么晚高峰时期很多廉价机场会严重卡顿丢包？",
      a: "普通廉价机场多采用公网直连或普通单线 VPS 转发，在晚间（20:00-23:00）国际出口带宽拥塞时，公网数据包会遭到运营商严格的 QoS（服务质量限速）与高频丢包。而企业级 IEPL/IPLC 专线走物理隔离内网，不与公网竞争带宽，因此能保持 低丢包与满速表现。"
    },
    {
      q: "流媒体与 AI 解锁（Netflix / ChatGPT）主要取决于什么？",
      a: "主要取决于出口节点的 IP 纯净度。若机房 IP 遭遇大量用户共享滥用，容易被 OpenAI 或流媒体服务商的风控系统列入黑名单，出现 Access Denied。优质服务商会配备原生住宅 IP 或针对流媒体/AI 建立独立的干净出口池。"
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 面包屑 */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600">首页</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/blog" className="hover:text-brand-600">技术测评</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-bold text-slate-900">机场评测与专线选型</span>
      </nav>

      {/* 头部 Hero */}
      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-pink-50/30 to-amber-50/20 p-6 sm:p-10 shadow-saas-card">
        <div className="flex items-center gap-2 rounded-full bg-pink-100/80 px-3 py-1 text-xs font-black text-pink-700 w-fit mb-4">
          <Trophy className="h-3.5 w-3.5" />
          <span>Core Topic Pillar · 核心权威专栏</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          2026 专线机场评测、网络性能量化与梯子选型全景指南
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl">
          在网络审查与跨境国际出口 QoS 限制日益严苛的 2026 年，单纯比较“节点数量”已毫无参考意义。本专题聚合猫太实验室对主流服务商的客观评测，从物理链路架构（IEPL、IPLC、BGP）、晚高峰 RTT 波动、TCP 重传率、流媒体双向解锁及风控抵抗能力出发，为您提供透明、真实的数据支撑。
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/rank"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-pink-500/20 hover:opacity-90 active:scale-95 transition-all"
          >
            <span>🏆 直达 2026 机场对比排行榜</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/whitepaper/airport-evaluation-methodology"
            className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
          >
            <span>查阅评测打分体系白皮书</span>
          </Link>
        </div>
      </header>

      {/* 核心知识点拆解 */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-6">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          <span>专线选型必备知识：如何看懂线路与架构？</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <span className="font-bold text-slate-900 block mb-1">1. IEPL 物理专线 (最优)</span>
            <p className="text-slate-500 leading-relaxed">
              以太网专线，在二层建立点对点通信隧道，完全不经过公网 GFW 审查节点，延迟最贴近物理极限，晚高峰丢包趋近于 0.00%。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <span className="font-bold text-slate-900 block mb-1">2. IPLC 国际私线 (稳定)</span>
            <p className="text-slate-500 leading-relaxed">
              传统点对点专线，多用于跨国企业或大型金融机构，延迟极低且免受国内出口风控影响，非常适合外服电竞与超清 8K 视频秒开。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <span className="font-bold text-slate-900 block mb-1">3. BGP 多线中继 (性价比)</span>
            <p className="text-slate-500 leading-relaxed">
              国内入口通过 BGP 分流路由吸纳移动、联通、电信三网流量，经加密隧道传输至境外机房。价格亲民且备用节点多，容灾能力强。
            </p>
          </div>
        </div>
      </section>

      {/* 关联评测文章列表 */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            📝 收录的 18 家机场深度实测报告
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            更新至 2026 最新版本
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {airportReviews.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 hover:border-pink-300 hover:shadow-saas-hover transition-all cursor-pointer"
            >
              <div>
                <span className="rounded-md bg-pink-50 px-2 py-0.5 font-mono text-[10px] font-bold text-pink-600 mb-2 inline-block">
                  {post.category}
                </span>
                <h3 className="text-xs font-black text-slate-900 group-hover:text-pink-600 line-clamp-2 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{post.readTime}</span>
                <span className="flex items-center gap-1 font-bold text-pink-600 group-hover:translate-x-0.5 transition-transform">
                  查看评测 <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 关联工具 */}
      <RelatedToolsCard tools={relatedTools} />

      {/* FAQ 模块 */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card">
        <h2 className="text-base sm:text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-brand-600" />
          <span>常见疑问解答</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Q: {f.q}</span>
              <p className="text-slate-600 leading-relaxed font-medium">A: {f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 下一步行动 */}
      <NextStepCTA action={nextStep} />
    </div>
  );
}
