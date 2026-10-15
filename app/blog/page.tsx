import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { TOPIC_CLUSTERS, TOOLS_DATABASE } from "@/lib/topics";
import PostFilterList from "@/components/blog/PostFilterList";
import { 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Activity, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2,
  Compass,
  Trophy,
  Apple
} from "lucide-react";

export const metadata: Metadata = {
  title: "技术测评、网络知识与 VPN 指南 - 猫太博客",
  description: "浏览猫太博客的网络技术文章：按网络性能、隐私安全、VPN、代理协议与故障排查查找指南和服务商评测，并通过相关测试工具及公开方法核对文章中的结论。",
  alternates: {
    canonical: "https://maotaiblog.com/blog/",
  },
  openGraph: {
    title: "技术测评、网络知识与 VPN 指南 - 猫太博客",
    description: "浏览猫太博客的网络技术文章：按网络性能、隐私安全、VPN、代理协议与故障排查查找指南和服务商评测，并通过相关测试工具及公开方法核对文章中的结论。",
    url: "https://maotaiblog.com/blog/",
    type: "website",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "技术测评、网络知识与 VPN 指南 - 猫太博客",
    description: "浏览猫太博客的网络技术文章：按网络性能、隐私安全、VPN、代理协议与故障排查查找指南和服务商评测，并通过相关测试工具及公开方法核对文章中的结论。",
  }
};

export default function BlogIndexPage() {
  const posts = getSortedPostsData();

  // 核心专题配置
  const topics = Object.values(TOPIC_CLUSTERS);

  // 核心精选权威文章 (4 篇)
  const featuredSlugs = [
    "airport-evaluation-whitepaper-full-2026",
    "2026-ultimate-airport-recommendation-guide-part1",
    "singbox-clash-guide",
    "agent-troubleshooting-sop-2026"
  ];
  const featuredPosts = posts.filter(p => featuredSlugs.includes(p.slug));

  // 博客技术 FAQ
  const faqs = [
    {
      q: "什么是 IEPL / IPLC 专线？与普通公网中继有什么区别？",
      a: "IPLC（国际私用出租线路）与 IEPL（国际以太网专线）属于内网跨境链路，流量在境内入口后通过专线传输，具有极低抖动与较少受晚高峰骨干拥塞干扰的特点。普通公网隧道在特殊时期更容易受到运营商 QoS 限速或波动影响。"
    },
    {
      q: "为什么即使开启了 VPN 或代理，部分服务仍能识别我的真实 IP？",
      a: "这通常由于 WebRTC STUN 穿透请求绕过代理，或者系统本地 DNS 仍指向运营商解析节点导致。建议使用本站提供的 WebRTC 检测与 DNS 泄露工具进行排查，并在客户端开启远端 DNS 解析与防泄漏策略。"
    },
    {
      q: "猫太博客的评测与测试数据是如何获取的？",
      a: "我们基于本地与多网络环境下的实际网络抓包、时延打点和持续性测试样本进行技术记录。测评过程严格遵循公开的测试方法论与白皮书打分标准，力求提供客观透明的参考依据。"
    },
    {
      q: "如何根据业务场景选择合适的网络连接方案？",
      a: "对于 AI 工具与高风控平台访问，建议优先考虑纯净机房 IP 或原生住宅 IP 节点；对于大文件传输与多媒体流媒体，建议优先测试实际带宽上限与长链路连接稳定性。"
    }
  ];

  const blogWebsiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "猫太博客",
    "url": "https://maotaiblog.com/blog/",
    "description": "网络性能、网络隐私、VPN、网络测试工具与网络技术知识内容平台。"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": "https://maotaiblog.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "技术博客与评测",
        "item": "https://maotaiblog.com/blog/"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogWebsiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Hero Content Hub 头部 */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 p-8 sm:p-12 shadow-saas-card relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-600 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-brand-600" />
            <span>网络性能量化 · 隐私防护 · 协议测评方法论</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            技术测评、网络知识与 <br />
            <span className="text-brand-600">VPN / 专线选型指南</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            猫太博客专注于网络隐私安全、出海网络性能量化与代理底层协议架构。我们通过自动化探针实测、白皮书打分模型与自研检测工具箱，帮助开发者、出海团队与数字游民建立安全可靠的全球网络链路。
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/rank/"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-xs font-bold text-white shadow-md shadow-pink-500/25 hover:opacity-90 active:scale-95 transition-all"
            >
              <Trophy className="h-4 w-4" />
              <span>🏆 2026 专线机场对比大盘</span>
            </Link>

            <Link
              href="/tools/my-ip/"
              className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 active:scale-95 transition-all"
            >
              <Activity className="h-4 w-4" />
              <span>⚡ 立即检测我的公网网络</span>
            </Link>

            <Link
              href="/whitepaper/airport-evaluation-methodology"
              className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
            >
              <FileText className="h-4 w-4 text-slate-500" />
              <span>查看评测白皮书</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 核心 Topic Clusters 专题模块 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              📂 核心知识专题 (Topic Clusters)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              系统化组织技术架构、线路评测、网络隐私与排错方案
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map(t => (
            <div
              key={t.id}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover hover:border-brand-200 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{t.icon}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-bold text-slate-600">
                    Topic Hub
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-brand-600 transition-colors">
                  {t.name}
                </h3>
                <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                  {t.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.keywords.map((kw, i) => (
                    <span key={i} className="rounded-md bg-slate-50 border border-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={t.pillarSlug || "/blog"}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>进入专题主页</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 核心精选权威文章 (Pillar / Featured Content) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ⭐ 核心权威指南与白皮书精选
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              全站奠基性方法论与高频技术排查必读
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredPosts.map(fp => (
            <Link
              key={fp.slug}
              href={`/blog/${fp.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-saas-card hover:shadow-saas-hover hover:border-brand-300 transition-all cursor-pointer"
            >
              <div>
                <span className="rounded-full bg-brand-50 border border-brand-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-brand-600 mb-3 inline-block">
                  {fp.category}
                </span>
                <h3 className="text-sm font-black text-slate-900 group-hover:text-brand-600 line-clamp-2 transition-colors leading-snug">
                  {fp.title}
                </h3>
                <p className="mt-2 text-xs text-slate-500 line-clamp-3 font-medium leading-relaxed">
                  {fp.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{fp.readTime}</span>
                <span className="flex items-center gap-1 text-brand-600 font-bold group-hover:translate-x-0.5 transition-transform">
                  阅读全文 <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. 网络检测互动工具箱 (Interactive Tools) */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 mb-1">
              <Zap className="h-4 w-4" />
              <span>实时在线交互</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              🛠️ 免费网络诊断与隐私加固工具箱
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              无须安装任何第三方插件，直接在浏览器中测试本地网络性能与隐私泄漏
            </p>
          </div>
          <Link
            href="/tools/my-ip/"
            className="rounded-xl bg-brand-50 border border-brand-100 px-4 py-2 text-xs font-bold text-brand-600 hover:bg-brand-100 transition-colors"
          >
            打开完整工具箱
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/tools/my-ip/"
            className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-5 hover:bg-white hover:border-brand-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl mb-2 block">📍</span>
              <h3 className="text-sm font-black text-slate-900 group-hover:text-brand-600 transition-colors">
                What Is My IP / 本地出口探针
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
                实时检测本地与出海公网 IPv4/IPv6、归属地理位置与自治域 ASN 信息。
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform">
              立即查询 <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          <Link
            href="/tools/dns-leak-test/"
            className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-5 hover:bg-white hover:border-brand-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl mb-2 block">🛡️</span>
              <h3 className="text-sm font-black text-slate-900 group-hover:text-brand-600 transition-colors">
                DNS Leak Test / 劫持污染检测
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
                对比本地解析与公共安全 DNS 解析结果，排查是否存在运营商域名劫持或污染。
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform">
              测试泄露 <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          <Link
            href="/tools/webrtc-test/"
            className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-5 hover:bg-white hover:border-brand-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl mb-2 block">🔍</span>
              <h3 className="text-sm font-black text-slate-900 group-hover:text-brand-600 transition-colors">
                WebRTC Leak Test / 穿透泄露检测
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
                检测浏览器 WebRTC STUN 协议是否在代理环境下暴露真实公网或内网候选地址。
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform">
              检测穿透 <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          <Link
            href="/tools/ping-test/"
            className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-5 hover:bg-white hover:border-brand-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl mb-2 block">⚡</span>
              <h3 className="text-sm font-black text-slate-900 group-hover:text-brand-600 transition-colors">
                Ping & Latency / 节点时延测定
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
                针对全球核心骨干节点执行真实 HTTP/TCP 往返时延测定与抖动波动分析。
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform">
              运行测速 <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>

        {/* 扩展工具快捷入口 */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
          <Link
            href="/tools/vpn-leak-test/"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-brand-50/50 hover:border-brand-200 border border-transparent transition-all"
          >
            <div className="flex items-center gap-2">
              <span>🔐</span>
              <span className="text-xs font-bold text-slate-800">VPN 综合防泄露检测</span>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          </Link>
          <Link
            href="/tools/vpn-speed-test/"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-brand-50/50 hover:border-brand-200 border border-transparent transition-all"
          >
            <div className="flex items-center gap-2">
              <span>🚀</span>
              <span className="text-xs font-bold text-slate-800">VPN 带宽与下载测速</span>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          </Link>
          <Link
            href="/tools/network-health/"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-brand-50/50 hover:border-brand-200 border border-transparent transition-all"
          >
            <div className="flex items-center gap-2">
              <span>📊</span>
              <span className="text-xs font-bold text-slate-800">网络综合健康度评估</span>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>
      </section>

      {/* 5. 全部文章列表与即时筛选 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              📚 全部评测与文章库 ({posts.length} 篇)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              支持按专线测评、使用教程、网络协议与自托管工具分类检索
            </p>
          </div>
        </div>

        <PostFilterList posts={posts} />
      </section>

      {/* 6. 博客首页技术 FAQ */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              常见网络技术与选型疑问 (FAQ)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              解答您在专线选型、协议优化与隐私防泄漏中的核心技术困惑
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 className="text-sm font-black text-slate-900 mb-2 flex items-start gap-2">
                <span className="text-brand-600 font-mono font-bold">Q:</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. 意图导向闭环 CTA 模块 */}
      <section className="rounded-3xl border border-brand-200 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl">
          <span className="rounded-full bg-white/20 px-3 py-1 font-mono text-xs font-bold text-white/90 mb-4 inline-block">
            SAFE & HIGH SPEED NETWORK
          </span>
          <h2 className="text-2xl sm:text-3xl font-black leading-tight">
            从排查到解决：建立专属于您的极速隐私网络
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-white/80 font-medium leading-relaxed">
            无论您是需要排查当前 Wi-Fi/蜂窝网络的 DNS 泄露，还是需要选购晚高峰 4K 8K 秒开、低抖动低丢包率的企业级 IEPL 专线，猫太技术生态均为您提供标准化保障。
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/tools/my-ip"
              className="rounded-2xl bg-white px-6 py-3 text-xs font-bold text-slate-900 hover:bg-slate-100 active:scale-95 transition-all shadow-md"
            >
              ⚡ 立即检测网络链路
            </Link>
            <Link
              href="/rank"
              className="rounded-2xl bg-white/15 border border-white/30 px-6 py-3 text-xs font-bold text-white hover:bg-white/25 active:scale-95 transition-all"
            >
              🏆 查看 2026 专线推荐大盘
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
