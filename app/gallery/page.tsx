"use client";

import React, { useState } from "react";
import { Sparkles, Heart, X, Download, ZoomIn, Check } from "lucide-react";

const galleryImages = [
  { src: "/gallery/retro-cat-girl.jpg", title: "复古猫耳少女", tag: "90s Anime" },
  { src: "/gallery/cozy-cafe-girl.png", title: "温暖午后咖啡厅", tag: "Cozy Aesthetic" },
  { src: "/gallery/sunset.jpg", title: "橘红落日海天", tag: "Sunset" },
  { src: "/gallery/cyberpunk-girl.png", title: "角色设定画 · 雪 (Yuki)", tag: "Character Sheet" },
  { src: "/gallery/cafe-milk-tea.png", title: "香醇奶茶日常", tag: "Daily Life" },
  { src: "/gallery/90s-retro-cat-girl.png", title: "90年代怀旧胶片", tag: "Film Grain" }
];

export default function GalleryPage() {
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [activeImage, setActiveImage] = useState<{ src: string; title: string; tag: string } | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const toggleLike = (idx: number, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => {
      const next = !prev[idx];
      showToast(next ? `❤️ 已将《${title}》收藏到您的喜欢！` : `已取消收藏《${title}》`);
      return { ...prev, [idx]: next };
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 relative">
      {/* Toast 提示 */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-[9999] flex items-center gap-2 rounded-2xl border-2 border-pink-400 bg-white/95 px-4 py-3 text-sm font-black text-pink-600 shadow-2xl backdrop-blur-xl animate-in fade-in">
          <Check className="h-4 w-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-saas-card mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              🖼️ 治愈系图库 (90s Retro Aesthetic)
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              精选柔和粉调与复古日漫美学原画壁纸 · 点击任意图片查看高清大图
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImage(img)}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-saas-card hover:shadow-saas-hover transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-64 w-full overflow-hidden bg-slate-100">
              <img
                src={img.src}
                alt={img.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <span className="flex items-center gap-1.5 rounded-xl bg-black/60 px-3 py-1.5 text-xs font-bold backdrop-blur-md">
                  <ZoomIn className="h-4 w-4" /> 查看大图
                </span>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 group-hover:text-pink-600 transition-colors">
                  {img.title}
                </h3>
                <span className="text-[10px] font-mono font-bold text-pink-500">{img.tag}</span>
              </div>
              <button
                onClick={e => toggleLike(idx, img.title, e)}
                className={`rounded-full p-2.5 transition-all cursor-pointer ${
                  likes[idx]
                    ? "bg-pink-500 text-white shadow-md shadow-pink-500/30 scale-110"
                    : "bg-pink-50 text-pink-400 hover:bg-pink-100 hover:text-pink-600"
                }`}
                title={likes[idx] ? "已喜欢" : "点赞收藏"}
              >
                <Heart className={`h-4 w-4 ${likes[idx] ? "fill-white" : ""}`} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 高清大图预览弹窗 (Lightbox) */}
      {activeImage && (
        <div 
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-in fade-in"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="relative max-w-2xl w-full rounded-3xl overflow-hidden bg-white shadow-2xl animate-in zoom-in-95"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 cursor-pointer backdrop-blur-sm"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative max-h-[70vh] w-full bg-slate-900 flex items-center justify-center">
              <img
                src={activeImage.src}
                alt={activeImage.title}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            <div className="p-5 flex items-center justify-between bg-white border-t border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">{activeImage.title}</h3>
                <span className="text-xs font-mono font-bold text-pink-500">{activeImage.tag}</span>
              </div>

              <a
                href={activeImage.src}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-pink-500 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-pink-600 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>保存原图壁纸</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
