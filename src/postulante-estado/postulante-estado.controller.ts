import { Controller, Get } from '@nestjs/common';
import { RespuestaService } from 'src/respuesta/respuesta.service';
import { ApiModelRespuestaArray } from 'src/respuesta/response/model-respuesta';
import { RespuestaDto } from 'src/respuesta/response/respuesta.dto';
import { PostulanteEstadoService } from './postulante-estado.service';
import { PostulanteEstadoListarGrupalDto } from './response/postulante-estado-listar-grupal.dto';
import { PostulanteEstadoListarGrupalActivosDto } from './response/postulante-estado-listar-grupal-activos.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Postulante Estado')
@Controller('postulante_estado')
export class PostulanteEstadoController {
  constructor(private srvPostulanteEstado: PostulanteEstadoService) {}

  @Get('listar_grupal')
  @ApiModelRespuestaArray(PostulanteEstadoListarGrupalDto)
  async listarGrupal(): Promise<
    RespuestaDto<PostulanteEstadoListarGrupalDto[]>
  > {
    const result = new RespuestaService<PostulanteEstadoListarGrupalDto[]>();

    return result.repuestaCorrecta(
      await this.srvPostulanteEstado.listarGrupal(),
    );
  }

  @Get('listar_grupal_activos')
  @ApiModelRespuestaArray(PostulanteEstadoListarGrupalActivosDto)
  async listarGrupalActivos(): Promise<
    RespuestaDto<PostulanteEstadoListarGrupalActivosDto[]>
  > {
    const result = new RespuestaService<
      PostulanteEstadoListarGrupalActivosDto[]
    >();

    return result.repuestaCorrecta(
      await this.srvPostulanteEstado.listarGrupalActivos(),
    );
  }
}
