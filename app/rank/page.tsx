import type { Metadata } from "next";
import AirportRankTable from "@/components/rank/AirportRankTable";

export const metadata: Metadata = {
  title: "2026 机场推荐与稳定梯子选购对比大盘 (8列规范全量版) - 猫太博客",
  description: "猫太博客 2026 严选翻墙机场推荐大盘。覆盖 IPLC/IEPL 独享专线、BGP 中转节点，晚高峰测速、流媒体与 ChatGPT 解锁全量对比。",
};

export default function RankPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "什么是 IEPL/IPLC 专线机场？和普通中转有什么区别？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IEPL (International Ethernet Private Line) 是国际点对点专线，物理过境不经过 GFW 防火墙检测，具备 0 丢包、超低延迟和极高 SLA 稳定性。"
        }
      },
      {
        "@type": "Question",
        "name": "如何选择适合自己的机场套餐？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "看重晚高峰画质选 IPLC/IEPL 专线；追求大流量低预算可选 BGP 优质中转。"
        }
      }
    ]
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 顶栏 Banner Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200 mb-2">
              <span>📅 数据最后更新于：2026年8月28日</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              🏆 2026 机场推荐与稳定梯子选购对比大盘
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium">
              基于 24/7 分布式探针压测数据，为您提供 暮光加速(#1)、隐形人 Cloud(#2)、微风网络(#3)、飞猫云(#4) 等全量节点打分对比。
            </p>
          </div>

          <a
            href="https://t.me/+KMqGQjOeRY1hNjY1"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-2xl bg-brand-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-brand-700 transition-all"
          >
            ✈️ 加入 Telegram 交流群 ↗
          </a>
        </div>
      </div>

      {/* 8/9列对比大盘组件 */}
      <AirportRankTable />
    </div>
  );
}
