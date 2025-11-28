'use client';

import Link from 'next/link';
import { Heart, ArrowLeft, Search } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-600">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold text-[#1F2937] flex items-center gap-2">
              <Heart size={24} className="text-[#1B4332]" />
              Kedvenc termékeid
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
            <Heart size={40} />
          </div>

          <h2 className="text-2xl font-bold text-[#1F2937] mb-3">Még nincsenek kedvenceid</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Böngéssz a környékbeli termelők kínálatában, és mentsd el a kedvenceidet a későbbi gyors eléréshez!
          </p>

          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md"
          >
            <Search size={20} />
            Termékek böngészése
          </Link>
        </div>

      </main>
    </div>
  );
}
