import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ExpressAdapter } from '@bull-board/express'
import { Queue } from 'bull'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import helmet from 'helmet'

import { AppModule } from './app.module'
import Config from './config/config'
import * as Queues from './constants/queues'
import { GlobalExceptionFilter } from './lib/exceptions'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = Config.port

  // Help fix security-related HTTP headers
  app.use(helmet())

  // Loggers
  app.useLogger(app.get(Logger))
  app.useGlobalInterceptors(new LoggerErrorInterceptor())

  // Do not throw any error but it will just discard all the values which are not in dto
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  // Global exception handler
  app.useGlobalFilters(new GlobalExceptionFilter())

  // Global route prefix
  app.setGlobalPrefix('api')

  // Cors
  app.enableCors()

  // Bullboard setup & queues registration
  const serverAdapter = new ExpressAdapter()
  serverAdapter.setBasePath('/bullboard')
  const queues = []
  for (const k in Queues) {
    const q = Queues[k]
    queues.push(new BullAdapter(app.get<Queue>(`BullQueue_${q.label}`)))
  }

  createBullBoard({
    queues,
    serverAdapter,
  })

  app.use('/bullboard', serverAdapter.getRouter())

  console.info(`Starting Service at 127.0.0.1:${port}`)

  await app.listen(port)
}
bootstrap()
