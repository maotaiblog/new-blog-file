import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { getRelatedTools, getNextStepByTopic } from "@/lib/topics";
import RelatedToolsCard from "@/components/blog/RelatedToolsCard";
import NextStepCTA from "@/components/blog/NextStepCTA";
import { 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight, 
  Lock, 
  EyeOff, 
  HelpCircle, 
  BookOpen, 
  Terminal, 
  Radio, 
  Cpu, 
  Layers, 
  Settings2, 
  AlertCircle,
  Wrench
} from "lucide-react";

export const metadata: Metadata = {
  title: "VPN 原理、现代代理协议与网络隐私防护全景指南 - 猫太实验室",
  description: "系统阐述 VPN 加密隧道原理、OpenVPN/WireGuard/VLESS/Hysteria2 协议技术差异、WebRTC 与 DNS 泄漏防护机制，指导跨境隐私加固与客户端配置。",
  alternates: {
    canonical: "https://maotaiblog.com/blog/vpn-guide/",
  },
  openGraph: {
    title: "VPN 原理、现代代理协议与网络隐私防护全景指南 - 猫太实验室",
    description: "系统阐述 VPN 加密隧道原理、WireGuard/VLESS/Hysteria2 协议架构对比与网络隐私防护技术。",
    url: "https://maotaiblog.com/blog/vpn-guide/",
    type: "article",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "VPN 原理与现代代理协议指南",
    description: "系统阐述 VPN 加密隧道原理、协议对比与网络隐私防护机制。",
  }
};

export default function VpnGuidePillar() {
  const allPosts = getSortedPostsData();

  // 严格过滤出与 VPN、隐私、协议、客户端和故障排查强相关的文章，移出机场测评
  const relevantSlugs = [
    "singbox-clash-guide",
    "agent-troubleshooting-sop-2026",
    "streaming-ai-unlock-faq-2026",
    "self-hosted-docker-toolbox",
    "apple-id-guide"
  ];

  const supportingPosts = allPosts.filter(p => relevantSlugs.includes(p.slug));

  const relatedTools = getRelatedTools("vpn");
  const nextStep = getNextStepByTopic("vpn");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com/" },
      { "@type": "ListItem", "position": 2, "name": "技术博客", "item": "https://maotaiblog.com/blog/" },
      { "@type": "ListItem", "position": 3, "name": "VPN 与隐私指南", "item": "https://maotaiblog.com/blog/vpn-guide/" }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "VPN 原理、现代代理协议与网络隐私防护全景指南",
    "description": "系统阐述 VPN 加密隧道原理、OpenVPN/WireGuard/VLESS/Hysteria2 协议技术差异、WebRTC 与 DNS 泄漏防护机制，指导跨境隐私加固与客户端配置。",
    "url": "https://maotaiblog.com/blog/vpn-guide/",
    "mainEntityOfPage": "https://maotaiblog.com/blog/vpn-guide/",
    "datePublished": "2026-08-28",
    "dateModified": "2026-09-12",
    "author": {
      "@type": "Organization",
      "name": "猫太博客技术评测组",
      "url": "https://maotaiblog.com/about/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "猫太博客",
      "url": "https://maotaiblog.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://maotaiblog.com/logo.png"
      }
    }
  };

  const faqItems = [
    {
      q: "传统 VPN (如 OpenVPN / WireGuard) 与现代应用层代理协议的核心区别是什么？",
      a: "传统 VPN 通常在操作系统内核创建虚拟网卡 (TUN/TAP 设备)，默认尝试接管整机的网络流量（Full Tunnel）。而应用层代理协议（如 SOCKS5、HTTP Proxy、Shadowsocks、VLESS）主要工作在用户态或特定端口，常结合路由规则进行按需分流（Split Tunneling）。现代代理协议更注重流量特征混淆与抗探测，而传统 VPN 则侧重点对点加密与内网互联。"
    },
    {
      q: "为什么开启了 VPN 或代理客户端后，仍然可能发生 DNS 泄露？",
      a: "DNS 是否泄露不单取决于 VPN 本身，更受客户端 DNS 接管策略、系统路由表优先级、操作系统并发解析机制（如 Windows Smart Multi-Homed Name Resolution）以及浏览器自带 DoH/DoT 设置共同影响。如果分流规则未接管系统 UDP 53 请求，操作系统仍会将明文域名查询直接发送给本地宽带运营商。"
    },
    {
      q: "开启全局模式 (Full Tunnel) 就一定等于 绝对隐私安全吗？",
      a: "不是。网络加密仅能保证数据在传输链路中防窃听。网站仍可通过浏览器 WebRTC 接口探测本地/反射 IP、通过 Canvas/WebGL 提取设备硬件指纹，或者通过系统时区、语言和已登录账号的 Cookie 进行身份画像关联。隐私防护是包含协议、系统和浏览器多层面的系统工程。"
    },
    {
      q: "分流模式 (Split Tunneling) 与全局模式 (Full Tunneling) 应如何取舍？",
      a: "分流模式允许国内应用直连、境外请求走代理，既保持了国内服务的低时延与带宽，又实现了海外访问需求；但若规则集维护不及时，可能发生漏走或域名解析异常。全局模式确保所有流量均封装在隧道内，私密性更强，但会消耗更多节点流量并导致本地服务响应变慢。"
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600 transition-colors">首页</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/blog/" className="hover:text-brand-600 transition-colors">技术博客</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-bold text-slate-900">VPN 与隐私指南</span>
      </nav>

      {/* 头部 Hero */}
      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/30 p-6 sm:p-10 shadow-saas-card">
        <div className="flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-black text-emerald-800 w-fit mb-4">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Core Topic Pillar · 网络隐私与协议安全专栏</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          VPN 原理、现代代理协议与网络隐私防护全景指南
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl">
          系统解析加密隧道封装机制、OpenVPN / WireGuard / VLESS / Hysteria 2 技术演进，以及 DNS 劫持与 WebRTC 穿透的排查标准。从底层原理到客户端分流策略，帮助开发者与出海团队构建严密的网络防护链路。
        </p>
      </header>

      {/* 1. 核心密码学与协议演进技术卡片 */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-saas-card">
          <span className="text-xl mb-2 block">🔒</span>
          <h3 className="font-black text-slate-900 mb-1">AES-256 与 ChaCha20-Poly1305</h3>
          <p className="text-slate-500 leading-relaxed">
            标准对称加密与认证加密 (AEAD) 算法。算法本身的计算安全性虽高，但在真实部署中整体安全性仍严格取决于协议握手设计、密钥协商与生命周期管理。
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-saas-card">
          <span className="text-xl mb-2 block">🛡️</span>
          <h3 className="font-black text-slate-900 mb-1">WebRTC 与 STUN 穿透防护</h3>
          <p className="text-slate-500 leading-relaxed">
            网页通过浏览器 RTCPeerConnection 接口可绕过常规应用层代理直接探测本地与反射 IP。需通过 TUN 虚拟网卡驱动或浏览器扩展实施策略性阻断。
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-saas-card">
          <span className="text-xl mb-2 block">🚀</span>
          <h3 className="font-black text-slate-900 mb-1">Hysteria 2 传输协议演进</h3>
          <p className="text-slate-500 leading-relaxed">
            基于 QUIC/UDP 构建，在部分高延迟、高丢包弱网环境中具备较好的吞吐表现与连接恢复能力，实际性能取决于网络拥塞控制参数与运营商 UDP 策略。
          </p>
        </div>
      </section>

      {/* 2. 核心知识库结构树：从原理到配置与排查 */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              <span>网络隐私与协议核心知识图谱</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">围绕协议对比、客户端实操、分流规则与故障排除建立的系统化知识链路</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Topic 1: 协议与原理 */}
          <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">🌐</span>
              <span>1. 协议原理与技术架构</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              理解传统 VPN (OpenVPN/WireGuard) 与现代轻量代理协议 (Shadowsocks/VLESS Reality/Hysteria 2) 在封包结构、握手伪装及抗识别特征上的本质差异。
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-medium text-emerald-700">
              <span className="bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">Full vs Split Tunnel</span>
              <span className="bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">TUN / TAP 虚拟网卡</span>
              <span className="bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">QUIC / UDP 拥塞调度</span>
            </div>
          </div>

          {/* Topic 2: 客户端分流实操 */}
          <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">⚡</span>
              <span>2. 客户端配置与规则分流</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              学习 Clash Verge Rev 与 Sing-box 客户端的核心路由配置，配置基于 GEOIP 与 GEOSITE 的精细化规则分流，平衡访问速度与隐私边界。
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-medium text-blue-700">
              <Link href="/blog/singbox-clash-guide/" className="hover:underline bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                Sing-box 规则集实战 →
              </Link>
              <Link href="/blog/clash-guide/" className="hover:underline bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                Clash TUN 模式配置 →
              </Link>
            </div>
          </div>

          {/* Topic 3: 隐私泄露排查 */}
          <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">🛡️</span>
              <span>3. DNS 与 WebRTC 泄露防御</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              排查操作系统在代理开启状态下是否通过本地运营商 DNS 明文解析域名，阻断浏览器底层 STUN 穿透导致的公网真实 IP 旁路暴露。
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-medium text-purple-700">
              <Link href="/tools/dns-leak-test/" className="hover:underline bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">
                DNS 泄露检测 →
              </Link>
              <Link href="/tools/webrtc-test/" className="hover:underline bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">
                WebRTC 穿透检测 →
              </Link>
            </div>
          </div>

          {/* Topic 4: 故障诊断与自救 */}
          <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">🔧</span>
              <span>4. 连接故障诊断与止损决策</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              从 TCP/IP 协议层、TLS 证书握手校验、NTP 系统时间偏移等根源排查连接超时、断流与打不开网页等高频故障。
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-medium text-amber-700">
              <Link href="/blog/agent-troubleshooting-sop-2026/" className="hover:underline bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                SOP 故障自救全书 →
              </Link>
              <Link href="/blog/vpn-troubleshooting/" className="hover:underline bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                排障核心专栏 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 关联权威技术文档 (排除商业机场测评) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-600" />
            <span>核心技术指南与实操手册</span>
          </h2>
          <span className="text-xs text-slate-400">聚焦协议、客户端与隐私加固</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportingPosts.map(p => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-emerald-300 hover:shadow-saas-hover transition-all flex flex-col justify-between"
            >
              <div>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 mb-2 inline-block">
                  {p.category}
                </span>
                <h3 className="text-xs font-black text-slate-900 group-hover:text-emerald-600 line-clamp-2">
                  {p.title}
                </h3>
                <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">{p.description}</p>
              </div>
              <span className="mt-3 text-[11px] font-bold text-emerald-600 inline-flex items-center gap-1">
                阅读全文 <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. 常见问题解答 FAQ */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-emerald-600" />
          <h2 className="text-lg font-black text-slate-900">VPN 与隐私安全常见问答 (FAQ)</h2>
        </div>
        <div className="space-y-4 text-xs sm:text-sm">
          {faqItems.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-1">Q: {faq.q}</h4>
              <p className="text-slate-600 leading-relaxed font-normal">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 交互式工具推荐与下一步闭环 */}
      <RelatedToolsCard tools={relatedTools} />
      <NextStepCTA action={nextStep} />
    </div>
  );
}
