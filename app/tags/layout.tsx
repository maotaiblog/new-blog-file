import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "技术文章标签云索引 - 猫太博客",
  description: "按技术标签快速索引网络知识、专线测评、Clash 与 Sing-box 客户端配置文章。",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://maotaiblog.com/tags",
  }
};

export default function TagsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
