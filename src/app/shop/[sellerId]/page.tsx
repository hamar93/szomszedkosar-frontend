'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import { MapPin, Star, Package, MessageCircle, User } from 'lucide-react';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function SellerShopPage() {
    const params = useParams();
    const sellerId = params.sellerId as string; // This might be an ID or email depending on how we link

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [seller, setSeller] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 1. Fetch all products (or specific seller products if API supports it)
                // Ideally: api.get(`/api/products?seller=${sellerId}`)
                // For now, fetch all and filter client-side if needed, or assume backend support
                const res = await api.get('/api/products');

                // Filter by sellerId (assuming sellerId param matches sellerEmail or _id)
                // If sellerId is an email (decoded), we match that.
                const decodedSellerId = decodeURIComponent(sellerId);

                const sellerProducts = res.data.filter((p: any) =>
                    p.sellerEmail === decodedSellerId || p.sellerId === decodedSellerId || p.sellerName === decodedSellerId
                );

                setProducts(sellerProducts);

                // 2. Derive seller info from the first product found (since we don't have a dedicated /users/id endpoint publicly ready yet)
                // Or try to fetch user profile if possible.
                if (sellerProducts.length > 0) {
                    const p = sellerProducts[0];
                    setSeller({
                        name: p.sellerName || 'Ismeretlen Eladó',
                        email: p.sellerEmail,
                        location: p.location || 'Magyarország',
                        avatar: p.sellerAvatar || null, // If we had this on product
                        bio: 'Helyi termelő a SzomszédKosár piactéren.' // Placeholder
                    });
                } else {
                    // Fallback if no products found, maybe try to fetch user directly if we had an endpoint
                    setSeller({
                        name: decodedSellerId,
                        location: 'Magyarország',
                        bio: 'Még nincsenek feltöltött termékei.'
                    });
                }

            } catch (error) {
                console.error('Error fetching shop data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (sellerId) {
            fetchData();
        }
    }, [sellerId]);

    if (loading) {
        return <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">Betöltés...</div>;
    }

    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">
            <Header />

            {/* Seller Hero / Header */}
            <div className="bg-[#1B4332] text-white pt-12 pb-24 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 bg-white rounded-full p-1">
                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {seller?.avatar ? (
                                <img src={seller.avatar} alt={seller.name} className="w-full h-full object-cover" />
                            ) : (
                                <User size={48} className="text-gray-400" />
                            )}
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold mb-2">{seller?.name}</h1>
                        <div className="flex items-center justify-center md:justify-start gap-4 text-green-100 mb-4">
                            <span className="flex items-center gap-1"><MapPin size={16} /> {seller?.location}</span>
                            <span className="flex items-center gap-1"><Star size={16} className="fill-yellow-400 text-yellow-400" /> 4.8 (12 értékelés)</span>
                        </div>
                        <p className="max-w-xl text-green-50/90 leading-relaxed">
                            {seller?.bio}
                        </p>
                    </div>
                    <div className="ml-auto flex gap-3">
                        <Link href={`/messages?recipient=${seller?.email || ''}`} className="bg-white text-[#1B4332] px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition flex items-center gap-2">
                            <MessageCircle size={20} /> Kapcsolat
                        </Link>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <main className="max-w-7xl mx-auto px-4 -mt-12 pb-20">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[400px]">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <Package className="text-[#1B4332]" /> Elérhető termékek ({products.length})
                    </h2>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <Link href={`/product/${product._id}`} key={product._id} className="block group">
                                    <ProductCard
                                        productName={product.name}
                                        price={`${product.price} Ft / ${product.unit}`}
                                        sellerName={product.sellerName || seller.name}
                                        distance={product.location || seller.location}
                                        stock={product.stock} // Pass stock here
                                        imageUrl={product.imageUrl}
                                    />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            Jelenleg nincsenek elérhető termékek ebben a boltban.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
