'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

function PaymentStatus() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  if (status === 'success') {
    return (
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600 w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-[#1F2937] mb-4">Sikeres fizetés!</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Köszönjük! Az előfizetésed sikeresen aktiválva lett. Mostantól élvezheted a prémium funkciókat.
        </p>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-lg"
        >
          Vissza a profilomhoz <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  if (status === 'cancel') {
    return (
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="text-red-600 w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-[#1F2937] mb-4">A fizetés megszakadt</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Nem történt terhelés. Ha bármi gondod akadt, próbáld újra vagy vedd fel velünk a kapcsolatot.
        </p>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition"
        >
          Vissza a profilomhoz
        </Link>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="text-center">
        <p className="text-gray-500">Visszatérés a főoldalra...</p>
        <Link href="/feed" className="text-[#1B4332] font-bold hover:underline mt-4 inline-block">
          Vissza a Hírfolyamra
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-gray-500">Ismeretlen státusz.</p>
      <Link href="/" className="text-[#1B4332] font-bold hover:underline mt-4 inline-block">
        Vissza a főoldalra
      </Link>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-12 w-full max-w-2xl">
          <Suspense fallback={<div className="text-center">Betöltés...</div>}>
            <PaymentStatus />
          </Suspense>
        </div>
      </main>
    </div>
  );
}