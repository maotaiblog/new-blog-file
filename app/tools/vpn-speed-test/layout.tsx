import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VPN Speed Test - VPN 下载速度与带宽吞吐测试 - 猫太博客",
  description: "在线测试 VPN / 代理环境下的实际下载带宽 (Mbps)、通信延迟、抖动与丢包率。科学客观评估跨境专线吞吐能力与节点负载。",
  alternates: {
    canonical: "https://maotaiblog.com/tools/vpn-speed-test/",
  },
  openGraph: {
    title: "VPN Speed Test - VPN 下载速度与带宽吞吐测试 - 猫太博客",
    description: "实时分块拉取 CDN 资源计算真实 Mbps 传输带宽，全面分析网络性能瓶颈。",
    url: "https://maotaiblog.com/tools/vpn-speed-test/",
    type: "website",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "VPN Speed Test - 跨境网络带宽与性能测速",
    description: "实时分块拉取 CDN 资源计算真实 Mbps 传输带宽，全面分析网络性能瓶颈。",
  }
};

export default function VpnSpeedLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "VPN Speed Test",
        "url": "https://maotaiblog.com/tools/vpn-speed-test/",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "description": "VPN 网络速度与带宽吞吐测试工具"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com/" },
          { "@type": "ListItem", "position": 2, "name": "网络测试", "item": "https://maotaiblog.com/tools/network-health/" },
          { "@type": "ListItem", "position": 3, "name": "VPN Speed Test", "item": "https://maotaiblog.com/tools/vpn-speed-test/" }
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
