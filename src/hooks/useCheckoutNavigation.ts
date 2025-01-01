import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface UseCheckoutNavigationProps {
  user: User | null;
  hasItems: boolean;
}

export const useCheckoutNavigation = ({ user, hasItems }: UseCheckoutNavigationProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!hasItems) {
      navigate('/cart');
      return;
    }
  }, [user, hasItems, navigate]);

  return {
    shouldRender: user && hasItems,
  };
};