import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UploadModule } from '@Upload/upload.module';
import configuration from '@Configuration/configuration';
import { schema } from '@Configuration/validation-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: schema,
      isGlobal: true,
    }),
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
