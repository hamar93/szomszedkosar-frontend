'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
