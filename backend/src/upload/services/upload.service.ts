import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  processCsvLine(line: string, delimiter: string) {
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
}
