'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { CheckCircle, XCircle, ArrowRight, CreditCard, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { useSession } from 'next-auth/react';

function PaymentStatus() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleTestPayment = async () => {
    if (!session?.user) {
      alert('Kérlek jelentkezz be a vásárláshoz!');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/api/payments/create-subscription-checkout', {
        userId: (session.user as any).id || session.user.email,
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      const errorMsg = error.response?.data?.error || error.message || 'Ismeretlen hiba történt.';
      alert(`Fizetési hiba: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="text-green-600 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-[#1F2937] mb-4">Sikeres fizetés!</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Köszönjük! Az előfizetésed sikeresen aktiválva lett. Mostantól élvezheted a prémium funkciókat.
        </p>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-lg transform hover:scale-105"
        >
          Vissza a profilomhoz <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  if (status === 'cancel') {
    return (
      <div className="text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="text-red-600 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-[#1F2937] mb-4">A fizetés megszakadt</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Nem történt terhelés. Ha bármi gondod akadt, próbáld újra vagy vedd fel velünk a kapcsolatot.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleTestPayment}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-[#1B4332] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#2D6A4F] transition"
          >
            {loading ? <Loader2 className="animate-spin" /> : <CreditCard size={20} />}
            Újrapróbálom
          </button>
          <Link
            href="/profile"
            className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
          >
            Vissza a profilomhoz
          </Link>
        </div>
      </div>
    );
  }

  // Default State
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <CreditCard className="text-[#1B4332] w-10 h-10" />
      </div>
      <h1 className="text-3xl font-bold text-[#1F2937] mb-4">Prémium Előfizetés</h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Támogasd a helyi termelőket és élvezd a kiemelt megjelenést!
      </p>

      <button
        onClick={handleTestPayment}
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1B4332] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#2D6A4F] transition shadow-lg transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" /> Folyamatban...
          </>
        ) : (
          <>
            <CreditCard size={24} /> Stripe Fizetés Teszt
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 mt-6">
        Ez egy teszt környezet. A fizetés szimulált.
      </p>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-center min-h-[70vh]">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 w-full max-w-2xl relative overflow-hidden">
          {/* Decorative background blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50 pointer-events-none"></div>

          <div className="relative z-10">
            <Suspense fallback={<div className="text-center py-10">Betöltés...</div>}>
              <PaymentStatus />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}