import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user') // Asegúrate de tener el decorador @Controller con la ruta base
export class UserController {
  constructor(private readonly usersService: UsersService){}
  @Get('me') //obtener perfil del usuario logueado
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) { // Corregido la sintaxis del parámetro y eliminado el punto y coma incorrecto
    return req.user;
  }
  @Post()
create(@Body() data: any) {
  // Aquí podrías llamar a tu servicio para guardar el usuario
  return this.usersService.create(data);
}
}