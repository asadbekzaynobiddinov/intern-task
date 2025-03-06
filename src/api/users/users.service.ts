import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entity/user.entity';
import { UserRepository } from 'src/core/repository/user.repository';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { CreateUserDto } from './dto/create-user.dto';
import { DeepPartial } from 'typeorm';

@Injectable()
export class UsersService extends BaseService<
  CreateUserDto,
  DeepPartial<User>
> {
  constructor(@InjectRepository(User) repository: UserRepository) {
    super(repository);
  }
}
