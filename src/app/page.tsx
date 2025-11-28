'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingBasket,
  MapPin,
  Search,
  Leaf,
  ShieldCheck,
  Users,
  ArrowRight,
  Menu,
  X,
  Cherry,
  Egg
} from 'lucide-react';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">

      {/* --- HEADER --- */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* LOGO & BRAND */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1B4332] rounded-xl flex items-center justify-center shadow-sm">
                <ShoppingBasket className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-[#1B4332] tracking-tight">
                SzomszédKosár
              </span>
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/feed" className="text-gray-600 hover:text-[#1B4332] font-medium transition flex items-center gap-1">
                Hírfolyam
              </Link>
              <Link href="/termelok" className="text-gray-600 hover:text-[#1B4332] font-medium transition">
                Termelők
              </Link>
              <Link href="/rolunk" className="text-gray-600 hover:text-[#1B4332] font-medium transition">
                Rólunk
              </Link>
            </nav>

            {/* AUTH BUTTONS */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="px-5 py-2.5 text-[#1B4332] font-bold hover:bg-[#F0F4F1] rounded-xl transition">
                Belépés
              </Link>
              <Link href="/register" className="px-5 py-2.5 bg-[#1B4332] text-white font-bold rounded-xl hover:bg-[#2D6A4F] transition shadow-md flex items-center gap-2">
                Regisztráció
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 shadow-lg">
            <nav className="flex flex-col gap-4">
              <Link href="/feed" className="text-lg font-medium text-gray-700">Hírfolyam</Link>
              <Link href="/termelok" className="text-lg font-medium text-gray-700">Termelők</Link>
              <hr className="border-gray-100" />
              <Link href="/login" className="text-lg font-bold text-[#1B4332]">Belépés</Link>
              <Link href="/register" className="text-lg font-bold text-[#1B4332]">Regisztráció</Link>
            </nav>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        {/* Háttér minta vagy gradiens */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0F4F1] via-white to-[#E8ECE9] opacity-80"></div>

        <div className="relative max-w-4xl mx-auto text-center z-10">

          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-[#E8ECE9] text-[#1B4332] text-sm font-bold mb-8 border border-[#1B4332]/10">
            <Leaf size={14} className="fill-[#1B4332]" />
            Helyi termékek, közvetlenül a termelőtől
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-[#1F2937] tracking-tight">
            Vásárolj a <br className="hidden md:block" />
            <span className="text-[#1B4332] relative inline-block">
              szomszédodtól
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Friss zöldség, gyümölcs, és házi finomságok a környékbeli termelőktől.
            Csatlakozz a közösséghez!
          </p>

          {/* SEARCH BOX */}
          <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-xl border border-gray-200/60 flex flex-col sm:flex-row gap-2 transition-transform hover:scale-[1.01]">
            <div className="flex-grow relative flex items-center">
              <MapPin className="absolute left-4 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Irányítószám vagy település..."
                className="w-full pl-14 pr-4 py-4 rounded-xl border-none outline-none text-lg text-gray-800 placeholder-gray-400 bg-transparent"
              />
            </div>
            <button className="bg-[#1B4332] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#2D6A4F] transition shadow-lg flex items-center justify-center gap-2">
              <Search size={20} />
              Keresés
            </button>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Leaf,
                title: 'Frissesség Garantálva',
                desc: 'A termékek közvetlenül a kertből érkeznek, raktározás nélkül.',
                color: 'bg-green-100 text-green-700'
              },
              {
                icon: ShieldCheck,
                title: 'Megbízható Forrás',
                desc: 'Minden termelő ellenőrzött, valós helyi gazdálkodó.',
                color: 'bg-blue-100 text-blue-700'
              },
              {
                icon: Users,
                title: 'Közösségi Erő',
                desc: 'Vásárlásoddal a helyi családokat és a gazdaságot támogatod.',
                color: 'bg-orange-100 text-orange-700'
              }
            ].map((feature, i) => (
              <div key={i} className="text-center group p-6 rounded-3xl hover:bg-[#F9FAFB] transition duration-300">
                <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#1F2937] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCT SHOWCASE --- */}
      <section className="py-24 px-4 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B4332] mb-4">Mit találsz a SzomszédKosárban?</h2>
            <p className="text-gray-600 text-lg">Ízelítő a környékbeli kínálatból</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Ropogós Cseresznye',
                price: '1 200 Ft/kg',
                seller: 'Kovács Kertészet',
                loc: 'Eger',
                Icon: Cherry,
                color: 'text-red-500 bg-red-50'
              },
              {
                name: 'Házi Eperlekvár',
                price: '1 500 Ft/üveg',
                seller: 'Nagyi Kamrája',
                loc: 'Debrecen',
                Icon: ShoppingBasket,
                color: 'text-pink-500 bg-pink-50'
              },
              {
                name: 'Kézműves Sajt',
                price: '3 200 Ft/kg',
                seller: 'Bükki Sajtműhely',
                loc: 'Szilvásvárad',
                Icon: ShoppingBasket,
                color: 'text-yellow-500 bg-yellow-50'
              },
              {
                name: 'Friss Tojás',
                price: '80 Ft/db',
                seller: 'Szabó Tanya',
                loc: 'Gödöllő',
                Icon: Egg,
                color: 'text-orange-500 bg-orange-50'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className={`h-48 ${item.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                  <item.Icon size={64} strokeWidth={1.5} />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#1F2937]">{item.name}</h3>
                    <span className="bg-[#E8ECE9] text-[#1B4332] px-2 py-1 rounded-lg text-xs font-bold">
                      {item.price}
                    </span>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Users size={16} /> {item.seller}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <MapPin size={16} /> {item.loc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/feed" className="inline-flex items-center gap-2 text-[#1B4332] font-bold text-lg hover:underline">
              Összes termék megtekintése <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#1B4332] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <ShoppingBasket size={32} className="text-[#E9C46A]" />
            <span className="text-3xl font-bold">SzomszédKosár</span>
          </div>
          <p className="text-green-100/80 mb-12 max-w-lg mx-auto">
            A helyi közösségek és termelők találkozóhelye.
            Friss, fenntartható, hazai.
          </p>
          <div className="border-t border-green-800 pt-8 text-sm text-green-100/60">
            © 2025 SzomszédKosár. Minden jog fenntartva.
          </div>
        </div>
      </footer>

    </div>
  );
}