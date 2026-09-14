"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { RelatedTool } from "@/lib/topics";

interface Props {
  tools: RelatedTool[];
}

export default function RelatedToolsCard({ tools }: Props) {
  if (!tools || tools.length === 0) return null;

  return (
    <div className="my-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-brand-600">
          <Wrench className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-base font-black text-slate-900">推荐关联网络诊断工具</h3>
          <p className="text-xs text-slate-500 font-medium">配合本文内容实时探测本地与出口链路健康度</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tools.map(tool => (
          <Link
            key={tool.id}
            href={tool.url}
            className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4 hover:border-brand-200 hover:bg-white hover:shadow-md transition-all cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{tool.icon}</span>
                <span className="rounded-full bg-slate-200/70 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                  {tool.badge}
                </span>
              </div>
              <h4 className="text-xs font-black text-slate-900 group-hover:text-brand-600 transition-colors">
                {tool.name}
              </h4>
              <p className="mt-1 text-[11px] text-slate-500 leading-relaxed font-medium">
                {tool.description}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform">
              <span>立即运行</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
