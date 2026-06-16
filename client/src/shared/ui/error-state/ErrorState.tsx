import React from 'react';
import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/button';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
  title: string;
  message?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  description,
  onRetry,
  className,
}) => {
  const text = description || message;
  return (
    <div className={cn(styles.errorState, className)}>
      <div className={styles.icon}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className={styles.title}>{title}</h3>
      {text && <p className={styles.message}>{text}</p>}
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
