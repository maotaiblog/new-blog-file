"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, HelpCircle, ArrowRight, BookOpen, Zap } from "lucide-react";
import PingTestWidget from "@/components/tools/PingTestWidget";

export default function PingTestPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600 transition-colors">首页</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/tools/network-health/" className="hover:text-brand-600 transition-colors">网络测试</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-bold text-slate-900">延迟与丢包测试</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          网络延迟、抖动与丢包率测试 (Ping Test)
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          通过向国内外多个主流 CDN 边缘节点发送连续多轮 HTTP 请求，精确测算往返时间 (Min / Max / Avg RTT)、延迟抖动差值 (Jitter) 与丢包率，真实还原链路在游戏、会议与出海业务下的通信表现。
        </p>
      </header>

      <div className="mb-12">
        <PingTestWidget />
      </div>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">1</span>
            <span>Ping 往返时间 (RTT)、抖动 (Jitter) 与丢包率的核心定义</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">往返延迟 (RTT Ping)</div>
              <p className="text-slate-600">数据包从你的客户端发出，抵达目标服务器并返回确认所需的总毫秒数 (ms)。主要受物理光纤距离与路由器中继节点数量决定。</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">延迟抖动 (Jitter)</div>
              <p className="text-slate-600">连续发包之间延迟的波动偏离值。即使平均 Ping 只有 30ms，若忽高忽低至 120ms，在实时语音或游戏中就会表现为瞬时卡顿与瞬移。</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">丢包率 (Packet Loss)</div>
              <p className="text-slate-600">在网络传输过程中未能顺利抵达目的地的百分比。丢包会导致 TCP 重传，直接引发网页打不开或视频缓冲。</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">2</span>
            <span>为什么 Ping 延迟低，实际看网页依然很卡？</span>
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              Ping 仅反映轻量探测包在网络层的往返速度，并不等同于<strong>带宽吞吐量 (Bandwidth)</strong>。就像一条畅通无阻的单车道，跑一辆摩托车（轻量 Ping）很快，但如果要运输大吨位卡车（高清流媒体大文件），道路依然会因为容量不足而发生拥堵。
            </p>
            <p>
              此外，运营商的晚高峰国际出口 QOS 限速以及 DNS 污染重试也是导致“Ping 指标良好但网页加载卡死”的常见主因。
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
              <div className="font-bold text-slate-900 mb-1">Q1：正常的 Ping 延迟标准是多少？</div>
              <p className="text-xs sm:text-sm text-slate-600">国内同城光纤通常在 5~15ms；国内跨省 20~40ms；亚太出海（香港/日本/新加坡）在 30~80ms 属优秀；跨洋到欧美在 120~180ms 属于物理光速极限内的正常范围。</p>
            </div>
            <div>
              <div className="font-bold text-slate-900 mb-1">Q2：网页端 HTTP Ping 和系统终端 ICMP Ping 有什么不同？</div>
              <p className="text-xs sm:text-sm text-slate-600">终端 <code>ping</code> 命令基于底层 ICMP 协议；网页端基于浏览器 HTTP/HTTPS 握手，包含了 TLS 握手及真实 HTTP 应用协议解析时间，更能直接反映你在浏览器中的实际使用体验。</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-brand-600" />
            <span>下一步：关联性能测试工具与优化指南</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
            <Link href="/tools/vpn-speed-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>VPN 带宽吞吐测速</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/tools/network-health/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>全维网络健康度评分</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/blog/network-guide/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>跨境网络延迟优化指南</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/blog/vpn-troubleshooting/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>网络高延迟与丢包排查</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
