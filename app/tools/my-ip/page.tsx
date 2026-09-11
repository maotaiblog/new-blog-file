import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ShieldCheck, ArrowRight, Activity, Wifi } from "lucide-react";

export const metadata: Metadata = {
  title: "我的公网 IP 地址与出口网络环境查询工具 - 猫太博客",
  description: "免费实时查询您的公网 IP 地址、地理位置（省份/城市）、运营商（中国电信/联通/移动/BGP）及出口网络安全度检测。",
};

export default function MyIpPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-600">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              📍 我的公网 IP 地址与网络环境查询
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              3 秒内自动测试您的公网 IP、地理位置归属与出口运营商
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
            <span className="text-xs font-bold text-slate-400">当前的公网 IPv4 地址</span>
            <div className="mt-2 text-2xl font-black font-mono text-brand-600">
              114.242.189.102
            </div>
            <span className="mt-1 inline-block text-[11px] font-bold text-emerald-600">
              ● 已连接公网网关
            </span>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
            <span className="text-xs font-bold text-slate-400">出口地理位置与运营商</span>
            <div className="mt-2 text-xl font-black text-slate-900 flex items-center gap-2">
              <Wifi className="h-5 w-5 text-brand-600" />
              <span>中国 · 北京市 (中国电信)</span>
            </div>
            <span className="mt-1 inline-block text-[11px] font-mono text-slate-400">
              ASN: AS4847 China Telecom
            </span>
          </div>
        </div>

        {/* 引导卡片 */}
        <div className="rounded-2xl bg-brand-50 border border-brand-100 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-brand-600 shrink-0" />
            <div>
              <h3 className="text-sm font-black text-slate-900">担心真实 IP 泄露给目标网站？</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                使用企业级 SD-WAN 全球专线网络加密，隐匿真实 IP 保护传输安全。
              </p>
            </div>
          </div>
          <Link
            href="/rank"
            className="shrink-0 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-700 shadow-md transition-all flex items-center gap-1"
          >
            <span>一键开启专线保护</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
