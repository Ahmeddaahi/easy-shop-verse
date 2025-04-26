
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button } from '@/components/ui/button';
import { Trash, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Cart: React.FC = () => {
  const { cart, updateCartItemQuantity, removeFromCart, clearCart, getCartTotal } = useShop();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    // In a real app, navigate to checkout page
    // For this demo, simulate successful checkout
    toast.success("Order placed successfully!");
    clearCart();
    navigate('/');
  };
  
  if (cart.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag size={64} className="mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold mt-6 mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 py-2 text-sm font-medium text-muted-foreground hidden md:grid">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          
          {/* Cart item list */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product info */}
                  <div className="col-span-1 md:col-span-6 flex space-x-4">
                    <Link to={`/product/${item.product.id}`} className="shrink-0">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="h-20 w-20 rounded object-cover"
                      />
                    </Link>
                    <div>
                      <Link to={`/product/${item.product.id}`} className="font-medium hover:underline">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.product.category}</p>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="flex items-center text-sm text-red-500 hover:text-red-600 mt-1 md:hidden"
                      >
                        <Trash size={14} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden">Price:</span>
                    <span>${item.product.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden">Quantity:</span>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                    <span className="md:hidden">Total:</span>
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  
                  {/* Remove button (desktop) */}
                  <div className="hidden md:block absolute right-6">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-muted-foreground hover:text-red-500"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Cart actions */}
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={() => clearCart()}
            >
              Clear Cart
            </Button>
            <Button 
              variant="outline" 
              asChild
            >
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-6 sticky top-24">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} items)
                </span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
            </div>
            
            <Button className="w-full" onClick={handleCheckout}>
              Checkout
            </Button>
            
            <div className="text-xs text-center text-muted-foreground">
              <p>Secure Checkout</p>
              <p className="mt-1">
                We accept all major credit cards and PayPal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
