import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user123', description: 'Foydalanuvchi nomi' })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Foydalanuvchi paroli',
  })
  @IsString()
  password: string;
}
