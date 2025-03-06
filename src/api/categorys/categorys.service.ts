import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/core/entity/category.entity';
import { CategoryRepository } from 'src/core/repository/category.repository';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeepPartial } from 'typeorm';

@Injectable()
export class CategorysService extends BaseService<
  CreateCategoryDto,
  DeepPartial<Category>
> {
  constructor(@InjectRepository(Category) repository: CategoryRepository) {
    super(repository);
  }
}
