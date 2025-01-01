import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidAuthHash } from '../utils/auth-helpers';

interface UseAuthRedirectProps {
  fallbackPath: string;
  requireHash?: boolean;
}

export const useAuthRedirect = ({ fallbackPath, requireHash = false }: UseAuthRedirectProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    
    if (requireHash && !isValidAuthHash(hash)) {
      navigate(fallbackPath);
    }
  }, [navigate, fallbackPath, requireHash]);
};