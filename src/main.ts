import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { corsOptions } from './config/cors';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerDocumentConfig } from './config/swagger';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded, json } from 'express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerDocumentConfig);

  app.enableCors(corsOptions);
  app.use(helmet());
  app.use(cookieParser());
  app.use(compression());
  app.setGlobalPrefix('/api/v1');
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  SwaggerModule.setup('api-docs', app, document);
  await app.listen(+process.env.PORT || 3000);
}

bootstrap();
