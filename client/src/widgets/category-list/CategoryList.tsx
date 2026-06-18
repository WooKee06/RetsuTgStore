import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@shared/lib/motion";
import type { Category } from "@shared/types";
import styles from "./CategoryList.module.scss";

interface CategoryListProps {
  categories: Category[];
  activeCategory?: string;
  onSelect?: (categoryId: string) => void;
  className?: string;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  activeCategory,
  onSelect,
  className,
}) => {
  return (
    <motion.div
      className={`${styles.list} ${className || ""}`}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          className={`${styles.item} ${activeCategory === category.id ? styles.active : ""}`}
          variants={staggerItem}
          onClick={() => onSelect?.(category.id)}
          whileTap={{ scale: 0.93 }}
        >
          <div className={styles.imageWrap}>
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className={styles.image}
                loading="lazy"
              />
            ) : (
              <div className={styles.placeholder}>
                <span className={styles.icon}>
                  {category.icon || category.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <span className={styles.name}>{category.name} </span>
        </motion.button>
      ))}
    </motion.div>
  );
};
