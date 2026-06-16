import React from 'react';
import { cn } from '@shared/lib/utils';
import styles from './Counter.module.scss';

interface CounterProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
  className,
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={cn(styles.counter, className)}>
      <button
        className={cn(styles.button, value <= min && styles.disabled)}
        onClick={handleDecrement}
        disabled={value <= min}
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span className={styles.value}>{value}</span>
      <button
        className={cn(styles.button, value >= max && styles.disabled)}
        onClick={handleIncrement}
        disabled={value >= max}
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
};
