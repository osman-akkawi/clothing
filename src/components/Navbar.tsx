import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import CartSlideOver from './cart/CartSlideOver';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const { items } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              StyleStore
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/shop"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Shop
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative hover:text-indigo-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                <AnimatePresence>
                  {items.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {items.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <Link
                to="/wishlist"
                className="hover:text-indigo-600 transition-colors"
              >
                <Heart className="h-6 w-6" />
              </Link>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 hover:text-indigo-600 transition-colors"
                  >
                    <User className="h-6 w-6" />
                  </button>
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100"
                      >
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Package className="h-4 w-4 mr-2" />
                          My Orders
                        </Link>
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <User className="h-4 w-4 mr-2" />
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>

            <button
              className="md:hidden hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/shop"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                >
                  Shop
                </Link>
                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                >
                  Cart ({items.length})
                </button>
                <Link
                  to="/wishlist"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                >
                  Wishlist
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/orders"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                    >
                      My Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <CartSlideOver isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;