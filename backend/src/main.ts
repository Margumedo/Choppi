import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Choppi API')
    .setDescription('API RESTful para la gestión de la plataforma e-commerce multi-tienda Choppi.\n\nIncluye módulos para:\n- **Autenticación**: Login local y OAuth2 con Google.\n- **Tiendas**: Gestión de sucursales e inventarios.\n- **Productos**: Catálogo global y precios dinámicos.\n- **Carrito**: Cotización y validación de compras.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
