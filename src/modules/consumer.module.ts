import { Module } from '@nestjs/common'
import { HealthChkConsumer } from '../bull/consumers/healthchk.consumer'

@Module({
  providers: [HealthChkConsumer],
})
export class ConsumerModule {}
