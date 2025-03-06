import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';

export type ProductRepository = Repository<Product>;
