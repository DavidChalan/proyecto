// auth/auth.controller.ts
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';
// import { Auth } from './decorators/auth.decorator';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveinterface } from 'src/common/interfaces/user-active.intgeerface';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  register(
    @Body()
    registerDto: registerDto,
  ) {
    return this.authService.register(registerDto); //sirve para guardar los datos en la base de datos
  }

  @Post('login')
  async login(
    @Body()
    loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginResult = await this.authService.login(loginDto);

    // Establecer cookie segura
    res.cookie('token', loginResult.token, {
      httpOnly: true,
      sameSite: 'lax', // o 'none' si usas HTTPS y frontend en otro dominio
      // secure: true, // habilita solo si usas HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });

    return {
      message: 'Login successful',
      email: loginResult.email,
    };
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax', // o 'none' si usas HTTPS y frontend en otro dominio
      // secure: true, // habilita solo si usas HTTPS
      maxAge: 0,
    });
    return {
      message: 'Logout successful',
    };
  }
  @Get('profile')
  // ruta protegida
  @Auth(Role.USER)
  profile(@ActiveUser() user: UserActiveinterface) {
    return this.authService.profile(user);
  }
}
