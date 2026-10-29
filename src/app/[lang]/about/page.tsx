import React from 'react';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import {
  ShieldAlert,
  Award,
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
    title: `${dict.about.title} | ${dict.meta.siteName}`,
    description: dict.about.subtitle,
    alternates: {
      canonical: `/${lang}/about`,
      languages: {
        en: '/en/about',
        id: '/id/about',
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang].about;

  return (
    <div className="space-y-20 py-12 md:py-16 bg-[#f8fafc]">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8 space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
            CORPORATE PROFILE & GOVERNANCE
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0b0f17] tracking-tight font-sans">
            {dict.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl mt-2 leading-relaxed font-sans">
            {dict.subtitle}
          </p>
        </div>
      </section>

      {/* Brand Narrative & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b0f17] font-sans tracking-tight">
              {dict.storyTitle}
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              <p>{dict.storyP1}</p>
              <p>{dict.storyP2}</p>
              <p>{dict.storyP3}</p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 sm:p-7 shadow-subtle space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0b0f17] border-b border-slate-100 pb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Legalitas Badan Usaha</span>
            </h3>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Bentuk Usaha</span>
                <span className="font-bold text-slate-900">Perseroan Terbatas (PT)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Nomor Induk Berusaha</span>
                <span className="font-bold text-slate-900">022020819281</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">KBLI Operasional</span>
                <span className="font-bold text-slate-900">4659, 4663, 4669</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Status Perpajakan</span>
                <span className="font-bold text-emerald-600">PKP Terverifikasi DJP</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Sertifikasi Manajemen</span>
                <span className="font-bold text-amber-600">ISO 9001:2015 Registered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
            FOUNDATIONAL VALUES
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b0f17] font-mono">
            {dict.principlesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.principles.map((pr, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-subtle space-y-3"
            >
              <div className="text-xs font-mono font-bold text-amber-700">PRINCIPIO 0{i + 1}</div>
              <h3 className="text-base font-bold text-[#0b0f17] font-mono">
                {pr.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {pr.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Project Transparency Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-start gap-4">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <div className="font-bold font-mono text-slate-900 uppercase tracking-wider">
              {dict.demoDisclosureTitle}
            </div>
            <p className="text-slate-600 leading-relaxed font-sans">
              {dict.demoDisclosureDesc}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}