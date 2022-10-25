import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Logger, LoggerModule } from 'nestjs-pino'
import pinoHttp, { GenReqId } from 'pino-http'
import { randomUUID } from 'node:crypto'
import pino from 'pino'

import { DatasourceConfig } from './db/datasource'
import { HealthChkModule } from './modules/healthchk.module'
import { UserModule } from './modules/user.module'
import { BullModule } from './modules/bull.module'
import { ConsumerModule } from './modules/consumer.module'
import Config from './config/config'

const PinoOptions = {
  customProps: (req, res) => ({
    context: 'HTTP',
  }),
  genReqId: function (req: any, res?: any) {
    if (req.id) return req.id
    let id = req.get('X-Request-Id')
    if (id) return id
    id = randomUUID()
    res && res.header('X-Request-Id', id)

    return id
  } as GenReqId,
  logger: pino({
    redact: ['req.headers.authorization', 'req.headers.cookie'],
  }),
}

if (!Config.isProd)
  PinoOptions['transport'] = {
    target: 'pino-pretty',
    options: {
      singleLine: true,
    },
  }

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => DatasourceConfig as TypeOrmModuleOptions,
    }),
    LoggerModule.forRoot({
      pinoHttp: PinoOptions,
    }),
    ...BullModule,
    ConsumerModule,
    HealthChkModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
