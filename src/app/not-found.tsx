import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export default function RootNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAFAFA]">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 border border-neutral-200 rounded-xs shadow-xs">
        <div className="w-12 h-12 bg-neutral-100 text-neutral-600 rounded-full flex items-center justify-center mx-auto">
          <FileQuestion className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
            ERROR 404
          </span>
          <h1 className="text-2xl font-black text-[#121316]">
            Page Not Found
          </h1>
          <p className="text-xs text-neutral-500 leading-relaxed">
            The page you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121316] text-white hover:bg-neutral-800 rounded-xs font-mono text-xs uppercase font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
