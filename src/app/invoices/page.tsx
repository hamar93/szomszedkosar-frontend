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
    alert('Számlázási adatok mentve!');
  };

  const downloadInvoice = (invoice: Invoice) => {
    alert(`Számla letöltése: ${invoice.invoiceNumber}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#28a745';
      case 'pending': return '#ffc107';
      case 'failed': return '#dc3545';
      default: return '#6c757d';
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
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Simple Header */}
      <div style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '15px 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '24px' }}>🛒</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>SzomszédKosár</div>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>🔍 Böngészés</a>
            <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>📄 Hírfolyam</a>
            <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>Bejelentkezés</a>
            <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>Regisztráció</a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '10px', color: '#333' }}>Számlák és Számlázás</h1>
          <p style={{ color: '#666', fontSize: '16px' }}>Kezeld a számláidat és állítsd be a számlázási adataidat</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
          {/* Billing Settings */}
          <div>
            <div style={{ backgroundColor: 'white', border: '1px solid #ddd', padding: '30px', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '25px', color: '#333' }}>Számlázási Beállítások</h2>
              
              {/* User Type Selection */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '10px' }}>
                  Felhasználó típusa
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="radio"
                      name="userType"
                      value="individual"
                      checked={userType === 'individual'}
                      onChange={(e) => setUserType(e.target.value as 'individual' | 'farmer')}
                      style={{ marginRight: '5px' }}
                    />
                    <span style={{ fontSize: '14px' }}>Magánszemély</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="radio"
                      name="userType"
                      value="farmer"
                      checked={userType === 'farmer'}
                      onChange={(e) => setUserType(e.target.value as 'individual' | 'farmer')}
                      style={{ marginRight: '5px' }}
                    />
                    <span style={{ fontSize: '14px' }}>Őstermelő</span>
                  </label>
                </div>
              </div>

              {/* Billing Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                    {userType === 'farmer' ? 'Gazdaság neve' : 'Teljes név'}
                  </label>
                  <input
                    type="text"
                    value={billingInfo.name}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, name: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    placeholder={userType === 'farmer' ? 'pl. Nagy János Gazdasága' : 'pl. Nagy János'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>Cím</label>
                  <input
                    type="text"
                    value={billingInfo.address}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, address: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    placeholder="1234 Budapest, Kossuth u. 1."
                  />
                </div>

                {userType === 'farmer' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>Adószám</label>
                    <input
                      type="text"
                      value={billingInfo.taxNumber}
                      onChange={(e) => setBillingInfo(prev => ({ ...prev, taxNumber: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="12345678-1-23"
                    />
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>Email cím</label>
                  <input
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    placeholder="nagy.janos@email.com"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>Telefonszám</label>
                  <input
                    type="tel"
                    value={billingInfo.phone}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, phone: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    placeholder="+36 30 123 4567"
                  />
                </div>

                <button
                  onClick={handleSaveBillingInfo}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  Adatok mentése
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div style={{ backgroundColor: '#e7f3ff', border: '1px solid #b3d9ff', borderRadius: '4px', padding: '15px' }}>
              <h3 style={{ color: '#0066cc', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>ℹ️ Fontos információ</h3>
              <p style={{ fontSize: '13px', color: '#004499', lineHeight: '1.4', margin: 0 }}>
                {userType === 'farmer' 
                  ? 'Őstermelőként az áfa-mentes szolgáltatások után nem kell áfát fizetned. A számlákon szerepelni fog az őstermelői státusz.'
                  : 'Magánszemélyként egyszerűsített számlát kapsz, amely tartalmazza az összes szükséges adatot a könyveléshez.'
                }
              </p>
            </div>
          </div>

          {/* Invoices List */}
          <div>
            <div style={{ backgroundColor: 'white', border: '1px solid #ddd', padding: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', margin: 0 }}>Számlák</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <select style={{ 
                    padding: '8px 12px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px', 
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}>
                    <option>Összes számla</option>
                    <option>Fizetve</option>
                    <option>Függőben</option>
                    <option>Sikertelen</option>
                  </select>
                  <button style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Exportálás
                  </button>
                </div>
              </div>

              {/* Invoices Table */}
              <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#666', borderBottom: '1px solid #ddd' }}>Számlaszám</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#666', borderBottom: '1px solid #ddd' }}>Dátum</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#666', borderBottom: '1px solid #ddd' }}>Szolgáltatás</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#666', borderBottom: '1px solid #ddd' }}>Összeg</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#666', borderBottom: '1px solid #ddd' }}>Státusz</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#666', borderBottom: '1px solid #ddd' }}>Műveletek</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, index) => (
                      <tr key={invoice.id} style={{ borderBottom: index < invoices.length - 1 ? '1px solid #eee' : 'none' }}>
                        <td style={{ padding: '12px', fontSize: '14px', fontWeight: '500' }}>
                          {invoice.invoiceNumber}
                        </td>
                        <td style={{ padding: '12px', fontSize: '14px', color: '#666' }}>
                          {new Date(invoice.date).toLocaleDateString('hu-HU')}
                        </td>
                        <td style={{ padding: '12px', fontSize: '14px', color: '#666' }}>
                          {invoice.service}
                        </td>
                        <td style={{ padding: '12px', fontSize: '14px', fontWeight: '500' }}>
                          {invoice.amount.toLocaleString()} Ft
                        </td>
                        <td style={{ padding: '12px', fontSize: '14px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: invoice.status === 'paid' ? '#d4edda' : invoice.status === 'pending' ? '#fff3cd' : '#f8d7da',
                            color: getStatusColor(invoice.status)
                          }}>
                            {getStatusText(invoice.status)}
                          </span>
                        </td>
                        <td style={{ padding: '12px', fontSize: '14px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => downloadInvoice(invoice)}
                              style={{
                                padding: '4px 8px',
                                backgroundColor: '#d4edda',
                                color: '#155724',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '500',
                                cursor: 'pointer'
                              }}
                            >
                              📄 Letöltés
                            </button>
                            <button style={{
                              padding: '4px 8px',
                              backgroundColor: '#e9ecef',
                              color: '#495057',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '500',
                              cursor: 'pointer'
                            }}>
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
              <div style={{ marginTop: '25px', paddingTop: '25px', borderTop: '1px solid #eee' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                  <div style={{ backgroundColor: '#d4edda', borderRadius: '4px', padding: '15px' }}>
                    <div style={{ fontSize: '14px', color: '#155724', fontWeight: '500' }}>Összes fizetett</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#155724' }}>
                      {invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0).toLocaleString()} Ft
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#fff3cd', borderRadius: '4px', padding: '15px' }}>
                    <div style={{ fontSize: '14px', color: '#856404', fontWeight: '500' }}>Függőben</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>
                      {invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0).toLocaleString()} Ft
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#cce7ff', borderRadius: '4px', padding: '15px' }}>
                    <div style={{ fontSize: '14px', color: '#004085', fontWeight: '500' }}>Idei összes</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#004085' }}>
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