import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "DNS 劫持与 WebRTC 真实 IP 泄露检测工具 - 猫太博客",
  description: "免费在线检测本地网络是否存在运营商 DNS 劫持，或者浏览器通过 WebRTC API 泄露真实 IPv4/IPv6 暴露隐患。",
};

export default function DnsLeakTestPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              🛡️ DNS 劫持与 WebRTC 泄露在线检测
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              实时评估您的 DNS 服务器请求拦截风险与 WebRTC 暴露隐患
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">本地 DNS 解析服务器</div>
                <div className="text-[11px] text-slate-400 font-mono">223.5.5.5 (AliDNS / 阿里云)</div>
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-600 border border-emerald-200">
              未受劫持
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <div>
                <div className="text-xs font-bold text-slate-900">WebRTC API 本地 IP 侦测</div>
                <div className="text-[11px] text-slate-500">检测到浏览器仍保留原生 WebRTC STUN 响应</div>
              </div>
            </div>
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-600 border border-amber-200">
              存在暴露风险
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black">开启零日志 SD-WAN 专线保护</h3>
            <p className="text-xs text-pink-100 mt-1 font-medium">
              强制端到端 AES-256 加密与加密 DNS 代理，阻断 WebRTC 泄露。
            </p>
          </div>
          <Link
            href="/rank"
            className="shrink-0 rounded-xl bg-white px-5 py-3 text-xs font-black text-rose-600 hover:bg-slate-50 transition-all flex items-center gap-1 shadow-sm"
          >
            <span>👉 直达 2026 机场推荐对比大盘</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
