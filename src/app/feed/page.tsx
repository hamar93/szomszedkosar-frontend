'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingBasket,
  MapPin,
  Search,
  Filter,
  Leaf,
  Clock,
  User,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

interface UserLocation {
  latitude: number;
  longitude: number;
  city: string;
  zipCode: string;
}

export default function FeedPage() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // --- HEADER (Matching Main Page) ---
  const Header = () => (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1B4332] rounded-xl flex items-center justify-center shadow-sm">
              <ShoppingBasket className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-[#1B4332] tracking-tight">
              SzomszédKosár
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/feed" className="text-[#1B4332] font-bold transition flex items-center gap-1">
              Hírfolyam
            </Link>
            <Link href="/termelok" className="text-gray-600 hover:text-[#1B4332] font-medium transition">
              Termelők
            </Link>
            <Link href="/rolunk" className="text-gray-600 hover:text-[#1B4332] font-medium transition">
              Rólunk
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {userLocation ? (
              <div className="flex items-center gap-2 text-sm text-[#1B4332] font-bold bg-[#E8ECE9] px-4 py-2 rounded-xl">
                <MapPin size={16} />
                {userLocation.city}
              </div>
            ) : (
              <Link href="/login" className="px-5 py-2.5 text-[#1B4332] font-bold hover:bg-[#F0F4F1] rounded-xl transition">
                Belépés
              </Link>
            )}
          </div>

          <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            <Link href="/feed" className="text-lg font-bold text-[#1B4332]">Hírfolyam</Link>
            <Link href="/termelok" className="text-lg font-medium text-gray-700">Termelők</Link>
            <hr className="border-gray-100" />
            <div className="text-sm text-gray-500">
              {userLocation ? `📍 ${userLocation.city}` : 'Nincs hely megadva'}
            </div>
          </nav>
        </div>
      )}
    </header>
  );

  const LocationPrompt = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="w-20 h-20 bg-[#F0F4F1] rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin className="text-[#1B4332] w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937] mb-3">Hol vagy most?</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Add meg a címedet vagy engedélyezd a helymeghatározást, hogy láthasd a környékbeli termelőket!
        </p>
        <button
          onClick={() => alert("Helymeghatározás logika...")}
          className="w-full bg-[#1B4332] text-white py-4 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md"
        >
          Helyzetem megosztása
        </button>
      </div>
    </div>
  );

  // --- RENDER ---

  if (loading) return <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center text-[#1B4332] font-bold">Betöltés...</div>;

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

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* PAGE TITLE & FILTERS */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1F2937] mb-2 flex items-center gap-3">
              Friss Ajánlatok
              <span className="text-sm font-normal bg-white px-3 py-1 rounded-full border border-gray-200 text-gray-500 shadow-sm">
                {userLocation.city} + 15 km
              </span>
            </h1>
            <p className="text-gray-600">
              Válogass a környékbeli termelők legfrissebb kínálatából.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-700 hover:border-[#1B4332] hover:text-[#1B4332] transition flex items-center gap-2 shadow-sm">
              <Filter size={18} />
              Szűrés
            </button>
            <button className="bg-[#1B4332] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md flex items-center gap-2">
              <Search size={18} />
              Keresés
            </button>
          </div>
        </div>

        {/* FEED GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* SAMPLE CARD 1 */}
          <article className="bg-white rounded-2xl p-0 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group overflow-hidden">
            <div className="h-48 bg-[#F0F4F1] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              <Leaf className="text-[#1B4332]/20 w-24 h-24 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-[#1B4332] shadow-sm">
                MAI SZEDÉS
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-[#1F2937] group-hover:text-[#1B4332] transition">Szabadföldi Paradicsom</h3>
                <span className="text-lg font-bold text-[#1B4332]">850 Ft/kg</span>
              </div>

              <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                Édes, lédús paradicsom közvetlenül a kertből. Vegyszermentes termesztésből, befőzésre is kiváló.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <User size={14} className="text-gray-600" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">Kovács Marika</p>
                    <p className="text-gray-500">2.5 km • Eger</p>
                  </div>
                </div>
                <button className="text-[#1B4332] font-bold text-sm hover:underline">
                  Részletek
                </button>
              </div>
            </div>
          </article>

          {/* SAMPLE CARD 2 */}
          <article className="bg-white rounded-2xl p-0 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group overflow-hidden">
            <div className="h-48 bg-[#FFF7ED] flex items-center justify-center relative overflow-hidden">
              <ShoppingBasket className="text-orange-200 w-24 h-24 group-hover:scale-110 transition-transform duration-500" />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-[#1F2937] group-hover:text-[#1B4332] transition">Házi Sárgabarack Lekvár</h3>
                <span className="text-lg font-bold text-[#1B4332]">1 800 Ft</span>
              </div>

              <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                Nagymama receptje alapján készült, tartósítószer-mentes lekvár. 70% gyümölcstartalom.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <User size={14} className="text-gray-600" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">Nagyi Kamrája</p>
                    <p className="text-gray-500">5.0 km • Ostoros</p>
                  </div>
                </div>
                <button className="text-[#1B4332] font-bold text-sm hover:underline">
                  Részletek
                </button>
              </div>
            </div>
          </article>

          {/* SAMPLE CARD 3 */}
          <article className="bg-white rounded-2xl p-0 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group overflow-hidden">
            <div className="h-48 bg-[#F0F9FF] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
              <ShoppingBasket className="text-blue-200 w-24 h-24 group-hover:scale-110 transition-transform duration-500" />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-[#1F2937] group-hover:text-[#1B4332] transition">Friss Házi Tej</h3>
                <span className="text-lg font-bold text-[#1B4332]">350 Ft/l</span>
              </div>

              <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                Reggeli fejésből származó, teljes tej. Hozd a saját üvegedet!
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <User size={14} className="text-gray-600" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">Szabó Tanya</p>
                    <p className="text-gray-500">8.2 km • Andornaktálya</p>
                  </div>
                </div>
                <button className="text-[#1B4332] font-bold text-sm hover:underline">
                  Részletek
                </button>
              </div>
            </div>
          </article>

        </div>
      </main>
    </div>
  );
}