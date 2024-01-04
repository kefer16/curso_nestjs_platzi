import { Injectable } from '@nestjs/common';
import { Respuesta } from './dto/respuesta.dto';

@Injectable()
export abstract class RespuestaService<T> {
  respuestaCorrecta(_data: T | null) {
    const clsRespuesta: Respuesta<T> = {
      code: 200,
      data: _data,
      error: {
        code: '0',
        isValidate: false,
        message: '',
      },
    };
    return clsRespuesta;
  }

  // respuestaValidacion(_code: number, _error: ErrorEntity) {
  //   const clsRespuesta: Respuesta = {
  //     code: _code,
  //     data: null,
  //     error: _error,
  //   };

  //   return clsRespuesta;
  // }
}
