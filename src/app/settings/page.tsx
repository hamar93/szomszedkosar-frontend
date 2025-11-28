'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  MapPin,
  Heart,
  Settings,
  ArrowLeft,
  Check
} from 'lucide-react';

export default function SettingsPage() {
  const [radius, setRadius] = useState(10);
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-600">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold text-[#1F2937] flex items-center gap-2">
              <Settings size={24} className="text-[#1B4332]" />
              Beállítások
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Notification Settings Header */}
          <div className="p-6 border-b border-gray-100 bg-[#F9FAFB]">
            <h2 className="text-lg font-bold text-[#1F2937] flex items-center gap-2">
              <Bell size={20} className="text-[#1B4332]" />
              Értesítési preferenciák
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Állítsd be, miről szeretnél értesítést kapni.
            </p>
          </div>

          <div className="p-6 space-y-8">

            {/* Radius Setting */}
            <div>
              <label className="block text-sm font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-gray-400" />
                Körzet beállítása
              </label>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-600">Távolság</span>
                  <span className="text-[#1B4332] font-bold bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
                    {radius} km
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full accent-[#1B4332] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                  <span>1 km</span>
                  <span>30 km</span>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Csak a megadott körzeten belüli termelőktől kapsz értesítést új termékekről.
                </p>
              </div>
            </div>

            {/* Interests Setting */}
            <div>
              <label className="block text-sm font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                <Heart size={18} className="text-gray-400" />
                Érdeklődési körök
              </label>

              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'paprika', label: 'Paprika & Zöldség' },
                  { id: 'tojás', label: 'Friss Tojás' },
                  { id: 'méz', label: 'Termelői Méz' },
                  { id: 'lekvár', label: 'Lekvár & Szörp' },
                  { id: 'tea', label: 'Gyógytea' },
                  { id: 'kozmetikum', label: 'Natúr Kozmetikum' },
                  { id: 'hús', label: 'Füstölt Áru' },
                  { id: 'tej', label: 'Tejtermék' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleInterest(item.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 ${interests.includes(item.id)
                        ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#1B4332] hover:text-[#1B4332]'
                      }`}
                  >
                    {interests.includes(item.id) && <Check size={14} />}
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Válaszd ki azokat a kategóriákat, amelyek érdekelnek. Ezek alapján küldünk személyre szabott ajánlatokat.
              </p>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button className="px-6 py-3 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md">
              Beállítások mentése
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
