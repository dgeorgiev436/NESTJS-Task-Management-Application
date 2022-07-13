import {ValidationPipe, Logger} from "@nestjs/common"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from "./transform.interceptor"

async function bootstrap() {
// 	Nestjs logger
  const logger = new Logger();
	
  const app = await NestFactory.create(AppModule);

// 	Execute validation pipes when validation decoretors are detected
  app.useGlobalPipes(new ValidationPipe());
	
//  Interceptor
  app.useGlobalInterceptors(new TransformInterceptor())
	
	
//  Start server
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
	
}
bootstrap();
