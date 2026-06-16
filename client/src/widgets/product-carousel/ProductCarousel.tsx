import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductCard } from '@widgets/product-card';
import { staggerContainer, staggerItem } from '@shared/lib/motion';
import type { Product } from '@shared/types';
import styles from './ProductCarousel.module.scss';

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
    <section className={`${styles.section} ${className || ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink} className={styles.viewAll}>
            View All
          </Link>
        )}
      </div>
      <motion.div
        className={styles.scroll}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <motion.div key={product.id} className={styles.item} variants={staggerItem}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
