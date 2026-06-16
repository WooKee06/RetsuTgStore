import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { cartStore, favoriteStore } from '@store';
import { cn } from '@shared/lib/utils';
import styles from './BottomNav.module.scss';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    path: '/',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" className={styles.icon}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    path: '/catalog',
    label: 'Catalog',
    icon: (
      <svg viewBox="0 0 24 24" className={styles.icon}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    path: '/favorites',
    label: 'Favorites',
    icon: (
      <svg viewBox="0 0 24 24" className={styles.icon}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    path: '/cart',
    label: 'Cart',
    icon: (
      <svg viewBox="0 0 24 24" className={styles.icon}>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: (
      <svg viewBox="0 0 24 24" className={styles.icon}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export const BottomNav: React.FC = observer(() => {
  const cartCount = cartStore.totalItems;
  const favCount = favoriteStore.count;

  const badges: Record<string, number> = {
    '/favorites': favCount,
    '/cart': cartCount,
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(styles.link, isActive && styles.active)
            }
          >
            {() => (
              <motion.div
                className={styles.linkInner}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <div className={styles.iconWrap}>
                  {item.icon}
                  {badges[item.path] !== undefined && badges[item.path] > 0 && (
                    <span className={styles.badge}>
                      {badges[item.path] > 99 ? '99+' : badges[item.path]}
                    </span>
                  )}
                </div>
                <span className={styles.label}>{item.label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
});
