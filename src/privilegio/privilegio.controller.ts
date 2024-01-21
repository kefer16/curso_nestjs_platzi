import {
   Body,
   Controller,
   Delete,
   Get,
   Post,
   Put,
   Query,
} from "@nestjs/common";
import { PrivilegioService } from "./privilegio.service";

import { ApiTags } from "@nestjs/swagger";
import {
   ApiModelRespuesta,
   ApiModelRespuestaArray,
   ApiModelRespuestaObject,
} from "src/respuesta/response/model-respuesta";
import { RespuestaDto } from "src/respuesta/response/respuesta.dto";
import { PrivilegioListarGrupalDto } from "./response/privilegio-listar-grupal.dto";
import { RespuestaService } from "src/respuesta/respuesta.service";
import { PrivilegioListarIndividualDto } from "./response/privilegio-listar-individual.dto";
import { PrivilegioRegistrarIndividualDto } from "./request/privilegio-registrar-individual.dto";
import { PrivilegioActualizarIndividualDto } from "./request/privilegio-actualizar-individual.dto";

@ApiTags("Privilegio")
@Controller("privilegio")
export class PrivilegioController {
   constructor(private srvPrivilegio: PrivilegioService) {}

   @Get("listar_grupal")
   @ApiModelRespuestaArray(PrivilegioListarGrupalDto)
   async listarGrupal(): Promise<RespuestaDto<PrivilegioListarGrupalDto[]>> {
      const result = new RespuestaService<PrivilegioListarGrupalDto[]>();

      return result.repuestaCorrecta(await this.srvPrivilegio.listarGrupal());
   }

   @Get("listar_individual")
   @ApiModelRespuestaObject(PrivilegioListarIndividualDto)
   async listarIndividual(
      @Query("privilegio_id") id: string,
   ): Promise<RespuestaDto<PrivilegioListarIndividualDto>> {
      const result = new RespuestaService<PrivilegioListarIndividualDto>();

      return result.repuestaCorrecta(
         await this.srvPrivilegio.listarIndividual(id),
      );
   }

   @Post("registrar_individual")
   @ApiModelRespuesta("boolean")
   async registrarIndividual(
      @Body() body: PrivilegioRegistrarIndividualDto,
   ): Promise<RespuestaDto<boolean>> {
      const result = new RespuestaService<boolean>();

      return result.repuestaCorrecta(
         await this.srvPrivilegio.registrarIndividual(body),
      );
   }

   @Put("actualizar_individual")
   @ApiModelRespuesta("boolean")
   async actualizarInidvidual(
      @Query("privilegio_id") id: string,
      @Body() body: PrivilegioActualizarIndividualDto,
   ): Promise<RespuestaDto<boolean>> {
      const result = new RespuestaService<boolean>();

      return result.repuestaCorrecta(
         await this.srvPrivilegio.actualizarInidvidual(id, body),
      );
   }

   @Delete("eliminar_individual")
   @ApiModelRespuesta("boolean")
   async eliminarIndividual(
      @Query("privilegio_id") id: string,
   ): Promise<RespuestaDto<boolean>> {
      const result = new RespuestaService<boolean>();

      return result.repuestaCorrecta(
         await this.srvPrivilegio.eliminarIndividual(id),
      );
   }
}
