'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { useRfq } from '@/lib/rfq-context';
import {
  CheckCircle2,
  Copy,
  Printer,
  ArrowRight,
  ShieldAlert,
  Building2,
  Mail,
  Phone,
  Clock,
  FileText,
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

  const referenceNumber = lastSubmission?.referenceNumber || refFromQuery;

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
      <div className="bg-white border border-neutral-200 p-8 sm:p-12 rounded-xs shadow-sm space-y-6 text-center">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-[#121316] tracking-tight">
            {dict.title}
          </h1>
          <p className="text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* Highlighted Reference Box */}
        <div className="bg-neutral-50 border border-neutral-300 p-6 rounded-xs max-w-md mx-auto space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
            {dict.refLabel}
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-blue-700 tracking-wider">
            {referenceNumber}
          </div>
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 bg-white border border-neutral-300 hover:border-black rounded-xs text-neutral-800 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? (lang === 'id' ? 'Tersalin' : 'Copied!') : (lang === 'id' ? 'Salin Nomor' : 'Copy Reference')}</span>
            </button>
            <button
              onClick={handlePrint}
              className="no-print inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 bg-white border border-neutral-300 hover:border-black rounded-xs text-neutral-800 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{dict.printBtn}</span>
            </button>
          </div>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono rounded-full">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>{dict.statusLabel}: {dict.statusPending}</span>
        </div>
      </div>

      {/* Itemized Summary Section (If lastSubmission is available) */}
      {lastSubmission && (
        <div className="bg-white border border-neutral-200 p-6 sm:p-8 rounded-xs shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-[#121316] font-mono uppercase tracking-wide border-b border-neutral-200 pb-3">
            {dict.summaryTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-neutral-700 bg-neutral-50 p-4 rounded-xs border border-neutral-200">
            <div>
              <span className="text-neutral-400 block">Company Name:</span>
              <span className="font-bold text-neutral-900">{lastSubmission.companyName}</span>
            </div>
            <div>
              <span className="text-neutral-400 block">Contact Person:</span>
              <span className="font-bold text-neutral-900">{lastSubmission.contactName}</span>
            </div>
            <div>
              <span className="text-neutral-400 block">Email Address:</span>
              <span className="font-bold text-neutral-900">{lastSubmission.email}</span>
            </div>
            <div>
              <span className="text-neutral-400 block">Follow-up Channel:</span>
              <span className="font-bold text-blue-700 uppercase">{lastSubmission.followUpChannel}</span>
            </div>
          </div>

          {lastSubmission.items && lastSubmission.items.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase text-neutral-500 font-semibold">
                {dict.itemsSummary} ({lastSubmission.items.length})
              </h3>
              <div className="border border-neutral-200 rounded-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100 font-mono text-neutral-700 border-b border-neutral-200">
                    <tr>
                      <th className="py-2.5 px-3">Item Description</th>
                      <th className="py-2.5 px-3 text-center">Quantity</th>
                      <th className="py-2.5 px-3">Unit</th>
                      <th className="py-2.5 px-3">Specs / Tolerances</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {lastSubmission.items.map((it: any, i: number) => (
                      <tr key={i} className="hover:bg-neutral-50">
                        <td className="py-2.5 px-3 font-semibold text-neutral-900">
                          {it.productName}
                          {it.isCustomSourcing && (
                            <span className="text-[10px] ml-2 font-mono text-blue-700 bg-blue-50 px-1 py-0.5 rounded">
                              Custom Sourcing
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono">{it.quantity}</td>
                        <td className="py-2.5 px-3 font-mono text-neutral-600">{it.unit}</td>
                        <td className="py-2.5 px-3 text-neutral-500 font-sans">{it.customSpecs || '-'}</td>
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
      <div className="bg-white border border-neutral-200 p-6 sm:p-8 rounded-xs shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-[#121316] font-mono uppercase tracking-wide border-b border-neutral-200 pb-3">
          {dict.nextStepsTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.steps.map((step, idx) => (
            <div key={idx} className="p-4 bg-neutral-50 border border-neutral-200 rounded-xs space-y-2">
              <div className="text-xs font-mono text-blue-700 font-bold">
                PHASE 0{idx + 1}
              </div>
              <h3 className="text-sm font-bold text-[#121316]">{step.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Commercial Non-Binding Disclaimer Notice */}
      <div className="bg-neutral-100 border-l-4 border-neutral-800 p-4 rounded-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
        <p className="text-xs text-neutral-700 leading-relaxed font-sans">
          {dict.disclaimer}
        </p>
      </div>

      {/* Navigation Return Links */}
      <div className="no-print pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={`/${lang}`}
          className="w-full sm:w-auto text-center px-6 py-3 bg-[#121316] text-white hover:bg-neutral-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors"
        >
          {dict.btnHome}
        </Link>
        <Link
          href={`/${lang}/products`}
          className="w-full sm:w-auto text-center px-6 py-3 bg-white border border-neutral-300 hover:border-black text-neutral-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors"
        >
          {dict.btnCatalog}
        </Link>
      </div>
    </div>
  );
}
