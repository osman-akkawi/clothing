import React from 'react';
import { Order } from '../../types';

interface OrderStatusBadgeProps {
  status: Order['status'];
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const styles = {
    delivered: 'bg-green-100 text-green-800',
    shipped: 'bg-blue-100 text-blue-800',
    processing: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};

export default OrderStatusBadge;