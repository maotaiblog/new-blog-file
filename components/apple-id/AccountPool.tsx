"use client";

import React, { useState } from "react";
import { Copy, Eye, EyeOff, RefreshCw, AlertTriangle, Check, ShieldAlert } from "lucide-react";

export interface AppleAccount {
  id: string;
  region: string;
  email: string;
  password: string;
  status: 'active' | 'locked';
  updated_at: string;
}

const defaultAccounts: AppleAccount[] = [
  {
    id: "1",
    region: "🇺🇸 美区主账号 #1",
    email: "us_free_2026_01@catblog.org",
    password: "Password2026#US",
    status: "active",
    updated_at: "2026-08-28 16:30"
  },
  {
    id: "2",
    region: "🇯🇵 日区备用 #2",
    email: "jp_free_2026_02@catblog.org",
    password: "Password2026#JP",
    status: "active",
    updated_at: "2026-08-28 16:35"
  },
  {
    id: "3",
    region: "🇭🇰 港区专线 #3",
    email: "hk_free_2026_03@catblog.org",
    password: "Password2026#HK",
    status: "active",
    updated_at: "2026-08-28 16:40"
  }
];

export default function AccountPool() {
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 2500);
  };

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        triggerToast(`已成功复制 ${label} 到剪贴板！`);
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  const fallbackCopy = (text: string, label: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      triggerToast(`已成功复制 ${label} 到剪贴板！`);
    } catch {
      triggerToast("复制失败，请手动选择复制");
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswordMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast 提示框 */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-[9999] flex items-center gap-2 rounded-2xl border-2 border-emerald-400 bg-white/95 px-4 py-3 text-sm font-black text-emerald-600 shadow-xl backdrop-blur-xl animate-in fade-in">
          <Check className="h-5 w-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header 状态栏 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-saas-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                🍎 免费美区/外区 Apple ID 共享账号池
              </h1>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              探针自动巡检机制维护中 • 实时自动下架已锁机异常节点
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-pink-600 bg-pink-50 border border-pink-200 px-3 py-1.5 rounded-xl">
              🕒 自动同步：2026-08-28 16:50
            </span>
            <button
              onClick={() => triggerToast('正在从探针中心同步最新正常账号...')}
              className="flex items-center gap-1.5 rounded-xl bg-pink-500 px-4 py-1.5 text-xs font-black text-white hover:bg-pink-600 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>刷新账号</span>
            </button>
          </div>
        </div>

        {/* 🚨 严禁从 iCloud 登录警示 */}
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <div className="flex items-start gap-3 text-rose-700">
            <ShieldAlert className="h-6 w-6 shrink-0 text-rose-600 animate-bounce" />
            <div className="text-xs sm:text-sm font-bold leading-relaxed">
              <p className="text-rose-900 text-sm sm:text-base font-black mb-1">【严禁从设置 (iCloud) 登录】</p>
              <p>绝对只能在 <strong className="underline decoration-rose-400">App Store 商店页面</strong> 点击右上角头像登录共享账号！若误从系统【设置】登录 iCloud，会导致您的 iPhone 个人手机被远程锁机死锁，后果自负！</p>
            </div>
          </div>
        </div>
      </div>

      {/* 账号卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {defaultAccounts.map(acc => (
          <div key={acc.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-saas-card hover:shadow-saas-hover transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                <span className="rounded-full bg-pink-50 border border-pink-200 px-3 py-1 font-mono text-xs font-black text-pink-600">
                  {acc.region}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-mono font-bold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span>状态正常</span>
                </span>
              </div>

              {/* 账号 */}
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-500">Apple ID 账号:</span>
                  <div className="mt-1 flex items-center justify-between gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                    <span className="font-mono text-xs font-black text-slate-900 truncate">{acc.email}</span>
                    <button
                      onClick={() => handleCopy(acc.email, '账号')}
                      className="shrink-0 rounded-lg bg-pink-100 border border-pink-200 px-2.5 py-1 text-[11px] font-extrabold text-pink-600 hover:bg-pink-500 hover:text-white transition-colors cursor-pointer"
                    >
                      📋 复制
                    </button>
                  </div>
                </div>

                {/* 密码 */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500">Apple ID 密码:</span>
                  <div className="mt-1 flex items-center justify-between gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                    <span className="font-mono text-xs font-black text-emerald-600">
                      {showPasswordMap[acc.id] ? acc.password : "••••••••••••••••"}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => togglePasswordVisibility(acc.id)}
                        className="rounded-lg bg-slate-200/80 px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
                        title="切换显示/隐藏密码"
                      >
                        {showPasswordMap[acc.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={() => handleCopy(acc.password, '密码')}
                        className="rounded-lg bg-pink-100 border border-pink-200 px-2.5 py-1 text-[11px] font-extrabold text-pink-600 hover:bg-pink-500 hover:text-white transition-colors cursor-pointer"
                      >
                        📋 复制
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-rose-500 font-bold">
              <span>⚠️ 严禁登陆系统 iCloud</span>
              <span className="font-mono text-slate-400">Updated 10m ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
