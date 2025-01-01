import React from 'react';
import { Product } from '../../types';
import { formatPrice } from '../../utils/price';
import { Edit, Trash2 } from 'lucide-react';

interface ProductsTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit?: (product: Product) => void;
  isDeleting?: string | null;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onDelete,
  onEdit,
  isDeleting,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatPrice(product.price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.stock}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 text-gray-500 hover:text-indigo-600"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(product.id)}
                    disabled={isDeleting === product.id}
                    className="p-2 text-gray-500 hover:text-red-600"
                  >
                    {isDeleting === product.id ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-600" />
                    ) : (
                      <Trash2 className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;