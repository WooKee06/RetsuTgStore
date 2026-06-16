import { Injectable } from '@nestjs/common';
import { mockBanners, Banner } from '../data';

@Injectable()
export class BannersService {
  findAll(): Banner[] {
    return mockBanners;
  }
}
