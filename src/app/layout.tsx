// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SzomszédKosár - Friss, helyi, házias termékek',
  description: 'Közvetlenül a termelőktől és környékbeli árusoktól',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}