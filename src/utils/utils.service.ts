import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  obtenerFechaLocal = (): string => {
    const local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON();
  };
}
