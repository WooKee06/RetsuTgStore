"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const data_1 = require("../data");
let ProductsService = class ProductsService {
    findAll(filters) {
        let result = [...data_1.mockProducts];
        if (filters.query) {
            const q = filters.query.toLowerCase();
            result = result.filter((p) => p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.tags.some((t) => t.toLowerCase().includes(q)));
        }
        if (filters.category) {
            result = result.filter((p) => p.categoryId === filters.category);
        }
        if (filters.brand) {
            result = result.filter((p) => p.brandId === filters.brand);
        }
        if (filters.minPrice !== undefined) {
            result = result.filter((p) => p.price >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            result = result.filter((p) => p.price <= filters.maxPrice);
        }
        if (filters.size) {
            result = result.filter((p) => p.sizes.includes(filters.size));
        }
        if (filters.color) {
            result = result.filter((p) => p.colors.some((c) => c.name.toLowerCase() === filters.color.toLowerCase()));
        }
        if (filters.sort) {
            this.sortProducts(result, filters.sort);
        }
        const page = filters.page || 1;
        const limit = filters.limit || 20;
        const start = (page - 1) * limit;
        const paginated = result.slice(start, start + limit);
        return {
            data: paginated,
            total: result.length,
            page,
            limit,
        };
    }
    findFeatured() {
        return data_1.mockProducts.filter((p) => p.badges.includes('BESTSELLER') || p.badges.includes('HOT'));
    }
    findNew() {
        return data_1.mockProducts.filter((p) => p.isNew);
    }
    findSale() {
        return data_1.mockProducts.filter((p) => p.isSale);
    }
    findTrending() {
        return data_1.mockProducts.filter((p) => p.badges.includes('TRENDING') || p.badges.includes('HOT'));
    }
    search(q) {
        if (!q)
            return [];
        const lower = q.toLowerCase();
        return data_1.mockProducts.filter((p) => p.name.toLowerCase().includes(lower) ||
            p.brand.toLowerCase().includes(lower) ||
            p.description.toLowerCase().includes(lower) ||
            p.tags.some((t) => t.toLowerCase().includes(lower)));
    }
    findOne(id) {
        const product = data_1.mockProducts.find((p) => p.id === id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with id "${id}" not found`);
        }
        return product;
    }
    sortProducts(products, sort) {
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
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map