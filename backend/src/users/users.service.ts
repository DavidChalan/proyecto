import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // readonly es para que no sepueda cambiar
  ) {}

  // Buscar un usuario por su email. Se usa en login para verificar si el usuario existe
  async findbyEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
  //crear usuario
  create(createuserDto: CreateUserDto) {
    return this.userRepository.save(createuserDto);
  }
  //buscar usuario por email
  // findOneByEmail(email: string) {
  //   return this.userRepository.findOneBy({ email });
  // }

  // // Crear un nuevo usuario y guardarlo en la base de datos (se usa en el registro)
  // async create(userData: Partial<User>): Promise<User> {
  //   const user = this.userRepository.create(userData); // Crea una instancia del usuario
  //   return this.userRepository.save(user); // Guarda el usuario en la base de datos
  // }

  // // Buscar un usuario por su ID (por ejemplo, para /me con JWT)
  // async findById(id: number): Promise<User | null> {
  //   return this.userRepository.findOne({
  //     where: { id }, // Condición: buscar por id
  //   });
  // }
}
