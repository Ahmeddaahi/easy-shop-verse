
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Category, Product } from '@/types';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface CategoriesTableProps {
  categories: Category[];
  products: Product[];
}

export const CategoriesTable = ({ categories, products }: CategoriesTableProps) => {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteCategory = async (categoryId: string, categoryName: string) => {
    // Check if category has associated products
    const associatedProducts = products.filter(p => p.category === categoryName);
    
    if (associatedProducts.length > 0) {
      toast({
        title: "Cannot delete category",
        description: `This category has ${associatedProducts.length} associated products. Remove them first.`,
        variant: "destructive"
      });
      return;
    }

    try {
      setDeletingId(categoryId);
      
      // Delete the category from Supabase
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);
      
      if (error) throw error;
      
      toast({
        title: "Category deleted",
        description: `${categoryName} has been deleted successfully.`,
      });
      
      // You would typically use a state update or refetch function here
      // For this example, we'll use a page reload
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive"
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
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
                    onClick={() => toast({
                      title: "Edit category",
                      description: `Edit ${category.name}`
                    })}
                  >
                    <Edit size={14} className="mr-1" /> Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    onClick={() => handleDeleteCategory(category.id, category.name)}
                    disabled={deletingId === category.id}
                  >
                    <Trash size={14} className="mr-1" /> Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
