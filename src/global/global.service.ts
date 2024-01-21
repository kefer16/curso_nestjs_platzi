import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { prisma } from "src/bd/config.bd";

@Injectable()
export class GlobalService {
   obtenerFechaLocal = (): string => {
      const local = new Date();
      local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
      return local.toJSON();
   };

   async registarIndividualRequest(code_send: string, req: Request) {
      await prisma.api_envio.create({
         data: {
            codigo_envio: code_send,
            tipo_peticion: req.method.toString() ?? "",
            url:
               "http://" +
               req.headers.host?.toString() +
               req.originalUrl.toString(),
            parametros: JSON.stringify(req.query) ?? "",
            llave: req.headers.authorization?.toString() ?? "",
            cabeceras: JSON.stringify(req.headers) ?? "",
            tipo_contenido: req.headers["content-type"]?.toString() ?? "",
            cuerpo: JSON.stringify(req.body) ?? "", // solo grabar la respuesta recortada
            respuesta: "",
            agente: req.headers["user-agent"]?.toString() ?? "",
            fecha_creacion: this.obtenerFechaLocal(),
            estatus: 0,
         },
      });
   }

   async registrarIndividualResponse(code_send: string, res: Response) {
      await prisma.api_envio.create({
         data: {
            codigo_envio: code_send,
            tipo_peticion: "",
            url: "",
            parametros: "",
            llave: "",
            cabeceras: "",
            tipo_contenido: "",
            cuerpo: "",
            respuesta: "", //solo grabar la respuesta recortada
            agente: "",
            fecha_creacion: this.obtenerFechaLocal(),
            estatus: res.statusCode ?? 0,
         },
      });
   }
}
