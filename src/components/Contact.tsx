import React, { useState } from 'react';
import { Mail, Instagram, Copy, Check, ExternalLink } from 'lucide-react';
import { copyToClipboard } from '../utils/portfolioUtils.ts';
import { CONTACT_DATA } from '../data/portfolioData.ts';

interface Props {
  onShowToast: (msg: string) => void;
}

export default function Contact({ onShowToast }: Props) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopy = async (textToCopy: string, label: string) => {
    await copyToClipboard(textToCopy);
    setCopiedEmail(true);
    onShowToast(`COPIED ${label.toUpperCase()} TO CLIPBOARD`);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2000);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#222222]">
      {/* Section Mono Label with 04 / CONTACT */}
      <div className="flex items-center gap-3 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase mb-4">
        <span className="text-[#F2F2F2] font-semibold">04</span>
        <span className="text-[#444]">/</span>
        <span>CONTACT</span>
        <span className="text-[#333]">//</span>
        <span>GET IN TOUCH</span>
      </div>

      {/* Big Heading with line mask and Instrument Serif italic "together." */}
      <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F2F2F2] tracking-[-0.04em] uppercase leading-[0.9] mb-12">
        <span className="line-mask-wrapper">
          <span className="line-slide-up">
            LET'S WORK{' '}
            <span className="font-accent lowercase italic font-normal text-[#F2F2F2] tracking-normal text-[1.15em]">
              together.
            </span>
          </span>
        </span>
      </h2>

      {/* Grid: Left Column for Email & Instagram, Right Column for White Square QR Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Direct Info Cards */}
        <div className="lg:col-span-7 space-y-6">
          {/* Email Card */}
          <div className="studio-card p-6 sm:p-7 rounded-[4px] border border-[#222222] bg-[#111111]">
            <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
              <span className="font-mono text-[10px] text-[#8A8A8A] tracking-[0.18em] uppercase">
                // DIRECT INQUIRIES
              </span>
              <span className="font-mono text-[10px] text-[#22C55E] tracking-[0.18em] uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                REPLY WITHIN 24H
              </span>
            </div>

            <div className="py-5">
              <span className="font-mono text-[10px] text-[#666] tracking-[0.18em] uppercase block mb-1">
                PRIMARY EMAIL
              </span>
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#F2F2F2] select-all">
                {CONTACT_DATA.email}
              </div>
            </div>

            {/* Email Action Buttons */}
            <div className="pt-4 border-t border-[#222222] flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${CONTACT_DATA.email}`}
                className="font-mono text-xs font-bold tracking-[0.12em] uppercase bg-[#F2F2F2] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2F2F2] border border-[#F2F2F2] px-5 py-3 rounded-[2px] transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>EMAIL ME</span>
                <span>→</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopy(CONTACT_DATA.email, 'email address')}
                className="font-mono text-xs font-semibold tracking-[0.12em] uppercase bg-transparent hover:bg-[#181818] text-[#8A8A8A] hover:text-[#F2F2F2] border border-[#333333] hover:border-[#8A8A8A] px-4 py-3 rounded-[2px] transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer"
                aria-label="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span className="text-[#22C55E]">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="studio-card p-6 sm:p-7 rounded-[4px] border border-[#222222] bg-[#111111]">
            <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
              <span className="font-mono text-[10px] text-[#8A8A8A] tracking-[0.18em] uppercase">
                // SOCIAL MEDIA
              </span>
              <span className="font-mono text-[10px] text-[#8A8A8A] tracking-[0.18em] uppercase">
                INSTAGRAM
              </span>
            </div>

            <div className="py-5">
              <span className="font-mono text-[10px] text-[#666] tracking-[0.18em] uppercase block mb-1">
                INSTAGRAM PROFILE
              </span>
              <div className="font-mono text-xl sm:text-2xl font-bold text-[#F2F2F2]">
                {CONTACT_DATA.instagram.handle}
              </div>
              <p className="font-body text-xs text-[#8A8A8A] mt-2 leading-relaxed">
                Follow for poster designs, process breakdowns, and new drop artwork.
              </p>
            </div>

            <div className="pt-4 border-t border-[#222222]">
              <a
                href={CONTACT_DATA.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold tracking-[0.12em] uppercase bg-[#F2F2F2] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2F2F2] border border-[#F2F2F2] px-5 py-3 rounded-[2px] transition-all duration-150 inline-flex items-center gap-2"
              >
                <span>{CONTACT_DATA.instagram.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): White Square Card for Instagram QR Code */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-sm bg-white text-[#0A0A0A] p-6 sm:p-8 rounded-[4px] border border-white shadow-xl flex flex-col items-center text-center">
            {/* Top Mono Indicator */}
            <div className="font-mono text-[10px] font-bold text-[#444] tracking-[0.18em] uppercase mb-4 pb-2 border-b border-[#eaeaea] w-full">
              INSTAGRAM SCAN CARD
            </div>

            {/* QR Code Image Container */}
            <div className="w-full aspect-square max-w-[260px] flex items-center justify-center p-2 bg-white">
              <img
                src={CONTACT_DATA.qrCodePath}
                alt="Instagram QR Code for @riove_x"
                className="w-full h-full object-contain select-none"
                loading="lazy"
              />
            </div>

            {/* Mono Caption: [ SCAN TO FOLLOW @RIOVE_X ] */}
            <div className="mt-5 pt-4 border-t border-[#eaeaea] w-full">
              <p className="font-mono text-xs font-bold text-[#0A0A0A] tracking-[0.12em] uppercase">
                {CONTACT_DATA.qrCaption}
              </p>
              <p className="font-mono text-[10px] text-[#666] mt-1 tracking-[0.18em] uppercase">
                POINT PHONE CAMERA TO OPEN PROFILE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
