'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Search, MapPin, Filter, ShoppingBasket, Leaf } from 'lucide-react';
import api from '@/lib/api';

const CATEGORIES = ["Eszközök", "Gabona", "Haszonállat", "Szolgáltatás"];

export default function MarketplacePage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [distance, setDistance] = useState(50); // Default 50km

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await api.get('/api/products');
                let filtered = res.data;

                // Filter by category if selected
                if (selectedCategory) {
                    filtered = filtered.filter((p: any) => p.category === selectedCategory);
                }

                // Note: Distance filtering would typically happen on the backend with geospatial queries.
                // For this frontend-only demo (without user coordinates), we'll just simulate it or leave it as a UI element.
                // If we had user location, we could filter here.

                setProducts(filtered);
            } catch (error) {
                console.error('Error fetching marketplace products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory, distance]);

    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Falusi Piactér</h1>
                        <p className="text-gray-600">Helyi eszközök, gabona és szolgáltatások</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center">

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 flex-1">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-4 py-2 rounded-xl font-bold text-sm transition ${!selectedCategory ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                Összes
                            </button>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-xl font-bold text-sm transition ${selectedCategory === cat ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Distance Slider */}
                        <div className="w-full md:w-64">
                            <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                                <span>Távolság</span>
                                <span>{distance} km</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={distance}
                                onChange={(e) => setDistance(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1B4332]"
                            />
                        </div>

                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B4332]"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link href={`/product/${product._id}`} key={product._id} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="h-48 bg-[#F0F4F1] relative flex items-center justify-center overflow-hidden">
                                    {product.imageUrl ? (
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    ) : (
                                        <Leaf className="text-[#1B4332]/20 w-16 h-16" />
                                    )}
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#1B4332] shadow-sm">
                                        {product.category}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-[#1F2937] text-lg leading-tight group-hover:text-[#1B4332] transition">{product.name}</h3>
                                        <span className="bg-[#E8ECE9] text-[#1B4332] text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0">
                                            {product.unit}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                                        <MapPin size={14} /> {product.location}
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div className="font-bold text-[#1B4332] text-xl">
                                            {product.price} Ft
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-[#F5F5F0] flex items-center justify-center text-[#1B4332] group-hover:bg-[#1B4332] group-hover:text-white transition">
                                            <ShoppingBasket size={16} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        <ShoppingBasket size={48} className="mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">Nincs találat a keresési feltételeknek megfelelően.</p>
                        <button
                            onClick={() => { setSelectedCategory(null); setDistance(50); }}
                            className="mt-4 text-[#1B4332] font-bold hover:underline"
                        >
                            Szűrők törlése
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
