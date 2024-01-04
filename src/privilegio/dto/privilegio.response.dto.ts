import { ApiProperty } from '@nestjs/swagger';

export class Privilegio {
  @ApiProperty()
  privilegio_id: string;
  @ApiProperty()
  nombre: string;
}
