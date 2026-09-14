import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-500 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-8 border-b border-slate-100">
          <div className="flex flex-col gap-3 md:col-span-2">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span>猫太博客 🌸 · 网络性能与隐私实验室</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm">
              专注于企业级 SD-WAN 专线网络加速、IEPL/IPLC 客观量化测评、WebRTC/DNS 隐私泄漏防护与现代化代理协议底层解析。
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] pt-1">
              <Link href="/methodology/" className="text-slate-500 hover:text-brand-600 underline">评测方法论 (Methodology)</Link>
              <span>·</span>
              <Link href="/editorial-policy/" className="text-slate-500 hover:text-brand-600 underline">独立编辑准则</Link>
              <span>·</span>
              <Link href="/contact/" className="text-slate-500 hover:text-brand-600 underline">联系我们</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">核心专题导览</h4>
            <ul className="space-y-2">
              <li><Link href="/blog/airport-recommendation/" className="hover:text-brand-600 transition-colors font-medium">🏆 专线机场评测选型</Link></li>
              <li><Link href="/blog/network-guide/" className="hover:text-brand-600 transition-colors font-medium">🌐 网络底层协议与知识</Link></li>
              <li><Link href="/blog/vpn-guide/" className="hover:text-brand-600 transition-colors font-medium">🛡️ VPN 与隐私安全指南</Link></li>
              <li><Link href="/blog/vpn-troubleshooting/" className="hover:text-brand-600 transition-colors font-medium">🔧 连接故障排查自救</Link></li>
              <li><Link href="/blog/clash-guide/" className="hover:text-brand-600 transition-colors font-medium">⚡ 客户端分流实战</Link></li>
              <li><Link href="/whitepaper/" className="hover:text-brand-600 transition-colors font-medium">📊 评测打分白皮书中心</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">诊断工具与资源</h4>
            <ul className="space-y-2">
              <li><Link href="/rank/" className="hover:text-brand-600 transition-colors font-bold text-pink-600">🏆 2026 机场推荐大盘</Link></li>
              <li><Link href="/tools/my-ip/" className="hover:text-brand-600 transition-colors font-medium">📍 公网 IP & 分布式测速</Link></li>
              <li><Link href="/tools/dns-leak-test/" className="hover:text-brand-600 transition-colors font-medium">🛡️ DNS / WebRTC 泄露检测</Link></li>
              <li><Link href="/apple-id/" className="hover:text-brand-600 transition-colors font-bold text-purple-600">🍎 免费美区 Apple ID 池</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">社群与技术交流</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://t.me/+KMqGQjOeRY1hNjY1" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors font-bold text-pink-600">
                  ✈️ Telegram 官方交流群 ↗
                </a>
              </li>
              <li><Link href="/about/" className="hover:text-brand-600 transition-colors text-slate-400">关于猫太实验室</Link></li>
              <li><Link href="/archives/" className="hover:text-brand-600 transition-colors text-slate-400">文章时间归档</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© 2026 猫太博客 (maotaiblog.com) · 专注于网络隐私、性能与出海技术量化。</p>
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
