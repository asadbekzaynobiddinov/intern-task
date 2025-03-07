import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { CustomRequest } from '../interface';
import { UserRoles } from '../enum';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: CustomRequest = context.switchToHttp().getRequest();
    const user = req.user;
    const requestedUserId = req.params.id;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (user.role === UserRoles.ADMIN) {
      return true;
    }

    if (user.sub !== requestedUserId) {
      throw new ForbiddenException(
        'Access denied: You can only access your own data',
      );
    }

    return true;
  }
}
