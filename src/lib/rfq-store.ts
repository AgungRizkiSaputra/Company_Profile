import fs from 'fs';
import path from 'path';
import { RfqSubmissionInput } from './validations';
import { generateReferenceNumber } from './supabase';

export interface StoredRfqItem {
  productId?: string;
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  customSpecs?: string;
  isCustomSourcing?: boolean;
}

export interface StoredRfqAttachment {
  name: string;
  size: number;
  type: string;
}

export interface StoredRfq {
  id: string;
  referenceNumber: string;
  createdAt: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  followUpChannel: 'email' | 'whatsapp';
  deliveryDestination?: string;
  targetTimeline?: string;
  notes?: string;
  status: 'pending' | 'in_review' | 'quoted' | 'completed' | 'rejected';
  adminNotes?: string;
  estimatedValue?: string;
  items: StoredRfqItem[];
  attachments: StoredRfqAttachment[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'rfqs.json');

// Initial seed data with authentic Indonesian enterprise procurement inquiries
const INITIAL_SEED_RFQS: StoredRfq[] = [
  {
    id: 'rfq-seed-001',
    referenceNumber: 'VEL-2026-AK921',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), // 2 hours ago
    companyName: 'PT Astra Daihatsu Motor (Plant Karawang)',
    contactName: 'Bambang Sudarmono, S.T. (Procurement Lead)',
    email: 'bambang.procurement@daihatsu.astra.co.id',
    phone: '+6281289410294',
    followUpChannel: 'whatsapp',
    deliveryDestination: 'Kawasan Industri KIIC Lot C-4, Karawang Barat, Jawa Barat',
    targetTimeline: 'Mendesak (Sebelum 10 November 2026)',
    notes: 'Kebutuhan urgent untuk overhaul lini perakitan engine 3. Mohon sertakan Certificate of Origin (COO) dan garansi principal 12 bulan.',
    status: 'in_review',
    adminNotes: 'Spesifikasi telah dicocokkan dengan tim engineering. Menunggu kalkulasi biaya logistik ke Karawang.',
    estimatedValue: 'Rp 148.500.000',
    items: [
      {
        productName: 'High-Pressure Pneumatic Control Valve DN50 PN40',
        category: 'industrial-mro',
        quantity: 8,
        unit: 'Unit',
        customSpecs: 'Flange ANSI 300 RF, material stainless steel 316, seal PTFE.',
      },
      {
        productName: 'Armored Low-Voltage Power Cable Cu/XLPE/SWA/PVC 4x16 mm²',
        category: 'electrical',
        quantity: 350,
        unit: 'Meter',
        customSpecs: 'Standar SPLN 43-2 / IEC 60502-1, drum kayu 500m.',
      },
    ],
    attachments: [
      {
        name: 'BOQ_Overhaul_Engine3_Daihatsu.pdf',
        size: 1420500,
        type: 'application/pdf',
      },
    ],
  },
  {
    id: 'rfq-seed-002',
    referenceNumber: 'VEL-2026-CP412',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(), // 5 hours ago
    companyName: 'PT Chandra Asri Pacific Tbk',
    contactName: 'Dewi Lestari (HSE & Safety Sourcing Specialist)',
    email: 'dewi.lestari@capic.co.id',
    phone: '+628118029311',
    followUpChannel: 'email',
    deliveryDestination: 'Jl. Raya Anyer Km 123, Ciwandan, Cilegon, Banten',
    targetTimeline: 'Reguler (2-3 minggu)',
    notes: 'Pengadaan APD rutin Q4 Divisi Petrokimia. Wajib sertifikasi CE EN361 dan EN388. Pembayaran Tempo Net-45 hari via SKBDN.',
    status: 'pending',
    adminNotes: '',
    estimatedValue: 'Rp 62.800.000',
    items: [
      {
        productName: 'Full-Body Industrial Safety Harness CE EN361 Certified',
        category: 'safety-ppe',
        quantity: 45,
        unit: 'Set',
        customSpecs: 'Double lanyard dengan shock absorber, snap hook alloy steel.',
      },
      {
        productName: 'Heavy-Duty Nitrile Chemical-Resistant Gloves EN388',
        category: 'safety-ppe',
        quantity: 300,
        unit: 'Pasang',
        customSpecs: 'Ukuran L & XL masing-masing 150 pasang, ketahanan solvent tinggi.',
      },
    ],
    attachments: [
      {
        name: 'Spesifikasi_Teknis_APD_K3_2026.docx',
        size: 840200,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    ],
  },
  {
    id: 'rfq-seed-003',
    referenceNumber: 'VEL-2026-WK803',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // Yesterday
    companyName: 'PT Wijaya Karya Rekayasa Konstruksi',
    contactName: 'Ir. Hendra Kusuma (Site Logistics Manager)',
    email: 'hendra.kusuma@wikarekon.co.id',
    phone: '+6281315998201',
    followUpChannel: 'whatsapp',
    deliveryDestination: 'Proyek Smelter Feronikel, Morowali, Sulawesi Tengah',
    targetTimeline: 'Mendesak (Ekspedisi Port to Port Surabaya-Morowali)',
    notes: 'Pengiriman via kontainer 20ft pelabuhan Tanjung Perak. Penawaran harga sudah termasuk PPN 11% dan faktur pajak e-Faktur.',
    status: 'quoted',
    adminNotes: 'Surat Penawaran Harga (SPH/VEL-SPH-2026-089) resmi sudah dikirim via WhatsApp & Email ke Pak Hendra. Menunggu PO diterbitkan.',
    estimatedValue: 'Rp 215.000.000',
    items: [
      {
        productName: 'Modular Industrial Conveyor Roller System Steel Dia 89mm',
        category: 'industrial-mro',
        quantity: 120,
        unit: 'Batang',
        customSpecs: 'Panjang 600mm, bearing 6205-2RS, heavy duty zinc-plated.',
      },
      {
        productName: 'Programmable Logic Controller (PLC) Expansion Module',
        category: 'it-hardware',
        quantity: 6,
        unit: 'Unit',
        customSpecs: '16 Digital Input / 16 Relay Output, Modbus TCP.',
      },
    ],
    attachments: [
      {
        name: 'Technical_Drawing_Conveyor_Smelter.pdf',
        size: 3200100,
        type: 'application/pdf',
      },
    ],
  },
  {
    id: 'rfq-seed-004',
    referenceNumber: 'VEL-2026-KF198',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(), // 2 days ago
    companyName: 'PT Kalbe Farma Tbk (Cikarang Plant 2)',
    contactName: 'Ferry Ardiansyah (Facility & General Supplies Buyer)',
    email: 'ferry.ardiansyah@kalbe.co.id',
    phone: '+628170984210',
    followUpChannel: 'email',
    deliveryDestination: 'Kawasan Industri Delta Silicon 3, Lippo Cikarang',
    targetTimeline: 'Tercapai sesuai PO',
    notes: 'Kebutuhan konsolidasi inventaris kantor & cleanroom non-steril cabang Cikarang.',
    status: 'completed',
    adminNotes: 'Barang sudah diterima di Cikarang Plant 2. Dokumen BAST dan Faktur Pajak sudah dikonfirmasi finance.',
    estimatedValue: 'Rp 41.250.000',
    items: [
      {
        productName: 'Commercial High-Yield 80 GSM Copy Paper (FSC Certified)',
        category: 'facility-supplies',
        quantity: 500,
        unit: 'Rim',
        customSpecs: 'Kemasan box anti-lembab isi 5 rim/box (100 box total).',
      },
      {
        productName: 'Heavy-Duty Modular Steel File Cabinet 4-Drawer Anti-Tilt',
        category: 'facility-supplies',
        quantity: 12,
        unit: 'Unit',
        customSpecs: 'Finishing powder coating light grey, central keylock.',
      },
    ],
    attachments: [],
  },
];

function ensureDataFile(): StoredRfq[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_SEED_RFQS, null, 2), 'utf-8');
      return INITIAL_SEED_RFQS;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_SEED_RFQS, null, 2), 'utf-8');
      return INITIAL_SEED_RFQS;
    }
    return parsed;
  } catch (err) {
    console.warn('Error reading RFQ data file, using fallback seed:', err);
    return INITIAL_SEED_RFQS;
  }
}

export function getAllRfqs(): StoredRfq[] {
  return ensureDataFile();
}

export function getRfqByRef(refNo: string): StoredRfq | null {
  const all = ensureDataFile();
  return all.find((r) => r.referenceNumber.toUpperCase() === refNo.toUpperCase()) || null;
}

export function saveNewRfq(payload: RfqSubmissionInput, referenceNumber: string): StoredRfq {
  const all = ensureDataFile();

  const newRfq: StoredRfq = {
    id: `rfq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    referenceNumber,
    createdAt: new Date().toISOString(),
    companyName: payload.companyName,
    contactName: payload.contactName,
    email: payload.email,
    phone: payload.phone,
    followUpChannel: payload.followUpChannel,
    deliveryDestination: payload.deliveryDestination || undefined,
    targetTimeline: payload.targetTimeline || undefined,
    notes: payload.notes || undefined,
    status: 'pending',
    items: payload.items.map((i) => ({
      productId: i.productId,
      productName: i.productName,
      category: i.category,
      quantity: i.quantity,
      unit: i.unit,
      customSpecs: i.customSpecs,
      isCustomSourcing: i.isCustomSourcing,
    })),
    attachments: (payload.attachments || []).map((a) => ({
      name: a.name,
      size: a.size,
      type: a.type,
    })),
  };

  // Prepend to list so newest is first
  const updated = [newRfq, ...all];
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write RFQ file:', err);
  }

  return newRfq;
}

export function updateRfqStatus(
  refNo: string,
  status: StoredRfq['status'],
  adminNotes?: string
): StoredRfq | null {
  const all = ensureDataFile();
  const index = all.findIndex((r) => r.referenceNumber.toUpperCase() === refNo.toUpperCase());
  if (index === -1) return null;

  all[index] = {
    ...all[index],
    status,
    adminNotes: adminNotes !== undefined ? adminNotes : all[index].adminNotes,
  };

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to update RFQ file:', err);
  }

  return all[index];
}
