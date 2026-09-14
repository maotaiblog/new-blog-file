import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { getRelatedTools, getNextStepByTopic } from "@/lib/topics";
import RelatedToolsCard from "@/components/blog/RelatedToolsCard";
import NextStepCTA from "@/components/blog/NextStepCTA";
import { Zap, ChevronRight, ArrowRight, BookOpen, HelpCircle, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Clash Verge Rev 与 Meta (Mihomo) 客户端分流实战指南 - 猫太实验室",
  description: "系统讲解 Clash Verge Rev 与 Mihomo 跨平台客户端配置教程：规则集订阅、TUN 虚拟网卡模式、GEOIP 分流策略与 DNS 防泄漏优化。",
  alternates: {
    canonical: "https://maotaiblog.com/blog/clash-guide/",
  },
  openGraph: {
    title: "Clash Verge Rev 与 Meta 客户端规则分流实战指南 - 猫太实验室",
    description: "系统讲解 Clash Verge Rev / Mihomo 跨平台客户端配置教程：规则集订阅、TUN 虚拟网卡模式与低延迟选路。",
    url: "https://maotaiblog.com/blog/clash-guide/",
    type: "article",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clash Verge 与 Meta 规则分流实战指南",
    description: "系统讲解 Clash Verge Rev / Mihomo 跨平台客户端配置教程与规则分流实战。",
  }
};

export default function ClashGuidePillar() {
  const allPosts = getSortedPostsData();
  const clashPosts = allPosts.filter(p => p.slug.includes("clash") || p.tags?.some(t => t.includes("Clash")));
  const relatedTools = getRelatedTools("client");
  const nextStep = getNextStepByTopic("client");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com" },
      { "@type": "ListItem", "position": 2, "name": "技术博客", "item": "https://maotaiblog.com/blog" },
      { "@type": "ListItem", "position": 3, "name": "Clash 客户端指南", "item": "https://maotaiblog.com/blog/clash-guide" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Clash 原版停止维护后，现在推荐使用哪款客户端？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "推荐使用基于开源 Mihomo (Clash.Meta) 内核维护的 Clash Verge Rev。它原生支持 VLESS、Hysteria2 等现代协议，修复了诸多安全漏洞并支持跨平台。"
        }
      },
      {
        "@type": "Question",
        "name": "如何防止 Clash 代理开启后本地国内网站变慢？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "确保开启了基于 CN-IP / GEOIP 的分流规则，并在 DNS 设置中开启 Fake-IP 模式或将国内域名直接定向到本地 ISP DNS 解析。"
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
        <span className="font-bold text-slate-900">Clash 客户端指南</span>
      </nav>

      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-indigo-50/40 to-blue-50/30 p-6 sm:p-10 shadow-saas-card">
        <div className="flex items-center gap-2 rounded-full bg-indigo-100/80 px-3 py-1 text-xs font-black text-indigo-700 w-fit mb-4">
          <Zap className="h-3.5 w-3.5" />
          <span>Core Topic Pillar · Clash 实战指南</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          Clash Verge Rev 与 Meta 客户端规则分流实战全景指南
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl">
          原版 Clash 归档后，基于 Meta 内核的开源生态已成为主流。本专栏深入浅出讲解如何配置 TUN 模式接管全系统流量、实现国内直连与国外智能选路，以及杜绝 DNS 泄漏的最佳配置。
        </p>
      </header>

      {/* 3 大核心要点 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-saas-card">
          <span className="text-xl mb-2 block">⚡</span>
          <h3 className="font-black text-slate-900 mb-1">TUN 虚拟网卡模式</h3>
          <p className="text-slate-500 leading-relaxed">
            解决传统系统代理无法代理终端命令行、某些外服游戏与 Docker 容器流量的痛点，实现网络层级全局拦截。
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-saas-card">
          <span className="text-xl mb-2 block">🛡️</span>
          <h3 className="font-black text-slate-900 mb-1">Fake-IP 与防 DNS 污染</h3>
          <p className="text-slate-500 leading-relaxed">
            客户端直接返回虚拟 IP (198.18.0.0/16)，将真实域名解析推迟至远端出口节点，从物理上杜绝本地 ISP DNS 劫持。
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-saas-card">
          <span className="text-xl mb-2 block">🎯</span>
          <h3 className="font-black text-slate-900 mb-1">自动化节点健康检测</h3>
          <p className="text-slate-500 leading-relaxed">
            利用 URL-Test 策略组每隔设定周期向探针发送握手包，在节点故障或晚高峰丢包时实现自动无感切换。
          </p>
        </div>
      </div>

      {/* 支撑文章 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            <span>核心客户端教程文章</span>
          </h2>
          <Link href="/blog/sing-box-guide" className="text-xs font-bold text-indigo-600 hover:underline">
            查阅 Sing-box 极速内核指南 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clashPosts.map(p => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-300 hover:shadow-saas-hover transition-all flex flex-col justify-between"
            >
              <div>
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 mb-2 inline-block">
                  {p.category}
                </span>
                <h3 className="text-xs font-black text-slate-900 group-hover:text-indigo-600 line-clamp-2">
                  {p.title}
                </h3>
                <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">{p.description}</p>
              </div>
              <span className="mt-3 text-[11px] font-bold text-indigo-600 inline-flex items-center gap-1">
                阅读全文 <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 常见问题 FAQ */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-black text-slate-900">Clash 客户端常见问答 (FAQ)</h2>
        </div>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1">Q: Clash 原版停止维护后，现在推荐使用哪款客户端？</h4>
            <p className="text-slate-600 leading-relaxed">
              A: 推荐使用基于开源 Mihomo (Clash.Meta) 内核维护的 Clash Verge Rev。它原生支持 VLESS、Hysteria2 等现代协议，修复了诸多安全漏洞并支持跨平台。
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1">Q: 如何防止 Clash 代理开启后本地国内网站变慢？</h4>
            <p className="text-slate-600 leading-relaxed">
              A: 确保开启了基于 CN-IP / GEOIP 的分流规则，并在 DNS 设置中开启 Fake-IP 模式或将国内域名直接定向到本地 ISP DNS 解析。
            </p>
          </div>
        </div>
      </section>

      <RelatedToolsCard tools={relatedTools} />
      <NextStepCTA action={nextStep} />
    </div>
  );
}
