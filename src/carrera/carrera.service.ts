import { Injectable } from "@nestjs/common";
import { prisma } from "src/bd/config.bd";
import { CarreraListarIndividualDto } from "./response/carrera-listar-individual.dto";
import {
   CarreraRegistrarIndividualDto,
   CarreraRegistrarIndividualHistorialDto,
} from "./request/carrera-registrar-individual.dto";
import {
   CarreraActualizarIndividualDto,
   CarreraActualizarIndividualHistorialDto,
} from "./request/carrera-actualizar-individual.dto";
import { CarreraListarGrupalNombreDto } from "./response/carrera-listar-grupal-nombre.dto";
import { CarreraListarGrupalActivosDto } from "./response/carrera-listar-grupal-activos.dto";

@Injectable()
export class CarreraService {
   async listarIndividualNroActivos(): Promise<number> {
      type tipo = number;

      const result: tipo = await prisma.carrera.count({
         where: {
            activo: true,
         },
      });
      return result;
   }

   async listarIndividual(id: string): Promise<CarreraListarIndividualDto> {
      type tipo = CarreraListarIndividualDto | null;

      const result: tipo = await prisma.carrera.findUnique({
         select: {
            carrera_id: true,
            nombre: true,
            descripcion: true,
            activo: true,
            fecha_registro: true,
            fecha_actualizacion: true,
            fk_usuario: true,
            cls_usuario: {
               select: {
                  usuario: true,
               },
            },
            lst_carrera_historial: {
               select: {
                  cls_usuario: {
                     select: {
                        usuario: true,
                     },
                  },
               },
               orderBy: {
                  fecha_registro: "desc",
               },
            },
         },
         where: {
            carrera_id: id,
         },
      });
      return result;
   }

   async eliminarIndividual(id: string) {
      let result = false;

      const NroPostulantesConMismoCarrera =
         await prisma.postulante_carrera.count({
            where: {
               fk_carrera: id,
            },
         });
      if (NroPostulantesConMismoCarrera > 0) {
         // throw new ErrorPersonalizado(
         //   `No se puede eliminar la carrera, ya se asignó a ${NroPostulantesConMismoCarrera} postulantes`,
         // );
      }

      await prisma.carrera_historial.delete({
         where: {
            fk_carrera: id,
         },
      });

      await prisma.carrera.delete({
         where: {
            carrera_id: id,
         },
      });
      result = true;
      return result;
   }

   async registrarIndividual(body: CarreraRegistrarIndividualDto) {
      let result = false;

      const clsCarreraHistorial: CarreraRegistrarIndividualHistorialDto =
         body.cls_carrera_historial;

      const NroCarrerasConMismoNombre = await prisma.carrera.count({
         where: {
            nombre: body.nombre,
         },
      });

      if (NroCarrerasConMismoNombre > 0) {
         // throw new ErrorPersonalizado('Ya existe una carrera con el mismo nombre');
      }

      const queryCarrera = await prisma.carrera.create({
         select: {
            carrera_id: true,
         },
         data: {
            nombre: body.nombre,
            descripcion: body.descripcion,
            activo: body.activo,
            fecha_registro: body.fecha_registro,
            fecha_actualizacion: body.fecha_actualizacion,
            fk_usuario: body.fk_usuario,
         },
      });

      await prisma.carrera_historial.create({
         data: {
            fecha_registro: clsCarreraHistorial.fecha_registro,
            fk_usuario: clsCarreraHistorial.fk_usuario,
            fk_carrera: queryCarrera.carrera_id,
         },
      });
      result = true;
      return result;
   }

   async actualizarIndividual(
      id: string,
      body: CarreraActualizarIndividualDto,
   ) {
      const result = false;

      const clsCarreraHistorial: CarreraActualizarIndividualHistorialDto =
         body.cls_carrera_historial;

      const NroCarrerasConMismoNombre = await prisma.carrera.count({
         where: {
            nombre: body.nombre,
            NOT: {
               carrera_id: id,
            },
         },
      });

      if (NroCarrerasConMismoNombre > 0) {
         // throw new ErrorPersonalizado('Ya existe una carrera con el mismo nombre');
      }

      await prisma.carrera.update({
         data: {
            nombre: body.nombre,
            descripcion: body.descripcion,
            activo: body.activo,
            fecha_actualizacion: body.fecha_actualizacion,
         },
         where: {
            carrera_id: id,
         },
      });

      await prisma.carrera_historial.create({
         data: {
            fecha_registro: clsCarreraHistorial.fecha_registro,
            fk_usuario: clsCarreraHistorial.fk_usuario,
            fk_carrera: id,
         },
      });

      return result;
   }

   async listarGrupalNombre(
      nombre: string,
      activo: string,
   ): Promise<CarreraListarGrupalNombreDto[]> {
      type tipo = CarreraListarGrupalNombreDto[];

      const case_where_activo = activo === "-1" ? {} : Boolean(Number(activo));

      const result: tipo = await prisma.carrera.findMany({
         select: {
            carrera_id: true,
            nombre: true,
            descripcion: true,
            fecha_registro: true,
            fecha_actualizacion: true,
            activo: true,
            lst_carrera_historial: {
               select: {
                  cls_usuario: {
                     select: {
                        usuario: true,
                     },
                  },
               },
               orderBy: {
                  fecha_registro: "desc",
               },
            },
         },
         where: {
            nombre: {
               contains: nombre,
            },
            activo: case_where_activo,
         },
         orderBy: {
            fecha_actualizacion: "desc",
         },
      });
      return result;
   }

   async listarGrupalActivos() {
      type tipo = CarreraListarGrupalActivosDto[];

      const result: tipo = await prisma.carrera.findMany({
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
