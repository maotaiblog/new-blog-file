import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-500 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span>猫太博客 🌸</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              关注企业级 SD-WAN 全球专线网络加速、IEPL/IPLC 专线测评大盘、免费外区 Apple ID 共享与数字游民生产力指南。
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">核心导航大盘</h4>
            <ul className="space-y-2">
              <li><Link href="/rank" className="hover:text-brand-600 transition-colors font-semibold text-pink-600">🏆 2026 机场推荐对比大盘</Link></li>
              <li><Link href="/apple-id" className="hover:text-brand-600 transition-colors font-semibold text-purple-600">🍎 免费美区 Apple ID 共享池</Link></li>
              <li><Link href="/blog" className="hover:text-brand-600 transition-colors font-semibold">📖 技术测评与白皮书归档</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">免费网络诊断工具箱</h4>
            <ul className="space-y-2">
              <li><Link href="/tools/my-ip" className="hover:text-brand-600 transition-colors font-medium">📍 我的公网 IP 与运营商查询</Link></li>
              <li><Link href="/tools/dns-leak-test" className="hover:text-brand-600 transition-colors font-medium">🛡️ WebRTC 与 DNS 泄露检测</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">社群与商务合作</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://t.me/+KMqGQjOeRY1hNjY1" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors font-bold text-pink-600">
                  ✈️ Telegram 官方交流群 ↗
                </a>
              </li>
              <li className="text-slate-400">商务广告招租与合作洽谈</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© 2026 猫太博客 (maotaiblog.com) 保留所有权利。</p>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-pink-500 fill-pink-500" />
            <span>using Next.js 14 & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
