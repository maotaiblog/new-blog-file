import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is My IP? 查看我的 IP 地址与网络指纹 - 猫太博客",
  description: "在线查看我的公网 IP 地址 (IPv4 / IPv6)、运营商 ISP、ASN 编号、国家与地理位置归属。了解 IP 地址工作原理、动态静态区别及隐私防护方法。",
  alternates: {
    canonical: "https://maotaiblog.com/tools/my-ip/",
  },
  openGraph: {
    title: "What Is My IP? 查看我的 IP 地址与网络指纹 - 猫太博客",
    description: "检测本地公网 IP、运营商归属，并运行全国及海外节点分布式延迟测速。",
    url: "https://maotaiblog.com/tools/my-ip/",
    type: "website",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is My IP? 查看我的 IP 地址",
    description: "检测本地公网 IP、运营商归属，并运行全国及海外节点分布式延迟测速。",
  }
};

export default function MyIpLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "What Is My IP",
        "url": "https://maotaiblog.com/tools/my-ip/",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "description": "公网 IP 地址与网络指纹查询工具"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com/" },
          { "@type": "ListItem", "position": 2, "name": "网络测试", "item": "https://maotaiblog.com/tools/network-health/" },
          { "@type": "ListItem", "position": 3, "name": "What Is My IP", "item": "https://maotaiblog.com/tools/my-ip/" }
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
