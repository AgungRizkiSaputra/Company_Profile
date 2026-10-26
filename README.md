# VELMORA — Enterprise B2B General Trading & Procurement Platform

> **"One Partner. Multiple Procurement Needs."**  
> *"Satu Mitra. Beragam Kebutuhan Pengadaan."*

Velmora adalah platform company profile dan sistem *Request for Quotation* (RFQ) B2B fiktif untuk proyek portofolio kelas enterprise. Dibangun dengan estetika **Premium Minimalist & Dependable (Anti-AI-Slop)** menggunakan palet charcoal, putih, abu-abu netral, dan aksen biru teknis.

---

## 📑 Daftar Isi / Table of Contents
1. [Karakter Desain & Anti-AI-Slop](#1-karakter-desain--anti-ai-slop)
2. [Tech Stack & Arsitektur](#2-tech-stack--arsitektur)
3. [Struktur Halaman Bilingual](#3-struktur-halaman-bilingual)
4. [Katalog 8 Produk Generik](#4-katalog-8-produk-generik)
5. [Mekanisme RFQ & Custom Sourcing](#5-mekanisme-rfq--custom-sourcing)
6. [Setup Supabase PostgreSQL & Migrasi](#6-setup-supabase-postgresql--migrasi)
7. [Transactional Email & Storage](#7-transactional-email--storage)
8. [Keamanan, Privasi & Kepatuhan UU PDP](#8-keamanan-privasi--kepatuhan-uu-pdp)
9. [Instalasi Lokal & Pengujian](#9-instalasi-lokal--pengujian)
10. [Panduan Deployment Netlify](#10-panduan-deployment-netlify)
11. [Transparansi Proyek Portofolio](#11-transparansi-proyek-portofolio)

---

## 1. Karakter Desain & Anti-AI-Slop

Desain Velmora menghindari pola generik (AI slop) dengan menerapkan:
- **Editorial Layout & Asimetri**: Layout split hero dengan tipografi berbobot dan komposisi editorial nyata, bukan template kartu seragam.
- **Palet Warna Kurasi**: Charcoal (`#121316`), Slate (`#1E293B`), Off-White (`#FAFAFA`), dan Cobalt Blue (`#2563EB`).
- **Fotografi Produk Nyata & Tanpa Merek**: Gambar komponen presisi mekanikal, elektrikal, APD, dan logistik kantor beresolusi tinggi tanpa merek fiktif mencolok.
- **Data Densitas Tinggi**: Tabel spesifikasi teknis lengkap dengan standar industri (ANSI, DN, XLPE, SWA, SPCC) dan satuan pengukuran B2B riil.
- **Aksesibilitas & Performa**: Mendukung `prefers-reduced-motion`, navigasi keyboard lengkap, dan kontras warna sesuai standar WCAG.

---

## 2. Tech Stack & Arsitektur

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/) untuk validasi form client-side dan server-side
- **Database**: [Supabase](https://supabase.com/) PostgreSQL + Row Level Security (RLS)
- **Storage**: Supabase Storage (`rfq-attachments`, bucket privat non-publik)
- **Email**: Resend API / HTTP Transaksional dengan fallback demo otomatis
- **Deployment**: [Netlify](https://www.netlify.com/) (`netlify.toml` + `@netlify/plugin-nextjs`)

---

## 3. Struktur Halaman Bilingual

Website mendukung dua bahasa secara penuh dengan URL prefix:
- **Bahasa Inggris (Default)**: `/en`
- **Bahasa Indonesia**: `/id`

| Halaman | Rute EN | Rute ID | Deskripsi |
| :--- | :--- | :--- | :--- |
| **Home** | `/en` | `/id` | Hero split, 4 kategori, positioning B2B, 4-step workflow, FAQ, CTA |
| **Katalog** | `/en/products` | `/id/products` | Live search, filter kategori, 8 produk editorial card |
| **Detail Produk** | `/en/products/[slug]` | `/id/products/[slug]` | Spesifikasi teknis tabel, use cases, form konfigurasi RFQ |
| **Layanan** | `/en/services` | `/id/services` | 4 pilar pengadaan (Trading, Custom, Quality, Logistics) & SLA |
| **Tentang Kami** | `/en/about` | `/id/about` | Cerita brand, prinsip operasional, keterbukaan portofolio |
| **Kontak** | `/en/contact` | `/id/contact` | Kanal email, WhatsApp staging, alamat kantor peraga, quick jump |
| **Formulir RFQ** | `/en/quote` | `/id/quote` | RFQ cart editor, custom sourcing modal, kontak, file upload, privasi |
| **Konfirmasi RFQ** | `/en/quote/success` | `/id/quote/success` | Nomor referensi unik, rincian pengajuan, print receipt, next steps |
| **Kebijakan Privasi** | `/en/privacy-policy` | `/id/privacy-policy` | Standar UU PDP No. 27/2022, retensi 12 bulan, tanpa tracker |
| **Syarat Ketentuan** | `/en/terms-of-use` | `/id/terms-of-use` | Protokol B2B, status penawaran non-binding |
| **404 Not Found** | `/[lang]/not-found` | `/[lang]/not-found` | Penanganan rute tak ditemukan dengan navigasi pemulihan |

*Catatan: Pengalih bahasa (Language Switcher) di navbar mempertahankan path aktif (contoh: `/en/products/high-pressure-pneumatic-control-valve` langsung beralih ke `/id/products/high-pressure-pneumatic-control-valve`).*

---

## 4. Katalog 8 Produk Generik

Setiap kategori memiliki tepat dua produk unbranded dengan spesifikasi teknis industri:

### 1. Pasokan Industri & MRO (Industrial Supplies & MRO)
1. **High-Pressure Pneumatic Control Valve** (`high-pressure-pneumatic-control-valve`)  
   *Katup Kontrol Pneumatik Tekanan Tinggi* — DN50-DN200, PN16/40, ANSI 150/300, WCB/CF8M.
2. **Heavy-Duty Modular Conveyor Roller Assembly** (`modular-industrial-conveyor-roller`)  
   *Perakitan Roller Konveyor Modular Beban Berat* — Baja galvanis Ø50-Ø89mm, bearing 6204/6205-2RS, kapasitas 120-650 kg.

### 2. Elektrikal & Elektronik (Electrical & Electronics)
3. **Compact Industrial Automation PLC Module** (`programmable-logic-controller-module`)  
   *Modul PLC Otomasi Industri Ringkas* — 24V DC, 16 DI / 8 DO, RS-485 Modbus RTU, Ethernet RJ45, DIN rail.
4. **Multi-Core Armored XLPE Industrial Power Cable** (`armored-low-voltage-power-cable`)  
   *Kabel Daya Industri Berpelindung Multi-Core XLPE* — 0.6/1.0 kV, 4x16mm²-4x240mm², kawat baja SWA, selubung PVC anti-api.

### 3. Keselamatan Kerja & APD (Safety & PPE)
5. **Ergonomic Fall-Protection Full Body Harness** (`full-body-industrial-safety-harness`)  
   *Harness Keselamatan Tubuh Penuh Ergonomis* — Webbing poliester 45mm (>25 kN), cincin-D baja tempa, ANSI Z359.11 / EN 361.
6. **Industrial Nitrile Chemical & Cut-Resistant Gloves** (`heavy-duty-nitrile-chemical-gloves`)  
   *Sarung Tangan Nitril Industri Tahan Bahan Kimia & Sayatan* — Ketebalan 15 mil, panjang 330mm, grip diamond timbul, flock-lined cotton.

### 4. Perlengkapan Kantor & Fasilitas (Office Supplies & Facility)
7. **Commercial Grade 80gsm Copy Paper (Pallet Quantity)** (`commercial-high-yield-copy-paper`)  
   *Kertas Fotokopi Mutu Komersial 80gsm (Kuantitas Palet)* — 80 gsm, A4/F4, 98% ISO whiteness, kemasan palet 40 boks (200 rim).
8. **Heavy-Gauge Steel Modular Archival Storage Cabinet** (`heavy-duty-modular-file-cabinet`)  
   *Lemari Arsip Baja Modular Beban Berat* — Pelat baja SPCC 0.8-1.2mm, 4 laci interlock anti-terbalik, kunci sentral silinder master.

---

## 5. Mekanisme RFQ & Custom Sourcing

- **State Persistence**: Menggunakan React Context + `localStorage` sehingga item RFQ tidak hilang saat pengunjung menjelajahi halaman lain.
- **Custom Sourcing**: Fitur untuk menambahkan barang di luar katalog standar dengan mengisi nama komponen, kategori, jumlah, satuan, dan toleransi teknis.
- **Validasi Zod**: Validasi ketat format email, panjang nomor telepon (min 8 digit), jumlah item (>0), dan persetujuan privasi wajib.
- **Pencegahan Bot & Spam**: Field honeypot tersembunyi (`website_url`) dan token *idempotency key* unik per pengiriman untuk mencegah duplicate submission akibat double-click.
- **Nomor Referensi Unik**: Dibuat secara acak aman di server dengan format `VEL-YYYY-XXXXX` menggunakan karakter base32 tanpa karakter ambigu (0, O, 1, I).
- **Data Recovery saat Gagal**: Jika koneksi jaringan atau database gagal, form tidak mengosongkan input pengguna sehingga dapat langsung dikirim ulang (*retry*).

---

## 6. Setup Supabase PostgreSQL & Migrasi

Skrip migrasi database berada pada file:  
`supabase/migrations/001_initial_schema.sql`

Skrip ini membuat:
1. `public.rfq_requests` — Menyimpan data kontak, nama perusahaan, preferensi kanal, tujuan pengiriman, dan nomor referensi.
2. `public.rfq_items` — Menyimpan daftar rincian barang, kuantitas, satuan, toleransi, dan flag custom sourcing (relasi `CASCADE` ke `rfq_requests`).
3. `public.rfq_attachments` — Menyimpan metadata berkas lampiran (nama berkas, ukuran, MIME type, storage path).
4. **Indeks Performa** — Pada `reference_number`, `created_at`, dan `idempotency_key`.
5. **Row Level Security (RLS)** — Pengunjung publik dilarang melakukan `SELECT` untuk menjaga kerahasiaan penawaran harga antarperusahaan. Akses hanya diberikan kepada `service_role`.
6. **Storage Bucket** — Konfigurasi bucket privat `rfq-attachments` dengan batas ukuran 10MB dan allowlist MIME type.

### Menjalankan Migrasi di Supabase
1. Buka Supabase Dashboard -> **SQL Editor**.
2. Salin isi berkas `supabase/migrations/001_initial_schema.sql`.
3. Klik **Run** untuk mengeksekusi migrasi.

---

## 7. Transactional Email & Storage

Sistem menyediakan integrasi email transaksional dua arah:
1. **Email Konfirmasi Pelanggan**: Mengirimkan tanda terima profesional dengan nomor referensi dan tabel rincian barang.
2. **Email Notifikasi Internal**: Memberitahukan tim meja pengadaan bahwa ada RFQ baru yang masuk.

Jika kredensial Resend belum diisi (`RESEND_API_KEY`), sistem secara otomatis beralih ke **Demo Staging Mode**, mencatat payload email di server log tanpa memutus alur pengguna.

### Kebijakan Lampiran (Storage)
- Format yang diizinkan: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG.
- Ukuran maksimal: 10MB per berkas.
- Berkas disimpan di bucket privat tanpa URL publik. Akses unduh hanya melalui token bertanda tangan (*signed URL*) oleh admin resmi.

---

## 8. Keamanan, Privasi & Kepatuhan UU PDP

- **UU PDP No. 27 Tahun 2022**: Kebijakan privasi mencantumkan dasar hukum pemrosesan pra-kontraktual (Pasal 20) dan hak-hak subjek data (akses, perbaikan, penarikan, dan permohonan penghapusan).
- **Retensi 12 Bulan**: Data rekaman RFQ disimpan maksimal 12 bulan setelah penawaran selesai, kemudian dihapus atau dianonimkan.
- **Tanpa Pelacak Pemasaran**: Tidak menyematkan piksel pelacak pihak ketiga (Meta Pixel, Google Ads).
- **Rate Limiting**: Mekanisme pembatasan akses berbasis sliding-window dengan *hash IP* bergaram (SHA-256) sehingga alamat IP asli tidak pernah disimpan mentah.
- **Header Keamanan**: Dikonfigurasi di `netlify.toml` dan `next.config.ts` (CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy).

---

## 9. Instalasi Lokal & Pengujian

### Prasyarat
- Node.js v18+ atau v20+ (diuji pada v24.13.0)
- npm v10+

### Langkah Instalasi
```bash
# 1. Masuk ke direktori proyek
cd scratch/velmora

# 2. Instal dependensi
npm install

# 3. Salin file environment
cp .env.example .env.local

# 4. Jalankan test suite otomatis (33 unit & integration tests)
node tests/run-tests.mjs

# 5. Jalankan mode pengembangan
npm run dev
```
Buka browser di `http://localhost:3000/en`.

### Menjalankan Production Build & Server
```bash
npm run build
npm run start
```

---

## 10. Panduan Deployment Netlify

Proyek ini telah dilengkapi dengan konfigurasi `netlify.toml` dan kompatibel dengan Netlify Next.js Runtime:

1. Hubungkan repositori GitHub Anda ke akun Netlify.
2. Netlify akan mendeteksi pengaturan otomatis dari `netlify.toml`:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
   - **Plugin**: `@netlify/plugin-nextjs`
3. Tambahkan Environment Variables di Netlify Dashboard (**Site configuration** -> **Environment variables**):
   - `NEXT_PUBLIC_SITE_URL`: URL situs Netlify Anda (contoh: `https://velmora.netlify.app`)
   - `NEXT_PUBLIC_DEMO_MODE`: `false` (jika menggunakan database riil) atau `true`
   - `NEXT_PUBLIC_SUPABASE_URL`: URL project Supabase Anda
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon Key Supabase
   - `SUPABASE_SERVICE_ROLE_KEY`: Service Role Key Supabase (rahasia, hanya di sisi server)
   - `SUPABASE_STORAGE_BUCKET`: `rfq-attachments`
   - `RESEND_API_KEY`: API key Resend Anda
   - `EMAIL_FROM`: `Velmora Procurement <procurement@yourdomain.com>`
   - `INTERNAL_NOTIFICATION_EMAIL`: `rfq-desk@yourdomain.com`
4. Lakukan **Deploy Site**.

---

## 11. Transparansi Proyek Portofolio

Velmora adalah karya demonstrasi arsitektur perangkat lunak dan desain UI/UX B2B portofolio.
- Velmora **bukan** entitas komersial atau badan hukum perdagangan aktif.
- Katalog, spesifikasi, dan foto produk merupakan materi peraga representatif.
- Nomor telepon (+62 812-0000-DEMO) dan alamat email kontak merupakan placeholder demonstrasi staging.
- Pengajuan RFQ melalui situs ini adalah simulasi sistem fungsional dan **bukan** merupakan pesanan pembelian mengikat atau transaksi jual-beli komersial riil.

---
© 2026 VELMORA — One Partner. Multiple Procurement Needs.
