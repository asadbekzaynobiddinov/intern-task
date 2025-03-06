import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database';
import { Basket } from './basket.entity';
import { UserRoles } from 'src/common/enum';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @OneToMany(() => Basket, (basket) => basket.user)
  baskets: Basket[];
}
