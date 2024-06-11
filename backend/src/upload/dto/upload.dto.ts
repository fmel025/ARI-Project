import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UploadCsvDataDto {
  @ApiProperty({
    type: [String],
    example: [
      '23212332-2;Jose Roberto;Hernandez Mendez;2312321312321;GOLD;25252525;((2.1 1, 2 3))',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  data: string[];

  @ApiProperty({ example: 'super-secret-key' })
  @IsString()
  @IsNotEmpty()
  cipherKey: string;

  @ApiProperty({ example: ';' })
  @IsString()
  @IsNotEmpty()
  delimiter: string;
}
