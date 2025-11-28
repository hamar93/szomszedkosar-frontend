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
  MessageCircle,
  Phone,
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
  Heart,
  CreditCard,
  Check,
  X as XIcon,
  Loader2
} from 'lucide-react';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [activeTab, setActiveTab] = useState<'products' | 'reviews' | 'stats' | 'settings'>('products');
  const [productFilter, setProductFilter] = useState<'all' | 'active' | 'sold_out'>('all');

  // Editing State
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  // Local user state to show updates immediately
  const [displayUser, setDisplayUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    bio: ''
  });

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

  // If not logged in, show a simple message or redirect (handled by middleware ideally)
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

  const handleSave = async () => {
    setLoading(true);
    try {
      // Update backend
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, formData);

      // Update local display
      setDisplayUser({ ...displayUser, ...formData });

      // Update session if possible (optional, depends on NextAuth config)
      await update({
        ...session,
        user: { ...session.user, ...formData }
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

  const user = displayUser || session.user as any;

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-[350px_1fr]">

          {/* LEFT COLUMN - PROFILE INFO */}
          <div className="space-y-6">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-24 h-24 bg-[#E8ECE9] rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                <User size={40} className="text-[#1B4332]" />
              </div>

              {isEditing ? (
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-center font-bold"
                    placeholder="Név"
                  />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-center text-sm"
                    placeholder="Város"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 mb-2">
                  <h2 className="text-xl font-bold text-[#1F2937]">{user.name || 'Felhasználó'}</h2>
                  <span className="text-sm text-gray-500">{user.email}</span>

                  <span className="bg-[#1B4332] text-white text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1 mt-2">
                    <ShieldCheck size={12} />
                    {user.role === 'producer' ? 'Termelő' : 'Vásárló'}
                  </span>
                </div>
              )}

              {!isEditing && (
                <div className="text-gray-500 text-sm mb-6 flex items-center justify-center gap-1">
                  <MapPin size={14} />
                  {user.city || 'Nincs megadva helyszín'}
                </div>
              )}

              {/* Quick Stats (Placeholder for now) */}
              <div className="grid grid-cols-3 gap-2 mb-6 border-y border-gray-100 py-4">
                <div>
                  <div className="text-lg font-bold text-[#1B4332]">5.0</div>
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Star size={10} /> Értékelés
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#1B4332]">0</div>
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Package size={10} /> Eladás
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#1B4332]">2024</div>
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Calendar size={10} /> Tag óta
                  </div>
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm mb-6 min-h-[100px]"
                  placeholder="Bemutatkozás..."
                />
              ) : (
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {user.bio || 'Nincs még bemutatkozás.'}
                </p>
              )}

              <div className="flex flex-col gap-3">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex-1 bg-[#1B4332] text-white py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                      Mentés
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                    >
                      <XIcon size={18} />
                      Mégse
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-[#1B4332] text-white py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition flex items-center justify-center gap-2"
                  >
                    <Edit size={18} />
                    Profil szerkesztése
                  </button>
                )}
              </div>
            </div>

            {/* Subscription Card for Producers */}
            {user.role === 'producer' && (
              <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShoppingBasket size={100} />
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Star className="fill-yellow-400 text-yellow-400" size={20} />
                    Prémium Tagság
                  </h3>
                  <p className="text-green-100 text-sm mb-6">
                    Fizesd be a helypénzt, hogy korlátlanul hirdethess és kiemelt helyen jelenj meg!
                  </p>

                  <button
                    onClick={handleSubscription}
                    disabled={subLoading}
                    className="w-full bg-white text-[#1B4332] py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-md flex items-center justify-center gap-2"
                  >
                    {subLoading ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
                    Helypénz Fizetése
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN - CONTENT */}
          <div>
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center text-gray-500">
              <p>Itt jelennek majd meg a termékeid és értékeléseid.</p>
              <Link href="/add-product" className="text-[#1B4332] font-bold hover:underline mt-2 inline-block">
                Tölts fel egy terméket most!
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}