// src/lib/fresh-alert.ts

import { useState } from 'react';

/**
 * Interface for the payload sent to the backend when a producer triggers a fresh alert.
 */
export interface AlertPayload {
  productId: number;
  sellerLat: number;
  sellerLon: number;
  alertRadiusKm: number; // This will be fixed at 10km
  message: string;
}

/**
 * Asynchronously triggers a 'Fresh Alert' by sending a POST request to the backend.
 * @param payload - The data for the alert.
 * @returns A promise that resolves if the alert is sent successfully, and rejects otherwise.
 */
export async function triggerFreshAlert(payload: AlertPayload): Promise<void> {
  try {
    const response = await fetch('/api/alerts/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Handle non-successful responses (e.g., server errors)
      const errorData = await response.json();
      throw new Error(errorData.message || 'Hiba történt a riasztás küldése közben.');
    }

    console.log('Fresh Alert sent successfully!');
  } catch (error) {
    console.error('Error sending fresh alert:', error);
    // Re-throw the error to be handled by the calling component
    throw error;
  }
}

/**
 * A sample TSX component snippet demonstrating the toggle switch and success message
 * for the Fresh Alert feature in a producer's form.
 */
export const FreshAlertFormElements = () => {
  const [isAlertEnabled, setIsAlertEnabled] = useState(false);
  const [isAlertSent, setIsAlertSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleChange = () => {
    setIsAlertEnabled(!isAlertEnabled);
    // Reset status when toggling
    setIsAlertSent(false);
    setError(null);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isAlertEnabled) {
      // Dummy payload for demonstration
      const dummyPayload: AlertPayload = {
        productId: 123,
        sellerLat: 47.4979, // Budapest coordinates
        sellerLon: 19.0402,
        alertRadiusKm: 10, // Fixed radius
        message: "Friss, ropogós kenyér kapható!",
      };

      try {
        await triggerFreshAlert(dummyPayload);
        setIsAlertSent(true);
        setError(null);
      } catch (err) {
        setError('A riasztás küldése sikertelen volt.');
        setIsAlertSent(false);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex items-center my-4">
        <label htmlFor="fresh-alert-toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="fresh-alert-toggle"
              className="sr-only"
              checked={isAlertEnabled}
              onChange={handleToggleChange}
            />
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isAlertEnabled ? 'transform translate-x-full bg-green-500' : ''}`}></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">
            Friss Riasztás küldése a 10 km-es körzetbe
          </div>
        </label>
      </div>

      {isAlertSent && (
        <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
          ✅ Friss riasztás elküldve a környékbelieknek!
        </div>
      )}

      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          {error}
        </div>
      )}

      {/* The rest of the form can go here */}
      <button type="submit" className="btn-primary mt-4">Termék Hozzáadása</button>
    </form>
  );
};
