export interface AlertPayload {
  productId: number;
  sellerLat: number;
  sellerLon: number;
  alertRadiusKm: 10;
  message: string;
}
