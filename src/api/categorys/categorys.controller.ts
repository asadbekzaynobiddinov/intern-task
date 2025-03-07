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
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RoleGuard } from 'src/common/guard/admin.guard';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}

  @ApiOperation({ summary: 'Yangi kategoriya qo‘shish' })
  @ApiResponse({
    status: 201,
    description: 'Kategoriya muvaffaqiyatli yaratildi',
  })
  @ApiResponse({
    status: 403,
    description: 'Faqat admin ruxsatiga ega foydalanuvchilar yaratishi mumkin',
  })
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categorysService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Barcha kategoriyalarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha kategoriyalar ro‘yxati' })
  @Get()
  findAll() {
    return this.categorysService.findAll();
  }

  @ApiOperation({ summary: 'Bitta kategoriyani olish' })
  @ApiResponse({ status: 200, description: 'Kategoriya topildi' })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorysService.findOneById(id);
  }

  @ApiOperation({ summary: 'Kategoriyani yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Kategoriya muvaffaqiyatli yangilandi',
  })
  @ApiResponse({
    status: 403,
    description: 'Faqat admin ruxsatiga ega foydalanuvchilar yangilashi mumkin',
  })
  @UseGuards(RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categorysService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Kategoriyani o‘chirish' })
  @ApiResponse({
    status: 200,
    description: 'Kategoriya muvaffaqiyatli o‘chirildi',
  })
  @ApiResponse({
    status: 403,
    description: 'Faqat admin ruxsatiga ega foydalanuvchilar o‘chirishi mumkin',
  })
  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorysService.delete(id);
  }
}
