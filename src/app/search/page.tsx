'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
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
  Tag,
  Flame,
  Loader2
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

export default function SearchPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Szűrés és rendezés logika
  const filteredProducts = products
    .filter(product => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      // Category mapping logic (simplified for now as backend categories might differ from frontend UI categories)
      // In a real app, we would map backend categories to these UI categories
      if (selectedCategory !== 'all') {
        // This is a simplification. Ideally backend returns 'type' or we map 'category' to these groups.
        // For now, we skip strict category checking or implement a basic mapping if needed.
        // Let's assume 'category' in product matches one of the subcategories for simplicity or we just filter by text if no direct match.
      }

      if (selectedSubcategory !== 'all' && product.category !== selectedSubcategory) return false;

      // Distance logic would require user location, skipping for now or using mock distance
      // const distance = parseInt(product.distance.replace(' km', ''));
      // if (distance > filters.maxDistance) return false;

      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      // if (filters.organic && !product.organic) return false;
      // if (filters.urgent && !product.urgent) return false;
      // if (filters.discount && !product.discount) return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        // case 'distance': return parseInt(a.distance) - parseInt(b.distance);
        case 'price_low': return a.price - b.price;
        case 'price_high': return b.price - a.price;
        // case 'rating': return b.rating - a.rating;
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
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all flex items-center gap-1 ${filters.organic ? 'bg-green-100 text-green-800 border-green-200' : 'bg-white border-gray-200 text-gray-600'
                    }`}
                >
                  <Leaf size={14} /> Bio
                </button>
                <button
                  onClick={() => setFilters({ ...filters, urgent: !filters.urgent })}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all flex items-center gap-1 ${filters.urgent ? 'bg-orange-100 text-orange-800 border-orange-200' : 'bg-white border-gray-200 text-gray-600'
                    }`}
                >
                  <Flame size={14} /> Sürgős
                </button>
                <button
                  onClick={() => setFilters({ ...filters, discount: !filters.discount })}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all flex items-center gap-1 ${filters.discount ? 'bg-red-100 text-red-800 border-red-200' : 'bg-white border-gray-200 text-gray-600'
                    }`}
                >
                  <Tag size={14} /> Akció
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

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#1B4332] w-10 h-10" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full flex flex-col">

                  {/* Card Image Area */}
                  <div className="h-48 bg-[#F0F4F1] flex items-center justify-center relative overflow-hidden shrink-0">
                    <img
                      src={product.imageUrl || getMockImage(product.category)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isShippable && (
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                          Szállítás
                        </span>
                      )}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-[#1F2937] group-hover:text-[#1B4332] transition line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="text-right shrink-0 ml-2">
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="block text-xs text-gray-400 line-through">
                            {product.originalPrice} Ft
                          </span>
                        )}
                        <span className="text-[#1B4332] font-bold whitespace-nowrap">
                          {product.price} Ft
                          <span className="text-xs font-normal text-gray-500">/{product.unit}</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg mt-auto">
                      <Users size={14} />
                      <span className="font-medium truncate">{product.sellerName || 'Termelő'}</span>
                      <span className="mx-1">•</span>
                      <MapPin size={14} />
                      <span className="truncate">{product.user?.city || 'Helyszín'}</span>
                    </div>

                    <button className="w-full bg-white border-2 border-[#1B4332] text-[#1B4332] py-2.5 rounded-xl font-bold hover:bg-[#1B4332] hover:text-white transition flex items-center justify-center gap-2 group-hover:shadow-md">
                      Részletek
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}