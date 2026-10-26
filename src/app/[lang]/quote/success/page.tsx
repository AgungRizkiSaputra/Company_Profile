import React, { Suspense } from 'react';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { RfqSuccessClient } from '@/components/RfqSuccessClient';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang];

  return {
    title: `${dict.success.title} | ${dict.meta.siteName}`,
    description: dict.success.subtitle,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function QuoteSuccessPage({ params }: Props) {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Suspense fallback={<div className="p-12 text-center font-mono text-xs text-neutral-400">Loading receipt details...</div>}>
        <RfqSuccessClient lang={lang} />
      </Suspense>
    </div>
  );
}
