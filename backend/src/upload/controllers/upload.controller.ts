import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UploadService } from '../services/upload.service';
import { UploadCsvDataDto } from '../dto/upload.dto';

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({
    description: 'Upload csv data',
    summary: 'Use it to upload the csv data',
  })
  @Post('parse')
  async parseCsvDataToJson(@Body() uploadDto: UploadCsvDataDto) {
    return this.uploadService.processCsvData(uploadDto);
  }
}
