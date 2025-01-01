import React from 'react';
import { CartItem } from '../../types';
import { formatPrice } from '../../utils/price';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-fit space-y-4">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.size}`} className="flex space-x-4">
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.product.name}</h3>
              <p className="text-sm text-gray-600">
                Size: {item.size} | Qty: {item.quantity}
              </p>
              <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Cash on Delivery - Pay when you receive your order
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;