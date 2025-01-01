import React from 'react';
import Input from '../../ui/Input';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface ProductBasicInfoProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  categories: string[];
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({
  register,
  errors,
  categories,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Product Name"
          error={errors.name?.message}
          {...register('name')}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            {...register('category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category?.message && (
            <p className="text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.description?.message && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
    </>
  );
};

export default ProductBasicInfo;