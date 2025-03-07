import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Basket extends BaseEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.baskets, { onDelete: 'CASCADE' })
  user: User;

  @OneToOne(() => Product, (product) => product.basket, { onDelete: 'CASCADE' })
  product: Product;
}
