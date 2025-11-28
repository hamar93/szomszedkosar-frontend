'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBasket, 
  MapPin, 
  Search, 
  Package, // Csomag ikon az országos szállításhoz
  Leaf, 
  User,
  Menu,
  X
} from 'lucide-react';

// Típusok definiálása
interface UserLocation {
  latitude: number;
  longitude: number;
  city: string;
  zipCode: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  seller: string;
  location: string;
  distance: number; // km
  img: string;
  isShippable: boolean; // Országos szállítás
  isUrgent?: boolean;
}

export default function FeedPage() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // MOCK ADATOK (Később innen hívjuk majd az API-t)
  // Itt vannak a "Shippable" (szállítható) és "Lokális" termékek keverve
  const products: Product[] = [
    { 
      id: 1,
      name: 'Ropogós Cseresznye', 
      price: '1 200 Ft/kg', 
      seller: 'Kovács Kertészet', 
      location: 'Eger',
      distance: 2.5, // Közel van
      img: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?q=80&w=800&auto=format&fit=crop',
      isShippable: false // Romlandó
    },
    { 
      id: 2,
      name: 'Házi Eperlekvár', 
      price: '1 500 Ft/üveg', 
      seller: 'Nagyi Kamrája', 
      location: 'Debrecen', 
      distance: 200, // Távol van!
      img: 'https://images.unsplash.com/photo-1504113882835-105857837e37?q=80&w=800&auto=format&fit=crop',
      isShippable: true // DE postázható!
    },
    { 
      id: 3,
      name: 'Kézműves Sajt', 
      price: '3 200 Ft/kg', 
      seller: 'Bükki Sajtműhely', 
      location: 'Szilvásvárad', 
      distance: 35,
      img: 'https://images.unsplash.com/photo-1486297678604-d8655b495b87?q=80&w=800&auto=format&fit=crop',
      isShippable: true // Postázható (vákuumozva pl.)
    },
    { 
      id: 4,
      name: 'Friss Tojás', 
      price: '80 Ft/db', 
      seller: 'Szabó Tanya', 
      location: 'Gödöllő', 
      distance: 12, // Közel van
      img: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=800&auto=format&fit=crop',
      isShippable: false,
      isUrgent: true
    }
  ];

  // 1. Helyadatok betöltése induláskor
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

  // 2. "Helyzetem megosztása" gomb logikája (EZ HIÁNYZOTT!)
  const handleSetDefaultLocation = () => {
    const defaultLocation: UserLocation = {
      latitude: 47.4979,
      longitude: 19.0402,
      city: "Budapest (Teszt)",
      zipCode: "1000"
    };
    
    // Mentés és State frissítés
    localStorage.setItem('szomszedkosar_user_location', JSON.stringify(defaultLocation));
    setUserLocation(defaultLocation);
  };

  // 3. Szűrési logika: (Távolság < 15km) VAGY (Szállítható)
  const filteredProducts = products.filter(product => {
    if (!userLocation) return false;
    // Itt most egyszerűsítve a 'distance' mezőt használjuk a példában
    const isNearby = product.distance <= 15;
    const isShippable = product.isShippable;
    
    return isNearby || isShippable;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">
      
      {/* --- HEADER --- */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1B4332] rounded-xl flex items-center justify-center shadow-sm">
                <ShoppingBasket className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-[#1B4332] tracking-tight">SzomszédKosár</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/feed" className="text-[#1B4332] font-bold transition flex items-center gap-1">Hírfolyam</Link>
              <Link href="/termelok" className="text-gray-600 hover:text-[#1B4332] font-medium transition">Termelők</Link>
            </nav>

            <div className="flex items-center gap-4">
               {userLocation && (
                 <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
                   <MapPin size={14} className="text-[#1B4332]" />
                   {userLocation.city}
                 </div>
               )}
               <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                 {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
               </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Ha még nincs megadva a hely, mutassuk a Prompt-ot */}
        {!userLocation ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
              <div className="w-20 h-20 bg-[#F0F4F1] rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin size={40} className="text-[#1B4332]" />
              </div>
              <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Hol vagy most?</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Add meg a címedet vagy engedélyezd a helymeghatározást, hogy láthasd a környékbeli termelőket!
              </p>
              <button 
                onClick={handleSetDefaultLocation}
                className="w-full bg-[#1B4332] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2D6A4F] transition shadow-md"
              >
                Helyzetem megosztása
              </button>
            </div>
          </div>
        ) : (
          /* Ha van hely, mutassuk a Hírfolyamot */
          <>
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Friss Ajánlatok</h1>
                <p className="text-gray-600">
                  Termékek {userLocation.city} közelében és országos kiszállítással.
                </p>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                 <button className="px-5 py-2 bg-[#1B4332] text-white rounded-xl text-sm font-bold shadow-sm whitespace-nowrap">Összes</button>
                 <button className="px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:border-[#1B4332] whitespace-nowrap">Helyi (15km)</button>
                 <button className="px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:border-[#1B4332] whitespace-nowrap">Postázható</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <article key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  
                  {/* KÉP + BADGES */}
                  <div className="h-56 relative overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Ár Badge */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-[#1B4332] font-bold shadow-sm">
                      {product.price}
                    </div>
                    
                    {/* Címkék: Sürgős vagy Szállítható */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isUrgent && (
                            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1">
                                ⏰ SÜRGŐS
                            </span>
                        )}
                        {product.isShippable && (
                            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1">
                                <Package size={12} /> Országos
                            </span>
                        )}
                    </div>
                  </div>

                  {/* TARTALOM */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#1F2937] mb-1">{product.name}</h3>
                    <div className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                        {product.distance > 50 ? '📍 Távoli termelő' : `📍 ${product.distance} km távolságra`}
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <User size={16} className="text-[#1B4332]" />
                            {product.seller}
                        </div>
                        <button className="text-[#1B4332] font-bold text-sm hover:underline">
                            Részletek →
                        </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}