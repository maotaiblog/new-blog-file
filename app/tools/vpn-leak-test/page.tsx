"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, HelpCircle, ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import VpnLeakWidget from "@/components/tools/VpnLeakWidget";

export default function VpnLeakTestPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600 transition-colors">首页</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/tools/network-health/" className="hover:text-brand-600 transition-colors">网络测试</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-bold text-slate-900">VPN Leak Test</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          VPN Leak Test - IP、DNS 与 WebRTC 泄露检测
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          当你开启 VPN 或代理软件时，许多用户认为连接代理即可实现全面隐匿，但实际上，系统 DNS 配置不当、WebRTC 协议漏洞或 IPv6 双栈旁路都可能悄然出卖你的真实物理身份。
        </p>
      </header>

      <div className="mb-12">
        <VpnLeakWidget />
      </div>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">1</span>
            <span>VPN 4 大核心隐私泄露向量深度剖析</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">1. 真实 IP 泄漏 (IP Leak)</div>
              <p className="text-slate-600">代理连接因网络短暂波动中断时，若没有 Kill Switch 阻断机制，操作系统会自动回退到本地直连网络，瞬间暴露真实 IP。</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">2. DNS 解析泄漏 (DNS Leak)</div>
              <p className="text-slate-600">你的访问流量走了代理隧道，但域名解析请求却依然被发送给本地宽带运营商（如中国电信/联通 DNS），导致你的所有访问域名被全程记录。</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">3. WebRTC P2P 穿透漏洞</div>
              <p className="text-slate-600">浏览器原生的 STUN 探测请求会绕过绝大多数应用层代理，直接将内网地址及真实网卡公网 IP 汇报给网页端。</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="font-bold text-slate-900 mb-1">4. IPv6 静默旁路暴露</div>
              <p className="text-slate-600">许多代理服务器仅配置了 IPv4 转发。当访问支持 IPv6 的网站时，流量直接走本地未加密的 IPv6 路由流出。</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">2</span>
            <span>如何打造高安全防泄露代理环境？</span>
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <strong className="text-slate-900">第一步：启用 Kill Switch (断网急停)</strong>
              <p className="mt-1">当 VPN 发生意外掉线时，自动切断系统所有未加密外网连接，防止真实 IP 裸奔泄露。</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <strong className="text-slate-900">第二步：禁用本地 IPv6 或强制 IPv6 代理路由</strong>
              <p className="mt-1">若代理节点不支持完整的 IPv6 出口，建议在系统网络适配器中取消勾选“Internet 协议版本 6 (TCP/IPv6)”。</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <strong className="text-slate-900">第三步：开启纯 TUN 模式与 DoH 远端解析</strong>
              <p className="mt-1">在客户端中配置远程 DNS（如 Cloudflare 1.1.1.1 或 Google 8.8.8.8），杜绝任何 DNS 走本地明文通道。</p>
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
              <div className="font-bold text-slate-900 mb-1">Q1：为什么有的网站依然能认出我的真实所在城市？</div>
              <p className="text-xs sm:text-sm text-slate-600">除了 IP 泄露外，浏览器还可能通过 GPS 接口、系统时区、浏览器默认语言以及 Canvas/WebGL 硬件指纹识别你的真实物理位置。</p>
            </div>
            <div>
              <div className="font-bold text-slate-900 mb-1">Q2：测试结果安全是否意味着可以实现匿名？</div>
              <p className="text-xs sm:text-sm text-slate-600">网络测试安全代表传输层没有发生技术泄露，但如果登录了实名绑定的账号或包含敏感 Cookie，应用层依旧会被识别。</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-brand-600" />
            <span>下一步：关联隐私测试工具与配置指南</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
            <Link href="/tools/webrtc-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>WebRTC 专项测试</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/tools/dns-leak-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>DNS 泄露专项测试</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/blog/vpn-guide/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>VPN 与网络隐私指南</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/blog/vpn-troubleshooting/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>连接故障排查手册</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
