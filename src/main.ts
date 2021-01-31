import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express'
import * as fs from 'fs'
import * as http from 'http'
import * as https from 'https'
import { Logger } from '@nestjs/common';

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

  let httpPort = process.env.HTTP_PORT ?? 8080
  http.createServer(server).listen(httpPort);
  Logger.log(`Listening http on port ${httpPort}`)

  let httpsPort = process.env.HTTPS_PORT ?? 3443
  Logger.log(`Listening https on port ${httpsPort}`)
  https.createServer(httpsOptions, server).listen(httpsPort);
}

bootstrap()


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // app.useGlobalPipes(new ValidationPipe())
//   // app.useGlobalFilters(new AllExceptionsFilter());
//   await app.listen(3000);
// }
// bootstrap();
