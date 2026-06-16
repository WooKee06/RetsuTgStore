import React from 'react';
import { cn } from '@shared/lib/utils';
import styles from './Input.module.scss';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  type?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  icon,
  type = 'text',
  error,
  className,
  disabled = false,
}) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={cn(styles.container, error && styles.error, disabled && styles.disabled)}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={styles.input}
        />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
