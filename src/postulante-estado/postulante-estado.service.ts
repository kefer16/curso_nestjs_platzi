import { Injectable } from '@nestjs/common';
import { PostulanteEstadoListarGrupalDto } from './response/postulante-estado-listar-grupal.dto';
import { PostulanteEstadoListarGrupalActivosDto } from './response/postulante-estado-listar-grupal-activos.dto';
import { prisma } from 'src/bd/config.bd';

@Injectable()
export class PostulanteEstadoService {
  async listarGrupal() {
    type tipo = PostulanteEstadoListarGrupalDto[];

    const result: tipo = await prisma.postulante_estado.findMany({
      select: {
        postulante_estado_id: true,
        abreviatura: true,
      },
      orderBy: {
        fecha_registro: 'desc',
      },
    });
    return result;
  }

  async listarGrupalActivos() {
    type tipo = PostulanteEstadoListarGrupalActivosDto[];

    const result: tipo = await prisma.postulante_estado.findMany({
      select: {
        postulante_estado_id: true,
        abreviatura: true,
      },
      where: {
        activo: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });
    return result;
  }
}
