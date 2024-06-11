import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('[ARI] - API documentation')
    .setDescription('ARI api endpoints documentation')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  // PORT settings
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  app.enableCors();

  await app.listen(port);
}

bootstrap();
