import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  sizes: z.array(z.string()).min(1, 'At least one size is required'),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
});

export const orderSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  items: z.array(z.object({
    product: z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
    }),
    quantity: z.number().int().min(1),
    size: z.string(),
  })).min(1, 'Order must contain at least one item'),
  total: z.number().min(0),
  address: z.string().min(1, 'Delivery address is required'),
});

export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
});