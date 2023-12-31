import { Module } from '@nestjs/common';
import { PrivilegioController } from './privilegio/privilegio.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { PrivilegioService } from './privilegio/privilegio.service';
import { ApiEnvioController } from './api_envio/api_envio.controller';
import { ErrorController } from './error/error.controller';
import { ErrorService } from './error/error.service';
import { ApiEnvioService } from './api_envio/api_envio.service';

@Module({
  imports: [UsuarioModule],
  controllers: [PrivilegioController, ApiEnvioController, ErrorController],
  providers: [PrivilegioService, ErrorService, ApiEnvioService],
})
export class AppModule {}
