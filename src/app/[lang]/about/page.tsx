import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import {
  ShieldAlert,
  CheckCircle2,
  Building2,
  Compass,
  ArrowRight,
  Code2,
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
    <div className="space-y-20 py-12 md:py-16">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-neutral-200 pb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold">
            CORPORATE PROFILE & VISION
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#121316] tracking-tight mt-2 font-sans">
            {dict.title}
          </h1>
          <p className="text-base text-neutral-600 max-w-3xl mt-3 leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* Narrative Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold">
              ORIGIN & PURPOSE
            </span>
            <h2 className="text-2xl font-bold text-[#121316] mt-2 leading-snug">
              {dict.storyTitle}
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-5 text-sm text-neutral-700 leading-relaxed font-sans">
            <p>{dict.storyP1}</p>
            <p>{dict.storyP2}</p>
            <p>{dict.storyP3}</p>
          </div>
        </div>
      </section>

      {/* Core Operating Principles */}
      <section className="bg-neutral-900 text-white py-16 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
              ORGANIZATIONAL GOVERNANCE
            </span>
            <h2 className="text-3xl font-black tracking-tight mt-2 text-white">
              {dict.principlesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.principles.map((p, idx) => (
              <div
                key={idx}
                className="p-6 bg-neutral-800/50 border border-neutral-700/60 rounded-xs space-y-3"
              >
                <div className="text-xs font-mono text-blue-400 font-bold">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency & Demo Disclosure Box */}
      <section id="transparency" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-neutral-900 p-8 sm:p-10 rounded-xs shadow-md space-y-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 text-blue-900 rounded-xs">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700">
                PORTFOLIO TRANSPARENCY PROTOCOL
              </div>
              <h2 className="text-2xl font-black text-[#121316] tracking-tight mt-1">
                {dict.demoDisclosureTitle}
              </h2>
            </div>
          </div>

          <p className="text-sm text-neutral-700 leading-relaxed">
            {dict.demoDisclosureDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
            {dict.demoPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span className="leading-normal">{point}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <span>Stack: Next.js 16 App Router, TypeScript, Tailwind CSS v4, Supabase PostgreSQL</span>
            <Link
              href={`/${lang}/contact`}
              className="text-blue-700 hover:text-blue-900 font-semibold inline-flex items-center gap-1"
            >
              <span>{lang === 'id' ? 'Tinjau Kanal Kontak Demo' : 'Inspect Demo Contact Channels'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
