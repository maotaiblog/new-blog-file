import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { getRelatedTools, getNextStepByTopic } from "@/lib/topics";
import RelatedToolsCard from "@/components/blog/RelatedToolsCard";
import NextStepCTA from "@/components/blog/NextStepCTA";
import { Zap, ChevronRight, ArrowRight, BookOpen, HelpCircle, Cpu, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Sing-box 极简配置与高性能路由全景指南 - 猫太实验室",
  description: "全面剖析通用代理平台 Sing-box 架构设计：极低内存占用、二进制编译规则集 (Rule-set)、入站出站多协议链路与 Tun 高性能内核实战。",
  alternates: {
    canonical: "https://maotaiblog.com/blog/sing-box-guide/",
  },
  openGraph: {
    title: "Sing-box 规则集、高性能路由与出海配置全景指南 - 猫太实验室",
    description: "全面掌握 Sing-box 核心配置架构：原生 TUN 模式低内存占用、Rule-Set 规则集编译与多协议入站实践。",
    url: "https://maotaiblog.com/blog/sing-box-guide/",
    type: "article",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sing-box 规则集与高性能路由全景指南",
    description: "全面掌握 Sing-box 核心配置架构与高性能路由实践。",
  }
};

export default function SingBoxGuidePillar() {
  const allPosts = getSortedPostsData();
  const singboxPosts = allPosts.filter(p => p.slug.includes("singbox") || p.tags?.some(t => t.includes("Sing-box")));
  const relatedTools = getRelatedTools("client");
  const nextStep = getNextStepByTopic("client");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com" },
      { "@type": "ListItem", "position": 2, "name": "技术博客", "item": "https://maotaiblog.com/blog" },
      { "@type": "ListItem", "position": 3, "name": "Sing-box 指南", "item": "https://maotaiblog.com/blog/sing-box-guide" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "相比 Clash，Sing-box 最大的技术优势是什么？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sing-box 采用 Go 语言全新重构，内存占用通常仅为 Clash 的 1/3 到 1/2，具备极高吞吐并发性能，且支持官方二进制预编译规则集 (.srs)，规则匹配开销大幅降低。"
        }
      },
      {
        "@type": "Question",
        "name": "Sing-box 支持哪些新兴的现代翻墙协议？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sing-box 第一时间原生支持 Hysteria2 (QUIC/UDP)、TUIC、ShadowTLS、VLESS-Reality 等现代化对抗 GFW 探测的主流抗封锁协议。"
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
        <span className="font-bold text-slate-900">Sing-box 高性能指南</span>
      </nav>

      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-cyan-50/40 to-emerald-50/30 p-6 sm:p-10 shadow-saas-card">
        <div className="flex items-center gap-2 rounded-full bg-cyan-100/80 px-3 py-1 text-xs font-black text-cyan-800 w-fit mb-4">
          <Cpu className="h-3.5 w-3.5" />
          <span>Core Topic Pillar · Sing-box 高性能指南</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          Sing-box 规则集、高性能路由与出海配置全景指南
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl">
          Sing-box 作为新一代全功能通用通用代理平台，正在迅速重塑出海开发者的技术栈。本专栏深度拆解其 JSON 规范结构、二进制 Rule-Set 编译优化及嵌入式软路由部署实践。
        </p>
      </header>

      {/* 3 大核心架构解析 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-saas-card">
          <span className="text-xl mb-2 block">🚀</span>
          <h3 className="font-black text-slate-900 mb-1">极低内存占用与并发</h3>
          <p className="text-slate-500 leading-relaxed">
            在百兆或千兆大流量长时间吞吐下，Sing-box 的垃圾回收 (GC) 开销显著降低，特别适合在低配 VPS 或家用旁路由中长期稳定运行。
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-saas-card">
          <span className="text-xl mb-2 block">📦</span>
          <h3 className="font-black text-slate-900 mb-1">二进制 Rule-Set 规则集</h3>
          <p className="text-slate-500 leading-relaxed">
            支持加载经预编译的 .srs 二进制规则集，省去启动时大量解析文本规则的 CPU 消耗，规则匹配耗时从毫秒级降至微秒级。
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-saas-card">
          <span className="text-xl mb-2 block">🛡️</span>
          <h3 className="font-black text-slate-900 mb-1">前沿协议原生第一支持</h3>
          <p className="text-slate-500 leading-relaxed">
            无需外部第三方插件，原生完整支持 Hysteria2、TUIC v5、Shadowsocks 2022 与 Reality 握手，全面领先老旧内核。
          </p>
        </div>
      </div>

      {/* 支撑文章 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-cyan-600" />
            <span>核心技术教程文章</span>
          </h2>
          <Link href="/blog/clash-guide" className="text-xs font-bold text-cyan-600 hover:underline">
            对比查阅 Clash 客户端指南 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {singboxPosts.map(p => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-cyan-300 hover:shadow-saas-hover transition-all flex flex-col justify-between"
            >
              <div>
                <span className="rounded-md bg-cyan-50 px-2 py-0.5 text-[10px] font-bold text-cyan-600 mb-2 inline-block">
                  {p.category}
                </span>
                <h3 className="text-xs font-black text-slate-900 group-hover:text-cyan-600 line-clamp-2">
                  {p.title}
                </h3>
                <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">{p.description}</p>
              </div>
              <span className="mt-3 text-[11px] font-bold text-cyan-600 inline-flex items-center gap-1">
                阅读全文 <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 常见问题 FAQ */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-cyan-600" />
          <h2 className="text-lg font-black text-slate-900">Sing-box 常见问答 (FAQ)</h2>
        </div>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1">Q: 相比 Clash，Sing-box 最大的技术优势是什么？</h4>
            <p className="text-slate-600 leading-relaxed">
              A: Sing-box 采用 Go 语言全新重构，内存占用通常仅为 Clash 的 1/3 到 1/2，具备极高吞吐并发性能，且支持官方二进制预编译规则集 (.srs)，规则匹配开销大幅降低。
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1">Q: Sing-box 支持哪些新兴的现代翻墙协议？</h4>
            <p className="text-slate-600 leading-relaxed">
              A: Sing-box 第一时间原生支持 Hysteria2 (QUIC/UDP)、TUIC、ShadowTLS、VLESS-Reality 等现代化对抗 GFW 探测的主流抗封锁协议。
            </p>
          </div>
        </div>
      </section>

      <RelatedToolsCard tools={relatedTools} />
      <NextStepCTA action={nextStep} />
    </div>
  );
}
