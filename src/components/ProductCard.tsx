
import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
  productName: string;
  price: string;
  sellerName: string;
  distance: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ productName, price, sellerName, distance }) => {
  return (
    <div className="product-card">
      <div className="product-name">{productName}</div>
      <div className="product-price">{price}</div>
      <div className="seller-info">
        <span>{sellerName}</span>
        <span>{distance}</span>
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
    />
);
