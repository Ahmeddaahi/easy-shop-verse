
import React from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { ProductsTable } from '@/components/dashboard/ProductsTable';
import { CategoriesTable } from '@/components/dashboard/CategoriesTable';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, products, categories } = useShop();
  
  // If not logged in or not an admin, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }
  
  if (user.role !== 'admin') {
    navigate('/');
    return null;
  }
  
  // Mock data for charts and analytics
  const mockStats = {
    totalUsers: 256,
    totalProducts: products.length,
    totalOrders: 124,
    totalRevenue: 15620,
    newUsers: 34,
    newOrders: 28,
    pendingOrders: 12,
    topCategories: [
      { name: "Electronics", sales: 45 },
      { name: "Clothing", sales: 32 },
      { name: "Home & Garden", sales: 28 }
    ]
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-8">
        <DashboardStats 
          totalUsers={mockStats.totalUsers}
          totalProducts={mockStats.totalProducts}
          totalOrders={mockStats.totalOrders}
          totalRevenue={mockStats.totalRevenue}
          newUsers={mockStats.newUsers}
          pendingOrders={mockStats.pendingOrders}
        />
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Store</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="products">
              <TabsList className="mb-6">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products">
                <ProductsTable products={products} />
              </TabsContent>
              
              <TabsContent value="categories">
                <CategoriesTable categories={categories} products={products} />
              </TabsContent>
              
              <TabsContent value="orders">
                <div className="text-center py-12 text-muted-foreground">
                  <p>Order management will be available in the next version.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="users">
                <div className="text-center py-12 text-muted-foreground">
                  <p>User management will be available in the next version.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
