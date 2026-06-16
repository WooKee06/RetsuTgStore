export interface Product {
    id: string;
    name: string;
    brand: string;
    brandId: string;
    description: string;
    price: number;
    oldPrice?: number;
    images: string[];
    category: string;
    categoryId: string;
    rating: number;
    reviewCount: number;
    sizes: string[];
    colors: Color[];
    badges: Badge[];
    inStock: boolean;
    isNew: boolean;
    isSale: boolean;
    isFavorite: boolean;
    tags: string[];
    createdAt: string;
}
export interface Color {
    name: string;
    hex: string;
}
export type Badge = 'NEW' | 'SALE' | 'LIMITED' | 'BESTSELLER' | 'HOT' | 'TRENDING';
export interface Category {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    image?: string;
    productCount: number;
}
export interface Brand {
    id: string;
    name: string;
    logo: string;
    image: string;
}
export interface Banner {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    link?: string;
    gradient?: string;
}
export interface SearchFilters {
    query: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
    color?: string;
    sort?: SortOption;
    page?: number;
    limit?: number;
}
export type SortOption = 'popular' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
export interface ApiResponse<T> {
    data: T;
    total: number;
    page: number;
    limit: number;
}
export declare const mockCategories: Category[];
export declare const mockBrands: Brand[];
export declare const mockBanners: Banner[];
export declare const mockProducts: Product[];
