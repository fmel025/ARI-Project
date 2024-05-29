import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class RowDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  row: string[];
}

export class UploadDto {
  @ApiProperty({ type: [RowDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RowDto)
  data: RowDto[];
}
