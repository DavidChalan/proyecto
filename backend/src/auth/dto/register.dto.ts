import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/enums/rol.enum';
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

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
