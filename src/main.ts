import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express'
import * as fs from 'fs'
import * as http from 'http'
import * as https from 'https'

const httpsOptions = {
  key: fs.readFileSync('src/secrets/key.pem'),
  cert: fs.readFileSync('src/secrets/cert.pem')
}

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  await app.init();

  http.createServer(server).listen(8080);
  https.createServer(httpsOptions, server).listen(3443,);
}

bootstrap()


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // app.useGlobalPipes(new ValidationPipe())
//   // app.useGlobalFilters(new AllExceptionsFilter());
//   await app.listen(3000);
// }
// bootstrap();
