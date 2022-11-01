import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { LoggerModule } from 'nestjs-pino'
import { GenReqId } from 'pino-http'
import { randomUUID } from 'node:crypto'
import pino from 'pino'

import { DatasourceConfig } from './db/datasource'
import { HealthChkModule } from './modules/healthchk.module'
import { UserModule } from './modules/user.module'
import { BullModule } from './modules/bull.module'
import { ConsumerModule } from './modules/consumer.module'
import Config from './config/config'

const LoggerOptions = {
  redact: ['req.headers.authorization', 'req.headers.cookie']
}
if (!Config.isProd)
  LoggerOptions['prettyPrint'] = {
    colorize: true,
    singleLine: true,
    levelFirst: false,
  }

const PinoHTTPOptions = {
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
  logger: pino(LoggerOptions),
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => DatasourceConfig as TypeOrmModuleOptions,
    }),
    LoggerModule.forRoot({
      pinoHttp: PinoHTTPOptions,
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
