/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import ScrollProgressBar from './components/ScrollProgressBar.tsx';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Skills from './components/Skills.tsx';
import Work from './components/Work.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import Toast from './components/Toast.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import type { SkillRow } from './types/portfolio.ts';

function PortfolioApp() {
  const [activeSection, setActiveSection] = useState('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSkillFilter, setActiveSkillFilter] = useState<SkillRow | null>(null);

  // IntersectionObserver to sync navbar active indicators as user scrolls
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'work', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectSkill = (skill: SkillRow) => {
    setActiveSkillFilter(skill);
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] flex flex-col font-sans selection:bg-[#F2F2F2] selection:text-[#0A0A0A] relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Top Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Single Page Content */}
      <main className="flex-1">
        <Hero />
        <About />
        <Skills
          onSelectSkill={handleSelectSkill}
          activeSkillNum={activeSkillFilter?.num}
        />
        <Work
          onShowToast={showToast}
          activeSkillFilter={activeSkillFilter}
          onClearSkillFilter={() => setActiveSkillFilter(null)}
        />
        <Contact onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification Container */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  );
}
