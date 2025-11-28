'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  ShoppingBasket,
  Sprout,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  ArrowRight,
  Check,
  Search
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'buyer' | 'producer'>('buyer');
  const [isOccasionalSeller, setIsOccasionalSeller] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    businessDescription: ''
  });

  const handleGoogleRegister = () => {
    console.log('Google regisztráció');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Regisztráció:', { ...formData, userType, isOccasionalSeller });

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: userType, // 'buyer' or 'producer'
        city: formData.address, // Mapping address to city for now
        bio: formData.businessDescription
      };

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, payload);

      alert('Sikeres regisztráció! Kérjük, jelentkezz be.');
      router.push('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(error.response?.data?.message || 'Hiba történt a regisztráció során.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937] flex flex-col">

      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1B4332] rounded-xl flex items-center justify-center shadow-sm">
                <ShoppingBasket className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-[#1B4332] tracking-tight">
                SzomszédKosár
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#1F2937] mb-4">Csatlakozz a közösséghez!</h1>
            <p className="text-xl text-gray-600">
              Vásárolj frisset, vagy add el saját termékeidet.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* USER TYPE SELECTION */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">Hogyan szeretnéd használni?</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setUserType('buyer')}
                      className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 flex items-start gap-4 ${userType === 'buyer'
                        ? 'border-[#1B4332] bg-[#F0F4F1] ring-1 ring-[#1B4332]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <div className={`p-3 rounded-xl ${userType === 'buyer' ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <ShoppingBasket size={24} />
                      </div>
                      <div>
                        <span className={`block text-lg font-bold mb-1 ${userType === 'buyer' ? 'text-[#1B4332]' : 'text-gray-900'}`}>Vásárló vagyok</span>
                        <span className="text-sm text-gray-600">Helyi termékeket keresek a családomnak.</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUserType('producer')}
                      className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 flex items-start gap-4 ${userType === 'producer'
                        ? 'border-[#1B4332] bg-[#F0F4F1] ring-1 ring-[#1B4332]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <div className={`p-3 rounded-xl ${userType === 'producer' ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <Sprout size={24} />
                      </div>
                      <div>
                        <span className={`block text-lg font-bold mb-1 ${userType === 'producer' ? 'text-[#1B4332]' : 'text-gray-900'}`}>Termelő vagyok</span>
                        <span className="text-sm text-gray-600">Saját termesztésű árut szeretnék eladni.</span>
                      </div>
                    </button>
                  </div>

                  {userType === 'buyer' && (
                    <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-3">
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          checked={isOccasionalSeller}
                          onChange={(e) => setIsOccasionalSeller(e.target.checked)}
                          className="w-5 h-5 rounded border-gray-300 text-[#1B4332] focus:ring-[#1B4332]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 cursor-pointer" onClick={() => setIsOccasionalSeller(!isOccasionalSeller)}>
                          Alkalmi eladó is lennék
                        </label>
                        <p className="text-sm text-gray-600 mt-1">
                          Néha van felesleges termésem (max. 5 hirdetés/hó), de nem vagyok őstermelő.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <hr className="border-gray-100" />

                {/* FORM FIELDS */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Teljes név</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                          placeholder="Kiss János"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">E-mail cím</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                          placeholder="janos@pelda.hu"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Telefonszám</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                          placeholder="+36 30 123 4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Jelszó</label>
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Jelszó megerősítése</label>
                      <input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Település / Cím</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                          placeholder="Eger, Fő utca 1."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {(userType === 'producer' || isOccasionalSeller) && (
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {userType === 'producer' ? 'Gazdaság bemutatása' : 'Mit szeretnél eladni?'}
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                      <textarea
                        required={userType === 'producer'}
                        value={formData.businessDescription}
                        onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                        rows={3}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all bg-white"
                        placeholder={userType === 'producer' ? "Pl. Családi gazdaságunk 20 éve foglalkozik..." : "Pl. Házi lekvárokat készítek..."}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <input type="checkbox" required className="mt-1 w-5 h-5 rounded border-gray-300 text-[#1B4332] focus:ring-[#1B4332]" />
                  <span className="text-sm text-gray-600">
                    Elfogadom az <Link href="/terms" className="text-[#1B4332] font-semibold hover:underline">Általános Szerződési Feltételeket</Link> és az <Link href="/privacy" className="text-[#1B4332] font-semibold hover:underline">Adatkezelési Tájékoztatót</Link>.
                  </span>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full bg-[#1B4332] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2D6A4F] transition shadow-md flex items-center justify-center gap-2"
                  >
                    Regisztráció
                    <ArrowRight size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={handleGoogleRegister}
                    className="w-full bg-white border border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <Search size={20} />
                    Regisztráció Google fiókkal
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-gray-600">
                    Van már fiókod?{' '}
                    <Link href="/login" className="text-[#1B4332] font-bold hover:underline">
                      Jelentkezz be
                    </Link>
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}