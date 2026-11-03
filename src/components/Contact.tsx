import React, { useState } from 'react';
import { Mail, Instagram, Copy, Check, ExternalLink } from 'lucide-react';
import { copyToClipboard } from '../utils/portfolioUtils.ts';
import { CONTACT_DATA } from '../data/portfolioData.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface Props {
  onShowToast: (msg: string) => void;
}

export default function Contact({ onShowToast }: Props) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { t } = useLanguage();

  const handleCopy = async (textToCopy: string, label: string) => {
    await copyToClipboard(textToCopy);
    setCopiedEmail(true);
    onShowToast(t.toast.copiedEmail);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2000);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#222222]">
      {/* Section Mono Label with 04 / CONTACT */}
      <div className="flex items-center gap-3 font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase mb-4">
        <span className="text-[#F2F2F2] font-semibold">{t.contact.num}</span>
        <span className="text-[#444]">/</span>
        <span>{t.contact.label}</span>
        <span className="text-[#333]">//</span>
        <span>{t.contact.sublabel}</span>
      </div>

      {/* Big Heading with line mask in bold uppercase Space Grotesk */}
      <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F2F2F2] tracking-[-0.04em] uppercase leading-[0.9] mb-12">
        <span className="line-mask-wrapper">
          <span className="line-slide-up">
            {t.contact.heading}
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
                {t.contact.directInquiries}
              </span>
              <span className="font-mono text-[10px] text-[#22C55E] tracking-[0.18em] uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                {t.contact.replyWithin}
              </span>
            </div>

            <div className="py-5">
              <span className="font-mono text-[10px] text-[#666] tracking-[0.18em] uppercase block mb-1">
                {t.contact.primaryEmail}
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
                <span>{t.contact.emailMe}</span>
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
                    <span className="text-[#22C55E]">{t.contact.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.contact.copy}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="studio-card p-6 sm:p-7 rounded-[4px] border border-[#222222] bg-[#111111]">
            <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
              <span className="font-mono text-[10px] text-[#8A8A8A] tracking-[0.18em] uppercase">
                {t.contact.socialTitle}
              </span>
              <span className="font-mono text-[10px] text-[#8A8A8A] tracking-[0.18em] uppercase">
                {t.contact.activeDaily}
              </span>
            </div>

            <div className="py-5">
              <span className="font-mono text-[10px] text-[#666] tracking-[0.18em] uppercase block mb-1">
                {t.contact.instagramDirect}
              </span>
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#F2F2F2]">
                {CONTACT_DATA.instagram.handle}
              </div>
            </div>

            <div className="pt-4 border-t border-[#222222] flex flex-wrap items-center gap-3">
              <a
                href={CONTACT_DATA.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold tracking-[0.12em] uppercase bg-transparent hover:bg-[#F2F2F2] text-[#F2F2F2] hover:text-[#0A0A0A] border border-[#333333] hover:border-[#F2F2F2] px-5 py-3 rounded-[2px] transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{t.contact.follow}</span>
                <span>↗</span>
              </a>
            </div>

            {/* Small mono line under the Instagram row */}
            <div className="mt-3 pt-3 border-t border-[#1a1a1a]">
              <a
                href={CONTACT_DATA.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#8A8A8A] hover:text-[#F2F2F2] transition-colors inline-flex items-center gap-1"
              >
                <span>YOUTUBE: @riovex-818 ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Instagram QR Code Card */}
        <div className="lg:col-span-5 studio-card p-6 sm:p-7 rounded-[4px] border border-[#222222] bg-[#111111] flex flex-col items-center justify-center text-center">
          <div className="w-full flex items-center justify-between pb-4 border-b border-[#222222] mb-6">
            <span className="font-mono text-[10px] text-[#8A8A8A] tracking-[0.18em] uppercase">
              {t.contact.qrLabel}
            </span>
            <span className="font-mono text-[10px] text-[#22C55E] tracking-[0.18em] uppercase">
              {t.contact.scanConnect}
            </span>
          </div>

          {/* White square card with QR Code */}
          <div className="p-4 bg-white rounded-[4px] shadow-2xl max-w-[240px] w-full flex items-center justify-center mb-6">
            <img
              src={CONTACT_DATA.qrCodePath}
              alt="Riove_x Instagram QR Code"
              className="w-full h-auto object-contain aspect-square"
              loading="lazy"
            />
          </div>

          {/* Instructions */}
          <div className="font-mono text-xs font-bold text-[#F2F2F2] uppercase tracking-[0.14em] mb-2">
            @RIOVE_X
          </div>
          <p className="font-mono text-[10px] text-[#8A8A8A] tracking-[0.16em] uppercase max-w-xs leading-relaxed">
            {t.contact.scanSub}
          </p>

          <a
            href={CONTACT_DATA.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 font-mono text-[11px] font-bold tracking-[0.14em] text-[#8A8A8A] hover:text-[#F2F2F2] transition-colors inline-flex items-center gap-1.5 uppercase"
          >
            <span>{t.contact.viewProfile}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#22C55E]" />
          </a>
        </div>
      </div>
    </section>
  );
}
