import { Injectable, NotFoundException } from '@nestjs/common';
import { mockProducts, Product, SearchFilters, SortOption } from '../data';

@Injectable()
export class ProductsService {
  findAll(filters: SearchFilters): { data: Product[]; total: number; page: number; limit: number } {
    let result = [...mockProducts];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.categoryId === filters.category);
    }

    if (filters.brand) {
      result = result.filter((p) => p.brandId === filters.brand);
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.size) {
      result = result.filter((p) => p.sizes.includes(filters.size!));
    }

    if (filters.color) {
      result = result.filter((p) => p.colors.some((c) => c.name.toLowerCase() === filters.color!.toLowerCase()));
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

  findFeatured(): Product[] {
    return mockProducts.filter((p) => p.badges.includes('BESTSELLER') || p.badges.includes('HOT'));
  }

  findNew(): Product[] {
    return mockProducts.filter((p) => p.isNew);
  }

  findSale(): Product[] {
    return mockProducts.filter((p) => p.isSale);
  }

  findTrending(): Product[] {
    return mockProducts.filter((p) => p.badges.includes('TRENDING') || p.badges.includes('HOT'));
  }

  search(q: string): Product[] {
    if (!q) return [];
    const lower = q.toLowerCase();
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.toLowerCase().includes(lower)),
    );
  }

  findOne(id: string): Product {
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }
    return product;
  }

  private sortProducts(products: Product[], sort: SortOption): void {
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
}
