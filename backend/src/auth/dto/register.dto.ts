import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class registerDto {
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }: { value: string }) => value.trim()) //no deja que se usen espacios en blanco
  @IsString()
  @MinLength(6)
  password: string;
}
