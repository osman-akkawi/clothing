import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { orderService } from '../../services/orderService';
import { Package, ShoppingBag, Users, Plus } from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import OrdersTable from '../../components/admin/OrdersTable';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const { products } = useProducts();
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: orders.length,
      icon: ShoppingBag,
      link: '/admin/orders',
    },
    {
      title: 'Active Customers',
      value: new Set(orders.map(order => order.userId)).size,
      icon: Users,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link to="/admin/products">
          <Button>
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link || '#'}
            className={stat.link ? 'transition-transform hover:scale-105' : undefined}
          >
            <StatsCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          </Link>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Recent Orders</h2>
          <Link to="/admin/orders">
            <Button variant="outline">View All Orders</Button>
          </Link>
        </div>
        <OrdersTable orders={orders} limit={5} />
      </div>
    </div>
  );
};

export default AdminDashboard;