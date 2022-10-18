import { BullModule as NestBullModdule } from '@nestjs/bull'
import Redis from 'ioredis'

import Config from '../config/config'
import * as BullQueues from '../bull/queues'

const BullModule = [
  NestBullModdule.forRoot({
    createClient: function (type, redisOpts) {
      const client = new Redis(Config.redis.url, {
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
      })
      return client
    },
  }),
]

for (const k in BullQueues) {
  BullModule.push(BullQueues[k])
}

export { BullModule }
