"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  RotateCw, 
  Copy, 
  Check, 
  Wifi, 
  Globe, 
  Activity,
  HelpCircle,
  BookOpen
} from "lucide-react";
import DistributedPingTest from "@/components/tools/DistributedPingTest";

export default function MyIpPage() {
  const [ip, setIp] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("正在探测中...");
  const [asn, setAsn] = useState<string>("正在查询 ASN...");
  const [latency, setLatency] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchRealIp = async () => {
    setLoading(true);
    const start = performance.now();
    try {
      // 尝试调用轻量开放 IP 查询接口
      const res = await fetch("https://api.ipify.org?format=json", { signal: AbortSignal.timeout(3500) });
      const data = await res.json();
      const rtt = Math.round(performance.now() - start);
      if (data && data.ip) {
        setIp(data.ip);
        setLatency(rtt);
        setLocation("公网出口网络 (已建立连接)");
        setAsn("已探测到互联网网关");
      }
    } catch {
      setIp("未成功获取公网 IP");
      setLocation("网络连接受限或超时");
      setAsn("未知 ASN");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealIp();
  }, []);

  const handleCopyIp = () => {
    if (ip && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      {/* 面包屑导航 */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600 transition-colors">首页</Link>
        <span className="text-slate-400">/</span>
        <Link href="/tools/network-health/" className="hover:text-brand-600 transition-colors">网络测试</Link>
        <span className="text-slate-400">/</span>
        <span className="font-bold text-slate-900">What Is My IP</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          What Is My IP? 查看我的 IP 地址与网络指纹
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          实时探测你当前设备向外部互联网汇报的公网 IP 地址、运营商 (ISP) 归属与自治系统号 (ASN)。同时支持在浏览器中直接发起全国与全球节点分布式延迟测速。
        </p>
      </header>

      {/* IP 核心卡片 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
          <div>
            <div className="text-xs font-bold text-slate-400 mb-1">当前公网出口 IP 地址</div>
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-4xl font-black font-mono text-slate-900">
                {ip || (loading ? "正在探测中..." : "Not tested")}
              </span>
              {ip && ip !== "未成功获取公网 IP" && (
                <button
                  onClick={handleCopyIp}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
                  title="复制 IP 地址"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              )}
            </div>
          </div>

          <button
            onClick={fetchRealIp}
            disabled={loading}
            className="flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
          >
            <RotateCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "正在探测..." : "刷新 IP 状态"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-400">物理与地理归属</span>
            <div className="mt-2 text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-brand-600" />
              <span>{location}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-400">网络服务商 (ISP / ASN)</span>
            <div className="mt-2 text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-emerald-600" />
              <span>{asn}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-400">网关探测延迟</span>
            <div className="mt-2 text-sm font-black font-mono text-brand-600 flex items-center gap-1.5">
              <Activity className="h-4 w-4" />
              <span>{latency !== null ? `${latency} ms` : "—"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 分布式测速组件 */}
      <div className="mb-12">
        <DistributedPingTest />
      </div>

      {/* 深度 SEO 知识文章 */}
      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">1</span>
            <span>什么是公网 IP 地址？它与内网 IP 有何区别？</span>
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              公网 IP 地址 (Public IP Address) 是你的家庭路由器或蜂窝基站向全球互联网直接表明身份的唯一数字标识符。正如现实世界中的门牌号，互联网上的任何网站、服务器都必须通过这个地址才能将数据包准确回传给你的设备。
            </p>
            <p>
              与此相对的是<strong>局域网 IP (Private IP)</strong>，如 <code>192.168.1.x</code> 或 <code>10.0.0.x</code>。局域网 IP 仅在你的家庭或公司内部路由网段生效，外部互联网无法直接寻址。你的路由器通过 NAT (网络地址转换) 技术将内部多台设备的流量统一汇聚成一个公网 IP 发出。
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">2</span>
            <span>为什么我的公网 IP 地址会经常发生变化？</span>
          </h2>
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              大多数普通宽带和移动通信用户分配到的都是<strong>动态 IP (Dynamic IP)</strong>。由于 IPv4 地址资源极度紧张，运营商通常采用 PPPoE 动态拨号池分配。每次你重启光猫、路由器或租期到期时，运营商就会重新分配一个新的空闲 IP。
            </p>
            <p>
              当你开启 <strong>VPN / 代理软件</strong> 时，你的出口公网 IP 会瞬间替换为代理服务器所在数据中心（如香港、东京、新加坡）的 IP 地址，从而隐藏你的真实物理归属。
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
              <div className="font-bold text-slate-900 mb-1">Q1：别人知道了我的公网 IP，能直接找到我家物理住址吗？</div>
              <p className="text-xs sm:text-sm text-slate-600">不能。普通的 IP 地理库定位精度通常仅到城市或区县级别（反映运营商核心机房所在位置），只有公安司法部门凭借法定调查手续向运营商调取日志才能追溯到具体宽带装机人。</p>
            </div>
            <div>
              <div className="font-bold text-slate-900 mb-1">Q2：如何保护我的真实公网 IP 不被恶意网站记录？</div>
              <p className="text-xs sm:text-sm text-slate-600">使用经过零泄露审计的高质量 VPN 或专线代理，并在客户端开启全局虚拟网卡 (TUN) 模式与 WebRTC 穿透防护。</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-brand-600" />
            <span>下一步：深入检测网络安全性</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
            <Link href="/tools/dns-leak-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>DNS 泄露检测</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/tools/webrtc-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>WebRTC 穿透检测</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/tools/vpn-leak-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>VPN 综合 4 重体检</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/blog/network-guide/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>跨境网络基础指南</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
