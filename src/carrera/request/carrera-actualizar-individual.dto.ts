export class CarreraActualizarIndividualDto {
  nombre: string;
  descripcion: string;
  activo: boolean;
  fecha_actualizacion: Date;
  cls_carrera_historial: CarreraActualizarIndividualHistorialDto;
}

export class CarreraActualizarIndividualHistorialDto {
  fecha_registro: Date;
  fk_carrera: string;
  fk_usuario: string;
}
