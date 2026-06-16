import React from 'react';
import { cn } from '@shared/lib/utils';
import styles from './Badge.module.scss';

interface BadgeProps {
  variant: 'gold' | 'new' | 'sale' | 'hot' | 'trending' | 'limited' | 'bestseller';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children, className }) => {
  return (
    <span className={cn(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
};
