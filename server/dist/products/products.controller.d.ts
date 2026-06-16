import { ProductsService } from './products.service';
import { SortOption } from '../data';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(q?: string, category?: string, brand?: string, minPrice?: string, maxPrice?: string, size?: string, color?: string, sort?: SortOption, page?: string, limit?: string): {
        data: import("../data").Product[];
        total: number;
        page: number;
        limit: number;
    };
    findFeatured(): import("../data").Product[];
    findNew(): import("../data").Product[];
    findSale(): import("../data").Product[];
    findTrending(): import("../data").Product[];
    search(q?: string): import("../data").Product[];
    findOne(id: string): import("../data").Product;
}
