import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user') // Asegúrate de tener el decorador @Controller con la ruta base
export class UserController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) { // Corregido la sintaxis del parámetro y eliminado el punto y coma incorrecto
    return req.user;
  }
}