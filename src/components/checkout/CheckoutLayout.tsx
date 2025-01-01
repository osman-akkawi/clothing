import React from 'react';
import { CartItem } from '../../types';
import OrderSummary from './OrderSummary';
import CheckoutForm, { CheckoutFormData } from './CheckoutForm';

interface CheckoutLayoutProps {
  items: CartItem[];
  total: number;
  isSubmitting: boolean;
  onSubmit: (data: CheckoutFormData) => Promise<void>;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  items,
  total,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <OrderSummary items={items} total={total} />
        <CheckoutForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default CheckoutLayout;