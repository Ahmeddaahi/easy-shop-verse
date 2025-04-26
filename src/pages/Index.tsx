
import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button } from '@/components/ui/button';
import ProductGrid from '../components/products/ProductGrid';
import CategoryCard from '../components/categories/CategoryCard';

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
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Discover Amazing Products From Around the World
              </h1>
              <p className="text-lg text-muted-foreground">
                Shop the latest products from trusted sellers. Quality guaranteed with our satisfaction promise.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/shop">Shop Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/seller-signup">Become a Seller</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              {featuredProducts.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src={featuredProducts[0]?.imageUrl} 
                    alt="Featured Product" 
                    className="rounded-lg shadow-md object-cover aspect-square"
                  />
                  {featuredProducts[1] && (
                    <img 
                      src={featuredProducts[1]?.imageUrl} 
                      alt="Featured Product" 
                      className="rounded-lg shadow-md object-cover aspect-square mt-8"
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
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="section-heading">Browse Categories</h2>
            <Link to="/categories" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="section-heading">New Arrivals</h2>
            <Link to="/shop?sort=newest" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          
          <ProductGrid products={latestProducts} />
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="section-heading">Featured Products</h2>
            <Link to="/shop?featured=true" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start selling?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of sellers on our platform and reach millions of customers worldwide.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/seller-signup">Become a Seller Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
