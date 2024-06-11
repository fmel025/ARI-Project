import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UploadModule } from '@Upload/upload.module';
import configuration from '@Configuration/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
