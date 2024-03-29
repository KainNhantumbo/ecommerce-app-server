import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerDocumentConfig = new DocumentBuilder()
  .setTitle('We-commerce API')
  .setDescription("A full featured API that let's you manage your ecommerce!!")
  .setVersion('1.0.0')
  .addTag('store')
  .setContact(
    'Kain Nhantumbo',
    'codenut-dev.vercel.app',
    'nhantumbok@gmail.com'
  )
  .addServer('http://localhost:8080', 'Development server')
  .addServer(
    'https://ecommerce-app-server-q8i5.onrender.com',
    'Production server'
  )
  .setLicense(
    'Apache License Version 2.0',
    'http://www.apache.org/licenses/LICENSE-2.0'
  )
  .build();
