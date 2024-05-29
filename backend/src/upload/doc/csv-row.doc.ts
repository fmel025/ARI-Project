import { Expose, Transform } from 'class-transformer';

export class CsvRowDoc {
  @Expose()
  @Transform(({ obj }: { obj: { row: string[] } }) => {
    return obj.row[0];
  })
  documento: string;

  @Expose()
  @Transform(({ obj }: { obj: { row: string[] } }) => {
    return obj.row[1];
  })
  nombres: string;

  @Expose()
  @Transform(({ obj }: { obj: { row: string[] } }) => {
    return obj.row[2];
  })
  apellidos: string;

  @Expose()
  @Transform(({ obj }: { obj: { row: string[] } }) => {
    return obj.row[3];
  })
  tarjeta: string;

  @Expose()
  @Transform(({ obj }: { obj: { row: string[] } }) => {
    return obj.row[4];
  })
  tipo: string;

  @Expose()
  @Transform(({ obj }: { obj: { row: string[] } }) => {
    return obj.row[5];
  })
  telefono: string;
}
