import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../../common/enums/rol.enum';

import { RolesGuard } from '../guard/roles.guard';
import { Roles } from './roles.decorators';
import { JwtAuthGuard } from '../guard/auth.guard';

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(JwtAuthGuard, RolesGuard));
}
