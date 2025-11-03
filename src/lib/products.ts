import { Product } from '../types/Product';

export interface UserLocation {
  lat: number;
  lon: number;
}

/**
 * Calculates the distance between two geographical points in kilometers using the Haversine formula.
 * @param lat1 Latitude of the first point.
 * @param lon1 Longitude of the first point.
 * @param lat2 Latitude of the second point.
 * @param lon2 Longitude of the second point.
 * @returns The distance in kilometers.
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

/**
 * Filters a list of products by their distance from a user's location.
 * @param products The array of products to filter.
 * @param userLocation The user's current location.
 * @param maxDistanceKm The maximum distance in kilometers.
 * @returns A new array of products within the specified distance.
 */
export function filterProductsByDistance(products: Product[], userLocation: UserLocation, maxDistanceKm: number): Product[] {
  return products.filter(product => {
    const distance = calculateDistance(userLocation.lat, userLocation.lon, product.sellerLat, product.sellerLon);
    return distance <= maxDistanceKm;
  });
}
