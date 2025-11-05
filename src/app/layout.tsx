// src/app/layout.tsx
import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import './globals.css'

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '700'],
})

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
      <body className={sourceSans3.className}>
        {children}
      </body>
    </html>
  )
}
