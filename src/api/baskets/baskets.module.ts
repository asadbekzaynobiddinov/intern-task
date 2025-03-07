import { Module } from '@nestjs/common';
import { BasketsService } from './baskets.service';
import { BasketsController } from './baskets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from 'src/core/entity/basket.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Basket]),
    JwtModule.register({ secret: config.ACCESS_KEY }),
  ],
  controllers: [BasketsController],
  providers: [BasketsService],
})
export class BasketsModule {}
