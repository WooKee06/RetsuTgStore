import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchProducts } from '@api/hooks';
import { SearchInput } from '@shared/ui/search-input';
import { EmptyState } from '@shared/ui/empty-state';
import { Skeleton } from '@shared/ui/skeleton';
import { ProductCard } from '@widgets/product-card';
import { staggerContainer, staggerItem, pageTransition } from '@shared/lib/motion';
import styles from './SearchPage.module.scss';

const RECENT_SEARCHES_KEY = 'retsu_recent_searches';
const MAX_RECENT = 10;

const POPULAR_TAGS = [
  'Кроссовки', 'Куртки', 'Часы', 'Солнцезащитные очки',
  'Рюкзаки', 'Худи', 'Платья', 'Кольца',
];

function loadRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecentSearches(searches: string[]): void {
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
}

const ClockIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SearchIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const LoadingGrid: React.FC = () => (
  <div className={styles.grid}>
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className={styles.skeletonCard}>
        <Skeleton width="100%" height={180} borderRadius={12} />
        <Skeleton width="60%" height={14} className={styles.skeletonText} />
        <Skeleton width="80%" height={14} className={styles.skeletonText} />
        <Skeleton width="40%" height={14} className={styles.skeletonText} />
      </div>
    ))}
  </div>
);

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(loadRecentSearches);

  const { data: results = [], isLoading } = useSearchProducts(query);

  const saveToRecent = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, MAX_RECENT);
      saveRecentSearches(updated);
      return updated;
    });
  }, []);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleSelectTag = useCallback((tag: string) => {
    setQuery(tag);
    saveToRecent(tag);
  }, [saveToRecent]);

  const handleSelectRecent = useCallback((term: string) => {
    setQuery(term);
    saveToRecent(term);
  }, [saveToRecent]);

  const clearQuery = useCallback(() => {
    setQuery('');
  }, []);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const resultCountText = useMemo(() => {
    if (!query.trim()) return '';
    return `${results.length} результат${results.length !== 1 ? (results.length < 5 ? 'а' : 'ов') : ''} для "${query}"`;
  }, [results.length, query]);

  return (
    <motion.div
      className={styles.page}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <header className={styles.header}>
        <SearchInput
          value={query}
          onChange={handleQueryChange}
          autoFocus
          onClear={clearQuery}
          placeholder="Поиск товаров..."
          className={styles.searchInput}
        />
        <button className={styles.cancelBtn} onClick={goBack}>
          Отмена
        </button>
      </header>

      <main className={styles.content}>
        <AnimatePresence mode="wait">
          {!query.trim() && (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.popular}>
                <h3 className={styles.sectionTitle}>Популярные запросы</h3>
                <div className={styles.tags}>
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag}
                      className={styles.tag}
                      onClick={() => handleSelectTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {recentSearches.length > 0 && (
                <div className={styles.recent}>
                  <h3 className={styles.sectionTitle}>Недавние запросы</h3>
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      className={styles.recentItem}
                      onClick={() => handleSelectRecent(search)}
                    >
                      <ClockIcon />
                      <span>{search}</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {query.trim() && isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingGrid />
            </motion.div>
          )}

          {query.trim() && !isLoading && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className={styles.resultCount}>{resultCountText}</p>

              {results.length > 0 ? (
                <motion.div
                  className={styles.grid}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {results.map((product) => (
                    <motion.div key={product.id} variants={staggerItem}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <EmptyState
                  icon={<SearchIcon />}
                  title="Ничего не найдено"
                  description="Попробуйте другие ключевые слова"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
};
