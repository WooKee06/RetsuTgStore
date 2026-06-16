import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { favoriteStore } from '@store';
import { Header } from '@widgets/header';
import { BottomNav } from '@widgets/bottom-nav';
import { ProductCard } from '@widgets/product-card';
import { Button } from '@shared/ui/button';
import { EmptyState } from '@shared/ui/empty-state';
import { staggerContainer, staggerItem } from '@shared/lib/motion';
import styles from './FavoritesPage.module.scss';

const heartIcon = (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const FavoritesPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const favorites = favoriteStore.items;
  const favoriteCount = favoriteStore.count;

  const handleBrowse = useCallback(() => {
    navigate('/catalog');
  }, [navigate]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <div className={styles.titleRow}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Favorites
          </motion.h1>
          {favoriteCount > 0 && (
            <motion.span
              className={styles.count}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {favoriteCount} {favoriteCount === 1 ? 'item' : 'items'}
            </motion.span>
          )}
        </div>

        {favorites.length === 0 ? (
          <motion.div
            className={styles.emptyWrap}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <EmptyState
              icon={heartIcon}
              title="No favorites yet"
              description="Save items you love by tapping the heart icon on any product."
              action={
                <Button variant="gold" onClick={handleBrowse}>
                  Browse Collection
                </Button>
              }
            />
          </motion.div>
        ) : (
          <motion.div
            className={styles.grid}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {favorites.map((product) => (
                <motion.div
                  key={product.id}
                  className={styles.gridItem}
                  variants={staggerItem}
                  layout
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
      <BottomNav />
    </div>
  );
});

export default FavoritesPage;
