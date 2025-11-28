
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
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
  ChevronDown,
  Package
} from 'lucide-react';

// MOCK DATA for Hybrid Marketplace
const MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'Meggyszörp',
    price: 1200,
    unit: 'üveg',
    description: 'Házi készítésű, tartósítószer-mentes meggyszörp a nagymama receptje alapján.',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    isShippable: true,
    distance: 45, // Distant but shippable
    user: { name: 'Kovács Éva', city: 'Debrecen' }
  },
  {
    _id: '2',
    name: 'Baracklekvár',
    price: 1800,
    unit: 'üveg',
    description: 'Napérlelte sárgabarackból készült sűrű lekvár, kevés cukorral.',
    imageUrl: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=800',
    isShippable: true,
    distance: 120, // Distant but shippable
    user: { name: 'Tóth Péter', city: 'Szeged' }
  },
  {
    _id: '3',
    name: 'Friss Meggy',
    price: 800,
    unit: 'kg',
    description: 'Ropogós, édes-savanykás meggy, közvetlenül a fáról.',
    imageUrl: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&q=80&w=800',
    isShippable: false,
    distance: 5, // Local
    user: { name: 'Nagy Anna', city: 'Eger' }
  },
  {
    _id: '4',
    name: 'Összibarack',
    price: 950,
    unit: 'kg',
    description: 'Lédús, illatos őszibarack, befőzésre vagy friss fogyasztásra.',
    imageUrl: 'https://images.unsplash.com/photo-1623227866882-c005c207758f?auto=format&fit=crop&q=80&w=800',
    isShippable: false,
    distance: 12, // Local
    user: { name: 'Szabó Gábor', city: 'Egerszalók' }
  },
  {
    _id: '5',
    name: 'Tanyasi Tojás',
    price: 80,
    unit: 'db',
    description: 'Szabad tartású tyúkok tojása, sárga sárgájával.',
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=800',
    isShippable: false,
    distance: 8, // Local
    user: { name: 'Kiss József', city: 'Ostoros' }
  }
];

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
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    city: "Budapest (Teszt)",
      zipCode: "1000"
  };
  localStorage.setItem('szomszedkosar_user_location', JSON.stringify(defaultLocation));
  setUserLocation(defaultLocation);
};

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
          <div className="text-sm text-gray-500 flex items-center gap-1">
            {userLocation ? (
              <>
                <MapPin size={14} />
                {userLocation.city}
              </>
            ) : (
              'Nincs hely megadva'
            )}
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
        onClick={handleSetDefaultLocation}
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
        {products.length > 0 ? (
          products
            .filter(product => {
              // HYBRID FILTERING LOGIC:
              // Show if distance <= 15km OR if product is shippable
              const isLocal = (product.distance || 0) <= 15;
              const isShippable = product.isShippable === true;
              return isLocal || isShippable;
            })
            .map((product) => (
              <article key={product._id} className="bg-white rounded-2xl p-0 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="h-48 bg-[#F0F4F1] flex items-center justify-center relative overflow-hidden">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <Leaf className="text-[#1B4332]/20 w-24 h-24 group-hover:scale-110 transition-transform duration-500" />
                  )}

                  {/* BADGES */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    {product.isShippable && (
                      <div className="bg-blue-100 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-blue-700 shadow-sm flex items-center gap-1">
                        <Package size={12} />
                        Országos szállítás
                      </div>
                    )}
                    <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-[#1B4332] shadow-sm">
                      FRISS
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-[#1F2937] group-hover:text-[#1B4332] transition">{product.name}</h3>
                    <span className="text-lg font-bold text-[#1B4332]">{product.price} Ft/{product.unit}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User size={14} className="text-gray-600" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-gray-900">{product.user?.name || 'Termelő'}</p>
                        <p className="text-gray-500">
                          {product.distance ? `${product.distance} km • ` : ''}
                          {product.user?.city || 'Helyszín'}
                        </p>
                      </div>
                    </div>
                    <button className="text-[#1B4332] font-bold text-sm hover:underline">
                      Részletek
                    </button>
                  </div>
                </div>
              </article>
            ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            Nincsenek elérhető termékek jelenleg.
          </div>
        )}
      </div>
    </main>
  </div>
);
}
