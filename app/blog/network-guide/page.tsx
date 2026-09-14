import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { getRelatedTools, getNextStepByTopic } from "@/lib/topics";
import RelatedToolsCard from "@/components/blog/RelatedToolsCard";
import NextStepCTA from "@/components/blog/NextStepCTA";
import { Globe, ChevronRight, ArrowRight, Activity, Network, HelpCircle, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "网络底层协议、BGP 选路与专线原理全景指南 - 猫太实验室",
  description: "深入解析 BGP 动态自治域选路、IPLC 与 IEPL 物理专线架构、光电传输极限与 RTT 往返时延、TCP 拥塞控制及 DNS 污染防御逻辑。",
  alternates: {
    canonical: "https://maotaiblog.com/blog/network-guide/",
  },
  openGraph: {
    title: "网络底层协议、BGP 选路与专线原理全景指南 - 猫太实验室",
    description: "深入解析 BGP 动态自治域选路、IPLC/IEPL 物理专线架构、RTT 往返时延与 TCP 拥塞控制机制。",
    url: "https://maotaiblog.com/blog/network-guide/",
    type: "article",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "网络底层协议与专线原理指南",
    description: "深入解析 BGP 动态自治域选路、IPLC/IEPL 物理专线架构与 RTT 往返时延机制。",
  }
};

export default function NetworkGuidePillar() {
  const allPosts = getSortedPostsData();
  const networkPosts = allPosts.filter(p => p.topic?.id === "network" || p.tags?.some(t => t.includes("网络") || t.includes("专线")));
  const relatedTools = getRelatedTools("network");
  const nextStep = getNextStepByTopic("network");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com" },
      { "@type": "ListItem", "position": 2, "name": "技术博客", "item": "https://maotaiblog.com/blog" },
      { "@type": "ListItem", "position": 3, "name": "网络底层知识", "item": "https://maotaiblog.com/blog/network-guide" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "为什么物理专线 (IPLC/IEPL) 晚高峰不会卡顿？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "物理专线采用点对点端到端租用光缆，完全绕过公网国际出口路由器和 GFW 深度包检测 (DPI)，享有物理独享带宽与 低丢包 SLA。"
        }
      },
      {
        "@type": "Question",
        "name": "中港/中美跨境网络的最低物理极限延迟是多少？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "光在玻璃光纤中的传播速度约为 200,000 km/s。深圳到香港物理 RTT 约 2~4ms，上海到东京约 28~32ms，上海到洛杉矶跨太平洋海缆直线物理极限在 125ms 左右。"
        }
      }
    ]
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600 transition-colors">首页</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/blog" className="hover:text-brand-600 transition-colors">技术博客</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-bold text-slate-900">网络底层协议与知识</span>
      </nav>

      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/30 p-6 sm:p-10 shadow-saas-card">
        <div className="flex items-center gap-2 rounded-full bg-blue-100/80 px-3 py-1 text-xs font-black text-brand-700 w-fit mb-4">
          <Globe className="h-3.5 w-3.5" />
          <span>Core Topic Pillar · 网络知识专栏</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          现代出海网络协议、BGP 路由与物理专线架构全景指南
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl">
          为什么专线的 Ping 延迟更低？为什么晚高峰普通线路丢包激增？本专栏拆解自治域系统 (ASN)、BGP Anycast、Hysteria2/TUIC 基于 UDP 的拥塞控制模型，帮助您从底层网络原理出发，洞悉连接延迟与丢包的本质根源。
        </p>
      </header>

      {/* 3 大核心技术原理解析 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-saas-card">
          <span className="text-xl mb-2 block">⚡</span>
          <h3 className="font-black text-slate-900 mb-1">RTT 往返时延模型</h3>
          <p className="text-slate-500 leading-relaxed">
            光在光纤中的传播速度约为 200,000 km/s。从上海到洛杉矶的直线距离导致纯物理 RTT 极限约在 120ms~130ms，任何低于此值的公网测试数据均为前端假握手或欺骗性缓存。
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-saas-card">
          <span className="text-xl mb-2 block">📡</span>
          <h3 className="font-black text-slate-900 mb-1">TCP 拥塞与丢包倍增</h3>
          <p className="text-slate-500 leading-relaxed">
            在传统 TCP 协议下，1% 的丢包率即可导致下载吞吐量下降 50% 以上并触发拥塞窗口回退。物理专线通过保障 低丢包，使真实带宽能够完全跑满千兆光纤。
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-saas-card">
          <span className="text-xl mb-2 block">🛡️</span>
          <h3 className="font-black text-slate-900 mb-1">DNS 污染与 Anycast</h3>
          <p className="text-slate-500 leading-relaxed">
            公网递归解析易遭本地运营商劫持投毒。通过部署 DoH (DNS-over-HTTPS) 与安全分流沙箱，可阻断虚假 IP 响应。
          </p>
        </div>
      </div>

      {/* 精选支撑文章 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-600" />
            <span>核心技术深度解析</span>
          </h2>
          <Link href="/whitepaper/airport-evaluation-methodology" className="text-xs font-bold text-brand-600 hover:underline">
            参考《实验室评测白皮书》→
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {networkPosts.slice(0, 6).map(p => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-brand-300 hover:shadow-saas-hover transition-all flex flex-col justify-between"
            >
              <div>
                <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-600 mb-2 inline-block">
                  {p.category}
                </span>
                <h3 className="text-xs font-black text-slate-900 group-hover:text-brand-600 line-clamp-2">
                  {p.title}
                </h3>
                <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">{p.description}</p>
              </div>
              <span className="mt-3 text-[11px] font-bold text-brand-600 inline-flex items-center gap-1">
                阅读全文 <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 常见问题解答 FAQ */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-brand-600" />
          <h2 className="text-lg font-black text-slate-900">网络知识专栏常见问答 (FAQ)</h2>
        </div>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1">Q: 为什么物理专线 (IPLC/IEPL) 晚高峰不会卡顿？</h4>
            <p className="text-slate-600 leading-relaxed">
              A: 物理专线采用点对点端到端租用光缆，完全绕过公网国际出口路由器和 GFW 深度包检测 (DPI)，享有物理独享带宽与 低丢包 SLA。
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1">Q: 中港/中美跨境网络的最低物理极限延迟是多少？</h4>
            <p className="text-slate-600 leading-relaxed">
              A: 光在玻璃光纤中的传播速度约为 200,000 km/s。深圳到香港物理 RTT 约 2~4ms，上海到东京约 28~32ms，上海到洛杉矶跨太平洋海缆直线物理极限在 125ms 左右。
            </p>
          </div>
        </div>
      </section>

      <RelatedToolsCard tools={relatedTools} />
      <NextStepCTA action={nextStep} />
    </div>
  );
}
