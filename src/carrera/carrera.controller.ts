import {
   Body,
   Controller,
   Delete,
   Get,
   Post,
   Put,
   Query,
} from "@nestjs/common";
import {
   ApiModelRespuesta,
   ApiModelRespuestaArray,
   ApiModelRespuestaObject,
} from "src/respuesta/response/model-respuesta";
import { RespuestaDto } from "src/respuesta/response/respuesta.dto";
import { CarreraService } from "./carrera.service";
import { ApiTags } from "@nestjs/swagger";
import { RespuestaService } from "src/respuesta/respuesta.service";
import { CarreraListarIndividualDto } from "./response/carrera-listar-individual.dto";
import { CarreraRegistrarIndividualDto } from "./request/carrera-registrar-individual.dto";
import { CarreraActualizarIndividualDto } from "./request/carrera-actualizar-individual.dto";
import { CarreraListarGrupalNombreDto } from "./response/carrera-listar-grupal-nombre.dto";
import { CarreraListarGrupalActivosDto } from "./response/carrera-listar-grupal-activos.dto";

@ApiTags("Carrrera")
@Controller("carrera")
export class CarreraController {
   constructor(private srvCarrera: CarreraService) {}

   @Get("listar_individual_nro_activos")
   @ApiModelRespuesta("number")
   async listarIndividualNroActivos(): Promise<RespuestaDto<number>> {
      const result = new RespuestaService<number>();

      return result.repuestaCorrecta(
         await this.srvCarrera.listarIndividualNroActivos(),
      );
   }

   @Get("listar_individual")
   @ApiModelRespuestaObject(CarreraListarIndividualDto)
   async listarIndividual(
      @Query("id") id: string,
   ): Promise<RespuestaDto<CarreraListarIndividualDto>> {
      const result = new RespuestaService<CarreraListarIndividualDto>();

      return result.repuestaCorrecta(
         await this.srvCarrera.listarIndividual(id),
      );
   }

   @Get("listar_grupal_nombre")
   @ApiModelRespuestaArray(CarreraListarGrupalNombreDto)
   async listarGrupalNombre(
      @Query("nombre") nombre: string,
      @Query("activo") activo: string,
   ): Promise<RespuestaDto<CarreraListarGrupalNombreDto[]>> {
      const result = new RespuestaService<CarreraListarGrupalNombreDto[]>();

      return result.repuestaCorrecta(
         await this.srvCarrera.listarGrupalNombre(nombre, activo),
      );
   }

   @Get("listar_grupal_activos")
   @ApiModelRespuestaArray(CarreraListarGrupalActivosDto)
   async listarGrupalActivos(): Promise<
      RespuestaDto<CarreraListarGrupalActivosDto[]>
   > {
      const result = new RespuestaService<CarreraListarGrupalActivosDto[]>();

      return result.repuestaCorrecta(
         await this.srvCarrera.listarGrupalActivos(),
      );
   }

   @Post("registrar_individual")
   @ApiModelRespuesta("boolean")
   async registrarIndividual(
      @Body() body: CarreraRegistrarIndividualDto,
   ): Promise<RespuestaDto<boolean>> {
      const result = new RespuestaService<boolean>();

      return result.repuestaCorrecta(
         await this.srvCarrera.registrarIndividual(body),
      );
   }

   @Put("actualizar_individual")
   @ApiModelRespuesta("boolean")
   async actualizarIndividual(
      @Query("id") id: string,
      @Body() body: CarreraActualizarIndividualDto,
   ): Promise<RespuestaDto<boolean>> {
      const result = new RespuestaService<boolean>();

      return result.repuestaCorrecta(
         await this.srvCarrera.actualizarIndividual(id, body),
      );
   }

   @Delete("eliminar_individual")
   @ApiModelRespuesta("boolean")
   async eliminarIndividual(
      @Query("id") id: string,
   ): Promise<RespuestaDto<boolean>> {
      const result = new RespuestaService<boolean>();

      return result.repuestaCorrecta(
         await this.srvCarrera.eliminarIndividual(id),
      );
   }
}
