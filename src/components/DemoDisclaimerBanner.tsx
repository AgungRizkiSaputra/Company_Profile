'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Lock, ChevronRight } from 'lucide-react';
import { Locale } from '@/types/i18n';

interface Props {
  lang: Locale;
}

export function DemoDisclaimerBanner({ lang: _lang }: Props) {
  return (
    <div
      aria-label="Corporate Compliance Bar"
      className="bg-[#0b0f17] text-slate-300 text-xs border-b border-slate-800/80 py-2 px-4 selection:bg-amber-500 selection:text-slate-950"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 font-mono text-[11px]">
        {/* Entity, Verification & Quality Standard */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-slate-300">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>PT Velmora Niaga Nusantara</span>
          </div>
          <span className="text-slate-700 hidden md:inline">/</span>
          <span className="text-slate-400 hidden sm:inline">
            NIB: 022020819281 • PKP Terverifikasi DJP • ISO 9001:2015
          </span>
        </div>

        {/* Procurement Desk & Admin Direct Portal */}
        <div className="flex items-center gap-4 text-slate-300">
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Sourcing Hotline: <strong className="text-slate-200">(021) 8990-2100</strong></span>
          </div>

          <Link
            href="/admin/login"
            className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all font-medium text-[10.5px]"
            title="Portal login petugas pengadaan & review RFQ"
          >
            <Lock className="w-3 h-3 text-amber-400 group-hover:scale-105 transition-transform" />
            <span>Portal Admin Sourcing</span>
            <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
