import { Product } from '@/types/product';

export const products: Product[] = [
  // =========================================================================
  // 1. Industrial Supplies & MRO
  // =========================================================================
  {
    id: 'prod-001',
    slug: 'high-pressure-pneumatic-control-valve',
    category: 'industrial-supplies',
    category_name_en: 'Industrial Supplies & MRO',
    category_name_id: 'Pasokan Industri & MRO',
    name_en: 'High-Pressure Pneumatic Control Valve',
    name_id: 'Katup Kontrol Pneumatik Tekanan Tinggi',
    unit_en: 'Unit',
    unit_id: 'Unit',
    description_en:
      'Industrial flanged linear control valve engineered for steam, gas, and heavy liquid process lines. Features multi-spring pneumatic diaphragm actuation, calibrated position indicator, and stainless steel trim for tight shut-off.',
    description_id:
      'Katup kontrol linier flensa industri untuk jalur uap, gas, dan fluida berat. Dilengkapi aktuator diafragma pneumatik multi-spring, indikator posisi terkalibrasi, dan trim stainless steel untuk penutupan rapat.',
    specs: [
      { key_en: 'Nominal Diameter', key_id: 'Diameter Nominal', val: 'DN50 to DN200 (2" to 8")' },
      { key_en: 'Pressure Rating', key_id: 'Peringkat Tekanan', val: 'PN16 / PN40 / ANSI Class 150/300' },
      { key_en: 'Body Material', key_id: 'Material Bodi', val: 'WCB Cast Carbon Steel / CF8M Stainless' },
      { key_en: 'Actuator Type', key_id: 'Tipe Aktuator', val: 'Pneumatic Diaphragm (Air-to-Open / Air-to-Close)' },
      { key_en: 'Operating Temp', key_id: 'Suhu Operasional', val: '-29°C to +425°C' },
      { key_en: 'End Connections', key_id: 'Koneksi Akhir', val: 'Flanged RF (ASME B16.5 / EN 1092-1)' },
    ],
    use_cases_en: [
      'Chemical processing pipelines',
      'Power generation steam regulation',
      'Refinery fluid management',
      'Industrial HVAC thermal transfer',
    ],
    use_cases_id: [
      'Pipa pemrosesan kimia',
      'Regulasi uap pembangkit listrik',
      'Pengelolaan fluida kilang',
      'Transfer termal HVAC industri',
    ],
    image: '/images/products/high-pressure-pneumatic-control-valve.jpg',
    alt_en: 'Industrial stainless steel pneumatic flanged control valve on neutral backdrop',
    alt_id: 'Katup kontrol pneumatik flensa stainless steel industri pada latar netral',
  },
  {
    id: 'prod-002',
    slug: 'modular-industrial-conveyor-roller',
    category: 'industrial-supplies',
    category_name_en: 'Industrial Supplies & MRO',
    category_name_id: 'Pasokan Industri & MRO',
    name_en: 'Heavy-Duty Modular Conveyor Roller Assembly',
    name_id: 'Perakitan Roller Konveyor Modular Beban Berat',
    unit_en: 'Sets / Pieces',
    unit_id: 'Set / Buah',
    description_en:
      'Precision-machined galvanized steel gravity and driven conveyor roller assemblies with sealed double-row ball bearings. Engineered for automated logistics centers, mining bulk transfer, and packaging plants.',
    description_id:
      'Perakitan roller konveyor baja galvanis presisi dengan bantalan bola baris ganda tersegel. Dirancang untuk pusat logistik otomatis, transfer tambang, dan fasilitas pengemasan.',
    specs: [
      { key_en: 'Roller Diameter', key_id: 'Diameter Roller', val: 'Ø50mm, Ø60mm, Ø76mm, Ø89mm' },
      { key_en: 'Tube Wall Thickness', key_id: 'Ketebalan Dinding', val: '2.5mm to 4.5mm Heavy Gauge' },
      { key_en: 'Load Capacity', key_id: 'Kapasitas Beban', val: '120 kg to 650 kg per roller' },
      { key_en: 'Shaft Configuration', key_id: 'Konfigurasi Poros', val: 'Hexagonal or Round Spring-Loaded Shaft' },
      { key_en: 'Surface Treatment', key_id: 'Lapisan Permukaan', val: 'Electro-galvanized / Hot-Dip Zinc / Polyurethane' },
      { key_en: 'Bearing Standard', key_id: 'Standar Bantalan', val: 'Precision 6204-2RS / 6205-2RS Sealed' },
    ],
    use_cases_en: [
      'Distribution center sorting lines',
      'Heavy pallet handling systems',
      'Aggregate handling conveyors',
      'Automotive assembly transfer',
    ],
    use_cases_id: [
      'Jalur pemilahan pusat distribusi',
      'Sistem penanganan palet berat',
      'Konveyor penanganan agregat',
      'Transfer perakitan otomotif',
    ],
    image: '/images/products/modular-industrial-conveyor-roller.jpg',
    alt_en: 'Industrial galvanized steel conveyor roller bearing assembly',
    alt_id: 'Perakitan roller konveyor baja galvanis industri dengan bantalan poros',
  },

  // =========================================================================
  // 2. Electrical & Electronics
  // =========================================================================
  {
    id: 'prod-003',
    slug: 'programmable-logic-controller-module',
    category: 'electrical-electronics',
    category_name_en: 'Electrical & Electronics',
    category_name_id: 'Elektrikal & Elektronik',
    name_en: 'Compact Industrial Automation PLC Module',
    name_id: 'Modul PLC Otomasi Industri Ringkas',
    unit_en: 'Unit',
    unit_id: 'Unit',
    description_en:
      'Modular micro programmable logic controller designed for distributed machine automation, packaging cells, and SCADA telemetry. Built with optoisolated digital/analog I/O and industrial fieldbus connectivity.',
    description_id:
      'Mikro kontroler logika terprogram modular untuk otomasi mesin terdistribusi, sel pengemasan, dan telemetri SCADA. Dilengkapi I/O digital/analog terisolasi optik dan konektivitas bus industri.',
    specs: [
      { key_en: 'Input Voltage', key_id: 'Tegangan Masukan', val: '24V DC (±15%)' },
      { key_en: 'I/O Capacity', key_id: 'Kapasitas I/O', val: '16 Digital Inputs (24V), 8 Relay/Transistor Outputs' },
      { key_en: 'Communication Ports', key_id: 'Port Komunikasi', val: 'RS-485 (Modbus RTU), 10/100 Mbps RJ45 Ethernet (Modbus TCP)' },
      { key_en: 'Mounting Style', key_id: 'Tipe Pemasangan', val: 'Standard 35mm DIN Rail Mount' },
      { key_en: 'Operating Ambience', key_id: 'Suhu Lingkungan', val: '-10°C to +55°C (non-condensing)' },
      { key_en: 'Program Memory', key_id: 'Memori Program', val: '128 KB Non-Volatile Flash' },
    ],
    use_cases_en: [
      'Pumping station automation',
      'Assembly line sequencing',
      'HVAC chiller control',
      'Packaging machinery',
    ],
    use_cases_id: [
      'Otomasi stasiun pompa',
      'Sekuensial lini perakitan',
      'Kontrol chiller HVAC',
      'Mesin pengemasan',
    ],
    image: '/images/products/programmable-logic-controller-module.jpg',
    alt_en: 'Modular industrial PLC controller with terminal wiring blocks mounted on DIN rail',
    alt_id: 'Modul PLC industri modular dengan terminal perkabelan pada rel DIN',
  },
  {
    id: 'prod-004',
    slug: 'armored-low-voltage-power-cable',
    category: 'electrical-electronics',
    category_name_en: 'Electrical & Electronics',
    category_name_id: 'Elektrikal & Elektronik',
    name_en: 'Multi-Core Armored XLPE Industrial Power Cable',
    name_id: 'Kabel Daya Industri Berpelindung Multi-Core XLPE',
    unit_en: 'Meters / Drums',
    unit_id: 'Meter / Hasper',
    description_en:
      'Heavy-duty 4-core copper conductor power cable with cross-linked polyethylene (XLPE) insulation and galvanized steel wire armor (SWA). Designed for underground burial, outdoor ducting, and power distribution.',
    description_id:
      'Kabel daya tembaga 4-core tahan banting dengan isolasi cross-linked polyethylene (XLPE) dan pelindung kawat baja galvanis (SWA). Dirancang untuk penanaman tanah langsung dan distribusi daya.',
    specs: [
      { key_en: 'Voltage Rating', key_id: 'Peringkat Tegangan', val: '0.6/1.0 kV (Uo/U)' },
      { key_en: 'Conductor Structure', key_id: 'Struktur Konduktor', val: 'Class 2 Plain Stranded Annealed Copper (Cu)' },
      { key_en: 'Core Cross-Section', key_id: 'Luas Penampang', val: '4 x 16mm² up to 4 x 240mm²' },
      { key_en: 'Armor Type', key_id: 'Tipe Pelindung', val: 'Galvanized Steel Wire Armor (SWA)' },
      { key_en: 'Sheath Material', key_id: 'Material Selubung', val: 'Flame-Retardant Low-Smoke Halogen-Free PVC (Black)' },
      { key_en: 'Standard Compliance', key_id: 'Standar Acuan', val: 'IEC 60502-1, BS 5467' },
    ],
    use_cases_en: [
      'Factory main power feeds',
      'Substation secondary distribution',
      'Outdoor underground utility runs',
      'Mining surface distribution',
    ],
    use_cases_id: [
      'Saluran daya utama pabrik',
      'Distribusi sekunder gardu listrik',
      'Saluran utilitas bawah tanah luar ruangan',
      'Distribusi area tambang',
    ],
    image: '/images/products/armored-low-voltage-power-cable.jpg',
    alt_en: 'Cross-section of heavy-duty 4-core armored copper power cable',
    alt_id: 'Penampang melintang kabel daya tembaga 4-core berpelindung kawat baja',
  },

  // =========================================================================
  // 3. Safety & PPE
  // =========================================================================
  {
    id: 'prod-005',
    slug: 'full-body-industrial-safety-harness',
    category: 'safety-ppe',
    category_name_en: 'Safety & PPE',
    category_name_id: 'Keselamatan Kerja & APD',
    name_en: 'Ergonomic Fall-Protection Full Body Harness',
    name_id: 'Harness Keselamatan Tubuh Penuh Ergonomis',
    unit_en: 'Sets / Pieces',
    unit_id: 'Set / Buah',
    description_en:
      'Multi-point fall-arrest harness built from 45mm high-tensile polyester webbing with breathable lumbar support padding. Equipped with forged alloy rear dorsal D-ring, sternal attachment loops, and quick-release pass-through buckles.',
    description_id:
      'Harness penahan jatuh multi-titik dari webbing poliester berkekuatan tinggi 45mm dengan bantalan punggung berpori. Dilengkapi cincin-D dorsal baja tempa, loop sternal, dan gesper cepat.',
    specs: [
      { key_en: 'Webbing Tensile Strength', key_id: 'Kekuatan Tarik Webbing', val: '> 25 kN (5,600 lbs)' },
      { key_en: 'Attachment Points', key_id: 'Titik Penambatan', val: '1 Dorsal D-Ring, 2 Sternal Loops, 2 Work-Positioning Side Rings' },
      { key_en: 'Hardware Material', key_id: 'Material Perangkat Keras', val: 'Forged Alloy Steel with Zinc Dichromate Finish' },
      { key_en: 'User Capacity', key_id: 'Kapasitas Pengguna', val: 'Max 140 kg (combined worker and tools)' },
      { key_en: 'Adjustment Points', key_id: 'Titik Penyesuaian', val: '5-point adjust (chest, torso, legs)' },
      { key_en: 'Compliance Benchmark', key_id: 'Kepatuhan Acuan', val: 'ANSI Z359.11, EN 361:2002' },
    ],
    use_cases_en: [
      'Scaffolding and high-rise construction',
      'Telecommunication tower rigging',
      'Wind turbine nacelle maintenance',
      'Confined space entry and retrieval',
    ],
    use_cases_id: [
      'Perancah dan konstruksi gedung tinggi',
      'Pemasangan menara telekomunikasi',
      'Pemeliharaan turbin angin',
      'Akses dan evakuasi ruang terbatas',
    ],
    image: '/images/products/full-body-industrial-safety-harness.jpg',
    alt_en: 'Ergonomic full-body fall-protection harness with forged alloy hardware',
    alt_id: 'Harness pelindung jatuh seluruh tubuh dengan cincin baja tempa',
  },
  {
    id: 'prod-006',
    slug: 'heavy-duty-nitrile-chemical-gloves',
    category: 'safety-ppe',
    category_name_en: 'Safety & PPE',
    category_name_id: 'Keselamatan Kerja & APD',
    name_en: 'Industrial Nitrile Chemical & Cut-Resistant Gloves',
    name_id: 'Sarung Tangan Nitril Industri Tahan Bahan Kimia & Sayatan',
    unit_en: 'Pairs / Boxes (50 Pairs)',
    unit_id: 'Pasang / Kotak (50 Pasang)',
    description_en:
      'Dual-layer chemical barrier gloves featuring heavy-gauge unlined nitrile formulation with textured diamond grip palm. Resistant to hydrocarbons, solvent mixtures, cutting oils, and mechanical abrasion.',
    description_id:
      'Sarung tangan pelindung kimia lapisan ganda berbahan formulasi nitril tebal dengan tekstur genggam berlian timbul. Tahan terhadap hidrokarbon, pelarut, oli pemotong, dan abrasi mekanis.',
    specs: [
      { key_en: 'Thickness', key_id: 'Ketebalan', val: '15 mil (0.38mm) nominal' },
      { key_en: 'Length', key_id: 'Panjang', val: '330mm (13 inches) with gauntlet cuff' },
      { key_en: 'Surface Texture', key_id: 'Tekstur Permukaan', val: 'Reversed Lozenge / Diamond Grip' },
      { key_en: 'Chemical Resistance', key_id: 'Ketahanan Kimia', val: 'Solvents, degreasers, lubricants, caustic acids' },
      { key_en: 'Size Range', key_id: 'Ukuran Tersedia', val: 'Sizes 7 (S) through 11 (XXL)' },
      { key_en: 'Lining', key_id: 'Lapisan Dalam', val: 'Flock-Lined Cotton Interior for Moisture Absorption' },
    ],
    use_cases_en: [
      'Automotive parts degreasing',
      'Chemical batch blending',
      'Metal plating and etching',
      'Refinery maintenance',
    ],
    use_cases_id: [
      'Pembersihan komponen otomotif',
      'Pencampuran bahan kimia industri',
      'Pelapisan logam dan etsa',
      'Pemeliharaan area kilang',
    ],
    image: '/images/products/heavy-duty-nitrile-chemical-gloves.jpg',
    alt_en: 'Industrial slate blue nitrile chemical safety gloves with gauntlet cuff',
    alt_id: 'Sarung tangan nitril biru industri tahan bahan kimia dengan manset gauntlet',
  },

  // =========================================================================
  // 4. Office Supplies & Facility
  // =========================================================================
  {
    id: 'prod-007',
    slug: 'commercial-high-yield-copy-paper',
    category: 'office-supplies',
    category_name_en: 'Office Supplies & Facility',
    category_name_id: 'Perlengkapan Kantor & Fasilitas',
    name_en: 'Commercial Grade 80gsm Copy Paper (Pallet Quantity)',
    name_id: 'Kertas Fotokopi Mutu Komersial 80gsm (Kuantitas Palet)',
    unit_en: 'Pallets (40 Boxes / 200 Reams)',
    unit_id: 'Palet (40 Boks / 200 Rim)',
    description_en:
      'Bulk procurement specification multi-purpose 80gsm woodfree archival paper designed for high-speed laser printers, digital copiers, and corporate drafting. Engineered for zero-jam feed performance with 98% ISO whiteness.',
    description_id:
      'Kertas arsip bebas kayu 80gsm untuk pengadaan borongan skala korporat, kompatibel dengan printer laser kecepatan tinggi dan mesin fotokopi digital. Dirancang bebas macet dengan derajat keputihan 98% ISO.',
    specs: [
      { key_en: 'Basis Weight', key_id: 'Gramatur', val: '80 gsm ± 2.5 gsm' },
      { key_en: 'Sheet Dimensions', key_id: 'Dimensi Lembar', val: 'A4 (210mm x 297mm) / F4 Folio (215mm x 330mm)' },
      { key_en: 'Whiteness Index', key_id: 'Indeks Keputihan', val: '165 CIE / 98% ISO' },
      { key_en: 'Moisture Content', key_id: 'Kadar Air', val: '4.5% Controlled Equilibrium' },
      { key_en: 'Packaging Standard', key_id: 'Standar Kemasan', val: 'Moisture-barrier poly-kraft ream wrapper (500 sheets/ream, 5 reams/box)' },
      { key_en: 'Pallet Load', key_id: 'Muatan Palet', val: '40 Boxes / Pallet, shrink-wrapped with corner protectors' },
    ],
    use_cases_en: [
      'Corporate central document archiving',
      'Government departmental printing tenders',
      'Engineering blueprint copying',
      'Banking statement processing',
    ],
    use_cases_id: [
      'Pengarsipan dokumen pusat korporat',
      'Tender cetak instansi pemerintah',
      'Pencetakan gambar teknik',
      'Pemrosesan rekening koran perbankan',
    ],
    image: '/images/products/commercial-high-yield-copy-paper.jpg',
    alt_en: 'Pallet-stacked bulk cartons of commercial A4 copy paper reams',
    alt_id: 'Tumpukan palet karton kertas fotokopi A4 komersial untuk pengadaan',
  },
  {
    id: 'prod-008',
    slug: 'heavy-duty-modular-file-cabinet',
    category: 'office-supplies',
    category_name_en: 'Office Supplies & Facility',
    category_name_id: 'Perlengkapan Kantor & Fasilitas',
    name_en: 'Heavy-Gauge Steel Modular Archival Storage Cabinet',
    name_id: 'Lemari Arsip Baja Modular Beban Berat',
    unit_en: 'Unit',
    unit_id: 'Unit',
    description_en:
      'Precision roll-formed cold-rolled steel filing cabinet with anti-tilt interlocking drawer mechanisms, heavy-duty ball bearing slides, and central barrel lock. Powder-coated in fingerprint-resistant matte charcoal.',
    description_id:
      'Lemari arsip baja canai dingin presisi dengan mekanisme laci interlock anti-terbalik, rel bantalan bola beban berat, dan kunci sentral silinder. Lapisan powder-coated charcoal matte tahan noda sidik jari.',
    specs: [
      { key_en: 'Material Gauge', key_id: 'Ketebalan Pelat', val: '0.8mm to 1.2mm SPCC Cold-Rolled Steel' },
      { key_en: 'Dimensions', key_id: 'Dimensi Luar', val: 'W 900mm x D 450mm x H 1850mm' },
      { key_en: 'Drawer Capacity', key_id: 'Kapasitas Laci', val: '65 kg per drawer with full extension' },
      { key_en: 'Locking System', key_id: 'Sistem Kunci', val: 'Master-Keyed Central Security Barrel with 2 Foldable Keys' },
      { key_en: 'Finish', key_id: 'Pelapisan Akhir', val: 'Electrostatic Epoxy Polyester Powder Coating (Charcoal / Slate)' },
      { key_en: 'Adjustable Shelves', key_id: 'Rak Disesuaikan', val: '4 Reinforced Shelves, 50kg load rating per tier' },
    ],
    use_cases_en: [
      'Corporate legal and financial archival',
      'Engineering drawing flat storage',
      'Plant facility record keeping',
      'Hospital medical records storage',
    ],
    use_cases_id: [
      'Pengarsipan hukum dan keuangan korporat',
      'Penyimpanan cetak biru teknik',
      'Pencatatan fasilitas pabrik',
      'Penyimpanan rekam medis rumah sakit',
    ],
    image: '/images/products/heavy-duty-modular-file-cabinet.jpg',
    alt_en: 'Heavy-duty steel archival office filing cabinet with locking system',
    alt_id: 'Lemari arsip baja kantor beban berat dengan sistem penguncian sentral',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category?: string): Product[] {
  if (!category || category === 'all') return products;
  return products.filter((p) => p.category === category);
}
