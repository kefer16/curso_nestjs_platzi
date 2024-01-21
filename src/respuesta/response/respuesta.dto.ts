import { ErrorDto } from "src/error/response/error.dto";

export class RespuestaDto<TData> {
   code: number;
   data: TData[] | TData;
   error: ErrorDto;
}
