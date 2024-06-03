import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { UploadService } from '../services/upload.service';
import { UploadCsvDataDto } from '../dto/upload.dto';
import { GenericDto } from '@Upload/dto/generic.dto';

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({
    description: 'Upload csv data',
    summary: 'Use it to upload the csv data',
  })
  @HttpCode(200)
  @Post('parse')
  async parseCsvDataToJson(@Body() uploadDto: UploadCsvDataDto) {
    return this.uploadService.processCsvData(uploadDto);
  }

  @ApiOperation({
    description: 'Parse json data to file',
    summary: 'Use it to parse a json string to a json file',
  })
  @Post('download')
  downloadJson(@Body() genericDto: GenericDto, @Res() res: Response) {
    // Convertir el JSON a un string
    const jsonString = JSON.stringify(genericDto.data, null, 2);

    // Configurar la respuesta para que el cliente la descargue como archivo
    res.setHeader('Content-Disposition', 'attachment; filename=data.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(jsonString);
  }
}
