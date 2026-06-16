import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProducts,
  getProduct,
  searchProducts,
  getCategories,
  getBrands,
  getBanners,
  getFeaturedProducts,
  getNewProducts,
  getSaleProducts,
  getTrendingProducts,
} from './index';
import type { SearchFilters, Product } from '@shared/types';
import { cartStore } from '@store/CartStore';

export function useProducts(filters?: SearchFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => searchProducts(query),
    enabled: query.length > 0,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });
}

export function useBanners() {
  return useQuery({
    queryKey: ['banners'],
    queryFn: getBanners,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts,
  });
}

export function useNewProducts() {
  return useQuery({
    queryKey: ['products', 'new'],
    queryFn: getNewProducts,
  });
}

export function useSaleProducts() {
  return useQuery({
    queryKey: ['products', 'sale'],
    queryFn: getSaleProducts,
  });
}

export function useTrendingProducts() {
  return useQuery({
    queryKey: ['products', 'trending'],
    queryFn: getTrendingProducts,
  });
}

export function useAddToCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ product, size, color }: { product: Product; size: string; color: { name: string; hex: string } }) => {
      cartStore.addItem(product, size, color);
      return Promise.resolve(cartStore.items);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useRemoveFromCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => {
      cartStore.removeItem(productId);
      return Promise.resolve(cartStore.items);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
