import React from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { products, getProductBySlug } from '@/lib/products-data';
import { ProductDetailClient } from '@/components/ProductDetailClient';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  const locales = ['en', 'id'];

  for (const lang of locales) {
    for (const product of products) {
      params.push({ lang, slug: product.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const product = getProductBySlug(resolved.slug);

  if (!product) {
    return {
      title: 'Product Not Found | Velmora',
    };
  }

  const name = lang === 'id' ? product.name_id : product.name_en;
  const description = lang === 'id' ? product.description_id : product.description_en;

  return {
    title: `${name} | Velmora Procurement Catalog`,
    description,
    openGraph: {
      title: `${name} | Velmora`,
      description,
      images: [{ url: product.image, alt: name }],
    },
    alternates: {
      canonical: `/${lang}/products/${product.slug}`,
      languages: {
        en: `/en/products/${product.slug}`,
        id: `/id/products/${product.slug}`,
      },
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const product = getProductBySlug(resolved.slug);

  if (!product) {
    notFound();
  }

  const name = lang === 'id' ? product.name_id : product.name_en;
  const description = lang === 'id' ? product.description_id : product.description_en;

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: product.image,
    sku: product.slug.toUpperCase(),
    category: product.category,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      price: '0',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2027-12-31',
      description: 'Pricing available on demand via formal Request for Quotation (RFQ).',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} lang={lang} />
    </div>
  );
}
