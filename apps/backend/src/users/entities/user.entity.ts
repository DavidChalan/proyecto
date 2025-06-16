// users/user.entity.ts
import { Role } from '../../common/enums/rol.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false }) //nullable --> no puede estar vacio
  email: string;

  @Column({ unique: true, select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: string;

  @DeleteDateColumn() //este sirve por si eliminamos un usuario no se eliminia de la base de datos para tener un registro
  deletedAT: Date;
}
