import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "技术文章时间归档 - 猫太实验室",
  description: "按时间维度索引猫太实验室所有网络技术测评、专线架构与隐私安全文章。",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://maotaiblog.com/archives",
  }
};

export default function ArchivesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
