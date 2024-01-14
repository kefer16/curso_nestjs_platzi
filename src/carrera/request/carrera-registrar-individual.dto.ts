export class CarreraRegistrarIndividualDto {
  nombre: string;
  descripcion: string;
  activo: boolean;
  fecha_registro: Date;
  fecha_actualizacion: Date;
  fk_usuario: string;
  cls_carrera_historial: CarreraRegistrarIndividualHistorialDto;
}
export class CarreraRegistrarIndividualHistorialDto {
  fecha_registro: Date;
  fk_carrera: string;
  fk_usuario: string;
}
