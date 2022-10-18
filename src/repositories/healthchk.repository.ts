import Datasource from '../db/datasource'
import { HealthChk } from '../entities/healthchk.entity'

export const HealthChkRepository = Datasource.getRepository(HealthChk).extend(
  {}
)
