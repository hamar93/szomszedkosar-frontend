'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import Link from 'next/link';
import { User, MapPin, Star, ArrowRight, Loader2 } from 'lucide-react';

interface Producer {
    _id: string;
    name: string;
    email: string;
    city?: string;
    bio?: string;
    avatarUrl?: string;
    rating?: number; // Mock rating for now
}

export default function ProducersPage() {
    const [producers, setProducers] = useState<Producer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducers = async () => {
            try {
                const res = await api.get('/api/users', { params: { role: 'producer' } });
                setProducers(res.data);
            } catch (error) {
                console.error("Error fetching producers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducers();
    }, []);

    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937] flex flex-col">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#1B4332] mb-4">Helyi Termelőink</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Ismerd meg a környékbeli gazdákat, akik szívvel-lélekkel gondoskodnak arról, hogy friss és egészséges élelmiszer kerüljön az asztalodra.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-[#1B4332] w-10 h-10" />
                    </div>
                ) : producers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {producers.map((producer) => (
                            <div key={producer._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                                <div className="h-32 bg-[#1B4332]/10 relative">
                                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                                        <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex items-center justify-center">
                                            {producer.avatarUrl ? (
                                                <img src={producer.avatarUrl} alt={producer.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-12 h-12 text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-12 pb-6 px-6 text-center flex-grow flex flex-col">
                                    <h2 className="text-xl font-bold text-[#1F2937] mb-1">{producer.name}</h2>

                                    <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                                        <MapPin size={14} />
                                        <span>{producer.city || 'Helyszín nem megadott'}</span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 italic">
                                        "{producer.bio || 'A termelő még nem adott meg bemutatkozást.'}"
                                    </p>

                                    <div className="mt-auto">
                                        <Link
                                            href={`/shop/${producer._id}`}
                                            className="inline-flex items-center justify-center gap-2 w-full bg-[#1B4332] text-white py-3 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md group-hover:scale-[1.02]"
                                        >
                                            Tovább a boltjára
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Még nincsenek termelők</h3>
                        <p className="text-gray-500">Jelenleg egyetlen termelő sem regisztrált a rendszerben.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
