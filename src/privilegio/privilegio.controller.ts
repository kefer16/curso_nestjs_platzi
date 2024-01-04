import { Controller, Get, HttpCode } from '@nestjs/common';
import { PrivilegioService } from './privilegio.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RespuestaService } from 'src/respuesta/respuesta.service';
import { Privilegio } from './dto/privilegio.response.dto';

@Controller('privilegio')
@ApiTags('privilegio')
export class PrivilegioController {
  constructor(private srvPrivilegio: PrivilegioService) {}

  @Get('listar_grupal')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The user records',
    isArray: false,
    type: RespuestaService<Privilegio[]>,
  })
  async listarGrupal(): Promise<RespuestaService<Privilegio[]>> {
    return {
      code: 200,
      data: await this.srvPrivilegio.listarGrupal(),
      error: {
        code: '0',
        isValidate: false,
        message: '',
      },
    };
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
