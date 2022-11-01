import { Controller, Get } from '@nestjs/common'
import { HealthChkService } from '../services/healthchk.service'

@Controller('/healthchk')
export class HealthChkController {
  constructor(private readonly healthChkService: HealthChkService) {}

  @Get('/status')
  status() {
    return this.healthChkService.status()
  }

  @Get('/status/full')
  async statusFull() {
    return {
      data: {
        status: this.healthChkService.status(),
        storages: await this.healthChkService.storages(),
        queues: await this.healthChkService.queues(),
      },
    }
  }

  @Get('/status/throw')
  throw() {
    return {
      data: this.healthChkService.throw(),
    }
  }
}
