import {ValidationPipe} from "@nestjs/common"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from "./transform.interceptor"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

// 	Execute validation pipes when validation decoretors are detected
  app.useGlobalPipes(new ValidationPipe());
	
  app.useGlobalInterceptors(new TransformInterceptor())
  
  await app.listen(3000);
}
bootstrap();
