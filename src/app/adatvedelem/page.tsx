'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdatvedelemPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937] flex flex-col">
            <Header />
            <main className="flex-grow max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-[#1B4332] mb-8">Adatkezelési Tájékoztató</h1>

                    <div className="prose prose-green max-w-none text-gray-600">
                        <p className="mb-4">
                            A Vibe Code Kft. elkötelezett a felhasználók személyes adatainak védelme iránt.
                            Jelen tájékoztató célja, hogy ismertesse adatkezelési gyakorlatunkat a GDPR előírásainak megfelelően.
                        </p>

                        <h2 className="text-xl font-bold text-[#1F2937] mt-6 mb-3">1. Adatkezelő adatai</h2>
                        <ul className="list-disc pl-5 mb-4 space-y-1">
                            <li><strong>Név:</strong> Vibe Code Kft.</li>
                            <li><strong>Cím:</strong> 2858 Császár, Kisfaludy 68.</li>
                            <li><strong>E-mail:</strong> support@szomszedkosar.hu</li>
                        </ul>

                        <h2 className="text-xl font-bold text-[#1F2937] mt-6 mb-3">2. Kezelt adatok köre</h2>
                        <p className="mb-4">
                            A regisztráció és a szolgáltatás használata során az alábbi adatokat kezelhetjük:
                        </p>
                        <ul className="list-disc pl-5 mb-4 space-y-1">
                            <li>Név, e-mail cím, telefonszám</li>
                            <li>Szállítási és számlázási cím</li>
                            <li>Termelők esetén: adószám, őstermelői igazolvány száma</li>
                        </ul>

                        <h2 className="text-xl font-bold text-[#1F2937] mt-6 mb-3">3. Az adatkezelés célja</h2>
                        <p className="mb-4">
                            Az adatokat a szolgáltatás nyújtása, a rendelések teljesítése, a kapcsolattartás és a jogszabályi kötelezettségek
                            teljesítése érdekében kezeljük.
                        </p>

                        <h2 className="text-xl font-bold text-[#1F2937] mt-6 mb-3">4. Adattovábbítás</h2>
                        <p className="mb-4">
                            A megrendelések teljesítése érdekében a szükséges adatokat (pl. szállítási cím) továbbítjuk az érintett termelőnek.
                            Harmadik félnek ezen kívül adatokat nem adunk át, kivéve ha arra jogszabály kötelez.
                        </p>

                        <h2 className="text-xl font-bold text-[#1F2937] mt-6 mb-3">5. Jogorvoslat</h2>
                        <p className="mb-4">
                            Bármikor kérheti adatai törlését vagy módosítását a fenti elérhetőségeken. Panaszával a NAIH-hoz fordulhat.
                        </p>

                        <p className="text-sm text-gray-500 mt-8">
                            Utolsó frissítés: {new Date().toLocaleDateString('hu-HU')}
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
