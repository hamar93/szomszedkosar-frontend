'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Check,
  Minus,
  Plus,
  ArrowLeft,
  ShieldCheck,
  Zap,
  BarChart,
  Headphones,
  ShoppingBag,
  Bell,
  Star,
  Layout
} from 'lucide-react';

export default function PaymentPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [quantities, setQuantities] = useState({
    push: 1,
    highlight: 1,
    combo: 1
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('simplepay');
  const [addons, setAddons] = useState({
    priority: false,
    analytics: false,
    support: false
  });

  const services = {
    push: {
      id: 'push',
      title: 'Push Értesítés',
      description: 'Célzott push értesítés küldése a kiválasztott körzetben (10-30 km). Azonnal értesítsd a vásárlókat új termékeidről!',
      price: 500,
      unit: '/ darab',
      icon: Bell,
      features: [
        'Célzott körzet kiválasztása',
        'Azonnali kézbesítés',
        'Részletes statisztikák',
        'Megnézések száma'
      ]
    },
    highlight: {
      id: 'highlight',
      title: 'Hírfolyam Kiemelés',
      description: 'A termékeid kiemelt helyen jelennek meg a hírfolyamban. Több vásárló fogja látni a hirdetéseidet!',
      price: 800,
      unit: '/ nap',
      icon: Star,
      features: [
        'Kiemelt pozíció a hírfolyamban',
        'Színes keret a hirdetés körül',
        '3x több megtekintés',
        'Prioritás a keresésben'
      ]
    },
    combo: {
      id: 'combo',
      title: 'Kombinált Csomag',
      description: 'Push értesítés + hírfolyam kiemelés egyben. Maximális láthatóság a legjobb áron!',
      price: 1100,
      unit: '/ csomag',
      icon: Layout,
      features: [
        'Push értesítés + kiemelés',
        '200 Ft megtakarítás',
        'Koordinált kampány',
        'Prioritás támogatás'
      ]
    }
  };

  const paymentMethods = [
    {
      id: 'simplepay',
      title: 'SimplePay',
      description: 'Bankkártya vagy azonnali átutalás',
      icon: CreditCard
    },
    {
      id: 'transfer',
      title: 'Banki átutalás',
      description: 'Hagyományos átutalás',
      icon: ShoppingBag // Using ShoppingBag as a placeholder for Bank icon if Bank is not available, or use Building
    }
  ];

  const selectService = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const changeQuantity = (service: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [service]: Math.max(1, Math.min(50, prev[service as keyof typeof prev] + delta))
    }));
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    const service = services[selectedService as keyof typeof services];
    const quantity = quantities[selectedService as keyof typeof quantities];
    let total = service.price * quantity;

    // Add addon costs
    if (addons.priority) total += 200;
    if (addons.analytics) total += 300;
    if (addons.support) total += 500;

    return total;
  };

  const handleCheckout = () => {
    if (!selectedService) return;
    alert(`Fizetés indítása: ${calculateTotal()} Ft`);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-600">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold text-[#1F2937] flex items-center gap-2">
              <CreditCard size={24} className="text-[#1B4332]" />
              Szolgáltatások vásárlása
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-3">Növeld eladásaidat!</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Válassz promóciós eszközeink közül, és érd el gyorsabban a környékbeli vásárlókat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT COLUMN - SERVICES */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Válassz szolgáltatást</h3>

            <div className="space-y-4">
              {Object.entries(services).map(([key, service]) => (
                <div
                  key={key}
                  onClick={() => selectService(key)}
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 group ${selectedService === key
                      ? 'bg-white border-[#1B4332] shadow-md'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                >
                  {selectedService === key && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-[#1B4332] text-white rounded-full flex items-center justify-center">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${selectedService === key ? 'bg-[#E8ECE9] text-[#1B4332]' : 'bg-gray-100 text-gray-500'
                      }`}>
                      <service.icon size={24} />
                    </div>

                    <div className="flex-grow">
                      <h4 className="text-lg font-bold text-[#1F2937] mb-1">{service.title}</h4>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-2xl font-bold text-[#1B4332]">{service.price.toLocaleString()} Ft</span>
                        <span className="text-sm text-gray-500 font-medium">{service.unit}</span>
                      </div>

                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <Check size={14} className="text-[#1B4332]" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {selectedService === key && (
                        <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                          <span className="text-sm font-bold text-gray-700">Mennyiség:</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => { e.stopPropagation(); changeQuantity(key, -1); }}
                              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-bold text-[#1F2937]">
                              {quantities[key as keyof typeof quantities]}
                            </span>
                            <button
                              onClick={(e) => { e.stopPropagation(); changeQuantity(key, 1); }}
                              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Addons for Push */}
                  {selectedService === key && key === 'push' && (
                    <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100 animate-in fade-in slide-in-from-top-2">
                      <h5 className="text-sm font-bold text-gray-700 mb-3">Kiegészítő opciók</h5>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer group/addon">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${addons.priority ? 'bg-[#1B4332] border-[#1B4332]' : 'bg-white border-gray-300'}`}>
                            {addons.priority && <Check size={12} className="text-white" />}
                          </div>
                          <input type="checkbox" className="hidden" checked={addons.priority} onChange={(e) => setAddons(prev => ({ ...prev, priority: e.target.checked }))} />
                          <span className="text-sm text-gray-600 flex items-center gap-2">
                            <Zap size={14} className="text-orange-500" />
                            Prioritás kézbesítés (+200 Ft)
                          </span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group/addon">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${addons.analytics ? 'bg-[#1B4332] border-[#1B4332]' : 'bg-white border-gray-300'}`}>
                            {addons.analytics && <Check size={12} className="text-white" />}
                          </div>
                          <input type="checkbox" className="hidden" checked={addons.analytics} onChange={(e) => setAddons(prev => ({ ...prev, analytics: e.target.checked }))} />
                          <span className="text-sm text-gray-600 flex items-center gap-2">
                            <BarChart size={14} className="text-blue-500" />
                            Részletes statisztika (+300 Ft)
                          </span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group/addon">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${addons.support ? 'bg-[#1B4332] border-[#1B4332]' : 'bg-white border-gray-300'}`}>
                            {addons.support && <Check size={12} className="text-white" />}
                          </div>
                          <input type="checkbox" className="hidden" checked={addons.support} onChange={(e) => setAddons(prev => ({ ...prev, support: e.target.checked }))} />
                          <span className="text-sm text-gray-600 flex items-center gap-2">
                            <Headphones size={14} className="text-purple-500" />
                            Prémium támogatás (+500 Ft)
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - CHECKOUT */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Összesítés és Fizetés</h3>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">

              {selectedService ? (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Szolgáltatás</span>
                      <span className="font-bold text-[#1F2937]">{services[selectedService as keyof typeof services].title}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Mennyiség</span>
                      <span className="font-bold text-[#1F2937]">{quantities[selectedService as keyof typeof quantities]} db</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Egységár</span>
                      <span className="font-bold text-[#1F2937]">{services[selectedService as keyof typeof services].price.toLocaleString()} Ft</span>
                    </div>

                    {(addons.priority || addons.analytics || addons.support) && (
                      <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-100">
                        <span className="text-gray-600">Kiegészítők</span>
                        <span className="font-bold text-[#1F2937]">
                          +{(addons.priority ? 200 : 0) + (addons.analytics ? 300 : 0) + (addons.support ? 500 : 0)} Ft
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-lg font-bold text-[#1F2937]">Összesen fizetendő</span>
                      <span className="text-2xl font-bold text-[#1B4332]">{calculateTotal().toLocaleString()} Ft</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h4 className="text-sm font-bold text-gray-700">Fizetési mód</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedPaymentMethod === method.id
                              ? 'bg-[#F0F4F1] border-[#1B4332]'
                              : 'bg-white border-gray-200 hover:border-gray-300'
                            }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedPaymentMethod === method.id ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-500'
                            }`}>
                            <method.icon size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[#1F2937]">{method.title}</div>
                            <div className="text-xs text-gray-500">{method.description}</div>
                          </div>
                          {selectedPaymentMethod === method.id && (
                            <div className="ml-auto text-[#1B4332]">
                              <Check size={18} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#1B4332] text-white py-4 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-lg flex items-center justify-center gap-2 text-lg"
                  >
                    Fizetés indítása
                  </button>

                  <div className="mt-6 bg-green-50 p-4 rounded-xl border border-green-100 flex gap-3">
                    <ShieldCheck className="text-green-700 flex-shrink-0" size={20} />
                    <p className="text-xs text-green-800 leading-relaxed">
                      A fizetés SimplePay rendszeren keresztül történik, amely teljes mértékben biztonságos.
                      Adataidat titkosítva kezeljük.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Válassz egy szolgáltatást a bal oldali listából a folytatáshoz.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}