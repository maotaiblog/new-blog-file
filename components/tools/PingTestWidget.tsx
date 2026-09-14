"use client";

import React, { useState } from "react";
import { 
  Activity, 
  RotateCw, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Globe, 
  Server,
  ArrowUpDown
} from "lucide-react";

interface PingEndpoint {
  id: string;
  name: string;
  location: string;
  url: string;
  pings: number[];
  min: number | null;
  max: number | null;
  avg: number | null;
  jitter: number | null;
  loss: number | null;
  status: "idle" | "testing" | "success" | "error";
}

const INITIAL_ENDPOINTS: PingEndpoint[] = [
  {
    id: "cf-global",
    name: "Cloudflare 边缘 CDN",
    location: "Anycast 全球节点",
    url: "https://www.cloudflare.com/favicon.ico",
    pings: [],
    min: null,
    max: null,
    avg: null,
    jitter: null,
    loss: null,
    status: "idle"
  },
  {
    id: "ali-shanghai",
    name: "阿里云 CDN 网关",
    location: "中国 · 华东节点",
    url: "https://img.alicdn.com/favicon.ico",
    pings: [],
    min: null,
    max: null,
    avg: null,
    jitter: null,
    loss: null,
    status: "idle"
  },
  {
    id: "baidu-beijing",
    name: "百度公共 CDN",
    location: "中国 · 华北节点",
    url: "https://www.baidu.com/favicon.ico",
    pings: [],
    min: null,
    max: null,
    avg: null,
    jitter: null,
    loss: null,
    status: "idle"
  },
  {
    id: "vercel-edge",
    name: "Vercel Edge 边缘节点",
    location: "亚太 / 北美 Anycast",
    url: "https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico",
    pings: [],
    min: null,
    max: null,
    avg: null,
    jitter: null,
    loss: null,
    status: "idle"
  }
];

export default function PingTestWidget() {
  const [endpoints, setEndpoints] = useState<PingEndpoint[]>(INITIAL_ENDPOINTS);
  const [testing, setTesting] = useState(false);
  const [hasTested, setHasTested] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const TOTAL_ROUNDS = 5;

  const runSinglePing = async (url: string): Promise<number | null> => {
    const bustUrl = `${url}?_t=${Date.now()}_${Math.random()}`;
    const start = performance.now();
    try {
      await fetch(bustUrl, {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
        signal: AbortSignal.timeout(2500)
      });
      const end = performance.now();
      return Math.round(end - start);
    } catch {
      return null; // 超时或丢包
    }
  };

  const startTest = async () => {
    setTesting(true);
    setHasTested(false);
    setCurrentRound(0);

    // 重置数据
    const activeEndpoints: PingEndpoint[] = endpoints.map(e => ({
      ...e,
      pings: [],
      min: null,
      max: null,
      avg: null,
      jitter: null,
      loss: null,
      status: "testing"
    }));
    setEndpoints([...activeEndpoints]);

    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      setCurrentRound(round);

      for (let i = 0; i < activeEndpoints.length; i++) {
        const ep = activeEndpoints[i];
        const rtt = await runSinglePing(ep.url);
        if (rtt !== null) {
          ep.pings.push(rtt);
        }

        const validPings = ep.pings;
        if (validPings.length > 0) {
          ep.min = Math.min(...validPings);
          ep.max = Math.max(...validPings);
          ep.avg = Math.round(validPings.reduce((a, b) => a + b, 0) / validPings.length);
          
          // Jitter: 相邻两次延迟差值的绝对值平均
          if (validPings.length > 1) {
            let diffSum = 0;
            for (let j = 1; j < validPings.length; j++) {
              diffSum += Math.abs(validPings[j] - validPings[j - 1]);
            }
            ep.jitter = Math.round(diffSum / (validPings.length - 1));
          } else {
            ep.jitter = 0;
          }
        }

        const lostCount = round - validPings.length;
        ep.loss = Math.round((lostCount / round) * 100);
      }

      setEndpoints([...activeEndpoints]);
      // 短暂间隔模拟 ICMP 间隔
      await new Promise(r => setTimeout(r, 150));
    }

    activeEndpoints.forEach(ep => {
      ep.status = ep.pings.length > 0 ? "success" : "error";
    });

    setEndpoints([...activeEndpoints]);
    setTesting(false);
    setHasTested(true);
  };

  // 全网平均统计
  const validEndpoints = endpoints.filter(e => e.avg !== null);
  const globalAvg = validEndpoints.length > 0 
    ? Math.round(validEndpoints.reduce((a, b) => a + (b.avg || 0), 0) / validEndpoints.length)
    : null;
  const globalJitter = validEndpoints.length > 0
    ? Math.round(validEndpoints.reduce((a, b) => a + (b.jitter || 0), 0) / validEndpoints.length)
    : null;
  const globalLoss = validEndpoints.length > 0
    ? Math.round(validEndpoints.reduce((a, b) => a + (b.loss || 0), 0) / validEndpoints.length)
    : null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600 border border-brand-100 mb-2">
            <Activity className="h-3.5 w-3.5" />
            <span>连续 5 轮网络发包探测</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">网络往返延迟 (Ping) 与抖动测试</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            计算往返 RTT (Min/Max/Avg)、网络抖动 (Jitter) 与丢包率，真实反映链路质量
          </p>
        </div>

        <button
          onClick={startTest}
          disabled={testing}
          className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
        >
          <RotateCw className={`h-4 w-4 ${testing ? "animate-spin" : ""}`} />
          <span>{testing ? `正在发包测试 (第 ${currentRound}/${TOTAL_ROUNDS} 轮)...` : (hasTested ? "重新测速" : "开始 Ping 与抖动测试")}</span>
        </button>
      </div>

      {/* 综合指标卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <span className="text-xs font-bold text-slate-400">平均往返延迟 (Average RTT)</span>
          <div className="mt-2 text-2xl font-black font-mono text-slate-900 flex items-center gap-1.5">
            <Zap className="h-5 w-5 text-brand-600" />
            <span>{globalAvg !== null ? `${globalAvg} ms` : "Not tested"}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <span className="text-xs font-bold text-slate-400">平均网络抖动 (Jitter)</span>
          <div className="mt-2 text-2xl font-black font-mono text-emerald-600 flex items-center gap-1.5">
            <ArrowUpDown className="h-5 w-5" />
            <span>{globalJitter !== null ? `${globalJitter} ms` : "Not tested"}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <span className="text-xs font-bold text-slate-400">总体丢包率 (Packet Loss)</span>
          <div className={`mt-2 text-2xl font-black font-mono flex items-center gap-1.5 ${
            globalLoss === null ? "text-slate-400" : (globalLoss === 0 ? "text-emerald-600" : "text-rose-600")
          }`}>
            <Activity className="h-5 w-5" />
            <span>{globalLoss !== null ? `${globalLoss}%` : "Not tested"}</span>
          </div>
        </div>
      </div>

      {/* 节点详细测速列表 */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-100 px-4 py-3 text-xs font-bold text-slate-700 flex items-center justify-between">
          <span>探针节点链路表现</span>
          <span className="text-[11px] font-normal text-slate-500">
            {testing ? "测试进行中" : (hasTested ? "测试完成" : "等待发起")}
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {endpoints.map((ep) => (
            <div key={ep.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
                  <Server className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{ep.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{ep.location}</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-6 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">最低 (Min)</div>
                  <div className="font-mono font-bold text-slate-700 mt-0.5">
                    {ep.min !== null ? `${ep.min} ms` : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">最高 (Max)</div>
                  <div className="font-mono font-bold text-slate-700 mt-0.5">
                    {ep.max !== null ? `${ep.max} ms` : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">平均 (Avg)</div>
                  <div className="font-mono font-black text-brand-600 mt-0.5">
                    {ep.avg !== null ? `${ep.avg} ms` : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">抖动 (Jitter)</div>
                  <div className="font-mono font-bold text-emerald-600 mt-0.5">
                    {ep.jitter !== null ? `${ep.jitter} ms` : "—"}
                  </div>
                </div>
              </div>

              <div>
                <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] inline-flex items-center gap-1 ${
                  ep.status === "idle" ? "bg-slate-100 text-slate-500" :
                  ep.status === "testing" ? "bg-blue-50 text-brand-600" :
                  (ep.loss === 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600")
                }`}>
                  {ep.status === "idle" && "Not tested"}
                  {ep.status === "testing" && "发包中..."}
                  {ep.status === "success" && (ep.loss === 0 ? "0% 丢包 (实测) (极优)" : `${ep.loss}% 丢包`)}
                  {ep.status === "error" && "连接超时"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
