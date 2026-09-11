import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "猫太博客 🌸 | 全球跨境网络专线加速 & 免费网络诊断工具箱",
  description: "猫太博客关注企业级 SD-WAN 全球专线网络加速、免费美区 Apple ID 共享池、IEPL/IPLC 专线测评大盘与网络隐私保护。",
  keywords: ["猫太博客", "2026机场推荐", "跨境加速", "免费美区Apple ID", "网络延迟测试", "DNS泄露检测"],
  openGraph: {
    title: "猫太博客 🌸 | 全球跨境网络专线加速",
    description: "企业级 SD-WAN 全球专线网络加速与免费网络隐私诊断工具箱。",
    url: "https://maotaiblog.com",
    siteName: "猫太博客",
    images: [
      {
        url: "https://maotaiblog.com/gallery/retro-cat-girl.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "猫太博客",
    "url": "https://maotaiblog.com",
    "description": "关注跨境网络加速、IEPL/IPLC 专线测评、免费美区 Apple ID 与数字游民生产力指南。",
    "publisher": {
      "@type": "Organization",
      "name": "猫太博客",
      "logo": {
        "@type": "ImageObject",
        "url": "https://maotaiblog.com/logo.png"
      }
    }
  };

  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png?v=2" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-surface-bg text-slate-900 selection:bg-brand-100 selection:text-brand-700">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
