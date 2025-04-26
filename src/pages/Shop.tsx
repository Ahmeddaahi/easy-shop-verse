
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import ProductGrid from '../components/products/ProductGrid';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from '@/components/ui/slider';

const Shop: React.FC = () => {
  const { products, categories } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Filter states
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'featured');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(searchParams.get('featured') === 'true');
  
  // Apply filters and sort
  useEffect(() => {
    let result = [...products];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply featured filter
    if (showFeaturedOnly) {
      result = result.filter(product => product.featured);
    }
    
    // Apply sorting
    result = sortProducts(result, sortOption);
    
    setFilteredProducts(result);
    
    // Update URL search params
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (sortOption) params.set('sort', sortOption);
    if (showFeaturedOnly) params.set('featured', 'true');
    
    setSearchParams(params);
    
  }, [products, searchQuery, selectedCategory, priceRange, sortOption, showFeaturedOnly]);
  
  // Helper function to sort products
  const sortProducts = (productsToSort: Product[], option: string) => {
    switch (option) {
      case 'price-low':
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...productsToSort].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'featured':
        return [...productsToSort].sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
      default:
        return productsToSort;
    }
  };
  
  // Handle filter changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const handleFeaturedChange = (checked: boolean | string) => {
    setShowFeaturedOnly(checked === true);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 1000]);
    setSortOption('featured');
    setShowFeaturedOnly(false);
    setSearchParams({});
  };
  
  // Find min and max product prices for the slider
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Shop Products</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">Search</h3>
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            <Accordion type="single" collapsible defaultValue="category">
              <AccordionItem value="category">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div 
                      className={`px-2 py-1 cursor-pointer rounded hover:bg-muted ${selectedCategory === '' ? 'bg-muted' : ''}`}
                      onClick={() => handleCategoryChange('')}
                    >
                      All Categories
                    </div>
                    {categories.map(category => (
                      <div 
                        key={category.id}
                        className={`px-2 py-1 cursor-pointer rounded hover:bg-muted ${selectedCategory === category.name ? 'bg-muted' : ''}`}
                        onClick={() => handleCategoryChange(category.name)}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="price">
                <AccordionTrigger>Price</AccordionTrigger>
                <AccordionContent>
                  <div className="px-2 space-y-4">
                    <Slider
                      defaultValue={[minPrice, maxPrice]}
                      min={minPrice}
                      max={maxPrice}
                      step={5}
                      onValueChange={handlePriceChange}
                    />
                    <div className="flex justify-between">
                      <span>${priceRange[0].toFixed(2)}</span>
                      <span>${priceRange[1].toFixed(2)}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="featured" 
                checked={showFeaturedOnly} 
                onCheckedChange={handleFeaturedChange} 
              />
              <label 
                htmlFor="featured" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Featured Products Only
              </label>
            </div>
            
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Clear Filters
            </Button>
          </div>
        </div>
        
        {/* Products */}
        <div className="lg:col-span-3">
          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} products
            </p>
            
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <ProductGrid 
            products={filteredProducts} 
            emptyMessage="No products found matching your criteria"
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
