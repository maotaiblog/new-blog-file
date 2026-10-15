import type { Metadata } from "next";
import Link from "next/link";
import TrustClusterNav from "@/components/layout/TrustClusterNav";
import { 
  ShieldCheck, 
  ChevronRight, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Gauge,
  Wifi,
  Lock,
  FileText,
  HelpCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "评测方法与网络测试准则 - 猫太博客",
  description: "查看猫太博客的网络测试方法：了解测试接入网络、硬件和时间窗口，以及延迟、丢包、稳定性与隐私指标的采集和评分口径，便于判断评测结果适用的条件。",
  alternates: {
    canonical: "https://maotaiblog.com/methodology/",
  },
  openGraph: {
    title: "评测方法与网络测试准则 - 猫太博客",
    description: "了解猫太博客如何进行网络延迟、丢包、稳定性、线路与隐私相关测试，以及机场评测的数据采集和评分方法。",
    url: "https://maotaiblog.com/methodology/",
    type: "article",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "评测方法与网络测试准则 - 猫太博客",
    description: "了解猫太博客如何进行网络延迟、丢包、稳定性、线路与隐私相关测试，以及机场评测的数据采集和评分方法。",
  }
};

export default function MethodologyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com" },
      { "@type": "ListItem", "position": 2, "name": "评测方法论", "item": "https://maotaiblog.com/methodology" }
    ]
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 面包屑导航 */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600 transition-colors">首页</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-bold text-slate-900">评测方法与网络测试准则</span>
      </nav>

      {/* 头部 Header */}
      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30 p-6 sm:p-10 shadow-saas-card">
        <div className="flex items-center gap-2 rounded-full bg-blue-100/80 px-3 py-1 text-xs font-black text-brand-700 w-fit mb-4">
          <Activity className="h-3.5 w-3.5" />
          <span>Laboratory Testing Standard · 实验室规范</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          网络测试与机场评测方法论
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
          了解猫太博客如何进行网络延迟、丢包、稳定性、线路与隐私相关测试，以及机场评测的数据采集和评分方法。我们公开所有测试考量与数据边界，杜绝虚假测速图与商业软文。
        </p>
      </header>

      {/* 正文 10 个核心章节 */}
      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
        
        {/* H2 1 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="text-brand-600 font-mono">1.</span> 为什么公开评测方法
          </h2>
          <p>
            网络工具与机场评测领域长期充斥着“玄学体验”与极端挑选空载时段刷分的商业推广软文。我们认为：
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>需要统一测试标准</strong>：没有控制变量的测速数字毫无对比意义。只有在明确带宽基准、测试时段与协议参数的前提下，数据才能相互印证。</li>
            <li><strong>不能只看主观体验</strong>：“感觉很丝滑”或“今天好像卡了”受用户本地设备、路由器 Wi-Fi 干扰及偶发网络抖动影响极大，必须依赖长周期定量化数据。</li>
            <li><strong>网络环境的多样性</strong>：不同用户所处城市、本地宽带运营商（如中国电信 163 vs 联通 AS9929）乃至住宅小区的 NAT 拓扑不同，会导致截然不同的使用体验，公开测试方法有助于读者建立客观认知。</li>
          </ul>
        </section>

        {/* H2 2 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="text-brand-600 font-mono">2.</span> 测试环境
          </h2>
          <p>
            猫太实验室的所有性能测试均基于真实、可验证的软硬件环境进行，严禁使用云服务商内网回环冒充公网：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <span className="font-bold text-slate-900 block mb-1">测试接入网络</span>
              <p className="text-slate-500">民用千兆光纤宽带（主测：中国电信、中国联通，辅测：中国移动），直连千兆有线网络，规避 Wi-Fi 信号衰减干扰。</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <span className="font-bold text-slate-900 block mb-1">测试硬件与系统</span>
              <p className="text-slate-500">Apple Silicon Mac (macOS) 与 x86_64 物理测试机，确保本地加解密性能（AES-NI / ARM Crypto）不成为瓶颈。</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <span className="font-bold text-slate-900 block mb-1">测试客户端</span>
              <p className="text-slate-500">采用开源官方内核（Sing-box 原生内核、Clash Meta / Mihomo 最新稳定版），关闭多余冗余规则以消除客户端开销。</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <span className="font-bold text-slate-900 block mb-1">测试时间窗口</span>
              <p className="text-slate-500">常规日间基准时段 + 晚高峰核心时段（20:00 - 23:30），重点监测国际出口骨干网高峰负载表现。</p>
            </div>
          </div>
        </section>

        {/* H2 3 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="text-brand-600 font-mono">3.</span> 网络性能测试
          </h2>
          <p>
            衡量一条网络链路的好坏，需要结合以下 6 大关键指标综合判断：
          </p>
          <ul className="space-y-2 text-slate-600">
            <li><strong>Ping / 往返时延 (Latency)</strong>：数据包往返所耗费的时间（毫秒 ms）。代表操作响应速度（如网页秒开、按键即时响应）。</li>
            <li><strong>时延抖动 (Jitter)</strong>：相邻数据包到达时延的变化偏差。抖动过高会导致语音通话断续、视频突发卡顿及竞技游戏严重跳 ping。</li>
            <li><strong>丢包率 (Packet Loss)</strong>：在 TCP 协议下，1%~2% 的丢包即会触发拥塞控制窗口减半，导致下载速率暴跌 50% 以上。<strong>持续 极低丢包是高质量专线的最核心特征。</strong></li>
            <li><strong>下载速度 (Download Speed)</strong>：分单线程（考察单连接突发与小文件拉取）与多线程稳态（考察 4K 视频流与大文件下载）持续传输表现。</li>
            <li><strong>上传速度 (Upload Speed)</strong>：对海外代码推送 (Git Push)、远程桌面、云盘同步及视频会议至关重要。</li>
            <li><strong>稳定性与晚高峰表现</strong>：在全网骨干网最拥塞时段是否依然保持低延迟与 极低丢包。</li>
          </ul>
        </section>

        {/* H2 4 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="text-brand-600 font-mono">4.</span> 线路与节点测试
          </h2>
          <p>
            探讨服务商真实的物理链路架构，拒绝虚标：
          </p>
          <ul className="space-y-1.5 text-slate-600">
            <li><strong>专线与普通公网线路的区别</strong>：普通公网中转仍需经过拥堵的国际公网海缆，晚高峰易受 QoS 限速；而 IPLC（国际私用出租线路）与 IEPL（国际以太网专线）采用物理点对点租用光纤，境内入口直连，完全绕开公网审查与国际出口拥堵。</li>
            <li><strong>节点地区分布与网络跳数</strong>：测试香港、日本、新加坡、美西等主力出海节点的真实路由跳数 (Traceroute)，甄别是否存在绕美绕欧等恶劣路径。</li>
            <li><strong>跨境链路稳定性</strong>：服务商是否具备多入口 BGP 容灾与备用切换通道，防止单点线路故障导致长时间断流。</li>
          </ul>
        </section>

        {/* H2 5 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="text-brand-600 font-mono">5.</span> 流媒体与 AI 解锁测试
          </h2>
          <p>
            现代网络出海需求高度依赖目标平台的风控策略：
          </p>
          <ul className="space-y-1.5 text-slate-600">
            <li><strong>IP 是否被标记为托管机房</strong>：Netflix、Disney+、OpenAI (ChatGPT)、Claude 等服务商对机房 ASN 拥有严密的黑名单机制。</li>
            <li><strong>原生住宅 IP 与 DNS 劫持解锁</strong>：部分节点通过住宅住宅 IP 或定制 DNS 分流代理实现解锁，我们将记录其原生可用度。</li>
            <li><strong>特别声明</strong>：<strong>不存在任何服务商能够保证“100% 永久解锁”</strong>。平台风控规则持续动态更迭，测试结果仅代表测试采样窗口期的实际状态。</li>
          </ul>
        </section>

        {/* H2 6 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="text-brand-600 font-mono">6.</span> DNS / WebRTC / IP 隐私测试
          </h2>
          <p>
            加密传输不仅是穿透，更需保护个人真实网络足迹。我们提供并集成自研诊断工具：
          </p>
          <ul className="space-y-1.5 text-slate-600">
            <li><strong>公网 IP 与运营商检测</strong>：测试当前出口真实公网 IPv4/IPv6 与归属地，可直接通过本站 <Link href="/tools/my-ip" className="text-brand-600 font-bold underline">公网 IP 查询与延迟测速</Link> 运行。</li>
            <li><strong>DNS 泄漏 (DNS Leak)</strong>：排查客户端分流规则是否彻底接管 DNS，防止本地运营商窥探您访问的域名记录。</li>
            <li><strong>WebRTC 真实 IP 暴露</strong>：排查浏览器 STUN 协议在代理开启时是否越过代理通道泄漏真实局域网/公网 IP，可通过 <Link href="/tools/dns-leak-test" className="text-brand-600 font-bold underline">DNS / WebRTC 泄露检测工具</Link> 校验。</li>
          </ul>
        </section>

        {/* H2 7 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="text-brand-600 font-mono">7.</span> 测试时间与数据有效期
          </h2>
          <p>
            网络世界高度动态。服务商的服务器配置、上游光纤海缆维护、GFW 封锁升级或节点迁移都会导致性能波动。<strong>所有博客文章和评测报告中的测速图和数据仅对测试发生的时间窗口负责，不构成永久承诺。</strong>我们会按周期定期复核并标注“实测更新日期”。
          </p>
        </section>

        {/* H2 8 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="text-brand-600 font-mono">8.</span> 评分方法
          </h2>
          <p>
            猫太博客的所有量化打分均完全遵循 <Link href="/whitepaper/airport-evaluation-methodology" className="text-brand-600 font-bold underline">《机场评测与定量打分体系白皮书》</Link> 中定义的统一数学模型。
          </p>
          <p className="text-slate-600">
            由白皮书规范统一打分权重（晚高峰抗丢包 35%、链路时延与抖动 25%、流媒体与 AI 解锁 20%、多路容灾 10%、客户端支持 10%），不再在单篇测评中设立独立矛盾的标准，确保全站量化的一致性与公正性。
          </p>
        </section>

        {/* H2 9 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="text-brand-600 font-mono">9.</span> 测试误差与限制
          </h2>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <span>客观严正声明：为什么您的本地实际体验可能与测试数据存在差异？</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
              <li><strong>网络具有随机波动性</strong>：海底光缆故障、本地机房突发拥塞均会造成单次测速的不可控波动。</li>
              <li><strong>地域与运营商差异</strong>：上海电信访问中港专线可能仅需 28ms，而乌鲁木齐移动由于国内跨省传输距离更长，时延自然增加 30ms~40ms。</li>
              <li><strong>本地 Wi-Fi 与硬件限制</strong>：千兆宽带若使用老旧 2.4GHz Wi-Fi 或千兆网口接触不良，真实吞吐量将大打折扣。</li>
              <li><strong>平台策略演进</strong>：Netflix 或 OpenAI 的封禁策略具有突发性，昨日可用的住宅 IP 今日可能被纳入灰名单。</li>
            </ul>
          </div>
        </section>

        {/* H2 10 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="text-brand-600 font-mono">10.</span> 如何理解机场评测结果
          </h2>
          <p>
            我们建议读者在选购网络工具或专线时，<strong>切勿盲目迷信单次测速图中的 1000Mbps 峰值数字</strong>。日常流畅观看 4K 视频仅需 25Mbps 稳定下行，远程办公代码提交仅需几兆带宽。
          </p>
          <p className="text-slate-600">
            真正决定长久体验的核心是：<strong>晚高峰持续 极低丢包率、低时延抖动、节点故障时的自动容灾切换以及合理透明的套餐价格。</strong>
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              href="/rank"
              className="inline-flex items-center gap-1.5 rounded-xl bg-pink-50 border border-pink-200 px-4 py-2.5 text-xs font-bold text-pink-700 hover:bg-pink-100 transition-colors"
            >
              <span>🏆 查看 2026 机场推荐榜单</span>
            </Link>
            <Link
              href="/blog/airport-recommendation"
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 border border-indigo-200 px-4 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              <span>📖 专线机场选型指南</span>
            </Link>
            <Link
              href="/tools/my-ip"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 border border-blue-200 px-4 py-2.5 text-xs font-bold text-brand-700 hover:bg-blue-100 transition-colors"
            >
              <span>⚡ 运行网络诊断工具</span>
            </Link>
          </div>
        </section>

      </article>

      {/* 信任矩阵全景导航 */}
      <TrustClusterNav current="methodology" />

    </div>
  );
}
