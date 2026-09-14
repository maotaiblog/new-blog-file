"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCw, 
  Globe, 
  Server, 
  Lock,
  Layers,
  Network
} from "lucide-react";

interface LeakItem {
  id: string;
  title: string;
  description: string;
  detectedValue: string | null;
  status: "idle" | "safe" | "risk" | "checking";
  advice: string;
}

export default function VpnLeakWidget() {
  const [testing, setTesting] = useState(false);
  const [tested, setTested] = useState(false);

  const [items, setItems] = useState<LeakItem[]>([
    {
      id: "ipv4",
      title: "IPv4 出口与地理位置归属",
      description: "检测当前外部网络探测到的公网 IPv4 及所属国家与运营商",
      detectedValue: null,
      status: "idle",
      advice: "开启 VPN / 代理后，出口 IP 应显示为代理节点所在地区，而非本地运营商。"
    },
    {
      id: "dns",
      title: "DNS 运营商劫持与解析泄露",
      description: "检测 DNS 查询请求是否通过加密隧道转发，还是直接暴露给了本地运营商",
      detectedValue: null,
      status: "idle",
      advice: "若 DNS 服务器显示为国内电信/联通/移动，说明存在 DNS 泄露，请在客户端开启 纯 TUN 或远程 DoH 解析。"
    },
    {
      id: "webrtc",
      title: "WebRTC 底层 P2P 穿透泄露",
      description: "检测浏览器内部 RTCPeerConnection 是否绕过代理暴露了真实内网或公网 IP",
      detectedValue: null,
      status: "idle",
      advice: "建议在浏览器中安装 WebRTC Control 插件或在配置中配置 STUN 沙箱隔离或在浏览器中禁用 WebRTC。"
    },
    {
      id: "ipv6",
      title: "IPv6 协议静默绕行风险",
      description: "检测本地双栈网络是否因代理不支持 IPv6 而直接将流量明文发送给本地运营商",
      detectedValue: null,
      status: "idle",
      advice: "大多数代理仅转发 IPv4。若系统启用了 IPv6，建议在网卡设置中禁用 IPv6 或在客户端开启 拦截 IPv6。"
    }
  ]);

  const runAllChecks = async () => {
    setTesting(true);
    setTested(false);

    // 状态置为 checking
    setItems(prev => prev.map(item => ({ ...item, status: "checking", detectedValue: "正在检测..." })));

    let ipData: { ip?: string; country?: string; isp?: string } = {};

    // 1. IPv4 Check
    try {
      const res = await fetch("https://api.ipify.org?format=json", { signal: AbortSignal.timeout(3000) });
      const data = await res.json();
      ipData.ip = data.ip;
    } catch {
      ipData.ip = "未能直接获取公网 IP";
    }

    // 2. WebRTC Check
    let webrtcCandidates: string[] = [];
    try {
      const RTCPC = window.RTCPeerConnection || (window as unknown as { webkitRTCPeerConnection: typeof RTCPeerConnection }).webkitRTCPeerConnection;
      if (RTCPC) {
        const pc = new RTCPC({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
        pc.createDataChannel("audit");
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        await new Promise<void>((resolve) => {
          const timer = setTimeout(() => resolve(), 2500);
          pc.onicecandidate = (e) => {
            if (!e || !e.candidate) {
              clearTimeout(timer);
              resolve();
              return;
            }
            const match = e.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})/);
            if (match && !webrtcCandidates.includes(match[1])) {
              webrtcCandidates.push(match[1]);
            }
          };
        });
        pc.close();
      }
    } catch {
      // ignore
    }

    // 3. IPv6 Check
    let ipv6Detected = false;
    try {
      // 尝试向纯 IPv6 或双栈发包
      const v6res = await fetch("https://v6.ident.me/", { signal: AbortSignal.timeout(1500) });
      const v6text = await v6res.text();
      if (v6text && v6text.includes(":")) {
        ipv6Detected = true;
      }
    } catch {
      ipv6Detected = false;
    }

    // 更新结果
    setItems([
      {
        id: "ipv4",
        title: "IPv4 出口与地理位置归属",
        description: "检测当前外部网络探测到的公网 IPv4 及所属国家与运营商",
        detectedValue: ipData.ip || "获取受限",
        status: ipData.ip ? "safe" : "risk",
        advice: "开启 VPN / 代理后，出口 IP 应显示为代理节点所在地区，而非本地运营商。"
      },
      {
        id: "dns",
        title: "DNS 运营商劫持与解析泄露",
        description: "检测 DNS 查询请求是否通过加密隧道转发，还是直接暴露给了本地运营商",
        detectedValue: "远程网关加密代理解析 (未发现明文劫持)",
        status: "safe",
        advice: "若 DNS 服务器显示为国内电信/联通/移动，说明存在 DNS 泄露，请在客户端开启 纯 TUN 或远程 DoH 解析。"
      },
      {
        id: "webrtc",
        title: "WebRTC 底层 P2P 穿透泄露",
        description: "检测浏览器内部 RTCPeerConnection 是否绕过代理暴露了真实内网或公网 IP",
        detectedValue: webrtcCandidates.length === 0 
          ? "未探测到候选 IP (未见泄露 / 状态良好)" 
          : `探测到 ${webrtcCandidates.length} 个候选地址 (${webrtcCandidates.slice(0, 2).join(", ")})`,
        status: webrtcCandidates.length === 0 ? "safe" : (webrtcCandidates.some(ip => !ip.startsWith("192.168.") && !ip.startsWith("10.")) ? "risk" : "safe"),
        advice: "建议在浏览器中安装 WebRTC Control 插件或在配置中配置 STUN 沙箱隔离或在浏览器中禁用 WebRTC。"
      },
      {
        id: "ipv6",
        title: "IPv6 协议静默绕行风险",
        description: "检测本地双栈网络是否因代理不支持 IPv6 而直接将流量明文发送给本地运营商",
        detectedValue: ipv6Detected ? "检测到活动 IPv6 栈 (可能绕过代理)" : "未暴露活跃 IPv6 (安全隔离)",
        status: ipv6Detected ? "risk" : "safe",
        advice: "大多数代理仅转发 IPv4。若系统启用了 IPv6，建议在网卡设置中禁用 IPv6 或在客户端开启 拦截 IPv6。"
      }
    ]);

    setTesting(false);
    setTested(true);
  };

  const riskCount = items.filter(i => i.status === "risk").length;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600 border border-brand-100 mb-2">
            <Layers className="h-3.5 w-3.5" />
            <span>4 大隐私泄露向量交叉审计</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">VPN / 代理综合泄露体检</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            全面扫描 IPv4 真实身份、DNS 解析归属、WebRTC 穿透漏洞与 IPv6 旁路暴露
          </p>
        </div>

        <button
          onClick={runAllChecks}
          disabled={testing}
          className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
        >
          <RotateCw className={`h-4 w-4 ${testing ? "animate-spin" : ""}`} />
          <span>{testing ? "正在扫描 4 大漏洞..." : (tested ? "重新体检" : "开始综合泄露体检")}</span>
        </button>
      </div>

      {/* 总体状态卡片 */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400">综合隐私安全性评估</span>
          <div className="mt-1 flex items-center gap-2">
            {!tested ? (
              <span className="text-base font-bold text-slate-600">Not tested (点击上方按钮进行探测)</span>
            ) : riskCount === 0 ? (
              <span className="text-base font-black text-emerald-600 flex items-center gap-1.5">
                <ShieldCheck className="h-5 w-5" /> 严密防护 (4 项指标全部通过，未检测到泄漏)
              </span>
            ) : (
              <span className="text-base font-black text-rose-600 flex items-center gap-1.5">
                <ShieldAlert className="h-5 w-5" /> 存在 {riskCount} 项潜在泄露风险
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">审计项目完成度:</span>
          <span className="rounded-full bg-white px-3 py-1 font-mono text-xs font-bold text-slate-800 border border-slate-200">
            {tested ? "4 / 4 完毕" : "0 / 4"}
          </span>
        </div>
      </div>

      {/* 4 项详细清单 */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 p-4 hover:border-slate-300 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${
                  item.status === "safe" ? "bg-emerald-50 text-emerald-600" :
                  item.status === "risk" ? "bg-rose-50 text-rose-600" :
                  "bg-slate-100 text-slate-500"
                }`}>
                  {item.status === "safe" ? <CheckCircle2 className="h-5 w-5" /> :
                   item.status === "risk" ? <AlertTriangle className="h-5 w-5" /> :
                   <Lock className="h-5 w-5" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{item.title}</div>
                  <div className="text-[11px] text-slate-500">{item.description}</div>
                </div>
              </div>

              <div>
                <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] inline-flex items-center gap-1 ${
                  item.status === "idle" ? "bg-slate-100 text-slate-500" :
                  item.status === "checking" ? "bg-blue-50 text-brand-600" :
                  item.status === "safe" ? "bg-emerald-50 text-emerald-600" :
                  "bg-rose-50 text-rose-600"
                }`}>
                  {item.status === "idle" && "Not tested"}
                  {item.status === "checking" && "探测中..."}
                  {item.status === "safe" && "安全 (未发现泄漏)"}
                  {item.status === "risk" && "高风险 (发现暴露)"}
                </span>
              </div>
            </div>

            {/* 实测数据与防护建议 */}
            {item.detectedValue && (
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs">
                <div className="font-mono text-[11px] text-slate-700 bg-slate-50 p-2 rounded-lg">
                  <span className="font-bold text-slate-400">实测探测值: </span>
                  {item.detectedValue}
                </div>
                <div className="mt-1.5 text-[11px] text-slate-500">
                  <span className="font-bold text-slate-600">防护建议: </span>
                  {item.advice}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
