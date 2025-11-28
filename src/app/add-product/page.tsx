'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import { Upload, Check, AlertCircle } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Állapot (State) a űrlap adatoknak
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: 'kg',
    category: 'Zöldség',
    imageUrl: '',
    description: '',
    isShippable: false
  });

  // 2. Beküldés kezelése
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!session?.user) {
      setError('Kérjük jelentkezz be a termék feltöltéséhez!');
      setLoading(false);
      return;
    }

    try {
      // Backend hívás
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        ...formData,
        price: Number(formData.price), // Ár konvertálása számmá
      });

      // Siker esetén átirányítás a feedre
      router.push('/feed');
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Hiba történt a feltöltés során.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12">

          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#E8ECE9] rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="text-[#1B4332] w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-[#1F2937]">Új termék feltöltése</h1>
            <p className="text-gray-500 mt-2">Oszd meg a termésedet a közösséggel!</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Termék neve</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition bg-gray-50 focus:bg-white"
                placeholder="Pl. Házi Eperlekvár"
              />
            </div>

            {/* Price & Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ár (Ft)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition bg-gray-50 focus:bg-white"
                  placeholder="1500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Egység</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition bg-gray-50 focus:bg-white"
                >
                  <option value="kg">kg</option>
                  <option value="db">db</option>
                  <option value="l">liter</option>
                  <option value="üveg">üveg</option>
                  <option value="csomag">csomag</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Kategória</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition bg-gray-50 focus:bg-white"
              >
                <option value="Zöldség">Zöldség</option>
                <option value="Gyümölcs">Gyümölcs</option>
                <option value="Tejtermék">Tejtermék</option>
                <option value="Húsáru">Húsáru</option>
                <option value="Pékáru">Pékáru</option>
                <option value="Egyéb">Egyéb</option>
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Kép URL</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition bg-gray-50 focus:bg-white"
                placeholder="https://pelda.hu/kep.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">Tipp: Használj Unsplash linket vagy töltsd fel egy képmegosztóra.</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Leírás</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition bg-gray-50 focus:bg-white resize-none"
                placeholder="Írd le a terméked jellemzőit..."
              />
            </div>

            {/* Shippable Checkbox */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <input
                type="checkbox"
                id="isShippable"
                checked={formData.isShippable}
                onChange={(e) => setFormData({ ...formData, isShippable: e.target.checked })}
                className="w-5 h-5 text-[#1B4332] rounded focus:ring-[#1B4332] border-gray-300 cursor-pointer"
              />
              <label htmlFor="isShippable" className="text-sm font-bold text-blue-900 cursor-pointer select-none">
                Ez a termék postázható / országosan szállítható
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B4332] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2D6A4F] transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Feltöltés...
                </>
              ) : (
                <>
                  <Check size={20} /> Termék közzététele
                </>
              )}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}