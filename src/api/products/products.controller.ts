import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RoleGuard } from 'src/common/guard/admin.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';

@ApiTags('Mahsulotlar') // Swagger UI da "Mahsulotlar" deb ko'rsatiladi
@ApiBearerAuth() // Token autentifikatsiya talab qilinishini bildiradi
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Yangi mahsulot qo‘shish' })
  @ApiResponse({
    status: 201,
    description: 'Mahsulot muvaffaqiyatli qo‘shildi',
  })
  @ApiResponse({
    status: 403,
    description: 'Foydalanuvchida yetarli huquq yo‘q',
  })
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Barcha mahsulotlarni olish' })
  @ApiResponse({ status: 200, description: 'Mahsulotlar ro‘yxati' })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Bitta mahsulotni olish' })
  @ApiResponse({ status: 200, description: 'Topilgan mahsulot' })
  @ApiResponse({ status: 404, description: 'Mahsulot topilmadi' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @ApiOperation({ summary: 'Mahsulot ma’lumotlarini yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Mahsulot muvaffaqiyatli yangilandi',
  })
  @ApiResponse({ status: 404, description: 'Mahsulot topilmadi' })
  @UseGuards(RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Mahsulotni o‘chirish' })
  @ApiResponse({
    status: 200,
    description: 'Mahsulot muvaffaqiyatli o‘chirildi',
  })
  @ApiResponse({ status: 404, description: 'Mahsulot topilmadi' })
  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
