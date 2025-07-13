'use client';

import { useState } from 'react';

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
      title: 'Push Értesítés',
      description: 'Célzott push értesítés küldése a kiválasztott körzetben (10-30 km). Azonnal értesítsd a vásárlókat új termékeidről!',
      price: 500,
      unit: '/ darab',
      features: [
        'Célzott körzet kiválasztása',
        'Azonnali kézbesítés',
        'Részletes statisztikák',
        'Megnézések száma'
      ]
    },
    highlight: {
      title: 'Hírfolyam Kiemelés',
      description: 'A termékeid kiemelt helyen jelennek meg a hírfolyamban. Több vásárló fogja látni a hirdetéseidet!',
      price: 800,
      unit: '/ nap',
      features: [
        'Kiemelt pozíció a hírfolyamban',
        'Színes keret a hirdetés körül',
        '3x több megtekintés',
        'Prioritás a keresésben'
      ]
    },
    combo: {
      title: 'Kombinált Csomag',
      description: 'Push értesítés + hírfolyam kiemelés egyben. Maximális láthatóság a legjobb áron!',
      price: 1100,
      unit: '/ csomag',
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
      icon: '💳'
    },
    {
      id: 'transfer',
      title: 'Banki átutalás',
      description: 'Hagyományos átutalás',
      icon: '🏦'
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

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px 20px' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '10px', color: '#333' }}>Fizetés</h1>
          <p style={{ color: '#666', fontSize: '16px' }}>Válaszd ki a szolgáltatást és fizess SimplePay rendszeren keresztül</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {/* Service Selection */}
          <div style={{ backgroundColor: 'white', border: '1px solid #ddd', padding: '30px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '25px', color: '#333' }}>Szolgáltatások</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {Object.entries(services).map(([key, service]) => (
                <div
                  key={key}
                  style={{
                    backgroundColor: '#f8f9fa',
                    border: selectedService === key ? '2px solid #28a745' : '2px solid #e9ecef',
                    borderRadius: '8px',
                    padding: '20px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => selectService(key)}
                >
                  {selectedService === key && (
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ✓
                    </div>
                  )}
                  
                  <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                    {service.title}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '15px', lineHeight: '1.5' }}>
                    {service.description}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745', marginBottom: '10px' }}>
                    {service.price.toLocaleString()} Ft 
                    <span style={{ fontSize: '14px', color: '#666', fontWeight: 'normal' }}>{service.unit}</span>
                  </div>
                  
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {service.features.map((feature, index) => (
                      <li key={index} style={{ fontSize: '13px', color: '#666', marginBottom: '4px', paddingLeft: '15px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#28a745' }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {selectedService === key && (
                    <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeQuantity(key, -1);
                        }}
                        style={{
                          width: '30px',
                          height: '30px',
                          border: '1px solid #ddd',
                          backgroundColor: 'white',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantities[key as keyof typeof quantities]}
                        onChange={(e) => {
                          const value = Math.max(1, Math.min(50, parseInt(e.target.value) || 1));
                          setQuantities(prev => ({ ...prev, [key]: value }));
                        }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: '60px',
                          textAlign: 'center',
                          padding: '6px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                        min="1"
                        max="50"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeQuantity(key, 1);
                        }}
                        style={{
                          width: '30px',
                          height: '30px',
                          border: '1px solid #ddd',
                          backgroundColor: 'white',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                      <span style={{ fontSize: '12px', color: '#666', marginLeft: '10px' }}>Max 50 db</span>
                    </div>
                  )}

                  {selectedService === key && key === 'push' && (
                    <div style={{ 
                      marginTop: '15px', 
                      padding: '15px', 
                      backgroundColor: '#f0f0f0', 
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }}>
                      <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>Kiegészítő opciók</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="checkbox"
                            checked={addons.priority}
                            onChange={(e) => setAddons(prev => ({ ...prev, priority: e.target.checked }))}
                            style={{ marginRight: '5px' }}
                          />
                          <span style={{ fontSize: '13px' }}>Prioritás kézbesítés (+200 Ft)</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="checkbox"
                            checked={addons.analytics}
                            onChange={(e) => setAddons(prev => ({ ...prev, analytics: e.target.checked }))}
                            style={{ marginRight: '5px' }}
                          />
                          <span style={{ fontSize: '13px' }}>Részletes analytics (+300 Ft)</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="checkbox"
                            checked={addons.support}
                            onChange={(e) => setAddons(prev => ({ ...prev, support: e.target.checked }))}
                            style={{ marginRight: '5px' }}
                          />
                          <span style={{ fontSize: '13px' }}>Prioritás support (+500 Ft)</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Section */}
          <div style={{ backgroundColor: 'white', border: '1px solid #ddd', padding: '30px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '25px', color: '#333' }}>Fizetés</h2>

            {/* Order Summary */}
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '25px',
              border: '1px solid #e9ecef'
            }}>
              {selectedService ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #dee2e6' }}>
                    <span style={{ color: '#666' }}>Szolgáltatás</span>
                    <span style={{ fontWeight: '500' }}>
                      {services[selectedService as keyof typeof services].title}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #dee2e6' }}>
                    <span style={{ color: '#666' }}>Mennyiség</span>
                    <span style={{ fontWeight: '500' }}>
                      {quantities[selectedService as keyof typeof quantities]} db
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #dee2e6' }}>
                    <span style={{ color: '#666' }}>Egységár</span>
                    <span style={{ fontWeight: '500' }}>
                      {services[selectedService as keyof typeof services].price.toLocaleString()} Ft
                    </span>
                  </div>
                  {(addons.priority || addons.analytics || addons.support) && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #dee2e6' }}>
                      <span style={{ color: '#666' }}>Kiegészítők</span>
                      <span style={{ fontWeight: '500' }}>
                        +{(addons.priority ? 200 : 0) + (addons.analytics ? 300 : 0) + (addons.support ? 500 : 0)} Ft
                      </span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', fontSize: '18px', fontWeight: '600', color: '#28a745' }}>
                    <span>Összesen</span>
                    <span>{calculateTotal().toLocaleString()} Ft</span>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#666', padding: '40px 20px' }}>
                  Válassz egy szolgáltatást a bal oldalról
                </div>
              )}
            </div>

            {/* Payment Methods */}
            {selectedService && (
              <>
                <div style={{ marginBottom: '25px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '15px', color: '#333' }}>Fizetési mód</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '15px',
                          backgroundColor: '#f8f9fa',
                          border: selectedPaymentMethod === method.id ? '2px solid #28a745' : '2px solid #e9ecef',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPaymentMethod === method.id}
                          onChange={() => setSelectedPaymentMethod(method.id)}
                          style={{ display: 'none' }}
                        />
                        <div style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: '#28a745',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '18px'
                        }}>
                          {method.icon}
                        </div>
                        <div>
                          <h3 style={{ fontWeight: '500', margin: 0, fontSize: '14px' }}>{method.title}</h3>
                          <p style={{ color: '#666', margin: 0, fontSize: '13px' }}>{method.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  style={{
                    width: '100%',
                    padding: '15px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginBottom: '15px'
                  }}
                >
                  Fizetés indítása - {calculateTotal().toLocaleString()} Ft
                </button>

                <div style={{ backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '8px', padding: '15px' }}>
                  <h4 style={{ color: '#155724', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>🔒 Biztonságos fizetés</h4>
                  <p style={{ fontSize: '13px', color: '#155724', lineHeight: '1.4', margin: 0 }}>
                    A fizetés SimplePay rendszeren keresztül történik, amely teljes mértékben biztonságos. 
                    A kártyaadatokat nem tároljuk, és minden tranzakció titkosított kapcsolaton keresztül zajlik.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}