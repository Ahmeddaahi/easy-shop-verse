
import React from 'react';
import { useShop } from '../context/ShopContext';
import CategoryCard from '../components/categories/CategoryCard';

const Categories: React.FC = () => {
  const { categories } = useShop();
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Categories</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
