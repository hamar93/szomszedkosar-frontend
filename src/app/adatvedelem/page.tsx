'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdatvedelemPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937] flex flex-col">
            <Header />

            <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-8 border-b border-gray-100 pb-4">
                        Adatkezelési Tájékoztató
                    </h1>

                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="lead font-medium text-lg mb-6">
                            A Vibe Code Kft. (továbbiakban: Adatkezelő) elkötelezett a felhasználók személyes adatainak védelme iránt. Jelen tájékoztató célja, hogy a SzomszédKosár weboldal látogatói és regisztrált felhasználói átlátható információt kapjanak adataik kezeléséről.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">1. Az Adatkezelő adatai</h2>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>Név:</strong> Vibe Code Kft.</li>
                            <li><strong>Székhely:</strong> 1051 Budapest, Fő utca 1.</li>
                            <li><strong>E-mail:</strong> adatvedelem@szomszedkosar.hu</li>
                            <li><strong>Adatvédelmi tisztviselő:</strong> Nem került kijelölésre.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">2. A kezelt adatok köre és célja</h2>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 font-bold text-[#1B4332]">Adatkör</th>
                                        <th className="px-4 py-2 font-bold text-[#1B4332]">Cél</th>
                                        <th className="px-4 py-2 font-bold text-[#1B4332]">Jogalap</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="px-4 py-2">Név, E-mail, Jelszó</td>
                                        <td className="px-4 py-2">Regisztráció, azonosítás</td>
                                        <td className="px-4 py-2">Szerződés teljesítése</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Szállítási cím, Telefonszám</td>
                                        <td className="px-4 py-2">Megrendelés teljesítése, kapcsolattartás</td>
                                        <td className="px-4 py-2">Szerződés teljesítése</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Földrajzi pozíció</td>
                                        <td className="px-4 py-2">Közeli termelők megjelenítése</td>
                                        <td className="px-4 py-2">Hozzájárulás</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">3. Adatfeldolgozók</h2>
                        <p className="mb-4">
                            Az Adatkezelő a szolgáltatás nyújtása során az alábbi adatfeldolgozókat veszi igénybe:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>Stripe Inc.</strong> (Online fizetés lebonyolítása)</li>
                            <li><strong>Render.com</strong> (Tárhelyszolgáltatás)</li>
                            <li><strong>MongoDB Atlas</strong> (Adatbázis szolgáltatás)</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">4. Az érintettek jogai</h2>
                        <p className="mb-4">
                            Ön jogosult kérelmezni az Adatkezelőtől a rá vonatkozó személyes adatokhoz való hozzáférést, azok helyesbítését, törlését vagy kezelésének korlátozását, és tiltakozhat az ilyen személyes adatok kezelése ellen.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">5. Jogorvoslat</h2>
                        <p className="mb-4">
                            Panaszával a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH) fordulhat:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>Cím:</strong> 1055 Budapest, Falk Miksa utca 9-11.</li>
                            <li><strong>Honlap:</strong> www.naih.hu</li>
                        </ul>

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
