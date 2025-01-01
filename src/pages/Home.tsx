import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const { products, loading } = useProducts({ category: 'featured' });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gray-900 text-white">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">New Season Arrivals</h1>
            <p className="text-xl mb-8">Check out this season's latest trends</p>
            <Link
              to="/shop"
              className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-md hover:bg-gray-100"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/shop" className="text-indigo-600 hover:text-indigo-500">
            View All
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-w-1 aspect-h-1 rounded-md mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;