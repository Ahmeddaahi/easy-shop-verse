
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash, Plus } from 'lucide-react';
import { toast } from 'sonner';

const SellerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, products, categories, addProduct } = useShop();
  
  // If not logged in or not a seller, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }
  
  if (user.role !== 'seller' && user.role !== 'admin') {
    navigate('/');
    return null;
  }
  
  // Filter products by current seller
  const sellerProducts = products.filter(product => product.sellerId === user.id);
  
  // Form state for new product
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    inventory: '10',
    featured: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.imageUrl) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const price = parseFloat(newProduct.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    
    const inventory = parseInt(newProduct.inventory);
    if (isNaN(inventory) || inventory < 0) {
      toast.error('Please enter a valid inventory amount');
      return;
    }
    
    // Add product
    addProduct({
      name: newProduct.name,
      description: newProduct.description,
      price: price,
      category: newProduct.category,
      imageUrl: newProduct.imageUrl,
      inventory: inventory,
      featured: newProduct.featured,
      seller: user.name
    });
    
    // Reset form
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
      inventory: '10',
      featured: false
    });
    
    // Close add product form
    setIsAddingProduct(false);
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>
      
      <div className="grid gap-8">
        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellerProducts.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Sales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">N/A</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Products Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Products</CardTitle>
            <Button onClick={() => setIsAddingProduct(!isAddingProduct)}>
              {isAddingProduct ? 'Cancel' : (
                <>
                  <Plus size={16} className="mr-2" />
                  Add Product
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            {/* Add Product Form */}
            {isAddingProduct && (
              <div className="mb-6 p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name*</Label>
                      <Input
                        id="name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)*</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category*</Label>
                      <Select 
                        value={newProduct.category}
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inventory">Inventory</Label>
                      <Input
                        id="inventory"
                        name="inventory"
                        type="number"
                        min="0"
                        value={newProduct.inventory}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="imageUrl">Image URL*</Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        value={newProduct.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description*</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        rows={3}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        id="featured"
                        name="featured"
                        type="checkbox"
                        checked={newProduct.featured}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor="featured">Feature this product</Label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Add Product</Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Products Table */}
            {sellerProducts.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-center">Inventory</TableHead>
                      <TableHead className="text-center">Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sellerProducts.map(product => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="h-9 w-9 rounded object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-center">{product.inventory || 'N/A'}</TableCell>
                        <TableCell className="text-center">{product.featured ? 'Yes' : 'No'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Trash size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't added any products yet.</p>
                {!isAddingProduct && (
                  <Button onClick={() => setIsAddingProduct(true)}>
                    <Plus size={16} className="mr-2" />
                    Add Your First Product
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
