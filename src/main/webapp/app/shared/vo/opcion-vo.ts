export interface IOpcionVo {
  codigo: string | number;
  nombre: string;
}

export interface IOpcionVoDescripcion {
  codigo: string | number;
  descripcion: string;
}

export interface IOpcionVoMunicipio {
  codigo: string | number;
  municipio: string;
}

export interface IlistarOfertas {
  id: string | undefined;
  profesion: string | undefined;
  salario: string | undefined;
  ciudad: string | undefined;
  activado: boolean | undefined;
}

export interface IResultadoBusquedaOfertas {
  empresa: string | undefined;
  profesion: string | undefined;
  salario: string | undefined;
  ciudad: string | undefined;
  fechaPublicacion: string | undefined;
  idEmpresa?: number | undefined;
  idOferta?: number | undefined;
}

export interface IResultadoBusquedaAspirantes {
  nombre: string | undefined;
  apellido: string | undefined;
  profesion: string | undefined;
  edad: number | undefined;
  ciudad: string | undefined;
  experiencia: string | undefined;
  titulo: string | undefined;
  fechaPostulacion: string | undefined;
  idPersona?: number | undefined;
  idOferta?: number | undefined;
  color?: string | undefined;
  verh?: boolean | undefined;
  verche?: boolean | undefined;
  verno?: boolean | undefined;
  btnestado?: boolean | undefined;
}

export interface IResultadoOfertas {
  titulo: string | undefined;
  descripcion: string | undefined;
  tipoContrato: string | undefined;
  publicado: string | undefined;
  experiencia: string | undefined;
  ciudad: string | undefined;
  salario: string | undefined;
  // idEmpresa?: number | undefined;
  // idOferta?: number | undefined;
}

export interface IResultadoHojaCandidato {
  nombre: string | undefined;
  profesion: string | undefined;
  descripcion: string | undefined;
  // idEmpresa?: number | undefined;
  // idOferta?: number | undefined;
}
