"use client";

import React, { useState, useMemo, useRef } from "react";
import { 
  Activity, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Zap, 
  Globe, 
  Server, 
  ArrowUpDown,
  Filter
} from "lucide-react";

export interface PingNode {
  id: string;
  name: string;
  region: string;
  category: 'domestic' | 'apac' | 'global';
  carrier: string;
  url: string;
  latency?: number; // ms, -1 为超时/丢包
  status?: 'testing' | 'ultra' | 'good' | 'slow' | 'timeout' | 'idle';
}

const DEFAULT_NODES: PingNode[] = [
  // 1. 国内主流运营商 / CDN 节点
  {
    id: "ali-shanghai",
    name: "阿里云 · 华东节点",
    region: "中国 · 上海",
    category: "domestic",
    carrier: "阿里云 BGP",
    url: "https://img.alicdn.com/favicon.ico"
  },
  {
    id: "tencent-guangzhou",
    name: "腾讯云 · 华南节点",
    region: "中国 · 广州",
    category: "domestic",
    carrier: "腾讯云 BGP",
    url: "https://mat1.gtimg.com/www/icon/favicon2.ico"
  },
  {
    id: "baidu-beijing",
    name: "百度云 · 华北节点",
    region: "中国 · 北京",
    category: "domestic",
    carrier: "中国联通 / 电信",
    url: "https://www.baidu.com/favicon.ico"
  },
  {
    id: "bytedance-beijing",
    name: "火山引擎 · 字节跳动",
    region: "中国 · 北京",
    category: "domestic",
    carrier: "抖音 / 字节多线",
    url: "https://lf3-cdn-tos.bytegoofy.com/obj/goofy/fe/misc/favicon.ico"
  },
  {
    id: "netease-hangzhou",
    name: "网易云 · 华东节点",
    region: "中国 · 杭州",
    category: "domestic",
    carrier: "中国电信",
    url: "https://y.music.163.com/favicon.ico"
  },
  {
    id: "jd-beijing",
    name: "京东云 · 华北节点",
    region: "中国 · 北京",
    category: "domestic",
    carrier: "京东 BGP",
    url: "https://storage.360buyimg.com/common/favicon.ico"
  },
  {
    id: "sina-weibo",
    name: "新浪云 · 核心节点",
    region: "中国 · 北京",
    category: "domestic",
    carrier: "中国联通",
    url: "https://weibo.com/favicon.ico"
  },
  {
    id: "bilibili-shanghai",
    name: "哔哩哔哩 · 边缘加速",
    region: "中国 · 上海",
    category: "domestic",
    carrier: "B站 CDN 多线",
    url: "https://static.hdslb.com/images/favicon.ico"
  },

  // 2. 亚太及港澳台优质节点
  {
    id: "cf-hongkong",
    name: "Cloudflare · 香港节点",
    region: "中国 · 香港",
    category: "apac",
    carrier: "Cloudflare HK Anycast",
    url: "https://cdnjs.cloudflare.com/favicon.ico"
  },
  {
    id: "fastly-tokyo",
    name: "Fastly / jsDelivr · 东京",
    region: "日本 · 东京",
    category: "apac",
    carrier: "Fastly APAC",
    url: "https://cdn.jsdelivr.net/favicon.ico"
  },
  {
    id: "aws-singapore",
    name: "AWS CloudFront · 新加坡",
    region: "新加坡 · 樟宜",
    category: "apac",
    carrier: "Amazon AWS Anycast",
    url: "https://d1.awsstatic.com/favicon.ico"
  },
  {
    id: "vercel-apac",
    name: "Vercel Edge · 亚太边缘",
    region: "亚太 · 智能路由",
    category: "apac",
    carrier: "Vercel Global Anycast",
    url: "https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico"
  },

  // 3. 欧美及全球核心节点
  {
    id: "cf-uswest",
    name: "Cloudflare · 美西节点",
    region: "美国 · 圣何塞 / 硅谷",
    category: "global",
    carrier: "Cloudflare 1.1.1.1",
    url: "https://1.1.1.1/favicon.ico"
  },
  {
    id: "github-useast",
    name: "GitHub · 美东节点",
    region: "美国 · 弗吉尼亚",
    category: "global",
    carrier: "Microsoft Azure / Fastly",
    url: "https://github.githubassets.com/favicons/favicon.png"
  },
  {
    id: "wikipedia-europe",
    name: "维基百科 · 欧洲核心",
    region: "荷兰 · 阿姆斯特丹",
    category: "global",
    carrier: "KPN / 欧洲骨干网",
    url: "https://en.wikipedia.org/static/favicon/wikipedia.ico"
  },
  {
    id: "google-global",
    name: "Google Public · 全球节点",
    region: "美国 · 山景城",
    category: "global",
    carrier: "Google Anycast",
    url: "https://www.google.com/favicon.ico"
  }
];

export default function DistributedPingTest() {
  const [nodes, setNodes] = useState<PingNode[]>(DEFAULT_NODES);
  const [testing, setTesting] = useState(false);
  const [filterCat, setFilterCat] = useState<'all' | 'domestic' | 'apac' | 'global'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'latency-asc' | 'latency-desc'>('default');
  const [testedCount, setTestedCount] = useState(0);

  const abortControllersRef = useRef<AbortController[]>([]);

  // 状态评估辅助函数
  const getStatusFromLatency = (lat: number): PingNode['status'] => {
    if (lat < 0) return 'timeout';
    if (lat <= 45) return 'ultra';
    if (lat <= 110) return 'good';
    return 'slow';
  };

  // 单节点异步测速执行
  const pingSingleNode = async (node: PingNode): Promise<{ id: string; latency: number; status: PingNode['status'] }> => {
    const controller = new AbortController();
    abortControllersRef.current.push(controller);

    // 3000ms 超时限制
    const timer = setTimeout(() => {
      controller.abort();
    }, 3000);

    const startTime = performance.now();
    try {
      // 拼接随机参数和时间戳防止浏览器缓存
      const cacheBuster = `_t=${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const targetUrl = node.url.includes("?") ? `${node.url}&${cacheBuster}` : `${node.url}?${cacheBuster}`;

      await fetch(targetUrl, {
        method: "GET",
        mode: "no-cors",
        cache: "no-cache",
        signal: controller.signal
      });

      const rtt = Math.round(performance.now() - startTime);
      clearTimeout(timer);
      return { id: node.id, latency: rtt, status: getStatusFromLatency(rtt) };
    } catch {
      clearTimeout(timer);
      return { id: node.id, latency: -1, status: 'timeout' };
    }
  };

  // 启动并发 / 队列测速
  const startFullTest = async () => {
    if (testing) return;

    // 清理先前的请求
    abortControllersRef.current.forEach(c => c.abort());
    abortControllersRef.current = [];

    setTesting(true);
    setTestedCount(0);

    // 重置所有节点状态为 testing
    setNodes(prev => prev.map(n => ({ ...n, status: 'testing', latency: undefined })));

    // 分批并发控制（每组 4 个并行执行，保证准确性与稳定性）
    const batchSize = 4;
    for (let i = 0; i < DEFAULT_NODES.length; i += batchSize) {
      const batch = DEFAULT_NODES.slice(i, i + batchSize);
      const results = await Promise.all(batch.map(node => pingSingleNode(node)));

      setNodes(prev =>
        prev.map(item => {
          const matched = results.find(r => r.id === item.id);
          return matched ? { ...item, latency: matched.latency, status: matched.status } : item;
        })
      );

      setTestedCount(prev => Math.min(DEFAULT_NODES.length, prev + batch.length));
    }

    setTesting(false);
  };

  // 统计计算
  const stats = useMemo(() => {
    const finishedNodes = nodes.filter(n => n.latency !== undefined);
    const validNodes = finishedNodes.filter(n => (n.latency ?? -1) > 0);
    const timeoutNodes = finishedNodes.filter(n => (n.latency ?? -1) === -1);

    if (validNodes.length === 0) {
      return {
        fastest: null,
        slowest: null,
        avg: null,
        lossRate: timeoutNodes.length > 0 ? "100%" : "0.00%",
        progressPercent: Math.round((testedCount / DEFAULT_NODES.length) * 100)
      };
    }

    const sorted = [...validNodes].sort((a, b) => (a.latency || 0) - (b.latency || 0));
    const totalLat = validNodes.reduce((sum, n) => sum + (n.latency || 0), 0);
    const avgLat = Math.round(totalLat / validNodes.length);
    const loss = ((timeoutNodes.length / finishedNodes.length) * 100).toFixed(1);

    return {
      fastest: sorted[0],
      slowest: sorted[sorted.length - 1],
      avg: avgLat,
      lossRate: `${loss}%`,
      progressPercent: Math.round((testedCount / DEFAULT_NODES.length) * 100)
    };
  }, [nodes, testedCount]);

  // 过滤与排序
  const displayedNodes = useMemo(() => {
    let list = nodes.filter(item => {
      if (filterCat === 'all') return true;
      return item.category === filterCat;
    });

    if (sortBy === 'latency-asc') {
      list.sort((a, b) => {
        const latA = a.latency !== undefined && a.latency > 0 ? a.latency : 99999;
        const latB = b.latency !== undefined && b.latency > 0 ? b.latency : 99999;
        return latA - latB;
      });
    } else if (sortBy === 'latency-desc') {
      list.sort((a, b) => {
        const latA = a.latency !== undefined && a.latency > 0 ? a.latency : -1;
        const latB = b.latency !== undefined && b.latency > 0 ? b.latency : -1;
        return latB - latA;
      });
    }

    return list;
  }, [nodes, filterCat, sortBy]);

  return (
    <div className="w-full space-y-6">
      {/* 核心控制栏与仪表盘 (参考 IT 狗 itdog.cn 风格) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  ⚡ 全国与全球分布式节点 Ping 测速
                </h2>
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-mono font-bold text-indigo-600 border border-indigo-100">
                  ITDOG 架构模式
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                纯前端 RTT 往返测量技术 • 零缓存直连国内主流云厂与全球海外边缘探针 (3s 超时防护)
              </p>
            </div>
          </div>

          <button
            onClick={startFullTest}
            disabled={testing}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-brand-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:opacity-90 active:scale-95 transition-all cursor-pointer disabled:opacity-75"
          >
            <RotateCw className={`h-4 w-4 ${testing ? "animate-spin" : ""}`} />
            <span>{testing ? `正在测速中 (${testedCount}/${DEFAULT_NODES.length})...` : "🚀 开始全国/全球节点测速"}</span>
          </button>
        </div>

        {/* 动态进度条 */}
        {testing && (
          <div className="space-y-1.5 animate-in fade-in">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
                <span>正在向国内主要省份及海外边缘发包探查中...</span>
              </span>
              <span className="font-mono text-indigo-600">{stats.progressPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300 rounded-full shadow-sm"
                style={{ width: `${stats.progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* 统计指标卡片组 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <span className="text-[11px] font-bold text-slate-400 block">🥇 最优低延迟节点</span>
            <div className="mt-1.5 text-sm font-black text-slate-900 truncate">
              {stats.fastest ? stats.fastest.name : "--"}
            </div>
            <span className="mt-1 inline-block font-mono text-xs font-extrabold text-emerald-600">
              {stats.fastest ? `${stats.fastest.latency} ms` : "等待测速"}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <span className="text-[11px] font-bold text-slate-400 block">📊 综合平均往返 RTT</span>
            <div className="mt-1.5 text-sm font-black text-slate-900">
              {stats.avg !== null ? `${stats.avg} ms` : "--"}
            </div>
            <span className="mt-1 inline-block text-[11px] font-bold text-slate-500">
              {stats.avg !== null ? (stats.avg < 80 ? "整体极速畅通" : "部分跨国节点受限") : "待开始"}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <span className="text-[11px] font-bold text-slate-400 block">🐢 最高延迟节点</span>
            <div className="mt-1.5 text-sm font-black text-slate-900 truncate">
              {stats.slowest ? stats.slowest.name : "--"}
            </div>
            <span className="mt-1 inline-block font-mono text-xs font-bold text-amber-600">
              {stats.slowest ? `${stats.slowest.latency} ms` : "--"}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <span className="text-[11px] font-bold text-slate-400 block">📡 节点连通丢包率</span>
            <div className="mt-1.5 text-sm font-black text-slate-900">
              {stats.lossRate}
            </div>
            <span className="mt-1 inline-block text-[11px] font-mono text-slate-400">
              已检测: {testedCount} / {DEFAULT_NODES.length}
            </span>
          </div>
        </div>

        {/* 过滤选项与排序控制 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          {/* 分区 Tab */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              { id: 'all', label: '全部节点 (16)' },
              { id: 'domestic', label: '🇨🇳 国内主流 (8)' },
              { id: 'apac', label: '🌏 亚太港日新 (4)' },
              { id: 'global', label: '🌐 欧美及全球 (4)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterCat(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filterCat === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 排序按钮 */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5" /> 排序:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="default">默认节点顺序</option>
              <option value="latency-asc">延迟最低优先 (极速)</option>
              <option value="latency-desc">延迟最高优先</option>
            </select>
          </div>
        </div>
      </div>

      {/* 测速结果表格大盘 (IT狗样式) */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-saas-card">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-3.5 px-4 w-12 text-center">#</th>
              <th className="py-3.5 px-4">测试节点名称</th>
              <th className="py-3.5 px-4">物理区域</th>
              <th className="py-3.5 px-4">骨干网络 / 运营商</th>
              <th className="py-3.5 px-4 w-44">往返延迟 (RTT)</th>
              <th className="py-3.5 px-4 text-center">状态评级</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {displayedNodes.map((node, index) => {
              const isTesting = node.status === 'testing';
              const isTimeout = node.status === 'timeout';
              const hasLat = node.latency !== undefined && node.latency > 0;

              return (
                <tr key={node.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* 序号 */}
                  <td className="py-3.5 px-4 text-center text-xs font-mono text-slate-400">
                    {index + 1}
                  </td>

                  {/* 节点名称 */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Server className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{node.name}</span>
                    </div>
                  </td>

                  {/* 区域 */}
                  <td className="py-3.5 px-4 text-slate-600 text-xs">
                    {node.region}
                  </td>

                  {/* 运营商 */}
                  <td className="py-3.5 px-4">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600 border border-slate-200/60">
                      {node.carrier}
                    </span>
                  </td>

                  {/* 延迟柱状条与数据 */}
                  <td className="py-3.5 px-4">
                    {isTesting ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-500">
                        <RotateCw className="h-3.5 w-3.5 animate-spin" />
                        <span>正在测速...</span>
                      </span>
                    ) : isTimeout ? (
                      <span className="font-mono text-xs font-black text-rose-500">
                        超时 / 丢包 (3s)
                      </span>
                    ) : hasLat ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono font-black">
                          <span className={
                            node.latency! <= 45 ? "text-emerald-600" :
                            node.latency! <= 110 ? "text-blue-600" : "text-amber-600"
                          }>
                            {node.latency} ms
                          </span>
                        </div>
                        {/* 可视化延迟柱 */}
                        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              node.latency! <= 45 ? "bg-emerald-500" :
                              node.latency! <= 110 ? "bg-blue-500" : "bg-amber-500"
                            }`}
                            style={{ width: `${Math.min(100, Math.max(8, (node.latency! / 300) * 100))}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-mono">未开始</span>
                    )}
                  </td>

                  {/* 状态徽章 */}
                  <td className="py-3.5 px-4 text-center">
                    {isTesting ? (
                      <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-600 border border-indigo-200">
                        探查中
                      </span>
                    ) : node.status === 'ultra' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>极速</span>
                      </span>
                    ) : node.status === 'good' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200">
                        <Zap className="h-3 w-3" />
                        <span>良好</span>
                      </span>
                    ) : node.status === 'slow' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 border border-amber-200">
                        <AlertTriangle className="h-3 w-3" />
                        <span>拥堵</span>
                      </span>
                    ) : isTimeout ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold text-rose-700 border border-rose-200">
                        <XCircle className="h-3 w-3" />
                        <span>超时</span>
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs font-mono">--</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
