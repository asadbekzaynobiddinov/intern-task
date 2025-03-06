import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database';
import { User } from './user.entity';

@Entity()
export class Basket extends BaseEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.baskets, { onDelete: 'CASCADE' })
  user: User;
}
