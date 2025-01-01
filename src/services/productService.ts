import { supabase } from '../lib/supabase';
import { Product } from '../types';

export const productService = {
  async getProducts(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }) {
    try {
      let query = supabase
        .from('products')
        .select('*');

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }

      if (filters?.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }

      if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      if (!data) return [];

      return data.map(product => ({
        ...product,
        createdAt: product.created_at,
      })) as Product[];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProduct(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Product not found');

    return {
      ...data,
      createdAt: data.created_at,
    } as Product;
  }
};