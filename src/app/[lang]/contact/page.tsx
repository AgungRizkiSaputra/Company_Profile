import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import {
  Mail,
  MessageSquare,
  Building2,
  FileSpreadsheet,
  Phone,
  MapPin,
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
    <div className="space-y-16 py-12 md:py-16 bg-[#f8fafc]">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8 space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
            COMMUNICATION & LOGISTICS HUBS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0b0f17] tracking-tight font-sans">
            {dict.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl mt-2 leading-relaxed font-sans">
            {dict.subtitle}
          </p>
        </div>
      </section>

      {/* Primary Communication Channels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Desk */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-subtle space-y-4">
            <div className="w-10 h-10 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Resmi Pengadaan & Tender
              </div>
              <h3 className="text-base font-bold text-[#0b0f17] font-mono mt-1">
                procurement@velmora.co.id
              </h3>
              <div className="text-xs font-mono text-slate-500 mt-0.5">
                tender@velmora.co.id
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Kirimkan dokumen RFQ resmi berformat PDF atau spreadsheet Microsoft Excel (BOQ).
            </p>
          </div>

          {/* WhatsApp Direct Line */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-subtle space-y-4">
            <div className="w-10 h-10 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                WhatsApp Sourcing Fast Desk
              </div>
              <h3 className="text-base font-bold text-[#0b0f17] font-mono mt-1">
                +62 812-8990-2100
              </h3>
              <div className="text-xs font-mono text-slate-500 mt-0.5">
                Senin - Jumat: 08.00 - 18.00 WIB
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Untuk konfirmasi ketersediaan barang mendesak atau konsultasi spesifikasi teknis cepat.
            </p>
          </div>

          {/* Central Landline */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-subtle space-y-4">
            <div className="w-10 h-10 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Telepon Kantor Pusat
              </div>
              <h3 className="text-base font-bold text-[#0b0f17] font-mono mt-1">
                (021) 8990-2100
              </h3>
              <div className="text-xs font-mono text-slate-500 mt-0.5">
                Hunting 8 Saluran
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Layanan administratif dan verifikasi faktur pajak / Berita Acara Serah Terima (BAST).
            </p>
          </div>
        </div>
      </section>

      {/* Facilities & Physical Locations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Jakarta Corporate Office */}
          <div className="bg-white border border-slate-200 rounded-lg p-7 shadow-subtle space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Headquarters & Sourcing Office</span>
            </div>
            <h3 className="text-lg font-bold text-[#0b0f17] font-mono">
              Menara Mandiri I, Lantai 18
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Jl. Jend. Sudirman Kav. 54-55, Senayan, Kebayoran Baru, Jakarta Selatan 12190
            </p>
            <div className="text-xs font-mono text-slate-500 pt-2 border-t border-slate-100">
              Pertemuan koordinasi tender & legalitas korporat (dengan janji temu).
            </div>
          </div>

          {/* Cikarang Central Logistics Hub */}
          <div className="bg-white border border-slate-200 rounded-lg p-7 shadow-subtle space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Central Distribution & Warehouse Hub</span>
            </div>
            <h3 className="text-lg font-bold text-[#0b0f17] font-mono">
              Kawasan Industri Jababeka V
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Blok B-12 No. 8, Cikarang, Kabupaten Bekasi, Jawa Barat 17530
            </p>
            <div className="text-xs font-mono text-slate-500 pt-2 border-t border-slate-100">
              Titik konsolidasi material MRO, inspeksi QC, dan pemberangkatan armada truk.
            </div>
          </div>
        </div>
      </section>

      {/* Fast RFQ Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0b0f17] text-white rounded-lg p-8 sm:p-10 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-elevation">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold font-mono">
              {lang === 'id' ? 'Ingin Langsung Mengajukan Permintaan Penawaran?' : 'Prefer Submitting an RFQ Directly?'}
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Gunakan formulir digital untuk respon terjamin dalam &le; 24 jam kerja.
            </p>
          </div>
          <Link
            href={`/${lang}/quote`}
            className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider rounded-md transition-colors shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{lang === 'id' ? 'Buka RFQ Builder' : 'Open RFQ Builder'}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
