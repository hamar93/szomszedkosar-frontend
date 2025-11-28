'use client'
import { useState } from 'react'
import Link from 'next/link'

import Header from '@/components/Header'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleGoogleLogin = () => {
    console.log('Google bejelentkezés')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Bejelentkezés:', formData)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />

      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <div className="max-w-[400px] w-full">

          {/* Welcome Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-white to-[#f0fdf4] rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#dcfce7]">
              <span className="text-4xl">👋</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Üdvözlünk vissza!
            </h1>
            <p className="text-gray-500">
              Jelentkezz be a fiókodba
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit}>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  E-mail cím
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base outline-none transition-all focus:border-[#16a34a]"
                  placeholder="janos@example.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jelszó
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base outline-none transition-all focus:border-[#16a34a]"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#16a34a]"
                  />
                  Emlékezz rám
                </label>

                <Link href="/forgot-password" className="text-sm text-[#16a34a] font-medium hover:underline">
                  Elfelejtett jelszó?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-br from-[#16a34a] to-[#15803d] text-white border-none rounded-2xl py-4 text-lg font-semibold cursor-pointer shadow-lg shadow-green-700/20 transition-transform hover:-translate-y-0.5 hover:shadow-green-700/30 mb-4"
              >
                Bejelentkezés 🚀
              </button>

              <div className="relative text-center mb-4">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
                <span className="relative bg-white px-4 text-sm text-gray-500">
                  vagy
                </span>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 text-base font-semibold cursor-pointer transition-colors flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 mb-6"
              >
                <span className="text-xl">🔍</span>
                <span>Bejelentkezés Google-lal</span>
              </button>

              {/* Register Link */}
              <div className="text-center">
                <span className="text-gray-500">Nincs még fiókod? </span>
                <Link href="/register" className="text-[#16a34a] font-semibold hover:underline">
                  Regisztráció
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}