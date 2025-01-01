import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { productService } from '../../services/productService';
import Button from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ProductsTable from '../../components/admin/ProductsTable';
import ProductModal from '../../components/admin/products/ProductModal';
import { Product } from '../../types';

const Products = () => {
  const { products, loading } = useProducts();
  const [isDeleting, setIsDeleting] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | undefined>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      await productService.deleteProduct(id);
      toast.success('Product deleted successfully');
      window.location.reload();
    } catch (error) {
      toast.error('Failed to delete product');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      
      if (selectedProduct) {
        await productService.updateProduct(selectedProduct.id, formData);
        toast.success('Product updated successfully');
      } else {
        await productService.createProduct(formData);
        toast.success('Product created successfully');
      }
      
      setIsModalOpen(false);
      window.location.reload();
    } catch (error: any) {
      console.error('Error submitting product:', error);
      toast.error(error?.message || 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => {
          setSelectedProduct(undefined);
          setIsModalOpen(true);
        }}>
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <ProductsTable
          products={products}
          onDelete={handleDelete}
          onEdit={handleEdit}
          isDeleting={isDeleting}
        />
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Products;