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
  X,
  Loader2,
  Trash2,
  Plus,
  Phone,
  Truck,
  ShoppingBasket,
  Bell,
  FileText,
  Download
} from 'lucide-react';
import api from '@/lib/api';

// Mock Invoices Data
const MOCK_INVOICES = [
  { id: 'INV-001', date: '2023. 11. 28.', item: '5 db Kredit', amount: '1 500 Ft', status: 'Fizetve' },
  { id: 'INV-002', date: '2023. 11. 15.', item: 'Prémium Előfizetés', amount: '2 000 Ft', status: 'Fizetve' },
  { id: 'INV-003', date: '2023. 10. 15.', item: 'Prémium Előfizetés', amount: '2 000 Ft', status: 'Fizetve' },
];

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [activeTab, setActiveTab] = useState<'details' | 'products' | 'finance' | 'logistics'>('details');

  // Editing State
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [creditLoading, setCreditLoading] = useState<number | null>(null); // Store quantity being purchased
  const [pushLoading, setPushLoading] = useState(false);
  const [pushMessage, setPushMessage] = useState('');

  // Chef Upgrade State
  const [showChefModal, setShowChefModal] = useState(false);
  const [chefData, setChefData] = useState({ companyName: '', taxNumber: '' });

  // Local user state
  const [displayUser, setDisplayUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    bio: '',
    phone: '',
    deliveryOptions: [] as string[],
    logistics: {
      hasLocalPickup: true,
      pickupAddress: '',
      hasHomeDelivery: false,
      deliveryRadius: 0,
      deliveryCost: 0,
      hasShipping: false
    }
  });

  // Products State
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // --- EFFECTS (Must be unconditional) ---

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setDisplayUser(session.user);
      setFormData({
        name: session.user.name || '',
        city: (session.user as any).city || '',
        bio: (session.user as any).bio || '',
        phone: (session.user as any).phone || '',
        deliveryOptions: (session.user as any).deliveryOptions || [],
        logistics: (session.user as any).logistics || {
          hasLocalPickup: true,
          pickupAddress: '',
          hasHomeDelivery: false,
          deliveryRadius: 0,
          deliveryCost: 0,
          hasShipping: false
        }
      });
    }
  }, [session, status]);

  // Fetch products when tab changes
  useEffect(() => {
    if (activeTab === 'products' && status === 'authenticated' && session?.user?.email) {
      fetchUserProducts();
    }
  }, [activeTab, session, status]);

  const fetchUserProducts = async () => {
    setProductsLoading(true);
    try {
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

  const handleChefUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        role: 'chef',
        companyName: chefData.companyName,
        taxNumber: chefData.taxNumber,
        email: session?.user?.email
      };

      await api.put('/api/users/profile', payload);

      // Update session and local state
      const updatedUser = { ...session?.user, ...payload, role: 'chef' };
      setDisplayUser(updatedUser);
      await update({
        ...session,
        user: updatedUser
      });

      setShowChefModal(false);
      alert('Sikeres regisztráció! Mostantól Séf fiókkal rendelkezel.');
    } catch (error: any) {
      console.error('Failed to upgrade to chef:', error);
      alert(error.response?.data?.message || 'Hiba történt a frissítés során.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscription = async () => {
    setSubLoading(true);
    try {
      const response = await api.post('/api/payments/create-subscription-checkout', {
        priceId: 'price_HelypenzBasic',
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

  const handleBuyCredits = async (quantity: number) => {
    setCreditLoading(quantity);
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
    } finally {
      setCreditLoading(null);
    }
  };

  const handleSendPush = async () => {
    if (!pushMessage.trim()) return;
    setPushLoading(true);
    try {
      const userId = (session?.user as any).id || session?.user?.email;
      await api.post('/api/notifications/send', {
        userId,
        message: pushMessage,
        radius: 15
      });

      alert('Sikeres küldés! A környékbeli vásárlók értesítést kaptak.');
      setPushMessage('');
      window.location.reload();
    } catch (error: any) {
      console.error('Push send error:', error);
      alert(error.response?.data?.message || 'Hiba történt a küldéskor.');
    } finally {
      setPushLoading(false);
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

  // --- CONDITIONAL RENDERS (Must be after hooks) ---

  // Loading State for Session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
        <div className="text-center">
          <Loader2 className="animate-spin text-[#1B4332] mx-auto mb-4" size={48} />
          <p className="text-gray-600 font-medium">Profil betöltése...</p>
        </div>
      </div>
    );
  }

  // Unauthenticated State
  if (status === 'unauthenticated' || !session?.user) {
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
  const isProducer = user.role === 'producer';
  const isChef = user.role === 'chef';

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
                <span className={`text-white text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1 ${isChef ? 'bg-blue-600' : 'bg-[#1B4332]'}`}>
                  {isChef ? '👨‍🍳 Séf (B2B)' : <ShieldCheck size={12} />}
                  {!isChef && (isProducer ? 'Termelő' : 'Vásárló')}
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
              {(isProducer || isChef) && (
                <>
                  <button
                    onClick={() => setActiveTab('finance')}
                    className={`w-full text-left px-6 py-4 font-bold flex items-center gap-3 transition ${activeTab === 'finance' ? 'bg-[#E8ECE9] text-[#1B4332] border-l-4 border-[#1B4332]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <CreditCard size={18} /> Pénzügy
                  </button>
                  <button
                    onClick={() => setActiveTab('logistics')}
                    className={`w-full text-left px-6 py-4 font-bold flex items-center gap-3 transition ${activeTab === 'logistics' ? 'bg-[#E8ECE9] text-[#1B4332] border-l-4 border-[#1B4332]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Truck size={18} /> Szállítási Beállítások
                  </button>
                </>
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

                  {/* Account Type Section */}
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-[#1F2937] mb-4">Fiók Típusa</h3>
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                      <div>
                        <p className="font-bold text-gray-900">
                          {isChef ? '👨‍🍳 Séf / Étterem (B2B)' : isProducer ? 'Termelő' : 'Vásárló'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {isChef ? 'Kiemelt B2B funkciók elérhetőek.' : 'Alapvető vásárlói funkciók.'}
                        </p>
                      </div>
                      {!isChef && !isProducer && (
                        <button
                          onClick={() => setShowChefModal(true)}
                          className="bg-[#1B4332] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#2D6A4F] transition"
                        >
                          Regisztráció Étteremként / Séfként
                        </button>
                      )}
                    </div>
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
                        <X size={18} /> Mégse
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
                      <div key={product._id} className={`flex items-center gap-4 p-4 border rounded-xl transition group relative ${product.stock === 0 ? 'border-red-200 bg-red-50' : 'border-gray-100 hover:border-[#1B4332]'}`}>

                        {/* Sold Out Overlay/Badge */}
                        {product.stock === 0 && (
                          <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            🔴 ELFOGYOTT (Inaktív)
                          </div>
                        )}

                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className={`w-full h-full object-cover ${product.stock === 0 ? 'grayscale' : ''}`} />
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
                          <p className="text-xs text-gray-500 mt-1">
                            Készlet: <span className={`font-bold ${product.stock === 0 ? 'text-red-600' : 'text-gray-700'}`}>{product.stock || 0} {product.unit}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">

                          {/* Restock Button */}
                          <button
                            onClick={() => {
                              const newStock = prompt(`Készlet feltöltése (${product.unit}):`, '10');
                              if (newStock && !isNaN(Number(newStock)) && Number(newStock) > 0) {
                                api.put(`/api/products/${product._id}`, { stock: Number(newStock) })
                                  .then(() => {
                                    alert('Sikeres készletfeltöltés!');
                                    fetchUserProducts();
                                  })
                                  .catch(err => {
                                    console.error(err);
                                    alert('Hiba történt a feltöltés során.');
                                  });
                              }
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Készlet feltöltése"
                          >
                            <Plus size={18} />
                          </button>

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
                          <button
                            onClick={async () => {
                              if (confirm('Biztosan törölni szeretnéd ezt a terméket?')) {
                                try {
                                  await api.delete(`/api/products/${product._id}`);
                                  fetchUserProducts(); // Refresh list
                                } catch (err) {
                                  console.error('Failed to delete product:', err);
                                  alert('Hiba történt a törlés során.');
                                }
                              }
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Törlés"
                          >
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

            {/* TAB 3: PÉNZÜGY */}
            {activeTab === 'finance' && (
              <div>
                <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Pénzügyek</h2>

                {/* A) Subscription Section */}
                <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-2xl p-8 text-white relative overflow-hidden max-w-xl mb-12">
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
                      Előfizetés indítása (2000 Ft/hó)
                    </button>
                    <p className="text-center text-xs text-green-200 mt-4">
                      Biztonságos fizetés Stripe-on keresztül
                    </p>
                  </div>
                </div>

                {/* B) Push Credits Section */}
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-[#1F2937] mb-4">Hirdetés Kiemelés (Push Kredit)</h3>
                  <p className="text-gray-500 mb-6">Jelenlegi egyenleg: <span className="font-bold text-[#1B4332]">{(user as any).pushCredits || 0} db</span></p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleBuyCredits(5)}
                      disabled={creditLoading !== null}
                      className="bg-white border-2 border-[#1B4332] text-[#1B4332] p-6 rounded-2xl hover:bg-[#1B4332] hover:text-white transition group text-left relative"
                    >
                      <div className="font-bold text-lg mb-1">5 db Kredit</div>
                      <div className="text-2xl font-bold mb-2">1 500 Ft</div>
                      <p className="text-sm opacity-80 group-hover:text-green-100">Ideális kipróbáláshoz</p>
                      {creditLoading === 5 && <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-2xl"><Loader2 className="animate-spin text-[#1B4332]" /></div>}
                    </button>

                    <button
                      onClick={() => handleBuyCredits(10)}
                      disabled={creditLoading !== null}
                      className="bg-[#1B4332] text-white p-6 rounded-2xl hover:bg-[#2D6A4F] transition text-left shadow-md relative"
                    >
                      <div className="font-bold text-lg mb-1">10 db Kredit</div>
                      <div className="text-2xl font-bold mb-2">2 500 Ft</div>
                      <p className="text-sm text-green-100">Legnépszerűbb választás</p>
                      {creditLoading === 10 && <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-2xl"><Loader2 className="animate-spin text-white" /></div>}
                    </button>
                  </div>
                </div>

                {/* C) Invoices Section */}
                <div>
                  <h3 className="text-xl font-bold text-[#1F2937] mb-4">Számlák</h3>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                          <tr>
                            <th className="px-6 py-4 font-bold text-gray-600">Dátum</th>
                            <th className="px-6 py-4 font-bold text-gray-600">Tétel</th>
                            <th className="px-6 py-4 font-bold text-gray-600">Összeg</th>
                            <th className="px-6 py-4 font-bold text-gray-600">Státusz</th>
                            <th className="px-6 py-4 font-bold text-gray-600 text-right">Letöltés</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {MOCK_INVOICES.map((invoice) => (
                            <tr key={invoice.id} className="hover:bg-gray-50 transition">
                              <td className="px-6 py-4 text-gray-900">{invoice.date}</td>
                              <td className="px-6 py-4 font-medium text-gray-900">{invoice.item}</td>
                              <td className="px-6 py-4 text-gray-900">{invoice.amount}</td>
                              <td className="px-6 py-4">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold">
                                  {invoice.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-[#1B4332] transition">
                                  <FileText size={20} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: LOGISTICS */}
            {activeTab === 'logistics' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#1F2937]">Szállítási Beállítások</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-[#1B4332] font-bold hover:underline flex items-center gap-1"
                    >
                      <Edit size={16} /> Szerkesztés
                    </button>
                  )}
                </div>

                <div className="space-y-8 max-w-2xl">

                  {/* 1. Local Pickup */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#1B4332]">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Személyes átvétel</h3>
                          <p className="text-sm text-gray-500">A vevő eljön a termékért</p>
                        </div>
                      </div>
                      {isEditing ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={formData.logistics.hasLocalPickup}
                            onChange={(e) => setFormData({
                              ...formData,
                              logistics: { ...formData.logistics, hasLocalPickup: e.target.checked }
                            })}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B4332]"></div>
                        </label>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${formData.logistics.hasLocalPickup ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                          {formData.logistics.hasLocalPickup ? 'Engedélyezve' : 'Kikapcsolva'}
                        </span>
                      )}
                    </div>

                    {formData.logistics.hasLocalPickup && (
                      <div className="ml-13 pl-3 border-l-2 border-gray-200">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Átvételi pont címe</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.logistics.pickupAddress}
                            onChange={(e) => setFormData({
                              ...formData,
                              logistics: { ...formData.logistics, pickupAddress: e.target.value }
                            })}
                            placeholder="Pl. 1052 Budapest, Deák Ferenc tér 1."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none bg-white"
                          />
                        ) : (
                          <div className="text-gray-900 font-medium">{formData.logistics.pickupAddress || 'A profil címed lesz használva.'}</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 2. Home Delivery */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#1B4332]">
                          <Truck size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Házhozszállítás</h3>
                          <p className="text-sm text-gray-500">Te viszed ki a terméket</p>
                        </div>
                      </div>
                      {isEditing ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={formData.logistics.hasHomeDelivery}
                            onChange={(e) => setFormData({
                              ...formData,
                              logistics: { ...formData.logistics, hasHomeDelivery: e.target.checked }
                            })}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B4332]"></div>
                        </label>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${formData.logistics.hasHomeDelivery ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                          {formData.logistics.hasHomeDelivery ? 'Engedélyezve' : 'Kikapcsolva'}
                        </span>
                      )}
                    </div>

                    {formData.logistics.hasHomeDelivery && (
                      <div className="ml-13 pl-3 border-l-2 border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Szállítási sugár (km)</label>
                          {isEditing ? (
                            <input
                              type="number"
                              value={formData.logistics.deliveryRadius}
                              onChange={(e) => setFormData({
                                ...formData,
                                logistics: { ...formData.logistics, deliveryRadius: Number(e.target.value) }
                              })}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none bg-white"
                            />
                          ) : (
                            <div className="text-gray-900 font-medium">{formData.logistics.deliveryRadius} km</div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Szállítási díj (Ft)</label>
                          {isEditing ? (
                            <input
                              type="number"
                              value={formData.logistics.deliveryCost}
                              onChange={(e) => setFormData({
                                ...formData,
                                logistics: { ...formData.logistics, deliveryCost: Number(e.target.value) }
                              })}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none bg-white"
                            />
                          ) : (
                            <div className="text-gray-900 font-medium">{formData.logistics.deliveryCost} Ft</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. Shipping (Foxpost/GLS) */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 opacity-70 pointer-events-none">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400">
                          <Package size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Csomagküldés (Foxpost, GLS)</h3>
                          <p className="text-sm text-gray-500">Hamarosan érkezik...</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-500">
                        Hamarosan
                      </span>
                    </div>
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