import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

interface ProductImagesProps {
  images: string[];
  name: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images, name }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      className="aspect-square rounded-lg overflow-hidden"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`${name} - Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductImages;