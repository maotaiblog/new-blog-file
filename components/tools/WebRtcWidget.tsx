"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCw, 
  Info, 
  Lock, 
  Globe, 
  Network
} from "lucide-react";

interface IceCandidateInfo {
  ip: string;
  type: "host" | "srflx" | "relay" | "unknown";
  protocol: string;
  category: "local" | "public" | "mdns";
}

export default function WebRtcWidget() {
  const [testing, setTesting] = useState(false);
  const [tested, setTested] = useState(false);
  const [publicIp, setPublicIp] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<IceCandidateInfo[]>([]);
  const [status, setStatus] = useState<"clean" | "leaked" | "blocked" | "idle">("idle");
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const runTest = async () => {
    setTesting(true);
    setTested(false);
    setCandidates([]);
    setLogMessages(["正在初始化 WebRTC 探测会话...", "正在检测当前浏览器公网出口 IP..."]);

    // 1. 获取当前外部 HTTP 看到的出口 IP
    let apparentIp = "";
    try {
      const res = await fetch("https://api.ipify.org?format=json", { signal: AbortSignal.timeout(3000) });
      const data = await res.json();
      apparentIp = data.ip || "";
      setPublicIp(apparentIp);
      setLogMessages(prev => [...prev, `HTTP 出口 IP 探测完成: ${apparentIp || "未知"}`]);
    } catch {
      setLogMessages(prev => [...prev, "HTTP 出口 IP 检测超时，仅通过 STUN 网关检测"]);
    }

    // 2. 利用 RTCPeerConnection 进行 STUN 握手与 ICE 收集
    setLogMessages(prev => [...prev, "正在启动 RTCPeerConnection 并向公开 STUN 探针发起握手..."]);

    const RTCPC = window.RTCPeerConnection || (window as unknown as { webkitRTCPeerConnection: typeof RTCPeerConnection }).webkitRTCPeerConnection;
    if (!RTCPC) {
      setStatus("blocked");
      setTested(true);
      setTesting(false);
      setLogMessages(prev => [...prev, "当前浏览器未启用 WebRTC 接口或已被扩展彻底拦截 (安全)。"]);
      return;
    }

    const foundCandidates: IceCandidateInfo[] = [];
    let isLeaked = false;

    try {
      const pc = new RTCPC({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun.cloudflare.com:3478" }
        ]
      });

      pc.createDataChannel("leak-detector");

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const candidatePromise = new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          resolve();
        }, 3500);

        pc.onicecandidate = (event) => {
          if (!event || !event.candidate) {
            clearTimeout(timeout);
            resolve();
            return;
          }

          const cand = event.candidate.candidate;
          // 解析 IP: 支持 IPv4
          const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
          const match = cand.match(ipRegex);

          if (match) {
            const ip = match[1];
            const isLocal = ip.startsWith("10.") || ip.startsWith("192.168.") || /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip) || ip === "127.0.0.1";
            const candType: "host" | "srflx" | "relay" | "unknown" = 
              cand.includes("typ srflx") ? "srflx" : 
              cand.includes("typ host") ? "host" : 
              cand.includes("typ relay") ? "relay" : "unknown";

            const candidateItem: IceCandidateInfo = {
              ip,
              type: candType,
              protocol: cand.includes("udp") ? "UDP" : "TCP",
              category: isLocal ? "local" : "public"
            };

            if (!foundCandidates.some(c => c.ip === ip)) {
              foundCandidates.push(candidateItem);
              setCandidates([...foundCandidates]);

              // 如果 STUN 返回的公网 IP 存在且与 HTTP IP 不一致，则存在多网卡/真实 IP 泄露
              if (!isLocal && apparentIp && ip !== apparentIp) {
                isLeaked = true;
              }
            }
          } else if (cand.includes(".local")) {
            // mDNS 匿名局域网地址
            const mdnsItem: IceCandidateInfo = {
              ip: cand.match(/([a-zA-Z0-9\-_]+\.local)/)?.[1] || "mDNS 隐藏地址",
              type: "host",
              protocol: "UDP",
              category: "mdns"
            };
            if (!foundCandidates.some(c => c.ip === mdnsItem.ip)) {
              foundCandidates.push(mdnsItem);
              setCandidates([...foundCandidates]);
            }
          }
        };
      });

      await candidatePromise;
      pc.close();
    } catch {
      setLogMessages(prev => [...prev, "STUN 握手未返回候选地址或被本地网络策略屏蔽。"]);
    }

    setTested(true);
    setTesting(false);

    if (foundCandidates.length === 0) {
      setStatus("blocked");
      setLogMessages(prev => [...prev, "检测完成：未探测到任何暴露的候选 IP (WebRTC 安全未泄露)。"]);
    } else if (isLeaked) {
      setStatus("leaked");
      setLogMessages(prev => [...prev, "警告：STUN 探测到的公网 IP 与代理出口不一致，存在真实 IP 泄露风险！"]);
    } else {
      setStatus("clean");
      setLogMessages(prev => [...prev, "检测完成：STUN 出口与代理网关一致，未穿透泄露真实公网 IP。"]);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600 border border-brand-100 mb-2">
            <Lock className="h-3.5 w-3.5" />
            <span>实时 STUN 协议嗅探</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">WebRTC 泄露检测面板</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            探测浏览器底层 P2P 协议是否越过系统代理直接暴露出真实本地或公网 IP
          </p>
        </div>

        <button
          onClick={runTest}
          disabled={testing}
          className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
        >
          <RotateCw className={`h-4 w-4 ${testing ? "animate-spin" : ""}`} />
          <span>{testing ? "正在收集候选地址..." : (tested ? "重新检测 WebRTC" : "开始 WebRTC 检测")}</span>
        </button>
      </div>

      {/* 状态徽章区 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <span className="text-xs font-bold text-slate-400">检测状态</span>
          <div className="mt-2 flex items-center gap-2">
            {!tested ? (
              <span className="text-sm font-bold text-slate-500">Not tested (未检测)</span>
            ) : status === "clean" ? (
              <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                <CheckCircle2 className="h-4 w-4" /> 安全 (无穿透泄露)
              </span>
            ) : status === "blocked" ? (
              <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                <ShieldCheck className="h-4 w-4" /> 极优 (接口已屏蔽/安全未泄露)
              </span>
            ) : (
              <span className="flex items-center gap-1 text-sm font-bold text-rose-600">
                <AlertTriangle className="h-4 w-4" /> 存在泄露风险
              </span>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <span className="text-xs font-bold text-slate-400">HTTP 出口网关 IP</span>
          <div className="mt-2 text-sm font-black font-mono text-slate-900">
            {publicIp || (tested ? "未能获取" : "Not tested")}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <span className="text-xs font-bold text-slate-400">捕获的 ICE 候选地址数</span>
          <div className="mt-2 text-sm font-black font-mono text-brand-600">
            {tested ? `${candidates.length} 个地址` : "Not tested"}
          </div>
        </div>
      </div>

      {/* 捕获的 IP 地址列表 */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden mb-6">
        <div className="bg-slate-100 px-4 py-3 text-xs font-bold text-slate-700 flex items-center justify-between">
          <span>WebRTC 捕获候选 (ICE Candidates)</span>
          <span className="text-[11px] font-normal text-slate-500">
            {candidates.length > 0 ? "已提取" : "等待测试"}
          </span>
        </div>

        {candidates.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 font-medium">
            {tested ? "🎉 恭喜！未捕获到任何暴露的 IP 地址，你的浏览器 WebRTC 受到严密防护。" : "点击上方按钮开始实时探测。"}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {candidates.map((c, i) => (
              <div key={i} className="p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${c.category === "public" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-brand-600"}`}>
                    {c.category === "public" ? <Globe className="h-4 w-4" /> : <Network className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="font-mono font-black text-slate-900">{c.ip}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      类型: {c.type === "srflx" ? "STUN 反射公网 IP" : (c.type === "host" ? "本机 Host 接口" : c.type)} · 协议: {c.protocol}
                    </div>
                  </div>
                </div>

                <div>
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                    c.category === "public" 
                      ? "bg-amber-100 text-amber-700" 
                      : (c.category === "mdns" ? "bg-slate-100 text-slate-600" : "bg-blue-100 text-brand-700")
                  }`}>
                    {c.category === "public" ? "公网暴露" : (c.category === "mdns" ? "mDNS 混淆" : "局域网地址")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 实时诊断日志 */}
      {logMessages.length > 0 && (
        <div className="rounded-2xl bg-slate-900 p-4 font-mono text-[11px] text-slate-300">
          <div className="text-slate-400 font-bold mb-2 flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-brand-400" />
            <span>STUN 握手与诊断事件记录：</span>
          </div>
          <div className="space-y-1">
            {logMessages.map((msg, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-slate-500">[{idx + 1}]</span>
                <span>{msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
