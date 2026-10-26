'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { ShieldCheck, ArrowRight, Building2, Mail, Clock, Phone, Lock, FileCheck } from 'lucide-react';

interface Props {
  lang: Locale;
}

export function Footer({ lang }: Props) {
  const dict = dictionaries[lang];

  return (
    <footer className="bg-[#08121E] text-slate-300 border-t border-slate-800 mt-auto">
      {/* Corporate Compliance & Tender Standards Strip */}
      <div className="bg-[#0A192F] border-b border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <span>{lang === 'id' ? 'Tata Kelola Pengadaan Terakreditasi' : 'Accredited Procurement Governance'}</span>
                <span className="text-[10px] bg-amber-400/10 border border-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-normal">
                  ISO 9001:2015 AUDITED
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-4xl mt-1 leading-relaxed">
                {lang === 'id'
                  ? 'PT Velmora Niaga Nusantara beroperasi berdasarkan izin usaha KBLI 4659, 4663, dan 4669. Seluruh transaksi didukung dokumen resmi: Faktur Pajak e-Faktur terverifikasi DJP, Berita Acara Serah Terima (BAST), Certificate of Conformance (COC), dan fasilitas tempo korporasi Net-30/60.'
                  : 'PT Velmora Niaga Nusantara operates under official KBLI trading licenses 4659, 4663, and 4669. All contracts comply with Indonesian fiscal regulations with official VAT e-Faktur, Certificate of Origin/Conformance, and enterprise Net-30/60 billing terms.'}
              </p>
            </div>
          </div>
          <Link
            href={`/${lang}/services#compliance`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4 shrink-0 font-semibold"
          >
            <span>{lang === 'id' ? 'Pelajari Standar Kepatuhan' : 'Compliance Protocol'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Corporate Entity Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-slate-950 font-mono text-base shadow-sm">
                V
              </div>
              <div>
                <span className="text-xl font-black font-mono tracking-tight text-white">
                  VELMORA
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono text-slate-400 border-l border-slate-700 pl-2 ml-2">
                  NIAGA NUSANTARA
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans">
              {lang === 'id'
                ? 'Mitra pengadaan terintegrasi untuk pasokan industrial MRO, sistem kelistrikan berstandar PLN/SPLN, alat keselamatan kerja K3 bersertifikasi, serta konsolidasi perlengkapan fasilitas korporasi nasional.'
                : 'Integrated procurement partner for industrial MRO supplies, certified electrical power systems, certified safety PPE gear, and multi-branch corporate facility consolidation.'}
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400 font-mono">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Menara Mandiri I Lt. 18, Jl. Jend. Sudirman Kav. 54-55, Jakarta Selatan 12190</span>
              </div>
              <div className="flex items-start gap-2">
                <FileCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Logistics Hub: Kawasan Industri Jababeka V, Cikarang, Jawa Barat 17530</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>procurement@velmora.co.id / tender@velmora.co.id</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Hotline: (021) 8990-2100 / WA: +62 812-8990-2100</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-white">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li>
                <Link href={`/${lang}`} className="hover:text-amber-400 transition-colors">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/products`} className="hover:text-amber-400 transition-colors">
                  {dict.nav.products}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-amber-400 transition-colors">
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="hover:text-amber-400 transition-colors">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-amber-400 transition-colors">
                  {dict.nav.contact}
                </Link>
              </li>
              <li className="pt-1">
                <Link href={`/${lang}/quote`} className="text-amber-400 hover:text-amber-300 font-bold font-mono">
                  {dict.nav.requestQuote} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-white">
              {dict.footer.categories}
            </h3>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li>
                <Link
                  href={`/${lang}/products?cat=industrial-supplies`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'id' ? 'Pasokan Industri & MRO' : 'Industrial Supplies & MRO'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/products?cat=electrical-electronics`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'id' ? 'Elektrikal & Tenaga' : 'Electrical & Electronics'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/products?cat=safety-ppe`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'id' ? 'Keselamatan Kerja & APD' : 'Safety & PPE'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/products?cat=office-supplies`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'id' ? 'Fasilitas & Perlengkapan Kantor' : 'Office Supplies & Facility'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Admin Desk Access */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-white">
              {dict.footer.compliance}
            </h3>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li>
                <Link
                  href={`/${lang}/privacy-policy`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {dict.footer.privacyPolicy} (UU PDP)
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/terms-of-use`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {dict.footer.termsOfUse}
                </Link>
              </li>

              {/* Direct Admin Login Entry */}
              <li className="pt-3 border-t border-slate-800">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 text-xs font-mono font-semibold transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Portal Petugas RFQ (Login)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} PT Velmora Niaga Nusantara. {dict.footer.rightsReserved}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>NIB: 022020819281</span>
            <span>•</span>
            <span>NPWP: 42.910.824.1-014.000 (PKP DJP)</span>
            <span>•</span>
            <span className="text-amber-500 font-bold">Enterprise v2.6.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
