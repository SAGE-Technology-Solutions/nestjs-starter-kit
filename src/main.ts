import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ExpressAdapter } from '@bull-board/express'
import { Queue } from 'bull'

import { AppModule } from './app.module'
import Config from './config/config'
import * as Queues from './constants/queues'
import { EntityNotFoundExceptionFilter } from './lib/exceptions'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = Config.port

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalFilters(new EntityNotFoundExceptionFilter())
  app.setGlobalPrefix('api')
  app.enableCors()

  // bull setup
  const serverAdapter = new ExpressAdapter()
  serverAdapter.setBasePath('/bullboard')
  // queues setup
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
