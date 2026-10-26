'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { useRfq } from '@/lib/rfq-context';
import {
  Plus,
  Check,
  ArrowRight,
  ShieldCheck,
  Truck,
  FileCheck2,
  ChevronRight,
} from 'lucide-react';

interface Props {
  product: Product;
  lang: Locale;
}

export function ProductDetailClient({ product, lang }: Props) {
  const { addItem, items } = useRfq();
  const [qty, setQty] = useState(1);
  const [customSpecs, setCustomSpecs] = useState('');
  const [added, setAdded] = useState(false);

  const dict = dictionaries[lang].products;

  const name = lang === 'id' ? product.name_id : product.name_en;
  const description = lang === 'id' ? product.description_id : product.description_en;
  const categoryName = lang === 'id' ? product.category_name_id : product.category_name_en;
  const unit = lang === 'id' ? product.unit_id : product.unit_en;
  const useCases = lang === 'id' ? product.use_cases_id : product.use_cases_en;

  const isAlreadyInRfq = items.some((item) => item.productId === product.slug);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(product, qty, unit, customSpecs);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb Trail */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-500">
        <Link href={`/${lang}`} className="hover:text-black">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <Link href={`/${lang}/products`} className="hover:text-black">
          Catalog
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <Link
          href={`/${lang}/products?cat=${product.category}`}
          className="hover:text-black"
        >
          {categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 font-semibold truncate max-w-xs">{name}</span>
      </nav>

      {/* Main Two-Column Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Product Imagery, Specs Table, Applications */}
        <div className="lg:col-span-7 space-y-10">
          {/* Main Visual */}
          <div className="relative aspect-4/3 w-full bg-neutral-100 rounded-xs overflow-hidden border border-neutral-200 shadow-xs">
            <Image
              src={product.image}
              alt={lang === 'id' ? product.alt_id : product.alt_en}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#121316]/90 backdrop-blur-xs text-white text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-xs">
              {categoryName}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-4">
            <div className="border-b border-neutral-200 pb-2 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#121316] font-mono uppercase tracking-wide">
                {dict.specifications}
              </h2>
              <span className="text-xs font-mono text-neutral-500">ISO / Technical Baseline</span>
            </div>

            <div className="border border-neutral-200 rounded-xs overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50/70 border-y border-neutral-100'}
                    >
                      <th className="py-3 px-4 font-mono font-medium text-neutral-600 w-1/3">
                        {lang === 'id' ? spec.key_id : spec.key_en}
                      </th>
                      <td className="py-3 px-4 font-mono text-neutral-900 font-semibold">
                        {spec.val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Applications */}
          <div className="space-y-4">
            <div className="border-b border-neutral-200 pb-2">
              <h2 className="text-lg font-bold text-[#121316] font-mono uppercase tracking-wide">
                {dict.recommendedUse}
              </h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {useCases.map((useCase, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-white border border-neutral-200 rounded-xs text-xs text-neutral-700 flex items-start gap-2.5"
                >
                  <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Sticky Commercial & RFQ Configurator Box */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <div className="bg-white border border-neutral-200 p-6 sm:p-8 rounded-xs shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1">
                <span>SKU: {product.slug.toUpperCase()}</span>
                <span className="text-blue-700 font-medium">B2B Commercial Line</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#121316] tracking-tight leading-tight">
                {name}
              </h1>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Quoting Unit & Pricing Note */}
            <div className="pt-4 border-t border-neutral-200 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-500">{dict.unitLabel}:</span>
                <span className="font-bold text-neutral-900">{unit}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-500">Commercial Pricing:</span>
                <span className="font-bold text-blue-700">Issued via Official RFQ</span>
              </div>
            </div>

            {/* Interactive Add to RFQ Form */}
            <form onSubmit={handleAdd} className="pt-4 border-t border-neutral-200 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-mono uppercase text-neutral-600 mb-1 font-semibold">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99999}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full text-sm font-mono border border-neutral-300 rounded-xs px-3 py-2.5 focus:outline-hidden focus:border-blue-600 bg-neutral-50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-mono uppercase text-neutral-600 mb-1 font-semibold">
                    Unit of Measure
                  </label>
                  <input
                    type="text"
                    disabled
                    value={unit}
                    className="w-full text-sm font-mono border border-neutral-200 rounded-xs px-3 py-2.5 bg-neutral-100 text-neutral-600 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-1 font-semibold">
                  {lang === 'id'
                    ? 'Catatan Spesifikasi / Toleransi Proyek (Opsional)'
                    : 'Project Tolerances or Specific Requirements (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={customSpecs}
                  onChange={(e) => setCustomSpecs(e.target.value)}
                  placeholder={
                    lang === 'id'
                      ? 'contoh: Perlu sertifikat uji material 3.1, flange rating ANSI 300...'
                      : 'e.g. Require 3.1 mill test certificates, ANSI 300 flange rating...'
                  }
                  className="w-full text-xs font-sans border border-neutral-300 rounded-xs p-2.5 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 px-4 font-mono text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center justify-center gap-2 transition-all shadow-xs ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#121316] text-white hover:bg-neutral-800'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{dict.addedToRfq}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>{dict.addToRfq}</span>
                  </>
                )}
              </button>

              {isAlreadyInRfq && (
                <div className="pt-2 text-center">
                  <Link
                    href={`/${lang}/quote`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-700 hover:text-blue-900 font-semibold"
                  >
                    <span>{lang === 'id' ? 'Item ini ada di daftar RFQ. Buka Formulir' : 'Item is in your RFQ list. Review Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </form>

            {/* Quality & Staging Assurances */}
            <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-500 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pre-shipment dimensional conformity verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-600" />
                <span>Flexible Incoterms (Ex-Works, FOB, DDP site)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
