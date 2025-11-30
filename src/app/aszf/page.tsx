'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ASZFPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937] flex flex-col">
            <Header />
            <main className="flex-grow max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-[#1B4332] mb-8">Általános Szerződési Feltételek</h1>

                    <div className="prose prose-green max-w-none text-gray-600">
                        <p className="mb-4">
                            Üdvözöljük a SzomszédKosár weboldalán! Kérjük, figyelmesen olvassa el az alábbi Általános Szerződési Feltételeket (ÁSZF),
                            mielőtt használná szolgáltatásainkat.
                        </p>

                        <h2 className="text-xl font-bold text-[#1F2937] mt-6 mb-3">1. Szolgáltató adatai</h2>
                        <ul className="list-disc pl-5 mb-4 space-y-1">
                            <li><strong>Cégnév:</strong> Vibe Code Kft.</li>
                            <li><strong>Székhely:</strong> 2858 Császár, Kisfaludy 68.</li>
                            <li><strong>E-mail:</strong> support@szomszedkosar.hu</li>
                        </ul>

                        <h2 className="text-xl font-bold text-[#1F2937] mt-6 mb-3">2. A szolgáltatás leírása</h2>
                        <p className="mb-4">
                            A SzomszédKosár egy online piactér, amely összeköti a helyi kistermelőket a vásárlókkal.
                            Célunk, hogy elősegítsük a friss, helyi élelmiszerek közvetlen értékesítését.
                        </p>

                        <h2 className="text-xl font-bold text-[#1F2937] mt-6 mb-3">3. Regisztráció és Felhasználás</h2>
                        <p className="mb-4">
                            A weboldal használata regisztrációhoz kötött. A felhasználók lehetnek Vásárlók, Termelők vagy Éttermek/Séfek.
                            A regisztráció során megadott adatok valódiságáért a felhasználó felel.
                        </p>

                        <h2 className="text-xl font-bold text-[#1F2937] mt-6 mb-3">4. Vásárlás és Megrendelés</h2>
                        <p className="mb-4">
                            A vásárlók közvetlenül a termelőktől rendelhetnek. A szerződés a vásárló és a termelő között jön létre.
                            A SzomszédKosár csak a platformot biztosítja a kapcsolatfelvételhez és a tranzakciók lebonyolításához.
                        </p>

                        <h2 className="text-xl font-bold text-[#1F2937] mt-6 mb-3">5. Felelősségvállalás</h2>
                        <p className="mb-4">
                            A SzomszédKosár nem vállal felelősséget a termelők által feltöltött termékek minőségéért vagy a tranzakciók
                            teljesítéséért, de mindent megteszünk a megbízható működés érdekében.
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
