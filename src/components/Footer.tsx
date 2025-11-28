import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-[#1B4332] text-white py-12 mt-auto">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-2xl">🧺</span> SzomszédKosár
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Közvetlen kapcsolat a helyi termelők és a vásárlók között.
                            Friss, házi ízek a szomszédból.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-[#dcfce7]">Felfedezés</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/search" className="hover:text-white transition-colors">Termékek böngészése</Link></li>
                            <li><Link href="/feed" className="hover:text-white transition-colors">Friss ajánlatok</Link></li>
                            <li><Link href="/map" className="hover:text-white transition-colors">Térkép nézet</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-[#dcfce7]">Információk</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/about" className="hover:text-white transition-colors">Rólunk</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Kapcsolat</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">Gyakori kérdések</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-[#dcfce7]">Jogi nyilatkozat</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/terms" className="hover:text-white transition-colors">Általános Szerződési Feltételek</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Adatvédelmi tájékoztató</Link></li>
                            <li><Link href="/cookies" className="hover:text-white transition-colors">Süti kezelés</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#2d5c45] pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} SzomszédKosár. Minden jog fenntartva.</p>
                </div>
            </div>
        </footer>
    )
}
