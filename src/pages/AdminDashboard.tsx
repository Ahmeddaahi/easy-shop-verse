
import React from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Edit, PieChart, Layers, Users, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

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
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <Users size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ {mockStats.newUsers}</span> new this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products
              </CardTitle>
              <Layers size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalProducts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
              <ShoppingBag size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-amber-500">{mockStats.pendingOrders}</span> pending orders
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Revenue
              </CardTitle>
              <PieChart size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 12%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Tabs */}
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
              
              {/* Products Tab */}
              <TabsContent value="products">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-center">Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map(product => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className="h-9 w-9 rounded object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.seller}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            {product.featured ? <Check size={16} className="mx-auto text-green-500" /> : '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => toast.info(`Edit ${product.name}`)}
                              >
                                <Edit size={14} className="mr-1" /> Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              {/* Categories Tab */}
              <TabsContent value="categories">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-center">Products</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map(category => (
                        <TableRow key={category.id}>
                          <TableCell>
                            {category.imageUrl && (
                              <img 
                                src={category.imageUrl} 
                                alt={category.name}
                                className="h-9 w-9 rounded object-cover"
                              />
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {category.description || 'No description'}
                          </TableCell>
                          <TableCell className="text-center">
                            {products.filter(p => p.category === category.name).length}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => toast.info(`Edit ${category.name}`)}
                              >
                                <Edit size={14} className="mr-1" /> Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders">
                <div className="text-center py-12 text-muted-foreground">
                  <p>Order management will be available in the next version.</p>
                </div>
              </TabsContent>
              
              {/* Users Tab */}
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
