'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { useRfq } from '@/lib/rfq-context';
import { LanguageSwitcher } from './LanguageSwitcher';
import { FileText, Menu, X, ArrowUpRight, ShieldCheck, Lock } from 'lucide-react';

interface Props {
  lang: Locale;
}

export function Navbar({ lang }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const dict = dictionaries[lang];
  const { itemCount } = useRfq();

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity */}
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm bg-[#0A192F] border border-slate-800 flex items-center justify-center shadow-xs group-hover:border-amber-500 transition-colors">
              <span className="font-mono font-black text-amber-400 text-lg tracking-tighter">
                V
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0A192F] font-mono group-hover:text-amber-600 transition-colors">
                  VELMORA
                </span>
                <span className="hidden sm:inline-block text-[9px] uppercase font-mono tracking-widest bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-300">
                  NIAGA
                </span>
              </div>
              <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
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
                  className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider font-semibold transition-all rounded-sm ${
                    active
                      ? 'text-[#0A192F] bg-slate-100 border-b-2 border-amber-600'
                      : 'text-slate-600 hover:text-[#0A192F] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher currentLang={lang} />

            {/* RFQ Pill Badge */}
            <Link
              href={`/${lang}/quote`}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono border border-slate-300 bg-white hover:bg-slate-50 rounded-sm text-slate-800 transition-colors shadow-xs"
              title="Daftar item penawaran harga"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline font-bold">RFQ</span>
              <span
                className={`inline-flex items-center justify-center px-1.5 py-0.2 text-[11px] font-bold rounded ${
                  itemCount > 0
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {itemCount}
              </span>
            </Link>

            {/* Desktop Request Quote CTA Button */}
            <Link
              href={`/${lang}/quote`}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#0A192F] hover:bg-[#102444] text-white text-xs font-mono font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all shadow-xs border border-slate-800"
            >
              <span>{dict.nav.requestQuote}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-black hover:bg-slate-100 rounded-sm"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 text-sm font-mono uppercase tracking-wider font-semibold rounded-sm ${
                    active
                      ? 'text-[#0A192F] bg-slate-100 font-bold border-l-4 border-amber-600'
                      : 'text-slate-700 hover:text-[#0A192F] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <Link
              href={`/${lang}/quote`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#0A192F] text-white py-3 px-4 rounded-sm font-mono text-xs uppercase tracking-wider font-bold shadow-xs"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{dict.nav.requestQuote} ({itemCount} item)</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-800 py-2.5 px-4 rounded-sm font-mono text-xs uppercase tracking-wider font-semibold border border-slate-300"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Portal Admin (Login)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
