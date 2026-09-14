"use client";

import React, { useState, useEffect, useRef } from "react";
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
  BookOpen,
  Search,
  Sparkles,
  Check,
  UserCheck
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loginMethod, setLoginMethod] = useState<"wechat" | "phone">("wechat");
  const [countdown, setCountdown] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toolsRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 2500);
  };

  // 监听点击外部收起下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 监听全局 ⌘K / Ctrl+K 打开搜索
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 短信验证码倒计时处理
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = () => {
    if (!phoneNumber || phoneNumber.length < 11) {
      showToast("请输入正确的 11 位手机号码");
      return;
    }
    setCountdown(60);
    setCode("8866");
    showToast("【测试验证码】已发送：8866，已自动帮您填入！");
  };

  const handlePhoneLogin = () => {
    if (!phoneNumber) {
      showToast("请输入手机号码");
      return;
    }
    if (!code) {
      showToast("请输入短信验证码");
      return;
    }
    setIsLoggedIn(true);
    setAuthModalOpen(false);
    showToast("🎉 登录成功！已为您分配免费加速体验节点与专线额度。");
  };

  const handleWechatScanMock = () => {
    setIsLoggedIn(true);
    setAuthModalOpen(false);
    showToast("🎉 微信扫码授权成功！欢迎回来。");
  };

  // 搜索预设数据
  const searchResults = [
    { title: "2026 机场推荐与稳定梯子选购大盘", url: "/rank", tag: "大盘" },
    { title: "免费美区 Apple ID 共享账号池", url: "/apple-id", tag: "共享池" },
    { title: "我的公网 IP 与出口网络环境查询", url: "/tools/my-ip", tag: "工具" },
    { title: "DNS 劫持与 WebRTC 泄露检测", url: "/tools/dns-leak-test", tag: "工具" },
    { title: "暮光加速 IEPL 专线晚高峰实测", url: "/blog/暮光加速-review", tag: "测评" },
    { title: "隐形人 Cloud BGP 高性价比节点深度评测", url: "/blog/隐形人-review", tag: "测评" },
    { title: "Sing-box 与 Clash 故障自救排查指南", url: "/blog/singbox-clash-guide", tag: "教程" }
  ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      {/* Toast 提示框 */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-[9999] flex items-center gap-2 rounded-2xl border-2 border-emerald-400 bg-white/95 px-4 py-3 text-sm font-black text-emerald-600 shadow-2xl backdrop-blur-xl animate-in fade-in">
          <Check className="h-5 w-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* 左侧：Logo & 品牌名称 */}
          <Link href="/" className="flex items-center gap-2.5 transition-transform active:scale-95 shrink-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-brand-600 to-pink-500 text-white shadow-md shadow-brand-500/20">
              <img src="/logo.png" alt="猫太博客 Logo" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col whitespace-nowrap shrink-0">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5 whitespace-nowrap">
                猫太博客 <span className="text-pink-500">🌸</span>
                <span className="hidden xl:inline-block rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold text-brand-600 border border-brand-100 whitespace-nowrap">
                  跨境网络加速
                </span>
              </span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 whitespace-nowrap">
                GLOBAL NETWORK ACCELERATOR
              </span>
            </div>
          </Link>

          {/* 中间：桌面端导航菜单 */}
          <nav className="hidden items-center gap-1 lg:gap-1.5 md:flex shrink-0">
            {/* 1. 网络测试 */}
            <div 
              ref={toolsRef}
              className="relative shrink-0"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                onClick={() => setToolsDropdownOpen(prev => !prev)}
                className="flex items-center gap-1 rounded-lg px-2 lg:px-2.5 py-1.5 text-xs lg:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-brand-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Activity className="h-4 w-4 text-brand-600 shrink-0" />
                <span className="whitespace-nowrap">网络测试</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 shrink-0 ${toolsDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute left-0 top-full w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-saas-hover backdrop-blur-xl animate-in fade-in zoom-in-95 z-50 divide-y divide-slate-100">
                  <div className="pb-1.5">
                    <Link 
                      href="/tools/network-health/" 
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 bg-brand-50/60 hover:bg-brand-50 transition-colors cursor-pointer"
                    >
                      <div className="text-brand-600 font-bold">🩺</div>
                      <div>
                        <div className="text-xs font-black text-brand-700 whitespace-nowrap">Network Health Score</div>
                        <div className="text-[10px] text-slate-500 whitespace-nowrap">全功能网络健康度综合体检</div>
                      </div>
                    </Link>
                  </div>
                  <div className="py-1.5 space-y-0.5">
                    <Link 
                      href="/tools/my-ip/" 
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>📍</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 whitespace-nowrap">What Is My IP</div>
                        <div className="text-[10px] text-slate-400 whitespace-nowrap">查看我的公网 IP 与运营商</div>
                      </div>
                    </Link>
                    <Link 
                      href="/tools/dns-leak-test/" 
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>🛡️</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 whitespace-nowrap">DNS Leak Test</div>
                        <div className="text-[10px] text-slate-400 whitespace-nowrap">检测 DNS 是否遭运营商监听</div>
                      </div>
                    </Link>
                    <Link 
                      href="/tools/webrtc-test/" 
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>🔒</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 whitespace-nowrap">WebRTC Leak Test</div>
                        <div className="text-[10px] text-slate-400 whitespace-nowrap">检测浏览器真实 IP 穿透暴露</div>
                      </div>
                    </Link>
                    <Link 
                      href="/tools/ping-test/" 
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>⚡</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 whitespace-nowrap">Ping Test</div>
                        <div className="text-[10px] text-slate-400 whitespace-nowrap">网络往返延迟与丢包抖动测试</div>
                      </div>
                    </Link>
                    <Link 
                      href="/tools/vpn-leak-test/" 
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>🔍</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 whitespace-nowrap">VPN Leak Test</div>
                        <div className="text-[10px] text-slate-400 whitespace-nowrap">IP/DNS/WebRTC 综合 4 重体检</div>
                      </div>
                    </Link>
                    <Link 
                      href="/tools/vpn-speed-test/" 
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>🚀</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 whitespace-nowrap">VPN Speed Test</div>
                        <div className="text-[10px] text-slate-400 whitespace-nowrap">实际下载速率与带宽吞吐测速</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. VPN & 隐私 */}
            <Link 
              href="/blog/vpn-guide/" 
              className="flex items-center gap-1 rounded-lg px-2 lg:px-2.5 py-1.5 text-xs lg:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-brand-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="whitespace-nowrap">VPN & 隐私</span>
            </Link>

            {/* 3. 网络指南 */}
            <Link 
              href="/blog/network-guide/" 
              className="flex items-center gap-1 rounded-lg px-2 lg:px-2.5 py-1.5 text-xs lg:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-brand-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">网络指南</span>
            </Link>

            {/* 4. 机场评测 */}
            <Link 
              href="/blog/airport-recommendation/" 
              className="flex items-center gap-1 rounded-lg px-2 lg:px-2.5 py-1.5 text-xs lg:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-brand-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">机场评测</span>
            </Link>

            {/* 5. 技术博客 */}
            <Link 
              href="/blog/" 
              className="flex items-center gap-1 rounded-lg px-2 lg:px-2.5 py-1.5 text-xs lg:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-brand-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <BookOpen className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="whitespace-nowrap">技术博客</span>
            </Link>

            {/* 下拉菜单 2：🌙 更多 */}
            <div 
              ref={moreRef}
              className="relative shrink-0"
              onMouseEnter={() => setMoreDropdownOpen(true)}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button
                onClick={() => setMoreDropdownOpen(prev => !prev)}
                className="flex items-center gap-1 rounded-lg px-2 lg:px-2.5 py-1.5 text-xs lg:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-brand-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span className="whitespace-nowrap">🌙 更多</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 shrink-0 ${moreDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute left-0 top-full w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-saas-hover backdrop-blur-xl animate-in fade-in zoom-in-95 z-50">
                  <Link 
                    href="/rank/" 
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-pink-600 hover:bg-pink-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>🏆 2026 机场推荐大盘</span>
                  </Link>
                  <Link 
                    href="/apple-id/" 
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>🍎 免费美区 Apple ID 池</span>
                  </Link>
                  <Link 
                    href="/blog/clash-guide/" 
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>⚡ 客户端分流配置</span>
                  </Link>
                  <Link 
                    href="/whitepaper/" 
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>📑 评测白皮书 & 规范</span>
                  </Link>
                  <Link 
                    href="/methodology/" 
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>🔬 实验室测评方法论</span>
                  </Link>
                  <Link 
                    href="/about/" 
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>✨ 关于猫太实验室</span>
                  </Link>
                  <Link 
                    href="/archives/" 
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>💌 文章时间归档</span>
                  </Link>
                  <Link 
                    href="/gallery/" 
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-pink-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>🖼️ 治愈系图库</span>
                  </Link>
                </div>
              )}
            </div>

            {/* 💬 论坛社群 */}
            <a
              href="https://t.me/+KMqGQjOeRY1hNjY1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-lg px-2 lg:px-2.5 py-1.5 text-xs lg:text-sm font-black text-pink-600 hover:bg-pink-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">💬 论坛</span>
              <span className="text-xs text-pink-400 shrink-0">↗</span>
            </a>
          </nav>

          {/* 右侧：动作按钮 (搜索 + 登录状态) */}
          <div className="hidden items-center gap-1.5 lg:gap-2 md:flex shrink-0">
            {/* 搜索触发按钮 */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-1.5 lg:gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 lg:px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="whitespace-nowrap">搜索...</span>
              <kbd className="hidden xl:inline-block rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* 登录/用户状态按钮 */}
            {isLoggedIn ? (
              <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-2.5 lg:px-3 py-1.5 text-xs font-black text-emerald-700 whitespace-nowrap shrink-0">
                <UserCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="whitespace-nowrap">已授权加速</span>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-brand-600 px-3 lg:px-4 py-1.5 lg:py-2 text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <QrCode className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">登录 / 注册</span>
              </button>
            )}
          </div>

          {/* 移动端 Hamburger 按钮 */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 移动端下拉抽屉菜单 */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white p-4 md:hidden flex flex-col gap-2">
            <Link 
              href="/rank/" 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2.5 text-sm font-black text-pink-600 bg-pink-50 flex items-center justify-between"
            >
              <span>🏆 2026 机场推荐榜单</span>
              <span>➔</span>
            </Link>
            <Link 
              href="/apple-id/" 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2.5 text-sm font-black text-purple-600 bg-purple-50 flex items-center justify-between"
            >
              <span>🍎 免费 Apple ID 共享池</span>
              <span>➔</span>
            </Link>
            <Link 
              href="/tools/my-ip" 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              📍 免费公网 IP 查询
            </Link>
            <Link 
              href="/tools/dns-leak-test" 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              🛡️ DNS / WebRTC 泄露检测
            </Link>
            <Link 
              href="/blog/" 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              📖 技术测评博客文章
            </Link>
            <Link 
              href="/gallery/" 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              🖼️ 治愈系插画图库
            </Link>
            <Link 
              href="/whitepaper/" 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              📑 评测白皮书 & 规范
            </Link>
            <Link 
              href="/about/" 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              ✨ 关于猫太
            </Link>
            <a 
              href="https://t.me/+KMqGQjOeRY1hNjY1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rounded-lg p-2.5 text-sm font-bold text-pink-600 hover:bg-slate-50"
            >
              💬 论坛 Telegram ↗
            </a>
            
            <button
              onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }}
              className="mt-2 w-full rounded-xl bg-brand-600 py-3 text-center text-sm font-bold text-white shadow-md cursor-pointer"
            >
              {isLoggedIn ? "✅ 账号已登录 (专线加速中)" : "微信扫码 / 手机号快捷登录"}
            </button>
          </div>
        )}
      </header>

      {/* 🔍 全局 ⌘K 站内搜索 Modal 弹窗 */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-900/60 backdrop-blur-sm p-4 pt-20 animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜索机场、测评文章、工具或 Apple ID..."
                className="w-full text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 结果列表 */}
            <div className="max-h-80 overflow-y-auto space-y-1.5">
              {searchResults.length > 0 ? (
                searchResults.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.url}
                    onClick={() => setSearchModalOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer"
                  >
                    <span className="text-xs font-bold text-slate-800 group-hover:text-brand-600">
                      {item.title}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-500">
                      {item.tag}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-xs font-bold text-slate-400">
                  未搜寻到相关内容，请尝试换一个关键词
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-3 mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>按 ESC 或点击关闭退出</span>
              <span className="font-mono">共 {searchResults.length} 条相关结果</span>
            </div>
          </div>
        </div>
      )}

      {/* 微信 / 手机号快捷登录 Modal 弹窗 */}
      {authModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
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
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                  loginMethod === "wechat" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <QrCode className="h-4 w-4 text-emerald-600" />
                <span>微信扫码登录</span>
              </button>
              <button
                onClick={() => setLoginMethod("phone")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
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
                  <div 
                    onClick={handleWechatScanMock}
                    className="rounded-2xl border-2 border-dashed border-emerald-300 p-3 bg-emerald-50/50 hover:bg-emerald-100/50 transition-colors cursor-pointer group"
                    title="点击可模拟微信扫码成功"
                  >
                    <div className="flex h-44 w-44 flex-col items-center justify-center rounded-xl bg-white shadow-inner font-mono text-xs text-slate-400 border border-slate-200 group-hover:border-emerald-400">
                      <QrCode className="h-20 w-20 text-slate-300 group-hover:text-emerald-500 transition-colors mb-2" />
                      <span className="text-[11px] font-bold text-slate-500 group-hover:text-emerald-600">点击模拟微信扫码</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">打开微信，扫一扫或直接点击上方二维码</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">手机号码</label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      placeholder="请输入中国大陆 11 位手机号 (如 13800000000)"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:border-brand-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">短信验证码</label>
                    <div className="mt-1 flex gap-2">
                      <input
                        type="text"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        placeholder="6 位验证码"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:border-brand-600 focus:outline-none"
                      />
                      <button
                        onClick={handleSendCode}
                        disabled={countdown > 0}
                        className="shrink-0 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 disabled:text-slate-400 cursor-pointer"
                      >
                        {countdown > 0 ? `${countdown}s 后重新获取` : "获取验证码"}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handlePhoneLogin}
                    className="mt-2 w-full rounded-xl bg-brand-600 py-3 text-xs font-bold text-white shadow-md hover:bg-brand-700 active:scale-95 transition-all cursor-pointer"
                  >
                    立即登录 / 注册
                  </button>
                </div>
              )}
            </div>

            <p className="mt-4 text-center text-[10px] text-slate-400">
              登录即代表已同意 <a href="/about/" className="underline">服务协议</a> 与 <a href="/about/" className="underline">隐私声明</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
