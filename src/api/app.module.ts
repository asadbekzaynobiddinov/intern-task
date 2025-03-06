import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategorysModule } from './categorys/categorys.module';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from 'src/config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CategorysModule,
    ProductsModule,
    BasketsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_BASE,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
