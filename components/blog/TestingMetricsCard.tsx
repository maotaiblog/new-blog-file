"use client";

import React from "react";
import Link from "next/link";
import { Activity, ShieldAlert, CheckCircle2, FileText } from "lucide-react";

interface Props {
  isAirportReview?: boolean;
}

export default function TestingMetricsCard({ isAirportReview }: Props) {
  if (!isAirportReview) return null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-brand-600" />
          <span className="text-xs font-bold text-slate-900">实测基准与测试环境声明</span>
        </div>
        <Link
          href="/whitepaper/airport-evaluation-methodology"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:underline"
        >
          <FileText className="h-3 w-3" />
          <span>参考《机场评测白皮书方法论》</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-mono block">测试探针网络</span>
          <span className="font-bold text-slate-800">中国电信/联通 1000M</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-mono block">主要协议验证</span>
          <span className="font-bold text-slate-800">VLESS / Trojan / SS</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-mono block">测试时间窗口</span>
          <span className="font-bold text-slate-800">晚高峰 20:00 - 23:00</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-mono block">流媒体与AI审计</span>
          <span className="font-bold text-emerald-600">双向原生解锁验证</span>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
        * 本文数据基于猫太评测团队在特定网络与时间窗口下的抽样实测记录，并结合服务商官方公开参数整理。缺少第三方可验证测试来源的指标一律标为<strong>【待验证/暂无实测】</strong>，杜绝示例数据写成实时实测。实际网络质量受本地宽带与运营商路由影响，建议先选月付试用。
      </p>
    </div>
  );
}
