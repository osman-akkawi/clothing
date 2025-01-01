import React from 'react';
import { Order } from '../../types';
import { formatPrice } from '../../utils/price';
import OrderStatusBadge from '../admin/OrderStatusBadge';
import UserOrderActions from './UserOrderActions';

interface UserOrdersTableProps {
  orders: Order[];
  onDeleteOrder: (orderId: string) => void;
  deletingOrder: string | null;
}

const UserOrdersTable: React.FC<UserOrdersTableProps> = ({
  orders,
  onDeleteOrder,
  deletingOrder,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                #{order.id.slice(0, 8)}
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="text-sm">
                      {item.product.name} ({item.size}) x{item.quantity}
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatPrice(order.total)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <UserOrderActions
                  order={order}
                  onDelete={onDeleteOrder}
                  isDeleting={deletingOrder === order.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrdersTable;