export const API_URL = import.meta.env.VITE_API_URL || '/api';

export const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
  'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80',
  'https://images.unsplash.com/photo-1488161628813-04466f085f3e?w=600&q=80',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
  'https://images.unsplash.com/photo-1608234807905-4466023792f5?w=600&q=80',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80',
  'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80',
  'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&q=80',
];

export const CATEGORY_IMAGES: Record<string, string> = {
  men: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  women: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&q=80',
  shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
  accessories: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  outerwear: 'https://images.unsplash.com/photo-1544923246-77307dd270b5?w=400&q=80',
  sportswear: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80',
};

export const BRAND_IMAGES: Record<string, string> = {
  'Nike': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80',
  'Adidas': 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&q=80',
  'Puma': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&q=80',
  'Gucci': 'https://images.unsplash.com/photo-1585487000160-death-to-stock-photography-4.jpg?w=200&q=80',
  'Balenciaga': 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200&q=80',
  'Off-White': 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=200&q=80',
};

export const PROMO_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  sale: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
  collection: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
};

export const PAGE_SIZE = 20;

export const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
] as const;
