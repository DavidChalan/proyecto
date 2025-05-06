import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // Asegúrate de tener el decorador @Controller con la ruta base
export class UserController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me') //obtener perfil del usuario logueado
  @UseGuards()
  getProfile(@Request() req) {
    // Corregido la sintaxis del parámetro y eliminado el punto y coma incorrecto
    return req.user;
  }
  @Post()
  create(@Body() data: CreateUserDto) {
    // Aquí podrías llamar a tu servicio para guardar el usuario
    return this.usersService.create(data);
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
