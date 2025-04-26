
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  seller: string;
  sellerId: string;
  featured?: boolean;
  inventory?: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'seller' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  createdAt: string;
}
