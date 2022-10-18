import { createDatabase, runSeeders } from 'typeorm-extension'

import DataSource, { DatasourceConfig } from '../datasource'
import BaseDataSeeder from '../seeders/base.seeder'
import HealthChkSeeder from '../seeders/healthchk.seeder'
;(async () => {
  // await createDatabase({
  //   options: DatasourceConfig,
  // })

  await DataSource.initialize()
  await runSeeders(DataSource, { seeds: [HealthChkSeeder, BaseDataSeeder] })

  process.exit(0)
})()
