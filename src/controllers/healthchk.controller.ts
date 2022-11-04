import { Controller, Get } from '@nestjs/common'
import { HealthChkService } from '../services/healthchk.service'
import { BaseController } from './base.controller'

@Controller('/healthchk')
export class HealthChkController extends BaseController {
  constructor(private readonly healthChkService: HealthChkService) {
    super()
  }

  @Get('/status')
  status() {
    this.log('Processing status request')

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
