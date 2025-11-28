'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  MapPin,
  Star,
  Package,
  Calendar,
  MessageCircle,
  Phone,
  AlertTriangle,
  TrendingUp,
  Clock,
  Truck,
  Settings,
  Plus,
  ShoppingBasket,
  Leaf,
  ShieldCheck,
  Edit,
  Eye,
  Heart
} from 'lucide-react';

// Mock felhasználó adatok
const mockUser = {
  name: 'Kiss Margit',
  type: 'producer', // 'producer' | 'casual_seller' | 'buyer'
  location: 'Jaszberény',
  memberSince: '2023',
  verified: true,
  rating: 4.8,
  totalSales: 234,
  totalReviews: 89,
  phone: '+36 20 456 7890',
  email: 'kiss.margit@email.com',
  bio: 'Házi készítésű lekvárok, szörpök és házi sajt készítésével foglalkozom már 15 éve. Minden termékeket házi körülmények között, természetes alapanyagokból készítek.',

  // NAV szabályok és limitek
  limits: {
    monthlyAds: 2,
    maxMonthlyAds: 5,
    monthlyPushes: 1,
    maxMonthlyPushes: 3,
    activeAds: 1,
    maxActiveAds: 3
  },

  stats: {
    totalEarnings: 125000,
    avgResponseTime: '2 óra',
    deliveryRating: 4.9,
    qualityRating: 4.7
  }
};

// Mock termékek
const mockProducts = [
  {
    id: '1',
    name: 'Házi meggylekvár',
    price: 1200,
    unit: 'üveg',
    icon: ShoppingBasket,
    color: 'bg-purple-100 text-purple-600',
    status: 'active',
    views: 156,
    interested: 23,
    sold: 45,
    createdAt: '2024-06-15',
    urgent: false
  },
  {
    id: '2',
    name: 'Bio sajt',
    price: 2800,
    unit: 'kg',
    icon: ShieldCheck,
    color: 'bg-yellow-100 text-yellow-600',
    status: 'active',
    views: 89,
    interested: 12,
    sold: 8,
    createdAt: '2024-06-10',
    urgent: true
  },
  {
    id: '3',
    name: 'Málna szörp',
    price: 900,
    unit: 'üveg',
    icon: Leaf,
    color: 'bg-red-100 text-red-600',
    status: 'sold_out',
    views: 234,
    interested: 45,
    sold: 67,
    createdAt: '2024-06-01',
    urgent: false
  }
];

// Mock értékelések
const mockReviews = [
  {
    id: '1',
    reviewer: 'Nagy Péter',
    rating: 5,
    date: '2024-06-18',
    product: 'Házi meggylekvár',
    comment: 'Fantasztikus minőségű lekvár! Már többször rendeltem, mindig tökéletes.',
    verified: true
  },
  {
    id: '2',
    reviewer: 'Kovács Anna',
    rating: 5,
    date: '2024-06-15',
    product: 'Bio sajt',
    comment: 'Nagyon finom sajt, természetes ízekkel. Ajánlom mindenkinek!',
    verified: true
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'products' | 'reviews' | 'stats' | 'settings'>('products');
  const [productFilter, setProductFilter] = useState<'all' | 'active' | 'sold_out'>('all');

  const filteredProducts = mockProducts.filter(product => {
    if (productFilter === 'all') return true;
    return product.status === productFilter;
  });

  const canAddProduct = () => {
    if (mockUser.type === 'producer') return true;
    if (mockUser.type === 'casual_seller') {
      return mockUser.limits.monthlyAds < mockUser.limits.maxMonthlyAds &&
        mockUser.limits.activeAds < mockUser.limits.maxActiveAds;
    }
    return false;
  };

  const getRemainingLimits = () => {
    if (mockUser.type === 'producer') return null;
    return {
      monthlyAds: mockUser.limits.maxMonthlyAds - mockUser.limits.monthlyAds,
      monthlyPushes: mockUser.limits.maxMonthlyPushes - mockUser.limits.monthlyPushes,
      activeAds: mockUser.limits.maxActiveAds - mockUser.limits.activeAds
    };
  };

  const remainingLimits = getRemainingLimits();

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1F2937] flex items-center gap-2">
                Profilom
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Link href="/" className="text-[#1B4332] hover:underline">Főoldal</Link>
                <span>/</span>
                <span>Profil</span>
              </div>
            </div>

            {canAddProduct() && (
              <Link
                href="/add-product"
                className="bg-[#1B4332] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Új termék
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-[350px_1fr]">

          {/* LEFT COLUMN - PROFILE INFO */}
          <div className="space-y-6">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-24 h-24 bg-[#E8ECE9] rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                <User size={40} className="text-[#1B4332]" />
              </div>

              <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-[#1F2937]">{mockUser.name}</h2>
                {mockUser.verified && (
                  <span className="bg-[#1B4332] text-white text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1">
                    <ShieldCheck size={12} />
                    Ellenőrzött
                  </span>
                )}
              </div>

              <div className="text-gray-500 text-sm mb-6 flex items-center justify-center gap-1">
                <MapPin size={14} />
                {mockUser.location}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mb-6 border-y border-gray-100 py-4">
                <div>
                  <div className="text-lg font-bold text-[#1B4332]">{mockUser.rating}</div>
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Star size={10} /> Értékelés
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#1B4332]">{mockUser.totalSales}</div>
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Package size={10} /> Eladás
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#1B4332]">{mockUser.memberSince}</div>
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Calendar size={10} /> Tag óta
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {mockUser.bio}
              </p>

              <div className="flex flex-col gap-3">
                <button className="w-full bg-[#1B4332] text-white py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  Üzenet küldése
                </button>
                <button className="w-full bg-white border-2 border-[#1B4332] text-[#1B4332] py-2.5 rounded-xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <Phone size={18} />
                  {mockUser.phone}
                </button>
              </div>
            </div>

            {/* NAV Rules (Casual Seller) */}
            {mockUser.type === 'casual_seller' && remainingLimits && (
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                <h3 className="text-sm font-bold text-orange-900 mb-4 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  NAV szabályok
                </h3>

                <div className="space-y-3 text-xs text-orange-800">
                  <div className="flex justify-between">
                    <span>Havi hirdetések:</span>
                    <span className="font-bold">{mockUser.limits.monthlyAds}/{mockUser.limits.maxMonthlyAds}</span>
                  </div>
                  <div className="w-full bg-orange-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full" style={{ width: `${(mockUser.limits.monthlyAds / mockUser.limits.maxMonthlyAds) * 100}%` }}></div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <span>Aktív hirdetések:</span>
                    <span className="font-bold">{mockUser.limits.activeAds}/{mockUser.limits.maxActiveAds}</span>
                  </div>
                  <div className="w-full bg-orange-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full" style={{ width: `${(mockUser.limits.activeAds / mockUser.limits.maxActiveAds) * 100}%` }}></div>
                  </div>
                </div>

                {(remainingLimits.monthlyAds === 0 || remainingLimits.activeAds === 0) && (
                  <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100 text-xs text-red-600 leading-relaxed flex items-start gap-2">
                    <AlertTriangle size={16} className="flex-shrink-0" />
                    <span>Elérted a havi limitet. További hirdetésekhez regisztrálj őstermelőként.</span>
                  </div>
                )}
              </div>
            )}

            {/* Detailed Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-[#1B4332]" />
                Részletes statisztikák
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Összes bevétel:</span>
                  <span className="font-bold text-[#1B4332]">{mockUser.stats.totalEarnings.toLocaleString()} Ft</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-1"><Clock size={14} /> Átlag válaszidő:</span>
                  <span className="font-bold">{mockUser.stats.avgResponseTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-1"><Truck size={14} /> Szállítás:</span>
                  <span className="font-bold flex items-center gap-1">
                    {mockUser.stats.deliveryRating}
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-1"><Star size={14} /> Minőség:</span>
                  <span className="font-bold flex items-center gap-1">
                    {mockUser.stats.qualityRating}
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - CONTENT */}
          <div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl p-2 mb-6 shadow-sm border border-gray-100 flex overflow-x-auto">
              {[
                { key: 'products', label: 'Termékeim', icon: Package, count: mockProducts.length },
                { key: 'reviews', label: 'Értékelések', icon: MessageCircle, count: mockReviews.length },
                { key: 'stats', label: 'Statisztikák', icon: TrendingUp, count: null },
                { key: 'settings', label: 'Beállítások', icon: Settings, count: null }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === tab.key
                    ? 'bg-[#1B4332] text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-[#1B4332]'
                    }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                  {tab.count !== null && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-md ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { key: 'all', label: 'Összes' },
                    { key: 'active', label: 'Aktív' },
                    { key: 'sold_out', label: 'Elfogyott' }
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setProductFilter(filter.key as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${productFilter === filter.key
                        ? 'bg-[#E8ECE9] text-[#1B4332]'
                        : 'text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-100 rounded-xl hover:border-[#1B4332] transition-colors group">

                      {/* Icon */}
                      <div className={`w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 ${product.color}`}>
                        <product.icon size={32} />
                      </div>

                      {/* Info */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-[#1F2937] text-lg mb-1">{product.name}</h4>
                            <div className="text-[#1B4332] font-bold mb-2">
                              {product.price} Ft/{product.unit}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {product.urgent && (
                              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-md">
                                SÜRGŐS
                              </span>
                            )}
                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                              {product.status === 'active' ? 'AKTÍV' : 'ELFOGYOTT'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                          <span className="flex items-center gap-1"><Eye size={12} /> {product.views} megtekintés</span>
                          <span className="flex items-center gap-1"><Heart size={12} /> {product.interested} érdeklődő</span>
                          <span className="flex items-center gap-1"><Package size={12} /> {product.sold} eladva</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-4">
                        <button className="flex-1 md:flex-none px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2">
                          <Edit size={14} /> Szerkesztés
                        </button>
                        <button className="flex-1 md:flex-none px-4 py-2 bg-[#1B4332] text-white rounded-lg text-sm font-bold hover:bg-[#2D6A4F] transition flex items-center justify-center gap-2">
                          <Eye size={14} /> Megtekintés
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User size={20} className="text-gray-500" />
                          </div>
                          <div>
                            <div className="font-bold text-[#1F2937]">{review.reviewer}</div>
                            <div className="text-xs text-gray-500">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-yellow-700">{review.rating}</span>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-[#1B4332] mb-2">
                        Termék: {review.product}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}