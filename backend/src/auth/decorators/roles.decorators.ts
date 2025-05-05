import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enums/rol.enum';

export const ROLES_KEY = 'roles';
//agregar metadatos
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
