'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types/product';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { ProductCard } from '@/components/ProductCard';
import { Search, Filter, Layers, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';

interface Props {
  products: Product[];
  lang: Locale;
}

export function ProductsCatalogClient({ products, lang }: Props) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const dict = dictionaries[lang].products;

  const categories = [
    { id: 'all', label_en: 'All Categories (8)', label_id: 'Semua Kategori (8)' },
    { id: 'industrial-supplies', label_en: 'Industrial Supplies & MRO', label_id: 'Pasokan Industri & MRO' },
    { id: 'electrical-electronics', label_en: 'Electrical & Electronics', label_id: 'Elektrikal & Elektronik' },
    { id: 'safety-ppe', label_en: 'Safety & PPE', label_id: 'Keselamatan Kerja & APD' },
    { id: 'office-supplies', label_en: 'Office Supplies & Facility', label_id: 'Perlengkapan Kantor & Fasilitas' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category check
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const name = (lang === 'id' ? product.name_id : product.name_en).toLowerCase();
        const desc = (lang === 'id' ? product.description_id : product.description_en).toLowerCase();
        const specsMatch = product.specs.some(
          (s) =>
            s.val.toLowerCase().includes(query) ||
            s.key_en.toLowerCase().includes(query) ||
            s.key_id.toLowerCase().includes(query)
        );

        return name.includes(query) || desc.includes(query) || specsMatch;
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery, lang]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative grow">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.searchPlaceholder}
              className="w-full pl-10 pr-16 py-2.5 text-sm border border-slate-200 rounded-md focus:outline-hidden focus:border-amber-500 bg-slate-50/60 font-sans transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-black font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          <Link
            href={`/${lang}/quote`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0b0f17] text-white text-xs font-mono font-semibold uppercase tracking-wider rounded-md hover:bg-slate-800 transition-colors shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span>{lang === 'id' ? 'Item Khusus / BOQ' : 'Custom Sourcing'}</span>
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          <span className="text-xs font-mono text-slate-500 mr-1 flex items-center gap-1 font-semibold">
            <Filter className="w-3.5 h-3.5 text-amber-600" />
            Category:
          </span>
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            const label = lang === 'id' ? cat.label_id : cat.label_en;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-mono px-3.5 py-1.5 rounded-md transition-all ${
                  active
                    ? 'bg-[#0b0f17] text-white font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Active Status */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
        <div>
          Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of {products.length} standard items
        </div>
        {searchQuery && (
          <div>
            Filtered by keyword: <span className="font-bold text-amber-600">&ldquo;{searchQuery}&rdquo;</span>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-4 shadow-subtle">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-mono">
            {dict.noResults}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {lang === 'id'
              ? 'Item yang Anda cari belum tercatat di katalog standar. Anda dapat memasukkan spesifikasi kustom langsung ke dalam draft RFQ.'
              : 'The requested item is not in our standard stock list. You can input custom specifications directly into your RFQ.'}
          </p>
          <div className="pt-2">
            <Link
              href={`/${lang}/quote`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider rounded-md transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{lang === 'id' ? 'Ajukan Custom RFQ' : 'Submit Custom RFQ'}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
