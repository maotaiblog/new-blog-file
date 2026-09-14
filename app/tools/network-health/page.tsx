"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, HelpCircle, ArrowRight, BookOpen, Layers, ShieldCheck, Activity, Globe } from "lucide-react";
import NetworkHealthWidget from "@/components/tools/NetworkHealthWidget";

export default function NetworkHealthPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-brand-600 transition-colors">首页</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/tools/network-health/" className="hover:text-brand-600 transition-colors">网络测试</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-bold text-slate-900">网络健康度体检</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          全功能网络健康度综合体检 (Network Health Score)
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          猫太实验室网络诊断核心聚合平台。由浏览器客户端发起真实探测，结合公网 IP 归属、DNS 解析响应、WebRTC IP 泄露检测、边缘 HTTP RTT 往返延迟与请求丢包率，基于 Available Metrics Weighting 动态可用加权模型生成真实客观的健康度评分。未测试项目真实标示 Not tested，杜绝虚构数字。
        </p>
      </header>

      <div className="mb-12">
        <NetworkHealthWidget compact={false} />
      </div>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-saas-card space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">1</span>
            <span>网络健康度综合评分 (Network Health Score) 算法与加权体系</span>
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              本评分系统由猫太实验室制定，采用“可用指标动态加权模型 (Available Metrics Weighting)”。满分为 100 分制，由性能（40%）、隐私（40%）与稳定性（20%）三大维度构成。如果浏览器沙箱或网络策略限制导致某项指标无法采集，该指标权重将从总分母中排除，最终分按可用权重等比例归一化，既不盲目赋 0 分误判，也不虚构满分。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-amber-500" />
                    <span>性能指标 (权重 40%)</span>
                  </div>
                  <p className="text-slate-600 mb-2">多轮 HTTP RTT 往返延迟样本均值阶梯评分：</p>
                  <ul className="text-slate-500 space-y-0.5 text-[11px]">
                    <li>• &le; 40ms: 100% 得分 (40分)</li>
                    <li>• 40 - 80ms: 90% 得分 (36分)</li>
                    <li>• 80 - 150ms: 75% 得分 (30分)</li>
                    <li>• 150 - 250ms: 50% 得分 (20分)</li>
                    <li>• &gt; 250ms: 25% 得分 (10分)</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>隐私防护 (权重 40%)</span>
                  </div>
                  <p className="text-slate-600 mb-2">双重安全向量综合判定：</p>
                  <ul className="text-slate-500 space-y-0.5 text-[11px]">
                    <li>• WebRTC IP 泄露 (20分)：STUN 未旁路暴露真实公网 IP 或已被禁用得 20 分；存在暴露扣至 5 分。</li>
                    <li>• DNS DoH 解析通道 (20分)：公网 DoH 解析畅通得 20 分；受阻或超时扣至 10 分。</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-brand-500" />
                    <span>链路稳定性 (权重 20%)</span>
                  </div>
                  <p className="text-slate-600 mb-2">请求成功率与相邻延迟波动统计：</p>
                  <ul className="text-slate-500 space-y-0.5 text-[11px]">
                    <li>• HTTP 请求丢包率 (15分)：0% 丢包得 15 分，按失败比率线性扣减。</li>
                    <li>• 抖动 Jitter (5分)：相邻样本差值均值 &le; 5ms 得 5 分；&le; 15ms 得 4 分；&gt; 30ms 得 1 分。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-50 text-brand-600 text-sm font-bold">2</span>
            <span>专项子工具全景导航 (Tools Suite)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <Link href="/tools/my-ip/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">公网 IP 查询 (What Is My IP)</div>
                <div className="text-slate-500 mt-1">查看我的公网出口 IP、运营商与地理归属</div>
              </div>
              <div className="mt-3 text-brand-600 font-bold flex items-center gap-1">
                立即检测 <ArrowRight className="h-3 w-3" />
              </div>
            </Link>

            <Link href="/tools/dns-leak-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">DNS 泄露检测 (DNS Leak)</div>
                <div className="text-slate-500 mt-1">检测域名解析是否遭本地宽带运营商劫持</div>
              </div>
              <div className="mt-3 text-brand-600 font-bold flex items-center gap-1">
                立即检测 <ArrowRight className="h-3 w-3" />
              </div>
            </Link>

            <Link href="/tools/webrtc-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">WebRTC 泄露检测 (WebRTC)</div>
                <div className="text-slate-500 mt-1">探测浏览器底层 STUN 是否绕过代理泄露真实 IP</div>
              </div>
              <div className="mt-3 text-brand-600 font-bold flex items-center gap-1">
                立即检测 <ArrowRight className="h-3 w-3" />
              </div>
            </Link>

            <Link href="/tools/ping-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">网络延迟测试 (Ping Test)</div>
                <div className="text-slate-500 mt-1">多轮发包测量往返延迟、抖动与丢包率</div>
              </div>
              <div className="mt-3 text-brand-600 font-bold flex items-center gap-1">
                立即检测 <ArrowRight className="h-3 w-3" />
              </div>
            </Link>

            <Link href="/tools/vpn-leak-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">VPN 隐私体检 (VPN Leak)</div>
                <div className="text-slate-500 mt-1">4 大隐私泄露向量交叉审计 (IP/DNS/WebRTC/IPv6)</div>
              </div>
              <div className="mt-3 text-brand-600 font-bold flex items-center gap-1">
                立即检测 <ArrowRight className="h-3 w-3" />
              </div>
            </Link>

            <Link href="/tools/vpn-speed-test/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">网络带宽测速 (Speed Test)</div>
                <div className="text-slate-500 mt-1">分块拉取 CDN 资源测试实际下载吞吐速率 (Mbps)</div>
              </div>
              <div className="mt-3 text-brand-600 font-bold flex items-center gap-1">
                立即检测 <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" />
            <span>常见问题解答 (FAQ)</span>
          </h2>
          <div className="space-y-6 text-sm text-slate-600">
            <div>
              <div className="font-bold text-slate-900 mb-1.5">Q1：为什么未开始测试时显示“—”和 Not tested？</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                猫太实验室坚持数据真实性与技术诚信原则。在用户主动点击触发探测前，我们不预填任何虚构分数（如 88 分或 100 分），也不伪造虚拟的延迟与丢包数据。只有在客户端完成真实的 HTTP 采样与 STUN 握手后，系统才会根据实际测试数据实时动态计算健康度。
              </p>
            </div>
            
            <div>
              <div className="font-bold text-slate-900 mb-1.5">Q2：Network Health Score 衡量的是什么？</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                它是一个综合衡量当前客户端网络“可用性、隐私性与稳定性”的 100 分制指数。评分由三部分构成：基于多轮 HTTP RTT 往返延迟的网络性能（40%）、基于 WebRTC 穿透与 DoH 加密通道的隐私防护（40%），以及基于请求失败率与网络抖动的链路稳定性（20%）。
              </p>
            </div>

            <div>
              <div className="font-bold text-slate-900 mb-1.5">Q3：为什么多次测试分数可能会有小幅浮动？</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                网络环境具备动态特征。国际公网路由拥塞、本地 Wi-Fi 频段干扰、运营商动态 BGP 调优以及 CDN Anycast 路由切换都会导致单次测得的 RTT 延迟和抖动发生毫秒级波动。本工具采用 5 轮采样求均值，已最大程度平滑偶然误差，轻微浮动属于真实网络的正常现象。
              </p>
            </div>

            <div>
              <div className="font-bold text-slate-900 mb-1.5">Q4：如果得分较低，应该如何针对性排查与改善？</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                请对照上方细分清单按维度排查：若延迟扣分严重，建议检查物理宽带负载或切换至就近低延迟线路；若 WebRTC 出现泄露警告，请在客户端开启全局虚拟网卡（TUN 模式）或在浏览器安装 WebRTC 阻断插件；若出现丢包或抖动过大，可排查 Wi-Fi 信号质量或升级至抗弱网丢包的传输协议（如 QUIC / Hysteria 2）。
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-brand-600" />
            <span>下一步：权威知识指南与排查文档</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
            <Link href="/blog/network-guide/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>跨境网络基础指南</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/blog/vpn-guide/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>VPN 与网络隐私指南</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/blog/vpn-troubleshooting/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>连接故障排查手册</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
            <Link href="/whitepaper/" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 transition-all flex items-center justify-between">
              <span>评测体系白皮书</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
