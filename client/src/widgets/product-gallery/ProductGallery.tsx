import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Zoom } from 'swiper/modules';
import { cn } from '@shared/lib/utils';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import styles from './ProductGallery.module.scss';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className={cn(styles.gallery, className)}>
      <Swiper
        modules={[Pagination, Zoom]}
        pagination={{ clickable: true }}
        zoom
        loop={images.length > 1}
        spaceBetween={0}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={handleSlideChange}
        className={styles.swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <div className="swiper-zoom-container">
              <img
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                className={styles.image}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.counter}>
        <span className={styles.counterText}>
          {activeIndex + 1}/{images.length}
        </span>
      </div>
    </div>
  );
};
