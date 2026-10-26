'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Building2,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@velmora.com');
  const [password, setPassword] = useState('Velmora2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Autentikasi gagal. Silakan coba lagi.');
        setLoading(false);
        return;
      }

      // Redirect to admin dashboard
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError('Terjadi kendala koneksi ke server.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08121E] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Top Corporate Legal Strip */}
      <header className="border-b border-slate-800/80 bg-[#0C1A2B] px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <Link href="/id" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-slate-950 font-mono text-sm shadow-sm">
                V
              </div>
              <span className="font-bold tracking-wider uppercase font-mono text-slate-100 group-hover:text-amber-400 transition-colors">
                VELMORA
              </span>
            </Link>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
              PT Velmora Niaga Nusantara — Internal Operations Portal
            </span>
          </div>

          <Link
            href="/id"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-mono"
          >
            <span>&larr; Kembali ke Situs Utama</span>
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Badge & Security Indicator */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Sistem Akses Terotorisasi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Admin & Procurement Desk
            </h1>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Masuk untuk mengelola permintaan penawaran (RFQ), memverifikasi spesifikasi teknis, dan menerbitkan SPH resmi.
            </p>
          </div>

          <div className="bg-[#0C1B2E] border border-slate-700/70 rounded-md p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            {error && (
              <div className="mb-6 p-4 rounded-sm bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Internal Petugas
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@velmora.com"
                    className="w-full bg-[#08121E] border border-slate-700 rounded-sm pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    Kata Sandi Desk
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#08121E] border border-slate-700 rounded-sm pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans"
                  />
                </div>
              </div>

              {/* Quick Preset Credentials Notice for Testing */}
              <div className="p-3 bg-slate-900/80 rounded-sm border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kredensial Demo Pengujian (Tersedia):</span>
                </div>
                <div className="font-mono text-slate-400">
                  Email: <span className="text-amber-300">admin@velmora.com</span>
                  <br />
                  Sandi: <span className="text-amber-300">Velmora2026!</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 px-4 rounded-sm transition-all text-xs font-mono uppercase tracking-wider shadow-lg disabled:opacity-60"
              >
                {loading ? (
                  <span>Memverifikasi Akses...</span>
                ) : (
                  <>
                    <span>Buka Portal RFQ Masuk</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Compliance & Security Footer */}
          <div className="mt-8 text-center text-[11px] text-slate-500 space-y-1 font-mono">
            <p>PT Velmora Niaga Nusantara — All Rights Reserved</p>
            <p>Koneksi Terenkripsi TLS 1.3 • Audit Log IP Tercatat</p>
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="border-t border-slate-800/80 bg-[#0C1A2B] px-6 py-3 text-center text-xs text-slate-500 font-mono">
        B2B Commercial Sourcing • Enterprise Contract Desk • v2.6.4-PROD
      </footer>
    </div>
  );
}
