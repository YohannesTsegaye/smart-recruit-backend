import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS to allow requests from the frontend
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both ports
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Accept', 'X-Debug', 'Authorization'],
    credentials: true,
  });

  // Use port 5000 to match the frontend's expectation
  await app.listen(5000);
}
void bootstrap();
