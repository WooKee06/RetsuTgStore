import { Injectable } from '@nestjs/common';
import { mockCategories, Category } from '../data';

@Injectable()
export class CategoriesService {
  findAll(): Category[] {
    return mockCategories;
  }
}
