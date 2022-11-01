import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HealthChkBullQueue } from '../bull/queues'

import { HealthChkController } from '../controllers/healthchk.controller'
import { HealthChk } from '../entities/healthchk.entity'
import { HealthChkService } from '../services/healthchk.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthChk]),
    HealthChkBullQueue,
  ],
  controllers: [HealthChkController],
  providers: [HealthChkService],
})
export class HealthChkModule {}
