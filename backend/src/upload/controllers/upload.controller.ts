import { Controller, Get } from '@nestjs/common';
import { UploadService } from '../services/upload.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({
    description: 'Upload csv data',
    summary: 'Use it to upload the csv data',
  })
  @Get()
  async getHello() {
    return 'hello';
  }
}
