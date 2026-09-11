"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Zap, 
  Activity, 
  Wifi, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Gamepad2, 
  Building2, 
  Code2, 
  GraduationCap, 
  Lock,
  RotateCw,
  Trophy,
  Apple
} from "lucide-react";

export default function HomePage() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(true);

  const handleStartScan = () => {
    setScanning(true);
    setScanned(false);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2000);
  };

  return (
    <div className="w-full">
      {/* Screen 1: Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            {/* 左侧：文案与核心 CTA */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-600 mb-6">
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
                <span>2026 企业级 SD-WAN 全球智能专线部署</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                全球专线网络加速 <br />
                <span className="text-brand-600">稳定、低延迟、安全无界</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                毫秒级智能路由调度，保护网络 IP 隐私。专为跨境电商出海、外服游戏加速、免费 Apple ID 与开发者开源社区打造。
              </p>

              {/* CTA 按键组 */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/rank"
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/25 hover:opacity-90 active:scale-95 transition-all"
                >
                  <Trophy className="h-4 w-4" />
                  <span>🏆 查看 2026 机场推荐大盘</span>
                </Link>

                <Link
                  href="/apple-id"
                  className="flex items-center gap-2 rounded-2xl bg-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-purple-700 transition-all"
                >
                  <Apple className="h-4 w-4" />
                  <span>🍎 免费美区 Apple ID</span>
                </Link>

                <a
                  href="#scanner"
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-saas-card hover:bg-slate-50 transition-all"
                >
                  <Activity className="h-4 w-4 text-brand-600" />
                  <span>测测我的网络状态</span>
                </a>
              </div>

              {/* 信任徽章 */}
              <div className="mt-8 flex items-center gap-6 text-xs text-slate-500 font-semibold border-t border-slate-200/60 pt-6">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 零日志加密保护
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> SLA 99.9% 稳定率
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 24/7 分布式探针
                </span>
              </div>
            </div>

            {/* 右侧：真实 UI 视觉卡片（产品 Dashboard 缩略图） */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-saas-hover backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-3 w-3 items-center justify-center">
                      <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">当前网络加密加速中</span>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-mono font-bold text-emerald-600 border border-emerald-200">
                    PROTECTED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400">最佳推荐榜首</span>
                    <div className="mt-1 text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <span>🥇 暮光加速 (IEPL)</span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400">实时网络延迟</span>
                    <div className="mt-1 text-sm font-black text-emerald-600 font-mono flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      <span>18 ms</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <span className="font-semibold text-slate-600">安全防火墙状态</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5 text-brand-600" /> 已开启 AES-256
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <span className="font-semibold text-slate-600">DNS / WebRTC 防泄露</span>
                    <span className="font-bold text-emerald-600">已保护 (Zero Leak)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Screen 2 & 3: 免费网络与隐私体检 (88/100 健康分) */}
      <section id="scanner" className="py-16 bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">你的网络环境安全且高效吗？</h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              无需登录，3 秒内完成本地 IP、运营商 DNS 解析与网络延迟综合健康检测。
            </p>
          </div>

          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-surface-bg p-6 sm:p-8 shadow-saas-card">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* 左侧：88 / 100 动态健康分 */}
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-slate-100 w-full md:w-64 shrink-0 shadow-sm">
                <span className="text-xs font-bold text-slate-400">网络综合健康评分</span>
                
                <div className="relative my-3 flex h-28 w-28 items-center justify-center rounded-full border-8 border-brand-500 text-brand-600">
                  <span className="text-3xl font-black font-mono">88</span>
                  <span className="text-xs font-bold text-slate-400 absolute bottom-3">/ 100</span>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-extrabold text-emerald-600 border border-emerald-200">
                  健康状态：良好
                </span>
              </div>

              {/* 右侧：指标诊断项 */}
              <div className="flex-1 w-full space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Wifi className="h-5 w-5 text-brand-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">公网 IP & 运营商检测</div>
                      <div className="text-[11px] font-mono text-slate-400">114.242.xxx.xxx (中国电信 · 北京)</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" /> 正常
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-brand-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">国际网络延迟 (Ping)</div>
                      <div className="text-[11px] text-slate-400">跨国专线平均延迟: <span className="font-mono text-emerald-600 font-bold">18 ms</span></div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" /> 极优
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">WebRTC 真实 IP 暴露风险</div>
                      <div className="text-[11px] text-slate-500">未开启代理加密时真实 IP 易被浏览器暴露</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                    <AlertTriangle className="h-4 w-4" /> 存在风险
                  </span>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={handleStartScan}
                    disabled={scanning}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <RotateCw className={`h-4 w-4 ${scanning ? "animate-spin" : ""}`} />
                    <span>{scanning ? "正在检测中..." : "重新检测我的网络"}</span>
                  </button>

                  <Link
                    href="/rank"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-xs font-bold text-white hover:bg-brand-700 shadow-md shadow-brand-500/20"
                  >
                    <span>一键开启专线修复</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Screen 4 & 5: 场景化解决方案 */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">场景化加速解决方案</h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">针对不同业务场景进行智能 QoS 选路调度</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-brand-600 mb-4">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">外服游戏低延迟加速</h3>
              <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                Steam、Epic 外服游戏直连专线，解决高延迟与丢包难题。
              </p>
              <Link href="/rank" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline">
                查看推荐加速大盘 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">跨境电商与出海办公</h3>
              <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                Shopify、Amazon 卖家后台与海外 SaaS 工具无卡顿访问。
              </p>
              <Link href="/rank" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline">
                查看出海选型大盘 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all">
              <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">开发者与开源社区加速</h3>
              <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                GitHub Clone/Push 极速无阻，Docker 镜像与 npm 依赖秒级拉取。
              </p>
              <Link href="/blog" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:underline">
                查看开发者配置教程 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card hover:shadow-saas-hover transition-all">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">学术科研文献检索</h3>
              <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                IEEE Xplore、Nature、Google Scholar 等全球权威学术数据库顺畅检索。
              </p>
              <Link href="/blog" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline">
                查看学术检索指南 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
