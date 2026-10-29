'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { useRfq } from '@/lib/rfq-context';
import { LanguageSwitcher } from './LanguageSwitcher';
import { FileSpreadsheet, Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';

interface Props {
  lang: Locale;
}

export function Navbar({ lang }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const dict = dictionaries[lang];
  const { itemCount } = useRfq();

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayCount = mounted ? itemCount : 0;

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/products`, label: dict.nav.products },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === `/${lang}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Brand Identity */}
          <Link href={`/${lang}`} className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-md bg-[#0b0f17] border border-slate-800 flex items-center justify-center shadow-xs group-hover:border-amber-500 transition-colors">
              <span className="font-mono font-black text-amber-400 text-lg tracking-tighter">
                V
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0b0f17] font-mono group-hover:text-amber-600 transition-colors">
                  VELMORA
                </span>
                <span className="inline-block text-[9px] uppercase font-mono tracking-widest bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded border border-slate-300">
                  NIAGA
                </span>
              </div>
              <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase font-medium">
                General Trading & Industrial Supply
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider font-semibold transition-all rounded-md relative ${
                    active
                      ? 'text-[#0b0f17] bg-slate-100/90 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-[#0b0f17] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-amber-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Language Switcher */}
            <LanguageSwitcher currentLang={lang} />

            {/* RFQ Cart Pill Badge */}
            <Link
              href={`/${lang}/quote`}
              className={`relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-md border transition-all ${
                displayCount > 0
                  ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-xs hover:bg-amber-400'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 font-medium'
              }`}
              title="Daftar item penawaran harga (RFQ)"
            >
              <FileSpreadsheet className={`w-3.5 h-3.5 ${displayCount > 0 ? 'text-slate-950' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">RFQ DRAFT</span>
              <span
                className={`inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-bold rounded ${
                  displayCount > 0
                    ? 'bg-slate-950 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {displayCount}
              </span>
            </Link>

            {/* Primary Action Button (Tender CTA) */}
            <Link
              href={`/${lang}/quote`}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-[#0b0f17] hover:bg-slate-800 text-white text-xs font-mono font-semibold uppercase tracking-wider rounded-md transition-all shadow-xs"
            >
              <span>{lang === 'id' ? 'Minta Penawaran' : 'Request Quote'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-black hover:bg-slate-100 rounded-md transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-md ${
                    active
                      ? 'text-[#0b0f17] bg-slate-100 border-l-2 border-amber-500 font-bold'
                      : 'text-slate-600 hover:text-black hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href={`/${lang}/quote`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#0b0f17] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-md"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>{lang === 'id' ? 'Buat Dokumen RFQ' : 'Create RFQ Document'}</span>
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded text-[10px]">
                {displayCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
