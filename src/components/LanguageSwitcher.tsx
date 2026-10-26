'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/types/i18n';
import { Globe } from 'lucide-react';

interface Props {
  currentLang: Locale;
}

export function LanguageSwitcher({ currentLang }: Props) {
  const pathname = usePathname() || `/${currentLang}`;

  // Helper to replace the locale prefix while maintaining the rest of the path
  const getEquivalentPath = (targetLocale: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    if (segments[0] === 'en' || segments[0] === 'id') {
      segments[0] = targetLocale;
      return `/${segments.join('/')}`;
    }
    return `/${targetLocale}/${segments.join('/')}`;
  };

  return (
    <div className="flex items-center gap-1.5 border border-neutral-300 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-sm text-xs font-mono">
      <Globe className="w-3.5 h-3.5 text-neutral-500" />
      <Link
        href={getEquivalentPath('en')}
        className={`px-1 py-0.5 rounded transition-colors ${
          currentLang === 'en'
            ? 'font-bold text-[#121316] bg-neutral-100'
            : 'text-neutral-500 hover:text-neutral-900'
        }`}
        title="Switch to English"
      >
        EN
      </Link>
      <span className="text-neutral-300">/</span>
      <Link
        href={getEquivalentPath('id')}
        className={`px-1 py-0.5 rounded transition-colors ${
          currentLang === 'id'
            ? 'font-bold text-[#121316] bg-neutral-100'
            : 'text-neutral-500 hover:text-neutral-900'
        }`}
        title="Beralih ke Bahasa Indonesia"
      >
        ID
      </Link>
    </div>
  );
}
