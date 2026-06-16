import { z } from 'zod';

export const promoCodeSchema = z.object({
  code: z.string().min(1, 'Enter promo code').max(20, 'Code too long'),
});

export const searchSchema = z.object({
  query: z.string().max(100, 'Search query too long'),
});

export const filterSchema = z.object({
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  sort: z.enum(['popular', 'newest', 'price-asc', 'price-desc', 'rating']).optional(),
});

export type PromoCodeFormData = z.infer<typeof promoCodeSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
export type FilterFormData = z.infer<typeof filterSchema>;
