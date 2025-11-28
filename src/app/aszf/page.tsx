'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AszfPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F0] flex flex-col font-sans text-[#1F2937]">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-4xl font-bold text-[#1B4332] mb-4">Általános Szerződési Feltételek</h1>
                <p className="text-xl text-gray-600">Ez az oldal jelenleg fejlesztés alatt áll. Hamarosan érkezünk!</p>
            </main>
            <Footer />
        </div>
    );
}
