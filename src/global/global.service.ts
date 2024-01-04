import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { prisma } from 'src/bd/config.bd';
import { ErrorService } from 'src/error/error.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class GlobalService {
  constructor(private srvError: ErrorService, private srvUtils: UtilsService) {}
  async registarIndividualRequest(code_send: string, req: Request) {
    try {
      await prisma.api_envio.create({
        data: {
          codigo_envio: code_send,
          tipo_peticion: req.method.toString() ?? '',
          url:
            'http://' +
            req.headers.host?.toString() +
            req.originalUrl.toString(),
          parametros: JSON.stringify(req.query) ?? '',
          llave: req.headers.authorization?.toString() ?? '',
          cabeceras: JSON.stringify(req.headers) ?? '',
          tipo_contenido: req.headers['content-type']?.toString() ?? '',
          cuerpo: JSON.stringify(req.body) ?? '', // solo grabar la respuesta recortada
          respuesta: '',
          agente: req.headers['user-agent']?.toString() ?? '',
          fecha_creacion: this.srvUtils.obtenerFechaLocal(),
          estatus: 0,
        },
      });
    } catch (error) {
      this.srvError.grabarSoloError(error);
    }
  }
  async registrarIndividualResponse(code_send: string, res: Response) {
    try {
      await prisma.api_envio.create({
        data: {
          codigo_envio: code_send,
          tipo_peticion: '',
          url: '',
          parametros: '',
          llave: '',
          cabeceras: '',
          tipo_contenido: '',
          cuerpo: '',
          respuesta: '', //solo grabar la respuesta recortada
          agente: '',
          fecha_creacion: this.srvUtils.obtenerFechaLocal(),
          estatus: res.statusCode ?? 0,
        },
      });
    } catch (error) {
      this.srvError.grabarSoloError(error);
    }
  }
}
