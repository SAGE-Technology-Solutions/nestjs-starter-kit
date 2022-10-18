import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import config from '../../config/config'

export default class BaseDataSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ) {
    console.info('Running Base data seeder ...')

    //

    console.info('Complete')
  }
}
