export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  images: string[];
  stock: number;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  address: string;
  customerDetails: CustomerDetails;
  createdAt: string;
}