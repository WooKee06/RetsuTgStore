export declare class QueryProductsDto {
    q?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
    color?: string;
    sort?: 'popular' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
    page?: number;
    limit?: number;
}
