import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import {
  Layers,
  SearchCode,
  ShieldCheck,
  Truck,
  ArrowRight,
  Clock,
  CheckCircle2,
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
    consolidation: <Layers className="w-6 h-6 text-blue-600" />,
    custom: <SearchCode className="w-6 h-6 text-blue-600" />,
    quality: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    logistics: <Truck className="w-6 h-6 text-blue-600" />,
  };

  return (
    <div className="space-y-20 py-12 md:py-16">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-neutral-200 pb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold">
            B2B PROCUREMENT CAPABILITIES
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#121316] tracking-tight mt-2 font-sans">
            {dict.title}
          </h1>
          <p className="text-base text-neutral-600 max-w-3xl mt-3 leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* Intro Philosophy Box */}
        <div className="mt-10 bg-white border border-neutral-200 p-8 rounded-xs shadow-xs max-w-4xl">
          <h2 className="text-xl font-bold text-[#121316] font-mono">
            {dict.introTitle}
          </h2>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            {dict.introDesc}
          </p>
        </div>
      </section>

      {/* The 4 Core Service Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dict.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white border border-neutral-200 hover:border-neutral-900 transition-colors p-8 rounded-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-neutral-100 rounded-xs">
                    {pillarIcons[pillar.id]}
                  </div>
                  <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wider">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#121316] tracking-tight">
                  {pillar.title}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed">
                  {pillar.desc}
                </p>

                <div className="pt-4 border-t border-neutral-100 space-y-2">
                  {pillar.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href={`/${lang}/quote`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-blue-700 hover:text-blue-900"
                >
                  <span>{lang === 'id' ? 'Minta Penawaran Layanan Ini' : 'Request RFQ for this Service'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Operating Service Level Benchmarks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121316] text-white p-8 md:p-12 rounded-xs border border-neutral-800">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
              RELIABILITY & STANDARDS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2 text-white">
              {dict.slaTitle}
            </h2>
            <p className="text-neutral-400 text-sm mt-2">{dict.slaDesc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-800">
            <div className="p-4 bg-neutral-800/40 border border-neutral-700/40 rounded-xs">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>RFQ Turnaround</span>
              </div>
              <div className="text-xl font-bold font-mono">24 – 48 Hours</div>
              <p className="text-xs text-neutral-400 mt-1">
                {lang === 'id'
                  ? 'Penawaran harga komersial lengkap dengan lead time pabrik.'
                  : 'Comprehensive commercial proposal with verifiable lead times.'}
              </p>
            </div>

            <div className="p-4 bg-neutral-800/40 border border-neutral-700/40 rounded-xs">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Technical Due Diligence</span>
              </div>
              <div className="text-xl font-bold font-mono">100% Inspection</div>
              <p className="text-xs text-neutral-400 mt-1">
                {lang === 'id'
                  ? 'Verifikasi dimensi fisik dan sertifikasi material sebelum kirim.'
                  : 'Physical dimensional and MTR conformity verified prior to release.'}
              </p>
            </div>

            <div className="p-4 bg-neutral-800/40 border border-neutral-700/40 rounded-xs">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
                <Truck className="w-3.5 h-3.5" />
                <span>Incoterms Flexibility</span>
              </div>
              <div className="text-xl font-bold font-mono">Ex-Works to DDP</div>
              <p className="text-xs text-neutral-400 mt-1">
                {lang === 'id'
                  ? 'Pengiriman gudang penampungan hingga serah terima di lokasi proyek.'
                  : 'From factory gate to staged job-site delivery across Indonesia.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Consolidate Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-100 border border-neutral-300 p-8 sm:p-12 text-center rounded-xs space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-[#121316] tracking-tight">
            {dict.readyTitle}
          </h2>
          <p className="text-neutral-600 text-sm max-w-xl mx-auto">
            {dict.readySubtitle}
          </p>
          <div className="pt-4">
            <Link
              href={`/${lang}/quote`}
              className="inline-flex items-center justify-center gap-2 bg-[#121316] text-white hover:bg-neutral-800 px-8 py-3.5 rounded-xs font-mono text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-blue-400" />
              <span>{dict.readyCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
