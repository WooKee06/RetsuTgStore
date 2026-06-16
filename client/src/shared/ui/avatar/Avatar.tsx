import React, { useState } from 'react';
import { cn, getInitials } from '@shared/lib/utils';
import styles from './Avatar.module.scss';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className,
}) => {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  return (
    <div
      className={cn(styles.avatar, styles[size], !showImage && styles.fallback, className)}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          className={styles.image}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={styles.initials}>{getInitials(name)}</span>
      )}
    </div>
  );
};
