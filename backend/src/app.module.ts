import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UploadModule } from '@Upload/upload.module';
import configuration from '@Configuration/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
