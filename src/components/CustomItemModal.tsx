'use client';

import React, { useState } from 'react';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { X, Plus, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: {
    productName: string;
    category: string;
    quantity: number;
    unit: string;
    customSpecs?: string;
  }) => void;
  lang: Locale;
}

export function CustomItemModal({ isOpen, onClose, onAdd, lang }: Props) {
  const dict = dictionaries[lang].rfq.customModal;

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Industrial Supplies & MRO');
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState('Units');
  const [specs, setSpecs] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(
        lang === 'id'
          ? 'Nama atau deskripsi barang wajib diisi'
          : 'Product / requirement name is required'
      );
      return;
    }
    onAdd({
      productName: name.trim(),
      category,
      quantity: Math.max(1, qty),
      unit: unit.trim() || 'Units',
      customSpecs: specs.trim(),
    });
    setName('');
    setSpecs('');
    setQty(1);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xs max-w-lg w-full p-6 shadow-2xl border border-neutral-200">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <h3 className="text-base font-bold text-[#121316] font-mono uppercase tracking-wide">
            {dict.title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-black transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-600 mb-1 font-semibold">
              {dict.nameLabel} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder={
                lang === 'id'
                  ? 'contoh: Pipa Seamless Stainless Steel 316L Sch 40'
                  : 'e.g. Stainless Steel 316L Seamless Pipe Sch 40'
              }
              className="w-full text-sm border border-neutral-300 rounded-xs px-3 py-2 focus:outline-hidden focus:border-blue-600 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 mb-1 font-semibold">
                {dict.categoryLabel}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm border border-neutral-300 rounded-xs px-3 py-2 bg-white focus:outline-hidden focus:border-blue-600 font-sans"
              >
                <option value="Industrial Supplies & MRO">Industrial Supplies & MRO</option>
                <option value="Electrical & Electronics">Electrical & Electronics</option>
                <option value="Safety & PPE">Safety & PPE</option>
                <option value="Office Supplies & Facility">Office Supplies & Facility</option>
                <option value="Raw Materials & Metals">Raw Materials & Metals</option>
                <option value="Custom Machining / Spares">Custom Machining / Spares</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-1 font-semibold">
                  {dict.qtyLabel} *
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full text-sm border border-neutral-300 rounded-xs px-3 py-2 focus:outline-hidden focus:border-blue-600 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-1 font-semibold">
                  {dict.unitLabel}
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g. Mtr / Pcs"
                  className="w-full text-sm border border-neutral-300 rounded-xs px-3 py-2 focus:outline-hidden focus:border-blue-600 font-sans"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-600 mb-1 font-semibold">
              {dict.specsLabel}
            </label>
            <textarea
              rows={3}
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              placeholder={
                lang === 'id'
                  ? 'Cantumkan standar material (ASTM/DIN), dimensi toleransi, atau merek referensi jika ada...'
                  : 'Specify ASTM/DIN standards, wall thickness, metallurgical tolerances, or target manufacturer brand...'
              }
              className="w-full text-sm border border-neutral-300 rounded-xs px-3 py-2 focus:outline-hidden focus:border-blue-600 font-sans"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono uppercase border border-neutral-300 rounded-xs text-neutral-700 hover:bg-neutral-50"
            >
              {dict.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-mono uppercase bg-[#121316] text-white hover:bg-neutral-800 rounded-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{dict.submitBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
