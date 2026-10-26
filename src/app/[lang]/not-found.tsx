import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-12 h-12 bg-neutral-200 text-neutral-700 rounded-full flex items-center justify-center mx-auto">
        <FileQuestion className="w-6 h-6" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
          ERROR 404 / RESOURCE NOT LOCATED
        </span>
        <h1 className="text-3xl font-black text-[#121316] tracking-tight">
          Page or Component Not Found
        </h1>
        <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
          The requested specification sheet, catalog line item, or page route could not be resolved on this system.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/en"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121316] text-white hover:bg-neutral-800 rounded-xs font-mono text-xs uppercase font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Overview</span>
        </Link>
        <Link
          href="/en/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-neutral-300 hover:border-black text-neutral-800 rounded-xs font-mono text-xs uppercase font-semibold transition-colors"
        >
          <span>Browse Catalog</span>
        </Link>
      </div>
    </div>
  );
}
