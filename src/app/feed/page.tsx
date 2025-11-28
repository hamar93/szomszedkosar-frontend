'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Ha a Newsfeed komponensed még a régi, inkább itt építem fel a listát, hogy szép legyen
// De ha ragaszkodsz a külön fájlhoz, visszakötheted. 
// Most a biztosság kedvéért egybe rakom, hogy MŰKÖDJÖN.

interface UserLocation {
  latitude: number;
  longitude: number;
  city: string;
  zipCode: string;
}

export default function FeedPage() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedLocation = localStorage.getItem('szomszedkosar_user_location');
    if (storedLocation) {
      try {
        const locationData: UserLocation = JSON.parse(storedLocation);
        setUserLocation(locationData);
      } catch (error) {
        console.error("Hiba a helyadatok feldolgozásában:", error);
      }
    }
    setLoading(false);
  }, []);

  // --- KOMPONENSEK (Hogy ne legyen 'not defined' hiba) ---

  const Header = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1B4332] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-[#1B4332]">SzomszédKosár</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/feed" className="text-[#1B4332] font-semibold transition">Hírfolyam</Link>
            <Link href="/termelok" className="text-gray-600 hover:text-[#1B4332] font-medium transition">Termelők</Link>
          </nav>
          <div className="flex items-center gap-4">
             <div className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full">
               {userLocation ? `📍 ${userLocation.city}` : '📍 Helymeghatározás...'}
             </div>
          </div>
        </div>
      </div>
    </header>
  );

  const LocationPrompt = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
        <div className="w-16 h-16 bg-[#F0F4F1] rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">📍</span>
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937] mb-3">Hol vagy most?</h2>
        <p className="text-gray-600 mb-8">
          Add meg a címedet vagy engedélyezd a helymeghatározást, hogy láthasd a környékbeli termelőket!
        </p>
        <button 
          onClick={() => alert("Helymeghatározás logika itt futna...")}
          className="w-full bg-[#1B4332] text-white py-3 rounded-xl font-bold hover:bg-[#2D6A4F] transition"
        >
          Helyzetem megosztása
        </button>
      </div>
    </div>
  );

  // --- RENDER ---

  if (loading) return <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">Betöltés...</div>;

  if (!userLocation) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] font-sans">
        <Header />
        <LocationPrompt />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Friss Ajánlatok</h1>
            <p className="text-gray-600">
              A legfrissebb termékek {userLocation.city} 15 km-es körzetében.
            </p>
          </div>
        </div>

        {/* FEED LISTA (Placeholder) */}
        <div className="space-y-6">
          <article className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">👩‍🌾</div>
                <div>
                  <h3 className="font-bold text-[#1F2937]">Kovács Marika</h3>
                  <div className="text-xs text-gray-500 flex gap-2">
                    <span>2.5 km távolságra</span>
                    <span>•</span>
                    <span>2 órája</span>
                  </div>
                </div>
              </div>
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">SÜRGŐS</span>
            </div>
            
            <div className="mb-4">
              <h4 className="text-xl font-bold mb-2">Mai szedésű szabadföldi paradicsom 🍅</h4>
              <p className="text-gray-600">Sziasztok! Most szedtem le 20 láda paradicsomot. Befőzésre tökéletes!</p>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-[#1B4332] text-white py-2.5 rounded-xl font-medium hover:bg-[#2D6A4F] transition">
                Részletek
              </button>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}