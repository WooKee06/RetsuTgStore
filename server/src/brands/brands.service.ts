import { Injectable } from '@nestjs/common';
import { mockBrands, Brand } from '../data';

@Injectable()
export class BrandsService {
  findAll(): Brand[] {
    return mockBrands;
  }
}
