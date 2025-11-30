'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBasket, Leaf, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

export default function LandingPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/api/products');
        // Take first 4 products for showcase
        setProducts(res.data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1B4332] rounded-lg flex items-center justify-center">
              <ShoppingBasket className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-[#1B4332] tracking-tight">
              SzomszédKosár
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/search" className="hover:text-[#1B4332] transition-colors">Termékek</Link>
            <Link href="/feed" className="hover:text-[#1B4332] transition-colors">Hírfolyam</Link>
            <Link href="/rolunk" className="hover:text-[#1B4332] transition-colors">Rólunk</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-[#1B4332] hover:underline hidden sm:block">
              Bejelentkezés
            </Link>
            <Link href="/register" className="btn-primary text-sm">
              Regisztráció
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="py-16 md:py-24 bg-[#F5F5F0]">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2937] leading-tight">
                Vásárolj közvetlenül a <span className="text-[#1B4332]">környékbeli termelőktől</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Friss, házi ízek egyenesen a kertből. Támogasd a helyi gazdaságot és élvezd a minőségi élelmiszereket, felesleges utaztatás nélkül.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/search" className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                  Böngéssz a termékek között
                </Link>
                <Link href="/rolunk" className="px-8 py-4 rounded-lg font-bold text-[#1B4332] border-2 border-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-all text-center">
                  Hogyan működik?
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[#1B4332]/10 rounded-full blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop"
                alt="Friss zöldségek kosárban"
                className="relative w-full rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 object-cover"
              />
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Miért válassz minket?</h2>
              <p className="text-gray-600">
                A SzomszédKosár összeköti a tudatos vásárlókat a megbízható helyi termelőkkel.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Leaf,
                  title: 'Frissesség Garantálva',
                  desc: 'A termékek közvetlenül a kertből érkeznek, raktározás nélkül.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Megbízható Forrás',
                  desc: 'Minden termelő ellenőrzött, valós helyi gazdálkodó.'
                },
                {
                  icon: Users,
                  title: 'Közösségi Erő',
                  desc: 'Vásárlásoddal a helyi családokat és a gazdaságot támogatod.'
                }
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl bg-[#F9FAFB] hover:bg-[#F0FDF4] transition-colors group border border-transparent hover:border-[#1B4332]/20">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <feature.icon className="text-[#1B4332] w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1F2937] mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCT SHOWCASE */}
        <section className="py-16 bg-[#F5F5F0]">
          <div className="container">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-[#1F2937] mb-2">Népszerű termékek</h2>
                <p className="text-gray-600">A közösség kedvencei ezen a héten</p>
              </div>
              <Link href="/search" className="hidden md:flex items-center gap-2 text-[#1B4332] font-bold hover:underline">
                Összes termék <ArrowRight size={20} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map((product: any) => (
                  <Link href={`/product/${product._id}`} key={product._id} className="group">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <div className="h-48 w-full overflow-hidden relative bg-gray-100 flex items-center justify-center">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <Leaf className="text-gray-300 w-12 h-12" />
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-bold text-lg text-[#1F2937] mb-1 line-clamp-1">{product.name}</h3>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="text-sm text-gray-500 line-clamp-1">{product.sellerName || 'Termelő'}</span>
                          <span className="font-bold text-[#1B4332] whitespace-nowrap">{product.price} Ft</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  Még nincsenek kiemelt termékek.
                </div>
              )}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link href="/search" className="btn-primary w-full">
                Összes termék megtekintése
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}