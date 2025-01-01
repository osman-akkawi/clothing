import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { orderService } from '../services/orderService';
import { toast } from 'react-hot-toast';
import CheckoutForm, { CheckoutFormData } from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      navigate('/cart');
      return;
    }
  }, [user, items.length, navigate]);

  // If conditions aren't met, render nothing while redirecting
  if (!user || items.length === 0) {
    return null;
  }

  const handleSubmit = async (data: CheckoutFormData) => {
    try {
      setIsSubmitting(true);
      const order = {
        userId: user.id,
        items,
        total,
        status: 'pending' as const,
        address: `${data.address}, ${data.city}, ${data.state} ${data.zipCode}`,
        customerDetails: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
        },
      };

      await orderService.createOrder(order);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/profile/orders');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <OrderSummary items={items} total={total} />
        <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default Checkout;