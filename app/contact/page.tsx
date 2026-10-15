import type { Metadata } from "next";
import TrustClusterNav from "@/components/layout/TrustClusterNav";

export const metadata: Metadata = {
  title: "联系我们与技术反馈 - 猫太实验室",
  description: "通过猫太博客联系页面反馈技术文章错误、申请复核服务商测试数据或咨询网络测速探针接入。页面汇总现有联系渠道，并说明提交更正、合作信息与补充证据的方式。",
  alternates: {
    canonical: "https://maotaiblog.com/contact/",
  },
  openGraph: {
    title: "联系我们与技术反馈 - 猫太实验室",
    description: "技术文章勘误、节点测试数据复核、网络测速探针接入与 Telegram 交流社群通道。",
    url: "https://maotaiblog.com/contact/",
    type: "website",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "联系我们与技术反馈 - 猫太实验室",
    description: "技术文章勘误、节点测试数据复核、网络测速探针接入与 Telegram 交流社群通道。",
  }
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card space-y-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          📫 联系猫太技术团队 (Contact)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          如果您发现某篇文章中的测速数据发生较大变动、需要反馈死链或提出技术探讨，欢迎通过以下渠道与我们联络：
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <strong className="text-slate-900 block mb-1">Telegram 官方交流社群</strong>
            <a href="https://t.me/+KMqGQjOeRY1hNjY1" target="_blank" rel="noopener noreferrer" className="text-pink-600 font-bold hover:underline">
              👉 点击加入 Telegram 讨论群组
            </a>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <strong className="text-slate-900 block mb-1">技术纠错与数据复核</strong>
            <span className="text-slate-600">欢迎在文章页面点击反馈或在社群中直接联系管理员，我们将在下一个测试周期更新复核结果。</span>
          </div>
        </div>
      </article>

      {/* 信任矩阵导航 */}
      <TrustClusterNav current="contact" />
    </div>
  );
}
