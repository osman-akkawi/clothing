import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const EmptyCart = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
      <Link to="/shop">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  );
};

export default EmptyCart;