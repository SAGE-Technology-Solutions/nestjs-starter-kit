import { BullModule as NestBullModdule } from '@nestjs/bull'
import Redis from 'ioredis'
import { Logger } from '@nestjs/common'

import Config from '../config/config'
import * as BullQueues from '../bull/queues'

const BullModule = [
  NestBullModdule.forRoot({
    createClient: function (type, redisOpts) {
      const logger = new Logger('BullModule')

      const client = new Redis(Config.redis.url, {
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
      })

      client.on('error', (e) => {
        logger.error(` Redis connection error: ${e}`)
      })

      return client
    },
  }),
]

for (const k in BullQueues) {
  BullModule.push(BullQueues[k])
}

export { BullModule }
