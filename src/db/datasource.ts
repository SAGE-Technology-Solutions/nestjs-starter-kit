import 'reflect-metadata'
import { join } from 'path'
import { DataSource as TypeormDataSource, DataSourceOptions } from 'typeorm'

import Config from '../config/config'

const dbUrl = Config.db.url

const DatasourceConfig = {
  type: 'postgres',
  migrationsRun: false,
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: !Config.isProd,
  entities: [join(__dirname, '../', '/entities/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
  url: dbUrl,
} as DataSourceOptions

const DataSource = new TypeormDataSource(DatasourceConfig)

export { DatasourceConfig }

export default DataSource
