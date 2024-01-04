import { IsNotEmpty, IsString } from 'class-validator';

export class PrivilegioListarIndividual {
  @IsNotEmpty()
  @IsString()
  id: string;
}
