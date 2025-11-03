import { UserLocation } from '../types/location';

// Placeholder for a function that converts an address or zip code into coordinates
async function geocodeAddress(input: string): Promise<Omit<UserLocation, 'timestamp'>> {
  console.log(`Geocoding ${input}...`);
  // In a real application, this would involve a third-party geocoding service
  return {
    latitude: 47.4979, // Example latitude (Budapest)
    longitude: 19.0402, // Example longitude (Budapest)
    city: 'Budapest',
    zipCode: '1011',
  };
}

export async function handleLocationInput(input: string): Promise<void> {
  if (!input.trim()) {
    console.warn('Location input is empty.');
    return;
  }

  try {
    const geocodedData = await geocodeAddress(input);

    const locationData: UserLocation = {
      ...geocodedData,
      timestamp: Date.now(),
    };

    localStorage.setItem('szomszedkosar_user_location', JSON.stringify(locationData));
    console.log('User location saved to localStorage:', locationData);

    // TODO: Trigger a state change or event to reload/re-filter the product list
    // This could be a custom event, a state update in a parent component,
    // or a navigation action.
    // Example: window.dispatchEvent(new Event('location-updated'));

  } catch (error) {
    console.error('Error handling location input:', error);
  }
}
