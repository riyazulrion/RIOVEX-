import React, { useState, useEffect, useRef } from 'react';
import { Upload, Maximize2 } from 'lucide-react';
import { WORK_ITEMS } from '../data/portfolioData.ts';
import { WorkItem, SkillRow } from '../types/portfolio.ts';
import WorkVisualRenderer from './WorkVisualRenderer.tsx';
import WorkModal from './WorkModal.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import {
  getSavedMedia,
  saveMedia,
  filterWorkItems,
  filterWorkItemsBySkill,
  getMatchingCategoryFilterForSkill,
  type WorkFilter,
} from '../utils/portfolioUtils.ts';

interface Props {
  onShowToast: (msg: string) => void;
  activeSkillFilter?: SkillRow | null;
  onClearSkillFilter?: () => void;
}

export default function Work({
  onShowToast,
  activeSkillFilter = null,
  onClearSkillFilter,
}: Props) {
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<WorkFilter>('ALL');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [customMediaMap, setCustomMediaMap] = useState<Record<string, string | null>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const { t, getWorkItemMeta, getSkillTitle } = useLanguage();

  const matchingCategory = activeSkillFilter
    ? getMatchingCategoryFilterForSkill(activeSkillFilter.num)
    : null;

  const currentHighlightedFilter = activeSkillFilter
    ? matchingCategory
    : activeCategoryFilter;

  const filteredItems = activeSkillFilter
    ? filterWorkItemsBySkill(WORK_ITEMS, activeSkillFilter.num)
    : filterWorkItems(WORK_ITEMS, activeCategoryFilter);

  const handleSelectCategory = (category: WorkFilter) => {
    onClearSkillFilter?.();
    setActiveCategoryFilter(category);
  };

  const handleClearSkillFilter = () => {
    onClearSkillFilter?.();
    setActiveCategoryFilter('ALL');
  };

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
      saveMedia(itemId, dataUrl);
      handleMediaUpdated(itemId, dataUrl);
      onShowToast(`${t.toast.updatedArtwork} "${itemTitle}".`);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="work" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#222222]">
      {/* Section Mono Label with 02 / WORK */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase">
          <span className="text-[#F2F2F2] font-semibold">{t.work.num}</span>
          <span className="text-[#444]">/</span>
          <span>{t.work.label}</span>
          <span className="text-[#333]">//</span>
          <span>{t.work.sublabel}</span>
        </div>
        <div className="font-mono text-[11px] text-[#666] tracking-[0.18em] uppercase">
          [ {String(WORK_ITEMS.length).padStart(2, '0')} {t.work.archived} ]
        </div>
      </div>

      {/* Heading with line mask in bold uppercase Space Grotesk */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F2F2F2] tracking-[-0.04em] uppercase leading-[0.9]">
          <span className="line-mask-wrapper">
            <span className="line-slide-up">
              {t.work.heading}
            </span>
          </span>
        </h2>
        <p className="font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] max-w-md uppercase paragraph-fade-in">
          {t.work.subtext}
        </p>
      </div>

      {/* Filter Bar in mono style: ALL / POSTERS / ADS / LOGOS / VIDEOS */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#222222]">
        <div className="flex items-center gap-1 sm:gap-2 font-mono text-[11px] tracking-[0.18em] uppercase">
          {(['ALL', 'POSTERS', 'ADS', 'LOGOS', 'VIDEOS'] as const).map((filterName, idx) => {
            const isActive = currentHighlightedFilter === filterName;
            const filterLabel = t.work.filters[filterName];

            return (
              <React.Fragment key={filterName}>
                <button
                  type="button"
                  onClick={() => handleSelectCategory(filterName)}
                  className={`px-3 py-1.5 rounded-[2px] transition-all cursor-pointer font-mono text-[11px] tracking-[0.18em] uppercase ${
                    isActive
                      ? 'bg-[#F2F2F2] text-[#0A0A0A] font-bold border border-[#F2F2F2]'
                      : 'text-[#8A8A8A] hover:text-[#F2F2F2] hover:bg-[#181818] border border-transparent'
                  }`}
                  aria-pressed={isActive}
                >
                  {filterLabel}
                </button>
                {idx < 4 && <span className="text-[#333333] select-none">/</span>}
              </React.Fragment>
            );
          })}
        </div>

        <div className="font-mono text-[11px] text-[#666666] tracking-[0.18em] uppercase">
          [ {String(filteredItems.length).padStart(2, '0')} {t.work.shown} ]
        </div>
      </div>

      {/* Active Skill Filter Status Line with CLEAR button */}
      {activeSkillFilter && (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 mb-8 bg-[#111111] border border-[#262626] rounded-[2px] font-mono text-xs tracking-[0.14em] uppercase animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-[#F2F2F2]">
            <span className="text-[#22C55E] animate-pulse">●</span>
            <span>
              {t.work.showing}{' '}
              <span className="font-bold">
                {getSkillTitle(activeSkillFilter.num, activeSkillFilter.title).toUpperCase()}
              </span>
            </span>
            <span className="text-[#8A8A8A]">[ {filteredItems.length} ]</span>
          </div>

          <button
            type="button"
            onClick={handleClearSkillFilter}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-[#F2F2F2] hover:text-[#0A0A0A] bg-[#181818] hover:bg-[#F2F2F2] border border-[#333333] hover:border-[#F2F2F2] rounded-[2px] transition-all cursor-pointer"
            aria-label="Clear filter"
          >
            <span>{t.work.clear}</span>
            <span className="text-xs">×</span>
          </button>
        </div>
      )}

      {/* Grid of Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const customMedia = customMediaMap[item.id];
          const isVideoItem =
            item.tag === '[AI VIDEO]' ||
            item.category === 'AI VIDEO' ||
            item.defaultImage.endsWith('.mp4');

          const meta = getWorkItemMeta(item.id);
          const displayTitle = meta?.title || item.title;
          const displayTag = meta?.tag || item.tag;
          const displayCategory = meta?.category || item.category;
          const displayDescription = meta?.description || item.description;

          const localizedItem: WorkItem = {
            ...item,
            title: displayTitle,
            tag: displayTag,
            category: displayCategory,
            description: displayDescription,
          };

          return (
            <div
              key={item.id}
              data-skills={item.skills.join(' ')}
              onMouseEnter={() => setHoveredCardId(item.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="group studio-card rounded-[4px] border border-[#222222] hover:border-[#444444] bg-[#111111] overflow-hidden transition-all duration-300 ease-out flex flex-col justify-between animate-in fade-in zoom-in-95 hover:scale-[1.01]"
            >
              {/* Large Image Area: 4:5 portrait card */}
              <div
                className="relative overflow-hidden cursor-pointer aspect-[4/5] bg-[#111111] border-b border-[#222222] flex items-center justify-center p-3 sm:p-4"
                onClick={() => setSelectedItem(localizedItem)}
              >
                <div className="w-full h-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-[1.02]">
                  <WorkVisualRenderer
                    item={item}
                    customMediaUrl={customMedia}
                    isCardHovered={hoveredCardId === item.id}
                  />
                </div>

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-bold text-[#F2F2F2] bg-[#0A0A0A]/90 border border-[#222222] px-2 py-0.5 rounded-[2px] tracking-[0.18em]">
                      {item.num}
                    </span>
                    {isVideoItem && (
                      <span className="font-mono text-[10px] font-bold text-[#22C55E] bg-[#0A0A0A]/95 border border-[#222222] px-2 py-0.5 rounded-[2px] tracking-[0.15em] flex items-center gap-1 uppercase">
                        <span className="text-[8px]">▶</span>
                        <span>{t.work.videoTag}</span>
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[11px] font-medium text-[#8A8A8A] bg-[#0A0A0A]/90 border border-[#222222] px-2 py-0.5 rounded-[2px] tracking-[0.18em] uppercase">
                    {displayTag}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#0A0A0A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="font-mono text-xs font-bold text-[#F2F2F2] bg-[#111111]/95 border border-[#333333] px-4 py-2 rounded-[2px] flex items-center gap-2 uppercase tracking-[0.15em] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>{t.work.viewProject}</span>
                    <span className="text-[#8A8A8A]">→</span>
                  </span>
                </div>
              </div>

              {/* Card Meta & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category tag */}
                  <span className="font-mono text-[10px] text-[#666] uppercase tracking-[0.18em] block mb-2">
                    {displayTag} // {displayCategory}
                  </span>

                  {/* Title in Space Grotesk uppercase */}
                  <h3
                    onClick={() => setSelectedItem(localizedItem)}
                    className="font-heading text-lg sm:text-xl font-bold text-[#F2F2F2] hover:text-white transition-colors cursor-pointer flex items-center justify-between gap-3 tracking-[-0.04em]"
                  >
                    <span>{displayTitle}</span>
                    <span className="text-xs font-mono text-[#8A8A8A] group-hover:text-[#22C55E] group-hover:translate-x-1 transition-all">
                      ↗
                    </span>
                  </h3>

                  {/* Description in Inter regular */}
                  <p className="mt-2.5 font-body text-xs sm:text-[13px] text-[#8A8A8A] leading-[1.6] line-clamp-2">
                    {displayDescription}
                  </p>
                </div>

                {/* Bottom Card Actions */}
                <div className="mt-5 pt-4 border-t border-[#1C1C1C] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(localizedItem)}
                    className="font-mono text-[11px] font-bold text-[#8A8A8A] hover:text-[#F2F2F2] flex items-center gap-1.5 transition-colors uppercase tracking-[0.12em] cursor-pointer"
                  >
                    <span>{t.work.viewProject}</span>
                    <span className="text-[#22C55E]">→</span>
                  </button>

                  {/* Quick Replace Trigger */}
                  <div className="relative">
                    <input
                      type="file"
                      ref={(el) => {
                        fileInputRefs.current[item.id] = el;
                      }}
                      onChange={(e) => handleCardQuickUpload(item.id, displayTitle, e)}
                      accept={isVideoItem ? 'video/mp4,video/*' : 'image/*'}
                      className="hidden"
                      aria-label={`Replace media for ${displayTitle}`}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[item.id]?.click()}
                      className="font-mono text-[10px] font-semibold text-[#666] hover:text-[#F2F2F2] bg-[#161616] hover:bg-[#222222] border border-[#262626] hover:border-[#444] px-2.5 py-1.5 rounded-[2px] transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                      title={isVideoItem ? t.work.quickUploadVideo : t.work.quickUploadImage}
                    >
                      <Upload className="w-3 h-3" />
                      <span className="hidden sm:inline">
                        {isVideoItem ? t.work.quickUploadVideo : t.work.quickUploadImage}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Artwork/Video Modal Preview */}
      <WorkModal
        item={selectedItem}
        customMediaUrl={selectedItem ? customMediaMap[selectedItem.id] || null : null}
        onClose={() => setSelectedItem(null)}
        onMediaUpdated={handleMediaUpdated}
        onShowToast={onShowToast}
      />
    </section>
  );
}
