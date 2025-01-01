import React from 'react';
import Input from '../../ui/Input';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface ProductInventoryProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  sizes: string[];
}

const ProductInventory: React.FC<ProductInventoryProps> = ({
  register,
  errors,
  sizes,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="number"
          label="Price"
          step="0.01"
          error={errors.price?.message}
          {...register('price', { valueAsNumber: true })}
        />
        <Input
          type="number"
          label="Stock"
          error={errors.stock?.message}
          {...register('stock', { valueAsNumber: true })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sizes</label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {sizes.map(size => (
            <label key={size} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={size}
                {...register('sizes')}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
        {errors.sizes?.message && (
          <p className="text-sm text-red-600">{errors.sizes.message}</p>
        )}
      </div>
    </>
  );
};

export default ProductInventory;