import React from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../../utils/price';
import { Product } from '../../types';
import WishlistButton from './WishlistButton';
import Button from '../ui/Button';

interface ProductInfoProps {
  product: Product;
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedSize,
  onSizeSelect,
  quantity,
  onQuantityChange,
  onAddToCart,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-600 mt-2">{formatPrice(product.price)}</p>
        </div>
        <WishlistButton product={product} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Description</h3>
        <p className="mt-2 text-gray-600">{product.description}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeSelect(size)}
              className={`py-2 text-sm font-medium rounded-md ${
                selectedSize === size
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
        <div className="flex items-center space-x-4 mt-2">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => onQuantityChange(Math.min(product.stock, quantity + 1))}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
            disabled={quantity >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Button
        onClick={onAddToCart}
        disabled={!selectedSize || product.stock === 0}
        className="w-full"
      >
        <ShoppingBag className="h-5 w-5 mr-2" />
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    </div>
  );
};

export default ProductInfo;