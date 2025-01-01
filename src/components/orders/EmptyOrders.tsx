import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Button from '../ui/Button';

const EmptyOrders = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
      <p className="text-gray-600 mb-6">Start shopping to create your first order!</p>
      <Link to="/shop">
        <Button>
          <ShoppingBag className="h-5 w-5 mr-2" />
          Start Shopping
        </Button>
      </Link>
    </div>
  );
};

export default EmptyOrders;