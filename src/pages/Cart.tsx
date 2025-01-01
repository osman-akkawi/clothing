import React from 'react';
import { useCartStore } from '../store/cartStore';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';

const Cart = () => {
  const { items, total, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={`${item.product.id}-${item.size}`}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
        </div>
        <CartSummary subtotal={total} />
      </div>
    </div>
  );
};

export default Cart;