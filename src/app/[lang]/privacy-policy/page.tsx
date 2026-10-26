import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { ShieldCheck, Mail, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang];

  return {
    title: `${dict.privacy.title} | ${dict.meta.siteName}`,
    description: dict.privacy.intro.substring(0, 160),
    alternates: {
      canonical: `/${lang}/privacy-policy`,
      languages: {
        en: '/en/privacy-policy',
        id: '/id/privacy-policy',
      },
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang].privacy;

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
          GOVERNANCE & DATA STEWARDSHIP
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#121316] tracking-tight font-sans">
          {dict.title}
        </h1>
        <p className="text-xs font-mono text-neutral-500">{dict.lastUpdated}</p>
      </div>

      {/* Introduction Card */}
      <div className="bg-white border border-neutral-200 p-6 sm:p-8 rounded-xs shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-700 font-bold uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>UU No. 27/2022 (UU PDP) & B2B Compliance</span>
        </div>
        <p className="text-sm text-neutral-700 leading-relaxed font-sans">
          {dict.intro}
        </p>
      </div>

      {/* Policy Sections */}
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

      {/* Deletion Inquiries Callout */}
      <div className="bg-neutral-100 border border-neutral-300 p-6 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-neutral-900 font-mono">
            {lang === 'id' ? 'Pertanyaan Privasi & Penghapusan Rekaman' : 'Data Subject Requests & Deletions'}
          </h3>
          <p className="text-xs text-neutral-600">
            {lang === 'id'
              ? 'Hubungi meja privasi kami dengan mencantumkan nomor referensi RFQ Anda.'
              : 'Contact our data protection coordinator with your RFQ reference tracking number.'}
          </p>
        </div>
        <a
          href="mailto:privacy@velmora-demo.com"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase px-4 py-2 bg-[#121316] text-white hover:bg-neutral-800 rounded-xs shrink-0"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>privacy@velmora-demo.com</span>
        </a>
      </div>
    </div>
  );
}
