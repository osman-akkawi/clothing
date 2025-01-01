import React from 'react';
import { X } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface ProductImageUploadProps {
  images: string[];
  onImagesChange: (urls: string[]) => void;
  error?: string;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  images,
  onImagesChange,
  error
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Images
      </label>
      <ImageUpload
        images={images}
        onImagesChange={onImagesChange}
        maxImages={5}
      />
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => onImagesChange(images.filter((_, i) => i !== index))}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ProductImageUpload;