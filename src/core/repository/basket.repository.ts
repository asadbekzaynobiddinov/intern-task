import { Repository } from 'typeorm';
import { Basket } from '../entity/basket.entity';

export type BasketRepository = Repository<Basket>;
