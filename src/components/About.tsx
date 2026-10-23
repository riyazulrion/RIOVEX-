import React from 'react';
import { ABOUT_DATA } from '../data/portfolioData.ts';

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#222222]">
      {/* Section Mono Label with 01 / ABOUT */}
      <div className="flex items-center gap-3 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase mb-4">
        <span className="text-[#F2F2F2] font-semibold">01</span>
        <span className="text-[#444]">/</span>
        <span>ABOUT</span>
      </div>

      {/* Big Heading with line mask and Instrument Serif italic "intent." */}
      <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F2F2F2] tracking-[-0.04em] uppercase leading-[0.9] mb-10">
        <span className="line-mask-wrapper">
          <span className="line-slide-up">
            DESIGN WITH{' '}
            <span className="font-accent lowercase italic font-normal text-[#F2F2F2] tracking-normal text-[1.15em]">
              intent.
            </span>
          </span>
        </span>
      </h2>

      {/* Editorial Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Bio (Inter 400, 16px to 18px, line-height 1.7, color #A1A1A1, max-width 520px) */}
        <div className="lg:col-span-7">
          <p className="font-body text-base sm:text-[17px] text-[#A1A1A1] font-normal leading-[1.7] max-w-[520px] paragraph-fade-in">
            {ABOUT_DATA.bio}
          </p>

          <div className="mt-8 pt-6 border-t border-[#222222] flex flex-wrap items-center gap-8 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase">
            <div>
              <span className="block text-[#555] text-[10px]">FOUNDER &amp; DESIGNER</span>
              <span className="text-[#F2F2F2] font-medium">RIYAZUL HASAN RION</span>
            </div>
            <div>
              <span className="block text-[#555] text-[10px]">STUDIO BRAND</span>
              <span className="text-[#F2F2F2] font-medium">RIOVEX</span>
            </div>
            <div>
              <span className="block text-[#555] text-[10px]">ORIGIN</span>
              <span className="text-[#F2F2F2] font-medium">BANGLADESH</span>
            </div>
          </div>
        </div>

        {/* Right Column: Studio Metadata Specifications */}
        <div className="lg:col-span-5 studio-card p-6 rounded-[4px] border border-[#222222] bg-[#111111] space-y-4">
          <span className="font-mono text-[10px] text-[#8A8A8A] tracking-[0.18em] uppercase block pb-3 border-b border-[#222222]">
            // STUDIO DIRECTORY SPECIFICATIONS
          </span>

          <div className="space-y-3 font-mono text-[11px] tracking-[0.12em]">
            {ABOUT_DATA.studioDetails.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-[#1c1c1c]">
                <span className="text-[#666] uppercase text-[10px] tracking-[0.18em]">{item.label}</span>
                <span className="text-[#F2F2F2] font-medium uppercase">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[10px] font-mono tracking-[0.18em] text-[#666] uppercase leading-relaxed">
            FOCUSED ON IMPACTFUL PRODUCT ADVERTISING, BOLD BRAND IDENTITY &amp; EDITORIAL MOVIE AESTHETICS.
          </div>
        </div>
      </div>
    </section>
  );
}
