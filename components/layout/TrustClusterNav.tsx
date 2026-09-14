import React from "react";
import Link from "next/link";
import { ShieldCheck, BookOpen, Scale, Mail, Info } from "lucide-react";

export default function TrustClusterNav({ current }: { current: "about" | "editorial" | "methodology" | "whitepaper" | "contact" }) {
  const items = [
    { id: "about", name: "关于本站", href: "/about/", icon: Info },
    { id: "editorial", name: "独立编辑准则", href: "/editorial-policy/", icon: Scale },
    { id: "methodology", name: "评测方法论", href: "/methodology/", icon: BookOpen },
    { id: "whitepaper", name: "评分白皮书", href: "/whitepaper/", icon: ShieldCheck },
    { id: "contact", name: "联系与复核", href: "/contact/", icon: Mail },
  ];

  return (
    <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <div className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
        Trust & Transparency Cluster (信任与透明度矩阵)
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === current;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-white text-brand-600 shadow-sm border border-slate-200"
                  : "text-slate-600 hover:text-brand-600 hover:bg-white/60"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
