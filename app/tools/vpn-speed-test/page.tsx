"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, HelpCircle, ArrowRight, BookOpen, Gauge } from "lucide-react";
import VpnSpeedWidget from "@/components/tools/VpnSpeedWidget";

export default function VpnSpeedTestPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600 transition-colors">首页</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/tools/network-health/" className="hover:text-brand-600 transition-colors">网络测试</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-bold text-slate-900">VPN Speed Test</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          VPN Speed Test - VPN 下载上传速度与带宽测试
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          在线测量你在当前网络及 VPN / 代理环境下的实际下载吞吐速率 (Mbps)、往返延迟与抖动。科学理解跨境网络真实速度表现，告别虚假测速跑分幻象。
        </p>
      </header>

      <div className="mb-12">
        <VpnSpeedWidget />
      </div>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">1</span>
            <span>影响 VPN 实际速度的 5 大关键物理因素</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">1. 物理传输距离与光纤路由</div>
              <p className="text-slate-600">光信号在玻璃光纤中的传播速度约为 20 万公里/秒。中国到美西直线距离约 1 万公里，理论往返光速延迟至少 120ms，地理跨度不可逾越。</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">2. 传输协议与加解密计算开销</div>
              <p className="text-slate-600">传统 OpenVPN (TCP) 在高丢包网络下会因拥塞控制而断崖式降速；现代基于 UDP 的协议（如 Hysteria 2、WireGuard）能显著提升弱网吞吐。</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">3. 运营商晚高峰 QOS 策略</div>
              <p className="text-slate-600">普通公网在每日 20:00 - 23:00 晚高峰期间，国际出口带宽极易发生严重拥堵，而 IEPL 内网专线则享有独立物理通道保障。</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">4. 代理服务器出口带宽与邻居争抢</div>
              <p className="text-slate-600">廉价 VPS 往往多台机器共享 1Gbps 口子，高峰期同一机房的邻居占用可能导致你的可用带宽骤降至几兆。</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">2</span>
            <span>为什么 Speedtest 跑分 300Mbps，看 YouTube 却依然卡 1080P？</span>
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              Speedtest 测速使用的是<strong>多线程并发突发拉取</strong>，测算的是瞬时峰值极限；而在真实观看 YouTube 4K 视频、流式调用 ChatGPT 或进行跨国远程桌面时，依赖的是<strong>单线程长连接的持续平稳吞吐</strong>。
            </p>
            <p>
              一旦网络存在 1% ~ 2% 的微小丢包，TCP 拥塞算法就会强行将单线程窗口减半，导致持续速率腰斩。因此，<strong>零丢包与低抖动远比盲目追求 1000Mbps 的跑分更重要</strong>。
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" />
            <span>常见问题解答 (FAQ)</span>
          </h2>
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <div className="font-bold text-slate-900 mb-1">Q1：流畅观看 YouTube 4K 至少需要多少实际带宽？</div>
              <p className="text-xs sm:text-sm text-slate-600">YouTube 4K 60fps 采用 VP9 / AV1 编码，实际稳定码率在 25 ~ 40 Mbps 之间。只要单线程稳定在 50 Mbps 以上且丢包低于 0.5%，即可实现秒开拖拽无缓冲。</p>
            </div>
            <div>
              <div className="font-bold text-slate-900 mb-1">Q2：如何改善我的 VPN 连接速度？</div>
              <p className="text-xs sm:text-sm text-slate-600">优先选择就近的香港、日本或新加坡低延迟节点；如果本地宽带丢包严重，可尝试切换至基于 UDP 的 Hysteria 2 协议；在客户端开启 TUN 模式并适当调小本地 MTU 值（如 1400）。</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-brand-600" />
            <span>下一步：关联工具与指南</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
            <Link href="/tools/ping-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>Ping 往返延迟测试</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/tools/network-health/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>网络健康度综合评分</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/blog/airport-recommendation/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>机场专线实测与选型</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/blog/vpn-troubleshooting/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>连接速度慢排查手册</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
