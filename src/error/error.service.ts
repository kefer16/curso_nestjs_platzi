import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { prisma } from 'src/bd/config.bd';
import { ErrorPersonalizado, ErrorProps } from './dto/error.response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ErrorService {
  obtenerFechaLocal = (): string => {
    const local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON();
  };

  obtenerArchivoError(error: any): string {
    const stackTrace = error.stack;
    const fileNameMatches = stackTrace.match(/at\s+.+\((.+):\d+:\d+\)/);

    if (fileNameMatches && fileNameMatches.length > 1) {
      const fileName = fileNameMatches[1];
      return fileName.toString();
    } else {
      return '';
    }
  }

  async grabarError(
    codigo: number,
    codigo_envio: string,
    error: any,
    res: Response,
  ) {
    const errorProps: ErrorProps = {
      esValidacion: false,
      codigo: '',
      linea: 0,
      objeto: '',
      mensaje: '',
      servidor: '',
      fecha_registro: this.obtenerFechaLocal(),
    };

    if (error instanceof ErrorPersonalizado) {
      errorProps.esValidacion = true;
      errorProps.codigo = '0';
      errorProps.linea = 0;
      errorProps.objeto = this.obtenerArchivoError(error);
      errorProps.mensaje = error.message;
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (String(error.meta?.code) === '5000') {
        errorProps.esValidacion = true;
        errorProps.codigo = String(error.meta?.code);
        errorProps.linea = 0;
        errorProps.objeto = this.obtenerArchivoError(error);
        errorProps.mensaje = String(error.meta?.message);
        errorProps.servidor = 'DATABASE';
      } else {
        errorProps.esValidacion = false;
        errorProps.codigo = String(error.code);
        errorProps.linea = 0;
        errorProps.objeto = this.obtenerArchivoError(error);
        errorProps.mensaje = String(error.message);
        errorProps.servidor = 'DATABASE';
      }
    } else {
      errorProps.esValidacion = false;
      errorProps.codigo = String(error.code);
      errorProps.linea = 0;
      errorProps.objeto = this.obtenerArchivoError(error);
      errorProps.mensaje = error.message;
      errorProps.servidor = 'CODE';
    }

    try {
      await prisma.error.create({
        data: {
          codigo: errorProps.codigo,
          codigo_envio: codigo_envio,
          linea: errorProps.linea,
          objeto: errorProps.objeto,
          mensaje: errorProps.mensaje,
          servidor: errorProps.servidor,
          fecha_registro: errorProps.fecha_registro,
        },
      });

      // res.status(codigo).json(RespuestaService);
    } catch (error) {
      console.log(error);
    }
  }

  async grabarSoloError(error: any) {
    try {
      await prisma.error.create({
        data: {
          codigo: error.parent === undefined ? 0 : error.parent.number,
          codigo_envio: '',
          linea: error.parent.lineNumber,
          objeto: this.obtenerArchivoError(error),
          mensaje: error.message,
          servidor: error.parent.serverName,
          fecha_registro: this.obtenerFechaLocal(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
