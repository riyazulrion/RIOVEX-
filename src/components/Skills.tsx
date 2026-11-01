import React from 'react';
import { SKILL_ROWS } from '../data/portfolioData.ts';
import type { SkillRow } from '../types/portfolio.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface Props {
  onSelectSkill: (skill: SkillRow) => void;
  activeSkillNum?: string | null;
}

export default function Skills({ onSelectSkill, activeSkillNum }: Props) {
  const { t, getSkillTitle } = useLanguage();

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#222222]">
      {/* Section Mono Label with 03 / CAPABILITIES */}
      <div className="flex items-center gap-3 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase mb-4">
        <span className="text-[#F2F2F2] font-semibold">{t.skills.num}</span>
        <span className="text-[#444]">/</span>
        <span>{t.skills.label}</span>
        <span className="text-[#333]">//</span>
        <span>{t.skills.sublabel}</span>
      </div>

      {/* Heading with line mask in bold uppercase Space Grotesk */}
      <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F2F2F2] tracking-[-0.04em] uppercase leading-[0.9] mb-12">
        <span className="line-mask-wrapper">
          <span className="line-slide-up">
            {t.skills.heading}
          </span>
        </span>
      </h2>

      {/* Numbered rows separated by thin lines (clickable) */}
      <div className="border-t border-[#222222]">
        {SKILL_ROWS.map((skill: SkillRow) => {
          const isActive = activeSkillNum === skill.num;
          const localizedTitle = getSkillTitle(skill.num, skill.title);

          return (
            <div
              key={skill.num}
              role="button"
              tabIndex={0}
              onClick={() => onSelectSkill({ ...skill, title: localizedTitle })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectSkill({ ...skill, title: localizedTitle });
                }
              }}
              className={`group py-6 sm:py-7 px-4 sm:px-6 border-b border-[#222222] hover:bg-[#141414] transition-colors duration-150 flex items-center justify-between cursor-pointer ${
                isActive ? 'bg-[#141414]' : ''
              }`}
            >
              {/* Number and Skill Name */}
              <div className="flex items-baseline gap-6 sm:gap-10">
                <span className={`font-mono text-xs sm:text-[13px] font-normal tracking-[0.18em] transition-colors duration-150 ${
                  isActive ? 'text-[#22C55E]' : 'text-[#8A8A8A] group-hover:text-[#22C55E]'
                }`}>
                  {skill.num}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#F2F2F2] tracking-[-0.04em] uppercase group-hover:text-white group-hover:translate-x-2 transition-all duration-200">
                  {localizedTitle}
                </h3>
              </div>

              {/* VIEW WORK ↗ Mono Label: on hover on desktop, always visible on mobile */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase text-[#8A8A8A] group-hover:text-[#0A0A0A] group-hover:bg-[#F2F2F2] border border-[#2a2a2a] group-hover:border-[#F2F2F2] px-2.5 py-1 rounded-[2px] transition-all duration-150 flex items-center gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100">
                  <span>{t.skills.viewWork}</span>
                  <span className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#22C55E] group-hover:text-[#0A0A0A]">
                    ↗
                  </span>
                </span>
                <span className="font-mono text-base text-[#F2F2F2] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-150 hidden sm:inline-block">
                  →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Below the list, a mono line: "TOOLS: CANVA // AFFINITY // AI VIDEO TOOLS" */}
      <div className="mt-8 pt-4 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase">
        <span>{t.skills.toolsPrefix}</span>
        <span className="text-[#F2F2F2] font-semibold">{t.skills.toolsList}</span>
      </div>
    </section>
  );
}
