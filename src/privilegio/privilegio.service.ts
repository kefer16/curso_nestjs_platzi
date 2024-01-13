import { Injectable } from '@nestjs/common';
import { prisma } from 'src/bd/config.bd';
import { Privilegio } from './dto/privilegio.response.dto';

@Injectable()
export class PrivilegioService {
  async listarGrupal(): Promise<Privilegio[]> {
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

  async listarIndividual(id: string): Promise<Privilegio | null> {
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
}
