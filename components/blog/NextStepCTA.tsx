"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { NextStepAction } from "@/lib/topics";

interface Props {
  action: NextStepAction;
}

export default function NextStepCTA({ action }: Props) {
  return (
    <div className="my-10 rounded-3xl border border-brand-200 bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-pink-50/80 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100/80 px-3 py-1 text-[11px] font-bold text-brand-700 mb-3">
            <Compass className="h-3.5 w-3.5" />
            <span>下一步行动指引 (Next Step)</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
            {action.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            {action.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
          <Link
            href={action.buttonUrl}
            className="flex items-center justify-center gap-1.5 rounded-2xl bg-brand-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 active:scale-95 transition-all text-center cursor-pointer"
          >
            <span>{action.buttonText}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {action.secondaryUrl && action.secondaryText && (
            <Link
              href={action.secondaryUrl}
              className="flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all text-center cursor-pointer"
            >
              <span>{action.secondaryText}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
