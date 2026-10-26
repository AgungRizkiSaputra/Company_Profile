'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, ProductCategory } from '@/types/product';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { ProductCard } from '@/components/ProductCard';
import { Search, Filter, AlertCircle, Info } from 'lucide-react';

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
      <div className="bg-white border border-neutral-200 p-4 rounded-xs shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative grow">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-200 rounded-xs focus:outline-hidden focus:border-blue-600 bg-neutral-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-black"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100">
          <span className="text-xs font-mono text-neutral-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Category:
          </span>
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            const label = lang === 'id' ? cat.label_id : cat.label_en;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-mono px-3 py-1.5 rounded-xs transition-colors ${
                  active
                    ? 'bg-[#121316] text-white font-semibold'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* B2B Quotation Protocol Notice */}
      <div className="bg-blue-50/60 border-l-4 border-blue-600 p-4 rounded-xs flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wide text-blue-900">
            {dict.b2bNoticeTitle}
          </h4>
          <p className="text-xs text-blue-800/90 mt-0.5 leading-relaxed">
            {dict.b2bNoticeDesc}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 p-12 text-center rounded-xs space-y-3">
          <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto" />
          <h3 className="text-base font-bold text-neutral-800">{dict.noResults}</h3>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs font-mono uppercase tracking-wider text-blue-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
