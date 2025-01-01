import React from 'react';
import { Order } from '../../types';
import { formatPrice } from '../../utils/price';
import OrderStatusBadge from './OrderStatusBadge';
import OrderActions from './orders/OrderActions';

interface OrdersTableProps {
  orders: Order[];
  limit?: number;
  showActions?: boolean;
  onUpdateStatus?: (orderId: string, status: Order['status']) => void;
  onDeleteOrder?: (orderId: string) => void;
  updatingStatus?: string | null;
  deletingOrder?: string | null;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  limit,
  showActions = false,
  onUpdateStatus,
  onDeleteOrder,
  updatingStatus,
  deletingOrder,
}) => {
  const displayOrders = limit ? orders.slice(0, limit) : orders;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
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
            {showActions && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayOrders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                #{order.id.slice(0, 8)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.customerDetails.fullName}</div>
                <div className="text-sm text-gray-500">{order.customerDetails.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.items.length} items
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
              {showActions && onUpdateStatus && onDeleteOrder && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <OrderActions
                    order={order}
                    onUpdateStatus={onUpdateStatus}
                    onDelete={onDeleteOrder}
                    isUpdating={updatingStatus === order.id}
                    isDeleting={deletingOrder === order.id}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;