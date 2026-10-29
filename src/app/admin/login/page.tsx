'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  AlertCircle,
  ArrowLeft,
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
    } catch (_err) {
      setError('Terjadi kendala koneksi ke server.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-precision-grid">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 text-center">
        <Link
          href="/id"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-black mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Publik</span>
        </Link>

        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#0b0f17] border border-slate-800 flex items-center justify-center text-amber-400 font-mono font-black text-lg shadow-sm">
            V
          </div>
          <div className="text-left">
            <div className="text-xl font-black font-mono tracking-tight text-[#0b0f17]">
              VELMORA
            </div>
            <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              Admin Sourcing Portal
            </div>
          </div>
        </div>

        <h1 className="text-lg font-bold text-[#0b0f17] font-mono">
          Masuk ke Meja Kerja Petugas Pengadaan
        </h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-elevation sm:rounded-lg sm:px-10 border border-slate-200">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700">
                Email Internal
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-200 rounded-md focus:outline-hidden focus:border-amber-500 bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-700">
                Kata Sandi
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-200 rounded-md focus:outline-hidden focus:border-amber-500 bg-slate-50"
                />
              </div>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-md text-[11px] font-mono text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Kredensial Peninjau (Demo / Showcase)</span>
              </div>
              <div>Email: <strong>admin@velmora.com</strong></div>
              <div>Password: <strong>Velmora2026!</strong></div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider rounded-md text-white bg-[#0b0f17] hover:bg-slate-800 focus:outline-hidden transition-all shadow-subtle"
            >
              {loading ? (
                <span>Memverifikasi Sesi...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Otorisasi Masuk</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
