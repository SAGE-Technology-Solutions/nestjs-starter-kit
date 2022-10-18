import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'

import { HealthChkQueue } from '../../constants/queues'

@Processor(HealthChkQueue.label)
export class HealthChkConsumer {
  @Process(HealthChkQueue.events.Status)
  async status(job: Job<{ message: string }>) {
    console.info('[HealthChkConsumer#status]: Payload received: ', job.data)
  }
}
