import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchInput } from '@shared/ui/search-input';
import { ProductCard } from '@widgets/product-card/ProductCard';
import { useSearchProducts } from '@api/hooks';
import { staggerContainer, staggerItem } from '@shared/lib/motion';
import { cn } from '@shared/lib/utils';
import type { Product } from '@shared/types';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onClose: () => void;
}

const POPULAR_TAGS = ['Куртки', 'Кроссовки', 'Nike', 'Лето', 'Платья', 'Очки'];
const RECENT_KEY = 'retsu_recent_searches';

function loadRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecentSearches(searches: string[]): void {
  localStorage.setItem(RECENT_KEY, JSON.stringify(searches));
}

export const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(loadRecentSearches);
  const { data: results, isLoading } = useSearchProducts(query);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.trim()) {
      setRecentSearches((prev) => {
        const updated = [value, ...prev.filter((s) => s !== value)].slice(0, 10);
        saveRecentSearches(updated);
        return updated;
      });
    }
  }, []);

  const handleTagClick = useCallback((tag: string) => {
    setQuery(tag);
    setRecentSearches((prev) => {
      const updated = [tag, ...prev.filter((s) => s !== tag)].slice(0, 10);
      saveRecentSearches(updated);
      return updated;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_KEY);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const hasQuery = query.trim().length > 0;
  const products: Product[] = results ?? [];
  const showResults = hasQuery && products.length > 0;
  const showNoResults = hasQuery && !isLoading && products.length === 0;

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    >
      <div className={styles.header}>
        <SearchInput
          value={query}
          onChange={handleSearch}
          placeholder="Поиск товаров..."
          autoFocus
          onClear={() => setQuery('')}
          className={styles.searchInput}
        />
        <button className={styles.cancel} onClick={onClose} type="button">
          Отмена
        </button>
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {showResults ? (
            <motion.div
              key="results"
              className={styles.results}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className={styles.resultsGrid}>
                {products.map((product: Product) => (
                  <motion.div key={product.id} variants={staggerItem}>
                    <ProductCard product={product} layout="grid" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : showNoResults ? (
            <motion.div
              key="no-results"
              className={styles.empty}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              <p className={styles.emptyText}>Нет результатов для "{query}"</p>
            </motion.div>
          ) : (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {recentSearches.length > 0 && (
                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>Недавние запросы</h3>
                    <button className={styles.clearBtn} onClick={clearRecent} type="button">
                      Очистить
                    </button>
                  </div>
                  <div className={styles.tags}>
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        className={styles.tag}
                        onClick={() => handleSearch(term)}
                        type="button"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {term}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Популярные запросы</h3>
                <div className={styles.tags}>
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag}
                      className={cn(styles.tag, styles.popularTag)}
                      onClick={() => handleTagClick(tag)}
                      type="button"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      {tag}
                    </button>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
