import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Smartfon', description: 'Mahsulot nomi' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Yangi avlod smartfoni',
    description: 'Mahsulot tavsifi',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 999.99, description: 'Mahsulot narxi' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 50, description: 'Mahsulot ombordagi miqdori' })
  @IsNumber()
  stock: number;
}
