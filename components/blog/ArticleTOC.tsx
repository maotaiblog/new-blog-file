"use client";

import React, { useState } from "react";
import { ListTree, ChevronDown } from "lucide-react";
import { HeadingItem } from "@/lib/posts";

interface Props {
  headings: HeadingItem[];
}

export default function ArticleTOC({ headings }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  if (!headings || headings.length === 0) return null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-xs font-black uppercase tracking-wider text-slate-700 hover:text-brand-600 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <ListTree className="h-4 w-4 text-brand-600" />
          <span>文章目录导览 (Table of Contents)</span>
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <nav className="mt-3 space-y-1 pt-3 border-t border-slate-200/60 animate-in fade-in">
          {headings.map((h, i) => (
            <a
              key={i}
              href={`#${h.id}`}
              className={`block text-xs text-slate-600 hover:text-brand-600 hover:underline py-1 transition-colors leading-relaxed ${
                h.level === 3 ? "pl-4 text-slate-500" : "font-bold text-slate-800"
              }`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
