'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
    ShoppingBasket,
    MapPin,
    Menu,
    X,
    User,
    LogOut,
    Settings,
    Package,
    PlusCircle
} from 'lucide-react';

export default function Header() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Mock location for now, ideally this comes from a context or store
    const [userLocation] = useState<{ city: string } | null>(
        typeof window !== 'undefined' && localStorage.getItem('szomszedkosar_user_location')
            ? JSON.parse(localStorage.getItem('szomszedkosar_user_location')!)
            : null
    );

    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1B4332] rounded-xl flex items-center justify-center shadow-sm">
                            <ShoppingBasket className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-[#1B4332] tracking-tight hidden sm:block">
                            SzomszédKosár
                        </span>
                    </Link>

                    {/* DESKTOP NAVIGATION */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/feed" className="text-[#1B4332] font-bold transition hover:text-[#2D6A4F]">
                            Hírfolyam
                        </Link>
                        <Link href="/termelok" className="text-gray-600 hover:text-[#1B4332] font-medium transition">
                            Termelők
                        </Link>
                        <Link href="/rolunk" className="text-gray-600 hover:text-[#1B4332] font-medium transition">
                            Rólunk
                        </Link>
                    </nav>

                    {/* RIGHT SIDE ACTIONS */}
                    <div className="hidden md:flex items-center gap-4">

                        {/* Location Badge */}
                        {userLocation && (
                            <div className="flex items-center gap-2 text-sm text-[#1B4332] font-bold bg-[#E8ECE9] px-3 py-1.5 rounded-full">
                                <MapPin size={14} />
                                {userLocation.city}
                            </div>
                        )}

                        {session ? (
                            <div className="flex items-center gap-4">
                                {/* Upload Button */}
                                <Link
                                    href="/add-product"
                                    className="bg-[#1B4332] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#2D6A4F] transition shadow-md flex items-center gap-2"
                                >
                                    <PlusCircle size={16} />
                                    Termék feltöltése
                                </Link>

                                {/* User Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                                    >
                                        <User size={20} className="text-gray-700" />
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                                            <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                                <p className="text-sm font-bold text-gray-900 truncate">{session.user?.name || 'Felhasználó'}</p>
                                                <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                                            </div>

                                            <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                <User size={16} /> Profil
                                            </Link>
                                            <Link href="/add-product" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                <PlusCircle size={16} /> Új termék
                                            </Link>

                                            <div className="border-t border-gray-100 mt-1 pt-1">
                                                <button
                                                    onClick={() => signOut({ callbackUrl: '/' })}
                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                                                >
                                                    <LogOut size={16} /> Kijelentkezés
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login" className="px-5 py-2.5 text-[#1B4332] font-bold hover:bg-[#F0F4F1] rounded-xl transition">
                                    Belépés
                                </Link>
                                <Link href="/register" className="px-5 py-2.5 bg-[#1B4332] text-white font-bold hover:bg-[#2D6A4F] rounded-xl transition shadow-md">
                                    Regisztráció
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* MOBILE MENU TOGGLE */}
                    <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 p-4 shadow-lg">
                    <nav className="flex flex-col gap-4">
                        <Link href="/feed" className="text-lg font-bold text-[#1B4332]">Hírfolyam</Link>
                        <Link href="/termelok" className="text-lg font-medium text-gray-700">Termelők</Link>
                        <Link href="/rolunk" className="text-lg font-medium text-gray-700">Rólunk</Link>

                        <hr className="border-gray-100" />

                        {session ? (
                            <>
                                <Link href="/add-product" className="flex items-center gap-2 text-[#1B4332] font-bold">
                                    <PlusCircle size={18} /> Termék feltöltése
                                </Link>
                                <Link href="/profile" className="flex items-center gap-2 text-gray-700">
                                    <User size={18} /> Profilom
                                </Link>
                                <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-2 text-red-600 font-medium text-left">
                                    <LogOut size={18} /> Kijelentkezés
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-[#1B4332] font-bold">Belépés</Link>
                                <Link href="/register" className="text-[#1B4332] font-bold">Regisztráció</Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
