import React from 'react';
import './ProductCard.css';
import { AlertCircle } from 'lucide-react';

interface ProductCardProps {
  productName: string;
  price: string;
  sellerName: string;
  distance: string;
  stock?: number;
  imageUrl?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ productName, price, sellerName, distance, stock, imageUrl }) => {
  const isOutOfStock = stock !== undefined && stock <= 0;
  const isLowStock = stock !== undefined && stock > 0 && stock < 10;

  return (
    <div className={`product-card relative overflow-hidden ${isOutOfStock ? 'opacity-75 grayscale' : ''}`}>
      {/* Image Section */}
      <div className="h-48 bg-gray-100 relative">
        {imageUrl ? (
          <img src={imageUrl} alt={productName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}

        {/* Stock Badges */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold transform -rotate-12 border-2 border-white shadow-lg">
              ELFOGYOTT
            </span>
          </div>
        )}

        {!isOutOfStock && isLowStock && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1 animate-pulse">
            <AlertCircle size={12} /> Már csak {stock} db!
          </div>
        )}

        {!isOutOfStock && stock !== undefined && stock >= 10 && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            Készleten
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="product-name font-bold text-lg mb-1">{productName}</div>
        <div className="product-price text-[#1B4332] font-bold mb-3">{price}</div>
        <div className="seller-info flex justify-between text-sm text-gray-500">
          <span>{sellerName}</span>
          <span>{distance}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

export const ProductCardExample: React.FC = () => (
  <ProductCard
    productName="Meggy"
    price="800 Ft/kg"
    sellerName="Marika Néni"
    distance="5 km"
    stock={5}
  />
);
