import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VPN Leak Test - IP、DNS 与 WebRTC 泄露检测 - 猫太博客",
  description: "一键综合检测 VPN / 代理的 4 大隐私泄露向量：真实 IPv4 泄露、DNS 运营商劫持、WebRTC P2P 穿透与 IPv6 旁路暴露。",
  alternates: {
    canonical: "https://maotaiblog.com/tools/vpn-leak-test/",
  },
  openGraph: {
    title: "VPN Leak Test - IP、DNS 与 WebRTC 泄露检测 - 猫太博客",
    description: "全面审计代理软件的隐匿度与数据防护状态，防止真实身份与位置暴露。",
    url: "https://maotaiblog.com/tools/vpn-leak-test/",
    type: "website",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "VPN Leak Test - IP/DNS/WebRTC 综合泄露检测",
    description: "全面审计代理软件的隐匿度与数据防护状态，防止真实身份与位置暴露。",
  }
};

export default function VpnLeakLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "VPN Leak Test",
        "url": "https://maotaiblog.com/tools/vpn-leak-test/",
        "applicationCategory": "SecurityApplication",
        "operatingSystem": "All",
        "description": "VPN 综合 4 重泄露体检工具"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com/" },
          { "@type": "ListItem", "position": 2, "name": "网络测试", "item": "https://maotaiblog.com/tools/network-health/" },
          { "@type": "ListItem", "position": 3, "name": "VPN Leak Test", "item": "https://maotaiblog.com/tools/vpn-leak-test/" }
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
