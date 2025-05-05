// auth/auth.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';
// import { Auth } from './decorators/auth.decorator';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveinterface } from 'src/common/interfaces/user-active.intgeerface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: registerDto,
  ) {
    return this.authService.register(registerDto); //sirve para guardar los datos en la base de datos
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  // @Get('profile')
  // @Auth(Role.ADMIN)
  // profile(
  //   @Request()
  //   req: AuthenticatedRequest,
  // ) {
  //   return this.authService.profile(req.user);
  // }

  @Get('profile')
  // ruta protegida
  @Auth(Role.USER)
  profile(@ActiveUser() user: UserActiveinterface) {
    return this.authService.profile(user);
  }
}
