import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { getRelatedTools, getNextStepByTopic } from "@/lib/topics";
import RelatedToolsCard from "@/components/blog/RelatedToolsCard";
import NextStepCTA from "@/components/blog/NextStepCTA";
import { Wrench, ChevronRight, ArrowRight, AlertTriangle, CheckCircle2, HelpCircle, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "VPN 连接失败、延迟飙高与断流排障自救全景指南 - 猫太实验室",
  description: "按步骤排查代理无法连接、节点超时、TLS 握手错误和 DNS 污染：先检查本地网络与系统时间，再核对客户端配置和订阅状态，并根据错误现象选择对应修复方法。",
  alternates: {
    canonical: "https://maotaiblog.com/blog/vpn-troubleshooting/",
  },
  openGraph: {
    title: "VPN 连接失败、延迟飙高与断流排障自救全景指南 - 猫太实验室",
    description: "系统化排查代理连不上、节点超时、TLS 握手报错与 DNS 污染等故障的标准 SOP 手册。",
    url: "https://maotaiblog.com/blog/vpn-troubleshooting/",
    type: "article",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "VPN 连接故障排查自救指南",
    description: "系统化排查代理连不上、节点超时与 TLS 握手报错的标准 SOP 手册。",
  }
};

export default function VpnTroubleshootingPillar() {
  const allPosts = getSortedPostsData();
  const troublePosts = allPosts.filter(p => p.topic?.id === "troubleshooting" || p.tags?.some(t => t.includes("排障") || t.includes("故障") || t.includes("自救")));
  const relatedTools = getRelatedTools("troubleshooting");
  const nextStep = getNextStepByTopic("troubleshooting");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com" },
      { "@type": "ListItem", "position": 2, "name": "技术博客", "item": "https://maotaiblog.com/blog" },
      { "@type": "ListItem", "position": 3, "name": "网络排障自救", "item": "https://maotaiblog.com/blog/vpn-troubleshooting" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "为什么所有节点测试都显示 Timeout / 超时？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "90% 的全红超时故障是由于本地系统时间与网络授时误差超过 90 秒（导致 TLS 握手证书校验失败），或是本地杀毒软件拦截了 TUN 虚拟网卡接口驱动。"
        }
      },
      {
        "@type": "Question",
        "name": "节点显示绿色连接成功，但网页仍然无法打开？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "此为典型 DNS 劫持或规则集路由阻断。检查系统代理端口是否正确，并将 DNS 模式切换为 Fake-IP 或使用 DoH 加密上游解析。"
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
        <span className="font-bold text-slate-900">故障排查自救手册</span>
      </nav>

      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30 p-6 sm:p-10 shadow-saas-card">
        <div className="flex items-center gap-2 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-black text-amber-800 w-fit mb-4">
          <Wrench className="h-3.5 w-3.5" />
          <span>Core Topic Pillar · 故障排查专栏</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          VPN 连接失败、延迟飙高与断流排障自救全景指南
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl">
          节点全红？握手超时？国内正常国外打不开？无需慌张。猫太实验室梳理了 5 步递进式诊断 SOP，覆盖时间同步、DNS 投毒、系统代理冲突与 TUN 虚拟驱动崩溃。
        </p>
      </header>

      {/* 5 步排查 SOP */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-4">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span>⚡</span>
          <span>高频故障自救 5 步排查 SOP</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <span className="font-black text-brand-600 block mb-1">Step 1: 检查本地系统时间</span>
            <p className="text-slate-500 leading-relaxed">
              TLS 证书校验依赖精确时间戳。若电脑时间误差超过 60 秒，所有节点必然握手失败。立即在系统设置开启“自动同步时间”。
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <span className="font-black text-brand-600 block mb-1">Step 2: 验证出口 IP 与连通性</span>
            <p className="text-slate-500 leading-relaxed">
              使用本站 <Link href="/tools/my-ip" className="text-brand-600 font-bold underline">公网 IP 探针</Link> 检测本地宽带是否正常，排除光猫脱机或局域网掉线。
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <span className="font-black text-brand-600 block mb-1">Step 3: 排查系统代理与端口冲突</span>
            <p className="text-slate-500 leading-relaxed">
              多个翻墙客户端（如 Clash 与 v2rayN）同时开启会抢占 7890 端口导致死锁。退出其他软件并重置系统代理。
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <span className="font-black text-brand-600 block mb-1">Step 4: 检测 DNS 污染与泄露</span>
            <p className="text-slate-500 leading-relaxed">
              运行 <Link href="/tools/dns-leak-test" className="text-brand-600 font-bold underline">DNS 泄露探针</Link>，确认当前解析是否已被本地运营商劫持，切换为 1.1.1.1 或 8.8.8.8 加密上游。
            </p>
          </div>
        </div>
      </div>

      {/* 支撑文章 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-600" />
            <span>精选故障诊断实操文章</span>
          </h2>
          <Link href="/rank" className="text-xs font-bold text-amber-600 hover:underline">
            节点依然卡顿？查阅稳定专线大盘 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {troublePosts.slice(0, 6).map(p => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-amber-300 hover:shadow-saas-hover transition-all flex flex-col justify-between"
            >
              <div>
                <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600 mb-2 inline-block">
                  {p.category}
                </span>
                <h3 className="text-xs font-black text-slate-900 group-hover:text-amber-600 line-clamp-2">
                  {p.title}
                </h3>
                <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">{p.description}</p>
              </div>
              <span className="mt-3 text-[11px] font-bold text-amber-600 inline-flex items-center gap-1">
                阅读全文 <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 常见问题解答 FAQ */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-amber-600" />
          <h2 className="text-lg font-black text-slate-900">排障自救常见问答 (FAQ)</h2>
        </div>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1">Q: 为什么所有节点测试都显示 Timeout / 超时？</h4>
            <p className="text-slate-600 leading-relaxed">
              A: 90% 的全红超时故障是由于本地系统时间与网络授时误差超过 90 秒（导致 TLS 握手证书校验失败），或是本地杀毒软件拦截了 TUN 虚拟网卡接口驱动。
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1">Q: 节点显示绿色连接成功，但网页仍然无法打开？</h4>
            <p className="text-slate-600 leading-relaxed">
              A: 此为典型 DNS 劫持或规则集路由阻断。检查系统代理端口是否正确，并将 DNS 模式切换为 Fake-IP 或使用 DoH 加密上游解析。
            </p>
          </div>
        </div>
      </section>

      <RelatedToolsCard tools={relatedTools} />
      <NextStepCTA action={nextStep} />
    </div>
  );
}
