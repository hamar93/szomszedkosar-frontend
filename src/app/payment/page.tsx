'use client';

import React from 'react';

export default function PaymentPage() {
  const paymentMethods = [
    {
      id: 'simplepay',
      title: 'SimplePay',
      description: 'Fizetés bankkártyával a SimplePay rendszerén keresztül.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fefbf6] p-6 text-[#1d3b29] font-sans">
      <h1 className="text-2xl font-bold mb-6">Válaszd ki a fizetési módot</h1>
      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold">{method.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{method.description}</p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Fizetés indítása
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}