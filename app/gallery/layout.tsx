import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "治愈系二次元插画图库 - 猫太博客",
  description: "猫太博客治愈系插画与二次元图库展示专区。",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://maotaiblog.com/gallery",
  }
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
