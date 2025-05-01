
import React from 'react';
import { useShop } from '@/context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoriesTable } from '@/components/dashboard/CategoriesTable';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, PlusCircle } from 'lucide-react';

const AdminCategories: React.FC = () => {
  const navigate = useNavigate();
  const { products, categories } = useShop();
  const { toast } = useToast();
  const { profile } = useAuth();
  
  // Check if not admin, redirect to login
  React.useEffect(() => {
    if (profile && profile.role !== 'admin') {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive"
      });
    }
  }, [profile, navigate, toast]);
  
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="mr-2" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-3xl font-bold">Manage Categories</h1>
        </div>
        <Button>
          <PlusCircle size={16} className="mr-2" /> Add Category
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesTable categories={categories} products={products} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;
