import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { PrivilegioService } from './privilegio.service';
import { Privilegio } from './dto/privilegio.response';
import { ApiTags } from '@nestjs/swagger';

@Controller('privilegio')
@ApiTags('privilegio')
export class PrivilegioController {
  constructor(private srvPrivilegio: PrivilegioService) {}

  @Get('listar_grupal')
  @HttpCode(200)
  async listarGrupal(): Promise<Privilegio[]> {
    return await this.srvPrivilegio.listarGrupal();
  }

  @Get('listar_individual/')
  @HttpCode(200)
  async listarIndividual(@Query('id') id: string): Promise<Privilegio> {
    return await this.srvPrivilegio.listarIndividual(id);
  }
}
