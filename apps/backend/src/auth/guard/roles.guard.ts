import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { Role } from 'src/common/enums/rol.enum';
// import { Role } from '../../common/enums/rol.enum';

// import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} //el Reflector es el que lee el rol
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<{ user: User }>();
    const { user } = request;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (user.role === Role.ADMIN) {
      return true;
    }

    return roles.includes(user.role);
  }
}
