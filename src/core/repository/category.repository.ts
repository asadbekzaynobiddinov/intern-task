import { Repository } from 'typeorm';
import { Category } from '../entity/category.entity';

export type CategoryRepository = Repository<Category>;
