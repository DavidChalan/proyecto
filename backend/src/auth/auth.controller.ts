// auth/auth.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthenticatedRequest } from './guard/auth.guard';
import { Role } from './enums/rol.enum';
// import { Auth } from './decorators/auth.decorator';
import { Roles } from './decorators/roles.decorators';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guard/roles.guard';

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
    loginDto: loginDto,
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
  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard) //
  profile(
    @Request()
    req: AuthenticatedRequest,
  ) {
    return this.authService.profile(req.user);
  }
}
