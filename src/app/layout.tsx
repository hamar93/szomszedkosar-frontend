// src/app/layout.tsx (A JAVÍTOTT KÓD)

import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import './globals.css' // Itt van a Tailwind és az összes többi stílusod

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
      {/* A body-ra két kritikus Tailwind osztályt adunk:
        1. bg-[#FAF7F0] (Krém háttér: felülírja a hibás CSS-t)
        2. text-[18px] (A 18px-es akadálymentes fontméret)
      */}
      <body 
        className={`${sourceSans3.className} bg-[#FAF7F0] text-[18px]`}
      >
        {children}
      </body>
    </html>
  )
}
