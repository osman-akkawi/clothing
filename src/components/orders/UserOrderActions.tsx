import React from 'react';
import { Trash2 } from 'lucide-react';
import { Order } from '../../types';

interface UserOrderActionsProps {
  order: Order;
  onDelete: (orderId: string) => void;
  isDeleting: boolean;
}

const UserOrderActions: React.FC<UserOrderActionsProps> = ({
  order,
  onDelete,
  isDeleting,
}) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this order from your history?')) {
      onDelete(order.id);
    }
  };

  return (
    <div>
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

export default UserOrderActions;