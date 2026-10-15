import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebRTC Leak Test - 检测真实 IP 是否泄露 - 猫太博客",
  description: "运行浏览器 WebRTC 泄露检测，查看 STUN 探测是否暴露本地或公网 IP，并结合当前 VPN 或代理设置理解结果。页面提供浏览器隐私设置和进一步排查的参考步骤。",
  alternates: {
    canonical: "https://maotaiblog.com/tools/webrtc-test/",
  },
  openGraph: {
    title: "WebRTC Leak Test - 检测真实 IP 是否泄露 - 猫太博客",
    description: "检测浏览器底层 STUN 协议是否越过代理暴露真实 IP 地址与内网网络指纹。",
    url: "https://maotaiblog.com/tools/webrtc-test/",
    type: "website",
    siteName: "猫太博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebRTC Leak Test - 浏览器真实 IP 泄露检测",
    description: "检测浏览器底层 STUN 协议是否越过代理暴露真实 IP 地址与内网网络指纹。",
  }
};

export default function WebRtcLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "WebRTC Leak Test",
        "url": "https://maotaiblog.com/tools/webrtc-test/",
        "applicationCategory": "SecurityApplication",
        "operatingSystem": "All",
        "description": "浏览器 WebRTC 真实 IP 泄露检测工具"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://maotaiblog.com/" },
          { "@type": "ListItem", "position": 2, "name": "网络测试", "item": "https://maotaiblog.com/tools/network-health/" },
          { "@type": "ListItem", "position": 3, "name": "WebRTC Leak Test", "item": "https://maotaiblog.com/tools/webrtc-test/" }
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
