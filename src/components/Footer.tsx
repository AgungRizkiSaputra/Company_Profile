'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { ShieldCheck, ArrowRight, Building2, Mail, Phone, FileCheck, ArrowUpRight } from 'lucide-react';

interface Props {
  lang: Locale;
}

export function Footer({ lang }: Props) {
  const dict = dictionaries[lang];

  return (
    <footer className="bg-[#0b0f17] text-slate-300 border-t border-slate-800 mt-auto">
      {/* Corporate Compliance & Tender Standards Strip */}
      <div className="bg-[#0f172a] border-b border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex flex-wrap items-center gap-2">
                <span>{lang === 'id' ? 'Tata Kelola Pengadaan Terakreditasi' : 'Accredited Procurement Governance'}</span>
                <span className="text-[10px] bg-amber-400/15 border border-amber-400/30 text-amber-300 px-2 py-0.5 rounded font-mono font-medium">
                  ISO 9001:2015 REGISTERED
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-4xl mt-1.5 leading-relaxed font-sans">
                {lang === 'id'
                  ? 'PT Velmora Niaga Nusantara beroperasi berdasarkan perizinan KBLI 4659, 4663, dan 4669. Seluruh transaksi didukung dokumentasi kepatuhan korporasi: Faktur Pajak e-Faktur terverifikasi DJP, Berita Acara Serah Terima (BAST), Certificate of Conformance (COC), dan fasilitas termin Net-30/60 untuk badan hukum tersertifikasi.'
                  : 'PT Velmora Niaga Nusantara operates under official Indonesian KBLI trading codes 4659, 4663, and 4669. Contracts comply with standard corporate governance: validated VAT e-Faktur, Certificate of Origin/Conformance, and enterprise Net-30/60 billing protocols.'}
              </p>
            </div>
          </div>
          <Link
            href={`/${lang}/services#compliance`}
            className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 font-semibold px-3 py-1.5 rounded bg-slate-800/60 hover:bg-slate-800 border border-slate-700 shrink-0 transition-colors"
          >
            <span>{lang === 'id' ? 'Protokol Kepatuhan' : 'Compliance Protocol'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Corporate Entity Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-amber-500 flex items-center justify-center font-bold text-slate-950 font-mono text-base shadow-sm">
                V
              </div>
              <div>
                <span className="text-xl font-black font-mono tracking-tight text-white">
                  VELMORA
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono text-slate-400 border-l border-slate-700 pl-2.5 ml-2.5">
                  NIAGA NUSANTARA
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-sans">
              {lang === 'id'
                ? 'Mitra pengadaan terintegrasi untuk pasokan industrial MRO, sistem kelistrikan berstandar PLN/SPLN, alat keselamatan kerja K3 bersertifikasi, serta konsolidasi perlengkapan fasilitas korporasi nasional.'
                : 'Integrated procurement partner for industrial MRO supplies, certified electrical power systems, certified safety PPE gear, and multi-branch corporate facility consolidation.'}
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-slate-400 font-mono">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Menara Mandiri I Lt. 18, Jl. Jend. Sudirman Kav. 54-55, Jakarta Selatan 12190</span>
              </div>
              <div className="flex items-start gap-2.5">
                <FileCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Logistics Hub: Kawasan Industri Jababeka V, Cikarang, Jawa Barat 17530</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">procurement@velmora.co.id / tender@velmora.co.id</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">Hotline: (021) 8990-2100 • WA: +62 812-8990-2100</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-white border-b border-slate-800 pb-2">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li>
                <Link href={`/${lang}`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">›</span> {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/products`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">›</span> {dict.nav.products}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">›</span> {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">›</span> {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">›</span> {dict.nav.contact}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/quote`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-400 font-medium">
                  <span className="text-amber-500">›</span> RFQ Builder & Sourcing
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-white border-b border-slate-800 pb-2">
              {lang === 'id' ? 'Kategori Pasokan' : 'Procurement Portfolios'}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li>
                <Link href={`/${lang}/products?cat=industrial-supplies`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">›</span> {lang === 'id' ? 'Pasokan Industri & MRO' : 'Industrial Supplies & MRO'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/products?cat=electrical-electronics`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">›</span> {lang === 'id' ? 'Elektrikal & Otomasi Sistem' : 'Electrical & Automation Systems'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/products?cat=safety-ppe`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">›</span> {lang === 'id' ? 'Keselamatan Kerja & APD (K3)' : 'Safety & PPE (K3 Certified)'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/products?cat=office-supplies`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">›</span> {lang === 'id' ? 'Perlengkapan Kantor & Fasilitas' : 'Corporate Office & Facility'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Sourcing SLA Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-white border-b border-slate-800 pb-2">
              Operational SLA
            </h3>
            <div className="bg-slate-900/80 border border-slate-800 rounded-md p-3.5 space-y-3 font-mono text-[11px]">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Tanggapan RFQ:</span>
                <span className="font-bold text-amber-400">&le; 24 Jam</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Custom Sourcing:</span>
                <span className="font-bold text-slate-200">2-3 Hari</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Fasilitas Kredit:</span>
                <span className="font-bold text-emerald-400">Net 30/60</span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <Link
                  href="/admin/login"
                  className="w-full inline-flex items-center justify-center gap-1 text-[11px] text-slate-400 hover:text-amber-300 transition-colors"
                >
                  <span>Portal Internal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} PT Velmora Niaga Nusantara. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}/privacy-policy`} className="hover:text-slate-300 transition-colors">
              {dict.footer.privacyPolicy} (UU PDP No. 27/2022)
            </Link>
            <Link href={`/${lang}/terms-of-use`} className="hover:text-slate-300 transition-colors">
              {dict.footer.termsOfUse}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
