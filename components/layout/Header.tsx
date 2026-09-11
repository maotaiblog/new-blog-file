"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Activity, 
  ChevronDown, 
  Menu, 
  X, 
  QrCode, 
  Smartphone, 
  Lock,
  Trophy,
  Apple,
  BookOpen
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"wechat" | "phone">("wechat");

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* 左侧：Logo & 品牌名称 */}
          <Link href="/" className="flex items-center gap-2.5 transition-transform active:scale-95">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-brand-600 to-pink-500 text-white shadow-md shadow-brand-500/20">
              <img src="/logo.png" alt="猫太博客 Logo" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                猫太博客 <span className="text-pink-500">🌸</span>
                <span className="rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold text-brand-600 border border-brand-100">
                  跨境网络加速
                </span>
              </span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400">
                GLOBAL NETWORK ACCELERATOR
              </span>
            </div>
          </Link>

          {/* 中间：桌面端导航菜单 */}
          <nav className="hidden items-center gap-1 md:flex">
            {/* 固化导航 1：机场推荐榜单 */}
            <Link
              href="/rank"
              className="flex items-center gap-1.5 rounded-full bg-pink-100/90 px-3.5 py-1.5 text-xs font-black text-pink-600 hover:bg-pink-200 transition-colors shadow-sm"
            >
              <Trophy className="h-4 w-4" />
              <span>🏆 机场推荐榜单</span>
            </Link>

            {/* 固化导航 2：免费 Apple ID */}
            <Link
              href="/apple-id"
              className="flex items-center gap-1.5 rounded-full bg-purple-100/90 px-3.5 py-1.5 text-xs font-black text-purple-600 hover:bg-purple-200 transition-colors shadow-sm"
            >
              <Apple className="h-4 w-4" />
              <span>🍎 免费 Apple ID</span>
            </Link>

            {/* 免费工具下拉菜单 */}
            <div 
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-brand-600 transition-colors">
                <Activity className="h-4 w-4 text-brand-600" />
                <span>网络诊断工具</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${toolsDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute left-0 top-full w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-saas-hover backdrop-blur-xl">
                  <Link href="/tools/my-ip" className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors">
                    <div className="rounded-lg bg-blue-50 p-2 text-brand-600">📍</div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">公网 IP & 运营商查询</div>
                      <div className="text-[11px] text-slate-400">检测本地 IP 与出口网络</div>
                    </div>
                  </Link>
                  <Link href="/tools/dns-leak-test" className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors">
                    <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">🛡️</div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">DNS / WebRTC 泄露检测</div>
                      <div className="text-[11px] text-slate-400">检查真实 IP 暴露风险</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 技术博客与白皮书归档 */}
            <Link href="/blog" className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-brand-600 transition-colors">
              <BookOpen className="h-4 w-4 text-slate-400" />
              <span>技术测评博客</span>
            </Link>

            {/* 💬 论坛社群 */}
            <a
              href="https://t.me/+KMqGQjOeRY1hNjY1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-black text-pink-600 hover:bg-pink-50 transition-colors"
            >
              <span>💬 论坛</span>
              <span className="text-xs text-pink-400">↗</span>
            </a>
          </nav>

          {/* 右侧：动作按钮 (次要体检 + 微信/手机号扫码登录) */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/#scanner"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
            >
              ⚡ 3秒网络体检
            </Link>

            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 active:scale-95 transition-all cursor-pointer"
            >
              <QrCode className="h-4 w-4" />
              <span>登录 / 注册</span>
            </button>
          </div>

          {/* 移动端 Hamburger 按钮 */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 移动端下拉抽屉菜单 */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white p-4 md:hidden flex flex-col gap-2">
            <Link href="/rank" className="rounded-lg p-2.5 text-sm font-black text-pink-600 bg-pink-50">
              🏆 机场推荐榜单
            </Link>
            <Link href="/apple-id" className="rounded-lg p-2.5 text-sm font-black text-purple-600 bg-purple-50">
              🍎 免费 Apple ID 共享池
            </Link>
            <Link href="/tools/my-ip" className="rounded-lg p-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">
              📍 免费网络体检工具
            </Link>
            <Link href="/blog" className="rounded-lg p-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">
              📖 技术测评博客文章
            </Link>
            <a href="https://t.me/+KMqGQjOeRY1hNjY1" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2.5 text-sm font-bold text-pink-600 hover:bg-slate-50">
              💬 论坛 Telegram ↗
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }}
              className="mt-2 w-full rounded-xl bg-brand-600 py-3 text-center text-sm font-bold text-white"
            >
              微信扫码 / 手机号一键登录
            </button>
          </div>
        )}
      </header>

      {/* 微信 / 手机号快捷登录 Modal 弹窗 */}
      {authModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 mb-3">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">快捷登录 / 免密注册</h3>
              <p className="mt-1 text-xs text-slate-500">首次登录将自动分配免费加速与探针体验额度</p>
            </div>

            {/* Tab 切换 */}
            <div className="mt-5 flex rounded-xl bg-slate-100 p-1">
              <button
                onClick={() => setLoginMethod("wechat")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
                  loginMethod === "wechat" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <QrCode className="h-4 w-4 text-emerald-600" />
                <span>微信扫码登录</span>
              </button>
              <button
                onClick={() => setLoginMethod("phone")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
                  loginMethod === "phone" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Smartphone className="h-4 w-4 text-brand-600" />
                <span>手机号验证码</span>
              </button>
            </div>

            {/* 登录内容 */}
            <div className="mt-6">
              {loginMethod === "wechat" ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="rounded-2xl border-2 border-dashed border-emerald-300 p-3 bg-emerald-50/50">
                    <div className="flex h-44 w-44 items-center justify-center rounded-xl bg-white shadow-inner font-mono text-xs text-slate-400 border border-slate-200">
                      [ 微信扫码授权 ]
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">打开微信，扫一扫上方二维码</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">手机号码</label>
                    <input
                      type="text"
                      placeholder="请输入中国大陆 11 位手机号"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:border-brand-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">短信验证码</label>
                    <div className="mt-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="6 位验证码"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:border-brand-600 focus:outline-none"
                      />
                      <button className="shrink-0 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200">
                        获取验证码
                      </button>
                    </div>
                  </div>
                  <button className="mt-2 w-full rounded-xl bg-brand-600 py-3 text-xs font-bold text-white shadow-md hover:bg-brand-700">
                    立即登录 / 注册
                  </button>
                </div>
              )}
            </div>

            <p className="mt-4 text-center text-[10px] text-slate-400">
              登录即代表已同意 <a href="#" className="underline">服务协议</a> 与 <a href="#" className="underline">隐私声明</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
