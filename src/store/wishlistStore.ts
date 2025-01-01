import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (product) => {
        set((state) => {
          const isInWishlist = state.items.some((item) => item.id === product.id);
          return {
            items: isInWishlist
              ? state.items.filter((item) => item.id !== product.id)
              : [...state.items, product],
          };
        });
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
      version: 1,
    }
  )
);