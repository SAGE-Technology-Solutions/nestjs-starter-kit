import { Controller, Get } from '@nestjs/common'
import { HealthChkService } from '../services/healthchk.service'

@Controller('/healthchk')
export class HealthChkController {
  constructor(private readonly healthChkService: HealthChkService) {}

  @Get('/status')
  status() {
    return this.healthChkService.status()
  }

  @Get('/status/storage')
  async storages() {
    return {
      data: await this.healthChkService.storages(),
    }
  }

  @Get('/status/queue')
  async queues() {
    return {
      data: await this.healthChkService.queues(),
    }
  }

  @Get('/status/throw')
  async throw() {
    return {
      data: await this.healthChkService.throw(),
    }
  }
}
