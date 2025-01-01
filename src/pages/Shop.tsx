import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { SlidersHorizontal } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductGrid from '../components/shop/ProductGrid';
import ProductFilters from '../components/shop/ProductFilters';
import SearchBar from '../components/shop/SearchBar';
import LoadingGrid from '../components/shop/LoadingGrid';

const Shop: React.FC = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const { products, loading, error } = useProducts({
    search: filters.search,
    category: filters.category || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error loading products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <ProductFilters
            filters={filters}
            onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
          />
        </div>

        {/* Products */}
        <div className="flex-1">
          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <SearchBar
                  value={filters.search}
                  onChange={(value) => setFilters({ ...filters, search: value })}
                />
              </div>
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {loading ? (
            <LoadingGrid />
          ) : products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;