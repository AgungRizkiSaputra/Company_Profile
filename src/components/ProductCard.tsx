'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Locale } from '@/types/i18n';
import { useRfq } from '@/lib/rfq-context';
import { Plus, Check, ArrowRight } from 'lucide-react';

interface Props {
  product: Product;
  lang: Locale;
}

export function ProductCard({ product, lang }: Props) {
  const { addItem } = useRfq();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const name = lang === 'id' ? product.name_id : product.name_en;
  const description = lang === 'id' ? product.description_id : product.description_en;
  const categoryName = lang === 'id' ? product.category_name_id : product.category_name_en;
  const unit = lang === 'id' ? product.unit_id : product.unit_en;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, qty, unit);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="group bg-white border border-slate-300 hover:border-amber-600 transition-all duration-200 flex flex-col justify-between overflow-hidden rounded-sm shadow-xs hover:shadow-md">
      {/* Visual Header */}
      <div>
        <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden border-b border-slate-200">
          <Image
            src={product.image}
            alt={lang === 'id' ? product.alt_id : product.alt_en}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-102 transition-transform duration-300"
            priority={false}
          />
          <div className="absolute top-2.5 left-2.5 bg-[#0A192F]/95 border border-slate-700 text-amber-300 text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
            {categoryName}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1.5">
            <span className="font-semibold text-slate-700">SKU: {product.slug.substring(0, 12).toUpperCase()}</span>
            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 border border-slate-200">{unit}</span>
          </div>

          <h3 className="text-base font-bold text-[#0A192F] group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
            <Link href={`/${lang}/products/${product.slug}`}>{name}</Link>
          </h3>

          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Key Specs Preview (First 2 specs) */}
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
            {product.specs.slice(0, 2).map((spec, i) => (
              <div key={i} className="flex justify-between text-[11px] leading-tight">
                <span className="text-slate-500 truncate mr-2">
                  {lang === 'id' ? spec.key_id : spec.key_en}:
                </span>
                <span className="font-mono text-slate-800 font-semibold text-right shrink-0">
                  {spec.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-5 pb-5 pt-2 flex items-center gap-2">
        <div className="flex items-center border border-slate-300 rounded-sm bg-slate-50">
          <input
            type="number"
            min={1}
            max={9999}
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 text-center text-xs font-mono py-1.5 bg-transparent border-none focus:outline-hidden text-slate-900 font-bold"
            aria-label="Quantity"
          />
        </div>

        <button
          onClick={handleAdd}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-mono uppercase tracking-wider rounded-sm transition-all ${
            added
              ? 'bg-emerald-700 text-white font-bold shadow-xs'
              : 'bg-[#0A192F] text-white hover:bg-slate-800 font-bold border border-slate-800 shadow-xs'
          }`}
          aria-label={`Add ${name} to RFQ`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? 'Ditambahkan' : 'Added'}</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'id' ? '+ Ke RFQ' : '+ Add RFQ'}</span>
            </>
          )}
        </button>

        <Link
          href={`/${lang}/products/${product.slug}`}
          className="p-2 border border-slate-300 hover:border-amber-600 rounded-sm text-slate-600 hover:text-amber-700 transition-colors"
          title={lang === 'id' ? 'Lihat Spesifikasi Lengkap' : 'View Full Specifications'}
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
