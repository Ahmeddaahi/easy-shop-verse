
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, Category, User } from "../types";
import { mockProducts, mockCategories } from "../data/mockData";
import { toast } from "sonner";

interface ShopContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  user: User | null;
  isAuthenticated: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'customer' | 'seller') => Promise<void>;
  logout: () => void;
  addProduct: (product: Omit<Product, "id" | "sellerId" | "createdAt">) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
    
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Increase quantity of existing item
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { product, quantity }];
      }
    });
    
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    toast.info("Item removed from cart");
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const login = async (email: string, password: string) => {
    // In a real app, this would call your authentication API
    // For now, we'll simulate authentication with mock data
    
    // Simple validation
    if (!email || !password) {
      toast.error("Please provide both email and password");
      return Promise.reject("Invalid credentials");
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user for demo purposes
    const mockUser: User = {
      id: "user123",
      email,
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : email.includes('seller') ? 'seller' : 'customer'
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    toast.success(`Welcome back, ${mockUser.name}!`);
    return Promise.resolve();
  };

  const register = async (email: string, password: string, name: string, role: 'customer' | 'seller') => {
    // In a real app, this would call your registration API
    // For now, we'll simulate registration with mock data
    
    // Simple validation
    if (!email || !password || !name) {
      toast.error("Please fill all required fields");
      return Promise.reject("Invalid input");
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user for demo purposes
    const mockUser: User = {
      id: `user_${Math.random().toString(36).substring(2, 9)}`,
      email,
      name,
      role
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    toast.success(`Welcome to ShopVerse, ${name}!`);
    return Promise.resolve();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info("You've been logged out");
  };

  const addProduct = (productData: Omit<Product, "id" | "sellerId" | "createdAt">) => {
    if (!user) {
      toast.error("You must be logged in to add products");
      return;
    }
    
    const newProduct: Product = {
      ...productData,
      id: `prod_${Math.random().toString(36).substring(2, 9)}`,
      sellerId: user.id,
      seller: user.name,
      createdAt: new Date().toISOString()
    };
    
    setProducts(prev => [newProduct, ...prev]);
    toast.success(`Product "${newProduct.name}" added successfully`);
  };

  return (
    <ShopContext.Provider value={{
      products,
      categories,
      cart,
      user,
      isAuthenticated: !!user,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      getCartTotal,
      login,
      register,
      logout,
      addProduct
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
