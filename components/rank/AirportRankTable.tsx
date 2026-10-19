"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Filter, RotateCcw, Copy, Check, ExternalLink } from "lucide-react";

export interface Airport {
  id: string;
  rank: number;
  name: string;
  badge?: string;
  badgeColor?: string;
  officialUrl: string;
  reviewUrl: string;
  architecture: string;
  lossRate: string;
  priceFlow: string;
  protocols: string[];
  streamingAi: string;
  deviceSpeed: string;
  change: string;
  budgetCategory: 'low' | 'mid' | 'high'; // low: <15元, mid: 15-30元, high: 30元+
  demandTags: string[]; // ['ai', '4k', 'game', 'backup']
  isSpecialLine: boolean; // 是否专线
}

// 固化权威评测排名机场大盘 (真实官方 AFF 链接与评测路线，严格对齐 Google Drive 资料)
const airportList: Airport[] = [
  {
    id: "totorocloud",
    rank: 1,
    name: "龙猫云 TotoroCloud",
    badge: "🏆 独家首推 · BGP入口+IPLC专线",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    officialUrl: "https://longmaocloud.club",
    reviewUrl: "/blog/龙猫云-review",
    architecture: "大陆 BGP 入口 + IPLC 内网专线",
    lossRate: "0.01% (实测极低)",
    priceFlow: "¥15.00 / 100GB (不限设备)",
    protocols: ["Trojan", "Shadowsocks", "VLESS"],
    streamingAi: "Netflix, Disney+, HBO Max, ChatGPT 极速解锁",
    deviceSpeed: "不限设备 | 晚高峰实测 530Mbps (80+节点覆盖)",
    change: "🔝 推荐首选 NO.1",
    budgetCategory: "low",
    demandTags: ["ai", "4k", "game"],
    isSpecialLine: true,
  },
  {
    id: "liulianyun",
    rank: 2,
    name: "榴莲云 LiulianYun",
    badge: "🥈 7折年付仅¥5.6/月 · 全IPLC专线",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    officialUrl: "https://maotai01.liulianyunaff.com/#/?code=ZvPBuNpn",
    reviewUrl: "/blog/榴莲云-review",
    architecture: "全 IPLC 专线 (单节点峰值 2.5Gbps)",
    lossRate: "0.01% (实测极低)",
    priceFlow: "¥5.60/月起 (7折码ll88) / 140GB ¥24",
    protocols: ["Shadowsocks", "Trojan", "VLESS"],
    streamingAi: "原生 IP 解锁 Netflix, Disney+, ChatGPT",
    deviceSpeed: "不限设备 | 晚高峰实测 510Mbps (香港/日本节点)",
    change: "⭐ 专线推荐 NO.2",
    budgetCategory: "low",
    demandTags: ["ai", "4k", "game"],
    isSpecialLine: true,
  },
  {
    id: "peiqian",
    rank: 3,
    name: "赔钱机场 Peiqian Cloud",
    badge: "🥉 极致超低价 · ¥1.99起/月",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    officialUrl: "https://pqjc.my",
    reviewUrl: "/blog/赔钱机场-review",
    architecture: "三网高质量中转线路 (最高 20000Mbps)",
    lossRate: "0.03% (平价中转)",
    priceFlow: "¥1.99/月起 | ¥14.9/1000GB不限时",
    protocols: ["Shadowsocks", "Trojan"],
    streamingAi: "基础流媒体观影与日常 AI 访问",
    deviceSpeed: "不限客户端与设备 | 实测 380Mbps (含0.1x倍率)",
    change: "⬆️ 极低门槛 NO.3",
    budgetCategory: "low",
    demandTags: ["backup", "4k"],
    isSpecialLine: false,
  },
  {
    id: "invisibles",
    rank: 4,
    name: "隐形人 Invisibles",
    badge: "⭐ 独家特惠 · IEPL纯专线1倍率",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    officialUrl: "https://yinxingren1.invisibleaff.com/#/register?code=Gcp1CRso",
    reviewUrl: "/blog/隐形人-review",
    architecture: "企业级 IEPL 纯专线 / BGP 智能调度",
    lossRate: "0.02% (实测极低)",
    priceFlow: "¥24.00 / 144GB (新人8折)",
    protocols: ["VLESS", "Sing-Box", "Reality"],
    streamingAi: "全节点 1x 扣费 / 4K 8K 流媒体 & ChatGPT 解锁",
    deviceSpeed: "无设备限制 | 晚高峰实测 520Mbps (香港节点)",
    change: "⭐ 专线精选 NO.4",
    budgetCategory: "mid",
    demandTags: ["ai", "4k", "game"],
    isSpecialLine: true,
  },
  {
    id: "twilight",
    rank: 5,
    name: "暮光加速",
    badge: "⭐ 晚高峰极速 · 全IEPL专线",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    officialUrl: "https://yinxing4.twilightaff.com",
    reviewUrl: "/blog/暮光加速-review",
    architecture: "全 IEPL 内网专线",
    lossRate: "0.02% (实测极低)",
    priceFlow: "¥18.80 / 150GB",
    protocols: ["Hysteria2", "VLESS", "Trojan"],
    streamingAi: "ChatGPT / Claude / 4K Netflix 最近实测：可用",
    deviceSpeed: "无设备限制 | 晚高峰实测 480Mbps (日本节点)",
    change: "⭐ 晚高峰极速 NO.5",
    budgetCategory: "mid",
    demandTags: ["ai", "4k", "game"],
    isSpecialLine: true,
  },
  {
    id: "weifeng",
    rank: 6,
    name: "微风网络",
    badge: "⭐ 低延迟 · 电竞游戏专属",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    officialUrl: "https://wep01.breezenetaff.com/#/?code=JHqHSog8",
    reviewUrl: "/blog/微风网络-review",
    architecture: "IEPL 电竞专线 + BGP 中继",
    lossRate: "0.03% (实测极低)",
    priceFlow: "¥27.00 / 200GB",
    protocols: ["TUIC", "Hysteria2", "Shadowsocks"],
    streamingAi: "AI / 游戏低延迟最近实测：可用",
    deviceSpeed: "3台设备 | 晚高峰实测 450Mbps (沪日专线)",
    change: "⭐ 电竞专线 NO.6",
    budgetCategory: "mid",
    demandTags: ["game", "ai"],
    isSpecialLine: true,
  },
  {
    id: "feimao",
    rank: 7,
    name: "飞猫云",
    badge: "⚡ IPLC专线 · 高速专线不限设备",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    officialUrl: "https://jkg3cghf.feimaogfttt1.xyz/#/?code=3NlSNiJl",
    reviewUrl: "/blog/飞猫云-review",
    architecture: "全 IPLC 专线 (多入口内网接入)",
    lossRate: "0.01% (极低)",
    priceFlow: "¥25.00 / 150GB",
    protocols: ["Shadowsocks", "Trojan"],
    streamingAi: "原生 IP 解锁 Netflix, Disney+, TikTok",
    deviceSpeed: "不限设备 | 晚高峰实测 420Mbps (广港专线)",
    change: "⭐ 热门精选 NO.7",
    budgetCategory: "mid",
    demandTags: ["4k", "ai"],
    isSpecialLine: true,
  },
  {
    id: "wgetcloud",
    rank: 8,
    name: "WgetCloud",
    badge: "👑 5年老牌高端 · 亚马逊专线",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    officialUrl: "https://invite.wgetcloud.ltd/auth/register?code=1i8Pgu",
    reviewUrl: "/blog/wgetcloud-review",
    architecture: "BGP + 亚马逊 Global Accelerator",
    lossRate: "0.01% (商务级)",
    priceFlow: "¥79.00 / 160GB",
    protocols: ["Trojan"],
    streamingAi: "全平台顶级画质 4K/8K 与高端 AI 工具",
    deviceSpeed: "多设备支持 | 晚高峰实测 650Mbps (优质BGP)",
    change: "👑 商务标杆 NO.8",
    budgetCategory: "high",
    demandTags: ["ai", "4k"],
    isSpecialLine: true,
  },
  {
    id: "lingdong",
    rank: 9,
    name: "灵动云",
    badge: "💎 高性价比 · 不限时流量可选",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    officialUrl: "https://yinxing4.lingdongaff.com/#/?code=mW96wgI4",
    reviewUrl: "/blog/灵动云-review",
    architecture: "Trojan / VLESS 专线链路",
    lossRate: "0.01% (优良)",
    priceFlow: "¥20.00 / 100GB",
    protocols: ["Trojan", "VLESS"],
    streamingAi: "4K流媒体 + ChatGPT / Claude 解锁",
    deviceSpeed: "5台设备 | 晚高峰实测 380Mbps (新加坡节点)",
    change: "⭐ 性价比推荐 NO.9",
    budgetCategory: "mid",
    demandTags: ["ai", "4k", "backup"],
    isSpecialLine: true,
  },
  {
    id: "dageyun",
    rank: 10,
    name: "大哥云",
    badge: "🛡️ 老牌大厂 · 多路中转",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    officialUrl: "https://a03.dgy02.com/#/register?code=X8MBmftq",
    reviewUrl: "/blog/大哥云-review",
    architecture: "多路隧道 BGP + 专线",
    lossRate: "0.02% (稳定)",
    priceFlow: "¥19.90 / 100GB",
    protocols: ["Shadowsocks", "V2ray"],
    streamingAi: "主流海外流媒体最近实测：可用",
    deviceSpeed: "5台设备 | 晚高峰实测 360Mbps (中转节点)",
    change: "⭐ 稳定大厂 NO.10",
    budgetCategory: "mid",
    demandTags: ["4k", "backup"],
    isSpecialLine: false,
  },
  {
    id: "kuajie",
    rank: 11,
    name: "跨界云",
    badge: "🚀 全专线升级 · VLESS轻快",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    officialUrl: "https://vip02.kuajieaff.com/#/?code=kTdpCGi9",
    reviewUrl: "/blog/跨界云-review",
    architecture: "全专线链路升级",
    lossRate: "0.01%",
    priceFlow: "¥20.00 / 120GB",
    protocols: ["VLESS"],
    streamingAi: "YouTube、Netflix、Disney+ 流畅解锁",
    deviceSpeed: "多设备通用 | 晚高峰实测 410Mbps (VLESS节点)",
    change: "⭐ 新锐全专线 NO.11",
    budgetCategory: "mid",
    demandTags: ["4k", "ai"],
    isSpecialLine: true,
  },
  {
    id: "quanqiu",
    rank: 12,
    name: "全球云",
    badge: "🌐 全球多节点 · 容灾备份",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    officialUrl: "https://vbfdvfj1.quanqiugttt1.club/#/?code=NKII9ZkH",
    reviewUrl: "/blog/全球云-review",
    architecture: "BGP 专线多路由中转",
    lossRate: "0.02%",
    priceFlow: "¥15.00 / 120GB",
    protocols: ["Shadowsocks", "Trojan"],
    streamingAi: "多国原生节点解锁流媒体与 AI",
    deviceSpeed: "多设备通用 | 晚高峰实测 350Mbps (容灾节点)",
    change: "⭐ 容灾首选 NO.12",
    budgetCategory: "mid",
    demandTags: ["backup", "ai"],
    isSpecialLine: false,
  },
  {
    id: "wuyou",
    rank: 13,
    name: "无忧链接",
    badge: "🛡️ 平价稳定 · 省心好用",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    officialUrl: "https://lsitel.worryfreettt.homes/#/?code=SaSZbwak",
    reviewUrl: "/blog/无忧链接-review",
    architecture: "BGP + 专线混合",
    lossRate: "0.02%",
    priceFlow: "¥16.00 / 100GB",
    protocols: ["Trojan", "Shadowsocks"],
    streamingAi: "稳定解锁海外流媒体与工作学习",
    deviceSpeed: "3台设备 | 晚高峰实测 320Mbps (日常节点)",
    change: "⭐ 平价实用 NO.13",
    budgetCategory: "mid",
    demandTags: ["backup"],
    isSpecialLine: false,
  },
  {
    id: "tizi",
    rank: 14,
    name: "梯子云",
    badge: "🪜 梯子云 · 晚高峰稳定",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    officialUrl: "https://tizi2.invisibleaff.com",
    reviewUrl: "/blog/梯子云-review",
    architecture: "BGP 优化专线",
    lossRate: "0.01%",
    priceFlow: "¥22.00 / 150GB",
    protocols: ["VLESS", "Trojan"],
    streamingAi: "流媒体与 AI 工具最近实测：可用",
    deviceSpeed: "5台设备 | 晚高峰实测 390Mbps (专线节点)",
    change: "⭐ 稳定专线 NO.14",
    budgetCategory: "mid",
    demandTags: ["ai", "4k"],
    isSpecialLine: true,
  },
  {
    id: "langwang",
    rank: 15,
    name: "浪网",
    badge: "🌊 极速冲浪 · 自研客户端",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    officialUrl: "https://langwang3.invisibleaff.com",
    reviewUrl: "/blog/浪网-review",
    architecture: "VLESS 自研客户端优化线路",
    lossRate: "0.01%",
    priceFlow: "¥30.00 / 150GB",
    protocols: ["VLESS", "Hysteria2"],
    streamingAi: "4K/8K 流媒体秒开与 AI 工具支持",
    deviceSpeed: "多端一键连接 | 晚高峰实测 430Mbps (自研客户端)",
    change: "⭐ 新手友好 NO.15",
    budgetCategory: "mid",
    demandTags: ["4k", "game"],
    isSpecialLine: true,
  },
  {
    id: "lingmao",
    rank: 16,
    name: "灵猫网络",
    badge: "🐱 猫系轻量 · 速度灵动",
    badgeColor: "bg-pink-50 text-pink-700 border-pink-200",
    officialUrl: "https://edp01.civetaff.com/#/?code=8n0vbtUD",
    reviewUrl: "/blog/灵猫网络-review",
    architecture: "BGP + IPLC 混合专线",
    lossRate: "0.02%",
    priceFlow: "¥18.00 / 120GB",
    protocols: ["Shadowsocks", "V2ray"],
    streamingAi: "Netflix / Disney+ 4K 解锁",
    deviceSpeed: "5台设备 | 晚高峰实测 340Mbps (混合专线)",
    change: "⭐ 轻量好用 NO.16",
    budgetCategory: "mid",
    demandTags: ["ai", "4k"],
    isSpecialLine: true,
  },
  {
    id: "firefly",
    rank: 17,
    name: "Firefly 萤火虫",
    badge: "✨ 荧光极速 · 灵活订阅",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    officialUrl: "https://vip02.fireflyaff.com/#/?code=QvtWcNbI",
    reviewUrl: "/blog/firefly-review",
    architecture: "IPLC 原生专线",
    lossRate: "0.01%",
    priceFlow: "¥20.00 / 100GB",
    protocols: ["VLESS", "Shadowsocks"],
    streamingAi: "ChatGPT / Claude / Netflix 原生解锁",
    deviceSpeed: "不限设备 | 晚高峰实测 410Mbps (IPLC节点)",
    change: "⭐ 专线稳定 NO.17",
    budgetCategory: "mid",
    demandTags: ["ai", "4k"],
    isSpecialLine: true,
  },
  {
    id: "flyv",
    rank: 18,
    name: "FlyV 加速",
    badge: "✈️ 飞速穿梭 · 节点丰富",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    officialUrl: "https://rtu23u5.flyvttt.sbs/#/?code=28mmffKv",
    reviewUrl: "/blog/flyv-review",
    architecture: "IEPL 纯专线",
    lossRate: "0.02% (实测极低)",
    priceFlow: "¥22.00 / 160GB",
    protocols: ["Hysteria2", "VLESS", "Trojan"],
    streamingAi: "全平台 4K 流媒体与 AI 解锁",
    deviceSpeed: "不限设备 | 晚高峰实测 460Mbps (IEPL节点)",
    change: "⭐ 专线精选 NO.18",
    budgetCategory: "mid",
    demandTags: ["ai", "4k"],
    isSpecialLine: true,
  },
  {
    id: "ssone",
    rank: 19,
    name: "SSONE 机场",
    badge: "🎯 极简原生 · 经典SS协议",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    officialUrl: "https://m.ssone.io/#/register?code=GeTpX1Qx",
    reviewUrl: "/blog/ssone-review",
    architecture: "BGP 隧道中转",
    lossRate: "0.02%",
    priceFlow: "¥10.00 / 60GB",
    protocols: ["Shadowsocks", "Trojan"],
    streamingAi: "ChatGPT / Disney+ 4K 解锁",
    deviceSpeed: "多设备通用 | 晚高峰实测 360Mbps (中转节点)",
    change: "⭐ 极低门槛 NO.19",
    budgetCategory: "low",
    demandTags: ["backup", "ai"],
    isSpecialLine: false,
  },
  {
    id: "saiboyun",
    rank: 20,
    name: "赛博云",
    badge: "💾 1TB超大流量 · 极低单价",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    officialUrl: "https://saiboyun.pages.dev/",
    reviewUrl: "/blog/赛博云-review",
    architecture: "豪华中转专线",
    lossRate: "0.04%",
    priceFlow: "¥16.00 / 1000GB",
    protocols: ["Shadowsocks", "Trojan"],
    streamingAi: "海量下载与 4K 视频刷剧",
    deviceSpeed: "不限客户端 | 晚高峰实测 320Mbps (日常节点)",
    change: "⭐ 大流量首选 NO.20",
    budgetCategory: "mid",
    demandTags: ["4k", "backup"],
    isSpecialLine: false,
  },
  {
    id: "shanyue",
    rank: 21,
    name: "闪跃专线",
    badge: "⚡ 极速专线 · 极佳抗封锁",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    officialUrl: "https://invite.wgetcloud.ltd/auth/register?code=1i8Pgu",
    reviewUrl: "/blog/闪跃-review",
    architecture: "亚马逊 Global Accelerator 专线",
    lossRate: "0.02% (实测极低)",
    priceFlow: "¥79.00 / 160GB",
    protocols: ["Trojan"],
    streamingAi: "企业级专线加速，全流媒体及 AI 解锁",
    deviceSpeed: "多设备通用 | 晚高峰实测 500Mbps (优质专线)",
    change: "⭐ 高端备用 NO.21",
    budgetCategory: "high",
    demandTags: ["ai", "4k"],
    isSpecialLine: true,
  }
];

export default function AirportRankTable() {
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [demandFilter, setDemandFilter] = useState<'all' | 'ai' | '4k' | 'game' | 'backup'>('all');
  const [lineFilter, setLineFilter] = useState<'all' | 'special' | 'bgp'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleCopyLink = (url: string, name: string, id: string) => {
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(prev => (prev === id ? null : prev));
    }, 2000);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        showToast(`已复制 ${name} 官网链接！`);
      }).catch(() => {
        fallbackCopy(url, name);
      });
    } else {
      fallbackCopy(url, name);
    }
  };

  const fallbackCopy = (text: string, name: string) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast(`已复制 ${name} 官网链接！`);
    } catch {
      showToast("复制链接失败，请点击官网直达进入");
    }
  };

  const filteredAirports = useMemo(() => {
    return airportList.filter(item => {
      if (budgetFilter !== 'all' && item.budgetCategory !== budgetFilter) return false;
      if (demandFilter !== 'all' && !item.demandTags.includes(demandFilter)) return false;
      if (lineFilter === 'special' && !item.isSpecialLine) return false;
      if (lineFilter === 'bgp' && item.isSpecialLine) return false;
      return true;
    });
  }, [budgetFilter, demandFilter, lineFilter]);

  const hasActiveFilter = budgetFilter !== 'all' || demandFilter !== 'all' || lineFilter !== 'all';

  const resetFilters = () => {
    setBudgetFilter('all');
    setDemandFilter('all');
    setLineFilter('all');
    showToast("已重置所有选型筛选条件");
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast 提示 */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-[9999] flex items-center gap-2 rounded-2xl border-2 border-emerald-400 bg-white/95 px-4 py-3 text-sm font-black text-emerald-600 shadow-2xl backdrop-blur-xl animate-in fade-in">
          <Check className="h-4 w-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 智能选购筛选器 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-saas-card">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm sm:text-base">
            <Filter className="h-4 w-4 text-brand-600" />
            <span>机场智能选型与预算筛选器</span>
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>重置筛选</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* 月预算 */}
          <div>
            <span className="font-bold text-slate-500 block mb-2">1. 月预算范围:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: '全部' },
                { id: 'low', label: '15元以下' },
                { id: 'mid', label: '15-30元' },
                { id: 'high', label: '30元以上' },
              ].map(b => (
                <button
                  key={b.id}
                  onClick={() => setBudgetFilter(b.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    budgetFilter === b.id
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* 核心需求 */}
          <div>
            <span className="font-bold text-slate-500 block mb-2">2. 核心使用场景:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: '全部' },
                { id: 'ai', label: 'AI解锁 (ChatGPT)' },
                { id: '4k', label: '4K 看剧' },
                { id: 'game', label: '游戏低延迟' },
                { id: 'backup', label: '廉价备用' },
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => setDemandFilter(d.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    demandFilter === d.id
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* 线路类型 */}
          <div>
            <span className="font-bold text-slate-500 block mb-2">3. 线路拓扑架构:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: '全部' },
                { id: 'special', label: 'IPLC/IEPL 专线' },
                { id: 'bgp', label: 'BGP 中转' },
              ].map(l => (
                <button
                  key={l.id}
                  onClick={() => setLineFilter(l.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    lineFilter === l.id
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 筛选结果实时状态栏 */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
          <div className="flex items-center gap-2 text-slate-700">
            <span>🎯 匹配结果：</span>
            <span className="rounded-full bg-pink-100 text-pink-600 px-2.5 py-0.5 font-mono">
              共 {filteredAirports.length} 款优质节点
            </span>
          </div>
          {hasActiveFilter && (
            <button
              onClick={resetFilters}
              className="text-brand-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>✕ 清除所有筛选过滤</span>
            </button>
          )}
        </div>
      </div>

      {/* 商业推广与实测透明度披露 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-950">⚖️ 推广披露与测试声明：</span>
          <span className="text-[11px] text-amber-800">
            本表“官网直达”包含服务商推广链接（声明为 <code>rel=&quot;sponsored nofollow&quot;</code>）。数据源自 2026 年多轮晚高峰抽样实测，缺少实测证据项一律标为待验证。
          </span>
        </div>
        <Link href="/methodology/" className="text-[11px] font-bold text-amber-900 hover:underline shrink-0">
          查看评测方法论 →
        </Link>
      </div>

      {/* 8/9列 大盘表格 (防止按钮挤压折行) */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-saas-card">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[1100px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold whitespace-nowrap">
              <th className="py-4 px-4 w-12 text-center">排名</th>
              <th className="py-4 px-4 min-w-[160px]">机场名称 / 定位</th>
              <th className="py-4 px-4 min-w-[170px]">官方直达与复制</th>
              <th className="py-4 px-4 min-w-[150px]">线路架构 / 晚高峰丢包</th>
              <th className="py-4 px-4 min-w-[120px]">价格流量</th>
              <th className="py-4 px-4 min-w-[140px]">协议支持</th>
              <th className="py-4 px-4 min-w-[200px]">流媒体 / AI 解锁</th>
              <th className="py-4 px-4 min-w-[160px]">设备限制 / 实测下行</th>
              <th className="py-4 px-4 text-center min-w-[90px]">评测路线</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filteredAirports.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                {/* 排名 */}
                <td className="py-4 px-4 text-center font-black whitespace-nowrap">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs ${
                    item.rank === 1 ? 'bg-amber-400 text-slate-900 shadow-sm' :
                    item.rank === 2 ? 'bg-slate-300 text-slate-900' :
                    item.rank === 3 ? 'bg-orange-300 text-slate-900' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.rank}
                  </span>
                </td>

                {/* 名称 */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <Link href={item.reviewUrl} className="font-black text-slate-900 hover:text-brand-600 text-sm sm:text-base">
                      {item.name}
                    </Link>
                    {item.badge && (
                      <span className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                </td>

                {/* 官方直达与复制按钮 (水平排列，绝对不换行，推广链接添加 rel="nofollow sponsored noopener noreferrer") */}
                <td className="py-4 px-4 whitespace-nowrap min-w-[170px]">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <a
                      href={item.officialUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:opacity-90 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>官网直达 ↗</span>
                    </a>
                    <button
                      onClick={() => handleCopyLink(item.officialUrl, item.name, item.id)}
                      className={`inline-flex items-center justify-center rounded-xl px-2.5 py-1.5 text-[11px] font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        copiedId === item.id
                          ? "bg-emerald-500 text-white border border-emerald-500"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/70"
                      }`}
                      title="复制官方注册直达链接"
                    >
                      <span>{copiedId === item.id ? "✅ 已复制" : "📋 复制"}</span>
                    </button>
                  </div>
                </td>

                {/* 线路架构 */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{item.architecture}</span>
                    <span className="text-[11px] font-mono text-emerald-600">丢包率: {item.lossRate}</span>
                  </div>
                </td>

                {/* 价格流量 */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="font-mono font-extrabold text-slate-900">{item.priceFlow}</span>
                </td>

                {/* 协议 */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {item.protocols.map(p => (
                      <span key={p} className="rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                        {p}
                      </span>
                    ))}
                  </div>
                </td>

                {/* 流媒体/AI */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="text-xs font-semibold text-emerald-700">{item.streamingAi}</span>
                </td>

                {/* 设备速度 */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="text-xs text-slate-600 font-mono">{item.deviceSpeed}</span>
                </td>

                {/* 评测路线 ➔ */}
                <td className="py-4 px-4 text-center whitespace-nowrap">
                  <Link
                    href={item.reviewUrl}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline cursor-pointer"
                  >
                    <span>测评 ➔</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAirports.length === 0 && (
          <div className="p-8 text-center text-xs font-bold text-slate-400">
            未找到满足条件的机场，请尝试【重置筛选】
          </div>
        )}
      </div>
    </div>
  );
}
