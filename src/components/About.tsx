import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#222222]">
      {/* Section Mono Label with 01 / ABOUT */}
      <div className="flex items-center gap-3 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase mb-4">
        <span className="text-[#F2F2F2] font-semibold">{t.about.num}</span>
        <span className="text-[#444]">/</span>
        <span>{t.about.label}</span>
      </div>

      {/* Big Heading with line mask in bold uppercase Space Grotesk */}
      <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F2F2F2] tracking-[-0.04em] uppercase leading-[0.9] mb-10">
        <span className="line-mask-wrapper">
          <span className="line-slide-up">
            {t.about.heading}
          </span>
        </span>
      </h2>

      {/* Editorial Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Bio */}
        <div className="lg:col-span-7">
          <p className="font-body text-base sm:text-[17px] text-[#A1A1A1] font-normal leading-[1.7] max-w-[520px] paragraph-fade-in">
            {t.about.bio}
          </p>

          <div className="mt-8 pt-6 border-t border-[#222222] flex flex-wrap items-center gap-8 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase">
            <div>
              <span className="block text-[#555] text-[10px]">{t.about.founderLabel}</span>
              <span className="text-[#F2F2F2] font-medium">{t.about.founderVal}</span>
            </div>
            <div>
              <span className="block text-[#555] text-[10px]">{t.about.studioLabel}</span>
              <span className="text-[#F2F2F2] font-medium">{t.about.studioVal}</span>
            </div>
            <div>
              <span className="block text-[#555] text-[10px]">{t.about.originLabel}</span>
              <span className="text-[#F2F2F2] font-medium">{t.about.originVal}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Studio Metadata Specifications */}
        <div className="lg:col-span-5 studio-card p-6 rounded-[4px] border border-[#222222] bg-[#111111] space-y-4">
          <span className="font-mono text-[10px] text-[#8A8A8A] tracking-[0.18em] uppercase block pb-3 border-b border-[#222222]">
            {t.about.specsTitle}
          </span>

          <div className="space-y-3 font-mono text-[11px] tracking-[0.12em]">
            <div className="flex items-center justify-between py-1.5 border-b border-[#1c1c1c]">
              <span className="text-[#666] uppercase text-[10px] tracking-[0.18em]">{t.about.roleLabel}</span>
              <span className="text-[#F2F2F2] font-medium uppercase">{t.about.roleVal}</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-[#1c1c1c]">
              <span className="text-[#666] uppercase text-[10px] tracking-[0.18em]">{t.about.studioLabel}</span>
              <span className="text-[#F2F2F2] font-medium uppercase">{t.about.studioVal}</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-[#1c1c1c]">
              <span className="text-[#666] uppercase text-[10px] tracking-[0.18em]">{t.about.originLabel}</span>
              <span className="text-[#F2F2F2] font-medium uppercase">{t.about.originVal}</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-[#1c1c1c]">
              <span className="text-[#666] uppercase text-[10px] tracking-[0.18em]">{t.about.focusLabel}</span>
              <span className="text-[#F2F2F2] font-medium uppercase">{t.about.focusVal}</span>
            </div>
          </div>

          <div className="pt-2 text-[10px] font-mono tracking-[0.18em] text-[#666] uppercase leading-relaxed">
            {t.about.footerText}
          </div>
        </div>
      </div>
    </section>
  );
}
