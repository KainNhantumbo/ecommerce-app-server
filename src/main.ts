import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { corsOptions } from './config/cors';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.use(helmet());
  app.use(cookieParser());
  app.use(compression());
  app.setGlobalPrefix('/api/v1');

  const documentConfig = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription(
      "A full featured API that let's you create your tasks on the fly!!"
    )
    .setVersion('1.0.0')
    .addTag('tasks')
    .setContact(
      'Kain Nhantumbo',
      'codenut-dev.vercel.app',
      'nhantumbok@gmail.com'
    )
    .addServer('http://localhost:8080', 'Development server')
    .addServer('http://nest-tasks-api-demo.onrender.com', 'Production server')
    .setLicense('Apache License Version 2.0', 'http://www.apache.org/licenses')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}

bootstrap();
