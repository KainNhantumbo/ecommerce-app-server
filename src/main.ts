import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions)
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.setGlobalPrefix('/api/v1');

  await app.listen(3000);
}

bootstrap();
