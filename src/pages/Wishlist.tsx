import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import { ShoppingBag } from 'lucide-react';

const Wishlist = () => {
  const { items } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-6">Start adding some items to your wishlist!</p>
        <Link to="/shop">
          <Button>
            <ShoppingBag className="h-5 w-5 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;