'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
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
  Heart
} from 'lucide-react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'products' | 'reviews' | 'stats' | 'settings'>('products');
  const [productFilter, setProductFilter] = useState<'all' | 'active' | 'sold_out'>('all');

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

  const user = session.user as any; // Type assertion for now

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

              <div className="flex flex-col items-center justify-center gap-1 mb-2">
                <h2 className="text-xl font-bold text-[#1F2937]">{user.name || 'Felhasználó'}</h2>
                <span className="text-sm text-gray-500">{user.email}</span>

                <span className="bg-[#1B4332] text-white text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1 mt-2">
                  <ShieldCheck size={12} />
                  {user.role === 'producer' ? 'Termelő' : 'Vásárló'}
                </span>
              </div>

              <div className="text-gray-500 text-sm mb-6 flex items-center justify-center gap-1">
                <MapPin size={14} />
                {user.city || 'Nincs megadva helyszín'}
              </div>

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

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {user.bio || 'Nincs még bemutatkozás.'}
              </p>

              <div className="flex flex-col gap-3">
                <button className="w-full bg-[#1B4332] text-white py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition flex items-center justify-center gap-2">
                  <Edit size={18} />
                  Profil szerkesztése
                </button>
              </div>
            </div>

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