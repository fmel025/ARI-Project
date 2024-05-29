import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from '../services/upload.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadDto } from '../dto/upload.dto';

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({
    description: 'Upload csv data',
    summary: 'Use it to upload the csv data',
  })
  @Post()
  async getHello(@Body() uploadDto: UploadDto) {
    return uploadDto.data;
  }
}
