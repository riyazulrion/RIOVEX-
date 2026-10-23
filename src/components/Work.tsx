import React, { useState, useEffect, useRef } from 'react';
import { Upload, Maximize2 } from 'lucide-react';
import { WORK_ITEMS } from '../data/portfolioData.ts';
import { WorkItem } from '../types/portfolio.ts';
import WorkVisualRenderer from './WorkVisualRenderer.tsx';
import WorkModal from './WorkModal.tsx';
import { getSavedMedia, saveMedia } from '../utils/portfolioUtils.ts';

interface Props {
  onShowToast: (msg: string) => void;
}

export default function Work({ onShowToast }: Props) {
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [customMediaMap, setCustomMediaMap] = useState<Record<string, string | null>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const map: Record<string, string | null> = {};
    WORK_ITEMS.forEach((item) => {
      map[item.id] = getSavedMedia(item.id);
    });
    setCustomMediaMap(map);
  }, []);

  const handleMediaUpdated = (itemId: string, newUrl: string | null) => {
    setCustomMediaMap((prev) => ({
      ...prev,
      [itemId]: newUrl,
    }));
  };

  const handleCardQuickUpload = (itemId: string, itemTitle: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      onShowToast('File exceeds 8MB. Paste direct image URL recommended.');
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const success = saveMedia(itemId, dataUrl);
      if (success) {
        handleMediaUpdated(itemId, dataUrl);
        onShowToast(`Updated artwork for "${itemTitle}".`);
      } else {
        onShowToast('Storage full. Please paste an image URL instead.');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="work" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#222222]">
      {/* Section Mono Label with 02 / WORK */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase">
          <span className="text-[#F2F2F2] font-semibold">02</span>
          <span className="text-[#444]">/</span>
          <span>WORK</span>
          <span className="text-[#333]">//</span>
          <span>PORTFOLIO</span>
        </div>
        <div className="font-mono text-[11px] text-[#666] tracking-[0.18em] uppercase">
          [ 05 ARCHIVED POSTERS &amp; ADS ]
        </div>
      </div>

      {/* Heading with line mask and Instrument Serif italic "speak." */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F2F2F2] tracking-[-0.04em] uppercase leading-[0.9]">
          <span className="line-mask-wrapper">
            <span className="line-slide-up">
              DESIGNS THAT{' '}
              <span className="font-accent lowercase italic font-normal text-[#F2F2F2] tracking-normal">
                speak.
              </span>
            </span>
          </span>
        </h2>
        <p className="font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] max-w-md uppercase paragraph-fade-in">
          COMMERCIAL PRODUCT ADS, MOVIE-STYLE POSTERS &amp; SPORTS VISUALS. CLICK ANY CARD FOR FULLSCREEN PREVIEW.
        </p>
      </div>

      {/* Grid of Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WORK_ITEMS.map((item) => {
          const customMedia = customMediaMap[item.id];

          return (
            <div
              key={item.id}
              className="group studio-card rounded-[4px] border border-[#222222] hover:border-[#444444] bg-[#111111] overflow-hidden transition-all duration-200 flex flex-col justify-between"
            >
              {/* Large Image Area */}
              <div
                className="relative overflow-hidden cursor-pointer aspect-[3/4] bg-[#0A0A0A] border-b border-[#222222] flex items-center justify-center"
                onClick={() => setSelectedItem(item)}
              >
                <div className="w-full h-full transform transition-transform duration-300 group-hover:scale-[1.02]">
                  <WorkVisualRenderer item={item} customMediaUrl={customMedia} />
                </div>

                {/* Top Overlay Badge: Number & Tag in 1px thin border */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="font-mono text-[11px] font-bold text-[#F2F2F2] bg-[#0A0A0A]/90 border border-[#222222] px-2 py-0.5 rounded-[2px] tracking-[0.18em]">
                    {item.num}
                  </span>
                  <span className="font-mono text-[11px] font-medium text-[#8A8A8A] bg-[#0A0A0A]/90 border border-[#222222] px-2 py-0.5 rounded-[2px] tracking-[0.18em] uppercase">
                    {item.tag}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#0A0A0A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 pointer-events-none">
                  <span className="font-mono text-xs font-bold text-[#F2F2F2] bg-[#111111] border border-[#333333] px-3.5 py-1.5 rounded-[2px] flex items-center gap-1.5 uppercase tracking-[0.12em]">
                    <Maximize2 className="w-3.5 h-3.5" />
                    PREVIEW
                  </span>
                </div>
              </div>

              {/* Card Meta & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category tag */}
                  <span className="font-mono text-[10px] text-[#666] uppercase tracking-[0.18em] block mb-2">
                    {item.tag} // {item.category}
                  </span>

                  {/* Title in Space Grotesk uppercase */}
                  <h3
                    onClick={() => setSelectedItem(item)}
                    className="font-heading text-lg sm:text-xl font-bold text-[#F2F2F2] hover:text-white transition-colors cursor-pointer flex items-center justify-between tracking-[-0.04em]"
                  >
                    <span>{item.title}</span>
                    <span className="font-mono text-xs text-[#555] group-hover:text-[#F2F2F2] transition-colors">
                      ↗
                    </span>
                  </h3>

                  {/* One-line Description in Inter gray */}
                  <p className="font-body mt-2.5 text-[13px] text-[#8A8A8A] leading-[1.6] line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Action Bar: Expand & Replace (mono 12px, letter-spacing 0.12em) */}
                <div className="mt-5 pt-4 border-t border-[#1c1c1c] flex items-center gap-2">
                  <input
                    type="file"
                    ref={(el) => {
                      fileInputRefs.current[item.id] = el;
                    }}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleCardQuickUpload(item.id, item.title, e)}
                  />

                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="flex-1 font-mono text-xs font-bold tracking-[0.12em] uppercase bg-[#181818] hover:bg-[#F2F2F2] text-[#F2F2F2] hover:text-[#0A0A0A] border border-[#262626] hover:border-[#F2F2F2] py-2.5 rounded-[2px] transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>EXPAND</span>
                    <span>→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[item.id]?.click()}
                    className="font-mono text-xs font-semibold tracking-[0.12em] uppercase bg-transparent hover:bg-[#181818] text-[#8A8A8A] hover:text-[#F2F2F2] border border-[#262626] py-2.5 px-3 rounded-[2px] transition-all duration-150 flex items-center gap-1 cursor-pointer"
                    title="Upload replacement image"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>REPLACE</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clean Fullscreen / Modal Preview */}
      {selectedItem && (
        <WorkModal
          item={selectedItem}
          customMediaUrl={customMediaMap[selectedItem.id] || null}
          onClose={() => setSelectedItem(null)}
          onMediaUpdated={handleMediaUpdated}
          onShowToast={onShowToast}
        />
      )}
    </section>
  );
}
