'use client';

import { useState } from 'react';

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
    // In real app, this would save to backend
    alert('Számlázási adatok mentve!');
  };

  const downloadInvoice = (invoice: Invoice) => {
    // In real app, this would download the actual PDF
    alert(`Számla letöltése: ${invoice.invoiceNumber}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Fizetve';
      case 'pending': return 'Függőben';
      case 'failed': return 'Sikertelen';
      default: return 'Ismeretlen';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              🛒
            </div>
            <div className="text-xl font-bold text-gray-900">SzomszédKosár</div>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-green-600 font-medium">🔍 Böngészés</a>
            <a href="#" className="text-gray-600 hover:text-green-600 font-medium">📄 Hírfolyam</a>
            <a href="#" className="text-gray-600 hover:text-green-600 font-medium">Bejelentkezés</a>
            <a href="#" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">Regisztráció</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Számlák és Számlázás</h1>
          <p className="text-lg text-gray-600">Kezeld a számláidat és állítsd be a számlázási adataidat</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Billing Settings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Számlázási Beállítások</h2>
              
              {/* User Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Felhasználó típusa</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="userType"
                      value="individual"
                      checked={userType === 'individual'}
                      onChange={(e) => setUserType(e.target.value as 'individual' | 'farmer')}
                      className="w-4 h-4 accent-green-600"
                    />
                    <span className="text-sm text-gray-700">Magánszemély</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="userType"
                      value="farmer"
                      checked={userType === 'farmer'}
                      onChange={(e) => setUserType(e.target.value as 'individual' | 'farmer')}
                      className="w-4 h-4 accent-green-600"
                    />
                    <span className="text-sm text-gray-700">Őstermelő</span>
                  </label>
                </div>
              </div>

              {/* Billing Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {userType === 'farmer' ? 'Gazdaság neve' : 'Teljes név'}
                  </label>
                  <input
                    type="text"
                    value={billingInfo.name}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={userType === 'farmer' ? 'pl. Nagy János Gazdasága' : 'pl. Nagy János'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cím</label>
                  <input
                    type="text"
                    value={billingInfo.address}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="1234 Budapest, Kossuth u. 1."
                  />
                </div>

                {userType === 'farmer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adószám</label>
                    <input
                      type="text"
                      value={billingInfo.taxNumber}
                      onChange={(e) => setBillingInfo(prev => ({ ...prev, taxNumber: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="12345678-1-23"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email cím</label>
                  <input
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="nagy.janos@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefonszám</label>
                  <input
                    type="tel"
                    value={billingInfo.phone}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="+36 30 123 4567"
                  />
                </div>

                <button
                  onClick={handleSaveBillingInfo}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Adatok mentése
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-blue-800 font-medium mb-2">ℹ️ Fontos információ</h3>
              <p className="text-sm text-blue-700 leading-relaxed">
                {userType === 'farmer' 
                  ? 'Őstermelőként az áfa-mentes szolgáltatások után nem kell áfát fizetned. A számlákon szerepelni fog az őstermelői státusz.'
                  : 'Magánszemélyként egyszerűsített számlát kapsz, amely tartalmazza az összes szükséges adatot a könyveléshez.'
                }
              </p>
            </div>
          </div>

          {/* Invoices List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Számlák</h2>
                <div className="flex items-center gap-4">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option>Összes számla</option>
                    <option>Fizetve</option>
                    <option>Függőben</option>
                    <option>Sikertelen</option>
                  </select>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                    Exportálás
                  </button>
                </div>
              </div>

              {/* Invoices Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Számlaszám</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Dátum</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Szolgáltatás</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Összeg</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Státusz</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Műveletek</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {new Date(invoice.date).toLocaleDateString('hu-HU')}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {invoice.service}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {invoice.amount.toLocaleString()} Ft
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                            {getStatusText(invoice.status)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => downloadInvoice(invoice)}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-medium hover:bg-green-200"
                            >
                              📄 Letöltés
                            </button>
                            <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-xs font-medium hover:bg-gray-200">
                              👁️ Megtekintés
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-green-600 font-medium">Összes fizetett</div>
                    <div className="text-2xl font-bold text-green-800">
                      {invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0).toLocaleString()} Ft
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="text-sm text-yellow-600 font-medium">Függőben</div>
                    <div className="text-2xl font-bold text-yellow-800">
                      {invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0).toLocaleString()} Ft
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-600 font-medium">Idei összes</div>
                    <div className="text-2xl font-bold text-blue-800">
                      {invoices.reduce((sum, i) => sum + i.amount, 0).toLocaleString()} Ft
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}