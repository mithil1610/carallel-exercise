import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as requestContextService from 'request-context';
import { v4 as uuid } from 'uuid';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const swaggerBaseURL = 'http://localhost:3000';
  const options = new DocumentBuilder()
    .setTitle('Carallel Articles APIs')
    .setDescription('The Carallel Articles APP API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(swaggerBaseURL)
    .addTag('The Carallel Articles App')
    .build();

  const app = await NestFactory.create(AppModule);
  // Global Prefix.
  app.setGlobalPrefix('/api/v1');

  // Global Filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Inject Request ID in Global Context
  app.use(requestContextService.middleware('request'));
  app.use((req, res, next) => {
    requestContextService.set('request:reqId', uuid());
    next();
  });

  // Enable CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Mount Swagger Documents TODO Enable only in non-prod env
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap().catch(console.error);
