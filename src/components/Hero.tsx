import React from 'react';
import { HERO_DATA } from '../data/portfolioData.ts';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Two columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          {/* Thin 1px line (40px wide) + green dot + mono label [ RIYAZUL HASAN RION // RIOVEX ] */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-[40px] h-[1px] bg-[#333333] shrink-0" aria-hidden="true" />
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0" aria-hidden="true" />
            <span className="font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase">
              {HERO_DATA.label}
            </span>
          </div>

          {/* Small gray line "GRAPHIC DESIGNER • BANGLADESH" */}
          <p className="font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase mb-6">
            {HERO_DATA.role}
          </p>

          {/* HUGE Heading: RIYAZUL HASAN in Space Grotesk + rion in Instrument Serif italic */}
          <h1
            className="font-heading font-bold uppercase leading-[0.88] tracking-[-0.04em] text-[#F2F2F2]"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)' }}
          >
            <span className="line-mask-wrapper">
              <span className="line-slide-up" style={{ animationDelay: '0.05s' }}>
                RIYAZUL
              </span>
            </span>
            <span className="line-mask-wrapper">
              <span className="line-slide-up" style={{ animationDelay: '0.15s' }}>
                HASAN
              </span>
            </span>
            <span className="line-mask-wrapper">
              <span
                className="line-slide-up font-accent lowercase italic font-normal text-[#F2F2F2] tracking-normal"
                style={{ animationDelay: '0.25s', fontSize: '1.05em' }}
              >
                rion
              </span>
            </span>
          </h1>

          {/* Tagline in Instrument Serif italic with "stop the scroll." accented in off-white */}
          <p
            className="mt-8 font-accent italic text-[#A1A1A1] leading-[1.3] max-w-xl paragraph-fade-in"
            style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)' }}
          >
            I design bold posters and ads that{' '}
            <span className="text-[#F2F2F2] not-italic font-accent italic font-normal">
              stop the scroll.
            </span>
          </p>

          {/* Buttons: "VIEW SELECTED WORK →" (filled) and "INSTAGRAM" (outlined) */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('work')}
              className="font-mono text-xs font-bold tracking-[0.12em] uppercase bg-[#F2F2F2] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2F2F2] border border-[#F2F2F2] px-6 py-4 rounded-[2px] transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>VIEW MY DESIGNS</span>
              <span>→</span>
            </button>

            <a
              href="https://www.instagram.com/riove_x"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold tracking-[0.12em] uppercase bg-transparent text-[#F2F2F2] hover:bg-[#F2F2F2] hover:text-[#0A0A0A] border border-[#333333] hover:border-[#F2F2F2] px-6 py-4 rounded-[2px] transition-all duration-150 inline-flex items-center gap-2"
            >
              <span>INSTAGRAM</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Right Column (5 cols): Bordered Card "RIOVEX STUDIO // [ ACTIVE ]" */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="studio-card p-6 sm:p-7 rounded-[4px] border border-[#222222] bg-[#111111]">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[#222222]">
              <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[#F2F2F2] uppercase">
                RIOVEX STUDIO // [ ACTIVE ]
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#22C55E] uppercase tracking-[0.18em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                ONLINE
              </span>
            </div>

            {/* Subtle Minimal Geometric Line Pattern */}
            <div className="my-5 p-4 bg-[#0A0A0A] border border-[#222222] rounded-[2px] overflow-hidden">
              <svg viewBox="0 0 320 85" className="w-full h-auto text-[#262626] stroke-current" fill="none">
                <line x1="0" y1="20" x2="320" y2="20" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="42" x2="320" y2="42" strokeWidth="1" />
                <line x1="0" y1="65" x2="320" y2="65" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="0" x2="40" y2="85" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="105" y1="0" x2="105" y2="85" strokeWidth="1" />
                <line x1="160" y1="0" x2="160" y2="85" strokeWidth="1" stroke="#333" />
                <line x1="215" y1="0" x2="215" y2="85" strokeWidth="1" />
                <line x1="280" y1="0" x2="280" y2="85" strokeWidth="1" strokeDasharray="3 3" />
                {/* Diagonal editorial accent */}
                <path d="M 40 65 L 105 42 L 160 65 L 215 20 L 280 42" stroke="#F2F2F2" strokeWidth="1.5" />
                <rect x="102" y="39" width="6" height="6" fill="#F2F2F2" />
                <rect x="212" y="17" width="6" height="6" fill="#22C55E" />
              </svg>
            </div>

            {/* Below: Two Small Mono Columns "WHAT I DESIGN" and "TOOLS" */}
            <div className="grid grid-cols-2 gap-6 pt-2">
              {/* Column 1: WHAT I DESIGN */}
              <div>
                <span className="font-mono text-[10px] font-bold text-[#F2F2F2] tracking-[0.18em] uppercase block mb-3 pb-1 border-b border-[#222222]">
                  WHAT I DESIGN
                </span>
                <ul className="space-y-2 font-mono text-[11px] text-[#8A8A8A]">
                  {HERO_DATA.whatIDesign.map((item) => (
                    <li key={item} className="hover:text-[#F2F2F2] transition-colors">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: TOOLS */}
              <div>
                <span className="font-mono text-[10px] font-bold text-[#F2F2F2] tracking-[0.18em] uppercase block mb-3 pb-1 border-b border-[#222222]">
                  TOOLS
                </span>
                <ul className="space-y-2 font-mono text-[11px] text-[#8A8A8A]">
                  {HERO_DATA.tools.map((tool, idx) => (
                    <li key={tool} className="hover:text-[#F2F2F2] transition-colors">
                      <span className="text-[#555] mr-1.5">0{idx + 1}</span>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Mono Strip */}
      <div className="mt-16 pt-5 pb-5 border-t border-b border-[#222222] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase">
        <div className="flex items-center gap-2">
          <span>STATUS</span>
          <span className="text-[#22C55E] font-semibold">[ AVAILABLE FOR PROJECTS ]</span>
        </div>
        <div className="flex items-center gap-2">
          <span>LOCATION</span>
          <span className="text-[#F2F2F2]">BANGLADESH // REMOTE WORLDWIDE</span>
        </div>
        <div className="flex items-center gap-2">
          <span>CONTACT</span>
          <a
            href="mailto:riovex818@gmail.com"
            className="text-[#F2F2F2] hover:underline"
          >
            riovex818@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
