import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';


export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;
}
