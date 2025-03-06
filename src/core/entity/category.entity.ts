import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database';
import { Product } from './product.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
