// src/lib/fresh-alert.ts

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
