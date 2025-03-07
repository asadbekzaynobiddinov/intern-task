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
import { BasketsService } from './baskets.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { UserID } from 'src/common/decorator/user-id.decorator';

@ApiTags('Baskets')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('baskets')
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi savat yaratish' })
  @ApiResponse({ status: 201, description: 'Savat muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri ma’lumot kiritildi' })
  create(@Body() createBasketDto: CreateBasketDto, @UserID() id: string) {
    return this.basketsService.create({ ...createBasketDto, userId: id });
  }

  @Get()
  @ApiOperation({ summary: 'Barcha savatlarni olish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli bajarildi' })
  findAll(@UserID() id: string) {
    return this.basketsService.findAll({ where: { user: { id } } });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta savatni olish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli bajarildi' })
  @ApiResponse({ status: 404, description: 'Savat topilmadi' })
  findOne(@Param('id') id: string) {
    return this.basketsService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Savatni yangilash' })
  @ApiResponse({ status: 200, description: 'Savat muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 404, description: 'Savat topilmadi' })
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketsService.update(id, updateBasketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Savatni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Savat muvaffaqiyatli o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Savat topilmadi' })
  remove(@Param('id') id: string) {
    return this.basketsService.delete(id);
  }
}
