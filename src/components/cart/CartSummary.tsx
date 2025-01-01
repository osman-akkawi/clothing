import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/price';
import Button from '../ui/Button';

interface CartSummaryProps {
  subtotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
      <Link to="/checkout">
        <Button className="w-full">Proceed to Checkout</Button>
      </Link>
    </div>
  );
};

export default CartSummary;