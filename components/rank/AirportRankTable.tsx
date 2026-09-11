"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Filter, RotateCcw } from "lucide-react";

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

// 固化定制排名机场大盘
const airportList: Airport[] = [
  {
    id: "twilight",
    rank: 1,
    name: "暮光加速",
    badge: "🏆 榜首首选 · IEPL专线",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    officialUrl: "https://lsitel.worryfreettt.homes/#/?code=SaSZbwak",
    reviewUrl: "/blog/暮光加速-review",
    architecture: "全 IEPL 内网专线",
    lossRate: "0.00% (极佳)",
    priceFlow: "¥18.80 / 150GB",
    protocols: ["Hysteria2", "VLESS", "Trojan"],
    streamingAi: "ChatGPT / Claude / 4K Netflix 解锁 100%",
    deviceSpeed: "无设备限制 | 晚高峰 940Mbps",
    change: "🔝 自打分 NO.1",
    budgetCategory: "mid",
    demandTags: ["ai", "4k", "game"],
    isSpecialLine: true,
  },
  {
    id: "invisibles",
    rank: 2,
    name: "隐形人 Cloud",
    badge: "🥈 高性价比 · BGP中转",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    officialUrl: "https://vbfdvfj1.quanqiugttt1.club/#/?code=NKII9ZkH",
    reviewUrl: "/blog/隐形人-review",
    architecture: "BGP 多路中转 + 专线",
    lossRate: "0.01% (良好)",
    priceFlow: "¥12.00 / 200GB",
    protocols: ["Shadowsocks", "V2ray"],
    streamingAi: "ChatGPT / 4K 8K 流媒体全解锁",
    deviceSpeed: "5 台设备 | 晚高峰 850Mbps",
    change: "⬆️ 排名升级 NO.2",
    budgetCategory: "low",
    demandTags: ["ai", "4k", "backup"],
    isSpecialLine: false,
  },
  {
    id: "weifeng",
    rank: 3,
    name: "微风网络",
    badge: "🥉 低延迟 · 电竞游戏",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    officialUrl: "https://wep01.breezenetaff.com/#/?code=JHqHSog8",
    reviewUrl: "/blog/微风网络-review",
    architecture: "IEPL 电竞游戏专线",
    lossRate: "0.00% (极低)",
    priceFlow: "¥25.00 / 180GB",
    protocols: ["TUIC", "Hysteria2"],
    streamingAi: "AI / 游戏低延迟加速 100%",
    deviceSpeed: "3 台设备 | 晚高峰 900Mbps",
    change: "⬆️ 排名 NO.3",
    budgetCategory: "mid",
    demandTags: ["game", "ai"],
    isSpecialLine: true,
  },
  {
    id: "feimao",
    rank: 4,
    name: "飞猫云",
    badge: "廉价大流量备用",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    officialUrl: "https://jkg3cghf.feimaogfttt1.xyz/#/?code=3NlSNiJl",
    reviewUrl: "/blog/飞猫云-review",
    architecture: "BGP 优质中转",
    lossRate: "0.05% (稳定)",
    priceFlow: "¥9.90 / 300GB",
    protocols: ["Shadowsocks"],
    streamingAi: "ChatGPT / YouTube 4K 解锁",
    deviceSpeed: "不限设备 | 晚高峰 650Mbps",
    change: "⭐ 热门备用 NO.4",
    budgetCategory: "low",
    demandTags: ["backup", "4k"],
    isSpecialLine: false,
  },
  {
    id: "firefly",
    rank: 5,
    name: "Firefly 萤火虫",
    badge: "老牌稳定性",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    officialUrl: "https://lsitel.worryfreettt.homes/#/?code=SaSZbwak",
    reviewUrl: "/blog/firefly-review",
    architecture: "BGP + IPLC 混合",
    lossRate: "0.02%",
    priceFlow: "¥22.00 / 200GB",
    protocols: ["VLESS", "Trojan"],
    streamingAi: "全流媒体解锁",
    deviceSpeed: "5台设备 | 780Mbps",
    change: "-",
    budgetCategory: "mid",
    demandTags: ["4k", "ai"],
    isSpecialLine: true,
  },
  {
    id: "ssone",
    rank: 6,
    name: "SSONE",
    badge: "SS老牌节点",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    officialUrl: "https://lsitel.worryfreettt.homes/#/?code=SaSZbwak",
    reviewUrl: "/blog/ssone-review",
    architecture: "Shadowsocks 专线",
    lossRate: "0.01%",
    priceFlow: "¥30.00 / 300GB",
    protocols: ["Shadowsocks"],
    streamingAi: "ChatGPT / Disney+ 解锁",
    deviceSpeed: "8台设备 | 820Mbps",
    change: "-",
    budgetCategory: "high",
    demandTags: ["ai", "4k"],
    isSpecialLine: true,
  }
];

export default function AirportRankTable() {
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [demandFilter, setDemandFilter] = useState<'all' | 'ai' | '4k' | 'game' | 'backup'>('all');
  const [lineFilter, setLineFilter] = useState<'all' | 'special' | 'bgp'>('all');

  const filteredAirports = useMemo(() => {
    return airportList.filter(item => {
      if (budgetFilter !== 'all' && item.budgetCategory !== budgetFilter) return false;
      if (demandFilter !== 'all' && !item.demandTags.includes(demandFilter)) return false;
      if (lineFilter === 'special' && !item.isSpecialLine) return false;
      if (lineFilter === 'bgp' && item.isSpecialLine) return false;
      return true;
    });
  }, [budgetFilter, demandFilter, lineFilter]);

  const resetFilters = () => {
    setBudgetFilter('all');
    setDemandFilter('all');
    setLineFilter('all');
  };

  return (
    <div className="w-full space-y-6">
      {/* 智能选购筛选器 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-saas-card">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm sm:text-base">
            <Filter className="h-4 w-4 text-brand-600" />
            <span>机场智能选购筛选器</span>
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-600 transition-colors"
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
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
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
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
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
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
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
      </div>

      {/* 8/9列 大盘表格 */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-saas-card">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-4 px-4 w-12 text-center">排名</th>
              <th className="py-4 px-4">机场名称 / 定位</th>
              <th className="py-4 px-4">官方链接</th>
              <th className="py-4 px-4">线路架构 / 丢包</th>
              <th className="py-4 px-4">价格流量</th>
              <th className="py-4 px-4">协议支持</th>
              <th className="py-4 px-4">流媒体 / AI 解锁</th>
              <th className="py-4 px-4">设备限制 / 测速</th>
              <th className="py-4 px-4 text-center">评测路线</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filteredAirports.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                {/* 排名 */}
                <td className="py-4 px-4 text-center font-black">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs ${
                    item.rank === 1 ? 'bg-amber-400 text-slate-900' :
                    item.rank === 2 ? 'bg-slate-300 text-slate-900' :
                    item.rank === 3 ? 'bg-orange-300 text-slate-900' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.rank}
                  </span>
                </td>

                {/* 名称 */}
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1">
                    <Link href={item.reviewUrl} className="font-black text-slate-900 hover:text-brand-600 text-base">
                      {item.name}
                    </Link>
                    {item.badge && (
                      <span className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                </td>

                {/* 官网直达 ↗ */}
                <td className="py-4 px-4">
                  <a
                    href={item.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:opacity-90 transition-all"
                  >
                    <span>官网 ↗</span>
                  </a>
                </td>

                {/* 线路架构 */}
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{item.architecture}</span>
                    <span className="text-[11px] font-mono text-emerald-600">丢包率: {item.lossRate}</span>
                  </div>
                </td>

                {/* 价格流量 */}
                <td className="py-4 px-4">
                  <span className="font-mono font-extrabold text-slate-900">{item.priceFlow}</span>
                </td>

                {/* 协议 */}
                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-1">
                    {item.protocols.map(p => (
                      <span key={p} className="rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                        {p}
                      </span>
                    ))}
                  </div>
                </td>

                {/* 流媒体/AI */}
                <td className="py-4 px-4">
                  <span className="text-xs font-semibold text-emerald-700">{item.streamingAi}</span>
                </td>

                {/* 设备速度 */}
                <td className="py-4 px-4">
                  <span className="text-xs text-slate-600 font-mono">{item.deviceSpeed}</span>
                </td>

                {/* 评测路线 ➔ */}
                <td className="py-4 px-4 text-center">
                  <Link
                    href={item.reviewUrl}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline"
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
