import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "跨越数字鸿沟：中国苹果用户外区 Apple ID 全景指南与免费资源 - 猫太博客",
  description: "了解外区 Apple ID 的使用边界与账号安全：比较美区、港区和日区 App Store 的选择，阅读共享账号登录注意事项，并查看独立注册账号的长期替代方案与资源入口。",
  alternates: {
    canonical: "https://maotaiblog.com/apple-id",
  },
  openGraph: {
    title: "中国苹果用户外区 Apple ID 全景指南与免费资源 - 猫太博客",
    description: "全面剖析中国苹果用户外区 Apple ID 痛点、安全法则与免费共享资源深度解析。",
    url: "https://maotaiblog.com/apple-id",
    type: "article",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "外区 Apple ID 全景指南与安全法则",
    description: "外区 Apple ID 痛点、安全法则与免费共享资源深度解析。",
  }
};

export default function AppleIdLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
