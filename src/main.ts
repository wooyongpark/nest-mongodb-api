import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './interceptors/https-exception.filter';
import {
  LoggingInterceptor,
  ExcludeNullInterceptor,
  TimeoutInterceptor,
  TransformInterceptor,
} from './interceptors/index.interceptors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // doesn't work with mongoose
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors();
  await app.listen(4952);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
