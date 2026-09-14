import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "跨越数字鸿沟：中国苹果用户外区 Apple ID 全景指南与免费资源 - 猫太博客",
  description: "全面剖析中国苹果用户外区 Apple ID 痛点：安全法则、防锁机注意事项、二毛博主免费共享资源与独立账号注册保姆级指南。",
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
