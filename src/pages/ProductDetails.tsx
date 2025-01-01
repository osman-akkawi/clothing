import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useProduct } from '../hooks/useProduct';
import { toast } from 'react-hot-toast';
import ProductImages from '../components/product/ProductImages';
import ProductInfo from '../components/product/ProductInfo';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id!);
  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/shop')}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addItem(product, quantity, selectedSize);
    toast.success('Added to cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImages images={product.images} name={product.name} />
        <ProductInfo
          product={product}
          selectedSize={selectedSize}
          onSizeSelect={setSelectedSize}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default ProductDetails;