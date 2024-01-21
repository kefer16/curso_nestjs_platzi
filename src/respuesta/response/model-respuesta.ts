import { Type, applyDecorators } from "@nestjs/common";
import {
   ApiBadRequestResponse,
   ApiExtraModels,
   ApiOkResponse,
   ApiUnauthorizedResponse,
   getSchemaPath,
} from "@nestjs/swagger";
import { RespuestaDto } from "./respuesta.dto";
import { ErrorDto } from "src/error/response/error.dto";

export const ApiModelRespuestaArray = <TModel extends Type<any>>(
   model: TModel,
) => {
   return applyDecorators(
      ApiExtraModels(RespuestaDto, model),
      ApiOkResponse({
         schema: {
            title: "RespuestaDto",
            // title: `RespuestaDtoOf${model.name}`,
            allOf: [
               { $ref: getSchemaPath(RespuestaDto) },
               {
                  properties: {
                     data: {
                        type: "array",
                        items: { $ref: getSchemaPath(model) },
                     },
                  },
               },
            ],
         },
      }),
      ApiBadRequestResponse({
         schema: {
            title: "RespuestaDto",
            type: "object",
            properties: {
               code: { type: "number", default: 400 },
               data: { type: "array", default: null },
               error: { $ref: getSchemaPath(ErrorDto) },
            },
         },
      }),
      ApiUnauthorizedResponse({
         schema: {
            title: "RespuestaDto",
            type: "object",
            properties: {
               code: { type: "number", default: 401 },
               data: { type: "array", default: null },
               error: { $ref: getSchemaPath(ErrorDto) },
            },
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
            title: "RespuestaDto",
            // title: `RespuestaDtoOf${model.name}`,
            $ref: getSchemaPath(RespuestaDto),
            properties: {
               data: {
                  $ref: getSchemaPath(model),
               },
            },
         },
      }),
      ApiBadRequestResponse({
         schema: {
            title: "RespuestaDto",
            type: "object",
            properties: {
               code: { type: "number", default: 400 },
               data: { type: "object", default: null },
               error: { $ref: getSchemaPath(ErrorDto) },
            },
         },
      }),
      ApiUnauthorizedResponse({
         schema: {
            title: "RespuestaDto",
            type: "object",
            properties: {
               code: { type: "number", default: 401 },
               data: { type: "object", default: null },
               error: { $ref: getSchemaPath(ErrorDto) },
            },
         },
      }),
   );
};

export const ApiModelRespuesta = (
   tipoDeDato: "number" | "string" | "boolean",
) => {
   return applyDecorators(
      ApiExtraModels(RespuestaDto),
      ApiOkResponse({
         schema: {
            // title: `RespuestaDtoOf${tipoDeDato}`,
            title: "RespuestaDto",
            type: "object",

            properties: {
               code: { type: "number" },
               data: { type: tipoDeDato },
               error: { $ref: getSchemaPath(ErrorDto) },
            },
         },
      }),
      ApiBadRequestResponse({
         schema: {
            title: "RespuestaDto",
            type: "object",
            properties: {
               code: { type: "number", default: 400 },
               data: { type: tipoDeDato, default: null },
               error: { $ref: getSchemaPath(ErrorDto) },
            },
         },
      }),
      ApiUnauthorizedResponse({
         schema: {
            title: "RespuestaDto",
            type: "object",
            properties: {
               code: { type: "number", default: 401 },
               data: { type: tipoDeDato, default: null },
               error: { $ref: getSchemaPath(ErrorDto) },
            },
         },
      }),
   );
};
