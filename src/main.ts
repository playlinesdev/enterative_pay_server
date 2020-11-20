import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { jwtConstants } from './auth/constants';

console.log(jwtConstants.secret);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe()
  )
  await app.listen(3000);
}
bootstrap();
