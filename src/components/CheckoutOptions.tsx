// src/components/CheckoutOptions.tsx
import React from 'react';

export const CheckoutOptions = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900">Válaszd ki a szállítási módot:</h3>
      <div className="mt-4 space-y-4">
        <div className="flex items-center">
          <input
            id="pickup"
            name="checkout-option"
            type="radio"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label htmlFor="pickup" className="ml-3 block text-sm font-medium text-gray-700">
            Átvétel a termelőnél
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="local-point"
            name="checkout-option"
            type="radio"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label htmlFor="local-point" className="ml-3 block text-sm font-medium text-gray-700">
            Helyi Kosárpont
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="shipping"
            name="checkout-option"
            type="radio"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label htmlFor="shipping" className="ml-3 block text-sm font-medium text-gray-700">
            Postázás (csak tartós termékek)
          </label>
        </div>
      </div>
    </div>
  );
};
