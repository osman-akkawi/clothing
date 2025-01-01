import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../../utils/validation';
import { Product } from '../../../types';
import Button from '../../ui/Button';
import ProductBasicInfo from './ProductBasicInfo';
import ProductInventory from './ProductInventory';
import ProductImageUpload from './ProductImageUpload';
import { toast } from 'react-hot-toast';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const [images, setImages] = React.useState<string[]>(initialData?.images || []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...initialData,
      price: initialData?.price || 0,
      stock: initialData?.stock || 0,
    },
  });

  const handleFormSubmit = async (data: any) => {
    if (images.length === 0) {
      toast.error('At least one image is required');
      return;
    }

    try {
      const formData = new FormData();
      
      // Add basic fields
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price', data.price.toString());
      formData.append('stock', data.stock.toString());
      
      // Handle sizes array
      const selectedSizes = Array.isArray(data.sizes) 
        ? data.sizes 
        : Object.keys(data.sizes).filter(size => data.sizes[size]);
      
      if (selectedSizes.length === 0) {
        toast.error('At least one size must be selected');
        return;
      }
      
      formData.append('sizes', JSON.stringify(selectedSizes));
      formData.append('images', JSON.stringify(images));

      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to save product');
    }
  };

  const categories = [
    'T-Shirts',
    'Jeans',
    'Dresses',
    'Jackets',
    'Accessories',
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <ProductBasicInfo
        register={register}
        errors={errors}
        categories={categories}
      />

      <ProductInventory
        register={register}
        errors={errors}
        sizes={sizes}
      />

      <ProductImageUpload
        images={images}
        onImagesChange={setImages}
        error={images.length === 0 ? 'At least one image is required' : undefined}
      />

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
      >
        {initialData ? 'Update Product' : 'Create Product'}
      </Button>
    </form>
  );
};

export default ProductForm;