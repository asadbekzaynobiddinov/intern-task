import {
  Controller,
  Get,
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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RoleGuard } from 'src/common/guard/admin.guard';
import { SelfGuard } from 'src/common/guard/self.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchilar ro‘yxati qaytarildi',
  })
  @UseGuards(RoleGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Bitta foydalanuvchini olish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi topildi' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
  @UseGuards(SelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @ApiOperation({ summary: 'Foydalanuvchi ma’lumotlarini yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi muvaffaqiyatli yangilandi',
  })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
  @UseGuards(SelfGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchini o‘chirish' })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi muvaffaqiyatli o‘chirildi',
  })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
  @UseGuards(SelfGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
