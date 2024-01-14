import { Injectable } from '@nestjs/common';
import { RespuestaDto } from './response/respuesta.dto';
import { ErrorEntity } from 'src/error/dto/error.response.dto';

@Injectable()
export class RespuestaService<TData> {
  repuestaCorrecta(_data: TData): RespuestaDto<TData> {
    const result = new RespuestaDto<TData>();
    result.code = 200;
    result.data = _data;
    result.error = new ErrorEntity();
    return result;
  }
}
