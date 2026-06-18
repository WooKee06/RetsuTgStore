import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@shared/lib/utils';
import { staggerContainer, staggerItem } from '@shared/lib/motion';
import type { Brand } from '@shared/types';
import styles from './BrandSection.module.scss';

interface BrandSectionProps {
  brands: Brand[];
  className?: string;
}

export const BrandSection: React.FC<BrandSectionProps> = ({ brands, className }) => {
  const handleBrandClick = (brand: Brand) => {
    // Navigation handled by parent or router
    console.log('Navigate to brand:', brand.name);
  };

  return (
    <section className={cn(styles.section, className)}>
      <h2 className={styles.title}>Популярные бренды</h2>
      <motion.div
        className={styles.scroll}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {brands.map((brand) => (
          <motion.button
            key={brand.id}
            className={styles.brandCard}
            onClick={() => handleBrandClick(brand)}
            variants={staggerItem}
            whileTap={{ scale: 0.95 }}
            type="button"
          >
            <div className={styles.imageWrap}>
              <img
                src={brand.logo}
                alt={brand.name}
                className={styles.image}
                loading="lazy"
              />
            </div>
            <span className={styles.brandName}>{brand.name}</span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};
