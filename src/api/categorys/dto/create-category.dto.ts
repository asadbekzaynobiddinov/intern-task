import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Elektronika', description: 'Kategoriya nomi' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Turli elektron mahsulotlar',
    description: 'Kategoriya tavsifi',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Kategoriya rasmi URL manzili',
  })
  @IsString()
  image: string;
}
