'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Download,
  Eye,
  CreditCard,
  User,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Save,
  Info,
  Filter,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  service: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceNumber: string;
  downloadUrl: string;
}

export default function InvoicesPage() {
  const [userType, setUserType] = useState<'individual' | 'farmer'>('individual');
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    taxNumber: '',
    email: '',
    phone: ''
  });

  const [invoices] = useState<Invoice[]>([
    {
      id: '1',
      date: '2024-12-15',
      service: 'Push értesítés (5 db)',
      amount: 2500,
      status: 'paid',
      invoiceNumber: 'SZK-2024-001',
      downloadUrl: '#'
    },
    {
      id: '2',
      date: '2024-12-10',
      service: 'Hírfolyam kiemelés (3 nap)',
      amount: 2400,
      status: 'paid',
      invoiceNumber: 'SZK-2024-002',
      downloadUrl: '#'
    },
    {
      id: '3',
      date: '2024-12-08',
      service: 'Kombinált csomag',
      amount: 1100,
      status: 'paid',
      invoiceNumber: 'SZK-2024-003',
      downloadUrl: '#'
    },
    {
      id: '4',
      date: '2024-12-05',
      service: 'Push értesítés (2 db)',
      amount: 1000,
      status: 'pending',
      invoiceNumber: 'SZK-2024-004',
      downloadUrl: '#'
    }
  ]);

  const handleSaveBillingInfo = () => {
    alert('Számlázási adatok mentve!');
  };

  const downloadInvoice = (invoice: Invoice) => {
    alert(`Számla letöltése: ${invoice.invoiceNumber}`);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid': return { text: 'Fizetve', color: 'bg-green-100 text-green-700', icon: CheckCircle };
      case 'pending': return { text: 'Függőben', color: 'bg-yellow-100 text-yellow-700', icon: Clock };
      case 'failed': return { text: 'Sikertelen', color: 'bg-red-100 text-red-700', icon: AlertCircle };
      default: return { text: 'Ismeretlen', color: 'bg-gray-100 text-gray-700', icon: Info };
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-600">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold text-[#1F2937] flex items-center gap-2">
              <FileText size={24} className="text-[#1B4332]" />
              Számlák és Pénzügyek
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN - BILLING SETTINGS */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-[#F9FAFB]">
                <h2 className="text-lg font-bold text-[#1F2937] flex items-center gap-2">
                  <CreditCard size={20} className="text-[#1B4332]" />
                  Számlázási adatok
                </h2>
              </div>

              <div className="p-6 space-y-6">

                {/* User Type */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Felhasználó típusa</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setUserType('individual')}
                      className={`p-3 rounded-xl border-2 text-sm font-bold flex flex-col items-center gap-2 transition-all ${userType === 'individual'
                          ? 'border-[#1B4332] bg-[#F0F4F1] text-[#1B4332]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-500'
                        }`}
                    >
                      <User size={20} />
                      Magánszemély
                    </button>
                    <button
                      onClick={() => setUserType('farmer')}
                      className={`p-3 rounded-xl border-2 text-sm font-bold flex flex-col items-center gap-2 transition-all ${userType === 'farmer'
                          ? 'border-[#1B4332] bg-[#F0F4F1] text-[#1B4332]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-500'
                        }`}
                    >
                      <Briefcase size={20} />
                      Őstermelő
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">
                      {userType === 'farmer' ? 'Gazdaság neve' : 'Teljes név'}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={billingInfo.name}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all"
                        placeholder={userType === 'farmer' ? 'pl. Nagy János Gazdasága' : 'pl. Nagy János'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Cím</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={billingInfo.address}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all"
                        placeholder="1234 Budapest, Kossuth u. 1."
                      />
                    </div>
                  </div>

                  {userType === 'farmer' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Adószám</label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          value={billingInfo.taxNumber}
                          onChange={(e) => setBillingInfo(prev => ({ ...prev, taxNumber: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all"
                          placeholder="12345678-1-23"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Email cím</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all"
                        placeholder="nagy.janos@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Telefonszám</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        value={billingInfo.phone}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all"
                        placeholder="+36 30 123 4567"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSaveBillingInfo}
                  className="w-full bg-[#1B4332] text-white py-3 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Adatok mentése
                </button>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                  <Info className="text-blue-600 flex-shrink-0" size={20} />
                  <p className="text-xs text-blue-800 leading-relaxed">
                    {userType === 'farmer'
                      ? 'Őstermelőként az áfa-mentes szolgáltatások után nem kell áfát fizetned. A számlákon szerepelni fog az őstermelői státusz.'
                      : 'Magánszemélyként egyszerűsített számlát kapsz, amely tartalmazza az összes szükséges adatot a könyveléshez.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - INVOICE LIST */}
          <div className="lg:col-span-2 space-y-6">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-xs font-bold text-gray-500 uppercase mb-1">Összes fizetett</div>
                <div className="text-2xl font-bold text-green-600">
                  {invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0).toLocaleString()} Ft
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-xs font-bold text-gray-500 uppercase mb-1">Függőben</div>
                <div className="text-2xl font-bold text-yellow-600">
                  {invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0).toLocaleString()} Ft
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-xs font-bold text-gray-500 uppercase mb-1">Idei összes</div>
                <div className="text-2xl font-bold text-[#1B4332]">
                  {invoices.reduce((sum, i) => sum + i.amount, 0).toLocaleString()} Ft
                </div>
              </div>
            </div>

            {/* Invoices Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-lg font-bold text-[#1F2937]">Számlák</h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-grow sm:flex-grow-0">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <select className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm font-medium outline-none focus:border-[#1B4332]">
                      <option>Összes számla</option>
                      <option>Fizetve</option>
                      <option>Függőben</option>
                      <option>Sikertelen</option>
                    </select>
                  </div>
                  <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-100 transition flex items-center gap-2 border border-gray-200">
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase">Számlaszám</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase">Dátum</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase">Szolgáltatás</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Összeg</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Státusz</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Műveletek</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {invoices.map((invoice) => {
                      const statusConfig = getStatusConfig(invoice.status);
                      return (
                        <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 text-sm font-bold text-[#1F2937]">{invoice.invoiceNumber}</td>
                          <td className="p-4 text-sm text-gray-500">{new Date(invoice.date).toLocaleDateString('hu-HU')}</td>
                          <td className="p-4 text-sm text-gray-600">{invoice.service}</td>
                          <td className="p-4 text-sm font-bold text-[#1F2937] text-right">{invoice.amount.toLocaleString()} Ft</td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${statusConfig.color}`}>
                              <statusConfig.icon size={12} />
                              {statusConfig.text}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => downloadInvoice(invoice)}
                                className="p-2 text-gray-400 hover:text-[#1B4332] hover:bg-green-50 rounded-lg transition"
                                title="Letöltés"
                              >
                                <Download size={18} />
                              </button>
                              <button
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="Megtekintés"
                              >
                                <Eye size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}