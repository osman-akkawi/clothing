import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { formatPrice } from '../../utils/price';
import WishlistButton from './WishlistButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
        <WishlistButton
          product={product}
          className="absolute top-2 right-2 bg-white shadow-md"
        />
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-sm text-gray-700">
          <Link to={`/product/${product.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium text-gray-900">
            {formatPrice(product.price)}
          </p>
          <p className="text-sm text-gray-500">
            {product.stock} in stock
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;