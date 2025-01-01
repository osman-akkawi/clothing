import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  addItem: (product, quantity, size) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
          total: state.total + product.price * quantity,
        };
      }

      return {
        items: [...state.items, { product, quantity, size }],
        total: state.total + product.price * quantity,
      };
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
      total: state.items.reduce(
        (total, item) =>
          item.product.id !== productId
            ? total
            : total - item.product.price * item.quantity,
        state.total
      ),
    }));
  },
  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
      total: state.items.reduce(
        (total, item) =>
          item.product.id === productId
            ? total - item.product.price * item.quantity + item.product.price * quantity
            : total,
        state.total
      ),
    }));
  },
  clearCart: () => set({ items: [], total: 0 }),
}));