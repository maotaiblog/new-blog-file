import type { Metadata } from "next";
import Link from "next/link";
import TrustClusterNav from "@/components/layout/TrustClusterNav";
import { 
  FileText, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Award,
  Zap,
  Globe,
  Lock,
  Cpu,
  CheckCircle2,
  HelpCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "网络性能与机场评测白皮书中心 - 猫太实验室权威知识库",
  description: "在猫太网络科学白皮书中心查阅机场评测与定量打分体系、专线传输模型、公网 IP 与 WebRTC 风险审计，以及代理协议和延迟基准资料，并按公开方法核对评测指标。",
  alternates: {
    canonical: "https://maotaiblog.com/whitepaper/",
  },
  openGraph: {
    title: "网络性能与机场评测白皮书中心 - 猫太实验室权威知识库",
    description: "收录《机场评测与定量打分体系白皮书》、物理专线传输模型、公网 IP 欺诈分审计与现代化代理协议演进。",
    url: "https://maotaiblog.com/whitepaper/",
    type: "website",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "网络性能与机场评测白皮书中心",
    description: "收录《机场评测与定量打分体系白皮书》、物理专线传输模型、公网 IP 欺诈分审计与全球延迟基准标准。",
  }
};

export default function WhitepaperIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com" },
      { "@type": "ListItem", "position": 2, "name": "评测白皮书", "item": "https://maotaiblog.com/whitepaper" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "猫太白皮书与普通博客文章有什么区别？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "白皮书属于纲领性学术与工程规范文档，阐述网络传输物理定律、数学加权公式、测试环境约束与防刷分风控模型，作为全站所有单篇测评文章的裁判标准。"
        }
      },
      {
        "@type": "Question",
        "name": "为什么强调晚高峰 极低丢包远重于空载测速？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "在 TCP 协议下，2% 的丢包即导致吞吐量下降 50% 以上并触发退避重传。晚高峰骨干网拥塞时的 极低丢包才能确保 4K 视频不缓冲、外服游戏不卡顿。"
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
        <span className="font-bold text-slate-900">网络性能与评测白皮书中心</span>
      </nav>

      {/* 头部大 Banner */}
      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/30 p-6 sm:p-12 shadow-saas-card">
        <div className="flex items-center gap-2 rounded-full bg-indigo-100/80 px-3 py-1 text-xs font-black text-indigo-800 w-fit mb-4">
          <Award className="h-3.5 w-3.5" />
          <span>Scientific Whitepapers & Engineering Standards</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          网络性能量化、专线传输与机场评测白皮书知识中心
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl">
          本中心收录猫太实验室制定的工程级白皮书规范。以光电传输物理极限为标尺，以分布式跨机房探针为支撑，提供全透明、可验证、去伪存真的网络性能量化标准。
        </p>
      </header>

      {/* 核心白皮书展示区 */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            <span>核心规范白皮书</span>
          </h2>
          <Link href="/methodology" className="text-xs font-bold text-brand-600 hover:underline">
            查阅实验室评测方法论 (Methodology) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card flex flex-col justify-between hover:border-indigo-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">📊</span>
                <span className="rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-bold border border-indigo-200">
                  行业基准标准
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2">
                《机场评测与定量打分体系白皮书》
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                系统拆解 5 大核心维度加权打分模型，明确晚高峰丢包、流媒体原生解锁、吞吐稳态带宽与 SLA 多路容灾的精确量化算法。
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 晚高峰压测标准 (20:00-23:30)</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 0 虚假、基准测试节点多节点交叉验证</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 流媒体与 OpenAI 风控合规识别模型</li>
              </ul>
            </div>
            <Link
              href="/whitepaper/airport-evaluation-methodology"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline pt-4 border-t border-slate-100"
            >
              <span>阅读完整白皮书规范</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">🛡️</span>
                <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-bold border border-emerald-200">
                  安全风控模型
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2">
                《出海公网 IP 与 WebRTC 泄露风险审计模型》
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                深入剖析 STUN 穿透机制、本地 DNS 劫持污染与透明代理环境下客户端 IP 泄露的边界条件，为跨境电商与外贸出海提供防封防风控指引。
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> WebRTC STUN 协议内网/公网 IP 审计</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> DoH / DoT 加密解析与本地 DNS 劫持甄别</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 跨境出海防关联环境配置规范</li>
              </ul>
            </div>
            <Link
              href="/tools/dns-leak-test"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline pt-4 border-t border-slate-100"
            >
              <span>运行实时 DNS/WebRTC 审计探针</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 核心学术与知识模块 (Topics) */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card space-y-6">
        <h2 className="text-lg sm:text-xl font-black text-slate-900">
          白皮书技术知识体系与主题层级
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <Zap className="h-6 w-6 text-brand-600 mb-2" />
            <h4 className="font-bold text-slate-900 text-xs mb-1">物理专线与 RTT</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              光在光纤内全反射折射率 (n≈1.468)，阐释中港/中美跨境 RTT 的物理极限。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <Globe className="h-6 w-6 text-emerald-600 mb-2" />
            <h4 className="font-bold text-slate-900 text-xs mb-1">BGP Anycast 调度</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              动态自治域路由收敛，分析多线入口在突发故障时的毫秒级容灾切换。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <Lock className="h-6 w-6 text-purple-600 mb-2" />
            <h4 className="font-bold text-slate-900 text-xs mb-1">现代加密协议</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              从 Shadowsocks 到 Hysteria2 (QUIC/UDP) 拥塞控制在丢包环境下的吞吐提升。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <Cpu className="h-6 w-6 text-amber-600 mb-2" />
            <h4 className="font-bold text-slate-900 text-xs mb-1">客户端性能调优</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Sing-box Tun 虚拟网卡与 Clash Meta 内存占用及规则分流匹配效率。
            </p>
          </div>
        </div>
      </section>

      {/* 常见问题解答 FAQ */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-brand-600" />
          <h2 className="text-lg sm:text-xl font-black text-slate-900">白皮书常见问题解答 (FAQ)</h2>
        </div>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1">Q: 猫太白皮书与普通博客文章有什么区别？</h4>
            <p className="text-slate-600 leading-relaxed">
              A: 白皮书属于工程级指导规范与裁判标准，定义了评测的核心公式、丢包阈值和测试环境约束。所有 29+ 篇独立机场测评均必须以白皮书标准为依据进行评分。
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1">Q: 为什么强调晚高峰 极低丢包远重于空载测速？</h4>
            <p className="text-slate-600 leading-relaxed">
              A: 传统 TCP 协议在遭遇 2% 丢包时吞吐量就会雪崩。晚高峰骨干网拥塞时的持续 极低丢包，才能确保 4K 视频流畅与远程办公不中断。
            </p>
          </div>
        </div>
      </section>

      {/* 底部联动卡片 */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 to-indigo-950 p-6 sm:p-10 text-white shadow-saas-card flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base sm:text-lg font-black">基于白皮书标准，查阅 2026 专线机场对比大盘</h3>
          <p className="text-xs text-slate-300 mt-1">
            查阅暮光加速、隐形人 Cloud、微风网络等 18 家主流服务商的晚高峰量化实测数据。
          </p>
        </div>
        <Link
          href="/rank/"
          className="shrink-0 rounded-2xl bg-white px-5 py-3 text-xs font-bold text-slate-900 shadow-md hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>查看实测大盘</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 信任矩阵全景导航 */}
      <TrustClusterNav current="whitepaper" />

    </div>
  );
}
