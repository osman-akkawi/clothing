import { useState, useEffect } from 'react';
import { Product } from '../types';
import { productService } from '../services/productService';

export function useProducts(filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts(filters);
        
        if (mounted) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch products'));
          setProducts([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, [
    filters?.category,
    filters?.minPrice,
    filters?.maxPrice,
    filters?.search
  ]);

  return { products, loading, error };
}