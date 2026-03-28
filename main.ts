import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() { //function ha wait k lya 
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for frontend communication
  await app.listen(4000);
}
bootstrap();
