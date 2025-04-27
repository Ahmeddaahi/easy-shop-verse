
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit } from 'lucide-react';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

interface CategoriesTableProps {
  categories: Category[];
  products: any[];
}

export const CategoriesTable = ({ categories, products }: CategoriesTableProps) => {
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
  );
};
