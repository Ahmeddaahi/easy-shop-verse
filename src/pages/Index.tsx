
import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductGrid from '../components/products/ProductGrid';
import CategoryCard from '../components/categories/CategoryCard';
import { ArrowRight } from 'lucide-react';

const Index: React.FC = () => {
  const { products, categories } = useShop();

  // Get featured products for the hero section
  const featuredProducts = products.filter(product => product.featured);

  // Get latest products for new arrivals section
  const latestProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-muted to-background py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Discover Premium Products for Every Need
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Shop the latest premium products from trusted sellers. Quality guaranteed with our satisfaction promise.
              </p>
              <div className="pt-4">
                <Button size="lg" asChild className="rounded-md font-medium">
                  <Link to="/shop">Shop Now</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              {featuredProducts.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src={featuredProducts[0]?.imageUrl} 
                    alt="Featured Product" 
                    className="rounded-lg shadow-medium object-cover aspect-square hover:scale-[1.02] transition-transform duration-300" 
                  />
                  {featuredProducts[1] && (
                    <img 
                      src={featuredProducts[1]?.imageUrl} 
                      alt="Featured Product" 
                      className="rounded-lg shadow-medium object-cover aspect-square mt-8 hover:scale-[1.02] transition-transform duration-300"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-heading mb-0">Browse Categories</h2>
            <Link to="/categories" className="group text-sm font-medium text-primary inline-flex items-center hover:underline">
              View All 
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-16 bg-muted/40">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-heading mb-0">New Arrivals</h2>
            <Link to="/shop?sort=newest" className="group text-sm font-medium text-primary inline-flex items-center hover:underline">
              View All 
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          
          <ProductGrid products={latestProducts} />
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-heading mb-0">Featured Products</h2>
            <Link to="/shop?featured=true" className="group text-sm font-medium text-primary inline-flex items-center hover:underline">
              View All 
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      {/* Newsletter Section - Replacing the seller CTA */}
      <section className="py-16 bg-primary/10">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Subscribe to our newsletter for exclusive offers, new arrivals, and shopping inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="h-11 flex-grow" 
            />
            <Button size="lg" className="font-medium">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
