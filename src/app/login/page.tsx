'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Lock,
  ArrowRight,
  Check,
  Search,
  ShoppingBasket,
  User,
  LogIn
} from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleGoogleLogin = () => {
    console.log('Google bejelentkezés');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Bejelentkezés:', formData);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937] flex flex-col">

      {/* HEADER (Simplified for Login) */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1B4332] rounded-xl flex items-center justify-center shadow-sm">
                <ShoppingBasket className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-[#1B4332] tracking-tight">
                SzomszédKosár
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#E8ECE9] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
              <User className="text-[#1B4332] w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Üdvözlünk újra!</h1>
            <p className="text-gray-500">Jelentkezz be a fiókodba a folytatáshoz.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">E-mail cím</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="pelda@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Jelszó</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer w-5 h-5 border-2 border-gray-300 rounded text-[#1B4332] focus:ring-[#1B4332] focus:ring-offset-0 cursor-pointer" />
                    <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                  </div>
                  Emlékezz rám
                </label>
                <Link href="/forgot-password" className="text-[#1B4332] font-semibold hover:underline">
                  Elfelejtett jelszó?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B4332] text-white py-3.5 rounded-xl font-bold text-lg hover:bg-[#2D6A4F] transition shadow-md flex items-center justify-center gap-2"
              >
                <LogIn size={20} />
                Bejelentkezés
              </button>

              <div className="relative text-center my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <span className="relative bg-white px-4 text-sm text-gray-500 font-medium">vagy</span>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <Search size={20} />
                Bejelentkezés Google fiókkal
              </button>

            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Nincs még fiókod?{' '}
              <Link href="/register" className="text-[#1B4332] font-bold hover:underline inline-flex items-center gap-1">
                Regisztrálj most <ArrowRight size={16} />
              </Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}