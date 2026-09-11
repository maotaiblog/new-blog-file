import type { Metadata } from "next";
import AccountPool from "@/components/apple-id/AccountPool";

export const metadata: Metadata = {
  title: "2026 免费美区 Apple ID 共享账号大全 | 小火箭 (Shadowrocket) 专属下载 - 猫太博客",
  description: "猫太博客提供 2026 免费美区、日区、港区 Apple ID 共享账号，自动巡检下架异常节点。免外区信用卡，专供下载 Shadowrocket、Quantumult X 与 iOS 外区软件。",
};

export default function AppleIdPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "共享 Apple ID 可以在设置 (iCloud) 中登录吗？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "绝对不可以！共享账号只允许在 App Store 商店内登录。误从系统【设置】登录 iCloud 会导致您的 iPhone 手机被云端锁机死锁。"
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
      <AccountPool />
    </div>
  );
}
