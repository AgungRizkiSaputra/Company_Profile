import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { RfqProvider } from '@/lib/rfq-context';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Velmora — General Trading & Procurement',
    default: 'Velmora — One Partner. Multiple Procurement Needs.',
  },
  description:
    'Velmora simplifies multi-category B2B procurement across industrial supplies, electrical systems, certified safety gear, and corporate facility consumables under one dependable partner.',
  keywords: [
    'B2B Procurement',
    'General Trading',
    'Industrial Supplies',
    'MRO Sourcing',
    'Electrical Infrastructure',
    'Safety Gear PPE',
    'Corporate Procurement Indonesia',
  ],
  authors: [{ name: 'Velmora Technical Desk' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${mono.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#121316] font-sans selection:bg-[#121316] selection:text-white">
        <RfqProvider>{children}</RfqProvider>
      </body>
    </html>
  );
}
