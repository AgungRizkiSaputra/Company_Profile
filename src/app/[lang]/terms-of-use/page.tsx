import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { FileText, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang];

  return {
    title: `${dict.terms.title} | ${dict.meta.siteName}`,
    description: dict.terms.intro.substring(0, 160),
    alternates: {
      canonical: `/${lang}/terms-of-use`,
      languages: {
        en: '/en/terms-of-use',
        id: '/id/terms-of-use',
      },
    },
  };
}

export default async function TermsOfUsePage({ params }: Props) {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang].terms;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-neutral-200 pb-6 space-y-2">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-black mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === 'id' ? 'Kembali ke Beranda' : 'Return Home'}</span>
        </Link>
        <div className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold">
          LEGAL & COMMERCIAL FRAMEWORK
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#121316] tracking-tight font-sans">
          {dict.title}
        </h1>
        <p className="text-xs font-mono text-neutral-500">{dict.lastUpdated}</p>
      </div>

      {/* Introduction Card */}
      <div className="bg-white border border-neutral-200 p-6 sm:p-8 rounded-xs shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-700 font-bold uppercase">
          <FileText className="w-4 h-4" />
          <span>B2B Commercial Terms of Engagement</span>
        </div>
        <p className="text-sm text-neutral-700 leading-relaxed font-sans">
          {dict.intro}
        </p>
      </div>

      {/* Terms Sections */}
      <div className="space-y-8">
        {dict.sections.map((sec, idx) => (
          <article
            key={idx}
            className="bg-white border border-neutral-200 p-6 sm:p-8 rounded-xs shadow-xs space-y-4"
          >
            <h2 className="text-lg font-bold text-[#121316] font-mono leading-snug">
              {sec.title}
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
              {sec.content}
            </p>
            {sec.bullets && sec.bullets.length > 0 && (
              <ul className="space-y-2 pt-2 border-t border-neutral-100">
                {sec.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="text-xs text-neutral-700 flex items-start gap-2.5 font-sans leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
