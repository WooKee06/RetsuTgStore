import { mockProducts, mockCategories, mockBrands, mockBanners } from './mockData';
import type { Product, Category, Brand, Banner, SearchFilters, SortOption } from '@shared/types';

function filterProducts(products: Product[], filters?: SearchFilters): Product[] {
  let result = [...products];

  if (filters?.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }

  if (filters?.category) {
    result = result.filter((p) => p.categoryId === filters.category);
  }

  if (filters?.brand) {
    result = result.filter((p) => p.brandId === filters.brand);
  }

  if (filters?.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters?.size) {
    result = result.filter((p) => p.sizes.includes(filters.size!));
  }

  if (filters?.color) {
    result = result.filter((p) => p.colors.some((clr) => clr.name.toLowerCase() === filters.color!.toLowerCase()));
  }

  if (filters?.sort) {
    sortProducts(result, filters.sort);
  }

  return result;
}

function sortProducts(products: Product[], sort: SortOption): void {
  switch (sort) {
    case 'newest':
      products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'price-asc':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
      products.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }
}

export function getProducts(filters?: SearchFilters): { data: Product[]; total: number } {
  const filtered = filterProducts(mockProducts, filters);
  return { data: filtered, total: filtered.length };
}

export function getProduct(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function searchProducts(query: string): Product[] {
  return filterProducts(mockProducts, { query });
}

export function getCategories(): Category[] {
  return mockCategories;
}

export function getBrands(): Brand[] {
  return mockBrands;
}

export function getBanners(): Banner[] {
  return mockBanners;
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((p) => p.badges.includes('BESTSELLER') || p.badges.includes('HOT'));
}

export function getNewProducts(): Product[] {
  return mockProducts.filter((p) => p.isNew);
}

export function getSaleProducts(): Product[] {
  return mockProducts.filter((p) => p.isSale);
}

export function getTrendingProducts(): Product[] {
  return mockProducts.filter((p) => p.badges.includes('TRENDING') || p.badges.includes('HOT'));
}
