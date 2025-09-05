import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BettingProvider } from '@/lib/betting-context';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SportsBet Pro - Live Sports Betting Platform',
  description: 'Professional sports betting platform with live odds, real-time calculations, and secure bet placement.',
  keywords: 'sports betting, live odds, football, basketball, tennis, betting slip',
  authors: [{ name: 'SportsBet Pro Team' }],
  openGraph: {
    title: 'SportsBet Pro - Live Sports Betting Platform',
    description: 'Professional sports betting platform with live odds and real-time calculations.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SportsBet Pro - Live Sports Betting Platform',
    description: 'Professional sports betting platform with live odds and real-time calculations.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body className={inter.className}>
        <BettingProvider>
          {children}
          <Toaster position="bottom-right" />
        </BettingProvider>
      </body>
    </html>
  );
}