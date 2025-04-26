import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { registerDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register({ name, email, password }: registerDto) {
    const user = await this.usersService.findbyEmail(email); //verificamos que el usuario exista
    if (user) {
      throw new BadRequestException('User alresy exists');
    }
    await this.usersService.create({
      name,
      email,
      password: await bcryptjs.hash(password, 10), //hashear contraseña
    });
    return {
      name,
      email,
    };
  }
  async login({ email, password }: loginDto) {
    const user = await this.usersService.findbyEmail(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong'); //verificamos el email
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong'); //verificamos la contraseña
    }
    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      token,
      email,
      // user: {
      //   id: user.id,
      //   name: user.name,
      //   email: user.email,
      // },
    };
  }
  async profile({ email }: { email: string; role: string }) {
    //solo las personas que tengan como rol de admin pueden asignar a esta ruta
    // if (role !== 'admin') {
    //   throw new UnauthorizedException(
    //     'You are not Authorzed to access this resource',
    //   );
    // }

    return await this.usersService.findbyEmail(email);
  }
}
