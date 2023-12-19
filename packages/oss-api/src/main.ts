import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://oss-dystopian.daliborpetric.com',
    ], // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('/api/v1');

  const port = process.env.PORT || 4001;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  //SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Dystopian API')
    .setDescription('Dystopian API description')
    .setVersion('1.0')
    .addTag('Dystopian V1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
}
bootstrap();
