import { Controller, Get, HttpCode } from '@nestjs/common';
import { PrivilegioService } from './privilegio.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Respuesta } from 'src/respuesta/dto/respuesta.dto';
import { RespuestaService } from 'src/respuesta/respuesta.service';
import { Privilegio } from './dto/privilegio.response.dto';

@Controller('privilegio')
@ApiTags('privilegio')
export class PrivilegioController {
  constructor(
    private srvPrivilegio: PrivilegioService,
    private srvRespListarGrupal: RespuestaService<Privilegio[]>,
  ) {}

  @Get('listar_grupal')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The user records',
    type: Respuesta<Privilegio[]>,
  })
  async listarGrupal(): Promise<Respuesta<Privilegio[]>> {
    return this.srvRespListarGrupal.respuestaCorrecta(
      await this.srvPrivilegio.listarGrupal(),
    );
  }

  // @Get('listar_individual')
  // @HttpCode(200)
  // @ApiOkResponse({
  //   description: 'The user records',
  //   type: RespuestaEntity<Privilegio>,
  //   isArray: true,
  // })
  // async listarIndividual(
  //   @Query('id') id: string,
  // ): Promise<RespuestaEntity<Privilegio>> {
  //   this.srvRespListarIndividual.respuestaCorrecta(
  //     await this.srvPrivilegio.listarIndividual(id),
  //   );
  //   return this.srvRespListarIndividual;
  // }
}
