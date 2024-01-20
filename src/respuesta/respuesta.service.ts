import { Injectable } from '@nestjs/common';
import { RespuestaDto } from './response/respuesta.dto';
import { ErrorDto } from 'src/error/response/error.dto';

@Injectable()
export class RespuestaService<TData> {
  repuestaCorrecta(_data: TData): RespuestaDto<TData> {
    const result = new RespuestaDto<TData>();
    result.code = 200;
    result.data = _data;
    result.error = new ErrorDto(false, '0', '');
    return result;
  }
}
