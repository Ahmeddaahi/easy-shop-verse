import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Loader2, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Order } from '@/types';

const Orders = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      fetchOrders();
    }
  }, [loading, user, navigate]);

  const fetchOrders = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        // Map database fields to our Order interface
        const formattedOrders: Order[] = data.map(order => ({
          id: order.id,
          userId: order.user_id,
          user_id: order.user_id,
          status: order.status,
          total: order.total,
          items: [], // Will be populated when viewing order details
          createdAt: order.created_at,
          created_at: order.created_at,
          updated_at: order.updated_at,
          shipping_address: order.shipping_address
        }));
        setOrders(formattedOrders);
      } else {
        setOrders([]);
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch your orders. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading || isLoading) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <Card className="text-center py-10">
          <CardHeader>
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/60 mb-2" />
            <CardTitle className="text-xl">No Orders Yet</CardTitle>
            <CardDescription className="text-base max-w-md mx-auto">
              You haven't placed any orders yet. Browse our products and start shopping to see your orders here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/shop')} size="lg" className="mt-2 font-medium">
              Browse Products
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle>Order History</CardTitle>
            <CardDescription>Track and manage your past orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border/60 overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="hover:bg-muted/60">
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">
                        {order.id.substring(0, 8)}...
                      </TableCell>
                      <TableCell>{formatDate(order.createdAt || order.created_at || '')}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(order.total)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/orders/${order.id}`)}
                          className="hover:bg-primary/10 hover:text-primary"
                        >
                          <Eye size={16} className="mr-1" /> Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Orders;
