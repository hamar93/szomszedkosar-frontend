'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import {
  User,
  MapPin,
  Star,
  Package,
  ShieldCheck,
  Edit,
  CreditCard,
  Check,
  X as XIcon,
  Loader2,
  Trash2,
  Plus,
  Phone,
  Truck,
  ShoppingBasket
} from 'lucide-react';
import api from '@/lib/api';

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
    bio: '',
    phone: '',
    deliveryOptions: [] as string[]
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
        bio: (session.user as any).bio || '',
        phone: (session.user as any).phone || '',
        deliveryOptions: (session.user as any).deliveryOptions || []
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
      // Fix Privacy Leak: Pass sellerEmail to filter on backend
      const res = await api.get('/api/products', {
        params: { sellerEmail: session?.user?.email }
      });
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Include email so backend knows who to update
      const payload = {
        ...formData,
        email: session?.user?.email
      };

      await api.put('/api/users/profile', payload);

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
      const response = await api.post('/api/payments/create-subscription-checkout', {
        priceId: 'price_HelypenzBasic', // Fixed price ID
        userId: (session?.user as any).id || session?.user?.email,
        successUrl: window.location.origin + '/profile?status=success',
        cancelUrl: window.location.origin + '/profile?status=cancel'
      });
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

  const handleBuyCredits = async (quantity: number, amount: number) => {
    try {
      const response = await api.post('/api/payments/create-credits-checkout', {
        quantity,
        userId: (session?.user as any).id || session?.user?.email,
        successUrl: window.location.origin + '/profile?status=success',
        cancelUrl: window.location.origin + '/profile?status=cancel'
      });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Credits purchase error:', error);
      alert('Hiba történt a vásárlás indításakor.');
    }
  };

  const toggleDeliveryOption = (option: string) => {
    setFormData(prev => {
      const options = prev.deliveryOptions.includes(option)
        ? prev.deliveryOptions.filter(o => o !== option)
        : [...prev.deliveryOptions, option];
      return { ...prev, deliveryOptions: options };
    });
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
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User size={40} className="text-[#1B4332]" />
                )}
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
                  {/* Name */}
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

                  {/* City */}
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

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Telefonszám</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none"
                        placeholder="+36 30 123 4567"
                      />
                    ) : (
                      <div className="text-gray-900 font-medium flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        {user.phone || 'Nincs megadva'}
                      </div>
                    )}
                  </div>

                  {/* Bio */}
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

                  {/* Delivery Options */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Szállítási lehetőségek</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        {['Házhozszállítás', 'Személyes átvétel', 'Posta / Futár'].map(option => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.deliveryOptions.includes(option)}
                              onChange={() => toggleDeliveryOption(option)}
                              className="w-4 h-4 text-[#1B4332] rounded focus:ring-[#1B4332]"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {user.deliveryOptions && user.deliveryOptions.length > 0 ? (
                          user.deliveryOptions.map((opt: string) => (
                            <span key={opt} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <Truck size={12} /> {opt}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">Nincs megadva</span>
                        )}
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
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <ShoppingBasket className="text-gray-400" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-[#1F2937]">{product.name}</h3>
                          <p className="text-[#1B4332] font-bold text-sm">
                            {product.price} Ft / {product.unit}
                            {product.originalPrice && (
                              <span className="text-gray-400 text-xs line-through ml-2">{product.originalPrice} Ft</span>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                          <button
                            onClick={() => {
                              const salePrice = prompt('Add meg az akciós árat (Ft):', product.price);
                              if (salePrice && !isNaN(Number(salePrice)) && Number(salePrice) < product.price) {
                                api.put(`/api/products/${product._id}/sale`, { salePrice: Number(salePrice) })
                                  .then(() => {
                                    alert('Sikeres leértékelés!');
                                    fetchUserProducts();
                                  })
                                  .catch(err => console.error(err));
                              } else if (salePrice) {
                                alert('Az akciós árnak kisebbnek kell lennie az eredetinél!');
                              }
                            }}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                            title="Leértékelés"
                          >
                            <Star size={18} />
                          </button>
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

                {/* Push Notification Credits */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-[#1F2937] mb-4">Push Értesítés Kredit Vásárlás</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleBuyCredits(5, 1500)}
                      className="bg-white border-2 border-[#1B4332] text-[#1B4332] p-6 rounded-2xl hover:bg-[#1B4332] hover:text-white transition group text-left"
                    >
                      <div className="font-bold text-lg mb-1">5 db Kredit</div>
                      <div className="text-2xl font-bold mb-2">1 500 Ft</div>
                      <p className="text-sm opacity-80 group-hover:text-green-100">Ideális kipróbáláshoz</p>
                    </button>

                    <button
                      onClick={() => handleBuyCredits(10, 2500)}
                      className="bg-[#1B4332] text-white p-6 rounded-2xl hover:bg-[#2D6A4F] transition text-left shadow-md"
                    >
                      <div className="font-bold text-lg mb-1">10 db Kredit</div>
                      <div className="text-2xl font-bold mb-2">2 500 Ft</div>
                      <p className="text-sm text-green-100">Legnépszerűbb választás</p>
                    </button>
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