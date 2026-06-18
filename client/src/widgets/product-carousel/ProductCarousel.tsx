import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { ProductCard } from "@widgets/product-card";
import type { Product } from "@shared/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import styles from "./ProductCarousel.module.scss";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
  className?: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
  viewAllLink,
  className,
}) => {
  if (!products.length) return null;

  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink} className={styles.viewAll}>
            Смотреть все
          </Link>
        )}
      </div>
      <div className={styles.wrapper}>
        <Swiper
          modules={[Navigation, FreeMode]}
          freeMode={{ enabled: true, momentum: true, momentumRatio: 0.5 }}
          slidesPerView="auto"
          spaceBetween={12}
          className={styles.swiper}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className={styles.slide}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
