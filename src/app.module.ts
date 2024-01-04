import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrivilegioController } from './privilegio/privilegio.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { PrivilegioService } from './privilegio/privilegio.service';
import { ApiEnvioController } from './api_envio/api_envio.controller';
import { ErrorController } from './error/error.controller';
import { ErrorService } from './error/error.service';
import { ApiEnvioService } from './api_envio/api_envio.service';
import { GlobalService } from './global/global.service';
import { GlobalMiddleware } from './global/global.middleware';
import { UtilsService } from './utils/utils.service';

@Module({
  imports: [UsuarioModule],
  controllers: [PrivilegioController, ApiEnvioController, ErrorController],
  providers: [
    PrivilegioService,
    ErrorService,
    ApiEnvioService,
    GlobalService,
    UtilsService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GlobalMiddleware).forRoutes(PrivilegioController);
  }
}
