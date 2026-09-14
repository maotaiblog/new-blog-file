import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DNS Leak Test - 检测 DNS 是否泄露 - 猫太博客",
  description: "在线检测使用 VPN 或代理时是否存在 DNS 泄露风险。检测当前实际 DNS 解析服务器 IP 与归属，防止运营商窃听或网站定位。",
  alternates: {
    canonical: "https://maotaiblog.com/tools/dns-leak-test/",
  },
  openGraph: {
    title: "DNS Leak Test - 检测 DNS 是否泄露 - 猫太博客",
    description: "检测 DNS 是否遭到本地运营商劫持与明文窃听，评估代理环境安全性。",
    url: "https://maotaiblog.com/tools/dns-leak-test/",
    type: "website",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "DNS Leak Test - 检测 DNS 是否泄露",
    description: "检测 DNS 是否遭到本地运营商劫持与明文窃听，评估代理环境安全性。",
  }
};

export default function DnsLeakLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "DNS Leak Test",
        "url": "https://maotaiblog.com/tools/dns-leak-test/",
        "applicationCategory": "SecurityApplication",
        "operatingSystem": "All",
        "description": "DNS 解析安全与泄露检测工具"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com/" },
          { "@type": "ListItem", "position": 2, "name": "网络测试", "item": "https://maotaiblog.com/tools/network-health/" },
          { "@type": "ListItem", "position": 3, "name": "DNS Leak Test", "item": "https://maotaiblog.com/tools/dns-leak-test/" }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
