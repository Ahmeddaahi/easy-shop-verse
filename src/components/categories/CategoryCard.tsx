
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/shop?category=${category.name}`} 
      className="group relative flex flex-col overflow-hidden rounded-lg shadow-sm h-48 hover:shadow-md transition-shadow"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
      
      <img 
        src={category.imageUrl} 
        alt={category.name}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
        <h3 className="font-medium text-lg">{category.name}</h3>
        {category.description && (
          <p className="text-sm text-white/80 mt-1 line-clamp-2">{category.description}</p>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;
