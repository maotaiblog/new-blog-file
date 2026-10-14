import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  Activity, 
  Wifi, 
  CheckCircle2, 
  ArrowRight, 
  Gamepad2, 
  Building2, 
  Code2, 
  ShieldCheck,
  RotateCw,
  Globe,
  Lock,
  Layers,
  Gauge,
  HelpCircle,
  BookOpen,
  Trophy,
  Server,
  Zap,
  ArrowUpDown
} from "lucide-react";
import NetworkHealthWidget from "@/components/tools/NetworkHealthWidget";

export const metadata: Metadata = {
  title: "2026机场推荐与稳定专线选购评测实验室 | 猫太博客",
  description: "猫太博客 2026 机场推荐大盘：专注主流 IPLC/IEPL 专线机场晚高峰测速、4K流媒体与 ChatGPT 解锁评测，提供真实可信的机场推荐、网络隐私诊断工具与客户端配置指南。",
  alternates: {
    canonical: "https://maotaiblog.com/",
  },
  openGraph: {
    title: "2026机场推荐与稳定专线选购评测实验室 | 猫太博客",
    description: "专注主流 IPLC/IEPL 专线机场晚高峰测速、4K流媒体与 ChatGPT 解锁评测，提供真实客观的机场推荐与网络诊断工具。",
    url: "https://maotaiblog.com/",
    siteName: "猫太博客",
    images: [
      {
        url: "https://maotaiblog.com/gallery/retro-cat-girl.jpg",
        width: 1200,
        height: 630,
        alt: "2026机场推荐与专线网络评测",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026机场推荐与稳定专线选购评测实验室 | 猫太博客",
    description: "专注主流 IPLC/IEPL 专线机场晚高峰测速、4K流媒体与 ChatGPT 解锁评测。",
    images: ["https://maotaiblog.com/gallery/retro-cat-girl.jpg"],
  },
};

export default function HomePage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "2026 专线机场推荐与网络性能测试实验室",
    "url": "https://maotaiblog.com/",
    "description": "专注主流 IPLC/IEPL 专线机场晚高峰测速、4K流媒体与 ChatGPT 解锁测试，提供真实可信的机场评测、网络诊断工具与客户端配置指南。",
    "isPartOf": {
      "@type": "WebSite",
      "name": "猫太博客",
      "url": "https://maotaiblog.com/"
    }
  };

  return (
    <div className="w-full relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {/* Screen 1: Hero Section - 首页核心聚焦 2026 专线机场推荐与网络测试实验室 */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            {/* 左侧：核心文案与 CTA */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-600 mb-6">
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
                <span>猫太网络实验室 · 真实数据驱动的跨境测试平台</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                2026 专线机场推荐与网络性能测试实验室
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                免费检测 IP、DNS、WebRTC、延迟、丢包与网络健康状态，基于真实测试数据为您提供客观的 2026 专线机场推荐、IEPL/IPLC 链路对比与跨平台客户端配置指南。
              </p>

              {/* 3 个符合用户意图的核心 CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#scanner"
                  className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-700 active:scale-95 transition-all cursor-pointer"
                >
                  <Activity className="h-4 w-4" />
                  <span>立即检测我的网络</span>
                </a>

                <a
                  href="#tools"
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-saas-card hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                >
                  <Gauge className="h-4 w-4 text-brand-600" />
                  <span>查看网络测试工具</span>
                </a>

                <Link
                  href="/blog/airport-recommendation/"
                  className="flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
                >
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span>查看 VPN / 机场评测</span>
                </Link>
              </div>

              {/* 真实准则说明 */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-semibold border-t border-slate-200/60 pt-6">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 纯前端真实探测
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 无虚构打分与假数据
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 公开白皮书评测准则
                </span>
              </div>
            </div>

            {/* 右侧：产品化网络诊断面板预览 */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-saas-hover backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">网络诊断与安全嗅探</div>
                      <div className="text-[11px] text-slate-400">实时交互检测模式</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600 border border-slate-200">
                    待命就绪
                  </span>
                </div>

                <div className="space-y-3 text-xs mb-4">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <span className="font-semibold text-slate-600">公网 IP 暴露检测</span>
                    <span className="font-mono text-slate-500">点击下方按钮探测</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <span className="font-semibold text-slate-600">WebRTC P2P 穿透</span>
                    <span className="font-mono text-slate-500">等待 STUN 握手</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <span className="font-semibold text-slate-600">往返延迟与抖动</span>
                    <span className="font-mono text-slate-500">多轮 RTT 发包测算</span>
                  </div>
                </div>

                <a
                  href="#scanner"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <Activity className="h-3.5 w-3.5 text-brand-400" />
                  <span>开始网络环境体检</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Screen 2: 真正的 Network Health 产品入口 (真实浏览器交互检测) */}
      <section id="scanner" className="py-16 bg-surface-bg border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">你的网络环境健康吗？</h2>
            <p className="mt-2 text-sm text-slate-600 font-medium">
              免费检测公网 IP、DNS、WebRTC、延迟、丢包和基础网络风险。无需登录，测试完成后即时呈现三维健康评分。
            </p>
          </div>

          {/* 挂载真实 NetworkHealthWidget 紧凑组件 */}
          <NetworkHealthWidget compact={true} />
        </div>
      </section>

      {/* Screen 3: 免费网络隐私与性能测试工具矩阵 */}
      <section id="tools" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">免费网络隐私与性能测试工具</h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              无需登录即可检查你的 IP、DNS、WebRTC、网络延迟、丢包与 VPN 泄露风险。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. What Is My IP */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-brand-600 mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">公网 IP 查询 (What Is My IP)</h3>
                <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                  查看当前本地公网出口 IPv4/IPv6、运营商 ASN 归属与物理地理位置。
                </p>
              </div>
              <Link href="/tools/my-ip/" className="mt-6 inline-flex items-center justify-between text-xs font-bold text-brand-600 hover:text-brand-700">
                <span>进入 IP 检测工具</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* 2. DNS Leak Test */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">DNS 泄露检测 (DNS Leak)</h3>
                <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                  检测域名解析是否被本地运营商明文监听，验证加密隧道防污染能力。
                </p>
              </div>
              <Link href="/tools/dns-leak-test/" className="mt-6 inline-flex items-center justify-between text-xs font-bold text-emerald-600 hover:text-emerald-700">
                <span>进入 DNS 泄露检测</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* 3. WebRTC Leak Test */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">WebRTC 泄露检测 (WebRTC)</h3>
                <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                  通过浏览器底层 STUN 协议嗅探，防止真实局域网与公网 IP 旁路泄露。
                </p>
              </div>
              <Link href="/tools/webrtc-test/" className="mt-6 inline-flex items-center justify-between text-xs font-bold text-purple-600 hover:text-purple-700">
                <span>进入 WebRTC 检测</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* 4. Ping Test */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">网络延迟测试 (Ping Test)</h3>
                <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                  多轮发包测量国内外主流 CDN 节点的往返延迟 (Min/Max/Avg)、抖动与丢包。
                </p>
              </div>
              <Link href="/tools/ping-test/" className="mt-6 inline-flex items-center justify-between text-xs font-bold text-amber-600 hover:text-amber-700">
                <span>进入延迟与丢包测试</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* 5. VPN Leak Test */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 mb-4">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">VPN 隐私体检 (VPN Leak)</h3>
                <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                  综合交叉审计 IPv4 真实身份、DNS 解析归属、WebRTC 穿透与 IPv6 旁路。
                </p>
              </div>
              <Link href="/tools/vpn-leak-test/" className="mt-6 inline-flex items-center justify-between text-xs font-bold text-rose-600 hover:text-rose-700">
                <span>进入 4 重泄露体检</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* 6. VPN Speed Test */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-4">
                  <Gauge className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">网络带宽测速 (Speed Test)</h3>
                <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                  测量真实下载吞吐带宽 (Mbps)，科学理解光纤距离与加密协议对速度的影响。
                </p>
              </div>
              <Link href="/tools/vpn-speed-test/" className="mt-6 inline-flex items-center justify-between text-xs font-bold text-cyan-600 hover:text-cyan-700">
                <span>进入带宽速率测试</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>

          {/* 聚合核心卡片：Network Health */}
          <div className="mt-8 rounded-3xl border border-brand-200 bg-brand-50/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-brand-600 text-white shadow-md">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-black text-slate-900">Network Health Score (网络健康总览)</div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">
                  将上述所有测试项统一聚合为 0-100 分综合健康指数，全面诊断性能、隐私与稳定性。
                </div>
              </div>
            </div>

            <Link
              href="/tools/network-health/"
              className="shrink-0 flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-brand-700 active:scale-95 transition-all"
            >
              <span>查看全维体检中心</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Screen 4: Network Knowledge 权威知识精选 */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">如何理解 VPN、机场与专线网络</h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              深入浅出的技术解析，帮助你厘清底层网络原理与科学选型标准。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card">
              <span className="text-[10px] font-mono font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">核心概念</span>
              <h3 className="text-base font-black text-slate-900 mt-3">VPN 与 代理/机场有什么本质区别？</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                VPN 基于系统虚拟网卡 (TUN) 实现全局流量加密；代理/机场基于应用层分流，更适合轻量跨境加速。
              </p>
              <Link href="/blog/vpn-guide/" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline">
                阅读详解 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card">
              <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">线路架构</span>
              <h3 className="text-base font-black text-slate-900 mt-3">IEPL 专线与公网 BGP 隧道的延迟差异</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                IEPL 采用点对点物理内网直通，避开公网晚高峰国际出口 QOS 丢包，晚间延迟波动极小。
              </p>
              <Link href="/blog/network-guide/" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline">
                阅读详解 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card">
              <span className="text-[10px] font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">协议演进</span>
              <h3 className="text-base font-black text-slate-900 mt-3">VLESS、Trojan 与 Hysteria 2 协议机制</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                详解现代代理协议如何伪装 TLS 流量，以及基于 UDP 的单边加速协议在弱网环境下的抗丢包机制。
              </p>
              <Link href="/blog/clash-guide/" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:underline">
                阅读详解 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card">
              <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">业务解锁</span>
              <h3 className="text-base font-black text-slate-900 mt-3">为什么流媒体与 AI 会封锁机房 IP？</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Netflix、ChatGPT 等平台通过 IP 欺诈分 (Fraud Score) 与机房 ASN 黑名单，严格限制数据中心托管 IP。
              </p>
              <Link href="/methodology/" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline">
                阅读详解 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Screen 5: 真实网络场景与性能解决方案 */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">针对不同网络场景的测试与诊断</h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">根据具体业务链路需求，精准定位性能瓶颈</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-brand-600 mb-4">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">外服游戏低延迟保障</h3>
              <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                Steam、PlayStation、外服联机对 Ping 延迟与网络抖动极度敏感。
              </p>
              <Link href="/tools/ping-test/" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline">
                运行游戏延迟 Ping 诊断 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">跨境电商与出海办公</h3>
              <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                Shopify、Amazon 卖家后台及海外 SaaS 需要高度稳定的 IP 纯净度与 DNS 解析安全。
              </p>
              <Link href="/tools/network-health/" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline">
                运行全维网络健康体检 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all">
              <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">开发者与开源社区访问</h3>
              <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                GitHub Clone/Push、Docker 镜像拉取与 npm 依赖解析常遭遇 SSL 握手超时或 DNS 污染。
              </p>
              <Link href="/blog/vpn-troubleshooting/" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:underline">
                查看连接故障排查手册 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Screen 6: Methodology & Trust 区域 */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-600">透明度与真实性准则</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                我们如何进行网络测试与机场评测？
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                猫太实验室公开完整的 10 大标准化测试准则与 5 维加权算法，所有评测数据均来源于真实客户端探测环境，方便读者随时对照与独立复核。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/methodology/"
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 active:scale-95 transition-all"
              >
                评测方法论 (Methodology)
              </Link>
              <Link
                href="/whitepaper/"
                className="rounded-2xl bg-brand-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-brand-700 active:scale-95 transition-all"
              >
                评分白皮书
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
