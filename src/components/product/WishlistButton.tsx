import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../../types';
import { useWishlistStore } from '../../store/wishlistStore';
import { toast } from 'react-hot-toast';

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ product, className = '' }) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast.success(
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist'
    );
  };

  return (
    <button
      onClick={handleToggleWishlist}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={`h-6 w-6 transition-colors ${
          isWishlisted ? 'fill-red-500 stroke-red-500' : 'stroke-gray-600'
        }`}
      />
    </button>
  );
};

export default WishlistButton;