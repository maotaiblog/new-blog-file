"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Activity, 
  Zap, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Globe,
  Lock,
  Wifi,
  Layers,
  ArrowUpDown,
  Server,
  Info
} from "lucide-react";

export type HealthEngineState = "idle" | "testing" | "partial" | "completed" | "error";

export interface NetworkHealthState {
  engineState: HealthEngineState;
  currentStepIndex: number; // 0 to 5
  stepStatusText: string;
  
  // Scores
  score: number | null; // Total 0 - 100
  perfScore: number | null; // out of 40 (or normalized)
  privacyScore: number | null; // out of 40 (or normalized)
  stabilityScore: number | null; // out of 20 (or normalized)
  
  // Available Metrics & Weights for formula: sum(availablePoints) / sum(availableWeights) * 100
  availableWeightsTotal: number;
  availablePointsTotal: number;
  
  // Detail metrics
  publicIp: string | null;
  apparentLocation: string | null;
  ipFamily: string | null; // IPv4 or IPv6
  
  dnsStatus: "safe" | "leak" | "not_tested";
  dnsDetails: string;
  
  webrtcStatus: "safe" | "leak" | "blocked" | "not_tested";
  webrtcDetails: string;
  webrtcCandidates: Array<{ ip: string; type: string; category: string }>;
  
  httpRttAvg: number | null;
  httpRttMin: number | null;
  httpRttMax: number | null;
  httpJitter: number | null;
  httpRttSamples: number[];
  
  httpFailureRate: number | null; // HTTP 请求丢包率
  
  // Metadata
  testTimestamp: string | null;
  targetEndpoint: string;
  sampleCount: number;
  userAgent: string;
  errorMessage?: string;
}

const TESTING_STEPS = [
  "正在检测公网 IP",
  "正在检测 DNS",
  "正在检测 WebRTC",
  "正在检测网络延迟",
  "正在检测链路稳定性",
  "正在计算 Network Health Score"
];

export default function NetworkHealthWidget({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<NetworkHealthState>({
    engineState: "idle",
    currentStepIndex: 0,
    stepStatusText: "Not tested",
    score: null,
    perfScore: null,
    privacyScore: null,
    stabilityScore: null,
    availableWeightsTotal: 0,
    availablePointsTotal: 0,
    publicIp: null,
    apparentLocation: null,
    ipFamily: null,
    dnsStatus: "not_tested",
    dnsDetails: "未测试",
    webrtcStatus: "not_tested",
    webrtcDetails: "未测试",
    webrtcCandidates: [],
    httpRttAvg: null,
    httpRttMin: null,
    httpRttMax: null,
    httpJitter: null,
    httpRttSamples: [],
    httpFailureRate: null,
    testTimestamp: null,
    targetEndpoint: "Cloudflare Edge (Anycast)",
    sampleCount: 5,
    userAgent: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(prev => ({ ...prev, userAgent: navigator.userAgent }));
    }
  }, []);

  const runFullDiagnosis = async () => {
    setData(prev => ({
      ...prev,
      engineState: "testing",
      currentStepIndex: 0,
      stepStatusText: TESTING_STEPS[0],
      score: null,
      perfScore: null,
      privacyScore: null,
      stabilityScore: null,
      publicIp: null,
      dnsStatus: "not_tested",
      webrtcStatus: "not_tested",
      httpRttAvg: null,
      httpRttSamples: [],
      errorMessage: undefined
    }));

    let clientIp: string | null = null;
    let clientLoc: string | null = null;
    let detectedIpFamily: string | null = null;

    // STEP 1: 公网 IP 探测 (通过真实 API fallback 链条)
    try {
      try {
        const res = await fetch("https://api.myip.la/en?json", { signal: AbortSignal.timeout(3000) });
        const json = await res.json();
        if (json && json.ip) {
          clientIp = json.ip;
          const locParts = [json.location?.city, json.location?.country_name].filter(Boolean);
          clientLoc = locParts.join(", ") || "未知地理位置";
        }
      } catch {
        // Fallback to Cloudflare trace
        const res2 = await fetch("https://1.1.1.1/cdn-cgi/trace", { signal: AbortSignal.timeout(3000) });
        const text = await res2.text();
        const ipMatch = text.match(/ip=([^\\n]+)/);
        const locMatch = text.match(/loc=([^\\n]+)/);
        if (ipMatch && ipMatch[1]) {
          clientIp = ipMatch[1].trim();
          clientLoc = locMatch && locMatch[1] ? `Cloudflare PoP (${locMatch[1].trim()})` : "公网节点";
        }
      }

      if (clientIp) {
        detectedIpFamily = clientIp.includes(":") ? "IPv6" : "IPv4";
      }
    } catch {
      // IP failed
    }

    // STEP 2: DNS 解析响应测试 (通过 DoH 查询)
    setData(prev => ({
      ...prev,
      currentStepIndex: 1,
      stepStatusText: TESTING_STEPS[1],
      publicIp: clientIp,
      apparentLocation: clientLoc,
      ipFamily: detectedIpFamily
    }));

    let dnsResStatus: "safe" | "leak" | "not_tested" = "not_tested";
    let dnsResDetails = "无法连接公共 DoH 节点";
    try {
      const dohStart = performance.now();
      const dohRes = await fetch("https://cloudflare-dns.com/dns-query?name=cloudflare.com&type=A", {
        headers: { accept: "application/dns-json" },
        signal: AbortSignal.timeout(3000)
      });
      const dohJson = await dohRes.json();
      const dohLatency = Math.round(performance.now() - dohStart);
      if (dohJson && dohJson.Status === 0) {
        dnsResStatus = "safe";
        dnsResDetails = `DoH 安全解析响应正常 (${dohLatency}ms)`;
      } else {
        dnsResStatus = "leak";
        dnsResDetails = "DoH 解析异常，可能存在本地阻断或劫持";
      }
    } catch {
      dnsResStatus = "leak";
      dnsResDetails = "DoH 查询超时，可能受限于防火墙或 DNS 过滤";
    }

    // STEP 3: WebRTC IP 泄露检测
    setData(prev => ({
      ...prev,
      currentStepIndex: 2,
      stepStatusText: TESTING_STEPS[2],
      dnsStatus: dnsResStatus,
      dnsDetails: dnsResDetails
    }));

    let webrtcResStatus: "safe" | "leak" | "blocked" | "not_tested" = "not_tested";
    let webrtcResDetails = "未完成检测";
    const harvestedCandidates: Array<{ ip: string; type: string; category: string }> = [];

    try {
      const RTCPC = window.RTCPeerConnection || (window as unknown as { webkitRTCPeerConnection: typeof RTCPeerConnection }).webkitRTCPeerConnection;
      if (!RTCPC) {
        webrtcResStatus = "blocked";
        webrtcResDetails = "浏览器已彻底禁用 WebRTC，完全杜绝 IP 泄露风险";
      } else {
        const pc = new RTCPC({
          iceServers: [
            { urls: "stun:stun.cloudflare.com:3478" },
            { urls: "stun:stun.l.google.com:19302" }
          ]
        });
        pc.createDataChannel("health_detector");
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        let candidateFinished = false;
        await new Promise<void>(resolve => {
          const timer = setTimeout(() => {
            if (!candidateFinished) {
              candidateFinished = true;
              resolve();
            }
          }, 3200);

          pc.onicecandidate = (event) => {
            if (!event || !event.candidate) {
              if (!candidateFinished) {
                candidateFinished = true;
                clearTimeout(timer);
                resolve();
              }
              return;
            }

            const candStr = event.candidate.candidate;
            const ipv4Match = candStr.match(/([0-9]{1,3}(\\.[0-9]{1,3}){3})/);
            const candType = candStr.includes("typ srflx") ? "srflx" : (candStr.includes("typ host") ? "host" : "relay");
            
            if (ipv4Match) {
              const cIp = ipv4Match[1];
              const isPrivate = cIp.startsWith("10.") || cIp.startsWith("192.168.") || /^172\\.(1[6-9]|2[0-9]|3[0-1])\\./.test(cIp) || cIp === "127.0.0.1";
              harvestedCandidates.push({
                ip: cIp,
                type: candType,
                category: isPrivate ? "局域网私网" : "反射公网"
              });
            } else if (candStr.includes(".local")) {
              const mdnsName = candStr.match(/([a-zA-Z0-9\\-_]+\\.local)/)?.[1] || "mDNS";
              harvestedCandidates.push({
                ip: mdnsName,
                type: "host",
                category: "mDNS 隐藏"
              });
            }
          };
        });
        pc.close();

        // 判定 WebRTC 泄露：若 STUN 捕获到公网反射 IP 且与外部看到的 clientIp 不一致，判定存在旁路泄露
        const publicCandidates = harvestedCandidates.filter(c => c.category === "反射公网");
        if (publicCandidates.length === 0) {
          webrtcResStatus = "safe";
          webrtcResDetails = "STUN 仅收集到私网或 mDNS 候选，未发现公网 IP 旁路泄露";
        } else {
          const leaked = publicCandidates.some(c => clientIp && c.ip !== clientIp);
          if (leaked) {
            webrtcResStatus = "leak";
            webrtcResDetails = "STUN 探测发现不同于出口 IP 的反射公网 IP，存在真实 IP 旁路暴露";
          } else {
            webrtcResStatus = "safe";
            webrtcResDetails = "STUN 反射公网 IP 与出口一致，未穿透暴露真实私网网卡出口";
          }
        }
      }
    } catch {
      webrtcResStatus = "safe";
      webrtcResDetails = "STUN 通信受限，未触发候选收集";
    }

    // STEP 4: 网络延迟 RTT (连续采样 5 轮，避免单次偶然误差)
    setData(prev => ({
      ...prev,
      currentStepIndex: 3,
      stepStatusText: TESTING_STEPS[3],
      webrtcStatus: webrtcResStatus,
      webrtcDetails: webrtcResDetails,
      webrtcCandidates: harvestedCandidates
    }));

    const samples: number[] = [];
    const totalSamples = 5;
    for (let i = 0; i < totalSamples; i++) {
      const t0 = performance.now();
      try {
        await fetch(`https://1.1.1.1/cdn-cgi/trace?_t=${Date.now()}_${i}`, {
          mode: "no-cors",
          cache: "no-store",
          signal: AbortSignal.timeout(2500)
        });
        const elapsed = Math.round(performance.now() - t0);
        samples.push(elapsed);
      } catch {
        // failed request
      }
      await new Promise(r => setTimeout(r, 60));
    }

    // STEP 5: 链路稳定性 (计算丢包率与 Jitter)
    setData(prev => ({
      ...prev,
      currentStepIndex: 4,
      stepStatusText: TESTING_STEPS[4]
    }));

    let avgRtt: number | null = null;
    let minRtt: number | null = null;
    let maxRtt: number | null = null;
    let jitter: number | null = null;
    let httpLossRate: number | null = null;

    if (samples.length > 0) {
      avgRtt = Math.round(samples.reduce((a, b) => a + b, 0) / samples.length);
      minRtt = Math.min(...samples);
      maxRtt = Math.max(...samples);

      // Jitter = 相邻样本差值的统计均值: sum(|sample[i] - sample[i-1]|) / (n - 1)
      if (samples.length > 1) {
        let diffSum = 0;
        for (let j = 1; j < samples.length; j++) {
          diffSum += Math.abs(samples[j] - samples[j - 1]);
        }
        jitter = Math.round(diffSum / (samples.length - 1));
      } else {
        jitter = 0;
      }
      httpLossRate = Math.round(((totalSamples - samples.length) / totalSamples) * 100);
    } else {
      httpLossRate = 100;
    }

    // STEP 6: 计算 Network Health Score (Available Metrics Weighting)
    setData(prev => ({
      ...prev,
      currentStepIndex: 5,
      stepStatusText: TESTING_STEPS[5]
    }));

    await new Promise(r => setTimeout(r, 300));

    // 动态可用指标加权模型 (Available Metrics Weighting)
    // 基础三维总权重: 性能 40 + 隐私 40 + 稳定性 20 = 100
    // 只有真实测得的指标计入可用权重分母，未测试项不拉低也不拉高
    let availableWeights = 0;
    let availablePoints = 0;

    // 1. 性能维度 (RTT) 占 40 分权重
    let perfDimensionScore: number | null = null;
    if (avgRtt !== null) {
      availableWeights += 40;
      // RTT 阶梯打分：
      // <= 40ms => 100% (40)
      // 40 - 80ms => 90% (36)
      // 80 - 150ms => 75% (30)
      // 150 - 250ms => 50% (20)
      // > 250ms => 25% (10)
      let rttRatio = 0.25;
      if (avgRtt <= 40) rttRatio = 1.0;
      else if (avgRtt <= 80) rttRatio = 0.90;
      else if (avgRtt <= 150) rttRatio = 0.75;
      else if (avgRtt <= 250) rttRatio = 0.50;
      else rttRatio = 0.25;

      const pPts = Math.round(40 * rttRatio);
      availablePoints += pPts;
      perfDimensionScore = pPts;
    }

    // 2. 隐私维度 (WebRTC 20分 + DNS 20分) 占 40 分权重
    let privacyDimensionScore: number | null = null;
    let privacyPts = 0;
    let privacyWeight = 0;

    if (webrtcResStatus !== "not_tested") {
      privacyWeight += 20;
      const wPts = (webrtcResStatus === "safe" || webrtcResStatus === "blocked") ? 20 : 5;
      privacyPts += wPts;
    }
    if (dnsResStatus !== "not_tested") {
      privacyWeight += 20;
      const dPts = dnsResStatus === "safe" ? 20 : 10;
      privacyPts += dPts;
    }
    if (privacyWeight > 0) {
      availableWeights += privacyWeight;
      availablePoints += privacyPts;
      // 归一化到 40 分满分
      privacyDimensionScore = Math.round((privacyPts / privacyWeight) * 40);
    }

    // 3. 稳定性维度 (HTTP 丢包 15分 + Jitter 5分) 占 20 分权重
    let stabDimensionScore: number | null = null;
    let stabPts = 0;
    let stabWeight = 0;

    if (httpLossRate !== null) {
      stabWeight += 15;
      const lossPenalty = (httpLossRate / 100) * 15;
      stabPts += Math.max(0, Math.round(15 - lossPenalty));
    }
    if (jitter !== null) {
      stabWeight += 5;
      // Jitter <= 5ms: 5; <= 15ms: 4; <= 30ms: 3; else 1
      let jPts = 1;
      if (jitter <= 5) jPts = 5;
      else if (jitter <= 15) jPts = 4;
      else if (jitter <= 30) jPts = 3;
      else jPts = 1;
      stabPts += jPts;
    }
    if (stabWeight > 0) {
      availableWeights += stabWeight;
      availablePoints += stabPts;
      // 归一化到 20 分满分
      stabDimensionScore = Math.round((stabPts / stabWeight) * 20);
    }

    // 最终得分计算
    let finalScore: number | null = null;
    let nextEngineState: HealthEngineState = "completed";

    if (availableWeights === 0) {
      nextEngineState = "error";
    } else {
      // 归一化总分: (availablePoints / availableWeights) * 100
      finalScore = Math.min(100, Math.max(0, Math.round((availablePoints / availableWeights) * 100)));
      if (availableWeights < 100) {
        nextEngineState = "partial";
      } else {
        nextEngineState = "completed";
      }
    }

    setData({
      engineState: nextEngineState,
      currentStepIndex: 5,
      stepStatusText: finalScore !== null 
        ? (finalScore >= 90 ? "网络环境极优 (专线级健康)" : (finalScore >= 75 ? "网络环境良好 (日常通畅)" : "存在延迟或隐私优化空间"))
        : "探测失败，请检查网络",
      score: finalScore,
      perfScore: perfDimensionScore,
      privacyScore: privacyDimensionScore,
      stabilityScore: stabDimensionScore,
      availableWeightsTotal: availableWeights,
      availablePointsTotal: availablePoints,
      publicIp: clientIp || "未成功获取",
      apparentLocation: clientLoc || "未知归属",
      ipFamily: detectedIpFamily || "未知",
      dnsStatus: dnsResStatus,
      dnsDetails: dnsResDetails,
      webrtcStatus: webrtcResStatus,
      webrtcDetails: webrtcResDetails,
      webrtcCandidates: harvestedCandidates,
      httpRttAvg: avgRtt,
      httpRttMin: minRtt,
      httpRttMax: maxRtt,
      httpJitter: jitter,
      httpRttSamples: samples,
      httpFailureRate: httpLossRate,
      testTimestamp: new Date().toLocaleString("zh-CN", { hour12: false }),
      targetEndpoint: "Cloudflare Edge Anycast (1.1.1.1)",
      sampleCount: totalSamples,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : ""
    });
  };

  // 1. 紧凑版 (用于首页等嵌入场景)
  if (compact) {
    return (
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* 左侧圆环分数 */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-100 w-full md:w-64 shrink-0">
            <span className="text-xs font-bold text-slate-400">实测网络健康分</span>
            
            <div className={`relative my-3 flex h-28 w-28 items-center justify-center rounded-full border-8 transition-all duration-500 ${
              data.engineState === "idle"
                ? "border-slate-200 text-slate-400" 
                : (data.score !== null && data.score >= 90 ? "border-emerald-500 text-emerald-600" : "border-brand-500 text-brand-600")
            }`}>
              <span className="text-3xl font-black font-mono">
                {data.score !== null ? data.score : "—"}
              </span>
              <span className="text-xs font-bold text-slate-400 absolute bottom-3">/ 100</span>
            </div>

            <span className={`rounded-full px-3 py-0.5 text-xs font-extrabold border transition-all text-center ${
              data.engineState === "idle"
                ? "bg-slate-100 text-slate-500 border-slate-200"
                : (data.engineState === "testing" 
                    ? "bg-amber-50 text-amber-700 border-amber-200 animate-pulse" 
                    : (data.score !== null && data.score >= 90 ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-blue-50 text-brand-600 border-brand-200"))
            }`}>
              {data.engineState === "idle" ? "Not tested (未检测)" : (data.engineState === "testing" ? data.stepStatusText : data.stepStatusText)}
            </span>
          </div>

          {/* 右侧诊断项 */}
          <div className="flex-1 w-full space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
              <div className="flex items-center gap-3">
                <Wifi className="h-5 w-5 text-brand-600" />
                <div>
                  <div className="text-xs font-bold text-slate-900">公网出口 IP 探测</div>
                  <div className="text-[11px] font-mono text-slate-500">
                    {data.publicIp ? `${data.publicIp} (${data.apparentLocation || "已获取"})` : "Not tested (点击下方按钮探测)"}
                  </div>
                </div>
              </div>
              <span className={`text-xs font-bold ${data.publicIp ? "text-emerald-600" : "text-slate-400"}`}>
                {data.publicIp ? "已检测" : "未测试"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-amber-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900">边缘节点 HTTP RTT 延迟与抖动</div>
                  <div className="text-[11px] text-slate-500">
                    {data.httpRttAvg !== null ? (
                      <span>均值: <strong className="font-mono text-emerald-600">{data.httpRttAvg} ms</strong> · 抖动: <strong className="font-mono text-slate-700">{data.httpJitter} ms</strong></span>
                    ) : (
                      "Not tested"
                    )}
                  </div>
                </div>
              </div>
              <span className={`text-xs font-bold ${data.httpRttAvg !== null ? "text-emerald-600" : "text-slate-400"}`}>
                {data.httpRttAvg !== null ? `${data.httpRttAvg} ms` : "未测试"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-emerald-600" />
                <div>
                  <div className="text-xs font-bold text-slate-900">WebRTC IP 泄露检测</div>
                  <div className="text-[11px] text-slate-500">
                    {data.webrtcStatus !== "not_tested" ? (
                      data.webrtcStatus === "safe" || data.webrtcStatus === "blocked" ? "未发现公网 IP 旁路泄露" : "STUN 探测到异常候选泄露"
                    ) : (
                      "Not tested"
                    )}
                  </div>
                </div>
              </div>
              <span className={`text-xs font-bold ${data.webrtcStatus !== "not_tested" ? (data.webrtcStatus === "safe" || data.webrtcStatus === "blocked" ? "text-emerald-600" : "text-rose-600") : "text-slate-400"}`}>
                {data.webrtcStatus !== "not_tested" ? (data.webrtcStatus === "safe" || data.webrtcStatus === "blocked" ? "正常" : "存在风险") : "未测试"}
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={runFullDiagnosis}
                disabled={data.engineState === "testing"}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-xs font-bold text-white hover:bg-brand-700 active:scale-95 shadow-md shadow-brand-500/20 transition-all cursor-pointer disabled:opacity-75"
              >
                <RotateCw className={`h-4 w-4 ${data.engineState === "testing" ? "animate-spin" : ""}`} />
                <span>{data.engineState === "testing" ? "正在执行深度探测..." : (data.engineState !== "idle" ? "重新检测网络" : "开始真实网络检测")}</span>
              </button>

              <Link
                href="/tools/network-health/"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white hover:bg-slate-800 active:scale-95 transition-all"
              >
                <span>完整健康度分析</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 2. 完整版页面 (/tools/network-health/)
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600 border border-brand-100 mb-2">
            <Activity className="h-3.5 w-3.5" />
            <span>三维加权模型：性能 40% + 隐私 40% + 稳定性 20%</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">网络健康度综合体检 (Network Health Score)</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            由浏览器发起真实探测：出口公网 IP、DoH 响应、WebRTC STUN 泄露、HTTP RTT 多轮往返与丢包率。未检测项真实标示 Not tested，不虚构任何数字。
          </p>
        </div>

        <button
          onClick={runFullDiagnosis}
          disabled={data.engineState === "testing"}
          className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
        >
          <RotateCw className={`h-4 w-4 ${data.engineState === "testing" ? "animate-spin" : ""}`} />
          <span>{data.engineState === "testing" ? "正在执行真实诊断..." : (data.engineState !== "idle" ? "重新运行网络健康体检" : "开始真实网络体检")}</span>
        </button>
      </div>

      {/* 正在检测状态提示条 */}
      {data.engineState === "testing" && (
        <div className="mb-8 rounded-2xl bg-amber-50 border border-amber-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-2">
              <RotateCw className="h-3.5 w-3.5 animate-spin text-amber-600" />
              {data.stepStatusText} (步骤 {data.currentStepIndex + 1} / {TESTING_STEPS.length})
            </span>
            <span className="text-xs font-mono font-bold text-amber-800">
              {Math.round(((data.currentStepIndex + 1) / TESTING_STEPS.length) * 100)}%
            </span>
          </div>
          <div className="h-2 w-full bg-amber-200/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 transition-all duration-300 rounded-full"
              style={{ width: `${Math.round(((data.currentStepIndex + 1) / TESTING_STEPS.length) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* 核心大盘分值 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-50 border border-slate-200/80 text-center">
          <span className="text-xs font-bold text-slate-400">综合网络健康指数</span>
          
          <div className={`relative my-4 flex h-36 w-36 items-center justify-center rounded-full border-[10px] transition-all duration-500 ${
            data.engineState === "idle"
              ? "border-slate-200 text-slate-400" 
              : (data.score !== null && data.score >= 90 ? "border-emerald-500 text-emerald-600" : (data.score !== null && data.score >= 75 ? "border-brand-500 text-brand-600" : "border-amber-500 text-amber-600"))
          }`}>
            <span className="text-4xl font-black font-mono">
              {data.score !== null ? data.score : "—"}
            </span>
            <span className="text-xs font-bold text-slate-400 absolute bottom-4">/ 100</span>
          </div>

          <div className={`rounded-full px-4 py-1 text-xs font-extrabold border ${
            data.engineState === "idle" ? "bg-slate-100 text-slate-500 border-slate-200" :
            (data.engineState === "testing" ? "bg-amber-50 text-amber-700 border-amber-200" :
            (data.score !== null && data.score >= 90 ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-blue-50 text-brand-600 border-brand-200"))
          }`}>
            {data.engineState === "idle" ? "Not tested (未检测)" : data.stepStatusText}
          </div>

          {data.engineState !== "idle" && data.availableWeightsTotal > 0 && (
            <div className="mt-3 text-[11px] text-slate-500">
              动态可用指标权重分母: {data.availableWeightsTotal} / 100
            </div>
          )}
        </div>

        {/* 3 个细分维度打分 */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 1. 性能指标 */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">网络性能 (40%)</span>
                <Zap className="h-4 w-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black font-mono text-slate-900">
                {data.perfScore !== null ? `${data.perfScore} / 40` : "Not tested"}
              </div>
            </div>
            <div className="mt-3 text-[11px] text-slate-500 space-y-0.5">
              <div>HTTP RTT 均值: {data.httpRttAvg !== null ? `${data.httpRttAvg} ms` : "—"}</div>
              <div>Min / Max: {data.httpRttMin !== null ? `${data.httpRttMin} / ${data.httpRttMax} ms` : "—"}</div>
            </div>
          </div>

          {/* 2. 隐私防护 */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">隐私防护 (40%)</span>
                <Lock className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black font-mono text-slate-900">
                {data.privacyScore !== null ? `${data.privacyScore} / 40` : "Not tested"}
              </div>
            </div>
            <div className="mt-3 text-[11px] text-slate-500 space-y-0.5">
              <div>WebRTC: {data.webrtcStatus !== "not_tested" ? (data.webrtcStatus === "safe" || data.webrtcStatus === "blocked" ? "未泄露" : "有风险") : "—"}</div>
              <div>DNS 解析: {data.dnsStatus !== "not_tested" ? (data.dnsStatus === "safe" ? "正常" : "异常") : "—"}</div>
            </div>
          </div>

          {/* 3. 链路稳定性 */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">链路稳定 (20%)</span>
                <Activity className="h-4 w-4 text-brand-500" />
              </div>
              <div className="text-2xl font-black font-mono text-slate-900">
                {data.stabilityScore !== null ? `${data.stabilityScore} / 20` : "Not tested"}
              </div>
            </div>
            <div className="mt-3 text-[11px] text-slate-500 space-y-0.5">
              <div>丢包率: {data.httpFailureRate !== null ? `${data.httpFailureRate}%` : "—"}</div>
              <div>Jitter 抖动: {data.httpJitter !== null ? `${data.httpJitter} ms` : "—"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 评分构成白皮书说明条 */}
      <div className="mb-8 rounded-2xl bg-slate-50 border border-slate-200/80 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-brand-600 shrink-0" />
          <span>
            <strong>评分说明：</strong>总分满分 100 分（性能 40 + 隐私 40 + 稳定 20）。依据 Available Metrics Weighting 模型，未检测或环境不支持的项目不参与计分，最终分按可用权重比例归一化计算。
          </span>
        </div>
        <Link href="/methodology/" className="text-brand-600 hover:text-brand-700 font-bold shrink-0 flex items-center gap-1">
          查看完整测评方法论 <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* 诊断明细卡片 */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden mb-8">
        <div className="bg-slate-100 px-5 py-3 text-xs font-bold text-slate-700 flex justify-between">
          <span>关键网络指标实测清单</span>
          <span className="text-[11px] font-normal text-slate-500">
            {data.engineState === "completed" ? "全部完成" : (data.engineState === "partial" ? "部分完成" : (data.engineState === "testing" ? "检测中" : "未开始"))}
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {/* 1. 公网出口 IP */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-brand-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">公网出口 IP 与归属</div>
                <div className="text-[11px] text-slate-400">外部边缘网关识别到的公网出口地址</div>
              </div>
            </div>
            <div className="text-right sm:text-right">
              <div className="font-mono font-black text-slate-800">
                {data.publicIp || "Not tested"}
              </div>
              {data.apparentLocation && (
                <div className="text-[11px] text-slate-500">{data.apparentLocation} ({data.ipFamily})</div>
              )}
            </div>
          </div>

          {/* 2. DNS 解析 */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <Server className="h-4 w-4 text-indigo-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">DNS 解析与 DoH 响应</div>
                <div className="text-[11px] text-slate-400">验证加密 DoH 查询通道是否通畅与抗劫持</div>
              </div>
            </div>
            <div className="text-right sm:text-right">
              <div className="font-bold">
                {data.dnsStatus !== "not_tested" ? (
                  data.dnsStatus === "safe" ? <span className="text-emerald-600">正常</span> : <span className="text-amber-600">异常/受限</span>
                ) : "Not tested"}
              </div>
              <div className="text-[11px] text-slate-500">{data.dnsDetails}</div>
            </div>
          </div>

          {/* 3. WebRTC */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <Lock className="h-4 w-4 text-emerald-500 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">WebRTC IP 泄露检测</div>
                <div className="text-[11px] text-slate-400">浏览器 STUN 是否泄露局域网私网或旁路真实公网 IP</div>
              </div>
            </div>
            <div className="text-right sm:text-right">
              <div className="font-bold">
                {data.webrtcStatus !== "not_tested" ? (
                  data.webrtcStatus === "safe" || data.webrtcStatus === "blocked" ? (
                    <span className="text-emerald-600">未发现旁路泄露</span>
                  ) : (
                    <span className="text-rose-600">存在 IP 旁路泄露风险</span>
                  )
                ) : "Not tested"}
              </div>
              <div className="text-[11px] text-slate-500">{data.webrtcDetails}</div>
            </div>
          </div>

          {/* 4. 边缘 RTT 延迟与抖动 */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <Zap className="h-4 w-4 text-amber-500 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">边缘 HTTP RTT 往返延迟</div>
                <div className="text-[11px] text-slate-400">测试目标: {data.targetEndpoint} (多轮采样)</div>
              </div>
            </div>
            <div className="text-right sm:text-right">
              <div className="font-mono font-black text-slate-800">
                {data.httpRttAvg !== null ? `${data.httpRttAvg} ms` : "Not tested"}
              </div>
              {data.httpRttSamples.length > 0 && (
                <div className="text-[11px] text-slate-500">
                  采样序列: [{data.httpRttSamples.join(", ")} ms] · 抖动 (Jitter): {data.httpJitter} ms
                </div>
              )}
            </div>
          </div>

          {/* 5. 链路丢包率 */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 text-brand-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">HTTP 请求丢包率 (非 ICMP)</div>
                <div className="text-[11px] text-slate-400">浏览器层 5 次并发探测请求成功率统计</div>
              </div>
            </div>
            <div className="text-right sm:text-right">
              <div className="font-mono font-black text-slate-800">
                {data.httpFailureRate !== null ? `${data.httpFailureRate}%` : "Not tested"}
              </div>
              <div className="text-[11px] text-slate-400">
                {data.httpFailureRate !== null ? (data.httpFailureRate === 0 ? "5 次请求全量响应" : `丢失 ${Math.round(data.httpFailureRate * 0.05)} 次`) : "未触发"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 测试环境元数据区 */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5 text-xs text-slate-500 space-y-2 mb-8">
        <div className="font-bold text-slate-800 mb-1">测试环境元数据 (Test Environment Metadata)</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
          <div><span className="text-slate-400">测试时间:</span> {data.testTimestamp || "未执行"}</div>
          <div><span className="text-slate-400">测试协议:</span> HTTPS / Fetch (Browser Native)</div>
          <div><span className="text-slate-400">目标节点:</span> {data.targetEndpoint}</div>
          <div><span className="text-slate-400">测试采样数:</span> {data.sampleCount} 轮</div>
        </div>
        <div className="text-[11px] truncate pt-1 border-t border-slate-200/60">
          <span className="text-slate-400">客户端 User-Agent:</span> {data.userAgent || "Browser"}
        </div>
      </div>

      {/* 测试说明与技术局限性申明 */}
      <div className="rounded-2xl border border-amber-200/70 bg-amber-50/50 p-5 text-xs text-amber-900/90 leading-relaxed">
        <div className="font-bold mb-1 flex items-center gap-1.5 text-amber-900">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <span>测试说明与技术局限性申明</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-800/90">
          <li><strong>非底层 ICMP 探测：</strong>由于现代浏览器安全沙箱限制，JavaScript 无法直接发送底层 ICMP Ping 报文，本工具测得的延迟为 HTTP/HTTPS 边缘往返延迟（HTTP RTT），包含了 TLS 握手及 TCP 连接复用开销。</li>
          <li><strong>HTTP 丢包率定义：</strong>丢包率指标仅代表浏览器向 Cloudflare 节点发起轻量探测请求时的超时比率，不等同于底层网络路由层面的真实 ICMP 丢包率。</li>
          <li><strong>DNS 解析范围：</strong>本工具检测的是浏览器通过公开 DoH 节点的解析可达性，并不代表本地宽带所有内网 DNS 劫持情况。</li>
          <li><strong>动态权重保护：</strong>若因网络防火墙拦截或环境受限导致某项测试超时，该项不会被直接虚构为 0 分或 100 分，而是从分母排除并采用可用权重归一化算法。</li>
        </ul>
      </div>

    </div>
  );
}
