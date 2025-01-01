import React from 'react';
import Input from '../ui/Input';
import { FilterState, FilterChangeHandler } from './types';
import { PRODUCT_CATEGORIES } from '../../constants/products';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: FilterChangeHandler;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onFilterChange }) => {
  const handleClearFilters = () => {
    onFilterChange({
      category: '',
      minPrice: '',
      maxPrice: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Categories</h3>
          {PRODUCT_CATEGORIES.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={(e) => onFilterChange({ category: e.target.value })}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Price Range</h3>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => onFilterChange({ minPrice: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;