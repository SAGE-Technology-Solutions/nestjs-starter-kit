import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'

import { HealthChkRepository } from '../../repositories/healthchk.repository'
import { HealthChk } from '../../entities/healthchk.entity'

export default class HealthChkSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ) {
    console.info('Running HealthChk seeder ...')

    const h = new HealthChk()
    await HealthChkRepository.save(h)

    console.info('Complete')
  }
}
