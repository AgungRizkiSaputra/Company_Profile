'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Lock, Building2 } from 'lucide-react';
import { Locale } from '@/types/i18n';

interface Props {
  lang: Locale;
}

export function DemoDisclaimerBanner({ lang }: Props) {
  return (
    <div
      aria-label="Corporate Compliance Bar"
      className="bg-[#0A192F] text-slate-300 text-xs border-b border-slate-800 py-2 px-4 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 font-mono text-[11px]">
        {/* Entity & Accreditations */}
        <div className="flex items-center gap-2 text-slate-300">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>PT Velmora Niaga Nusantara</span>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="hidden md:inline text-slate-400">
            NIB: 022020819281 • PKP e-Faktur • ISO 9001:2015 Registered Vendor
          </span>
        </div>

        {/* Corporate Sourcing Desk & Admin Login Link */}
        <div className="flex items-center gap-4 text-slate-300">
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <Phone className="w-3 h-3 text-amber-500" />
            <span>Hotline Sourcing: (021) 8990-2100</span>
          </div>

          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-amber-500/30 transition-colors font-semibold"
            title="Portal login petugas pengadaan & review RFQ"
          >
            <Lock className="w-3 h-3" />
            <span>Portal Admin Sourcing (Login)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
