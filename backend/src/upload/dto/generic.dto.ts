import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class GenericDto {
  @ApiProperty()
  @IsObject()
  data: object;
}
