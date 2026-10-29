import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import {
  Layers,
  SearchCode,
  ShieldCheck,
  Truck,
  Clock,
  Check,
  FileSpreadsheet,
} from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang];

  return {
    title: `${dict.services.title} | ${dict.meta.siteName}`,
    description: dict.services.subtitle,
    alternates: {
      canonical: `/${lang}/services`,
      languages: {
        en: '/en/services',
        id: '/id/services',
      },
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang].services;

  const pillarIcons: Record<string, React.ReactNode> = {
    consolidation: <Layers className="w-6 h-6 text-amber-600" />,
    custom: <SearchCode className="w-6 h-6 text-blue-600" />,
    quality: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    logistics: <Truck className="w-6 h-6 text-purple-600" />,
  };

  return (
    <div className="space-y-20 py-12 md:py-16 bg-[#f8fafc]">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8 space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
            PROCUREMENT INFRASTRUCTURE & SLA
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0b0f17] tracking-tight font-sans">
            {dict.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl mt-2 leading-relaxed font-sans">
            {dict.subtitle}
          </p>
        </div>
      </section>

      {/* 4 Core Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dict.pillars.map((pillar, i) => (
            <div
              key={pillar.id}
              className="bg-white border border-slate-200 rounded-lg p-8 shadow-subtle hover:border-slate-400 transition-all space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {pillarIcons[pillar.id] || <Layers className="w-6 h-6 text-amber-600" />}
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  PILLAR 0{i + 1}
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-[#0b0f17] font-mono">
                  {pillar.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Deliverables & Compliance
                </div>
                <div className="grid grid-cols-1 gap-2 text-xs text-slate-700 font-sans">
                  {pillar.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SLA & Governance Table */}
      <section id="compliance" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-subtle space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
                STANDAR LAYANAN OPERASIONAL (SLA)
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0b0f17] font-mono mt-1">
                {lang === 'id' ? 'Komitmen Mutu & Ketepatan Pengadaan' : 'Procurement SLA & Commitments'}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-slate-50 border border-slate-200 px-3 py-1.5 rounded text-slate-700">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Response Window: &le; 24 Jam Kerja</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-4 bg-slate-50 rounded-md border border-slate-200 space-y-1.5">
              <div className="text-slate-500">Penerbitan Surat Penawaran</div>
              <div className="text-lg font-bold text-[#0b0f17]">&le; 24 Jam</div>
              <p className="text-[11px] text-slate-500 font-sans">
                Lengkap dengan spesifikasi, ketersediaan gudang, dan lead-time resmi.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-md border border-slate-200 space-y-1.5">
              <div className="text-slate-500">Custom Sourcing Khusus</div>
              <div className="text-lg font-bold text-amber-600">2 - 3 Hari Kerja</div>
              <p className="text-[11px] text-slate-500 font-sans">
                Pencarian komponen mekanikal/elektrikal langka dari jaringan prinsipal.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-md border border-slate-200 space-y-1.5">
              <div className="text-slate-500">Dokumen Kepatuhan Pajak</div>
              <div className="text-lg font-bold text-emerald-600">100% DJP e-Faktur</div>
              <p className="text-[11px] text-slate-500 font-sans">
                Faktur Pajak terbit bersamaan dengan BAST serah terima resmi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0b0f17] text-white rounded-lg p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-elevation">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl font-black font-mono tracking-tight">
              {lang === 'id' ? 'Siap Menyederhanakan Pengadaan Perusahaan?' : 'Ready to Streamline Enterprise Procurement?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              {lang === 'id'
                ? 'Kirimkan Bill of Quantities (BOQ) atau ajukan kebutuhan material melalui sistem RFQ kami hari ini.'
                : 'Submit your BOM/BOQ or compile standard parts through our digital RFQ engine today.'}
            </p>
          </div>
          <Link
            href={`/${lang}/quote`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider rounded-md transition-colors shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{lang === 'id' ? 'Ajukan RFQ Sekarang' : 'Start RFQ Submission'}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}