
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Button } from '@/components/ui/button';
import { useShop } from '../../context/ShopContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useShop();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <div className="product-card group">
      {product.featured && (
        <span className="product-badge">Featured</span>
      )}
      
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="product-image"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{product.category}</p>
          
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ShoppingCart size={16} className="mr-1" />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
