import React from 'react';
import { Trash2 } from 'lucide-react';
import { Order } from '../../../types';

interface OrderActionsProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onDelete: (orderId: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

const OrderActions: React.FC<OrderActionsProps> = ({
  order,
  onUpdateStatus,
  onDelete,
  isUpdating,
  isDeleting,
}) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      onDelete(order.id);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <select
        value={order.status}
        onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
        disabled={isUpdating}
        className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>

      {order.status === 'delivered' && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-gray-500 hover:text-red-600 disabled:opacity-50"
          title="Delete order"
        >
          {isDeleting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-600" />
          ) : (
            <Trash2 className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default OrderActions;