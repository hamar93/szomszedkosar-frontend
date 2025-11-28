'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Header from '@/components/Header';
import {
  User,
  MapPin,
  Star,
  Package,
  Calendar,
  Settings,
  ShoppingBasket,
  ShieldCheck,
  Edit,
  CreditCard,
  Check,
  X as XIcon,
  Loader2,
  Trash2,
  Plus
} from 'lucide-react';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [activeTab, setActiveTab] = useState<'details' | 'products' | 'subscription'>('details');

  // Editing State
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  // Local user state
  const [displayUser, setDisplayUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    bio: ''
  });

  // Products State
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setDisplayUser(session.user);
      setFormData({
        name: session.user.name || '',
        city: (session.user as any).city || '',
        bio: (session.user as any).bio || ''
      });
    }
  }, [session]);

  // Fetch products when tab changes
  useEffect(() => {
    if (activeTab === 'products' && session?.user) {
      fetchUserProducts();
    }
  }, [activeTab, session]);

  const fetchUserProducts = async () => {
    setProductsLoading(true);
    try {
      // Assuming backend supports filtering by user or we filter here
      // Ideally: GET /api/products?user=me
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      // Filter for current user's products (if backend returns all)
      const myProducts = res.data.filter((p: any) => p.sellerEmail === session?.user?.email);
      setProducts(myProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, formData);
      setDisplayUser({ ...displayUser, ...formData });
      await update({
        ...session,
        user: { ...session?.user, ...formData }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Hiba történt a mentés során.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscription = async () => {
    setSubLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-subscription-checkout`);
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Hiba történt a fizetés indításakor.');
    } finally {
      setSubLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Kérjük jelentkezz be a profilod megtekintéséhez!</h2>
            <Link href="/login" className="bg-[#1B4332] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md">
              Bejelentkezés
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const user = displayUser || session.user as any;

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-[300px_1fr]">

          {/* LEFT COLUMN - SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-24 h-24 bg-[#E8ECE9] rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                <User size={40} className="text-[#1B4332]" />
              </div>
              <h2 className="text-xl font-bold text-[#1F2937]">{user.name || 'Felhasználó'}</h2>
              <span className="text-sm text-gray-500">{user.email}</span>
              <div className="mt-4 flex justify-center">
                <span className="bg-[#1B4332] text-white text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1">
                  <ShieldCheck size={12} />
                  {user.role === 'producer' ? 'Termelő' : 'Vásárló'}
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setActiveTab('details')}
                className={`w-full text-left px-6 py-4 font-bold flex items-center gap-3 transition ${activeTab === 'details' ? 'bg-[#E8ECE9] text-[#1B4332] border-l-4 border-[#1B4332]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <User size={18} /> Adataim
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full text-left px-6 py-4 font-bold flex items-center gap-3 transition ${activeTab === 'products' ? 'bg-[#E8ECE9] text-[#1B4332] border-l-4 border-[#1B4332]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Package size={18} /> Termékeim
              </button>
              {user.role === 'producer' && (
                <button
                  onClick={() => setActiveTab('subscription')}
                  className={`w-full text-left px-6 py-4 font-bold flex items-center gap-3 transition ${activeTab === 'subscription' ? 'bg-[#E8ECE9] text-[#1B4332] border-l-4 border-[#1B4332]' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <CreditCard size={18} /> Előfizetés
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN - CONTENT */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[500px]">

            {/* TAB 1: ADATAIM */}
            {activeTab === 'details' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#1F2937]">Adataim</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-[#1B4332] font-bold hover:underline flex items-center gap-1"
                    >
                      <Edit size={16} /> Szerkesztés
                    </button>
                  )}
                </div>

                <div className="space-y-6 max-w-lg">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Név</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none"
                      />
                    ) : (
                      <div className="text-gray-900 font-medium">{user.name}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Város</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none"
                      />
                    ) : (
                      <div className="text-gray-900 font-medium flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        {user.city || 'Nincs megadva'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Bemutatkozás</label>
                    {isEditing ? (
                      <textarea
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none resize-none"
                      />
                    ) : (
                      <div className="text-gray-600 leading-relaxed">
                        {user.bio || 'Nincs még bemutatkozás.'}
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-[#1B4332] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#2D6A4F] transition flex items-center gap-2"
                      >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                        Mentés
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2"
                      >
                        <XIcon size={18} /> Mégse
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: TERMÉKEIM */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#1F2937]">Termékeim</h2>
                  <Link href="/add-product" className="bg-[#1B4332] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#2D6A4F] transition flex items-center gap-2">
                    <Plus size={16} /> Új termék
                  </Link>
                </div>

                {productsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 size={32} className="animate-spin text-[#1B4332]" />
                  </div>
                ) : products.length > 0 ? (
                  <div className="grid gap-4">
                    {products.map((product) => (
                      <div key={product._id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-[#1B4332] transition group">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <ShoppingBasket className="text-gray-400" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-[#1F2937]">{product.name}</h3>
                          <p className="text-[#1B4332] font-bold text-sm">{product.price} Ft / {product.unit}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                          <button className="p-2 text-gray-400 hover:text-[#1B4332] hover:bg-gray-50 rounded-lg">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <ShoppingBasket size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Még nem töltöttél fel terméket.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ELŐFIZETÉS */}
            {activeTab === 'subscription' && (
              <div>
                <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Előfizetés</h2>

                <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-2xl p-8 text-white relative overflow-hidden max-w-xl">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Star size={120} />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <Star className="text-yellow-400 fill-yellow-400" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Prémium Tagság</h3>
                        <p className="text-green-100 text-sm">Helypénz befizetése</p>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8 text-green-50">
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-green-300" /> Korlátlan termékfeltöltés
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-green-300" /> Kiemelt megjelenés a főoldalon
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-green-300" /> Részletes statisztikák
                      </li>
                    </ul>

                    <button
                      onClick={handleSubscription}
                      disabled={subLoading}
                      className="w-full bg-white text-[#1B4332] py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2"
                    >
                      {subLoading ? <Loader2 size={20} className="animate-spin" /> : <CreditCard size={20} />}
                      Előfizetés indítása
                    </button>
                    <p className="text-center text-xs text-green-200 mt-4">
                      Biztonságos fizetés Stripe-on keresztül
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}