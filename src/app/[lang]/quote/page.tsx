import React, { Suspense } from 'react';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { RfqBuilderClient } from '@/components/RfqBuilderClient';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang];

  return {
    title: `${dict.rfq.pageTitle} | ${dict.meta.siteName}`,
    description: dict.rfq.pageSubtitle,
    robots: {
      index: false, // Prevent search engines from indexing user-specific quote forms
      follow: true,
    },
    alternates: {
      canonical: `/${lang}/quote`,
      languages: {
        en: '/en/quote',
        id: '/id/quote',
      },
    },
  };
}

export default async function QuotePage({ params }: Props) {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang].rfq;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold">
          FORMAL PROCUREMENT ENQUIRY
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#121316] tracking-tight mt-1 font-sans">
          {dict.pageTitle}
        </h1>
        <p className="text-neutral-600 text-sm max-w-3xl mt-2 leading-relaxed">
          {dict.pageSubtitle}
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center font-mono text-xs text-neutral-400">Loading RFQ engine...</div>}>
        <RfqBuilderClient lang={lang} />
      </Suspense>
    </div>
  );
}
