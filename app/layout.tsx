import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "猫太博客 🌸 | 全球网络隐私安全、性能量化与专线加速实验室",
  description: "猫太博客提供免费 IP、DNS、WebRTC、延迟和网络健康检测工具，并发布 VPN、代理协议与 IEPL/IPLC 专线知识、服务商评测及公开的测试方法，帮助读者核对网络性能与隐私风险。",
  metadataBase: new URL("https://maotaiblog.com"),
  alternates: {
    canonical: "https://maotaiblog.com",
  },
  openGraph: {
    title: "猫太博客 🌸 | 全球网络隐私安全、性能量化与专线加速实验室",
    description: "专注于网络隐私安全、跨境网络性能量化、VPN 架构解析与网络诊断工具箱。",
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
  twitter: {
    card: "summary_large_image",
    title: "猫太博客 🌸 | 全球网络隐私安全与专线加速实验室",
    description: "专注于网络隐私安全、跨境网络性能量化与网络诊断工具箱。",
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
    "description": "专注于网络隐私、跨境网络性能量化、VPN/专线架构解析与网络测试工具箱。",
    "publisher": {
      "@type": "Organization",
      "name": "猫太博客",
      "url": "https://maotaiblog.com",
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
