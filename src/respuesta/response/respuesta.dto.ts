import { ApiProperty } from '@nestjs/swagger';
import { ErrorEntity } from 'src/error/dto/error.response.dto';

export class RespuestaDto<TData> {
  @ApiProperty()
  code: number;
  data: TData[] | TData;
  @ApiProperty()
  error: ErrorEntity;
}
