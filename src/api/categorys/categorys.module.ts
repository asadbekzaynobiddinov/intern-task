import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/core/entity/category.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    JwtModule.register({ secret: config.ACCESS_KEY }),
  ],
  controllers: [CategorysController],
  providers: [CategorysService],
})
export class CategorysModule {}
