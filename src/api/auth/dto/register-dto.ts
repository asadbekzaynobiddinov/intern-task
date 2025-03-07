import { IsString, IsOptional } from 'class-validator';
import { UserRoles } from 'src/common/enum';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  role: UserRoles;
}
