import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'

import { HealthChk } from '../entities/healthchk.entity'
import { HealthChkQueue } from '../constants/queues'
import { BaseService } from './base.service'

@Injectable()
export class HealthChkService extends BaseService {
  constructor(
    @InjectRepository(HealthChk)
    private _HealthChkRepository: Repository<HealthChk>,
    @InjectQueue(HealthChkQueue.label) private _HealthChkQueue: Queue
  ) {
    super()
  }

  status() {
    this.log('Running status check program ...')

    const data = {
      message: 'Healthchk Status OK',
    }

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
