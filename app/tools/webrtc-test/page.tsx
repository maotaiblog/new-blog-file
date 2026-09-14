"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, HelpCircle, ArrowRight, BookOpen } from "lucide-react";
import WebRtcWidget from "@/components/tools/WebRtcWidget";

export default function WebRtcTestPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600 transition-colors">首页</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/tools/network-health/" className="hover:text-brand-600 transition-colors">网络测试</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-bold text-slate-900">WebRTC 泄露检测</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          WebRTC 真实 IP 泄露检测 (WebRTC Leak Test)
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          WebRTC 允许浏览器建立 P2P 实时媒体通信。即使你已经连接了常规代理，网页依然可以通过底层的 STUN 探测绕过代理直接获取你真实的本地局域网与公网出口 IP。
        </p>
      </header>

      <div className="mb-12">
        <WebRtcWidget />
      </div>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">1</span>
            <span>什么是 WebRTC 泄露？为什么常规代理无法阻断？</span>
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
            <p>
              WebRTC (Web Real-Time Communication) 是现代浏览器的原生接口。在建立 P2P 视频或语音直连前，浏览器会向公开 STUN 服务器发送轻量 UDP 握手包以获取自身的反射公网 IP。
            </p>
            <p>
              许多系统级 HTTP / SOCKS5 代理仅转发 TCP 应用层流量，并未拦截浏览器底层 C++ 核心发出的 UDP STUN 探测。因此，网页只需嵌入简短的 JavaScript 脚本调用 <code>RTCPeerConnection</code>，便能在你毫不知情的情况下获取真实 IP。
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">2</span>
            <span>WebRTC 泄露会带来哪些安全隐患？</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">真实地理位置与运营商暴露</div>
              <p className="text-slate-600">访问的风控网站可比对 HTTP 出口与 WebRTC 出口。若两者不一致，账号会被标记为异常或被直接封禁。</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">设备网络指纹被精确追踪</div>
              <p className="text-slate-600">本地内网 IP（如 192.168.x.x）与网卡配置结合可形成唯一指纹，跨网站追踪用户行为轨迹。</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">3</span>
            <span>如何防范 WebRTC 穿透泄露？</span>
          </h2>
          <div className="space-y-4 text-sm text-slate-600">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
              <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>方案 A：客户端开启全局虚拟网卡 (TUN / 远程代理模式)</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-800">
                开启 Clash Meta TUN 模式或 WireGuard 虚拟网卡，驱动层接管所有 UDP 流量，确保所有 STUN 包全部走加密代理网关。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">方案 B：浏览器安装隐私防护扩展</div>
              <p className="text-xs sm:text-sm text-slate-600">
                Chrome / Edge 用户可安装 <strong>WebRTC Control</strong> 插件选择“Disable WebRTC”彻底禁用；Firefox 用户可在 <code>about:config</code> 中将 <code>media.peerconnection.enabled</code> 改为 <code>false</code>。
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" />
            <span>常见问题解答 (FAQ)</span>
          </h2>
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <div className="font-bold text-slate-900 mb-1">Q1：禁用 WebRTC 会影响日常网页浏览吗？</div>
              <p className="text-xs sm:text-sm text-slate-600">不会。常规看视频、网页浏览、网购均不受影响。仅网页端直接发起音视频通话（如 Google Meet、网页版 Discord 通话）才依赖 WebRTC。</p>
            </div>
            <div>
              <div className="font-bold text-slate-900 mb-1">Q2：测试捕获的 .local 地址算泄露吗？</div>
              <p className="text-xs sm:text-sm text-slate-600">不算。现代 Chrome / Safari 会自动将局域网 IP 用随机的 mDNS .local 名字混淆，这是浏览器的隐私保护行为。</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-brand-600" />
            <span>下一步：关联隐私测试工具与配置指南</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
            <Link href="/tools/vpn-leak-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>VPN 综合 4 重泄露体检</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/tools/dns-leak-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>DNS 运营商泄露测试</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/blog/vpn-guide/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>VPN 协议与网络隐私指南</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/blog/vpn-troubleshooting/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>连接故障与泄露排查手册</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
