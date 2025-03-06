import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/core/entity/product.entity';
import { ProductRepository } from 'src/core/repository/product.repository';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { CreateProductDto } from './dto/create-product.dto';
import { DeepPartial } from 'typeorm';

@Injectable()
export class ProductsService extends BaseService<
  CreateProductDto,
  DeepPartial<Product>
> {
  constructor(@InjectRepository(Product) repository: ProductRepository) {
    super(repository);
  }
}
