import React, { Suspense } from 'react';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { products } from '@/lib/products-data';
import { ProductsCatalogClient } from '@/components/ProductsCatalogClient';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang];

  return {
    title: `${dict.products.title} | ${dict.meta.siteName}`,
    description: dict.products.subtitle,
    alternates: {
      canonical: `/${lang}/products`,
      languages: {
        en: '/en/products',
        id: '/id/products',
      },
    },
  };
}

export default async function ProductsPage({ params }: Props) {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold">
          B2B GENERAL TRADING
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#121316] tracking-tight mt-1 font-sans">
          {dict.products.title}
        </h1>
        <p className="text-neutral-600 text-sm max-w-3xl mt-2 leading-relaxed">
          {dict.products.subtitle}
        </p>
      </div>

      {/* Catalog Client with Suspense for SearchParams */}
      <Suspense fallback={<div className="p-12 text-center font-mono text-xs text-neutral-400">Loading catalog matrix...</div>}>
        <ProductsCatalogClient products={products} lang={lang} />
      </Suspense>
    </div>
  );
}
