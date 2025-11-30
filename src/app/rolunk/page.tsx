'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sprout, Users, Heart } from 'lucide-react';

export default function RolunkPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937] flex flex-col">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-[#1B4332] text-white py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Küldetésünk</h1>
                        <p className="text-xl text-green-100 leading-relaxed max-w-2xl mx-auto">
                            Összekötjük a helyi termelőket a tudatos vásárlókkal, hogy minden asztalra friss,
                            egészséges és hazai étel kerülhessen.
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1B4332]">
                                <Sprout size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Helyi Termelők Támogatása</h3>
                            <p className="text-gray-600">
                                Segítünk a gazdáknak, hogy tisztességes áron, közvetítők nélkül értékesíthessék termékeiket.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1B4332]">
                                <Heart size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Friss és Egészséges</h3>
                            <p className="text-gray-600">
                                Hiszünk abban, hogy a legfinomabb étel az, ami a közelben termett és nem utazott ezer kilométert.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1B4332]">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Közösségépítés</h3>
                            <p className="text-gray-600">
                                Nem csak egy piactér vagyunk, hanem egy közösség, ahol a szomszédok támogatják egymást.
                            </p>
                        </div>
                    </div>

                    <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200 text-center">
                        <h2 className="text-3xl font-bold text-[#1B4332] mb-6">Kik vagyunk?</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                            A SzomszédKosár a Vibe Code Kft. szerelemprojektje. Csapatunk elkötelezett a fenntartható jövő és a
                            vidéki gazdaság fellendítése mellett. Célunk, hogy a technológia segítségével hozzuk közelebb egymáshoz
                            az embereket és a valódi ételeket.
                        </p>
                        <div className="text-sm font-bold text-[#1B4332]">
                            Vibe Code Kft.
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
