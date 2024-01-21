export class CarreraListarGrupalNombreDto {
   carrera_id: string;
   nombre: string;
   descripcion: string;
   fecha_registro: Date;
   fecha_actualizacion: Date;
   activo: boolean;
   lst_carrera_historial: CarreraListarGrupalNombreHistorialDto[];
}

export class CarreraListarGrupalNombreHistorialDto {
   cls_usuario: {
      usuario: string;
   };
}
