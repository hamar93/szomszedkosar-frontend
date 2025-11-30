'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import {
  MapPin,
  Search,
  Filter,
  Leaf,
  User,
  Package,
  Loader2
} from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

interface UserLocation {
  latitude: number;
  longitude: number;
  city: string;
  zipCode: string;
}

const CATEGORIES = [
  "Összes",
  "Zöldség",
  "Gyümölcs",
  "Tojás & Tej",
  "Hús & Húskészítmények",
  "Pékáru",
  "Édesség & Méz",
  "Italok",
  "Kamra",
  "Házi kozmetikum",
  "Kézműves & Otthon",
  "Kert és növények",
  "Állati termékek",
  "Szezonális"
];

const MOCK_IMAGES: Record<string, string> = {
  "Gyümölcs": "https://images.unsplash.com/photo-1528821128474-27f963b062bf?q=80&w=800&auto=format&fit=crop", // Cseresznye
  "Tojás & Tej": "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=800&auto=format&fit=crop", // Tej
  "Zöldség": "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop", // Zöldség
  "Hús & Húskészítmények": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=800&auto=format&fit=crop", // Hús (Generic)
  "Pékáru": "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop", // Kenyér (Generic)
  "default": "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" // Fallback (Zöldség)
};

const getMockImage = (category: string) => {
  return MOCK_IMAGES[category] || MOCK_IMAGES["default"];
};

export default function FeedPage() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Összes");
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedLocation = localStorage.getItem('szomszedkosar_user_location');
        const params: any = {};
        if (storedLocation) {
          try {
            const loc = JSON.parse(storedLocation);
            setUserLocation(loc);
            params.city = loc.city;
          } catch (e) { }
        }

        const res = await api.get('/api/products', { params });
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('A böngésződ nem támogatja a helymeghatározást.');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        let city = "Saját pozíció";
        let zipCode = "";

        // Reverse Geocoding (Nominatim)
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          if (data && data.address) {
            city = data.address.city || data.address.town || data.address.village || data.address.district || "Ismeretlen hely";
            zipCode = data.address.postcode || "";
          }
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
        }

        const newLocation: UserLocation = {
          latitude,
          longitude,
          city,
          zipCode
        };

        localStorage.setItem('szomszedkosar_user_location', JSON.stringify(newLocation));
        setUserLocation(newLocation);
        setLocating(false);

        // Refresh products with new location
        setLoading(true);
        try {
          const res = await api.get('/api/products', { params: { city: newLocation.city } });
          setProducts(res.data);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert('Nem sikerült lekérni a pozíciódat. Kérlek engedélyezd a helymeghatározást.');
        setLocating(false);
      }
    );
  };

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
          onClick={handleGeolocation}
          disabled={locating}
          className="w-full bg-[#1B4332] text-white py-4 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md flex items-center justify-center gap-2"
        >
          {locating ? <Loader2 className="animate-spin" /> : <MapPin size={20} />}
          {locating ? 'Helymeghatározás...' : 'Helyzetem megosztása'}
        </button>
      </div>
    </div>
  );

  // --- FILTERING LOGIC ---
  const filteredProducts = products.filter(product => {
    // 1. Category Filter
    if (selectedCategory !== "Összes" && product.category !== selectedCategory) {
      return false;
    }
    return true;
  });

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
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
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

        {/* CATEGORY TABS */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                ? 'bg-[#1B4332] text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FEED GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`} className="group">
                <article className="bg-white rounded-2xl p-0 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                  <div className="h-48 bg-[#F0F4F1] flex items-center justify-center relative overflow-hidden shrink-0">
                    {/* IMAGE OR FALLBACK */}
                    <img
                      src={product.imageUrl || getMockImage(product.category)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* BADGES */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                      {product.isShippable && (
                        <div className="bg-blue-100 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-blue-700 shadow-sm flex items-center gap-1">
                          <Package size={12} />
                          Országos szállítás
                        </div>
                      )}

                      {product.isWholesaleAvailable && (
                        <div className="bg-green-100 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-green-800 shadow-sm flex items-center gap-1">
                          <Package size={12} />
                          Nagyker ár
                        </div>
                      )}

                      {/* Discount Badge */}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </div>
                      )}

                      <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-[#1B4332] shadow-sm">
                        {product.category}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-[#1F2937] group-hover:text-[#1B4332] transition line-clamp-1">{product.name}</h3>
                      <span className="text-lg font-bold text-[#1B4332] whitespace-nowrap ml-2">{product.price} Ft/{product.unit}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <User size={14} className="text-gray-600" />
                        </div>
                        <div className="text-xs">
                          <p className="font-bold text-gray-900 line-clamp-1">{product.sellerName || product.user?.name || 'Termelő'}</p>
                          <p className="text-gray-500">
                            {product.user?.city || 'Helyszín'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[#1B4332] font-bold text-sm hover:underline">
                        Részletek
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="text-gray-400 w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Nincs találat</h3>
              <p className="text-gray-500">
                Ebben a kategóriában jelenleg nincsenek termékek.
              </p>
              <button
                onClick={() => setSelectedCategory("Összes")}
                className="mt-4 text-[#1B4332] font-bold hover:underline"
              >
                Szűrők törlése
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}