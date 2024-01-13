import { Controller, Get, Post } from '@nestjs/common';
import { PrivilegioService } from './privilegio.service';

import { ApiTags } from '@nestjs/swagger';
import { PaginatedDto } from 'src/respuesta/dto/paginated.dto';
import { CatDto } from 'src/respuesta/dto/cat.dto';
import {
  ApiPaginatedResponse,
  ApiPaginatedResponseArray,
} from 'src/respuesta/dto/modelPaginate.dto';
import { Privilegio } from './dto/privilegio.response.dto';

@Controller('privilegio')
@ApiTags('privilegio')
export class PrivilegioController {
  constructor(private srvPrivilegio: PrivilegioService) {}

  @Get()
  @ApiPaginatedResponseArray(CatDto)
  async findAll(): Promise<PaginatedDto<CatDto>> {
    return new PaginatedDto<CatDto>();
  }

  @Post()
  @ApiPaginatedResponse(Privilegio)
  async crear(): Promise<PaginatedDto<CatDto>> {
    return new PaginatedDto<CatDto>();
  }
}
