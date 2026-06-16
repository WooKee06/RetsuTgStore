import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { BannersModule } from './banners/banners.module';
import { HealthController } from './health.controller';

@Module({
  imports: [ProductsModule, CategoriesModule, BrandsModule, BannersModule],
  controllers: [HealthController],
})
export class AppModule {}
