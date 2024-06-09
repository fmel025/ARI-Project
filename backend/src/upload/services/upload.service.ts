import { CsvRowDoc } from '@Upload/doc/csv-row.doc';
import { UploadCsvDataDto } from '@Upload/dto/upload.dto';
import { GeoJsonType } from '@Upload/types/geo-json.type';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
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
    const token = jwt.sign({ password: dataToEncrypt }, cipherKey);

    return token;
  }

  private encryptPasswordV2(cipherKey: string) {
    return crypto.createHash('sha256').update(cipherKey).digest();
  }
  private encryptData(dataToEncrypt: string, cipherKey: string) {
    const iv = crypto.randomBytes(16);
    const password = this.encryptPasswordV2(cipherKey);

    const cipher = crypto.createCipheriv('aes-256-ctr', password, iv);

    let encrypted = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted + ':' + iv.toString('hex');
  }

  private convertToGeoJson(input: string): GeoJsonType {
    const result: GeoJsonType = {
      type: 'Feature',
      geometry: {
        type: '',
        coordinates: [],
      },
    };
    if (!input.trim()) {
      throw new BadRequestException('Coordinates data must not be empty');
    }

    // Remove leading/trailing parentheses and whitespace
    const cleanedInput = input
      .trim()
      .replace(/^[()]/g, '')
      .replace(/[()]/g, '');

    // Check if the input is a polygon or a point
    if (cleanedInput.includes(',')) {
      // It's a polygon
      const coordinates = cleanedInput
        .replaceAll(', ', ',')
        .split(',')
        .map((pair) => pair.split(' ').map(Number));
      // Validate polygon format
      const isValidPolygon = coordinates.every(
        (pair) => pair.length === 2 && !pair.some(isNaN),
      );

      if (!isValidPolygon) {
        throw new BadRequestException('Invalid polygon format at csv');
      }

      result.geometry = {
        type: 'Polygon',
        coordinates,
      };
    } else {
      // It's a point
      const [x, y] = cleanedInput.split(' ').map(Number);

      // Validate point format
      if (isNaN(x) || isNaN(y)) {
        throw new BadRequestException('Invalid point format at csv');
      }

      result.geometry = {
        type: 'Point',
        coordinates: [x, y],
      };
    }

    return result;
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

      transformedCsvData.tarjeta = this.encryptData(
        transformedCsvData.tarjeta,
        cipherKey,
      );

      const poligono = this.convertToGeoJson(extractedCoordinates);
      return {
        ...transformedCsvData,
        poligono,
      };
    });

    return formattedData;
  }
}
