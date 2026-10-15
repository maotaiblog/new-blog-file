"use client";

import React from "react";
import Link from "next/link";
import { Activity, FileText } from "lucide-react";

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
          <span className="text-xs font-bold text-slate-900">评测数据说明与复核方法</span>
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
          <span className="text-[10px] text-slate-400 font-mono block">线路与入口</span>
          <span className="font-bold text-slate-800">以正文标注的条件为准</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-mono block">性能样本</span>
          <span className="font-bold text-slate-800">核对测试日期与时段</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-mono block">访问能力</span>
          <span className="font-bold text-slate-800">留意地区与服务版本</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-mono block">套餐信息</span>
          <span className="font-bold text-slate-800">以服务商当前页面为准</span>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
        * 本文可能同时引用服务商公开参数和特定环境下的测试样本，请以正文标出的来源、日期和条件判断每项结论。未给出测试条件或原始记录的数字不应视为可复现的长期保证；实际网络质量会随本地宽带、路由和时段变化。
      </p>
    </div>
  );
}
