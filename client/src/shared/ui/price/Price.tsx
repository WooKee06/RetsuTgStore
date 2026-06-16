import React from 'react';
import { cn, formatPrice, getDiscountPercent } from '@shared/lib/utils';
import styles from './Price.module.scss';

interface PriceProps {
  price: number;
  oldPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  price,
  oldPrice,
  size = 'md',
  className,
}) => {
  const discount = getDiscountPercent(price, oldPrice);

  return (
    <div className={cn(styles.price, styles[size], className)}>
      <span className={styles.current}>{formatPrice(price)}</span>
      {discount !== null && oldPrice && (
        <>
          <span className={styles.old}>{formatPrice(oldPrice)}</span>
          <span className={styles.discount}>-{discount}%</span>
        </>
      )}
    </div>
  );
};
