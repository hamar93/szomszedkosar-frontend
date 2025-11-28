'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import { MapPin, Check, AlertCircle, Clock } from 'lucide-react';

export default function PickupRegisterPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        openingHours: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!session?.user) {
            setError('Kérjük jelentkezz be az átadópont regisztrálásához!');
            setLoading(false);
            return;
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/pickup`, formData);
            router.push('/feed');
            // Ideally show a success message or toast here
        } catch (err: any) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Hiba történt a regisztráció során.');
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
                            <MapPin className="text-[#1B4332] w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#1F2937]">Átadópont Regisztrálása</h1>
                        <p className="text-gray-500 mt-2">Segíts a közösségnek új átvételi pontok létrehozásával!</p>
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
                            <label className="block text-sm font-bold text-gray-700 mb-2">Átadópont Neve</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition bg-gray-50 focus:bg-white"
                                placeholder="Pl. Belvárosi Közösségi Ház"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Cím</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    required
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition bg-gray-50 focus:bg-white"
                                    placeholder="Pl. 5100 Jászberény, Fő tér 1."
                                />
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Nyitvatartás</label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    required
                                    value={formData.openingHours}
                                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition bg-gray-50 focus:bg-white"
                                    placeholder="Pl. H-P: 08:00 - 16:00"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1B4332] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2D6A4F] transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                'Regisztráció...'
                            ) : (
                                <>
                                    <Check size={20} /> Átadópont Létrehozása
                                </>
                            )}
                        </button>

                    </form>
                </div>
            </main>
        </div>
    );
}
