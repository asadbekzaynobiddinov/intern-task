/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from 'src/core/entity/basket.entity';
import { BasketRepository } from 'src/core/repository/basket.repository';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { CreateBasketDto } from './dto/create-basket.dto';
import { DeepPartial } from 'typeorm';
import { IFindOptions } from 'src/infrastructure/lib/baseService/interface';

@Injectable()
export class BasketsService extends BaseService<
  CreateBasketDto,
  DeepPartial<Basket>
> {
  constructor(@InjectRepository(Basket) repository: BasketRepository) {
    super(repository);
  }

  async findAll(
    options?: IFindOptions<DeepPartial<Basket>>,
  ): Promise<
    | { status_code: number; message: string; data: DeepPartial<Basket>[] }
    | undefined
  > {
    const baskets = await this.getRepository.find(options);
    console.log(baskets);
    if (baskets.length === 0) {
      throw new NotFoundException('Baskets Not Found');
    }
    return {
      status_code: 200,
      message: 'success',
      data: baskets,
    };
  }
}
