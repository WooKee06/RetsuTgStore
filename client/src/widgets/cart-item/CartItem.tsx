import React from 'react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { cartStore } from '@store';
import { Counter } from '@shared/ui/counter';
import { Price } from '@shared/ui/price';
import { cn } from '@shared/lib/utils';
import type { CartItem as CartItemType } from '@shared/types';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemType;
  className?: string;
}

export const CartItem: React.FC<CartItemProps> = observer(({ item, className }) => {
  const handleQuantityChange = (quantity: number) => {
    cartStore.updateQuantity(item.product.id, quantity);
  };

  const handleRemove = () => {
    cartStore.removeItem(item.product.id);
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <motion.div
      className={cn(styles.item, className)}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className={styles.imageWrap}>
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <div className={styles.info}>
        <button className={styles.removeBtn} onClick={handleRemove} type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <span className={styles.brand}>{item.product.brand}</span>
        <h4 className={styles.name}>{item.product.name}</h4>
        <div className={styles.options}>
          <span className={styles.option}>{item.selectedSize}</span>
          <span
            className={styles.colorSwatch}
            style={{ backgroundColor: item.selectedColor.hex }}
          />
          <span className={styles.option}>{item.selectedColor.name}</span>
        </div>
      </div>

      <div className={styles.right}>
        <Counter
          value={item.quantity}
          min={1}
          max={item.product.inStock ? 99 : 1}
          onChange={handleQuantityChange}
        />
        <div className={styles.price}>
          <Price price={itemTotal} size="md" />
        </div>
      </div>
    </motion.div>
  );
});
