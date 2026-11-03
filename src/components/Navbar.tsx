import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface Props {
  activeSection: string;
}

export default function Navbar({ activeSection }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.navbar.home, href: '#home', id: 'home' },
    { label: t.navbar.about, href: '#about', id: 'about' },
    { label: t.navbar.work, href: '#work', id: 'work' },
    { label: t.navbar.skills, href: '#skills', id: 'skills' },
    { label: t.navbar.contact, href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-[#222222] py-4'
          : 'bg-[#0A0A0A] border-[#1a1a1a] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: RIOVEX wordmark */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-3 group"
        >
          <span className="font-heading font-bold text-xl tracking-[-0.04em] text-[#F2F2F2] group-hover:text-white transition-colors">
            RIOVEX
          </span>
        </a>

        {/* Center: Monospace minimal links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-[0.18em] uppercase">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? 'text-[#F2F2F2] font-semibold'
                    : 'text-[#8A8A8A] hover:text-[#F2F2F2]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#F2F2F2]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Language Switcher + Solid off-white button */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <div
            className="flex items-center font-mono text-[11px] tracking-[0.12em] border border-[#2a2a2a] rounded-[2px] bg-[#111111] p-0.5"
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-[2px] transition-all font-bold cursor-pointer ${
                language === 'en'
                  ? 'bg-[#F2F2F2] text-[#0A0A0A]'
                  : 'text-[#8A8A8A] hover:text-[#F2F2F2]'
              }`}
              aria-label="Switch to English"
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <span className="text-[#333333] select-none px-0.5">/</span>
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              className={`px-2.5 py-1 rounded-[2px] transition-all font-bold cursor-pointer ${
                language === 'bn'
                  ? 'bg-[#F2F2F2] text-[#0A0A0A]'
                  : 'text-[#8A8A8A] hover:text-[#F2F2F2]'
              }`}
              aria-label="Switch to Bengali"
              aria-pressed={language === 'bn'}
            >
              বাংলা
            </button>
          </div>

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="font-mono text-xs font-bold tracking-[0.12em] uppercase bg-[#F2F2F2] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2F2F2] border border-[#F2F2F2] px-4 py-2.5 rounded-[2px] transition-all duration-150 inline-flex items-center gap-1.5"
          >
            <span>{t.navbar.contactBtn}</span>
            <span>→</span>
          </a>
        </div>

        {/* Mobile: Language Switcher + Hamburger Button */}
        <div className="flex md:hidden items-center gap-2.5">
          {/* Quick mobile language toggle */}
          <div
            className="flex items-center font-mono text-[10px] tracking-[0.1em] border border-[#2a2a2a] rounded-[2px] bg-[#111111] p-0.5"
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-[2px] transition-all font-bold cursor-pointer ${
                language === 'en'
                  ? 'bg-[#F2F2F2] text-[#0A0A0A]'
                  : 'text-[#8A8A8A]'
              }`}
              aria-label="English"
            >
              EN
            </button>
            <span className="text-[#333333] select-none px-0.5">/</span>
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              className={`px-2 py-1 rounded-[2px] transition-all font-bold cursor-pointer ${
                language === 'bn'
                  ? 'bg-[#F2F2F2] text-[#0A0A0A]'
                  : 'text-[#8A8A8A]'
              }`}
              aria-label="বাংলা"
            >
              বাংলা
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#8A8A8A] hover:text-[#F2F2F2] border border-[#222222] bg-[#111111] rounded-[3px] cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-[#222222] px-4 py-5 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-1 border-b border-[#1c1c1c]">
            <span className="font-mono text-[11px] text-[#8A8A8A] tracking-widest">
              {t.navbar.navigation}
            </span>
            <span className="font-mono text-[10px] text-[#22C55E]">
              {language === 'en' ? 'ENGLISH' : 'বাংলা'}
            </span>
          </div>

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`block font-mono text-[11px] tracking-[0.18em] py-2 uppercase ${
                  isActive ? 'text-[#F2F2F2] font-bold' : 'text-[#8A8A8A]'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <div className="pt-2">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="w-full font-mono text-xs font-bold tracking-[0.12em] uppercase bg-[#F2F2F2] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2F2F2] border border-[#F2F2F2] py-3 rounded-[2px] transition-all duration-150 flex items-center justify-center gap-2"
            >
              <span>{t.navbar.contactBtn} →</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
