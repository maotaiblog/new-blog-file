import type { Metadata } from "next";
import TrustClusterNav from "@/components/layout/TrustClusterNav";

export const metadata: Metadata = {
  title: "独立编辑准则与利益披露声明 - 猫太实验室",
  description: "阅读猫太实验室的编辑政策：了解服务商评测如何处理利益冲突、推广链接与佣金披露，以及数据更正、复核和内容更新流程，判断文章结论的依据、适用范围与局限。",
  alternates: {
    canonical: "https://maotaiblog.com/editorial-policy/",
  },
  openGraph: {
    title: "独立编辑准则与利益披露声明 - 猫太实验室",
    description: "杜绝虚假打分与商业黑幕，客观记录实测数据，全面披露商业合作与佣金机制。",
    url: "https://maotaiblog.com/editorial-policy/",
    type: "article",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "独立编辑准则与利益披露声明 - 猫太实验室",
    description: "杜绝虚假打分与商业黑幕，客观记录实测数据，全面披露商业合作与佣金机制。",
  }
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card space-y-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          ⚖️ 编辑政策与独立评测准则 (Editorial Policy)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          猫太博客坚持以用户实际体验和真实网络数据为第一考量。
        </p>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <h2 className="text-base font-black text-slate-900">1. 独立评测与防利益冲突</h2>
          <p>尽管本站部分链接包含推广代码以维持服务器与实测节点的运行开支，但商业合作绝不影响任何服务商的排名与客观打分。任何存在恶劣跑路风险或恶意高倍率扣费的服务商，一经核实将直接下架剔除。</p>

          <h2 className="text-base font-black text-slate-900">2. 纠错与实时更新机制</h2>
          <p>若服务商更换了线路架构、更替了域名或改善了晚高峰稳定性，我们会在下一轮测试周期中重新采分并更新文章。读者若发现数据与实际不符，可随时在反馈通道提出复核申请。</p>
        </div>
      </article>

      {/* 信任矩阵导航 */}
      <TrustClusterNav current="editorial" />
    </div>
  );
}
