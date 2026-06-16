import React, { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@widgets/header';
import { BottomNav } from '@widgets/bottom-nav';
import { ProductCard } from '@widgets/product-card';
import { FilterSheet } from '@widgets/filters';
import { EmptyState } from '@shared/ui/empty-state';
import { Skeleton } from '@shared/ui/skeleton';
import { Button } from '@shared/ui/button';
import { staggerContainer, staggerItem } from '@shared/lib/motion';
import { useProducts } from '@api/hooks';
import type { SearchFilters, SortOption } from '@shared/types';
import styles from './CatalogPage.module.scss';

const PAGE_SIZE = 20;

function LoadingSkeletonGrid() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <Skeleton width="100%" height="213px" borderRadius={12} />
          <div className={styles.skeletonContent}>
            <Skeleton width="60px" height={10} borderRadius={4} />
            <Skeleton width="100%" height={14} borderRadius={4} />
            <Skeleton width="80px" height={12} borderRadius={4} />
          </div>
        </div>
      ))}
    </div>
  );
}

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <motion.button
      className={styles.chip}
      onClick={onRemove}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      type="button"
    >
      <span className={styles.chipLabel}>{label}</span>
      <svg
        className={styles.chipClose}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </motion.button>
  );
}

function filtersFromParams(params: URLSearchParams): SearchFilters {
  return {
    query: params.get('query') || '',
    category: params.get('category') || undefined,
    brand: params.get('brand') || undefined,
    minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : undefined,
    maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined,
    size: params.get('size') || undefined,
    color: params.get('color') || undefined,
    sort: (params.get('sort') as SortOption) || undefined,
  };
}

function paramsFromFilters(filters: SearchFilters): Record<string, string> {
  const entries: Record<string, string> = {};
  if (filters.query) entries.query = filters.query;
  if (filters.category) entries.category = filters.category;
  if (filters.brand) entries.brand = filters.brand;
  if (filters.minPrice !== undefined) entries.minPrice = String(filters.minPrice);
  if (filters.maxPrice !== undefined) entries.maxPrice = String(filters.maxPrice);
  if (filters.size) entries.size = filters.size;
  if (filters.color) entries.color = filters.color;
  if (filters.sort) entries.sort = filters.sort;
  return entries;
}

const CATEGORY_MAP: Record<string, string> = {
  'cat-1': 'Men',
  'cat-2': 'Women',
  'cat-3': 'Shoes',
  'cat-4': 'Accessories',
  'cat-5': 'Outerwear',
  'cat-6': 'Sportswear',
};

const SORT_LABELS: Record<string, string> = {
  popular: 'Popular',
  newest: 'Newest',
  'price-asc': 'Price Low-High',
  'price-desc': 'Price High-Low',
  rating: 'Rating',
};

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filters = useMemo(() => filtersFromParams(searchParams), [searchParams]);

  const { data: productsResult, isLoading } = useProducts(filters);
  const allProducts = productsResult?.data ?? [];

  const visibleProducts = useMemo(
    () => allProducts.slice(0, visibleCount),
    [allProducts, visibleCount],
  );

  const hasMore = visibleCount < allProducts.length;

  const handleApplyFilters = useCallback(
    (newFilters: SearchFilters) => {
      const entries = paramsFromFilters(newFilters);
      setSearchParams(entries, { replace: true });
      setVisibleCount(PAGE_SIZE);
    },
    [setSearchParams],
  );

  const handleRemoveFilter = useCallback(
    (key: keyof SearchFilters) => {
      const entries = paramsFromFilters(filters);
      delete entries[key];
      setSearchParams(entries, { replace: true });
      setVisibleCount(PAGE_SIZE);
    },
    [filters, setSearchParams],
  );

  const handleClearAll = useCallback(() => {
    setSearchParams({}, { replace: true });
    setVisibleCount(PAGE_SIZE);
  }, [setSearchParams]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  const activeFilterChips = useMemo(() => {
    const chips: { key: keyof SearchFilters; label: string }[] = [];
    if (filters.category) chips.push({ key: 'category', label: CATEGORY_MAP[filters.category] || filters.category });
    if (filters.size) chips.push({ key: 'size', label: filters.size });
    if (filters.color) chips.push({ key: 'color', label: filters.color });
    if (filters.minPrice !== undefined) chips.push({ key: 'minPrice', label: `Min $${filters.minPrice}` });
    if (filters.maxPrice !== undefined) chips.push({ key: 'maxPrice', label: `Max $${filters.maxPrice}` });
    if (filters.sort) chips.push({ key: 'sort', label: SORT_LABELS[filters.sort] || filters.sort });
    return chips;
  }, [filters]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <div className={styles.topBar}>
          <h1 className={styles.title}>Catalog</h1>
          <button
            className={styles.filterBtn}
            onClick={() => setIsFiltersOpen(true)}
            type="button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            Filters
          </button>
        </div>

        <AnimatePresence mode="popLayout">
          {activeFilterChips.length > 0 && (
            <motion.div
              className={styles.activeFilters}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.chipsRow}>
                <AnimatePresence mode="popLayout">
                  {activeFilterChips.map((chip) => (
                    <FilterChip
                      key={chip.key}
                      label={chip.label}
                      onRemove={() => handleRemoveFilter(chip.key)}
                    />
                  ))}
                </AnimatePresence>
                {activeFilterChips.length > 1 && (
                  <motion.button
                    className={styles.clearAll}
                    onClick={handleClearAll}
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Clear All
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <LoadingSkeletonGrid />
        ) : visibleProducts.length === 0 ? (
          <EmptyState
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            }
            title="No products found"
            description="Try adjusting your filters or search for something else"
            action={
              <Button variant="gold" onClick={handleClearAll}>
                Clear Filters
              </Button>
            }
          />
        ) : (
          <>
            <div className={styles.resultCount}>
              <span className={styles.countNumber}>{allProducts.length}</span>
              {allProducts.length === 1 ? ' product' : ' products'}
            </div>

            <motion.div
              className={styles.grid}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {visibleProducts.map((product) => (
                <motion.div key={product.id} variants={staggerItem}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {hasMore && (
              <div className={styles.loadMore}>
                <Button variant="ghost" onClick={handleLoadMore} fullWidth>
                  Load More
                </Button>
              </div>
            )}
          </>
        )}

        <FilterSheet
          isOpen={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
          filters={filters}
          onApply={handleApplyFilters}
        />
      </main>
      <BottomNav />
    </div>
  );
};

export default CatalogPage;
