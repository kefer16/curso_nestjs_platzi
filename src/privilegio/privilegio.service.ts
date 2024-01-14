import { Injectable } from '@nestjs/common';
import { prisma } from 'src/bd/config.bd';
import { PrivilegioListarGrupalDto } from './response/privilegio-listar-grupal.dto';
import { PrivilegioListarIndividualDto } from './response/privilegio-listar-individual.dto';
import { PrivilegioRegistrarIndividualDto } from './request/privilegio-registrar-individual.dto';
import { PrivilegioActualizarIndividualDto } from './request/privilegio-actualizar-individual.dto';

@Injectable()
export class PrivilegioService {
  async listarGrupal(): Promise<PrivilegioListarGrupalDto[]> {
    return await prisma.privilegio.findMany({
      select: {
        privilegio_id: true,
        nombre: true,
      },
      orderBy: {
        fecha_registro: 'desc',
      },
    });
  }

  async listarIndividual(id: string): Promise<PrivilegioListarIndividualDto> {
    const resp = await prisma.privilegio.findUnique({
      select: {
        privilegio_id: true,
        nombre: true,
      },
      where: {
        privilegio_id: id,
      },
    });

    return resp;
  }

  async registrarIndividual(
    body: PrivilegioRegistrarIndividualDto,
  ): Promise<boolean> {
    let result = false;
    await prisma.privilegio.create({
      data: {
        nombre: body.nombre,
        activo: body.activo,
        abreviatura: body.abreviatura,
        fecha_registro: body.fecha_registro,
      },
    });
    result = true;
    return result;
  }

  async actualizarInidvidual(
    id: string,
    body: PrivilegioActualizarIndividualDto,
  ): Promise<boolean> {
    let result = false;
    await prisma.privilegio.update({
      data: {
        nombre: body.nombre,
        activo: body.activo,
        abreviatura: body.abreviatura,
        fecha_registro: body.fecha_registro,
      },
      where: {
        privilegio_id: id,
      },
    });
    result = true;
    return result;
  }
  async eliminarIndividual(id: string): Promise<boolean> {
    let result = false;
    await prisma.privilegio.delete({
      where: {
        privilegio_id: id,
      },
    });
    result = true;
    return result;
  }
}
