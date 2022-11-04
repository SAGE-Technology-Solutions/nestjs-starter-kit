import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'

import { HealthChkQueue } from '../../constants/queues'
import { BaseConsumer } from './base.consumer'

@Processor(HealthChkQueue.label)
export class HealthChkConsumer extends BaseConsumer {

  @Process(HealthChkQueue.events.Status)
  async status(job: Job<{ message: string }>) {
    this.log('[status]: Payload received: ' + JSON.stringify(job.data))
  }
}
