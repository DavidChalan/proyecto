import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Habilita CORS (¡Crítico para desarrollo!)
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://144.91.101.221:3000',
      // 'http://192.168.5.6:3000',
    ], // ip fronted
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
  });

  // 2. Prefijo global para todas las rutas
  app.setGlobalPrefix('api/v1');

  // 3. Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina campos no definidos en los DTOs
      forbidNonWhitelisted: true, // Rechaza peticiones con campos inválidos
      transform: true, // Transforma tipos automáticamente (ej: string -> number)
    }),
  );

  // 4. Puerto configurable
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Servidor corriendo en http://localhost:${port}/api/v1`);
}
bootstrap();
