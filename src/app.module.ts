import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { LoggerModule } from 'nestjs-pino'

import { DatasourceConfig } from './db/datasource'
import { HealthChkModule } from './modules/healthchk.module'
import { UserModule } from './modules/user.module'
import { BullModule } from './modules/bull.module'
import { ConsumerModule } from './modules/consumer.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => DatasourceConfig as TypeOrmModuleOptions,
    }),
    LoggerModule.forRoot(),
    ...BullModule,
    ConsumerModule,
    HealthChkModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
