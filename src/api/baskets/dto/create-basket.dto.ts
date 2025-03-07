import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBasketDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Mahsulot ID',
  })
  @IsString()
  productId: string;

  @ApiProperty({ example: 2, description: 'Mahsulot miqdori' })
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional({
    example: '987e6543-e21b-12d3-a456-426614174999',
    description: 'Foydalanuvchi ID',
  })
  @IsOptional()
  @IsString()
  userId?: string;
}
