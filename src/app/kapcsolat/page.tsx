'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export default function KapcsolatPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937] flex flex-col">
            <Header />
            <main className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#1B4332] mb-4">Lépj velünk kapcsolatba!</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Kérdésed van? Segítségre van szükséged? Írj nekünk bátran, és csapatunk hamarosan válaszol!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Contact Info */}
                    <div className="bg-[#1B4332] text-white rounded-3xl p-8 md:p-12 shadow-lg">
                        <h2 className="text-2xl font-bold mb-8">Elérhetőségeink</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-xl">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Címünk</h3>
                                    <p className="text-green-100">2858 Császár,<br />Kisfaludy 68.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-xl">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">E-mail</h3>
                                    <p className="text-green-100">support@szomszedkosar.hu</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-xl">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Telefon</h3>
                                    <p className="text-green-100">+36 1 234 5678</p>
                                    <p className="text-xs text-green-200 mt-1">(H-P: 9:00 - 17:00)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1B4332]">
                                    <Send size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1B4332] mb-2">Üzenet elküldve!</h3>
                                <p className="text-gray-600">Köszönjük megkeresésedet. Hamarosan válaszolunk.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-[#1B4332] font-bold hover:underline"
                                >
                                    Új üzenet küldése
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Név</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none bg-gray-50 focus:bg-white transition"
                                        placeholder="Teljes név"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">E-mail cím</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none bg-gray-50 focus:bg-white transition"
                                        placeholder="pelda@email.hu"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Üzenet</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none bg-gray-50 focus:bg-white transition resize-none"
                                        placeholder="Miben segíthetünk?"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#1B4332] text-white py-4 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md flex items-center justify-center gap-2"
                                >
                                    <Send size={20} /> Üzenet küldése
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
