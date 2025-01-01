import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../../../types';
import ProductForm from './ProductForm';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onSubmit,
  isSubmitting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {product ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <ProductForm
            initialData={product}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductModal;