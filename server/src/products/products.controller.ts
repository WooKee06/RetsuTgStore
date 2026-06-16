import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SortOption } from '../data';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('q') q?: string,
    @Query('category') category?: string,
    @Query('brand') brand?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('size') size?: string,
    @Query('color') color?: string,
    @Query('sort') sort?: SortOption,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.productsService.findAll({
      query: q || '',
      category,
      brand,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      size,
      color,
      sort,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get('featured')
  findFeatured() {
    return this.productsService.findFeatured();
  }

  @Get('new')
  findNew() {
    return this.productsService.findNew();
  }

  @Get('sale')
  findSale() {
    return this.productsService.findSale();
  }

  @Get('trending')
  findTrending() {
    return this.productsService.findTrending();
  }

  @Get('search')
  search(@Query('q') q?: string) {
    return this.productsService.search(q || '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
