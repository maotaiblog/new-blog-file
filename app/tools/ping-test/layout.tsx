import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ping Test - 网络延迟与丢包测试 - 猫太博客",
  description: "在线测量网络往返延迟 (Min / Max / Avg RTT)、网络抖动 (Jitter) 与丢包率 (Packet Loss)。科学评估游戏直连与国际跨境网络链路质量。",
  alternates: {
    canonical: "https://maotaiblog.com/tools/ping-test/",
  },
  openGraph: {
    title: "Ping Test - 网络延迟与丢包测试 - 猫太博客",
    description: "多轮连续 HTTP 往返延迟发包测试，实时计算抖动与丢包率，真实反映链路性能。",
    url: "https://maotaiblog.com/tools/ping-test/",
    type: "website",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ping Test - 网络延迟与丢包测试",
    description: "多轮连续 HTTP 往返延迟发包测试，实时计算抖动与丢包率，真实反映链路性能。",
  }
};

export default function PingLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Ping Test",
        "url": "https://maotaiblog.com/tools/ping-test/",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "description": "网络延迟与丢包抖动测试工具"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com/" },
          { "@type": "ListItem", "position": 2, "name": "网络测试", "item": "https://maotaiblog.com/tools/network-health/" },
          { "@type": "ListItem", "position": 3, "name": "Ping Test", "item": "https://maotaiblog.com/tools/ping-test/" }
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
