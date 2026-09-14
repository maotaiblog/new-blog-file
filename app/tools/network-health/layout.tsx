import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Network Health Score 网络健康度测试：IP、DNS、WebRTC、延迟与丢包 - 猫太实验室",
  description: "免费网络健康度测试工具，检测公网 IP、DNS、WebRTC、网络延迟与链路稳定性，并根据实际检测结果计算 Network Health Score。未检测项目不会虚构结果。",
  alternates: {
    canonical: "https://maotaiblog.com/tools/network-health/",
  },
  openGraph: {
    title: "Network Health Score 网络健康度测试：IP、DNS、WebRTC、延迟与丢包 - 猫太实验室",
    description: "免费网络健康度测试工具，检测公网 IP、DNS、WebRTC、网络延迟与链路稳定性，并根据实际检测结果计算 Network Health Score。未检测项目不会虚构结果。",
    url: "https://maotaiblog.com/tools/network-health/",
    type: "website",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "Network Health Score 网络健康度测试：IP、DNS、WebRTC、延迟与丢包 - 猫太实验室",
    description: "免费网络健康度测试工具，检测公网 IP、DNS、WebRTC、网络延迟与链路稳定性，并根据实际检测结果计算 Network Health Score。未检测项目不会虚构结果。",
  }
};

export default function NetworkHealthLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Network Health Score",
        "url": "https://maotaiblog.com/tools/network-health/",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "description": "免费网络健康度测试工具，检测公网 IP、DNS、WebRTC、网络延迟与链路稳定性，并根据实际检测结果计算 Network Health Score。"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com/" },
          { "@type": "ListItem", "position": 2, "name": "网络测试", "item": "https://maotaiblog.com/tools/network-health/" },
          { "@type": "ListItem", "position": 3, "name": "Network Health Score", "item": "https://maotaiblog.com/tools/network-health/" }
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
