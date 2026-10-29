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
  Layers,
  FileSpreadsheet,
  Building2,
  Clock,
  Search,
  Sparkles,
  ArrowUpRight,
  FileText,
  ChevronRight,
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

  // Featured representative products (1 per category)
  const featuredProducts = [
    products[0], // Pneumatic Valve (Industrial MRO)
    products[2], // PLC Module (Electrical)
    products[4], // Safety Harness (Safety PPE)
    products[6], // Copy Paper Pallet (Facility)
  ];

  return (
    <div className="space-y-24 pb-24 bg-[#f8fafc] text-[#090d16] font-sans selection:bg-[#0b0f17] selection:text-white">
      {/* 1. HERO SECTION (Architectural Editorial B2B Trading Desk) */}
      <section className="relative pt-8 sm:pt-12 md:pt-16 pb-16 md:pb-24 border-b border-slate-200 bg-white overflow-hidden bg-precision-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Mission & Core Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-mono font-semibold tracking-wider uppercase rounded-xs">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span>
                  {lang === 'id'
                    ? 'PT Velmora Niaga Nusantara • Mitra Pengadaan B2B Terakreditasi'
                    : 'PT Velmora Niaga Nusantara • Accredited B2B Procurement Partner'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b0f17] tracking-tight leading-[1.12]">
                {dict.home.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                {dict.home.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href={`/${lang}/quote`}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0b0f17] hover:bg-slate-800 text-white text-xs font-mono font-bold uppercase tracking-wider px-6 py-4 rounded-md transition-all shadow-subtle hover:shadow-elevation border border-slate-800"
                >
                  <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                  <span>{dict.home.ctaQuote}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </Link>

                <Link
                  href={`/${lang}/products`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-800 hover:text-amber-700 border border-slate-300 hover:border-amber-600 text-xs font-mono font-bold uppercase tracking-wider px-6 py-4 rounded-md transition-all shadow-xs"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>{dict.home.ctaCatalog}</span>
                </Link>
              </div>

              {/* Live Metric Badges */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0b0f17]">100%</div>
                  <div className="text-slate-500 text-[11px] leading-tight mt-0.5">
                    {lang === 'id' ? 'Faktur Pajak DJP Resmi' : 'Valid VAT e-Faktur'}
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-amber-600">&le; 24 Jam</div>
                  <div className="text-slate-500 text-[11px] leading-tight mt-0.5">
                    {lang === 'id' ? 'Respons Resmi Penawaran' : 'Guaranteed RFQ SLA'}
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0b0f17]">Net 30/60</div>
                  <div className="text-slate-500 text-[11px] leading-tight mt-0.5">
                    {lang === 'id' ? 'Tempo Pembayaran PT/CV' : 'Corporate Credit Terms'}
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600">ISO 9001</div>
                  <div className="text-slate-500 text-[11px] leading-tight mt-0.5">
                    {lang === 'id' ? 'Kendali Mutu Terverifikasi' : 'Quality Audited Supply'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Industrial Visual & Architectural Blueprint Sheet */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-slate-300 bg-white shadow-elevation">
                {/* Visual Header */}
                <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                    alt="Industrial Procurement & Quality Inspection"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover opacity-90 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17]/90 via-transparent to-black/30" />
                  
                  {/* Overlay Badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-[11px]">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded border border-white/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>QC Inspection Passed</span>
                    </div>
                    <span className="text-slate-300">Spec ANSI / DIN Standard</span>
                  </div>
                </div>

                {/* Sourcing Summary Card */}
                <div className="p-6 bg-slate-900 text-slate-200 font-mono text-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Multi-Category Procurement Matrix
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      SINGLE INVOICE
                    </span>
                  </div>

                  <div className="space-y-2.5 text-[11px]">
                    <div className="flex items-center justify-between p-2 rounded bg-slate-800/70 border border-slate-700/60">
                      <span className="text-slate-300 font-sans">1. Industrial Valves & Pneumatics</span>
                      <span className="text-emerald-400 font-bold">READY STOCK</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-800/70 border border-slate-700/60">
                      <span className="text-slate-300 font-sans">2. Multi-Core Armored Cables & PLC</span>
                      <span className="text-emerald-400 font-bold">READY STOCK</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-800/70 border border-slate-700/60">
                      <span className="text-slate-300 font-sans">3. Certified Harnesses & Safety PPE</span>
                      <span className="text-emerald-400 font-bold">READY STOCK</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-800/70 border border-slate-700/60">
                      <span className="text-slate-300 font-sans">4. Corporate Facility & Consumables</span>
                      <span className="text-emerald-400 font-bold">READY STOCK</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[10.5px] text-slate-400 border-t border-slate-800">
                    <span>Konsolidasi Gudang Pusat Cikarang</span>
                    <span className="text-amber-400">Tempo Net 30/60 Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION: B2B Procurement Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
            ARCHITECTED FOR CORPORATE GOVERNANCE
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0b0f17] tracking-tight">
            {lang === 'id'
              ? 'Mengapa Tim Procurement Memilih Velmora?'
              : 'Why Enterprise Procurement Desks Rely on Velmora'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {lang === 'id'
              ? 'Kami memangkas friksi administrasi, mempercepat lead-time pengadaan, dan menjamin keaslian teknis setiap material dari pabrikan terverifikasi.'
              : 'We reduce administrative friction, accelerate procurement lead-times, and guarantee factory-grade conformance across multi-category orders.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-6 shadow-subtle hover:border-slate-400 transition-all space-y-4">
            <div className="w-12 h-12 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0b0f17] font-mono">
              {lang === 'id' ? 'Konsolidasi Single Vendor' : 'Single-Vendor Consolidation'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {lang === 'id'
                ? 'Gabungkan kebutuhan teknis, suku cadang MRO, APD K3, dan kertas fasilitas dalam satu PO resmi, satu tagihan, dan satu faktur pajak.'
                : 'Consolidate mechanical components, electrical spares, safety gear, and office consumables under a single PO and tax invoice.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-6 shadow-subtle hover:border-slate-400 transition-all space-y-4">
            <div className="w-12 h-12 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0b0f17] font-mono">
              {lang === 'id' ? 'Sertifikasi & Kepatuhan Penuh' : 'Full Compliance & Certification'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {lang === 'id'
                ? 'Seluruh produk dilengkapi Certificate of Conformance (COC), Mill Test Certificate (MTC), atau sertifikat uji laboratorium standar SNI/ANSI.'
                : 'Every delivery is accompanied by Certificate of Conformance (COC), Mill Test Certificate, or ISO/ANSI certified lab reports.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-6 shadow-subtle hover:border-slate-400 transition-all space-y-4">
            <div className="w-12 h-12 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0b0f17] font-mono">
              {lang === 'id' ? 'SLA Penawaran < 24 Jam' : '< 24hr Quotation SLA'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {lang === 'id'
                ? 'Daftar penawaran harga resmi (RFQ) terperinci lengkap dengan ketersediaan stok, lead-time pengiriman, dan validitas harga diterbitkan tepat waktu.'
                : 'Structured formal quotation with inventory status, logistics lead-time, and price validity issued within guaranteed timeframe.'}
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200/90 rounded-lg p-6 shadow-subtle hover:border-slate-400 transition-all space-y-4">
            <div className="w-12 h-12 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0b0f17] font-mono">
              {lang === 'id' ? 'Fasilitas Termin Korporasi' : 'Corporate Credit Terms'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {lang === 'id'
                ? 'Dukungan termin pembayaran Net-30 hingga Net-60 hari kerja untuk badan usaha PT/CV terdaftar setelah proses verifikasi kredit singkat.'
                : 'Net-30 and Net-60 working day billing cycles available for accredited enterprise entities after rapid credit appraisal.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE PRODUCT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-5 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
              SYSTEMATIC PROCUREMENT CATALOG
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b0f17] tracking-tight mt-1">
              {lang === 'id' ? '4 Sektor Pasokan Utama' : '4 Core Supply Sectors'}
            </h2>
          </div>
          <Link
            href={`/${lang}/products`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0b0f17] hover:text-amber-600 transition-colors uppercase tracking-wider"
          >
            <span>{lang === 'id' ? 'Lihat Seluruh Katalog' : 'Browse Entire Catalog'}</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sector 1 */}
          <Link
            href={`/${lang}/products?cat=industrial-supplies`}
            className="group bg-white border border-slate-200/90 rounded-lg p-5 shadow-subtle hover:border-amber-500 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-amber-700 font-bold tracking-wider">SECTOR 01</div>
              <h3 className="text-base font-bold text-[#0b0f17] group-hover:text-amber-600 transition-colors font-mono">
                {lang === 'id' ? 'Pasokan Industri & MRO' : 'Industrial Supplies & MRO'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {lang === 'id'
                  ? 'Katup kendali pneumatik, conveyor roller baja galvanis, bearing industri, dan perkakas pabrik.'
                  : 'Pneumatic control valves, conveyor rollers, industrial bearings, and specialized mechanical spares.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-semibold text-slate-700 group-hover:text-amber-600">
              <span>2 Komponen Inti</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>

          {/* Sector 2 */}
          <Link
            href={`/${lang}/products?cat=electrical-electronics`}
            className="group bg-white border border-slate-200/90 rounded-lg p-5 shadow-subtle hover:border-amber-500 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-amber-700 font-bold tracking-wider">SECTOR 02</div>
              <h3 className="text-base font-bold text-[#0b0f17] group-hover:text-amber-600 transition-colors font-mono">
                {lang === 'id' ? 'Elektrikal & Otomasi' : 'Electrical & Automation'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {lang === 'id'
                  ? 'Modul PLC rel DIN, kabel daya tegangan rendah berpelindung XLPE/SWA, inverter, dan kontaktor.'
                  : 'DIN rail PLC modules, multi-core XLPE armored cables, motor inverters, and heavy-duty switchgear.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-semibold text-slate-700 group-hover:text-amber-600">
              <span>2 Komponen Inti</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>

          {/* Sector 3 */}
          <Link
            href={`/${lang}/products?cat=safety-ppe`}
            className="group bg-white border border-slate-200/90 rounded-lg p-5 shadow-subtle hover:border-amber-500 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-amber-700 font-bold tracking-wider">SECTOR 03</div>
              <h3 className="text-base font-bold text-[#0b0f17] group-hover:text-amber-600 transition-colors font-mono">
                {lang === 'id' ? 'Keselamatan Kerja (K3 / PPE)' : 'Safety & PPE Gear'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {lang === 'id'
                  ? 'Body harness anti-jatuh ANSI Z359.11, sarung tangan nitril tahan kimia/sayatan, respirator, dan helm pelindung.'
                  : 'Fall-protection harnesses, chemical resistant nitrile gloves, certified hard hats, and respiratory PPE.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-semibold text-slate-700 group-hover:text-amber-600">
              <span>2 Komponen Inti</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>

          {/* Sector 4 */}
          <Link
            href={`/${lang}/products?cat=office-supplies`}
            className="group bg-white border border-slate-200/90 rounded-lg p-5 shadow-subtle hover:border-amber-500 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-amber-700 font-bold tracking-wider">SECTOR 04</div>
              <h3 className="text-base font-bold text-[#0b0f17] group-hover:text-amber-600 transition-colors font-mono">
                {lang === 'id' ? 'Fasilitas & Kantor Korporat' : 'Office & Facility Supplies'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {lang === 'id'
                  ? 'Kertas fotokopi 80gsm kuantitas palet (200 rim), lemari arsip baja modular SPCC anti-terbalik, dan perkantoran.'
                  : 'Pallet-grade 80gsm copy paper (200 reams), heavy-gauge SPCC steel filing cabinets, and consumables.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-semibold text-slate-700 group-hover:text-amber-600">
              <span>2 Komponen Inti</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (Editorial Cards with Live Specs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-5 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
              TECHNICAL PRECISION SAMPLES
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b0f17] tracking-tight mt-1">
              {lang === 'id' ? 'Sampel Spesifikasi Produk Pengadaan' : 'Featured Technical Inventory Samples'}
            </h2>
          </div>
          <Link
            href={`/${lang}/products`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0b0f17] hover:text-amber-600 transition-colors uppercase tracking-wider"
          >
            <span>{lang === 'id' ? 'Buka Katalog Penuh (8 Produk)' : 'Open Full Catalog (8 Items)'}</span>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} lang={lang} />
          ))}
        </div>
      </section>

      {/* 5. PROCUREMENT WORKFLOW: 4-STEP STREAMLINED ENGINE */}
      <section className="bg-white border-y border-slate-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
              STANDARDIZED OPERATING PROTOCOL
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b0f17] tracking-tight">
              {lang === 'id'
                ? 'Alur Pengajuan Penawaran (RFQ) B2B'
                : 'B2B Request for Quotation (RFQ) Workflow'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'id'
                ? 'Dari draft spesifikasi teknis hingga pengiriman dan penagihan tempo resmi.'
                : 'From initial technical specification to dispatch, verification, and corporate Net billing.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <div className="text-3xl font-black font-mono text-slate-300">01</div>
              <h3 className="text-sm font-bold text-[#0b0f17] font-mono">
                {lang === 'id' ? 'Pilih Item & Spesifikasi' : 'Compile Items & Specs'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {lang === 'id'
                  ? 'Pilih dari katalog standar atau lampirkan lembar spesifikasi kustom, Bill of Quantities (BOQ), atau tender document.'
                  : 'Select standard items or attach custom BOM/BOQ spreadsheets with target delivery timelines.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <div className="text-3xl font-black font-mono text-amber-600">02</div>
              <h3 className="text-sm font-bold text-[#0b0f17] font-mono">
                {lang === 'id' ? 'Review & Evaluasi SLA < 24 Jam' : 'Review & SLA < 24h'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {lang === 'id'
                  ? 'Petugas teknis Velmora memverifikasi ketersediaan stok, kepatuhan sertifikasi, dan menyusun surat penawaran harga resmi bertanda tangan.'
                  : 'Our engineering desk confirms availability, certification compliance, and issues an official formal quotation.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <div className="text-3xl font-black font-mono text-slate-300">03</div>
              <h3 className="text-sm font-bold text-[#0b0f17] font-mono">
                {lang === 'id' ? 'Penerbitan PO & Kontrak Kerja' : 'Purchase Order Validation'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {lang === 'id'
                  ? 'Klien menerbitkan Purchase Order resmi perusahaan. Fasilitas termin Net-30/60 aktif untuk entitas terverifikasi.'
                  : 'Client issues official corporate PO. Credit terms (Net-30/60) applied upon corporate verification.'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <div className="text-3xl font-black font-mono text-emerald-600">04</div>
              <h3 className="text-sm font-bold text-[#0b0f17] font-mono">
                {lang === 'id' ? 'Pengiriman & Berita Acara (BAST)' : 'Delivery & BAST Handover'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {lang === 'id'
                  ? 'Pengiriman langsung ke lokasi proyek/pabrik disertai Berita Acara Serah Terima (BAST) dan e-Faktur Pajak resmi.'
                  : 'Direct delivery to site/plant backed by official BAST handover report, MTC certificates, and VAT e-Faktur.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER (Enterprise Procurement Desk) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0b0f17] border border-slate-800 text-white rounded-xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-elevation">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider rounded-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? 'Solusi Pengadaan Kustom & Tender' : 'Custom Sourcing & Tender Inquiries'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {lang === 'id'
                ? 'Membutuhkan Spesifikasi Khusus di Luar Katalog?'
                : 'Require Specialized Industrial Specs Outside Our Catalog?'}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {lang === 'id'
                ? 'Tim sourcing teknis kami siap mencarikan material khusus, suku cadang langka impor, atau konsolidasi tender skala besar. Cukup kirimkan dokumen Bill of Quantities (BOQ).'
                : 'Our technical sourcing desk procures bespoke mechanical parts, imported specialty spares, or large-scale tender packages. Simply attach your BOM/BOQ spreadsheet.'}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={`/${lang}/quote`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider rounded-md transition-all shadow-md"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{lang === 'id' ? 'Ajukan Dokumen Kustom (RFQ)' : 'Submit Custom Sourcing RFQ'}</span>
              </Link>

              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-mono font-semibold uppercase tracking-wider rounded-md transition-all"
              >
                <span>{lang === 'id' ? 'Hubungi Technical Desk' : 'Contact Technical Desk'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
