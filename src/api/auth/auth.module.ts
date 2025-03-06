import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entity/user.entity';
import { BcryptManage } from 'src/infrastructure/lib/bcrypt';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: config.ACCESS_KEY }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptManage],
})
export class AuthModule {}
