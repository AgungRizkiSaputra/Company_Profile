'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { useRfq } from '@/lib/rfq-context';
import { RfqItem } from '@/types/rfq';
import {
  CheckCircle2,
  Copy,
  Printer,
  ShieldAlert,
} from 'lucide-react';

interface Props {
  lang: Locale;
}

export function RfqSuccessClient({ lang }: Props) {
  const searchParams = useSearchParams();
  const refFromQuery = searchParams.get('ref') || 'VEL-2026-PENDING';
  const dict = dictionaries[lang].success;
  const { lastSubmission } = useRfq();

  const [copied, setCopied] = useState(false);

  const referenceNumber = String(lastSubmission?.referenceNumber || refFromQuery);

  const handleCopy = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 print-clean">
      {/* Success Confirmation Card */}
      <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-lg shadow-elevation space-y-6 text-center">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-[#0b0f17] tracking-tight font-sans">
            {dict.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed font-sans">
            {dict.subtitle}
          </p>
        </div>

        {/* Highlighted Reference Box */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg max-w-md mx-auto space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
            {dict.refLabel}
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-amber-600 tracking-wider">
            {referenceNumber}
          </div>
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 bg-white border border-slate-300 hover:border-black rounded-md text-slate-800 transition-colors shadow-xs"
            >
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>{copied ? (lang === 'id' ? 'Tersalin' : 'Copied!') : (lang === 'id' ? 'Salin Nomor' : 'Copy Reference')}</span>
            </button>
            <button
              onClick={handlePrint}
              className="no-print inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 bg-white border border-slate-300 hover:border-black rounded-md text-slate-800 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>{dict.printBtn}</span>
            </button>
          </div>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono rounded-full font-semibold">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>{dict.statusLabel}: {dict.statusPending}</span>
        </div>
      </div>

      {/* Itemized Summary Section (If lastSubmission is available) */}
      {lastSubmission && (
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-lg shadow-subtle space-y-6">
          <h2 className="text-lg font-bold text-[#0b0f17] font-mono uppercase tracking-wide border-b border-slate-100 pb-3">
            {dict.summaryTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-700 bg-slate-50 p-4 rounded-md border border-slate-200">
            <div>
              <span className="text-slate-400 block font-bold">Company Name:</span>
              <span className="font-bold text-slate-900">{String(lastSubmission.companyName || '-')}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">Contact Person:</span>
              <span className="font-bold text-slate-900">{String(lastSubmission.contactName || '-')}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">Email Address:</span>
              <span className="font-bold text-slate-900">{String(lastSubmission.email || '-')}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">Follow-up Channel:</span>
              <span className="font-bold text-amber-700 uppercase">{String(lastSubmission.followUpChannel || 'EMAIL')}</span>
            </div>
          </div>

          {Array.isArray(lastSubmission.items) && lastSubmission.items.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase text-slate-500 font-bold">
                {dict.itemsSummary} ({lastSubmission.items.length})
              </h3>
              <div className="border border-slate-200 rounded-md overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 font-mono text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Item Description</th>
                      <th className="py-2.5 px-3 text-center">Quantity</th>
                      <th className="py-2.5 px-3">Unit</th>
                      <th className="py-2.5 px-3">Specs / Tolerances</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {(lastSubmission.items as RfqItem[]).map((it, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">
                          {it.productName}
                          {it.isCustomSourcing && (
                            <span className="text-[10px] ml-2 font-mono text-amber-800 bg-amber-50 border border-amber-200 px-1 py-0.5 rounded font-bold">
                              Custom Sourcing
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold">{it.quantity}</td>
                        <td className="py-2.5 px-3 text-slate-600">{it.unit}</td>
                        <td className="py-2.5 px-3 text-slate-500 font-sans">{it.customSpecs || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Next Steps Timeline */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-lg shadow-subtle space-y-6">
        <h2 className="text-lg font-bold text-[#0b0f17] font-mono uppercase tracking-wide border-b border-slate-100 pb-3">
          {dict.nextStepsTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.steps.map((step, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2">
              <div className="text-xs font-mono text-amber-600 font-black">
                PHASE 0{idx + 1}
              </div>
              <h3 className="text-sm font-bold text-[#0b0f17] font-mono">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Commercial Non-Binding Disclaimer Notice */}
      <div className="bg-slate-50 border-l-4 border-amber-500 p-4 rounded-md flex items-start gap-3 border border-slate-200">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-700 leading-relaxed font-sans">
          {dict.disclaimer}
        </p>
      </div>

      {/* Navigation Return Links */}
      <div className="no-print pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={`/${lang}`}
          className="w-full sm:w-auto text-center px-6 py-3 bg-[#0b0f17] text-white hover:bg-slate-800 font-mono text-xs uppercase tracking-wider font-bold rounded-md transition-colors"
        >
          {dict.btnHome}
        </Link>
        <Link
          href={`/${lang}/products`}
          className="w-full sm:w-auto text-center px-6 py-3 bg-white border border-slate-300 hover:border-black text-slate-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-md transition-colors"
        >
          {dict.btnCatalog}
        </Link>
      </div>
    </div>
  );
}
