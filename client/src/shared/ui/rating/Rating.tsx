import React from 'react';
import { cn } from '@shared/lib/utils';
import styles from './Rating.module.scss';

interface RatingProps {
  value: number;
  count: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg viewBox="0 0 20 20" className={cn(styles.star, filled && styles.filled)}>
    <path d="M10 1l2.5 5.5L18 7.5l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1z" />
  </svg>
);

export const Rating: React.FC<RatingProps> = ({
  value,
  count,
  size = 'md',
  className,
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className={cn(styles.rating, styles[size], className)}>
      <div className={styles.stars}>
        {stars.map((star) => (
          <Star key={star} filled={star <= Math.round(value)} />
        ))}
      </div>
      <span className={styles.value}>{value.toFixed(1)}</span>
      <span className={styles.count}>({count})</span>
    </div>
  );
};
