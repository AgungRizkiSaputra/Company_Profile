import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import {
  Mail,
  MessageSquare,
  Building2,
  Clock,
  ArrowRight,
  ShieldAlert,
  FileSpreadsheet,
} from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang];

  return {
    title: `${dict.contact.title} | ${dict.meta.siteName}`,
    description: dict.contact.subtitle,
    alternates: {
      canonical: `/${lang}/contact`,
      languages: {
        en: '/en/contact',
        id: '/id/contact',
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang].contact;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold">
          COORDINATION & SUPPORT
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#121316] tracking-tight mt-2 font-sans">
          {dict.title}
        </h1>
        <p className="text-base text-neutral-600 max-w-3xl mt-3 leading-relaxed">
          {dict.subtitle}
        </p>
      </div>

      {/* Demo Channel Notice */}
      <div className="bg-neutral-100 border border-neutral-300 p-4 rounded-xs flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 text-neutral-600 shrink-0" />
        <p className="text-xs text-neutral-700 font-mono">
          {lang === 'id'
            ? 'Aset Demonstrasi: Saluran kontak di bawah ini adalah peraga portofolio yang disimulasikan untuk lingkungan staging.'
            : 'Demonstration Asset: The contact channels below are staged portfolio placeholders for simulation purposes.'}
        </p>
      </div>

      {/* Direct Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dict.channels.map((chan, idx) => (
          <div
            key={idx}
            className="bg-white border border-neutral-200 p-6 rounded-xs space-y-4 hover:border-neutral-900 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-semibold">
                {chan.name}
              </span>
              <div className="text-base font-bold text-[#121316] font-mono break-all">
                {chan.value}
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">{chan.note}</p>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <a
                href={chan.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-[#121316] hover:text-blue-700 transition-colors"
              >
                <span>{chan.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Office & Operating Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="bg-white border border-neutral-200 p-8 rounded-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-900 uppercase">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>{dict.officeTitle}</span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed font-sans">
            {dict.officeAddress}
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-8 rounded-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-900 uppercase">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Operating Working Hours</span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed font-mono">
            {dict.officeHours}
          </p>
        </div>
      </div>

      {/* Recommended RFQ Fast-Track Jump */}
      <div className="bg-[#121316] text-white p-8 md:p-10 rounded-xs border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {dict.rfqJumpTitle}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {dict.rfqJumpDesc}
          </p>
        </div>
        <Link
          href={`/${lang}/quote`}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xs font-mono text-xs font-semibold uppercase tracking-wider shrink-0 transition-all shadow-xs"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>{dict.rfqJumpCta}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
