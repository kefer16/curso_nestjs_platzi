import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorEntity } from 'src/error/dto/error.response.dto';
@Injectable()
export abstract class RespuestaService<T> {
  @ApiProperty()
  code: number;
  @ApiProperty()
  data: T;
  @ApiProperty()
  error: ErrorEntity;

  // respuestaCorrecta(_data: T | null): RespuestaService<T> {
  //   return {
  //     code: 200,
  //     data: _data,
  //     error: {
  //       code: '0',
  //       isValidate: false,
  //       message: '',
  //     },
  //   };
  // }

  // respuestaValidacion(_code: number, _error: ErrorEntity) {
  //   const clsRespuesta: Respuesta = {
  //     code: _code,
  //     data: null,
  //     error: _error,
  //   };

  //   return clsRespuesta;
  // }
}
