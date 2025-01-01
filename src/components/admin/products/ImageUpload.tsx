import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (urls: string[]) => void;
  maxImages: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  maxImages,
}) => {
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const remainingSlots = maxImages - images.length;
    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    const uploadPromises = filesToUpload.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return publicUrl;
    });

    try {
      const newUrls = await Promise.all(uploadPromises);
      onImagesChange([...images, ...newUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  }, [images, maxImages, onImagesChange]);

  return (
    <div className="mt-2">
      <label className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <span>Upload images</span>
            <input
              type="file"
              className="sr-only"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              disabled={images.length >= maxImages}
            />
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB (max {maxImages} images)
          </p>
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;