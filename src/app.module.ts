import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrivilegioController } from "./privilegio/privilegio.controller";
import { UsuarioModule } from "./usuario/usuario.module";
import { PrivilegioService } from "./privilegio/privilegio.service";
import { GlobalService } from "./global/global.service";
import { GlobalMiddleware } from "./global/global.middleware";
import { UtilsService } from "./utils/utils.service";
import { ErrorController } from "./error/error.controller";
import { ErrorService } from "./error/error.service";
import { CarreraController } from "./carrera/carrera.controller";
import { CarreraService } from "./carrera/carrera.service";
import { RespuestaService } from "./respuesta/respuesta.service";
import { OperadorService } from "./operador/operador.service";
import { OperadorController } from "./operador/operador.controller";
import { PostulanteEstadoController } from "./postulante-estado/postulante-estado.controller";
import { PostulanteEstadoService } from "./postulante-estado/postulante-estado.service";
import { PostulanteService } from "./postulante/postulante.service";
import { PostulanteController } from "./postulante/postulante.controller";

@Module({
   imports: [UsuarioModule],
   controllers: [
      PrivilegioController,
      ErrorController,
      CarreraController,
      OperadorController,
      PostulanteEstadoController,
      PostulanteController,
   ],
   providers: [
      PrivilegioService,
      ErrorService,
      GlobalService,
      UtilsService,
      CarreraService,
      RespuestaService,
      OperadorService,
      PostulanteEstadoService,
      PostulanteService,
   ],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(GlobalMiddleware).forRoutes(PrivilegioController);
   }
}
