import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entity/user.entity';
import { UserRepository } from 'src/core/repository/user.repository';
import { RegisterDto } from './dto/register-dto';
import { BcryptManage } from 'src/infrastructure/lib/bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config';
import { RefreshDto } from './dto/refresh-dto';
import { UserRoles } from 'src/common/enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repository: UserRepository,
    private readonly bcrypt: BcryptManage,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const userExists = await this.repository.findOne({
      where: { username: dto.username },
    });

    if (userExists) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await this.bcrypt.createBcryptPassword(dto.password);
    const newUser = this.repository.create({
      username: dto.username,
      password: hashedPassword,
    });
    await this.repository.save(newUser);
    return {
      status_code: 201,
      message: 'succes',
    };
  }

  async login(dto: LoginDto) {
    const user = await this.repository.findOne({
      where: { username: dto.username },
    });

    if (!user) {
      throw new BadRequestException('Username Or Password incorrect');
    }

    const passwordsEqual = await this.bcrypt.comparePassword(
      dto.password,
      user.password,
    );

    if (!passwordsEqual) {
      throw new BadRequestException('Username Or Password incorrect');
    }

    const payload = {
      sub: user.id,
      role: user.role,
    };
    const access_token = this.jwt.sign(payload, {
      secret: config.ACCESS_KEY,
      expiresIn: config.ACCESS_TIME,
    });
    const refresh_token = this.jwt.sign(payload, {
      secret: config.REFRESH_KEY,
      expiresIn: config.REFRESH_TIME,
    });
    return {
      access_token,
      refresh_token,
    };
  }

  async refresh(dto: RefreshDto) {
    interface IPayload {
      sub: string;
      role: UserRoles;
      iat?: number;
      exp?: number;
    }

    const decoded: IPayload = this.jwt.verify(dto.token, {
      secret: config.REFRESH_KEY,
    });

    const user = await this.repository.findOne({
      where: { id: decoded.sub },
    });

    if (!user) {
      throw new BadRequestException('Invalid refresh token');
    }

    const payload = {
      sub: user.id,
      role: user.role,
    };

    const access_token = this.jwt.sign(payload, {
      secret: config.ACCESS_KEY,
      expiresIn: config.ACCESS_TIME,
    });

    const refresh_token = this.jwt.sign(payload, {
      secret: config.REFRESH_KEY,
      expiresIn: config.REFRESH_TIME,
    });

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }
}
