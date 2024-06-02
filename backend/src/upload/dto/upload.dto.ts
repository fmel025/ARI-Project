import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UploadCsvDataDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  data: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cipherKey: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  delimiter: string;
}
