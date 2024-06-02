import { CsvRowDoc } from '@Upload/doc/csv-row.doc';
import { UploadCsvDataDto } from '@Upload/dto/upload.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import * as crypto from 'crypto';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  private processCsvLine(line: string, delimiter: string) {
    const begin = line.indexOf('(');
    const end = line.lastIndexOf(')');

    if (begin === -1 || end === -1) {
      throw new BadRequestException(
        `There is an error format in your file, please fix it and upload it again`,
      );
    }

    if (line[end + 1] !== undefined) {
      throw new BadRequestException(
        `There is an error format at the end of your file, please fix it and upload it again`,
      );
    }
    const extractedCoordinates = line.slice(begin, end + 1);
    const data = line.replace(`${delimiter}${extractedCoordinates}`, '');

    return {
      data,
      extractedCoordinates,
    };
  }

  private encryptPassword(dataToEncrypt: string, cipherKey: string) {
    const algorithm = this.configService.get<string>('algorithm');

    const hashedCard = crypto
      .createHmac(algorithm, cipherKey)
      .update(dataToEncrypt)
      .digest('hex');

    return hashedCard;
  }

  processCsvData(uploadDataDto: UploadCsvDataDto) {
    const { cipherKey, data, delimiter } = uploadDataDto;

    const formattedData = data.map((line) => {
      const { data, extractedCoordinates } = this.processCsvLine(
        line,
        delimiter,
      );
      const columns = data.split(delimiter);

      if (columns.length !== 6) {
        throw new BadRequestException(
          'File format is wrong, some data is missing',
        );
      }

      const transformedCsvData = plainToInstance(
        CsvRowDoc,
        { row: columns },
        {
          excludeExtraneousValues: true,
        },
      );

      transformedCsvData.tarjeta = this.encryptPassword(
        transformedCsvData.tarjeta,
        cipherKey,
      );

      return transformedCsvData;
    });

    return formattedData;
  }
}
