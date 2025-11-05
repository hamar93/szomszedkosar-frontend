import { AlertPayload } from '@/types/AlertPayload';

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
      throw new Error('Network response was not ok');
    }

    // Client-side success feedback can be handled here or in the calling component
    console.log('Fresh alert triggered successfully!');
  } catch (error) {
    console.error('Failed to trigger fresh alert:', error);
    // Client-side error feedback
    throw error;
  }
}
