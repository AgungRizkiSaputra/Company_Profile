import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/types/i18n';
import { dictionaries } from '@/lib/i18n';
import { products } from '@/lib/products-data';
import { ProductCard } from '@/components/ProductCard';
import {
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  Layers,
  Sparkles,
  HelpCircle,
  FileSpreadsheet,
  CheckCircle2,
  Building2,
  Clock,
  Truck,
  FileText,
  BadgePercent,
  Check,
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
    title: `${dict.home.heroHeadline} | PT Velmora Niaga Nusantara`,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        id: '/id',
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const resolved = await params;
  const lang = (resolved.lang === 'id' ? 'id' : 'en') as Locale;
  const dict = dictionaries[lang];

  // Pick 1 featured product per category
  const featuredProducts = [
    products[0], // Valve
    products[2], // PLC
    products[4], // Harness
    products[6], // Paper
  ];

  return (
    <div className="space-y-20 pb-20 bg-[#F4F6F9] selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* 1. HERO SECTION (Industrial General Trading Desk) */}
      <section className="relative pt-10 md:pt-16 border-b border-slate-300 bg-white bg-blueprint-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & Corporate CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono tracking-wider uppercase rounded-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span>
                  {lang === 'id'
                    ? 'PT Velmora Niaga Nusantara • Mitra Pengadaan B2B & Kontraktor Pasokan'
                    : 'PT Velmora Niaga Nusantara • Industrial Procurement & General Supply'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A192F] tracking-tight leading-[1.12]">
                {dict.home.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                {dict.home.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={`/${lang}/quote`}
                  className="inline-flex items-center justify-center gap-2 bg-[#0A192F] hover:bg-slate-800 text-white text-xs font-mono font-bold uppercase tracking-wider px-6 py-4 rounded-sm transition-all shadow-md border border-slate-800"
                >
                  <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                  <span>{dict.home.ctaQuote}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </Link>

                <Link
                  href={`/${lang}/products`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-800 hover:text-amber-700 border border-slate-300 hover:border-amber-600 text-xs font-mono font-bold uppercase tracking-wider px-6 py-4 rounded-sm transition-all shadow-xs"
                >
                  <span>{dict.home.ctaCatalog}</span>
                </Link>
              </div>

              {/* Corporate Credential Metrics */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                <div className="bg-slate-50 p-3.5 rounded-sm border border-slate-200">
                  <div className="text-sm font-bold text-[#0A192F] font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Faktur Pajak e-Faktur</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    PKP DJP Resmi & Dokumen BAST Lengkap
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-sm border border-slate-200">
                  <div className="text-sm font-bold text-[#0A192F] font-mono flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>SLA SPH &lt; 24 Jam</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Respon Cepat Tim Engineering & Sourcing
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-sm border border-slate-200">
                  <div className="text-sm font-bold text-[#0A192F] font-mono flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Tempo Korporasi</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Fasilitas Net-30 / 60 Hari & SKBDN
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Operations Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 w-full rounded-sm overflow-hidden border border-slate-300 shadow-xl bg-slate-900">
                <Image
                  src="/images/hero/hero-procurement.jpg"
                  alt="Operasional pengadaan pasokan industri: katup, kabel daya berpelindung, APD keselamatan, dan instrumentasi"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                {/* Floating Technical Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0A192F]/95 backdrop-blur-md border border-slate-700 p-4 rounded-sm shadow-lg text-white">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      {dict.home.badgeVerified}
                    </span>
                    <span className="text-slate-400">SNI / IEC / ANSI Conformity</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-300 leading-normal">
                    {lang === 'id'
                      ? 'Seluruh spesifikasi material dan suku cadang diperiksa oleh quality desk sebelum pengiriman dari distribution hub.'
                      : 'All engineering specifications verified prior to dispatch from distribution hubs.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR CORE PROCUREMENT DIVISIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-300 pb-4 mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
            01 / DIVISI PASOKAN INDUSTRI
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A192F] tracking-tight mt-1">
            {dict.home.categorySectionTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            {dict.home.categorySectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'industrial-supplies',
              code: 'DIV.01',
              title_en: 'Industrial Supplies & MRO',
              title_id: 'Pasokan Industri & MRO',
              desc_en: 'Control valves, conveyor rollers, piping flanges, high-wear mechanical spares.',
              desc_id: 'Katup kontrol DN50-DN200, roller konveyor baja, flensa perpipaan, dan suku cadang mekanikal pabrik.',
            },
            {
              id: 'electrical-electronics',
              code: 'DIV.02',
              title_en: 'Electrical & Power Systems',
              title_id: 'Sistem Elektrikal & Tenaga',
              desc_en: 'Industrial automation PLCs, multi-core armored XLPE cables, circuit breakers.',
              desc_id: 'Kabel daya berpelindung Cu/XLPE/SWA/PVC berstandar PLN, modul PLC otomasi industri, dan komponen panel.',
            },
            {
              id: 'safety-ppe',
              code: 'DIV.03',
              title_en: 'Certified Safety Gear (PPE/K3)',
              title_id: 'Keselamatan Kerja (K3 / APD)',
              desc_en: 'Ergonomic fall harnesses, chemical nitrile gloves, eye & respiratory gear.',
              desc_id: 'Full-body safety harness sertifikasi CE EN361, sarung tangan kimia nitril EN388, dan alat pelindung diri standar Depnaker.',
            },
            {
              id: 'office-supplies',
              code: 'DIV.04',
              title_en: 'Corporate Facility Supplies',
              title_id: 'Konsolidasi Fasilitas & Kantor',
              desc_en: 'Pallet-load copy paper, heavy-gauge archival steel cabinets, janitorial consumables.',
              desc_id: 'Kertas HVS komersial kuantitas palet (FSC Certified), lemari arsip baja tahan api, dan perlengkapan fasilitas operasional.',
            },
          ].map((cat) => (
            <Link
              key={cat.id}
              href={`/${lang}/products?cat=${cat.id}`}
              className="group p-6 bg-white border border-slate-300 hover:border-amber-600 transition-all rounded-sm flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
                  {cat.code}
                </span>
                <h3 className="text-base font-bold text-[#0A192F] mt-2 group-hover:text-amber-700 transition-colors">
                  {lang === 'id' ? cat.title_id : cat.title_en}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {lang === 'id' ? cat.desc_id : cat.desc_en}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-800">
                <span>{lang === 'id' ? 'Lihat Spesifikasi' : 'View Components'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-600" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED SOURCING ITEMS (Live RFQ Adders) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-300 pb-4 mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
              02 / KATALOG PENGADAAN UTAMA
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A192F] tracking-tight mt-1">
              {lang === 'id' ? 'Komponen Pengadaan Siap Kutip' : 'Core Procurement Components'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {lang === 'id'
                ? 'Pilih item dan tentukan kuantitas yang dibutuhkan untuk langsung diajukan dalam formulir RFQ resmi.'
                : 'Add line items directly to your formal RFQ quotation with customized quantities.'}
            </p>
          </div>
          <Link
            href={`/${lang}/products`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#0A192F] hover:text-amber-700"
          >
            <span>{lang === 'id' ? 'Buka Seluruh Katalog' : 'View Full Catalog'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} lang={lang} />
          ))}
        </div>
      </section>

      {/* 4. VALUE PROPOSITION (Strategic Enterprise Positioning) */}
      <section className="bg-[#0A192F] text-white py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              03 / KEUNGGULAN STRATEGIS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mt-2 text-white">
              {dict.home.positioningTitle}
            </h2>
            <p className="text-slate-400 mt-2 text-base leading-relaxed">
              {dict.home.positioningSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.home.positioningBullets.map((bullet, idx) => (
              <div
                key={idx}
                className="bg-[#0F243C] border border-slate-700/80 p-6 rounded-sm space-y-3 shadow-md"
              >
                <div className="w-8 h-8 rounded-sm bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-xs font-bold">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white">{bullet.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{bullet.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCUREMENT LIFECYCLE (4 Structured Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-300 pb-4 mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
            04 / TATA CARA KERJA SAMA
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A192F] tracking-tight mt-1">
            {dict.home.processTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-1">{dict.home.processSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dict.home.processSteps.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-slate-300 p-6 rounded-sm space-y-4 hover:border-amber-600 transition-colors shadow-xs"
            >
              <div className="text-2xl font-black font-mono text-amber-600">
                {step.number}
              </div>
              <h3 className="text-base font-bold text-[#0A192F] leading-snug">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BESPOKE SOURCING BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0C1B2E] text-white p-8 md:p-12 rounded-sm border border-slate-700 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sourcing Material Khusus & Spesifikasi Kustom</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {dict.home.customSourcingTitle}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {dict.home.customSourcingSubtitle}
            </p>
          </div>
          <Link
            href={`/${lang}/quote`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-6 py-4 rounded-sm font-mono text-xs font-bold uppercase tracking-wider shrink-0 transition-all shadow-lg"
          >
            <span>{dict.home.customSourcingCta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-300 pb-4 mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
            05 / INFORMASI KONTRAK & FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A192F] tracking-tight mt-1">
            {dict.home.faqTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-1">{dict.home.faqSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dict.home.faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-slate-300 p-6 rounded-sm space-y-2 hover:border-amber-600 transition-colors shadow-xs"
            >
              <h3 className="text-sm font-bold text-[#0A192F] flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-slate-300 p-8 sm:p-12 text-center rounded-sm space-y-4 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A192F] tracking-tight">
            {dict.home.ctaSectionTitle}
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            {dict.home.ctaSectionSubtitle}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${lang}/quote`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0A192F] hover:bg-slate-800 text-white px-8 py-3.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>{dict.home.ctaQuote}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-800 border border-slate-300 hover:border-amber-600 px-8 py-3.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
            >
              <span>{lang === 'id' ? 'Hubungi Meja Koordinasi' : 'Contact Sourcing Desk'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
