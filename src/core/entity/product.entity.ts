import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database';
import { Category } from './category.entity';
import { Basket } from './basket.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @OneToOne(() => Basket, (basket) => basket.product)
  basket: Basket;
}
