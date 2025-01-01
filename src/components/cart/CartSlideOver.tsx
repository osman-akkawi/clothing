import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import CartItem from './CartItem';
import Button from '../ui/Button';
import { formatPrice } from '../../utils/price';

interface CartSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSlideOver: React.FC<CartSlideOverProps> = ({ isOpen, onClose }) => {
  const { items, total, updateQuantity, removeItem } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black cursor-pointer"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Shopping Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <CartItem
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="border-t p-4 space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={onClose}>
                      Continue Shopping
                    </Button>
                    <Link to="/checkout" onClick={onClose}>
                      <Button className="w-full">Checkout</Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSlideOver;