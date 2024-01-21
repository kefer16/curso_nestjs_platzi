import { Injectable } from "@nestjs/common";
import { OperadorListarGrupalDto } from "./request/operador-listar-grupal.dto";
import { OperadorListarGrupalActivosDto } from "./request/operador-listar-grupal-activos.dto";
import { prisma } from "src/bd/config.bd";

@Injectable()
export class OperadorService {
   async listarGrupal() {
      type tipo = OperadorListarGrupalDto[];

      const result: tipo = await prisma.operador.findMany({
         select: {
            operador_id: true,
            nombre: true,
         },
         orderBy: {
            fecha_registro: "desc",
         },
      });
      return result;
   }

   async listarGrupalActivos() {
      type tipo = OperadorListarGrupalActivosDto[];

      const result: tipo = await prisma.operador.findMany({
         select: {
            operador_id: true,
            nombre: true,
         },
         where: {
            activo: true,
         },
         orderBy: {
            nombre: "asc",
         },
      });
      return result;
   }
}
