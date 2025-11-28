'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './Logo'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        // Simple check for login status
        const userId = localStorage.getItem('userId')
        setIsLoggedIn(!!userId)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
        setIsLoggedIn(false)
        window.location.href = '/'
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-[70px]">
                {/* Logo */}
                <Link href="/" className="no-underline">
                    <Logo />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/search" className="text-gray-700 font-semibold hover:text-[#1B4332] transition-colors">
                        🔍 Böngészés
                    </Link>

                    <Link href="/feed" className="text-gray-700 font-semibold hover:text-[#1B4332] transition-colors">
                        📰 Hírfolyam
                    </Link>

                    {isLoggedIn && (
                        <Link href="/add-product" className="text-gray-700 font-semibold hover:text-[#1B4332] transition-colors">
                            ➕ Termék hozzáadása
                        </Link>
                    )}
                </nav>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {!isLoggedIn ? (
                        <>
                            <Link href="/login" className="px-4 py-2 bg-[#1B4332] text-white rounded-lg font-semibold hover:bg-[#143326] transition-colors">
                                Belépés
                            </Link>
                            <Link href="/register" className="px-4 py-2 border border-[#1B4332] text-[#1B4332] rounded-lg font-semibold hover:bg-[#f0fdf4] transition-colors">
                                Regisztráció
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/profile" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                                Profil
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Kijelentkezés
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-gray-800 text-2xl"
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-[70px] left-0 right-0 bg-white border-t border-gray-100 shadow-lg p-4 flex flex-col gap-4">
                    <Link href="/search" className="py-2 text-gray-700 font-semibold border-b border-gray-100">
                        🔍 Böngészés
                    </Link>

                    <Link href="/feed" className="py-2 text-gray-700 font-semibold border-b border-gray-100">
                        📰 Hírfolyam
                    </Link>

                    {isLoggedIn && (
                        <Link href="/add-product" className="py-2 text-gray-700 font-semibold border-b border-gray-100">
                            ➕ Termék hozzáadása
                        </Link>
                    )}

                    {!isLoggedIn ? (
                        <div className="flex flex-col gap-3 mt-2">
                            <Link href="/login" className="w-full py-3 bg-[#1B4332] text-white text-center rounded-lg font-semibold">
                                Belépés
                            </Link>
                            <Link href="/register" className="w-full py-3 border border-[#1B4332] text-[#1B4332] text-center rounded-lg font-semibold">
                                Regisztráció
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 mt-2">
                            <Link href="/profile" className="w-full py-3 bg-gray-100 text-gray-700 text-center rounded-lg font-semibold">
                                Profil
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full py-3 border border-gray-200 text-gray-600 rounded-lg"
                            >
                                Kijelentkezés
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}
