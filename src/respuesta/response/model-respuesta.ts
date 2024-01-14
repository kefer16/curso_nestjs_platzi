import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { RespuestaDto } from './respuesta.dto';
import { ErrorEntity } from 'src/error/dto/error.response.dto';

export const ApiModelRespuestaArray = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(RespuestaDto, model),
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(RespuestaDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiModelRespuestaObject = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(RespuestaDto, model),
    ApiOkResponse({
      schema: {
        title: `RespuestaResponseOf${model.name}`,
        $ref: getSchemaPath(RespuestaDto),
        properties: {
          data: {
            $ref: getSchemaPath(model),
          },
        },
      },
    }),
  );
};

export const ApiModelRespuesta = (
  tipoDeDato: 'number' | 'string' | 'boolean',
) => {
  return applyDecorators(
    ApiExtraModels(RespuestaDto),
    ApiOkResponse({
      schema: {
        title: `RespuestaResponseOf${tipoDeDato}`,
        type: 'object',

        properties: {
          code: { type: 'string' },
          error: { $ref: getSchemaPath(ErrorEntity) },
          data: { type: tipoDeDato },
        },
      },
    }),
  );
};
