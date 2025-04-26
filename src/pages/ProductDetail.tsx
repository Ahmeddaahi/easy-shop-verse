
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { toast } from 'sonner';

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product with the matching ID
  const product = products.find(p => p.id === productId);
  
  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
  
  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate('/shop')}>
          Return to Shop
        </Button>
      </div>
    );
  }
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value < 1) return;
    setQuantity(value);
  };
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div className="container py-8">
      {/* Breadcrumb navigation */}
      <div className="flex items-center mb-6 text-sm">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="text-muted-foreground hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <Link to={`/shop?category=${product.category}`} className="text-muted-foreground hover:text-foreground">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>
      
      {/* Back button */}
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back
      </Button>
      
      {/* Product details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative">
          {product.featured && (
            <span className="absolute right-4 top-4 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
              Featured
            </span>
          )}
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg font-semibold text-primary mt-2">${product.price.toFixed(2)}</p>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="font-medium mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div>
            <h2 className="font-medium mb-2">Details</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>Category: {product.category}</li>
              <li>Seller: {product.seller}</li>
              <li>In Stock: {product.inventory || "Yes"}</li>
            </ul>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            {/* Quantity selector */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="h-9 w-14 border-y border-input bg-transparent px-3 py-1 text-center text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9" 
                  onClick={incrementQuantity}
                >
                  +
                </Button>
              </div>
            </div>
            
            {/* Add to cart button */}
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
            
            {/* Product guarantees */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center text-sm">
                <Check size={16} className="text-green-500 mr-2" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center text-sm">
                <Check size={16} className="text-green-500 mr-2" />
                <span>In Stock</span>
              </div>
              <div className="flex items-center text-sm">
                <Check size={16} className="text-green-500 mr-2" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center text-sm">
                <Check size={16} className="text-green-500 mr-2" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="section-heading mb-6">Related Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/product/${relatedProduct.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={relatedProduct.imageUrl} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-medium truncate">{relatedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground">{relatedProduct.category}</p>
                    <p className="mt-2 font-semibold">${relatedProduct.price.toFixed(2)}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
