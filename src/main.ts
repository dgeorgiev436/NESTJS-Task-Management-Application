import {ValidationPipe, Logger} from "@nestjs/common"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from "./transform.interceptor"

async function bootstrap() {
  const logger = new Logger(); // 	Nestjs logger
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable Cross-origin resource sharing
  app.useGlobalPipes(new ValidationPipe()); // 	Execute validation pipes when validation decoretors are detected
  app.useGlobalInterceptors(new TransformInterceptor()); //  Interceptor
	
//  Start server
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
	
}

bootstrap();
