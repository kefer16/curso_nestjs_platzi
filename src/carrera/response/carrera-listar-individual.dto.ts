export class CarreraListarIndividualDto {
  carrera_id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  fecha_registro: Date;
  fecha_actualizacion: Date;
  fk_usuario: string;
  cls_usuario: {
    usuario: string;
  };
  lst_carrera_historial: CarreraHistorialListarIndividualDto[];
}

class CarreraHistorialListarIndividualDto {
  cls_usuario: {
    usuario: string;
  };
}
