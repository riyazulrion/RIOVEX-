import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  TRANSLATIONS,
  WORK_ITEMS_I18N,
  LocalizedWorkMeta,
} from '../i18n/translations.ts';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (typeof TRANSLATIONS)['en'];
  getWorkItemMeta: (itemId: string) => LocalizedWorkMeta | undefined;
  getSkillTitle: (skillNum: string, fallbackTitle: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'rion_portfolio_lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved === 'en' || saved === 'bn') {
          return saved;
        }
      } catch {
        // Fallback
      }
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, language);
      } catch {
        // Ignore storage errors
      }
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = TRANSLATIONS[language];

  const getWorkItemMeta = (itemId: string): LocalizedWorkMeta | undefined => {
    return WORK_ITEMS_I18N[language]?.[itemId] || WORK_ITEMS_I18N['en']?.[itemId];
  };

  const getSkillTitle = (skillNum: string, fallbackTitle: string): string => {
    return (
      (t.skills.items as Record<string, string>)[skillNum] || fallbackTitle
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        getWorkItemMeta,
        getSkillTitle,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
