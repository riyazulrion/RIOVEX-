import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#222222] bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
        {/* Left: © 2026 RIYAZUL HASAN RION // RIOVEX */}
        <div className="text-center sm:text-left text-[#8A8A8A]">
          <span className="text-[#F2F2F2] font-semibold">
            © 2026 RIYAZUL HASAN RION // RIOVEX
          </span>
          <span className="block text-[10px] text-[#555] mt-1 uppercase">
            BANGLADESH • GRAPHIC DESIGN &amp; AI ANIMATION
          </span>
        </div>

        {/* Right Mono Links: Email, Instagram, Leo's Journey */}
        <div className="flex items-center gap-6 text-[#8A8A8A] tracking-[0.18em] uppercase text-[11px]">
          <a
            href="mailto:riovex818@gmail.com"
            className="hover:text-[#F2F2F2] transition-colors"
          >
            EMAIL
          </a>

          <a
            href="https://www.instagram.com/riove_x"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F2F2F2] transition-colors"
          >
            INSTAGRAM (@RIOVE_X)
          </a>

          <a
            href="https://www.instagram.com/leos_journey_00"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F2F2F2] transition-colors"
          >
            LEO&apos;S JOURNEY
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 border border-[#222222] hover:border-[#444] text-[#8A8A8A] hover:text-[#F2F2F2] bg-[#111111] rounded-[2px] transition-colors ml-2 cursor-pointer"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
