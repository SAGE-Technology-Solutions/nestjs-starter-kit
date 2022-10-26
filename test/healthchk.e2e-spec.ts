import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { getQueueToken } from '@nestjs/bull'

import { DatasourceConfig } from '../src/db/datasource'
import { HealthChkModule } from '../src/modules/healthchk.module'
import { HealthChkQueue } from '../src/constants/queues'

const QueueAddFn = jest.fn((event, payload) => undefined)
const MockedBullQueue = {
  add: QueueAddFn,
}

describe('HealthChkController (e2e)', () => {
  let app: INestApplication
  let appRequest: request.SuperTest<request.Test>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => DatasourceConfig as TypeOrmModuleOptions,
        }),
        HealthChkModule,
      ],
    })
      .overrideProvider(getQueueToken(HealthChkQueue.label))
      .useValue(MockedBullQueue)
      .compile()

    app = moduleFixture.createNestApplication()
    appRequest = request(app.getHttpServer())
    await app.init()
  })

  afterAll(async (): Promise<void> => {
    await app.close()
  })

  it('GET /healthchk/status', async () => {
    return appRequest
      .get('/healthchk/status')
      .expect(200)
      .expect({ message: 'Healthchk Status OK' })
  })

  it('GET /healthchk/status/storage', async () => {
    return appRequest
      .get('/healthchk/status/storage')
      .expect(200)
      .expect({
        data: { message: 'Storage OK' },
      })
  })

  it('GET /healthchk/status/queue', async () => {
    await appRequest
      .get('/healthchk/status/queue')
      .expect(200)
      .expect({ data: { message: 'Queues OK' } })

    expect(QueueAddFn).toHaveBeenCalledWith(HealthChkQueue.events.Status, {
      message: 'Checking In',
    })
  })
})
