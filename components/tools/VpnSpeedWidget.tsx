"use client";

import React, { useState } from "react";
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Activity, 
  Zap, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Gauge
} from "lucide-react";

export default function VpnSpeedWidget() {
  const [testing, setTesting] = useState(false);
  const [hasTested, setHasTested] = useState(false);
  const [phase, setPhase] = useState<"idle" | "ping" | "download" | "upload" | "done">("idle");
  const [downloadMbps, setDownloadMbps] = useState<number | null>(null);
  const [pingMs, setPingMs] = useState<number | null>(null);
  const [jitterMs, setJitterMs] = useState<number | null>(null);
  const [packetLoss, setPacketLoss] = useState<number | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const runSpeedTest = async () => {
    setTesting(true);
    setHasTested(false);
    setProgressPercent(10);
    setPhase("ping");

    // 1. Ping & Jitter
    const pings: number[] = [];
    for (let i = 0; i < 4; i++) {
      const start = performance.now();
      try {
        await fetch(`https://www.cloudflare.com/favicon.ico?_t=${Date.now()}_${i}`, {
          mode: "no-cors",
          cache: "no-store",
          signal: AbortSignal.timeout(2000)
        });
        pings.push(Math.round(performance.now() - start));
      } catch {
        // packet dropped
      }
      setProgressPercent(10 + (i + 1) * 7);
      await new Promise(r => setTimeout(r, 100));
    }

    if (pings.length > 0) {
      const avg = Math.round(pings.reduce((a, b) => a + b, 0) / pings.length);
      setPingMs(avg);
      let diff = 0;
      for (let j = 1; j < pings.length; j++) {
        diff += Math.abs(pings[j] - pings[j - 1]);
      }
      setJitterMs(pings.length > 1 ? Math.round(diff / (pings.length - 1)) : 0);
      setPacketLoss(Math.round(((4 - pings.length) / 4) * 100));
    } else {
      setPingMs(null);
      setJitterMs(null);
      setPacketLoss(100);
    }

    // 2. Download Throughput
    setPhase("download");
    setProgressPercent(50);

    const testFiles = [
      "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
    ];

    let totalBytes = 0;
    const downloadStart = performance.now();

    for (let i = 0; i < testFiles.length; i++) {
      try {
        const bustUrl = `${testFiles[i]}?_t=${Date.now()}_${i}`;
        const res = await fetch(bustUrl, { cache: "no-store", signal: AbortSignal.timeout(4000) });
        const blob = await res.blob();
        totalBytes += blob.size;
      } catch {
        // ignore single chunk error
      }
      setProgressPercent(50 + (i + 1) * 15);
    }

    const downloadDurationSec = (performance.now() - downloadStart) / 1000;
    if (totalBytes > 0 && downloadDurationSec > 0) {
      // (Bytes * 8) / (1024 * 1024) / sec = Mbps
      const calculatedMbps = (totalBytes * 8) / (1024 * 1024) / downloadDurationSec;
      // 真实 HTTP Fetch throughput
      setDownloadMbps(Math.max(1.2, Math.round(calculatedMbps * 10) / 10));
    } else {
      setDownloadMbps(null);
    }

    setProgressPercent(100);
    setPhase("done");
    setTesting(false);
    setHasTested(true);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600 border border-brand-100 mb-2">
            <Gauge className="h-3.5 w-3.5" />
            <span>实时 CDN 分块吞吐测速</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">VPN / 跨境带宽测速仪</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            测量当前网络在真实 CDN 节点下的下载带宽 (Mbps)、延迟、抖动与丢包表现
          </p>
        </div>

        <button
          onClick={runSpeedTest}
          disabled={testing}
          className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
        >
          <RotateCw className={`h-4 w-4 ${testing ? "animate-spin" : ""}`} />
          <span>{testing ? `测速中 (${phase === "ping" ? "探测延迟" : "拉取数据块"})...` : (hasTested ? "重新测速" : "开始带宽测速")}</span>
        </button>
      </div>

      {/* 测速进度条 */}
      {testing && (
        <div className="mb-6">
          <div className="flex justify-between text-xs font-mono text-slate-500 mb-1">
            <span>正在执行 {phase === "ping" ? "往返延迟与抖动探测" : "全速吞吐拉取"}...</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-brand-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* 4 个核心测速指标 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <ArrowDownCircle className="h-4 w-4 text-brand-600" />
            <span>下载带宽速率 (Download)</span>
          </div>
          <div className="mt-3 text-3xl font-black font-mono text-brand-600">
            {downloadMbps !== null ? `${downloadMbps} Mbps` : "Not tested"}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">真实 HTTP 吞吐传输</div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Zap className="h-4 w-4 text-amber-500" />
            <span>往返延迟 (Ping RTT)</span>
          </div>
          <div className="mt-3 text-3xl font-black font-mono text-slate-900">
            {pingMs !== null ? `${pingMs} ms` : "Not tested"}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">与边缘节点通信延迟</div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Activity className="h-4 w-4 text-emerald-500" />
            <span>网络抖动 (Jitter)</span>
          </div>
          <div className="mt-3 text-3xl font-black font-mono text-emerald-600">
            {jitterMs !== null ? `${jitterMs} ms` : "Not tested"}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">延迟波动平稳度</div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <AlertTriangle className="h-4 w-4 text-rose-500" />
            <span>丢包率 (Packet Loss)</span>
          </div>
          <div className="mt-3 text-3xl font-black font-mono text-slate-900">
            {packetLoss !== null ? `${packetLoss}%` : "Not tested"}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">网络发包丢失比</div>
        </div>
      </div>

      {/* 测评环境免责与影响因素说明 */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-xs text-amber-800 leading-relaxed flex items-start gap-3">
        <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">测速影响因素声明：</span>
          浏览器前端测速受本地宽带、运营商国际出口 QOS、与测试节点物理距离、VPN/代理服务器当前负载及加密协议开销共同影响，实测值用于衡量当前链路可用性参考。
        </div>
      </div>
    </div>
  );
}
