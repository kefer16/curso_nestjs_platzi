import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API ISTENE')
    .setDescription('API Rest para uso exclusivo del instituto Nueva Esperanza')
    .setVersion('1.0')
    // .addServer('http//localhost:3000', 'local')
    .addBearerAuth()
    .setExternalDoc('JSON', 'api-json')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
