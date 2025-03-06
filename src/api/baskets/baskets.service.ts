import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from 'src/core/entity/basket.entity';
import { BasketRepository } from 'src/core/repository/basket.repository';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { CreateBasketDto } from './dto/create-basket.dto';
import { DeepPartial } from 'typeorm';

@Injectable()
export class BasketsService extends BaseService<
  CreateBasketDto,
  DeepPartial<Basket>
> {
  constructor(@InjectRepository(Basket) repository: BasketRepository) {
    super(repository);
  }
}
