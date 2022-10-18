import { BullModule as NestBullModdule } from '@nestjs/bull'
import { HealthChkQueue } from '../constants/queues'

const HealthChkBullQueue = NestBullModdule.registerQueue({
  name: HealthChkQueue.label,
})

export { HealthChkBullQueue }
