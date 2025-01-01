import React from 'react';
import { useAuthStore } from '../store/authStore';
import { orderService } from '../services/orderService';
import { Order } from '../types';
import { toast } from 'react-hot-toast';
import UserOrdersTable from '../components/orders/UserOrdersTable';
import EmptyOrders from '../components/orders/EmptyOrders';

const Orders = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [deletingOrder, setDeletingOrder] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const data = await orderService.getOrders(user.id);
        setOrders(data);
      } catch (error) {
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      setDeletingOrder(orderId);
      await orderService.deleteOrder(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
      toast.success('Order deleted successfully');
    } catch (error) {
      toast.error('Failed to delete order');
    } finally {
      setDeletingOrder(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Orders</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <UserOrdersTable
          orders={orders}
          onDeleteOrder={handleDeleteOrder}
          deletingOrder={deletingOrder}
        />
      </div>
    </div>
  );
};

export default Orders;