'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBasket,
  Search,
  Filter,
  MapPin,
  Leaf,
  ShieldCheck,
  Users,
  ArrowRight,
  ChevronDown,
  X,
  Check,
  Clock,
  Tag
} from 'lucide-react';

// Termék kategóriák és típusok
const categories = [
  {
    id: 'perishable',
    name: 'Romlandó termékek',
    icon: Leaf,
    subcategories: ['Gyümölcs', 'Zöldség', 'Tojás', 'Hús', 'Tejtermék']
  },
  {
    id: 'preserved',
    name: 'Tartós termékek',
    icon: ShoppingBasket,
    subcategories: ['Lekvár', 'Szörp', 'Füstöltáru', 'Méz', 'Tea', 'Gyógynövény']
  },
  {
    id: 'cosmetics',
    name: 'Házi kozmetikum',
    icon: ShieldCheck,
    subcategories: ['Szappan', 'Krém', 'Balzsam', 'Olaj']
  },
  {
    id: 'rural_marketplace',
    name: 'Falusi marketplace',
    icon: Users,
    subcategories: ['Élő állat', 'Gabona', 'Eszközök', 'Takarmány']
  }
];

// Mock termékek
const mockProducts = [
  {
    id: '1',
    name: 'Friss meggy',
    category: 'perishable',
    subcategory: 'Gyümölcs',
    price: 800,
    unit: 'kg',
    seller: 'Marika Néni',
    location: 'Balatonfüred',
    distance: '2 km',
    rating: 4.9,
    reviews: 23,
    description: 'Frissen szedett házi meggy, vegyszermentes.',
    quantity: '15 kg elérhető',
    delivery: ['pickup', 'local_delivery'],
    urgent: true,
    organic: true,
    icon: Leaf,
    color: 'bg-red-100 text-red-600'
  },
  {
    id: '2',
    name: 'Bio tojás',
    category: 'perishable',
    subcategory: 'Tojás',
    price: 60,
    unit: 'db',
    seller: 'Kovács Gazda',
    location: 'Veszprém',
    distance: '5 km',
    rating: 4.8,
    reviews: 45,
    description: 'Szabadtartású tyúkok tojásai.',
    quantity: '50 db készleten',
    delivery: ['pickup'],
    organic: true,
    icon: Users,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: '4',
    name: 'Házi meggylekvár',
    category: 'preserved',
    subcategory: 'Lekvár',
    price: 1200,
    unit: 'üveg',
    seller: 'Kiss Margit',
    location: 'Jaszberény',
    distance: '12 km',
    rating: 4.7,
    reviews: 34,
    description: 'Cukor nélkül főzött, steviával édesített.',
    quantity: '20 üveg készleten',
    delivery: ['pickup', 'local_delivery', 'shipping'],
    organic: true,
    icon: ShoppingBasket,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: '6',
    name: 'Túlérett almák - AKCIÓ!',
    category: 'perishable',
    subcategory: 'Gyümölcs',
    price: 250,
    originalPrice: 400,
    unit: 'kg',
    seller: 'Szabó Kert',
    location: 'Esztergom',
    distance: '7 km',
    rating: 4.5,
    reviews: 12,
    description: 'Túlérett, de még kiváló befőzéshez!',
    quantity: '30 kg - gyorsan elkel',
    delivery: ['pickup'],
    discount: true,
    discountPercent: 37,
    urgent: true,
    icon: Leaf,
    color: 'bg-green-100 text-green-600'
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    maxDistance: 30,
    priceRange: [0, 10000],
    organic: false,
    delivery: 'all',
    urgent: false,
    discount: false
  });

  // Szűrés és rendezés logika (megtartva az eredetit, csak tisztítva)
  const filteredProducts = mockProducts
    .filter(product => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) return false;

      const distance = parseInt(product.distance.replace(' km', ''));
      if (distance > filters.maxDistance) return false;
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      if (filters.organic && !product.organic) return false;
      if (filters.urgent && !product.urgent) return false;
      if (filters.discount && !product.discount) return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance': return parseInt(a.distance) - parseInt(b.distance);
        case 'price_low': return a.price - b.price;
        case 'price_high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">

            <div>
              <h1 className="text-2xl font-bold text-[#1F2937] flex items-center gap-2">
                Termékek böngészése
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Link href="/" className="text-[#1B4332] hover:underline">Főoldal</Link>
                <span>/</span>
                <span>Böngészés</span>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Keresés..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-xl font-bold border transition-all flex items-center gap-2 ${showFilters
                    ? 'bg-[#1B4332] text-white border-[#1B4332]'
                    : 'bg-white text-[#1B4332] border-gray-200 hover:border-[#1B4332]'
                  }`}
              >
                <Filter size={20} />
                <span className="hidden sm:inline">Szűrők</span>
              </button>
            </div>

          </div>

          {/* CATEGORIES SCROLL */}
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('all'); }}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${selectedCategory === 'all'
                  ? 'bg-[#1B4332] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1B4332]'
                }`}
            >
              Összes
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setSelectedSubcategory('all'); }}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === cat.id
                    ? 'bg-[#1B4332] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1B4332]'
                  }`}
              >
                <cat.icon size={18} />
                {cat.name}
              </button>
            ))}
          </div>

          {/* SUBCATEGORIES */}
          {selectedCategoryData && (
            <div className="flex gap-2 overflow-x-auto pb-4 pt-2 border-t border-gray-100">
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedSubcategory === 'all'
                    ? 'bg-[#E8ECE9] text-[#1B4332]'
                    : 'text-gray-500 hover:bg-gray-50'
                  }`}
              >
                Összes
              </button>
              {selectedCategoryData.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedSubcategory === sub
                      ? 'bg-[#E8ECE9] text-[#1B4332]'
                      : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* FILTERS PANEL */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 py-6 px-4 animate-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Maximum távolság: {filters.maxDistance} km
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={filters.maxDistance}
                onChange={(e) => setFilters({ ...filters, maxDistance: parseInt(e.target.value) })}
                className="w-full accent-[#1B4332]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Rendezés</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1B4332]"
              >
                <option value="distance">Távolság szerint</option>
                <option value="price_low">Ár: Alacsony → Magas</option>
                <option value="price_high">Ár: Magas → Alacsony</option>
                <option value="rating">Értékelés szerint</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Szűrők</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters({ ...filters, organic: !filters.organic })}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all ${filters.organic ? 'bg-green-100 text-green-800 border-green-200' : 'bg-white border-gray-200 text-gray-600'
                    }`}
                >
                  🌱 Bio
                </button>
                <button
                  onClick={() => setFilters({ ...filters, urgent: !filters.urgent })}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all ${filters.urgent ? 'bg-orange-100 text-orange-800 border-orange-200' : 'bg-white border-gray-200 text-gray-600'
                    }`}
                >
                  🔥 Sürgős
                </button>
                <button
                  onClick={() => setFilters({ ...filters, discount: !filters.discount })}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all ${filters.discount ? 'bg-red-100 text-red-800 border-red-200' : 'bg-white border-gray-200 text-gray-600'
                    }`}
                >
                  💰 Akció
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* RESULTS */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 font-medium">
            <span className="text-[#1B4332] font-bold">{filteredProducts.length}</span> találat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">

              {/* Card Image Area */}
              <div className={`h-48 ${product.color.split(' ')[0]} flex items-center justify-center relative`}>
                <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  <product.icon size={40} className={product.color.split(' ')[1]} />
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.urgent && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                      SÜRGŐS
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                      -{product.discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-[#1F2937] group-hover:text-[#1B4332] transition line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="text-right">
                    {product.discount && (
                      <span className="block text-xs text-gray-400 line-through">
                        {product.originalPrice} Ft
                      </span>
                    )}
                    <span className="text-[#1B4332] font-bold">
                      {product.price} Ft
                      <span className="text-xs font-normal text-gray-500">/{product.unit}</span>
                    </span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg">
                  <Users size={14} />
                  <span className="font-medium truncate">{product.seller}</span>
                  <span className="mx-1">•</span>
                  <MapPin size={14} />
                  <span className="truncate">{product.distance}</span>
                </div>

                <button className="w-full bg-white border-2 border-[#1B4332] text-[#1B4332] py-2.5 rounded-xl font-bold hover:bg-[#1B4332] hover:text-white transition flex items-center justify-center gap-2 group-hover:shadow-md">
                  Részletek
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}