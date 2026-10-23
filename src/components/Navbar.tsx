import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface Props {
  activeSection: string;
}

export default function Navbar({ activeSection }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
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
        {/* Left: RIOVEX wordmark + [ 2026 ] */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-3 group"
        >
          <span className="font-heading font-bold text-xl tracking-[-0.04em] text-[#F2F2F2] group-hover:text-white transition-colors">
            RIOVEX
          </span>
          <span className="font-mono text-[11px] text-[#8A8A8A] tracking-[0.18em] uppercase border border-[#222222] px-1.5 py-0.5 rounded-[2px] bg-[#111111]">
            [ 2026 ]
          </span>
        </a>

        {/* Center: Monospace minimal links (11px, 0.18em tracking) */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-[0.18em] uppercase">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
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

        {/* Right: Solid off-white button (12px, 0.12em tracking) */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="font-mono text-xs font-bold tracking-[0.12em] uppercase bg-[#F2F2F2] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F2F2F2] border border-[#F2F2F2] px-4 py-2.5 rounded-[2px] transition-all duration-150 inline-flex items-center gap-1.5"
          >
            <span>CONTACT ME</span>
            <span>→</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#8A8A8A] hover:text-[#F2F2F2] border border-[#222222] bg-[#111111] rounded-[3px]"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-[#222222] px-4 py-5 space-y-3 animate-in fade-in duration-150">
          <div className="font-mono text-[11px] text-[#8A8A8A] tracking-widest pb-1 border-b border-[#1c1c1c]">
            // NAVIGATION
          </div>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
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
              <span>CONTACT ME →</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
