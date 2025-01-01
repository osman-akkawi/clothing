import React from 'react';
import { orderService } from '../../services/orderService';
import { Order } from '../../types';
import { toast } from 'react-hot-toast';
import OrdersTable from '../../components/admin/OrdersTable';

const AdminOrders = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [updatingStatus, setUpdatingStatus] = React.useState<string | null>(null);
  const [deletingOrder, setDeletingOrder] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      setUpdatingStatus(orderId);
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error('Failed to update order status');
    } finally {
      setUpdatingStatus(null);
    }
  };

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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <OrdersTable
          orders={orders}
          showActions
          onUpdateStatus={handleUpdateStatus}
          onDeleteOrder={handleDeleteOrder}
          updatingStatus={updatingStatus}
          deletingOrder={deletingOrder}
        />
      </div>
    </div>
  );
};

export default AdminOrders;