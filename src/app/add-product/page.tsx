'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import { Upload, Check, AlertCircle, Image as ImageIcon, X, MapPin } from 'lucide-react';
import api from '@/lib/api';

const CATEGORIES = [
  "Zöldség",
  "Gyümölcs",
  "Húsáru",
  "Tejtermék",
  "Pékáru",
  "Kamra",
  "Egyéb"
];

export default function AddProductPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: 'kg',
    category: 'Zöldség',
    imageUrl: '',
    description: '',
    isShippable: false,
    location: 'Budapest' // Default location
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('A termék neve kötelező!');
      setLoading(false);
      return;
    }
    if (Number(formData.price) <= 0) {
      setError('Az árnak nagyobbnak kell lennie 0-nál!');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        sellerEmail: session?.user?.email,
        sellerName: session?.user?.name || 'Ismeretlen',
        location: formData.location
      };

      console.log('🔍 DEBUG: Product creation payload:', payload);
      console.log('🔍 DEBUG: sellerEmail =', payload.sellerEmail);

      await api.post('/api/products', payload);

      setShowSuccess(true);
      setTimeout(() => {
        router.push('/feed');
      }, 2000);
    } catch (err: any) {
      console.error('Hiba a feltöltéskor:', err);
      setError(err.response?.data?.message || 'Nem sikerült feltölteni a terméket. Kérlek próbáld újra.');
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#1B4332] flex flex-col items-center justify-center text-white animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 animate-bounce">
          <Check className="text-[#1B4332] w-12 h-12" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Sikeres feltöltés!</h1>
        <p className="text-gray-300">Átirányítás a hírfolyamra...</p>
      </div>
    );
  }

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
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2 animate-in slide-in-from-top-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Image Upload UI */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Termék képe</label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 transition hover:border-[#1B4332] hover:bg-gray-50 group">
                {formData.imageUrl ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: '' })}
                      className="absolute top-2 right-2 p-2 bg-white/90 rounded-full text-red-600 hover:bg-white shadow-sm transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center py-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                      <ImageIcon className="text-gray-400 w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Kép URL megadása</p>
                    <p className="text-xs text-gray-500 mt-1 mb-4">Másold be a kép linkjét</p>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full max-w-sm px-4 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] outline-none"
                      placeholder="https://..."
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Kategória</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition bg-gray-50 focus:bg-white"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price & Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ár (Ft)</label>
                <input
                  type="number"
                  required
                  min="1"
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

            {/* Location (Read-only) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Helyszín</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  readOnly
                  value={formData.location}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">A helyszín automatikusan a profilod alapján kerül beállításra.</p>
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
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 transition hover:bg-blue-100/50">
              <input
                type="checkbox"
                id="isShippable"
                checked={formData.isShippable}
                onChange={(e) => setFormData({ ...formData, isShippable: e.target.checked })}
                className="w-5 h-5 text-[#1B4332] rounded focus:ring-[#1B4332] border-gray-300 cursor-pointer"
              />
              <label htmlFor="isShippable" className="text-sm font-bold text-blue-900 cursor-pointer select-none flex-1">
                Ez a termék postázható / országosan szállítható
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B4332] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2D6A4F] transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.99]"
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