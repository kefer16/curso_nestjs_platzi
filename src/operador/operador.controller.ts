import { Controller, Get } from "@nestjs/common";
import { OperadorService } from "./operador.service";
import { ApiModelRespuestaArray } from "src/respuesta/response/model-respuesta";
import { RespuestaService } from "src/respuesta/respuesta.service";
import { RespuestaDto } from "src/respuesta/response/respuesta.dto";
import { OperadorListarGrupalDto } from "./request/operador-listar-grupal.dto";
import { OperadorListarGrupalActivosDto } from "./request/operador-listar-grupal-activos.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Operador")
@Controller("operador")
export class OperadorController {
   constructor(private srvOperador: OperadorService) {}

   @Get("listar_grupal")
   @ApiModelRespuestaArray(OperadorListarGrupalDto)
   async listarGrupal(): Promise<RespuestaDto<OperadorListarGrupalDto[]>> {
      const result = new RespuestaService<OperadorListarGrupalDto[]>();

      return result.repuestaCorrecta(await this.srvOperador.listarGrupal());
   }

   @Get("listar_grupal_activos")
   @ApiModelRespuestaArray(OperadorListarGrupalActivosDto)
   async listarGrupalActivos(): Promise<
      RespuestaDto<OperadorListarGrupalActivosDto[]>
   > {
      const result = new RespuestaService<OperadorListarGrupalActivosDto[]>();

      return result.repuestaCorrecta(
         await this.srvOperador.listarGrupalActivos(),
      );
   }
}
