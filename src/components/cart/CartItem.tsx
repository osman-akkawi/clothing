import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { formatPrice } from '../../utils/price';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
      <img
        src={item.product.images[0]}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="flex-1 space-y-1">
        <h3 className="font-medium">{item.product.name}</h3>
        <p className="text-sm text-gray-600">Size: {item.size}</p>
        <p className="font-medium">{formatPrice(item.product.price)}</p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() =>
              onUpdateQuantity(
                item.product.id,
                Math.min(item.product.stock, item.quantity + 1)
              )
            }
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.product.id)}
        className="p-2 text-gray-500 hover:text-red-500"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CartItem;