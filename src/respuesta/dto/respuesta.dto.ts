import { ErrorEntity } from 'src/error/dto/error.response.dto';

export class Respuesta<T> {
  code: number;
  data: T;
  error: ErrorEntity;
}
