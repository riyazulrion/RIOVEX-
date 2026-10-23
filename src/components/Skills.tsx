import React from 'react';
import { SKILL_ROWS } from '../data/portfolioData.ts';
import type { SkillRow } from '../types/portfolio.ts';

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#222222]">
      {/* Section Mono Label with 03 / CAPABILITIES */}
      <div className="flex items-center gap-3 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase mb-4">
        <span className="text-[#F2F2F2] font-semibold">03</span>
        <span className="text-[#444]">/</span>
        <span>CAPABILITIES</span>
        <span className="text-[#333]">//</span>
        <span>CORE DISCIPLINES</span>
      </div>

      {/* Heading with line mask and Instrument Serif italic "do." */}
      <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F2F2F2] tracking-[-0.04em] uppercase leading-[0.9] mb-12">
        <span className="line-mask-wrapper">
          <span className="line-slide-up">
            WHAT I{' '}
            <span className="font-accent lowercase italic font-normal text-[#F2F2F2] tracking-normal text-[1.15em]">
              do.
            </span>
          </span>
        </span>
      </h2>

      {/* Numbered rows separated by thin lines (not cards) */}
      <div className="border-t border-[#222222]">
        {SKILL_ROWS.map((skill: SkillRow) => (
          <div
            key={skill.num}
            className="group py-6 sm:py-7 px-4 sm:px-6 border-b border-[#222222] hover:bg-[#141414] transition-colors duration-150 flex items-center justify-between cursor-default"
          >
            {/* Number and Skill Name */}
            <div className="flex items-baseline gap-6 sm:gap-10">
              <span className="font-mono text-xs sm:text-[13px] font-normal text-[#8A8A8A] group-hover:text-[#22C55E] tracking-[0.18em] transition-colors duration-150">
                {skill.num}
              </span>
              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#F2F2F2] tracking-[-0.04em] uppercase group-hover:text-white group-hover:translate-x-2 transition-all duration-200">
                {skill.title}
              </h3>
            </div>

            {/* Hover arrow - appears on hover */}
            <div className="font-mono text-base text-[#F2F2F2] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-150">
              →
            </div>
          </div>
        ))}
      </div>

      {/* Below the list, a mono line: "TOOLS: CANVA // AFFINITY // AI VIDEO TOOLS" */}
      <div className="mt-8 pt-4 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase">
        <span>TOOLS: </span>
        <span className="text-[#F2F2F2] font-semibold">CANVA // AFFINITY // AI VIDEO TOOLS</span>
      </div>
    </section>
  );
}
