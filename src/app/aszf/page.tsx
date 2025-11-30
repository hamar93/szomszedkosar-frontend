'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ASZFPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937] flex flex-col">
            <Header />

            <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-8 border-b border-gray-100 pb-4">
                        Általános Szerződési Feltételek
                    </h1>

                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="lead font-medium text-lg mb-6">
                            Jelen Általános Szerződési Feltételek (továbbiakban: ÁSZF) tartalmazza a Vibe Code Kft. (továbbiakban: Szolgáltató) által üzemeltetett SzomszédKosár online piactér (továbbiakban: Weboldal) használatának feltételeit.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">1. Szolgáltató adatai</h2>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>Cégnév:</strong> Vibe Code Kft.</li>
                            <li><strong>Székhely:</strong> 1051 Budapest, Fő utca 1.</li>
                            <li><strong>Cégjegyzékszám:</strong> 01-09-123456</li>
                            <li><strong>Adószám:</strong> 12345678-2-41</li>
                            <li><strong>E-mail:</strong> support@szomszedkosar.hu</li>
                            <li><strong>Telefon:</strong> +36 1 234 5678</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">2. A szolgáltatás leírása</h2>
                        <p className="mb-4">
                            A SzomszédKosár egy online közvetítő szolgáltatás (piactér), amely lehetőséget biztosít helyi kistermelőknek (továbbiakban: Eladó) termékeik megjelenítésére és értékesítésére, valamint vásárlóknak (továbbiakban: Vevő) ezen termékek megrendelésére.
                        </p>
                        <p className="mb-4">
                            A Szolgáltató kizárólag a technikai felületet biztosítja, az adásvételi szerződés közvetlenül az Eladó és a Vevő között jön létre.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">3. Regisztráció és felhasználói fiók</h2>
                        <p className="mb-4">
                            A Weboldal szolgáltatásainak teljes körű igénybevételéhez regisztráció szükséges. A felhasználó köteles a regisztráció során valós adatokat megadni. A Szolgáltató fenntartja a jogot a valótlan adatokat megadó felhasználók fiókjának törlésére.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">4. Megrendelés menete</h2>
                        <ol className="list-decimal pl-6 space-y-2 mb-6">
                            <li>A Vevő kiválasztja a kívánt termékeket és a kosárba helyezi őket.</li>
                            <li>A kosár oldalon ellenőrzi a tételeket és a végösszeget.</li>
                            <li>A "Tovább a fizetéshez" gombra kattintva megadja a szállítási és számlázási adatokat.</li>
                            <li>A megrendelés elküldésével a Vevő ajánlatot tesz a termék megvásárlására.</li>
                            <li>Az Eladó visszaigazolja a megrendelést, mellyel létrejön a szerződés.</li>
                        </ol>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">5. Elállási jog</h2>
                        <p className="mb-4">
                            A fogyasztónak minősülő Vevőt megilleti a 14 napos indoklás nélküli elállási jog a 45/2014. (II. 26.) Korm. rendelet alapján.
                        </p>
                        <p className="mb-4">
                            <strong>Kivételek:</strong> Romlandó vagy minőségét rövid ideig megőrző termékek (pl. friss zöldség, gyümölcs, tejtermék) esetén az elállási jog nem gyakorolható a termék átvétele után, amennyiben a csomagolás felbontásra került.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">6. Panaszkezelés</h2>
                        <p className="mb-4">
                            A Vevő panaszával közvetlenül az Eladóhoz vagy a Szolgáltatóhoz fordulhat a fenti elérhetőségeken. A Szolgáltató törekszik a vitás helyzetek békés rendezésére.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1B4332] mt-8 mb-4">7. Záró rendelkezések</h2>
                        <p className="mb-4">
                            A jelen ÁSZF-ben nem szabályozott kérdésekben a magyar jog, különösen a Ptk. és az elektronikus kereskedelmi szolgáltatásokról szóló törvény rendelkezései az irányadók.
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
