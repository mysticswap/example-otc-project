import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger
  const swagConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(process.env.APP_NAME + ' API')
    .setDescription(process.env.APP_NAME + ' Backend API')
    .setVersion('1.0')
    .addTag(process.env.APP_NAME)
    .build();

  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, swagConfig);
    SwaggerModule.setup('docs', app, document, {
      customSiteTitle: process.env.APP_NAME,
    });
  }

  await app.listen(3001);
}
bootstrap();
