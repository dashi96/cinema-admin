import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

import * as dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  app.enableCors({
    allowedHeaders: '*',
    origin: '*'
  })

  await app.listen(parseInt(process.env.PORT, 10) || 3000)
}
bootstrap()
