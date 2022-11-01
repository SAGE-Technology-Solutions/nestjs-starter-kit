import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'

import { HealthChk } from '../entities/healthchk.entity'
import { HealthChkQueue } from '../constants/queues'

@Injectable()
export class HealthChkService {
  private readonly logger = new Logger(HealthChkService.name)

  constructor(
    @InjectRepository(HealthChk)
    private _HealthChkRepository: Repository<HealthChk>,
    @InjectQueue(HealthChkQueue.label) private _HealthChkQueue: Queue
  ) {}

  status() {
    const data = {
      message: 'Healthchk Status OK',
    }

    this.logger.log(data, 'Application logging sample')

    return data
  }

  async storages() {
    await this._HealthChkRepository.count()

    return {
      message: 'Storage OK',
    }
  }

  async queues() {
    await this._HealthChkQueue.add(HealthChkQueue.events.Status, {
      message: 'Checking In',
    })

    return {
      message: 'Queues OK',
    }
  }

  throw() {
    throw new HttpException('Intentional server error!', HttpStatus.NOT_FOUND)
  }
}
