import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

//Interfaz que representa la información que va dentro del JWT
export interface JwtPayload {
  sub: number; // ID del usuario
  email: string; // Email del usuario
  iat?: number; // Fecha de emisión del token (opcional)
  exp?: number; // Fecha de expiración del token (opcional)
  role: string;
}

// Interfaz que extiende la Request de Express para incluir el campo "user"
export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

@Injectable()
//Este guard se usa para proteger rutas y verificar el token JWT
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService, // Servicio para verificar el token
    private readonly config: ConfigService, // Acceso a variables de entorno (como JWT_SECRET)
  ) {}

  //Este método se ejecuta cada vez que se accede a una ruta protegida
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Obtenemos el request de Express con tipado extendido (que incluye "user")
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    //Extraemos el token del header Authorization
    const token = this.extractTokenFromHeader(request);

    //Si no hay token, lanzamos error 401
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      //Verificamos el token con el secreto
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.config.get<string>('JWT_SECRET'),
      });

      //Guardamos el payload en el request para que esté disponible en el controlador
      request.user = payload;
    } catch {
      //Si el token no es válido, también lanzamos error 401
      throw new UnauthorizedException('Invalid token');
    }

    //Si todo va bien, permitimos el acceso a la ruta
    return true;
  }

  //Extrae el token del header "Authorization: Bearer <token>"
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
