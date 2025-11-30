'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937] flex flex-col">
            <Header />

            <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-8 border-b border-gray-100 pb-4">
                        Süti (Cookie) Kezelési Tájékoztató
                    </h1>

                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="lead font-medium text-lg mb-6">
                            A SzomszédKosár weboldal (a továbbiakban: Weboldal) sütiket (cookie-kat) használ a felhasználói élmény javítása, a Weboldal működésének biztosítása és statisztikai célok érdekében.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">1. Mik azok a sütik?</h2>
                        <p className="mb-4">
                            A sütik kis méretű szöveges fájlok, amelyeket a weboldal helyez el az Ön számítógépén vagy mobilkészülékén. Ezek segítségével a weboldal "megjegyzi" az Ön műveleteit és beállításait (pl. bejelentkezés, nyelv, betűméret) egy bizonyos ideig.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">2. Milyen sütiket használunk?</h2>

                        <h3 className="text-xl font-bold text-[#1B4332] mt-6 mb-2">Munkamenet sütik (Session cookies)</h3>
                        <p className="mb-4">
                            Ezek a sütik ideiglenesek, csak addig maradnak az eszközén, amíg Ön a Weboldalt böngészi. A böngésző bezárásával törlődnek. Elengedhetetlenek a Weboldal egyes funkcióinak (pl. kosár) működéséhez.
                        </p>

                        <h3 className="text-xl font-bold text-[#1B4332] mt-6 mb-2">Állandó sütik (Persistent cookies)</h3>
                        <p className="mb-4">
                            Ezek a sütik hosszabb ideig (a süti élettartamától függően) az eszközén maradnak. Segítségükkel felismerjük Önt, amikor visszatér a Weboldalra.
                        </p>

                        <h3 className="text-xl font-bold text-[#1B4332] mt-6 mb-2">Harmadik féltől származó sütik</h3>
                        <p className="mb-4">
                            A Weboldal használhat külső szolgáltatók (pl. Google Analytics, Stripe) által elhelyezett sütiket is statisztikai és fizetési célokból.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">3. A sütik kezelése</h2>
                        <p className="mb-4">
                            Önnek lehetősége van a sütik engedélyezésére vagy tiltására a böngészője beállításaiban. A legtöbb böngésző alapértelmezés szerint elfogadja a sütiket, de ezt bármikor módosíthatja.
                        </p>
                        <p className="mb-4">
                            Felhívjuk figyelmét, hogy a sütik tiltása esetén előfordulhat, hogy a Weboldal bizonyos funkciói nem fognak megfelelően működni.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">4. Kapcsolat</h2>
                        <p className="mb-4">
                            Amennyiben kérdése van a sütik használatával kapcsolatban, kérjük, lépjen kapcsolatba velünk a <strong>support@szomszedkosar.hu</strong> e-mail címen.
                        </p>

                        <p className="text-sm text-gray-500 mt-12 border-t border-gray-100 pt-4">
                            Utolsó módosítás: 2024. május 20.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
