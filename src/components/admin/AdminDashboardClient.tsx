'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { StoredRfq } from '@/lib/rfq-store';
import {
  ShieldCheck,
  Search,
  Filter,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Mail,
  Phone,
  Building2,
  Calendar,
  MapPin,
  Download,
  Printer,
  ChevronRight,
  LogOut,
  RefreshCw,
  X,
  FileText,
  BadgeAlert,
  ArrowUpRight,
  Send,
  UserCheck,
} from 'lucide-react';

interface Stats {
  total: number;
  pending: number;
  inReview: number;
  quoted: number;
  completed: number;
  rejected: number;
  estimatedPipelineTotal: string;
}

export function AdminDashboardClient() {
  const router = useRouter();
  const [rfqs, setRfqs] = useState<StoredRfq[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    inReview: 0,
    quoted: 0,
    completed: 0,
    rejected: 0,
    estimatedPipelineTotal: 'Rp 0',
  });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRfq, setSelectedRfq] = useState<StoredRfq | null>(null);

  // Status edit state for modal
  const [editingStatus, setEditingStatus] = useState<StoredRfq['status']>('pending');
  const [editingNotes, setEditingNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateFeedback, setUpdateFeedback] = useState<string | null>(null);

  const fetchRfqs = async () => {
    setLoading(true);
    try {
      const url = `/api/admin/rfqs?status=${statusFilter}&search=${encodeURIComponent(
        searchQuery
      )}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setRfqs(data.data);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error('Error loading RFQs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRfqs();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRfqs();
  };

  const handleOpenDetail = (rfq: StoredRfq) => {
    setSelectedRfq(rfq);
    setEditingStatus(rfq.status);
    setEditingNotes(rfq.adminNotes || '');
    setUpdateFeedback(null);
  };

  const handleSaveStatus = async () => {
    if (!selectedRfq) return;
    setUpdating(true);
    setUpdateFeedback(null);

    try {
      const res = await fetch('/api/admin/rfqs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referenceNumber: selectedRfq.referenceNumber,
          status: editingStatus,
          adminNotes: editingNotes,
        }),
      });
      const data = await res.json();

      if (data.success && data.data) {
        setSelectedRfq(data.data);
        setUpdateFeedback('Status dan catatan berhasil diperbarui!');
        // Update local list
        setRfqs((prev) =>
          prev.map((item) =>
            item.referenceNumber === data.data.referenceNumber ? data.data : item
          )
        );
        // Refresh full counts
        fetchRfqs();
      } else {
        setUpdateFeedback(data.error || 'Gagal menyimpan perubahan.');
      }
    } catch (err) {
      setUpdateFeedback('Terjadi kendala jaringan saat menyimpan.');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      router.push('/admin/login');
    }
  };

  const formatWhatsAppUrl = (phone: string, rfq: StoredRfq) => {
    // Format Indonesian phone numbers
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.substring(1);
    } else if (cleanPhone.startsWith('8')) {
      cleanPhone = '62' + cleanPhone;
    }

    const itemsSummary = rfq.items
      .map((i, idx) => `${idx + 1}. ${i.productName} (${i.quantity} ${i.unit})`)
      .join('%0A');

    const message = `Halo Bapak/Ibu ${encodeURIComponent(rfq.contactName)} (${encodeURIComponent(
      rfq.companyName
    )}),%0A%0AKami dari Tim Procurement & Quotation Desk *PT Velmora Niaga Nusantara* menindaklanjuti permintaan penawaran harga (RFQ) Anda dengan No. Referensi: *${rfq.referenceNumber}*.%0A%0AItem yang diajukan:%0A${itemsSummary}%0A%0AMohon konfirmasi bila ada lampiran spesifikasi teknis tambahan yang perlu kami perhitungkan dalam Surat Penawaran Harga (SPH). Terima kasih!`;

    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  const getStatusBadge = (status: StoredRfq['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-mono uppercase tracking-wider font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Baru Masuk
          </span>
        );
      case 'in_review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-mono uppercase tracking-wider font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/30">
            <Clock className="w-3 h-3 text-blue-600" />
            Sedang Direview
          </span>
        );
      case 'quoted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-mono uppercase tracking-wider font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            SPH Terbit
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-mono uppercase tracking-wider font-semibold bg-slate-800 text-white border border-slate-700">
            <UserCheck className="w-3 h-3 text-amber-400" />
            Selesai / PO Terbit
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-mono uppercase tracking-wider font-semibold bg-red-500/10 text-red-600 border border-red-500/30">
            <X className="w-3 h-3 text-red-600" />
            Ditolak
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 font-sans">
      {/* 1. TOP CORPORATE BAR */}
      <header className="bg-[#0A192F] text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Identity */}
            <div className="flex items-center gap-4">
              <Link href="/id" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-slate-950 font-mono text-base shadow-sm">
                  V
                </div>
                <div>
                  <div className="font-bold text-base tracking-wider uppercase font-mono text-white flex items-center gap-2">
                    <span>VELMORA</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded font-mono font-normal">
                      OPERATIONS DESK
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
                    PT Velmora Niaga Nusantara • Internal RFQ Management Console
                  </div>
                </div>
              </Link>
            </div>

            {/* Quick Actions & Officer Profile */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <Link
                href="/id"
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 text-slate-300 hover:text-white px-3 py-1.5 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                <span>Buka Web Publik</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <div className="hidden lg:flex items-center gap-2 border-l border-slate-700 pl-4 text-slate-300">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Petugas: <strong className="text-white">Admin Sourcing</strong></span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-red-300 hover:text-red-200 bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 transition-colors"
                title="Keluar dari sesi"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome & Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold mb-1">
              • Inbound B2B Procurement Pipeline
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] tracking-tight">
              Daftar Permintaan Penawaran (RFQ) Masuk
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Pantau seluruh kebutuhan pengadaan perusahaan klien, verifikasi dokumen teknis, dan teruskan surat penawaran harga.
            </p>
          </div>

          <button
            onClick={fetchRfqs}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded-sm border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-xs self-start md:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-600' : ''}`} />
            <span>Segarkan Data</span>
          </button>
        </div>

        {/* 3. METRICS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-sm border border-slate-200 shadow-xs">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Total Permintaan
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-mono">
              {stats.total}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">Seluruh inquiry terdaftar</div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-sm border-l-4 border-l-amber-500 border border-slate-200 shadow-xs">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold flex items-center justify-between">
              <span>Baru Masuk</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
              {stats.pending}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">Perlu respon &lt; 24 jam</div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-sm border-l-4 border-l-blue-600 border border-slate-200 shadow-xs">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-700 font-semibold">
              Sedang Direview
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono">
              {stats.inReview}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">Pencocokan spek & vendor</div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-sm border-l-4 border-l-emerald-600 border border-slate-200 shadow-xs">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
              SPH Diterbitkan
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">
              {stats.quoted}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">Menunggu PO klien</div>
          </div>

          <div className="bg-[#0A192F] text-white p-4 sm:p-5 rounded-sm border border-slate-800 shadow-xs col-span-2 lg:col-span-1">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Pipeline Estimasi
            </div>
            <div className="mt-2 text-lg sm:text-xl font-bold font-mono text-white truncate">
              {stats.estimatedPipelineTotal}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">Total nilai potensi pengadaan</div>
          </div>
        </div>

        {/* 4. FILTER TABS & SEARCH BAR */}
        <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              {[
                { key: 'all', label: `Semua (${stats.total})` },
                { key: 'pending', label: `Baru Masuk (${stats.pending})` },
                { key: 'in_review', label: `Sedang Direview (${stats.inReview})` },
                { key: 'quoted', label: `SPH Terbit (${stats.quoted})` },
                { key: 'completed', label: `Selesai (${stats.completed})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-3 py-2 rounded-xs font-medium transition-all ${
                    statusFilter === tab.key
                      ? 'bg-[#0A192F] text-white font-semibold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari No. RFQ, Nama PT, Item..."
                  className="w-full text-xs font-sans pl-9 pr-3 py-2 rounded-sm border border-slate-300 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-sm text-xs font-mono font-medium uppercase tracking-wider transition-colors shrink-0"
              >
                Cari
              </button>
            </form>
          </div>
        </div>

        {/* 5. DATA TABLE */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <RefreshCw className="w-8 h-8 text-amber-600 animate-spin mx-auto mb-3" />
              <p className="text-sm font-mono text-slate-500">Memuat berkas permintaan RFQ...</p>
            </div>
          ) : rfqs.length === 0 ? (
            <div className="py-20 text-center px-4">
              <FileSpreadsheet className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 font-sans">
                Tidak ada permintaan yang sesuai kriteria
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                Silakan coba ubah kata kunci pencarian atau ganti filter status di atas.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0C1B2E] text-slate-300 font-mono uppercase tracking-wider text-[11px] border-b border-slate-800">
                    <th className="py-3 px-4">No. Referensi & Tanggal</th>
                    <th className="py-3 px-4">Perusahaan / Klien</th>
                    <th className="py-3 px-4">PIC & Kontak</th>
                    <th className="py-3 px-4">Rincian Barang</th>
                    <th className="py-3 px-4">Kanal Respon</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aksi Disposisi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rfqs.map((rfq) => {
                    const formattedDate = new Date(rfq.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <tr
                        key={rfq.id || rfq.referenceNumber}
                        className="hover:bg-amber-50/40 transition-colors group cursor-pointer"
                        onClick={() => handleOpenDetail(rfq)}
                      >
                        {/* Reference & Date */}
                        <td className="py-3.5 px-4 font-mono">
                          <div className="font-bold text-[#0A192F] text-xs group-hover:text-amber-700 transition-colors flex items-center gap-1.5">
                            <span>{rfq.referenceNumber}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{formattedDate}</span>
                          </div>
                        </td>

                        {/* Company */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 font-sans text-xs">
                            {rfq.companyName}
                          </div>
                          {rfq.deliveryDestination && (
                            <div className="text-[11px] text-slate-500 truncate max-w-xs mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{rfq.deliveryDestination}</span>
                            </div>
                          )}
                        </td>

                        {/* PIC & Contact */}
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-slate-800">{rfq.contactName}</div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                            <span>{rfq.phone}</span>
                          </div>
                        </td>

                        {/* Line items summary */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800">
                            {rfq.items.length} Macam Kebutuhan
                          </div>
                          <div className="text-[11px] text-slate-500 truncate max-w-xs mt-0.5">
                            {rfq.items[0]?.productName}
                            {rfq.items.length > 1 && ` (+${rfq.items.length - 1} lainnya)`}
                          </div>
                        </td>

                        {/* Follow up channel */}
                        <td className="py-3.5 px-4">
                          {rfq.followUpChannel === 'whatsapp' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                              <MessageSquare className="w-3 h-3 text-emerald-600" />
                              WhatsApp
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                              <Mail className="w-3 h-3 text-blue-600" />
                              Email
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">{getStatusBadge(rfq.status)}</td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDetail(rfq);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-slate-100 hover:bg-[#0A192F] text-slate-700 hover:text-white font-mono text-[11px] font-medium transition-all"
                          >
                            <span>Periksa</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* 6. DETAIL DRAWER / DISPOSITION MODAL */}
      {selectedRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-md max-w-3xl w-full my-8 border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#0A192F] text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                    Lembar Disposisi RFQ Resmi
                  </div>
                  <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
                    <span>{selectedRfq.referenceNumber}</span>
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors"
                  title="Cetak Lembar Disposisi"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedRfq(null)}
                  className="p-2 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors"
                  title="Tutup Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Company & PIC Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-sm bg-slate-50 border border-slate-200">
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Profil Perusahaan Pemohon:
                  </div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>{selectedRfq.companyName}</span>
                  </div>
                  <div className="text-slate-600 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>PIC: {selectedRfq.contactName}</span>
                  </div>
                  <div className="text-slate-600 flex items-center gap-1.5 font-mono">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedRfq.email}</span>
                  </div>
                  <div className="text-slate-600 flex items-center gap-1.5 font-mono">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedRfq.phone}</span>
                  </div>
                </div>

                <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Parameter Pengiriman:
                  </div>
                  <div className="text-slate-700">
                    <span className="font-semibold">Destinasi Logistik:</span>{' '}
                    {selectedRfq.deliveryDestination || 'Mengikuti gudang principal / belum ditentukan'}
                  </div>
                  <div className="text-slate-700">
                    <span className="font-semibold">Target Waktu Kebutuhan:</span>{' '}
                    {selectedRfq.targetTimeline || 'Reguler'}
                  </div>
                  <div className="text-slate-700">
                    <span className="font-semibold">Estimasi Nilai Proyek:</span>{' '}
                    <span className="font-mono font-bold text-amber-700">
                      {selectedRfq.estimatedValue || 'Menunggu Kalkulasi SPH'}
                    </span>
                  </div>
                  <div className="text-slate-700">
                    <span className="font-semibold">Kanal Kontak Pilihan:</span>{' '}
                    <span className="capitalize font-mono font-bold text-slate-900">
                      {selectedRfq.followUpChannel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Follow-up Buttons (Actionable WhatsApp & Email) */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={formatWhatsAppUrl(selectedRfq.phone, selectedRfq)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-wider font-bold shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Hubungi PIC via WhatsApp Resmi</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`mailto:${selectedRfq.email}?subject=Surat%20Penawaran%20Harga%20(SPH)%20Ref:%20${selectedRfq.referenceNumber}%20-%20PT%20Velmora%20Niaga%20Nusantara`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#0A192F] hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-bold shadow-xs transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Draft Respon Email Resmi</span>
                </a>
              </div>

              {/* Items Table */}
              <div>
                <h3 className="font-mono uppercase tracking-wider text-slate-800 font-bold mb-2 flex items-center justify-between">
                  <span>Daftar Kebutuhan Barang ({selectedRfq.items.length} Item)</span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    Format Standar BOQ / Sourcing Sheet
                  </span>
                </h3>

                <div className="border border-slate-200 rounded-sm overflow-hidden">
                  <table className="w-full text-left text-xs divide-y divide-slate-200">
                    <thead className="bg-slate-100 font-mono text-[11px] text-slate-700 uppercase">
                      <tr>
                        <th className="py-2.5 px-3">No</th>
                        <th className="py-2.5 px-3">Nama Produk / Material</th>
                        <th className="py-2.5 px-3">Kategori</th>
                        <th className="py-2.5 px-3 text-right">Kuantitas</th>
                        <th className="py-2.5 px-3">Satuan</th>
                        <th className="py-2.5 px-3">Spesifikasi Kustom / Catatan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {selectedRfq.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">
                            {item.productName}
                            {item.isCustomSourcing && (
                              <span className="ml-2 text-[10px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                                Custom Sourcing
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-500 uppercase text-[10px]">
                            {item.category}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-900 text-right">
                            {item.quantity}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600">{item.unit}</td>
                          <td className="py-2.5 px-3 text-slate-600 italic">
                            {item.customSpecs || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Special Client Notes & Attachments */}
              {selectedRfq.notes && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1">
                    Catatan Khusus Klien:
                  </div>
                  <p className="text-slate-700 leading-relaxed font-sans">{selectedRfq.notes}</p>
                </div>
              )}

              {selectedRfq.attachments && selectedRfq.attachments.length > 0 && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Berkas Lampiran Teknis ({selectedRfq.attachments.length} Berkas):
                  </div>
                  <div className="space-y-1.5">
                    {selectedRfq.attachments.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 text-xs font-mono"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-slate-800">{file.name}</span>
                          <span className="text-slate-400 text-[11px]">
                            ({(file.size / 1024).toFixed(0)} KB)
                          </span>
                        </div>
                        <span className="text-amber-700 font-bold text-[11px]">
                          Tersimpan di Dokumen RFQ
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Status Transition Section */}
              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono uppercase tracking-wider text-amber-900 font-bold text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Disposisi & Pembaruan Status Petugas</span>
                  </h4>
                  {updateFeedback && (
                    <span className="text-xs font-semibold text-emerald-700">
                      {updateFeedback}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-bold">
                      Status Penanganan:
                    </label>
                    <select
                      value={editingStatus}
                      onChange={(e) => setEditingStatus(e.target.value as any)}
                      className="w-full text-xs font-mono p-2.5 rounded-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-600"
                    >
                      <option value="pending">Baru Masuk (Pending)</option>
                      <option value="in_review">Sedang Direview (In Review)</option>
                      <option value="quoted">Penawaran Terkirim (Quoted / SPH Terbit)</option>
                      <option value="completed">Selesai / PO Diterbitkan (Completed)</option>
                      <option value="rejected">Ditolak / Dibatalkan (Rejected)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-bold">
                      Catatan Internal Admin / Sourcing Desk:
                    </label>
                    <textarea
                      rows={2}
                      value={editingNotes}
                      onChange={(e) => setEditingNotes(e.target.value)}
                      placeholder="Contoh: Telah dicocokkan dengan stok gudang Cikarang, harga diskon 15%..."
                      className="w-full text-xs font-sans p-2 rounded-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveStatus}
                    disabled={updating}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A192F] hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm transition-all shadow-xs disabled:opacity-60"
                  >
                    {updating ? 'Menyimpan...' : 'Simpan Perubahan Disposisi'}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-[11px] font-mono text-slate-500">
                PT Velmora Niaga Nusantara • Dokumen Rahasia Perusahaan
              </span>
              <button
                onClick={() => setSelectedRfq(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-mono uppercase tracking-wider rounded-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
