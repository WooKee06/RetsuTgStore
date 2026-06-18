import React, { useState, useCallback } from 'react';
import { Modal } from '@shared/ui/modal';
import { Button } from '@shared/ui/button';
import { Checkbox } from '@shared/ui/checkbox';
import { cn } from '@shared/lib/utils';
import type { SearchFilters, SortOption } from '@shared/types';
import styles from './FilterSheet.module.scss';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onApply: (filters: SearchFilters) => void;
}

const CATEGORIES = [
  { id: 'cat-1', name: 'Мужское' },
  { id: 'cat-2', name: 'Женское' },
  { id: 'cat-3', name: 'Обувь' },
  { id: 'cat-4', name: 'Аксессуары' },
  { id: 'cat-5', name: 'Верхняя одежда' },
  { id: 'cat-6', name: 'Спортивное' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Популярные' },
  { value: 'newest', label: 'Новинки' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'rating', label: 'Рейтинг' },
];

const COLOR_SWATCHES = [
  { name: 'Чёрный', hex: '#0a0a0a' },
  { name: 'Белый', hex: '#f5f5f5' },
  { name: 'Серый', hex: '#6b7280' },
  { name: 'Тёмно-синий', hex: '#1e3a5f' },
  { name: 'Коричневый', hex: '#5c4033' },
  { name: 'Красный', hex: '#dc2626' },
  { name: 'Синий', hex: '#3b82f6' },
  { name: 'Зелёный', hex: '#2d5a27' },
  { name: 'Бежевый', hex: '#c2b280' },
  { name: 'Розовый', hex: '#f9a8d4' },
];

export const FilterSheet: React.FC<FilterSheetProps> = ({
  isOpen,
  onClose,
  filters,
  onApply,
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>({ ...filters });

  const handleCategoryChange = useCallback((categoryId: string, checked: boolean) => {
    setLocalFilters((prev) => ({
      ...prev,
      category: checked ? categoryId : undefined,
    }));
  }, []);

  const handleSizeChange = useCallback((size: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      size: prev.size === size ? undefined : size,
    }));
  }, []);

  const handleColorChange = useCallback((hex: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      color: prev.color === hex ? undefined : hex,
    }));
  }, []);

  const handleSortChange = useCallback((sort: SortOption) => {
    setLocalFilters((prev) => ({
      ...prev,
      sort,
    }));
  }, []);

  const handleMinPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setLocalFilters((prev) => ({
      ...prev,
      minPrice: value,
    }));
  }, []);

  const handleMaxPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setLocalFilters((prev) => ({
      ...prev,
      maxPrice: value,
    }));
  }, []);

  const handleApply = useCallback(() => {
    onApply(localFilters);
    onClose();
  }, [localFilters, onApply, onClose]);

  const handleReset = useCallback(() => {
    const reset: SearchFilters = { query: filters.query };
    setLocalFilters(reset);
  }, [filters.query]);

  const hasActiveFilters =
    localFilters.category ||
    localFilters.size ||
    localFilters.color ||
    localFilters.minPrice ||
    localFilters.maxPrice ||
    localFilters.sort;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Фильтры">
      <div className={styles.content}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Категория</h3>
          <div className={styles.checkboxList}>
            {CATEGORIES.map((cat) => (
              <Checkbox
                key={cat.id}
                checked={localFilters.category === cat.id}
                onChange={(checked) => handleCategoryChange(cat.id, checked)}
                label={cat.name}
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Ценовой диапазон</h3>
          <div className={styles.priceInputs}>
            <div className={styles.priceField}>
              <span className={styles.priceLabel}>От</span>
              <input
                type="number"
                className={styles.priceInput}
                value={localFilters.minPrice ?? ''}
                onChange={handleMinPriceChange}
                placeholder="0"
                min={0}
              />
            </div>
            <span className={styles.priceDash}>—</span>
            <div className={styles.priceField}>
              <span className={styles.priceLabel}>До</span>
              <input
                type="number"
                className={styles.priceInput}
                value={localFilters.maxPrice ?? ''}
                onChange={handleMaxPriceChange}
                placeholder="9999"
                min={0}
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Размер</h3>
          <div className={styles.chips}>
            {SIZES.map((size) => (
              <button
                key={size}
                className={cn(styles.chip, localFilters.size === size && styles.chipActive)}
                onClick={() => handleSizeChange(size)}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Цвет</h3>
          <div className={styles.colors}>
            {COLOR_SWATCHES.map((color) => (
              <button
                key={color.hex}
                className={cn(styles.colorSwatch, localFilters.color === color.hex && styles.colorActive)}
                onClick={() => handleColorChange(color.hex)}
                type="button"
                aria-label={color.name}
              >
                <span
                  className={styles.colorFill}
                  style={{ backgroundColor: color.hex }}
                />
                {localFilters.color === color.hex && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Сортировка</h3>
          <div className={styles.radioList}>
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={cn(styles.radioItem, localFilters.sort === opt.value && styles.radioActive)}
                onClick={() => handleSortChange(opt.value)}
                type="button"
              >
                <span className={cn(styles.radioDot, localFilters.sort === opt.value && styles.radioDotActive)} />
                {opt.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className={styles.footer}>
        <Button
          variant="ghost"
          onClick={handleReset}
          disabled={!hasActiveFilters}
        >
          Сбросить
        </Button>
        <Button variant="gold" onClick={handleApply} className={styles.applyBtn}>
          Применить фильтры
        </Button>
      </div>
    </Modal>
  );
};
