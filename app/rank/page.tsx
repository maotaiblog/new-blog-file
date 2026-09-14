import type { Metadata } from "next";
import Link from "next/link";
import { 
  ChevronRight, 
  BookOpen, 
  ShieldCheck, 
  Trophy, 
  AlertTriangle, 
  Zap, 
  Shield, 
  Globe, 
  Activity, 
  ArrowRight,
  HelpCircle,
  Lock,
  Layers
} from "lucide-react";
import AirportRankTable from "@/components/rank/AirportRankTable";

export const metadata: Metadata = {
  title: "2026 机场推荐与稳定专线选购对比大盘 - 猫太博客",
  description: "基于公开参数与晚高峰样本实测，整理主流 IPLC/IEPL 专线与 BGP 中继机场的节点延迟、丢包表现、流媒体 AI 解锁支持与套餐性价比横向对比。",
  alternates: {
    canonical: "https://maotaiblog.com/rank/",
  },
  openGraph: {
    title: "2026 机场推荐与稳定专线选购对比大盘 - 猫太博客",
    description: "基于公开参数与晚高峰样本实测，整理主流 IPLC/IEPL 专线与 BGP 中继机场的节点延迟、丢包表现与流媒体 AI 解锁支持横向对比。",
    url: "https://maotaiblog.com/rank/",
    type: "website",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 机场推荐与稳定专线选购对比大盘",
    description: "基于公开参数与晚高峰样本实测，整理主流 IPLC/IEPL 专线与 BGP 中继机场的节点延迟、丢包表现与流媒体 AI 解锁支持横向对比。",
  }
};

export default function RankPage() {
  // Breadcrumb Schema: 首页 > 机场评测 > 2026机场推荐
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
        "name": "机场评测", 
        "item": "https://maotaiblog.com/blog/airport-recommendation/" 
      },
      { 
        "@type": "ListItem", 
        "position": 3, 
        "name": "2026机场推荐", 
        "item": "https://maotaiblog.com/rank/" 
      }
    ]
  };

  // ItemList Schema: 结构化展示对比大盘列表，不伪造 Review / AggregateRating
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "2026 专线机场对比推荐列表",
    "description": "基于网络链路架构、协议类型与晚高峰实测样本整理的优质节点服务商推荐大盘",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "隐形人 Invisibles",
        "url": "https://maotaiblog.com/blog/隐形人-review/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "暮光加速",
        "url": "https://maotaiblog.com/blog/暮光加速-review/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "微风网络",
        "url": "https://maotaiblog.com/blog/微风网络-review/"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "飞猫云",
        "url": "https://maotaiblog.com/blog/飞猫云-review/"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "WgetCloud",
        "url": "https://maotaiblog.com/blog/wgetcloud-review/"
      }
    ]
  };

  // FAQ 技术表述与 Schema 1:1 对齐，严禁绝对化词汇
  const faqs = [
    {
      q: "什么是 IEPL / IPLC 专线？与普通公网中继有什么技术差异？",
      a: "IPLC（国际私用出租线路）与 IEPL（国际以太网专线）属于跨境点对点内网链路。流量在境内入口直接接入专线通道过境，不经过公网国际出口链路，具有抗晚高峰骨干拥塞、低抖动和极低丢包的特点。普通公网中转走公网加密隧道传输，在国际出口拥堵时容易受到运营商 QoS 限速或丢包波动影响。"
    },
    {
      q: "如何根据个人预算与业务场景选择合适的套餐？",
      a: "若对晚高峰 4K/8K 视频流媒体画质与电竞游戏连接有严苛要求，建议首选具备多入口容灾的 IPLC/IEPL 专线；对于日常查阅文档、普通网页浏览与代码拉取，性价比较高的多路 BGP 隧道中转通常即可满足需求。购买前建议坚持月付原则并参考评测方法论。"
    },
    {
      q: "大盘中的节点下行测速与解锁状态是如何测定的？",
      a: "大盘数据基于公开套餐配置、官方标称参数及本站团队在特定网络环境下定期执行的人工/半自动样本实测记录。流媒体与 AI 解锁状态受服务商出口 IP 轮换与目标网站风控策略动态影响，大盘标注为最近一次实测样本结果，不代表永久不变。"
    }
  ];

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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 结构化数据注入 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 面包屑导航: 首页 > 机场评测 > 2026机场推荐 */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600 transition-colors">首页</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/blog/airport-recommendation/" className="hover:text-brand-600 transition-colors">机场评测</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-bold text-slate-900">2026机场推荐</span>
      </nav>

      {/* 顶栏 Banner Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 border border-brand-200 mb-3">
              <Trophy className="h-3.5 w-3.5" />
              <span>数据校对：2026年9月更新整理</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              🏆 2026 机场推荐与稳定专线选购对比大盘
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium max-w-3xl leading-relaxed">
              基于公开信息、套餐参数及本站已记录的测试结果整理。针对隐形人、暮光加速、微风网络、飞猫云等主流服务商提供晚高峰链路表现、协议支持与流媒体 AI 解锁可用性横向对比。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/methodology/"
              className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              <BookOpen className="h-4 w-4 text-brand-600" />
              <span>查看猫太博客机场评测方法论</span>
            </Link>
            <Link
              href="/whitepaper/"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-700 transition-all shadow-md shadow-brand-500/20"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>评分白皮书</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 评分模型与透明度说明卡片 (Scoring Transparency) */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-xs sm:text-sm text-slate-600 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs">⚖️</span>
            <span>本站综合排序准则与评分模型公开说明</span>
          </div>
          <Link href="/methodology/" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1">
            阅读完整 10 维测试准则与打分矩阵 →
          </Link>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          当前大盘展现的排名基于本站综合排序算法。评分模型由 3 大核心维度综合加权计算：<strong>链路稳定性与晚高峰丢包 (权重 40%)</strong>、<strong>流媒体与 AI 原生纯净度 (权重 35%)</strong> 以及 <strong>单位流量性价比与协议现代化程度 (权重 25%)</strong>。无独立实测数据的指标一律真实标注。
        </p>
      </section>

      {/* 8/9列对比大盘组件 */}
      <AirportRankTable />

      {/* Trust Notice (合规与数据免责声明) */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 sm:p-5 text-xs text-amber-900 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 font-normal leading-relaxed">
          <strong className="font-bold text-amber-950 block">数据真实性与客观声明 (Trust Notice)</strong>
          <p>
            机场线路、套餐价格、节点可用性以及针对 Netflix / ChatGPT 的解锁状态受目标平台风控与运营商网络调整影响可能随时发生变化。本文数据按照页面标注的时间整理。测速与丢包数据仅代表特定测试节点、特定网络运营商环境及特定时间段的抓包样本，不代表所有地区或长期绝对性能。
          </p>
          <p className="text-amber-800">
            建议在选购前优先选择月付方案进行本地网络验证，避免单次大额长期投入。
          </p>
        </div>
      </div>

      {/* 常见问题解答 FAQ */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-brand-600" />
          <h2 className="text-lg font-black text-slate-900">常见选型与网络测试疑问 (FAQ)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-50 p-4 border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 mb-1.5 flex items-start gap-1.5">
                  <span className="text-brand-600 font-mono font-bold">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-slate-600 leading-relaxed font-normal text-xs">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools: 互动网络诊断工具箱推荐 */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Zap className="h-5 w-5 text-brand-600" />
              <span>自测验证：免费网络性能与隐私诊断工具箱</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">无需安装任何第三方客户端，直接在浏览器中测试您当前网络的真实表现</p>
          </div>
          <Link href="/tools/network-health/" className="text-xs font-bold text-brand-600 hover:underline">
            全功能体检 →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 text-xs">
          <Link
            href="/tools/ping-test/"
            className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-brand-50/30 hover:border-brand-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span>⚡</span>
                <span>Ping 延迟测试</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">测量到全球核心节点的往返 RTT 与丢包率</p>
            </div>
            <span className="mt-3 text-brand-600 font-bold flex items-center gap-1 text-[11px]">
              开始测速 <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          <Link
            href="/tools/dns-leak-test/"
            className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-brand-50/30 hover:border-brand-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span>🛡️</span>
                <span>DNS 泄露测试</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">排查域名解析是否遭本地 ISP 劫持与记录</p>
            </div>
            <span className="mt-3 text-brand-600 font-bold flex items-center gap-1 text-[11px]">
              检测解析 <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          <Link
            href="/tools/webrtc-test/"
            className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-brand-50/30 hover:border-brand-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span>🔍</span>
                <span>WebRTC 穿透测试</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">检测底层 STUN 协议是否泄露本地真实 IP</p>
            </div>
            <span className="mt-3 text-brand-600 font-bold flex items-center gap-1 text-[11px]">
              排查漏洞 <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          <Link
            href="/tools/vpn-leak-test/"
            className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-brand-50/30 hover:border-brand-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span>🔐</span>
                <span>VPN 综合体检</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">IP / DNS / WebRTC / IPv6 四维交叉审计</p>
            </div>
            <span className="mt-3 text-brand-600 font-bold flex items-center gap-1 text-[11px]">
              运行审计 <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          <Link
            href="/tools/network-health/"
            className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-brand-50/30 hover:border-brand-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span>📊</span>
                <span>Network Health</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">三维加权模型测算链路健康分值</p>
            </div>
            <span className="mt-3 text-brand-600 font-bold flex items-center gap-1 text-[11px]">
              综合评分 <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </section>

      {/* Methodology 强化指引 */}
      <div className="text-center pt-2">
        <Link
          href="/methodology/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-brand-600 hover:underline transition-all"
        >
          <BookOpen className="h-4 w-4" />
          <span>查看猫太博客机场评测方法论 (Methodology) 完整规范 →</span>
        </Link>
      </div>
    </div>
  );
}
