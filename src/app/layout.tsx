import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '../styles/globals.css';
import { ReactNode } from 'react';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NerdyPay',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
      <html lang="en" className={roboto.className}>
      <body>
      <ReactQueryProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ReactQueryProvider>
      </body>
      </html>
  );
}
