import React from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '@/types/i18n';
import { DemoDisclaimerBanner } from '@/components/DemoDisclaimerBanner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }];
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  if (lang !== 'en' && lang !== 'id') {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DemoDisclaimerBanner lang={lang} />
      <Navbar lang={lang} />
      <main className="grow">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
