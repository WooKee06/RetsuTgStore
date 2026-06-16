import { Product, SearchFilters } from '../data';
export declare class ProductsService {
    findAll(filters: SearchFilters): {
        data: Product[];
        total: number;
        page: number;
        limit: number;
    };
    findFeatured(): Product[];
    findNew(): Product[];
    findSale(): Product[];
    findTrending(): Product[];
    search(q: string): Product[];
    findOne(id: string): Product;
    private sortProducts;
}
